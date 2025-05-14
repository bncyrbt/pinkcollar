import { create } from "zustand";
import {
  AuthenticatedUser,
  AvailableAccount,
  checkAuthSessionState,
  getAvailableAccounts,
  LoginParams,
  loginToAccount,
  logout,
} from "../pinkcollar/auth";

type AuthState = {
  error?: string;
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
};

export const useAuthStore = create<AuthState>((set, get) => ({
  error: undefined,
  user: undefined,
  connectedWallet: undefined,
  isAuthenticated: false,
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
    const authUser = await checkAuthSessionState();
    console.log("setUserFromAuthState", authUser);
    if (authUser.isOk()) {
      set(() => ({ user: authUser.value, isAuthenticated: true }));
    } else {
      get().logout();
    }
  },
  fetchAvailableAccounts: async () => {
    const signer = get().connectedWallet;
    if (signer) {
      const data = await getAvailableAccounts({ signer });
      if (data.isOk()) {
        set(() => ({ availableAccounts: data.value }));
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
}));
