import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthenticatedUser, useLogout } from "@lens-protocol/react";
import { User } from "lucide-react";

export default function ProfilePopoverMenu() {
  const { data: authenticatedUser } = useAuthenticatedUser();
  const { execute: logout } = useLogout();

  if (!authenticatedUser) {
    return null;
  }

  console.log(authenticatedUser);

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
        <Button variant="ghost" className="w-full justify-start">
          Profile
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Settings
        </Button>
        <Button
          onClick={() => logout}
          variant="ghost"
          className="w-full justify-start text-red-500"
        >
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
