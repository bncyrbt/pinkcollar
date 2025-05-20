"use client";
import { Auth } from "../auth/Auth";
import { Button } from "../ui/button";
import { handleLogout } from "@/actions/auth";
import Image from "next/image";
import Link from "next/link";
import { AppRoutes } from "@/routes";
import { useAuthStore } from "@/lib/store/auth";
import { ConnectKitButton } from "connectkit";

export const SidebarNavigation = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className="sticky top-0 h-screen flex flex-col justify-between">
      <aside className=" w-24 flex flex-col items-center justify-start gap-5 py-6 ">
        <Auth />
        <NavIcon src="/icons/notification.svg" to={AppRoutes.Notifications} />
        <NavIcon src="/icons/home.svg" to={AppRoutes.Home} />
        <NavIcon src="/icons/explore.svg" to={AppRoutes.Explore} />
        <NavIcon src="/icons/upload.svg" to={AppRoutes.Create} />
        <NavIcon
          src="/icons/contribution-menu.svg"
          to={AppRoutes.Contributions}
        />
      </aside>
      <aside className="py-4">
        <ConnectKitButton />
        {isAuthenticated && (
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        )}
      </aside>
    </div>
  );
};

type NavIconProps = {
  src: string; // path to the .svg file
  to: string;
};

const NavIcon = ({ to = "", src }: NavIconProps) => {
  return (
    <Link href={to}>
      <Image src={src} alt="nav-icon" width={32} height={32} />
    </Link>
  );
};

export default NavIcon;
