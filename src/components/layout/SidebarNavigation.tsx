"use client";
import { useAuthStore } from "@/lib/store/auth";
import ProfilePopoverMenu from "../ProfilePopoverMenu";
import { Auth } from "../auth/Auth";
import { Button } from "../ui/button";
import { handleLogout } from "@/actions/auth";

export const SidebarNavigation = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className="sticky top-0 h-screen flex flex-col justify-between">
      <aside className=" w-24 flex flex-col items-center justify-start gap-5 py-6 ">
        {isAuthenticated && <ProfilePopoverMenu />}
        <Auth />
        <NavIcon icon="" label="Profile" />
        <NavIcon icon="" label="Explore" />
        <NavIcon icon="" label="Garments" />
        <NavIcon icon="⚙️" label="Settings" />
      </aside>
      <aside className="py-4">
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      </aside>
    </div>
  );
};

const NavIcon = ({ icon, label }: { icon: string; label: string }) => {
  return (
    <button
      className="w-12 h-12 rounded-sm flex items-center justify-center border border-black hover:bg-muted"
      title={label}
    >
      <span className="text-xl">{icon}</span>
    </button>
  );
};
