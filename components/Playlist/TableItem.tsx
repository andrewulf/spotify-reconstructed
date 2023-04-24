"use client";
import { millisToMinutesAndSeconds } from "@.components/NowPlaying/PlayerControls";
import useAccessToken from "@.hooks/useAccessToken";
import { addItemToQueue } from "@.services/player.services";
import { usePlaybackStore } from "@.store/player";
import { PlaylistTrack, Track } from "@.types/spotify";
import { playContext, playSong } from "@.utils/playerActions";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

export const WavebarIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="wavebar"
        d="M3.99902 14H5.99902V0H3.99902V14ZM-0.000976562 14H1.9902V4H-0.000976562V14ZM12 7V14H14V7H12ZM8.00002 14H10V10H8.00002V14Z"
        fill="#1DB954"
      />
    </svg>
  );
};

function TableItem({
  playlistContext,
  track,
  playlistItem,
  total,
}: {
  track?: Track | null;
  playlistItem?: PlaylistTrack | null;
  total?: number;
  playlistContext?: any;
}) {
  const [currentSongPlaying, setCurrentSongPlaying] = useState<boolean>(false);
  const [accessToken] = useAccessToken();
  const { playback, devices, current_device } = usePlaybackStore();
  const [playButton, setPlayButton] = useState<JSX.Element | number | string>(
    total || 0
  );
  const addSongToQueue = useMutation((trackUri: string) =>
    addItemToQueue(trackUri, accessToken!)
  );
  let song = playlistItem?.track !== undefined ? playlistItem?.track : track;

  useEffect(() => {
    setCurrentSongPlaying(
      playback?.item?.id === song?.id && playback?.is_playing!
    );
    if (currentSongPlaying) {
      setPlayButton(<WavebarIcon />);
    } else {
      setPlayButton(total!);
    }
  }, [playback, total!]);

  let playingDevice = devices?.devices.filter((d) => d.is_active && d);

  return (
    <div
      className="text-sm grid-cols-playlist grid px-2 py-2 rounded-md hover:bg-white/10 font-inter items-center"
      key={song?.uri}
      onMouseEnter={() => {
        if (currentSongPlaying) {
          setPlayButton(<IconPlayerPauseFilled size={18} />);
        } else {
          setPlayButton(<IconPlayerPlayFilled size={18} />);
        }
      }}
      onMouseLeave={() => {
        if (currentSongPlaying) {
          <WavebarIcon />;
        } else {
          setPlayButton(total!);
        }
      }}
      onFocus={() => setPlayButton(<IconPlayerPlayFilled size={18} />)}
      onBlur={() => setPlayButton(total!)}
    >
      <button
        className="col-start-1 flex items-center justify-center cursor-pointer w-auto h-auto text-sm aspect-square transition-all"
        data-id={song?.uri}
        data-track-index={total}
        onClick={(e) => {
          if (playlistContext) {
            console.log(
              "Playing track id: ",
              Number(total) - 1,
              song?.name,
              playlistContext?.uri,
              song?.uri
            );
            playContext({
              access_token: accessToken!,
              context_uri: playlistContext?.uri,
              offset: Number(total) - 1,
            });
          } else {
            playSong({
              access_token: accessToken!,
              device_id: current_device,
              spotify_uri: song?.uri,
            });
          }
        }}
      >
        {playButton}
      </button>
      <div className="col-start-2 ml-2 flex items-center gap-3">
        <Image
          src={song?.album?.images[0]?.url}
          alt={song?.name!}
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <p
            className={`cursor-pointer line-clamp-1 ${
              playback?.item?.id === song?.id &&
              playback?.is_playing &&
              "text-green-400"
            }`}
            onDoubleClick={() => {
              addSongToQueue.mutate(song?.uri);
            }}
          >
            {song?.name}
          </p>
          <div className="flex">
            {song?.artists?.map((artist, i: number) => {
              if (i + 1 === song?.artists.length) {
                return (
                  <p
                    key={artist.id}
                    className="cursor-pointer opacity-60 hover:opacity-90 hover:underline"
                  >
                    {artist.name}
                  </p>
                );
              } else {
                return (
                  <span key={artist.id} className="flex">
                    <p className="cursor-pointer opacity-60 hover:opacity-90 hover:underline line-clamp-1">
                      {artist.name}
                    </p>
                    <span className="opacity-60">,&nbsp;</span>
                  </span>
                );
              }
            })}
          </div>
        </div>
      </div>
      <p className="col-start-3 opacity-60 hover:underline hover:opacity-90 cursor-pointer line-clamp-2">
        {song?.album?.name}
      </p>
      {/*
     adding timeStyle prop to Intl API will display the time too, but Spotify doenst show it so omitting it wont show it
    */}
      {playlistItem !== undefined && (
        <p className="col-start-4 opacity-60 cursor-default">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
          }).format(Date.parse(playlistItem?.added_at as string))}
        </p>
      )}
      <p className="col-start-5 cursor-default opacity-60">
        {millisToMinutesAndSeconds(song?.duration_ms)}
      </p>
    </div>
  );
}

export default TableItem;
