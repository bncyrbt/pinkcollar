import { AccountCard } from "./AccountCard";
import { useAuthStore } from "@/lib/store/auth";
import { useEffect } from "react";

export function AvailableAccounts() {
  const accounts = useAuthStore((state) => state.availableAccounts);
  const fetchAvailableAccounts = useAuthStore(
    (state) => state.fetchAvailableAccounts
  );

  useEffect(() => {
    fetchAvailableAccounts();
  }, [fetchAvailableAccounts]);

  if (!accounts) return <div>Loading ...</div>;

  if (!accounts.length) return <div>No accounts found.</div>;

  return (
    <ul>
      {accounts.map((account) => (
        <li key={account.account}>
          <AccountCard account={account} />
        </li>
      ))}
    </ul>
  );
}
