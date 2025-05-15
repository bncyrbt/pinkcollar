import { create } from "zustand";
import {
  AuthenticatedUser,
  AvailableAccount,
  checkAuthSessionState,
  getAvailableAccounts,
  LoginParams,
  loginToAccount,
  logout,
  Role,
} from "../pinkcollar/auth";

type AuthStatus =
  | "unauthenticated"
  | "authenticated"
  | "authenticatedOnboarding";

type AuthState = {
  status: AuthStatus;
  error?: string;
  isInitializing: boolean;
  user?: AuthenticatedUser;
  connectedWallet?: string;
  isAuthenticated: boolean;
  availableAccounts?: AvailableAccount[];
  setUser: (user: AuthenticatedUser) => void;
  logout: () => void;
  login: (params: LoginParams) => void;
  setUserFromAuthState: () => void;
  fetchAvailableAccounts: () => void;
  connectWallet: (wallet: string) => void;
  disconnectWallet: () => void;
  setError: (err: string) => void;
  isOnboarding: () => boolean;
  setAuth: (user: AuthState["user"]) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  status: "unauthenticated",
  error: undefined,
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
  login: async (params) => {
    const authUser = await loginToAccount(params);
    if (authUser.isOk()) {
      get().setUser(authUser.value);
    } else {
      get().setError(authUser.error.message);
    }
  },
  logout: async () => {
    const result = await logout();
    if (result.isOk()) {
      set({ user: undefined, isAuthenticated: false });
    }
  },

  setUser: (user) => set(() => ({ user, isAuthenticated: true })),
  setUserFromAuthState: async () => {
    set(() => ({ isInitializing: true }));
    const authUser = await checkAuthSessionState();
    console.log("setUserFromAuthState", authUser);
    if (authUser.isOk()) {
      set(() => ({
        user: authUser.value,
        isAuthenticated: true,
        isInitializing: false,
      }));
    } else {
      set(() => ({ isInitializing: false }));
      get().logout();
    }
  },
  fetchAvailableAccounts: async () => {
    const signer = get().connectedWallet;
    if (signer) {
      const data = await getAvailableAccounts({ signer });
      if (data.isOk()) {
        set(() => ({
          availableAccounts: data.value,
        }));
      }
    } else {
      console.error("No Signer");
    }
  },
  connectWallet: (wallet: string) => {
    console.log("connected a wallet", wallet);
    set(() => ({ connectedWallet: wallet }));
    get().fetchAvailableAccounts();
  },
  disconnectWallet: () => {
    set({ connectedWallet: undefined });
  },
  setError: (err: string) => {
    console.error(err);
    set({ error: err });
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
