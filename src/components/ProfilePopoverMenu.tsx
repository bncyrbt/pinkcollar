"use client";
import Link from "next/link";
import { AppRoutes } from "@/routes";
import { useAuthStore } from "@/lib/store/auth";
import { ProfileAvatar } from "./profile/ProfileAvatar";

export default function ProfilePopoverMenu() {
  const { user } = useAuthStore();
  if (!user) {
    return null;
  }
  const name = user.metadata.name ?? user.localName;
  return (
    <Link href={AppRoutes.Profile(user.localName)} className="cursor-pointer">
      <ProfileAvatar
        src={user.metadata.picture}
        variant="small"
        initials={name.charAt(0).toUpperCase()}
      />
    </Link>
  );
}
