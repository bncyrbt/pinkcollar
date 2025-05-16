import * as authService from "@/lib/pinkcollar/auth";
import { logout, setSession } from "@/lib/store/auth";

export async function handleLogout() {
  const res = await authService.logout();
  if (res.isOk()) {
    logout();
  } else {
    // handle errors
  }
}

export async function checkAuthSessionState() {
  const authUser = await authService.checkAuthSessionState();
  if (authUser.isOk()) {
    setSession(authUser.value);
  } else {
    logout();
  }
}
