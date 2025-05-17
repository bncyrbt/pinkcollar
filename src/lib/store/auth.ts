import { create } from "zustand";
import { createTrackedSelector } from "react-tracked";
import { AuthenticatedUser, Role } from "../pinkcollar/auth";

type AuthStatus =
  | "unauthenticated"
  | "authenticated"
  | "authenticatedOnboarding";

type AuthState = {
  status: AuthStatus;
  isInitializing: boolean;
  isOnboarding: boolean;
  isAuthenticated: boolean;
  session?: AuthenticatedUser;
  logout: () => void;
  setSession: (session: AuthState["session"]) => void;
};

const initialState = {
  status: "unauthenticated" as AuthStatus,
  isInitializing: true,
  session: undefined,
  isAuthenticated: false,
  isOnboarding: false,
};

const store = create<AuthState>((set) => ({
  ...initialState,
  // Actions
  logout: async () => {
    set({ ...initialState, isInitializing: false });
  },
  setSession: (session) => {
    const newStatus = session
      ? session.role === Role.OnboardingUser
        ? "authenticatedOnboarding"
        : "authenticated"
      : "unauthenticated";

    set({
      session,
      isAuthenticated: newStatus === "authenticated",
      isOnboarding: newStatus === "authenticatedOnboarding",
      isInitializing: false,
      status: newStatus,
    });
  },
}));

export const logout = () => store.getState().logout();
export const setSession = (session: AuthenticatedUser) =>
  store.getState().setSession(session);

export const useAuthStore = createTrackedSelector(store);
