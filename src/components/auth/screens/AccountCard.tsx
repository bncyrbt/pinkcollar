"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AvailableAccount, loginToAccount, Role } from "@/lib/pinkcollar/auth";
import { useAuthStore } from "@/lib/store/auth";
import { useAuthDialogStore } from "@/lib/store/authDialog";
import { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

type AccountCardProps = {
  account: AvailableAccount;
};

export function AccountCard({ account }: AccountCardProps) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const setAuth = useAuthStore((state) => state.setAuth);
  const setView = useAuthDialogStore((state) => state.setView);

  const [inProgress, setInProgress] = useState(false);

  const onClick = async () => {
    setInProgress(true);
    const result = await loginToAccount({
      role: account.role,
      account: account.account,
      signer: address as string,
      signMessage: (message) => signMessageAsync({ message }),
    });

    if (result.isOk()) {
      setAuth(result.value);
      if (result.value.role === Role.OnboardingUser) {
        setView("createAccount");
      } else {
        setView("welcome");
      }
    }
    setInProgress(false);
  };

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        inProgress ? "bg-amber-100" : " hover:bg-pink-100"
      }`}
    >
      <CardContent className="p-4 flex flex-col items-center space-y-4">
        <span className="font-bold">{account.username}</span>
        {inProgress && (
          <>
            <span className="text-sm flex text-center">
              👜✨ Step into the future, darling.
              <br /> Authenticate your identity effortlessly—simply sign in with
              your wallet! 💼🌟
            </span>
            <span className="text-sm font-semibold">
              please sign with your wallet
            </span>
          </>
        )}
      </CardContent>
    </Card>
  );
}
