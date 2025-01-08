"use server";

import { extractFormFields, formatFieldErrors } from "@/utils";
import axios from "axios";

export async function updateProfile(state, formData) {
  let response_data = "";

  try {
    const { data } = await axios.patch(
      process.env.BACKEND_API_URL + "/profile",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    response_data = data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const response = error.response;
      let errors = error.response.data.detail;

      if (error.response.status === 422) errors = formatFieldErrors(errors);

      return {
        formData: extractFormFields(formData, ["name", "email"]),
        serverErrors: [errors],
      };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      console.error(
        "Unable to connect to the backend. Please try again later."
      );
      return {
        formData: extractFormFields(formData, ["name", "email"]),
        serverErrors: ["Unable to connect to server. Please try again later."],
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
  }
}

export async function updatePassword(params) {
  const registration_api = process.env.BACKEND_API_URL + "/password";
}

export async function deleteProfile() {
  const registration_api = process.env.BACKEND_API_URL + "/profile";
}
