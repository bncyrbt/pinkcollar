import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthDialogStore } from "@/lib/store/auth-dialog";

export const WelcomeScreen = () => {
  const { closeDialog } = useAuthDialogStore();
  return (
    <>
      <DialogHeader>
        <DialogTitle>Welcome</DialogTitle>
        <DialogDescription>Hey motek, glade you came</DialogDescription>
      </DialogHeader>
      <DialogFooter className="px-4 pb-3">
        <Button onClick={closeDialog}>Close</Button>
      </DialogFooter>
    </>
  );
};
