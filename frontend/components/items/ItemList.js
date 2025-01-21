"use client";
import { use, useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog";
import Pagination from "../Pagination";
import DeleteItem from "./DeleteItem";
import { deleteItem } from "@/app/_actions/items";
import toast from "react-hot-toast";

const handleDeleteItem = (id, name) => {
  //   if (window.confirm(`Are you sure! ${id}`)) {
  //     console.log(id);
  //   }

  const deleteItemPromise = new Promise(async (resolve, reject) => {
    const res = await deleteItem(id);
    if (!res.ok) {
      reject(res);
    }
    resolve(res);
  });

  toast.promise(
    deleteItemPromise,
    {
      loading: (
        <span>
          Deleting Item <b>{name}</b>
        </span>
      ),
      success: (data) => (
        <span>
          Item <b>{name}</b> deleted.
        </span>
      ),
      error: (err) => (
        <span>
          Failed to delete item <b>{name}</b>
        </span>
      ),
    },
    {
      position: "bottom-right",
    }
  );
};

export default function ItemList({ items }) {
  const _items = use(items);
  const [isDeleteConfimationDialogOpen, setIsDeleteConfimationDialogOpen] =
    useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);

  const setDeletedItem = (formData) => {
    const item_id = formData.get("id");
    const item_name = formData.get("name");

    setId(item_id);
    setName(item_name);
    setIsDeleteConfimationDialogOpen(true);
  };

  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h2 className="mb-6 text-3xl font-semibold text-gray-800">Items</h2>

      <ul
        role="list"
        className="px-4 py-1 bg-white divide-y divide-gray-100 rounded-lg shadow-sm"
      >
        {_items?.data.map((item) => (
          <li key={item.id} className="flex justify-between py-3 gap-x-6">
            <div className="flex min-w-0 gap-x-4">
              <div className="flex-auto min-w-0">
                <p className="font-semibold text-gray-900 text-sm/6">
                  {`{ id: ${item.id} } `}
                  {item.name}
                  {` { code: ${item.code} }`}
                </p>
                <p className="mt-1 text-gray-500 truncate text-xs/5">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="flex gap-2 divide-x-2 shrink-0 sm:items-end">
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="px-2 text-gray-900 bg-green-300 rounded text-sm/6">
                  ₹ {item.price}
                </p>

                <p className="mt-1 text-gray-500 text-xs/5">
                  &#x1F550;
                  <time dateTime={item.updated_at}>{item.last_updated}</time>
                </p>
              </div>
              <div className="self-center hidden text-sm shrink-0 sm:flex sm:flex-col ">
                <button
                  type="button"
                  className="px-2 text-blue-500 hover:underline"
                >
                  Edit
                </button>
                {/* <form key={item.code} action={setDeletedItem}>
                  <input type="hidden" name="id" value={item.id}></input>
                  <input type="hidden" name="name" value={item.name}></input>
                  <button
                    type="submit"
                    className="px-2 text-red-500 hover:underline"
                    // formAction={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </form> */}

                <button
                  type="button"
                  className="px-2 text-red-500 hover:underline"
                  onClick={() => {
                    console.log("clicked item delete", item.id, item.name);
                    setIsDeleteConfimationDialogOpen(true);
                    setId(item.id);
                    setName(item.name);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* pagination for item list */}
      <Pagination
        total={_items.total}
        perPage={_items.per_page}
        currentPage={_items.current_page}
        lastPage={_items.last_page}
        from={_items.from_}
        to={_items.to_}
        _items={_items.data}
        path="/items"
        className="mt-4"
      />

      <ConfirmationDialog
        open={isDeleteConfimationDialogOpen}
        title="Are you sure!"
        description={
          <span>
            Are you sure you want to delete Item -&gt; <b>{name}</b>?
          </span>
        }
        onConfirm={() => {
          handleDeleteItem(id, name);
          setIsDeleteConfimationDialogOpen(false);
        }}
        onCancel={() => {
          setIsDeleteConfimationDialogOpen(false);
        }}
      />
    </div>
  );
}
