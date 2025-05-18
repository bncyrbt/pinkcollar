"use client";
import { Divider } from "../ui/divider";
import { ProfileContent } from "./ProfileContent";
import { useAccount } from "@/hooks/useAccount";
import { ProfileHeader } from "./ProfileHeader";

export const Profile = ({ localName }: { localName: string }) => {
  const { data } = useAccount({ localName });

  return (
    <main className="flex flex-col w-full h-full">
      <ProfileHeader account={data} />
      <Divider />

      <div className="flex-1">
        <ProfileContent />
      </div>
    </main>
  );
};
