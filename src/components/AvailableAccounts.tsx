import { getAvailableAccounts } from "@/lib/client-services/auth";
import { AccountCard } from "./AccountCard";
import { useQuery } from "@tanstack/react-query";
type AvailableAccountsProps = {
  wallet: string;
};

export function AvailableAccounts({ wallet }: AvailableAccountsProps) {
  const { data, isLoading } = useQuery({
    queryKey: [wallet],
    queryFn: () => getAvailableAccounts(wallet),
  });

  if (isLoading) return "Loading...";
  if (!data || data.length === 0) return <div>No accounts found.</div>;

  return (
    <ul>
      {data.map((account) => (
        <li key={account.address}>
          <AccountCard account={account} />
        </li>
      ))}
    </ul>
  );
}
