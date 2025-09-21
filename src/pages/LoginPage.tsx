import LoginForm from "../components/auth/LoginForm";
import AuthPageLayout from "../components/layouts/AuthPageLayout";

export default function LoginPage() {
  return (
    <AuthPageLayout>
      <LoginForm />
    </AuthPageLayout>
  );
}
