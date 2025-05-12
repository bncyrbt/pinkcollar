"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  AvailableAccount,
  getAccountChallenge,
  loginWithSignedChallenge,
} from "@/lib/client-services/auth";
import { useAuth } from "@/lib/store/auth";
import { useAccount, useSignMessage } from "wagmi";

type AccountCardProps = {
  account: AvailableAccount;
};

export function AccountCard({ account }: AccountCardProps) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const onClick = async () => {
    const challenge = await getAccountChallenge({
      account: account.account,
      wallet: address as string,
      role: account.role,
    });
    console.log("got the challenge", challenge);
    if (challenge) {
      console.log("getting ready to sign");
      const signature = await signMessageAsync({ message: challenge.text });
      // post signature to auth/login
      const isAuthenticated = await loginWithSignedChallenge({
        id: challenge.id,
        signature,
      });
      console.log("Authentication succeed", { isAuthenticated });
    }
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
