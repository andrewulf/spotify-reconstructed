"use client";
import { IconHeartFilled, IconTriangleFilled } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, Plus, Search } from "react-feather";

export default function NavigationItems() {
  const path = usePathname();
  return (
    <nav className="flex flex-col gap-4 mt-4 font-inter">
      <span
        className={`[&>*]:text-white/70 ${
          path == "/dashboard" && `[&>*]:text-white`
        } [&>*]:transition-all [&>*]:text-sm [&>*]:font-semibold  [&>*]:hover:text-white flex gap-4 items-center`}
      >
        <Home />
        <Link href="/dashboard">Home</Link>
      </span>
      <span
        className={`${path == "/dashboard/search" && `[&>*]:text-white`}
[&>*]:text-white/70  [&>*]:transition-all [&>*]:text-sm [&>*]:font-semibold  [&>*]:hover:text-white flex gap-4 items-center`}
      >
        <Search />
        <Link href="/dashboard/search">Search</Link>
      </span>
      <span className="[&>*]:text-white/70 [&>*]:transition-all [&>*]:text-sm [&>*]:font-semibold [&>*]:hover:text-white flex gap-4 items-center">
        <List />
        <Link href="/collection/library">Your library</Link>
      </span>
      <span className="mt-4 [&>*]:text-white/70 [&>*]:transition-all [&>*]:text-sm [&>*]:font-semibold [&>*]:hover:text-white flex gap-4 items-center">
        <span className="bg-white/70 rounded-sm">
          <Plus className="p-1 text-black" />
        </span>
        <Link href="/collection/library">Create playlist</Link>
      </span>
      <span className="[&>*]:text-white/70 [&>*]:transition-all [&>*]:text-sm [&>*]:font-semibold [&>*]:hover:text-white flex gap-4 items-center">
        <span className="bg-gradient-to-r from-purple-500/80 to-white/50 rounded-sm">
          <IconHeartFilled className="p-1 text-white/70" />
        </span>
        <Link href="/collection/library">Liked songs</Link>
      </span>
      <span className="[&>*]:text-white/70 [&>*]:transition-all [&>*]:text-sm [&>*]:font-semibold [&>*]:hover:text-white flex gap-4 items-center">
        <span className="bg-green-800 rounded-sm">
          <IconTriangleFilled className="p-1 text-green-400 rotate-180" />
        </span>
        <Link href="/collection/library">Your Episodes</Link>
      </span>
      <span className="border-b-[0.5px] border-white/10 w-full"></span>
    </nav>
  );
}
