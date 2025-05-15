import { create } from "zustand";
import { AuthenticatedUser, Role } from "../pinkcollar/auth";

type AuthStatus =
  | "unauthenticated"
  | "authenticated"
  | "authenticatedOnboarding";

type AuthState = {
  status: AuthStatus;
  isInitializing: boolean;
  user?: AuthenticatedUser;
  connectedWallet?: string;
  isAuthenticated: boolean;
  setUser: (user: AuthenticatedUser) => void;
  logout: () => void;
  connectWallet: (wallet: string) => void;
  disconnectWallet: () => void;
  isOnboarding: () => boolean;
  setAuth: (user: AuthState["user"]) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  status: "unauthenticated",
  user: undefined,
  connectedWallet: undefined,
  isInitializing: false,
  isAuthenticated: false,
  isOnboarding: () => {
    const role = get().user?.role;
    return role ? role === Role.OnboardingUser : false;
  },
  availableAccounts: undefined,
  // Actions
  logout: async () => {
    set({ user: undefined, isAuthenticated: false, status: "unauthenticated" });
  },
  setUser: (user) => set(() => ({ user, isAuthenticated: true })),
  connectWallet: (wallet: string) => {
    set(() => ({ connectedWallet: wallet }));
  },
  disconnectWallet: () => {
    set({ connectedWallet: undefined });
  },
  setAuth: (user) =>
    set({
      user,
      isAuthenticated: user?.role && user.role !== Role.OnboardingUser,
      status: user
        ? user.role === Role.OnboardingUser
          ? "authenticatedOnboarding"
          : "authenticated"
        : "unauthenticated",
    }),
}));
