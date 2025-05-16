import { ProfileBio } from "@/components/profile/ProfileBio";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { Divider } from "@/components/ui/divider";

export default function ProfilePage() {
  return (
    <main className="flex flex-col w-full">
      {/* Header */}
      <div className="h-[300px] pl-16 pr-4 flex flex-row py-8">
        {/* Avatar */}
        <div className="flex-1 flex-row">
          <div className="w-24 h-24 rounded-full bg-gray-300"></div>
        </div>
        <ProfileBio />
        <ProfileStats />
      </div>
      <Divider />
      <ProfileContent />
    </main>
  );
}
