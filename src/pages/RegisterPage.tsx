import RegisterForm from "../components/auth/RegisterForm";
import AuthPageLayout from "../components/layouts/AuthPageLayout";

export default function RegisterPage() {
  return (
    <AuthPageLayout>
      <RegisterForm />
    </AuthPageLayout>
  );
}
