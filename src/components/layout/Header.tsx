"use client";
import { useAppInit } from "@/hooks/useAppInit";
import { Auth } from "../auth/Auth";
import Link from "next/link";
import { AppRoutes } from "@/routes";
import { SearchBar } from "./SearchBar";

export const Header = () => {
  useAppInit();

  return (
    <header className="flex justify-between py-6">
      <Link href={AppRoutes.Explore}>
        <div className="text-xl font-bold">Pinkcollar</div>
      </Link>
      <div className="flex flex-row">
        <SearchBar />
      </div>
    </header>
  );
};
