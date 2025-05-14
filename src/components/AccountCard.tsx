"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AvailableAccount } from "@/lib/pinkcollar/auth";
import { useAuthStore } from "@/lib/store/auth";
import { useAccount, useSignMessage } from "wagmi";

type AccountCardProps = {
  account: AvailableAccount;
};

export function AccountCard({ account }: AccountCardProps) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const login = useAuthStore((state) => state.login);

  const onClick = async () => {
    login({
      role: account.role,
      account: account.account,
      signer: address as string,
      signMessage: (message) => signMessageAsync({ message }),
    });
  };

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-md transition-shadow"
    >
      <CardContent className="p-4">
        <span className="font-bold">{account.username ?? "Unnamed"}</span>
      </CardContent>
    </Card>
  );
}
