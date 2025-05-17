"use client";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { Account, loginToAccount, Role } from "@/lib/pinkcollar/auth";
import { useAuthStore } from "@/lib/store/auth";
import { useAuthDialogStore } from "@/lib/store/auth-dialog";
import { useCallback } from "react";
import { useAccount, useSignMessage } from "wagmi";

type AccountCardProps = {
  account?: Account;
};

export function AccountCard({ account }: AccountCardProps) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const { setSession, isOnboarding } = useAuthStore();
  const setView = useAuthDialogStore((state) => state.setView);

  const onClick = useCallback(async () => {
    if (isOnboarding && !account) {
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
  }, [isOnboarding, address, account, setView, signMessageAsync, setSession]);

  const name = account?.metadata.name ?? account?.localName ?? "";

  return (
    <div onClick={onClick} className={`cursor-pointer`}>
      <div className="p-2 flex flex-col">
        <div className="flex flex-row gap-4 items-center">
          <ProfileAvatar
            src={account?.metadata.picture}
            variant="small"
            initials={name.charAt(0).toUpperCase()}
          />
          <div className="flex flex-col ">
            <span className="text-base">{account?.metadata.name}</span>
            <span className="text-small text-gray-400">
              {account ? `@${account.localName}` : "Create New Profile"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
