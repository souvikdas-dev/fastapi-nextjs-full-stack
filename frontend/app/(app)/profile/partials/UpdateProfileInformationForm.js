"use client";
import { updateProfile } from "@/app/_actions/profile";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import ServerErrors from "@/components/ServerErrors";
import TextInput from "@/components/TextInput";
import { useActionState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UpdateProfileInformationForm({ ...props }) {
  const [state, action, pending] = useActionState(updateProfile, undefined);

  useEffect(() => {
    if (state?.status) {
      toast.success(<b>{state.message}</b>, { id: "profileInfoToastId" });
    } else if (state?.errors) {
      toast.error(<b>Failed to save Profile Information.</b>, {
        id: "profileInfoToastId",
      });
    }

    if (pending) {
      toast.loading("Saving Profile Information...", {
        id: "profileInfoToastId",
      });
    }

    return () => toast.dismiss("profileInfoToastId");
  }, [state, pending]);

  return (
    <section>
      <Toaster position="bottom-center" />

      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Update your account&apos;s profile information and email address.
        </p>
      </header>

      <form action={action} className="mt-6 space-y-6">
        <div>
          <InputLabel for="name" value="Name" />
          <TextInput
            id="name"
            name="name"
            type="text"
            className="block w-full mt-1"
            required
            autoFocus
            autoComplete="name"
            defaultValue={state?.formData?.name}
          />
          <InputError className="mt-2" messages={state?.errors?.name} />
        </div>

        <div>
          <InputLabel for="email" value="Email" />
          <TextInput
            id="email"
            name="email"
            type="email"
            className="block w-full mt-1"
            required
            autoComplete="username"
            defaultValue={state?.formData?.email}
          />
          <InputError className="mt-2" messages={state?.errors?.email} />
        </div>

        {/* server errors */}
        {state?.errors?.server_errors && (
          <ServerErrors messages={state?.errors?.server_errors} />
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={pending}>
            {pending ? "Saving..." : "Save"}
          </PrimaryButton>
        </div>
      </form>
    </section>
  );
}
