"use client";
import { useAppInit } from "@/hooks/useAppInit";
import { Auth } from "../auth/Auth";
import Link from "next/link";
import { AppRoutes } from "@/routes";
import { SearchBar } from "./SearchBar";
import Image from "next/image";

export const Header = () => {
  useAppInit();

  return (
    <header className="flex justify-between py-6">
      <Link href={AppRoutes.Explore}>
        <div className="flex flex-row items-center gap-2">
          <Image src="/icons/logo.svg" width={32} height={32} alt="logo" />
          <div className="text-xl font-bold">Pinkcollar</div>
        </div>
      </Link>
      <div className="flex flex-row">
        <SearchBar />
      </div>
    </header>
  );
};
