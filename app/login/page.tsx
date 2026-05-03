import { LoginView } from "@/components/login-view";
import { withGuestPage } from "@/libs/auth/route-auth";

function LoginPage() {
  return <LoginView />;
}

export default withGuestPage(LoginPage);
