import { useAccountsAvailable } from "@lens-protocol/react";

export const AccountData = ({ address }: { address: string }) => {
  const { data } = useAccountsAvailable({
    managedBy: address,
    includeOwned: true,
  });

  if (!data?.items.length) {
    return (
      <div>
        <div>No Accounts</div>
        <div className="border-0">Sign Up</div>
      </div>
    );
  }

  return (
    <div>
      {data?.items.map((account) => (
        <div key={account.account.address}>
          {account.account.username?.value}
        </div>
      ))}
    </div>
  );
};
