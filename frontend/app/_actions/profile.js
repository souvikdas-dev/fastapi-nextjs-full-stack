"use server";

import { formatFieldErrors } from "@/utils";
import axios from "axios";
import { getAccessToken } from "../_lib/session";

export async function updateProfile(state, formData) {
  //** wait for 6 seconds */
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const access_token = await getAccessToken();

  const form_fields = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  return await axios
    .patch(process.env.BACKEND_API_URL + "/profile", form_fields, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
        // Authorization:
        //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MzY0MDI5NTB9.nCdclB2CpRY5LvPlBSgQO3dc2cg-NnPUQdkD1HbBZ6I",
      },
    })
    .then(function (response) {
      // console.log(response);

      return {
        formData: form_fields,
        status: "profile-updated",
        message: "Profile updated successfully",
      };
    })
    .catch(function (error) {
      // console.log(error);

      let errors = {};

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const response = error.response;
        // console.log(response);

        if (response.status === 422) {
          // returning object
          errors = formatFieldErrors(response.data.detail);
        } else {
          errors = {
            server_errors: [response.data.detail],
          };
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        console.error(
          "Unable to connect to the backend. Please try again later."
        );
        errors = {
          server_errors: ["Something went wrong. Please try again later."],
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);

        errors = {
          server_errors: ["Something went wrong. Please try again later."],
        };
      }

      return {
        formData: form_fields,
        errors: errors,
      };
    });
}

export async function updatePassword(params) {
  const registration_api = process.env.BACKEND_API_URL + "/password";
}

export async function deleteProfile() {
  const registration_api = process.env.BACKEND_API_URL + "/profile";
}
