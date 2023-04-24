"use client";
import useAccessToken from "@.hooks/useAccessToken";
import { usePlaybackStore } from "@.store/player";
import { usePlaylistStore } from "@.store/playlist";
import { playContext } from "@.utils/playerActions";
import { IconVolume2 } from "@tabler/icons-react";
import Link from "next/link";

export default function SidebarPlaylists() {
  const { playlists } = usePlaylistStore();
  const { playback } = usePlaybackStore();
  const currentPlaybackUri = playback?.context?.uri.split(":")[2];
  const checkIfLikedPlaylist = playback?.context?.type === "playlist";
  const [accessToken] = useAccessToken();
  return (
    <div className="overflow-x-hidden grow overflow-y-auto">
      <div className="flex flex-col gap-2 text-sm leading-7  font-inter font-regular mt-4 mb-2  min-h-0 ">
        {playlists &&
          playlists?.map((playlist) => (
            <Link
              href={`dashboard/playlist/${playlist.id}`}
              key={playlist.id}
              className={`${
                checkIfLikedPlaylist && currentPlaybackUri === playlist.id
                  ? "text-white"
                  : "text-white/60"
              } truncate hover:text-white  flex justify-between items-center`}
              onDoubleClick={() =>
                playContext({
                  access_token: accessToken!,
                  context_uri: playlist.context,
                  offset: 0,
                })
              }
            >
              {playlist.name}
              {checkIfLikedPlaylist && playlist?.id === currentPlaybackUri && (
                <IconVolume2 size={18} className="text-green-400" />
              )}
            </Link>
          ))}
      </div>
    </div>
  );
}
