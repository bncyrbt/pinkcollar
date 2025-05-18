import { fetchAccountsByQuery } from "@/lib/pinkcollar/account";
import { UserSearch } from "../common/UserSearch";
import { Account } from "@/lib/pinkcollar/auth";
import { useCallback } from "react";

type SelectContributorProps = {
  value?: Account;
  onSelect: (contributor: Account) => void;
};
export const SelectContributor = ({
  value,
  onSelect,
}: SelectContributorProps) => {
  const fetchUsers = useCallback(async (query: string) => {
    const data = await fetchAccountsByQuery({
      localNameQuery: query,
    });
    return data.isOk() ? data.value : [];
  }, []);

  return (
    <UserSearch
      value={value}
      fetchUsers={fetchUsers}
      onSelect={(user) => onSelect(user)}
    />
  );
};
