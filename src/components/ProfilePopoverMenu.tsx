import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { logout } from "@/actions/auth";
import Link from "next/link";
import { AppRoutes } from "@/routes";

export default function ProfilePopoverMenu() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          {/* <AvatarImage src={} alt="@user" /> */}
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
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
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-red-500"
        >
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
