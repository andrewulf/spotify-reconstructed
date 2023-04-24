"use client";
import Image from "next/image";
import useAccessToken from "@.hooks/useAccessToken";
import { pausePlaying } from "@.services/player.services";
import { PLAYLIST_QUERY } from "@.services/queries/playlist.queries";
import { usePlaybackStore } from "@.store/player";
import { useUserStore } from "@.store/user";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import TableItem from "@.components/Playlist/TableItem";
import { PlaylistTrack } from "@.types/spotify";
import {
  IconChevronDown,
  IconHeartFilled,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconSearch,
} from "@tabler/icons-react";
import { playSong } from "@.utils/playerActions";

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const [accessToken] = useAccessToken();
  const { ref, inView } = useInView();
  const { user } = useUserStore();
  const { playback } = usePlaybackStore();
  const pauseSong = useMutation(() => pausePlaying(accessToken!));

  let numFormat = new Intl.NumberFormat("en-US");

  // GET PLAYLIST TRACKS
  let RETURN_LIMIT = 10; // how many tracks to return each fetch request (infinite scroll - defaults to 100)
  const {
    data: tracks,
    error,
    fetchNextPage,
  } = useInfiniteQuery(
    ["tracks", params.id],
    ({ pageParam = 0 }) =>
      PLAYLIST_QUERY.SAVED_TRACKS_FN(accessToken!, RETURN_LIMIT, pageParam),
    {
      enabled: accessToken != undefined,
      getNextPageParam: (lastPage) => lastPage.offset + RETURN_LIMIT,
    }
  );
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <section className="flex relative flex-col">
      {!error && (
        <div
          key={tracks?.pages[0].total}
          className={`flex relative h-full w-full items-center gap-4 px-8 pb-8 pt-20 z-0 bg-indigo-500`}
        >
          <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
          <span className="bg-gradient-to-br from-indigo-600 to-cyan-200 rounded-sm w-[250px] h-[250px] flex items-center justify-center">
            <IconHeartFilled className="p-1 text-white z-10" size={96} />
          </span>
          <div className="flex font-inter justify-between flex-col gap-2 z-10 h-[248px] grow">
            <div className="flex flex-col my-auto justify-center">
              <p className="text-xs font-semibold">PLAYLIST</p>
              <h1 className="text-6xl font-extrabold">Liked Songs</h1>
            </div>
            <div className="">
              <div className="flex items-center gap-2 text-sm">
                <Image
                  priority
                  src={user?.images ? user?.images[0]?.url : "/spotify.svg"}
                  height={16}
                  width={16}
                  alt={user?.display_name!}
                  className="rounded-full"
                />
                <p className="font-semibold">{user?.display_name}</p>
                <span className="text-xs">•</span>
                <p className="">{tracks?.pages[0].total} songs</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <aside className="relative flex justify-between items-center w-full px-8 py-4 ">
        <div className="w-full h-[350px] absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-grack-900"></div>
        <div className="flex">
          <span
            className="rounded-full p-4 bg-green-400 w-fit h-fit cursor-pointer z-10"
            onClick={() => {
              playback?.context?.uri === "a" && playback?.is_playing
                ? pauseSong.mutate()
                : playSong({
                    access_token: accessToken!,
                    spotify_uri: tracks?.pages[0].items[0].track?.uri,
                  });
            }}
          >
            {playback?.context?.uri === "a" && playback?.is_playing ? (
              <IconPlayerPauseFilled className="text-gray-800" />
            ) : (
              <IconPlayerPlayFilled className="text-gray-800" />
            )}
          </span>
        </div>
        <div className="flex items-center gap-4 z-10">
          <IconSearch className="text-gray-400" size={20} />
          <span className="flex items-center justify-center text-xs leading-2 gap-1 text-gray-400">
            Custom order
            <IconChevronDown size={18} className="leading-4" />
          </span>
        </div>
      </aside>
      {error && (
        <p>Something went wrong while getting the songs, please try again.</p>
      )}
      <div className="mx-8 mb-2 bg-transparent z-10">
        <div className="grid-cols-playlist w-full grid px-4 text-sm opacity-60 py-2 hover:bg-white/10 transition-all font-inter items-center">
          <p className="col-start-1">#</p>
          <p className="col-start-2">Title</p>
          <p className="col-start-3">Album</p>
          <p className="col-start-4">Date added</p>
          <p className="col-start-5">Length</p>
        </div>
        <div className="w-full h-[1px] mb-4 bg-white/10"></div>
        {tracks?.pages.map((page) =>
          page?.items?.map((track, i) => (
            <TableItem
              playlistItem={track as PlaylistTrack}
              key={track?.track?.id}
              total={page.offset + i + 1}
            />
          ))
        )}
        <span ref={ref} className="bg-transparent w-full h-[1px]"></span>
      </div>
    </section>
  );
}
