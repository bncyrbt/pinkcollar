import { AvailableAccount, getAvailableAccounts } from "@/lib/pinkcollar/auth";
import { AccountCard } from "./AccountCard";
import { Role } from "@lens-protocol/client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function AvailableAccounts() {
  const { address } = useAccount();
  const [accounts, setAccounts] = useState<AvailableAccount[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) {
      return;
    }

    const fetch = async () => {
      setLoading(true);
      const data = await getAvailableAccounts({ signer: address as string });
      if (data.isOk()) {
        setAccounts(data.value);
      } else {
        console.error(data.error);
      }
      setLoading(false);
    };
    fetch();
  }, [address]);

  if (isLoading) return <div>Loading ...</div>;

  return (
    <ul>
      {accounts
        .concat({
          account: "",
          role: Role.OnboardingUser,
          username: "+ New Account",
        })
        .map((account) => (
          <li key={account.account}>
            <AccountCard account={account} />
          </li>
        ))}
    </ul>
  );
}
