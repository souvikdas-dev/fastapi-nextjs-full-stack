import DeleteUserForm from "./partials/DeleteUserForm";
import UpdatePasswordForm from "./partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./partials/UpdateProfileInformationForm";

export default function ProfilePage() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Profile
          </h2>
        </div>
      </header>
      <div className="py-12">
        <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
          <div className="p-4 bg-white shadow sm:p-8 sm:rounded-md">
            <div className="max-w-xl">
              <UpdateProfileInformationForm />
            </div>
          </div>

          <div className="p-4 bg-white shadow sm:p-8 sm:rounded-md">
            <div className="max-w-xl">
              <UpdatePasswordForm />
            </div>
          </div>

          <div className="p-4 bg-white shadow sm:p-8 sm:rounded-md">
            <div className="max-w-xl">
              <DeleteUserForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
