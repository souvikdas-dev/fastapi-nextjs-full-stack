"use client";
import DangerButton from "@/components/buttons/DangerButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import InputLabel from "@/components/InputLabel";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import { useState } from "react";

export default function DeleteUserForm() {
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => setShowModal(true);
  const closeModal = (e) => setShowModal(false);

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>

        <p className="mt-1 text-sm text-gray-600">
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Before deleting your account, please download any
          data or information that you wish to retain.
        </p>
      </header>

      <DangerButton onClick={openModal}>Delete Account</DangerButton>

      <Modal show={showModal} openModal={openModal} closeModal={closeModal}>
        <form method="post" action="" className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to delete your account?
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Please enter your password to confirm you would
            like to permanently delete your account.
          </p>

          <div className="mt-6">
            <InputLabel
              htmlFor="password"
              value="Password"
              className="sr-only"
            />

            <TextInput
              id="password"
              name="password"
              type="password"
              className="block w-3/4 mt-1"
              placeholder="Password"
            />
          </div>

          <div className="flex justify-end mt-6">
            <SecondaryButton type="button" onClick={closeModal}>
              Cancel
            </SecondaryButton>
            <DangerButton className="ms-3">Delete Account</DangerButton>
          </div>
        </form>
      </Modal>
    </section>
  );
}
