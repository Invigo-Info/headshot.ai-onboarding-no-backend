import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage() {
  // The 'from' parameter is now captured and stored by middleware
  return <LoginForm />;
}
