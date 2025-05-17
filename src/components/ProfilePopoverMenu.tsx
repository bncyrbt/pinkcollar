"use client";
import Link from "next/link";
import { AppRoutes } from "@/routes";
import { useAuthStore } from "@/lib/store/auth";

export default function ProfilePopoverMenu() {
  const { user } = useAuthStore();
  if (!user) {
    return null;
  }
  const name = user.metadata.name ?? user.localName;
  return (
    <Link href={AppRoutes.Profile(user.localName)} className="cursor-pointer">
      <div className="w-12 h-12 rounded-full bg-gray-300 border-black border flex flex-row justify-center items-center">
        {name.charAt(0).toUpperCase()}
      </div>
    </Link>
  );
}
