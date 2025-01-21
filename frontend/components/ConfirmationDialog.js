"use client";
import { useEffect, useRef } from "react";

export default function ConfirmationDialog({
  open = false,
  title,
  description,
  onCancel,
  onConfirm,
  ...props
}) {
  const dialogRef = useRef(null);

  // Open the dialog if open state changes
  useEffect(() => {
    const dialog = dialogRef.current;
    console.log("open", open);
    if (open && dialog) {
      dialog.showModal();
    } else if (dialog) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const handleClickOutside = (e) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
      }
    };
    dialog.addEventListener("click", handleClickOutside);

    return () => {
      dialog.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <dialog
      ref={dialogRef}
      className="w-full max-w-sm p-4 rounded backdrop:bg-black/45"
    >
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="flex items-center justify-end gap-4 mt-5">
        <button
          type="buttom"
          onClick={(e) => {
            if (typeof onCancel === "function") {
              onCancel();
            } else dialogRef.current.close();
          }}
          className="px-4 text-sm py-1.5 border shadow-sm transform duration-200 ease-in-out rounded"
        >
          Cancel
        </button>
        <button
          type="buttom"
          onClick={(e) => {
            if (typeof onConfirm === "function") {
              onConfirm();
            } else dialogRef.current.close();
          }}
          className="px-4 text-sm shadow-sm py-1.5 text-white transform duration-200 ease-in-out bg-black hover:bg-black/80 hover:scale-105 rounded"
        >
          Confirm
        </button>
      </div>
    </dialog>
  );
}
