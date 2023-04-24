"use client";
import TableItem from "@.components/Playlist/TableItem";
import useAccessToken from "@.hooks/useAccessToken";
import { pausePlaying } from "@.services/player.services";
import {
  getPlaylistTracks,
  getSinglePlaylist,
} from "@.services/queries/player.queries";
import { usePlaybackStore } from "@.store/player";
import { usePlaylistStore } from "@.store/playlist";
import { PlaylistTrack } from "@.types/spotify";
import getDominantColor from "@.utils/getDominantColor";
import { playContext } from "@.utils/playerActions";
import {
  IconChevronDown,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconSearch,
} from "@tabler/icons-react";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const [accessToken] = useAccessToken();
  const { ref, inView } = useInView();
  const { playback, current_device, devices } = usePlaybackStore();
  const [bgColor, setBgColor] = useState<number[] | null>(null);
  const pauseSong = useMutation(() => pausePlaying(accessToken!));

  // GET PLAYLIST INFO
  const { data: playlist } = useQuery(
    ["playlist", params.id],
    async () => await getSinglePlaylist(params.id, accessToken!),
    {
      enabled: accessToken != undefined,
    }
  );

  useEffect(() => {
    usePlaylistStore.setState({ context: playlist });
  }, [playlist]);

  useEffect(() => {
    async function playlistHeaderBgColor() {
      let data = await getDominantColor(playlist?.images[0]?.url!);
      setBgColor(() => data);
    }
    playlistHeaderBgColor();
  }, [playlist]);
  let numFormat = new Intl.NumberFormat("en-US");

  // GET PLAYLIST TRACKS
  let RETURN_LIMIT = 100; // how many tracks to return each fetch request (infinite scroll - defaults to 100)
  const {
    data: tracks,
    error,
    fetchNextPage,
  } = useInfiniteQuery(
    ["tracks", params.id],
    async ({ pageParam = 0 }) =>
      await getPlaylistTracks(params.id, accessToken!, RETURN_LIMIT, pageParam),
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
      {playlist && (
        <div
          key={playlist.id}
          className={`flex relative h-full w-full items-center gap-4 px-8 pb-8 pt-20 z-0`}
          style={{ backgroundColor: `rgb(${bgColor})` }}
        >
          <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
          {playlist.images && (
            <Image
              priority
              src={playlist?.images[0]?.url}
              width={250}
              height={250}
              alt={playlist.id}
              className="aspect-square h-auto object-cover z-10"
            />
          )}
          <div className="flex font-inter justify-between flex-col gap-2 z-10 h-[248px] grow">
            <div className="flex flex-col my-auto justify-center">
              {playlist?.public ? (
                <p className="text-xs font-semibold">PUBLIC PLAYLIST</p>
              ) : (
                <p className="text-xs font-semibold">PRIVATE PLAYLIST</p>
              )}
              <h1 className="text-6xl font-extrabold">{playlist.name}</h1>
            </div>
            <div className="">
              {playlist.description && (
                <p className="text-sm opacity-60">{playlist.description}</p>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Image
                  priority
                  src={
                    playlist?.owner?.images
                      ? playlist?.owner?.images[0].url
                      : "/spotify.svg"
                  }
                  height={16}
                  width={16}
                  alt={playlist?.owner?.display_name!}
                  className="rounded-full"
                />
                <p className="font-semibold">{playlist?.owner?.display_name}</p>
                {playlist?.followers?.total > 0 && (
                  <>
                    <span className="text-xs">•</span>
                    <p>{numFormat.format(playlist?.followers?.total)} likes</p>
                  </>
                )}
                <span className="text-xs">•</span>
                <p className="">{playlist?.tracks?.total} songs</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <aside className="relative flex justify-between items-center w-full px-8 py-4 ">
        <div
          className="w-full h-[350px] absolute inset-0"
          style={{
            background: `linear-gradient(
      to bottom,
      rgba(${bgColor}, 0.19),
      rgba(9, 9, 11, 0.25) 90.71%
    )`,
          }}
        ></div>
        <div className="flex">
          <span
            className="rounded-full p-4 bg-green-400 w-fit h-fit cursor-pointer z-10"
            onClick={() => {
              playback?.context?.uri === playlist?.uri && playback?.is_playing
                ? pauseSong.mutate()
                : playContext({
                    access_token: accessToken!,
                    context_uri: playlist?.uri,
                    offset: 0,
                  });
            }}
          >
            {playback?.context?.uri === playlist?.uri &&
            playback?.is_playing ? (
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
              playlistContext={playlist}
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
