"use server";

import { wait } from "@/utils";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { getAccessToken } from "../_lib/session";

export const fetchItems = async ({ page, limit, ...searchParams }) => {
  // wait for 2 sec
  await wait(2);

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

export const saveItem = async ({ state, formData }) => {
  return { formData };
};

export const updateItem = async ({ state, formData }) => {
  return { formData };
};

export const deleteItem = async (id) => {
  // wait for 1.5 sec
  await wait(1.5);

  const access_token = await getAccessToken();

  return await axios
    .delete(
      process.env.BACKEND_API_URL + `/items/${id}`,
      {},
      {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    .then((res) => {
      revalidatePath("/items");
      return {
        ok: true,
        status: "ok",
        message: "Item Deleted Successfully",
      };
    })
    .catch((err) => {
      return {
        ok: false,
        status: "error",
        message: "Failed to delete Item.",
      };
    });
};
