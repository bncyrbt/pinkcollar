import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

type LoginNewAccountScreenProps = { onLoginSuccess: () => void };
export const LoginNewAccountScreen = ({
  onLoginSuccess,
}: LoginNewAccountScreenProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          Youre new account is ready, sign in
        </DialogDescription>
      </DialogHeader>
      <DialogContent>
        <Button onClick={onLoginSuccess}>Login</Button>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </>
  );
};
