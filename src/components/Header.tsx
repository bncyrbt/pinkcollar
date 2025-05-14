"use client";
import { LoginDialog } from "./LoginDialog";
import { useAuthStore } from "@/lib/store/auth";
import { useAppInit } from "@/hooks/useAppInit";
import { Button } from "./ui/button";

export const Header = () => {
  useAppInit();
  const user = useAuthStore((state) => state.user?.signer);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="h-20 w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 border-b border-b-neutral-800 bg-background">
      <div className="text-xl font-bold">Pinkcollar</div>
      <div className="space-x-6 hidden md:flex">
        {user ? (
          <div>
            {user}
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          </div>
        ) : (
          <LoginDialog />
        )}
      </div>
    </header>
  );
};
