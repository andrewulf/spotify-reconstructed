"use client";
import Navigation from "@.components/Navigation/Navigation";
import PlaylistServices from "@.services/playlist.services";
import Image from "next/image";
import SidebarPlaylists from "./SidebarPlaylists";

export default function Sidebar() {
  return (
    <section className="flex flex-col justify-between w-full [&>*]:px-6 bg-black border-r-[0.5px] border-white/10 top-0 h-full">
      <div className="flex items-center justify-center gap-2 my-4">
        <Image src="/spotify.svg" width={30} height={30} alt="spotify logo" />
        <div className="leading-3">
          <p className="text-sm font-semibold text-green-400">
            Spotify Demo App
          </p>
          <a
            href="https://github.com/prozod"
            target="_blank"
            rel="noreferrer"
            className="text-xs cursor-pointer hover:underline hover:text-yellow-400 hover:opacity-100 font-inter opacity-60"
          >
            by Andreas W.
          </a>
        </div>
      </div>
      <Navigation />
      <SidebarPlaylists />
      <PlaylistServices />
    </section>
  );
}
