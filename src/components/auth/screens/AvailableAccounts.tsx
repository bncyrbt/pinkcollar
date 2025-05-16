import { Account, getAvailableAccounts } from "@/lib/pinkcollar/auth";
import { AccountCard } from "./AccountCard";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function AvailableAccounts() {
  const { address } = useAccount();
  const [accounts, setAccounts] = useState<Account[]>([]);
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
      {accounts.map((account) => (
        <li key={account.account}>
          <AccountCard account={account} />
        </li>
      ))}
      <li>
        {/* Placeholder for new account creation */}
        <AccountCard />
      </li>
    </ul>
  );
}
