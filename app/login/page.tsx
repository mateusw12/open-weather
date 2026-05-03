import { LoginView } from "@/components/login-view";
import { TopBar } from "@/components/top-bar";
import { withGuestPage } from "@/libs/auth/route-auth";

function LoginPage() {
  return (
    <div>
      <TopBar />
      <LoginView />
    </div>
  );
}

export default withGuestPage(LoginPage);
