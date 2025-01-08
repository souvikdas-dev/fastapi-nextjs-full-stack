import PrimaryButton from "@/components/buttons/PrimaryButton";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";

export default function UpdatePasswordForm(params) {
  return (
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Update Password</h2>

        <p className="mt-1 text-sm text-gray-600">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </header>

      <form
        method="post"
        action="{{ route('password.update"
        className="mt-6 space-y-6"
      >
        <div>
          <InputLabel
            forHtml="update_password_current_password"
            value="Current Password"
          />
          <TextInput
            id="update_password_current_password"
            name="current_password"
            type="password"
            className="block w-full mt-1"
            autoComplete="current-password"
          />
          {/* <InputError :messages="$errors->updatePassword->get('current_password')" className="mt-2" /> */}
        </div>

        <div>
          <InputLabel forHtml="update_password_password" value="New Password" />
          <TextInput
            id="update_password_password"
            name="password"
            type="password"
            className="block w-full mt-1"
            autoComplete="new-password"
          />
          {/* <InputError :messages="$errors->updatePassword->get('password')" className="mt-2" /> */}
        </div>

        <div>
          <InputLabel
            forHtml="update_password_password_confirmation"
            value="Confirm Password"
          />
          <TextInput
            id="update_password_password_confirmation"
            name="password_confirmation"
            type="password"
            className="block w-full mt-1"
            autoComplete="new-password"
          />
          {/* <InputError :messages="$errors->updatePassword->get('password_confirmation')" className="mt-2" /> */}
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton>Save</PrimaryButton>

          {/* @if (session('status') === 'password-updated')
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
