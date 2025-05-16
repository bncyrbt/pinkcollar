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
  connectedWallet?: string;
  logout: () => void;
  connectWallet: (wallet: string) => void;
  disconnectWallet: () => void;
  setSession: (session: AuthState["session"]) => void;
};

const store = create<AuthState>((set) => ({
  status: "unauthenticated",
  isInitializing: true,
  session: undefined,
  connectedWallet: undefined,
  isAuthenticated: false,
  isOnboarding: false,
  // Actions
  logout: async () => {
    set({
      session: undefined,
      status: "unauthenticated",
      isInitializing: false,
    });
  },
  connectWallet: (wallet: string) => {
    set(() => ({ connectedWallet: wallet }));
  },
  disconnectWallet: () => {
    set({ connectedWallet: undefined });
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
export const connectWallet = (wallet: string) =>
  store.getState().connectWallet(wallet);

export const useAuthStore = createTrackedSelector(store);
