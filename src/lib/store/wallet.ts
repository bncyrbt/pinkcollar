import { create } from "zustand";

export type WalletActionType =
  | "publishGarment"
  | "followProfile"
  | "collectPost"
  | "createComment"
  | "login"
  | "createAccount"
  | "createContributionGroup"
  | null;

type WalletState = {
  pendingAction: WalletActionType;
  setPendingAction: (action: WalletActionType) => void;
};

export const useWalletStore = create<WalletState>((set) => ({
  pendingAction: null,
  setPendingAction: (action) => set({ pendingAction: action }),
}));
