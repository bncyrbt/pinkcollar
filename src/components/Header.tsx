"use client";
import { LoginDialog } from "./LoginDialog";
import { useEffect } from "react";
import { useAuth } from "@/lib/store/auth";

export const Header = () => {
  const user = useAuth((state) => state.user);
  const login = useAuth((state) => state.login);

  useEffect(() => {
    login();
  }, [login]);

  return (
    <header className="h-20 w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 border-b border-b-neutral-800 bg-background">
      <div className="text-xl font-bold">Pinkcollar</div>
      <div className="space-x-6 hidden md:flex">
        {user ? <div>You R-O-C-K - - {user?.address}</div> : <LoginDialog />}
      </div>
    </header>
  );
};
