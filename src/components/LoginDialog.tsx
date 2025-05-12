"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoginDialogContent } from "./LoginDialogContent";
import { useModal } from "connectkit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export function LoginDialog() {
  const { setOpen: setConnectModalOpen } = useModal();
  const { address } = useAccount();
  const [isLoginFlow, setLoginFlow] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (address && isLoginFlow) {
      setDialogOpen(true);
      setLoginFlow(false);
    }
  }, [address, isLoginFlow]);

  const handleLoginClick = () => {
    if (!address) {
      setConnectModalOpen(true);
      setLoginFlow(true);
    } else {
      setDialogOpen(true);
    }
  };

  return (
    <>
      <Button variant="default" onClick={handleLoginClick}>
        Login
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <LoginDialogContent />
        </DialogContent>
      </Dialog>
    </>
  );
}
