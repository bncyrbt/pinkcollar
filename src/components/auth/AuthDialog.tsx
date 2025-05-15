import { useAuthDialogStore } from "@/lib/store/authDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CreateAccountScreen } from "./screens/CreateAccountScreen";
import { ChooseAccountScreen } from "./screens/ChooseAccountScreen";
import { LoginNewAccountScreen } from "./screens/LoginNewAccountScreen";
import { Button } from "../ui/button";
import { useAuthStore } from "@/lib/store/auth";

export function AuthDialog() {
  const user = useAuthStore((state) => state.user);
  const { isOpen, view, closeDialog, setView } = useAuthDialogStore();

  if (!isOpen) return null;

  const renderView = () => {
    switch (view) {
      case "chooseAccount":
        return <ChooseAccountScreen />;
      case "createAccount":
        return <CreateAccountScreen />;
      case "accountCreated":
        return (
          <LoginNewAccountScreen onLoginSuccess={() => setView("welcome")} />
        );
      case "welcome":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Welcome</DialogTitle>
              <DialogDescription>Hey motek, glade you came</DialogDescription>
            </DialogHeader>
            <Button onClick={closeDialog}>Close</Button>
          </>
        );
    }
  };

  return (
    <Dialog open onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px]">{renderView()}</DialogContent>
    </Dialog>
  );
}
