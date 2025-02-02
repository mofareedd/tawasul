import ResettPasswordForm from '../_components/reset-password-form';

export default function ResetPassword() {
  return (
    <div className="mx-auto flex h-full max-w-md flex-col items-center justify-center space-y-12 lg:max-w-lg">
      <div className="space-y-4 text-center">
        <h1 className="font-bold text-4xl">Update Your Password</h1>
        <p className="text-muted-foreground">
          Create a new password for your account. Make sure it's strong and
          secure, combining letters, numbers, and symbols.
        </p>
      </div>

      <ResettPasswordForm />
    </div>
  );
}
