"use client";
import { login } from "@/app/_actions/auth";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import Link from "next/link";
import { useActionState } from "react";

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
      {state?.serverErrors && (
        <div
          className="flex p-4 mt-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 ---dark:bg-gray-800 ---dark:text-red-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Danger</span>
          <div>
            <span className="font-medium">Some errors occurs..</span>
            <ul className="mt-1.5 list-disc list-inside">
              {state?.serverErrors?.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
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
