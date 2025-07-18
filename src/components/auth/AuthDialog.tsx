import { useAuthDialogStore } from "@/lib/store/auth-dialog";
import { Dialog, DialogContent } from "../ui/dialog";
import { CreateAccountScreen } from "./screens/CreateAccountScreen";
import { ChooseAccountScreen } from "./screens/ChooseAccountScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";

export function AuthDialog() {
  const { isOpen, view, closeDialog } = useAuthDialogStore();

  if (!isOpen) return null;

  const renderView = () => {
    switch (view) {
      case "chooseAccount":
        return <ChooseAccountScreen />;
      case "createAccount":
        return <CreateAccountScreen />;
      case "welcome":
        return <WelcomeScreen />;
    }
  };

  return (
    <Dialog open onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px] p-0">
        {renderView()}
      </DialogContent>
    </Dialog>
  );
}
