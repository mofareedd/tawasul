import ForgotPasswordForm from '../components/forgot-pass-form';

export default function ForgotPassword() {
  return (
    <div className="mx-auto flex h-full max-w-md flex-col items-center justify-center space-y-12 lg:max-w-lg">
      <div className="space-y-4 text-center">
        <h1 className="font-bold text-4xl">Forgot Password</h1>
        <p className="text-muted-foreground">
          Enter your registered email address, and we'll send you a link to
          reset your password.
        </p>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
