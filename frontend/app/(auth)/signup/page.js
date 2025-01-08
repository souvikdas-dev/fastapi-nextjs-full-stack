"use client";
import { signup } from "@/app/_actions/auth";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import TextInput from "@/components/TextInput";
import clsx from "clsx";
import Link from "next/link";
import { useActionState } from "react";

export default function SignUpPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirm_password: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  return (
    <form action={action}>
      {/* Name */}
      <div>
        <InputLabel htmlFor="name" value="Name" />
        <TextInput
          id="name"
          name="name"
          placeholder="Name"
          autoComplete="name"
          className="block w-full mt-1"
          defaultValue={state?.formData?.name}
        />
        <InputError messages={state?.errors?.name} className="mt-2" />
      </div>

      {/* Email Address */}
      <div className="mt-4">
        <InputLabel htmlFor="email" value="Email" />
        <TextInput
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="username"
          className={clsx("block w-full mt-1", {
            "border-red-400": state?.errors?.email,
          })}
          defaultValue={state?.formData?.email}
        />
        <InputError messages={state?.errors?.email} className="mt-2" />
      </div>

      {/* Password */}
      <div className="mt-4">
        <InputLabel htmlFor="password" value="Password" />
        <TextInput
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="block w-full mt-1"
          defaultValue={state?.formData?.password}
        />
        <InputError messages={state?.errors?.password} className="mt-2" />
      </div>

      {/* Confirm Password */}
      <div className="mt-4">
        <InputLabel htmlFor="confirm_password" value="Confirm Password" />
        <TextInput
          id="confirm_password"
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          className="block w-full mt-1"
          defaultValue={state?.formData?.confirm_password}
        />
        <InputError
          messages={state?.errors?.confirm_password}
          className="mt-2"
        />
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

      <div className="flex items-center justify-end mt-4">
        <Link
          className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          href="/login"
        >
          Already registered
        </Link>

        <PrimaryButton className="ms-4" disabled={pending}>
          {pending ? "Registering..." : "Register"}
        </PrimaryButton>
      </div>
    </form>
  );
}
