import { Suspense } from "react";
import DeleteUserForm from "./partials/DeleteUserForm";
import UpdatePasswordForm from "./partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./partials/update-profile-information-form/UpdateProfileInformationForm";

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
              <Suspense
                fallback={
                  <section className="animate-pulse">
                    <header>
                      <h2 className="text-lg font-medium text-gray-900">
                        Profile Information
                      </h2>
                      <p className="mt-1 text-sm text-gray-600">
                        Update your account&apos;s profile information and email
                        address.
                      </p>
                    </header>
                    <div className="mt-6 space-y-6">
                      <div>
                        <div className="block h-3 text-sm font-medium border-gray-300 rounded-full shadow-sm w-28 bg-slate-400" />
                        <div className="block w-full h-4 mt-1 border-gray-300 rounded-full shadow-sm bg-slate-400" />
                      </div>
                      <div>
                        <div className="block h-3 text-sm font-medium border-gray-300 rounded-full shadow-sm w-28 bg-slate-400" />
                        <div className="block w-full h-4 mt-1 border-gray-300 rounded-full shadow-sm bg-slate-400" />
                      </div>
                      <div className="block w-20 h-6 text-sm font-medium border-gray-300 rounded-full shadow-sm bg-slate-400" />
                    </div>
                  </section>
                }
              >
                <UpdateProfileInformationForm />
              </Suspense>
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
