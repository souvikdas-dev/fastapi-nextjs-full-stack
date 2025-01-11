"use client";
import { login } from "@/app/_actions/auth";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import TextInput from "@/components/TextInput";
import Link from "next/link";
import { useActionState } from "react";
import ServerErrors from "@/components/ServerErrors";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action}>
      {/* Email Address */}
      <div>
        <InputLabel htmlFor="email" value="Email" />
        <TextInput
          id="email"
          className="block w-full mt-1"
          type="email"
          name="username"
          autoFocus
          autoComplete="username"
          defaultValue={state?.formData?.username}
        />
        <InputError messages={state?.errors?.username} className="mt-2" />
      </div>

      {/* Password */}
      <div className="mt-4">
        <InputLabel htmlFor="password" value="Password" />
        <TextInput
          id="password"
          className="block w-full mt-1"
          type="password"
          name="password"
          autoComplete="current-password"
        />
        <InputError messages={state?.errors?.password} className="mt-2" />
      </div>

      {/* Remember Me */}
      <div className="block mt-4">
        <label htmlFor="remember_me" className="inline-flex items-center">
          <input
            id="remember_me"
            type="checkbox"
            className="text-indigo-600 border-gray-300 rounded shadow-sm focus:ring-indigo-500"
            name="remember"
          />
          <span className="text-sm text-gray-600 ms-2">Remember me</span>
        </label>
      </div>

      {/* server errors */}
      {state?.errors?.server_errors && (
        <ServerErrors messages={state?.errors?.server_errors} />
      )}

      {/* actions */}
      <div className="flex items-center justify-end mt-4">
        {/* @if (Route::has('password.request')) */}
        <Link
          href="forget-password"
          className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Forgot your password?
        </Link>
        {/* @endif */}

        <PrimaryButton className="ms-4" disabled={pending}>
          {pending ? "Logging..." : "Log in"}
        </PrimaryButton>
      </div>
    </form>
  );
}
