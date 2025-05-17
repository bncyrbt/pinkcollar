"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Account, loginToAccount, Role } from "@/lib/pinkcollar/auth";
import { useAuthStore } from "@/lib/store/auth";
import { useAuthDialogStore } from "@/lib/store/auth-dialog";
import { useCallback, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

type AccountCardProps = {
  account?: Account;
};

export function AccountCard({ account }: AccountCardProps) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const { setSession, isOnboarding } = useAuthStore();
  const setView = useAuthDialogStore((state) => state.setView);

  const [inProgress, setInProgress] = useState(false);

  const onClick = useCallback(async () => {
    setInProgress(true);
    if (isOnboarding) {
      setView("createAccount");
      return;
    }
    // onboarding sign Vs owner sign
    const result = await loginToAccount({
      isOnboarding: !account,
      account: account?.account,
      signer: address as string,
      signMessage: (message) => signMessageAsync({ message }),
    });

    if (result.isOk()) {
      setSession(result.value);
      if (result.value.role === Role.OnboardingUser) {
        setView("createAccount");
      } else {
        setView("welcome");
      }
    }
    setInProgress(false);
  }, [isOnboarding, address, account, setView, signMessageAsync, setSession]);

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        inProgress ? "bg-amber-100" : " hover:bg-pink-100"
      }`}
    >
      <CardContent className="p-4 flex flex-col items-center space-y-4">
        <span className="font-bold">
          {account ? account.localName : "+ Create new"}
        </span>
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
