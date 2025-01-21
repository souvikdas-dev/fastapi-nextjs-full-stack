"use client";

import { deleteItem } from "@/app/_actions/items";
import toast from "react-hot-toast";
import ConfirmationDialog from "../ConfirmationDialog";
import { useState } from "react";

export default function DeleteItem({ id, name }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ConfirmationDialog
        open={isOpen}
        title="Are you sure!"
        description="Are you sure you want to delete?"
        onConfirm={() => {
          handleDeleteItem(id, name);
          setIsOpen(false);
        }}
      />
      <button
        type="button"
        className="px-2 text-red-500 hover:underline"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Delete
      </button>
    </>
  );
}
