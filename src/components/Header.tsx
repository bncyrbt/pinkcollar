"use client";
import { useAppInit } from "@/hooks/useAppInit";
import { Auth } from "./auth/Auth";

export const Header = () => {
  useAppInit();

  return (
    <header className="h-20 w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 border-b border-b-neutral-800 bg-background">
      <div className="text-xl font-bold">Pinkcollar</div>
      <div className="space-x-6 hidden md:flex">Explore</div>
      <Auth />
    </header>
  );
};
