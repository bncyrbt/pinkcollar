import * as authService from "@/lib/pinkcollar/auth";
import { useAuthStore } from "@/lib/store/auth";

// Contains actions components can call

export async function logout() {
  const res = await authService.logout();
  if (res.isOk()) {
    useAuthStore.getState().logout();
  } else {
    // handle errors
  }
}

export async function checkAuthSessionState() {
  const authUser = await authService.checkAuthSessionState();
  if (authUser.isOk()) {
    useAuthStore.getState().setAuth(authUser.value);
  } else {
    logout();
  }
}
