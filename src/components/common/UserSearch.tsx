import React, { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Account } from "@/lib/pinkcollar/auth";
import { UserPreview } from "../profile/UserPreview";

type Props = {
  value?: Account;
  onSelect: (user: Account) => void;
  fetchUsers: (query: string) => Promise<Account[]>;
};

export const UserSearch: React.FC<Props> = ({
  value,
  onSelect,
  fetchUsers,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Account[]>([]);
  const [showResults, setShowResults] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      const users = await fetchUsers(query);
      setResults(users);
      setShowResults(true);
    }, 300); // debounce
  }, [query, fetchUsers]);

  const handleSelect = (user: Account) => {
    setQuery("");
    setShowResults(false);
    onSelect(user);
  };

  return (
    <div className="relative">
      <Input
        value={value ? value.displayName : query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results && setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 100)}
        placeholder="Search users..."
      />

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border shadow z-10">
          {results.map((user) => (
            <div
              key={user.id}
              onClick={() => handleSelect(user)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              <UserPreview
                avatar={user.metadata.picture}
                main={user.displayName}
                sub={user.metadata.professions?.join(", ")}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
