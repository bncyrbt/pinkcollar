import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthDialogStore } from "@/lib/store/authDialog";

export const WelcomeScreen = () => {
  const { closeDialog } = useAuthDialogStore();
  return (
    <>
      <DialogHeader>
        <DialogTitle>Welcome</DialogTitle>
        <DialogDescription>Hey motek, glade you came</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={closeDialog}>Close</Button>
      </DialogFooter>
    </>
  );
};
