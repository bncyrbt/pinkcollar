"use client";
import { Account } from "@/lib/pinkcollar/auth";
import { ProfileBio } from "./ProfileBio";
import { ProfileStats } from "./ProfileStats";
import { Divider } from "../ui/divider";
import { ProfileContent } from "./ProfileContent";
import { useEffect, useState } from "react";
import { fetchAccount } from "@/lib/pinkcollar/account";
import Spinner from "../ui/spinner";
import { ProfileAvatar } from "./ProfileAvatar";

export const Profile = ({ localName }: { localName: string }) => {
  const [account, setAccount] = useState<Account>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!localName) return;
      setLoading(true);
      const data = await fetchAccount({ localName });
      if (data.isOk()) {
        setAccount(data.value);
      } else {
        // handle errors
      }
      setLoading(false);
    };
    fetch();
  }, [localName]);

  const name = account?.metadata.name ?? localName;

  return (
    <main className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="pl-16 pr-4 flex flex-row py-8">
        {/* Avatar */}
        <div className="flex-1 flex-row">
          <ProfileAvatar
            src={account?.metadata.picture}
            variant="large"
            initials={name.charAt(0).toUpperCase()}
          />
        </div>

        {isLoading || !account ? (
          <div className="flex-6 flex-col pl-4 pt-1 space-y-2 animate-pulse">
            <div className="h-6 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-64 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        ) : (
          <ProfileBio
            name={name}
            bio={account.metadata.bio}
            localName={`@${account.localName}`}
            links={account.metadata.links}
          />
        )}

        {!isLoading && <ProfileStats />}
      </div>

      <Divider />

      <div className="flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner />
          </div>
        ) : (
          <ProfileContent />
        )}
      </div>
    </main>
  );
};
