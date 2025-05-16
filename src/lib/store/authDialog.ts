import { create } from "zustand";

type AuthDialogView =
  | "chooseAccount"
  | "createAccount"
  | "accountCreated"
  | "welcome";

type DialogState = {
  isOpen: boolean;
  view: AuthDialogView;
  openDialog: (view?: AuthDialogView) => void;
  closeDialog: () => void;
  setView: (view: AuthDialogView) => void;
};

export const useAuthDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  view: "chooseAccount",
  openDialog: (view = "chooseAccount") => set({ isOpen: true, view }),
  closeDialog: () => set({ isOpen: false }),
  setView: (view) => set({ view }),
}));
