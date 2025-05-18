import { Account } from "@/lib/pinkcollar/auth";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileBio } from "./ProfileBio";
import { ProfileStats } from "./ProfileStats";

type ProfileHeaderProps = {
  account?: Account;
};
export const ProfileHeader = ({ account }: ProfileHeaderProps) => {
  return (
    <div className="pl-16 pr-4 flex flex-row py-8">
      <div className="flex-1 flex-row">
        <ProfileAvatar src={account?.metadata.picture} variant="large" />
      </div>

      {!account ? (
        <div className="flex-6 flex-col pl-4 pt-1 space-y-2 animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
      ) : (
        <>
          <ProfileBio
            name={account.displayName}
            bio={account.metadata.bio}
            professions={account.metadata.professions}
            localName={`@${account.localName}`}
            links={account.metadata.links}
          />
          <ProfileStats />
        </>
      )}
    </div>
  );
};
