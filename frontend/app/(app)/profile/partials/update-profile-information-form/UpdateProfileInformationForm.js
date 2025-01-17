import { getAuthUser } from "@/app/_actions/auth";
import ProfileInformationForm from "./ProfileInformationForm";

export default async function UpdateProfileInformationForm() {
  const user = await getAuthUser();
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

      <ProfileInformationForm user={user} />
    </section>
  );
}
