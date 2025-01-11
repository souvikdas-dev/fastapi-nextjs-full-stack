"use client";
import { signup } from "@/app/_actions/auth";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import TextInput from "@/components/TextInput";
import clsx from "clsx";
import Link from "next/link";
import { useActionState } from "react";
import ServerErrors from "@/components/ServerErrors";

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
      {state?.errors?.server_errors && (
        <ServerErrors messages={state?.errors?.server_errors} />
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
