"use server";

import { extractFormFields, formatFieldErrors } from "@/utils";
import axios from "axios";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../_lib/session";

export async function signup(state, formData) {
  //** wait for 6 seconds */
  // await new Promise((resolve) => setTimeout(resolve, 6000));

  // const form_data = {
  //   name: formData.get("name"),
  //   email: formData.get("email"),
  //   password: formData.get("password"),
  //   confirm_password: formData.get("confirm_password"),
  // };

  // //** validate form fields */
  // const validatedFields = SignupFormSchema.safeParse(form_data);

  // // If any form fields are invalid, return early
  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //   };
  // }

  // call the registration API
  const registration_api = process.env.BACKEND_API_URL + "/register";

  try {
    const response = await axios.post(registration_api, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Create user session
    if (response.access_token) {
      await createSession(response.access_token);
      // Redirect user
      redirect("/dashboard");
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.error("error.response");
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);

      if (error.response.status === 422) {
        const errors = error.response.data.detail;
        const fieldErrors = formatFieldErrors(errors);

        return {
          formData: {
            name: formData.get("name"),
            email: formData.get("email"),
          },
          errors: fieldErrors,
        };
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log(error.request);
      console.error(
        "Unable to connect to the backend. Please try again later."
      );
      return {
        formData: {
          name: formData.get("name"),
          email: formData.get("email"),
        },
        serverErrors: ["Unable to connect to server. Please try again later."],
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    // console.log(error.config);
  }
}

export async function login(state, formData) {
  //** wait for 6 seconds */
  // await new Promise((resolve) => setTimeout(resolve, 6000));

  // call the registration API
  const login_api = process.env.BACKEND_API_URL + "/login";

  let response_data = "";
  try {
    const { data } = await axios.post(login_api, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    response_data = data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 422) {
        const errors = error.response.data.detail;
        const fieldErrors = formatFieldErrors(errors);

        return {
          formData: extractFormFields(formData, ["username"]),
          errors: fieldErrors,
        };
      } else {
        const errors = error.response.data.detail;
        return {
          formData: extractFormFields(formData, ["username"]),
          serverErrors: [errors],
        };
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log(error.request);
      console.error(
        "Unable to connect to the backend. Please try again later."
      );
      return {
        formData: extractFormFields(formData, ["username"]),
        serverErrors: ["Unable to connect to server. Please try again later."],
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
  }

  // store token & redirect to the dashboard
  if (response_data?.access_token) {
    // Create user session
    await createSession(access_token);
    // Redirect user
    redirect("/dashboard");
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
