"use server";

import { formatErrors, wait } from "@/utils";
import axios from "axios";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createSession, deleteSession, getAccessToken } from "../_lib/session";

export async function signup(state, formData) {
  const form_data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  // //** validate form fields */
  // const validatedFields = SignupFormSchema.safeParse(form_data);

  // // If any form fields are invalid, return early
  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //   };
  // }

  let response_data = null;

  try {
    const { data } = await axios.post(
      process.env.BACKEND_API_URL + "/singup",
      form_data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response_data = data;
  } catch (error) {
    let errors = {};
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const response = error.response;
      errors = response.data.detail;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log(error.request);
      console.error(
        "Unable to connect to the backend. Please try again later."
      );
      errors = "Unable to connect to server. Please try again later.";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);

      errors = "Something went wrong. Please try again later.";
    }

    return {
      formData: form_data,
      errors: formatErrors(errors),
    };
  }

  // store token & redirect to the dashboard
  if (response_data?.access_token) {
    // Create user session
    await createSession(response_data.access_token);
    // Redirect user
    redirect("/dashboard");
  } else
    return {
      errors: {
        server_errors: "Something went wrong. Please try again later.",
      },
    };
}

export async function login(state, formData) {
  const form_fields = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  let response_data = null;
  try {
    const { data } = await axios.post(
      process.env.BACKEND_API_URL + "/login",
      form_fields,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    response_data = data;
  } catch (error) {
    let errors = {};
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const response = error.response;
      errors = response.data.detail;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log(error.request);
      console.error(
        "Unable to connect to the backend. Please try again later."
      );
      errors = "Unable to connect to server. Please try again later.";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);

      errors = "Something went wrong. Please try again later.";
    }

    return {
      formData: {
        username: formData.get("username"),
      },
      errors: formatErrors(errors),
    };
  }

  // store token & redirect to the dashboard
  if (response_data?.access_token) {
    // Create user session
    await createSession(response_data.access_token);
    // Redirect user
    redirect("/dashboard");
  } else
    return {
      errors: {
        server_errors: "Something went wrong. Please try again later.",
      },
    };
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export const getAuthUser = cache(async () => {
  const access_token = await getAccessToken();

  return axios
    .post(
      process.env.BACKEND_API_URL + "/users/me",
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch(function (error) {
      // TODO: modify as profuction
      const production = true;
      if (!production) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
      return null;
    });
});
