"use server";

import { cache } from "react";
import { getAccessToken } from "../_lib/session";
import axios from "axios";

export const fetchItems = async ({ page, limit, ...searchParams }) => {
  const access_token = await getAccessToken();

  return axios
    .get(
      process.env.BACKEND_API_URL + "/items",
      {
        params: {
          page: page,
          limit: limit,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch(function (error) {
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

      return [];
    });
};
