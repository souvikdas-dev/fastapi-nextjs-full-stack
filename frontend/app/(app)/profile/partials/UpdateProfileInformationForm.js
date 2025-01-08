"use client";
import { updateProfile } from "@/app/_actions/profile";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { useActionState } from "react";

export default function UpdateProfileInformationForm(params) {
  const [state, action, pending] = useActionState(updateProfile, undefined);

  return (
    <section>
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
          />
          <InputError className="mt-2" messages={state?.errors?.email} />
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={pending}>
            {pending ? "Saving..." : "Save"}
          </PrimaryButton>

          {/* @if (session('status') === 'profile-updated')
                <p
                    x-data="{ show: true }"
                    x-show="show"
                    x-transition
                    x-init="setTimeout(() => show = false, 2000)"
                    className="text-sm text-gray-600"
                >Saved.</p>
            @endif */}
        </div>
      </form>
    </section>
  );
}
