import { create } from "zustand";
import { AuthenticatedUser, SignedChallenge } from "../pinkcollar/auth";
import {
  Challenge,
  getAccountChallenge,
  GetAccountChallengeParams,
  loginWithCookies,
  loginWithSignedChallenge,
} from "../client-services/auth";

type AuthState = {
  user?: AuthenticatedUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentChallenge?: Challenge;
  setUser: (user: AuthenticatedUser) => void;
  getChallenge: (params: GetAccountChallengeParams) => Promise<void>;
  login: () => Promise<void>;
  loginWithChallenge: (signedChallenge: SignedChallenge) => Promise<void>;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: undefined,
  isAuthenticated: false,
  isLoading: false,
  currentChallenge: undefined,
  setUser: (user) => set({ user, isAuthenticated: true }),
  getChallenge: async (params) => {
    set({ isLoading: true, currentChallenge: undefined });
    try {
      const challenge = await getAccountChallenge(params);
      set({ currentChallenge: challenge });
    } finally {
      set({ isLoading: false });
    }
  },
  loginWithChallenge: async (params) => {
    set({ isLoading: true });
    try {
      const user = await loginWithSignedChallenge(params);
      set({ user });
    } finally {
      set({ isLoading: false });
    }
  },
  login: async () => {
    set({ isLoading: true });
    try {
      const user = await loginWithCookies();
      set({ user });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => set({ user: undefined, isAuthenticated: false }),
}));
