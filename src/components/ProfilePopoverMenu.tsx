"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/actions/auth";
import Link from "next/link";
import { AppRoutes } from "@/routes";

export default function ProfilePopoverMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 space-y-1">
        <Link href={AppRoutes.Profile("")}>
          <Button variant="ghost" className="w-full justify-start">
            Profile
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start">
          Settings
        </Button>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-500"
        >
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
