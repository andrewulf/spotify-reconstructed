"use client";
import { millisToMinutesAndSeconds } from "@.components/NowPlaying/PlayerControls";
import useAccessToken from "@.hooks/useAccessToken";
import { usePlaybackStore } from "@.store/player";
import { PlaylistTrack, Track } from "@.types/spotify";
import { play } from "@.utils/playerActions";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

function TableItem({
  playlistTrack,
  track,
  total,
}: {
  playlistTrack: PlaylistTrack;
  track: Track;
  total: number | string;
}) {
  const [accessToken] = useAccessToken();
  const { playback, current_device } = usePlaybackStore();
  const [playButton, setPlayButton] = useState<JSX.Element | number | string>(
    total
  );

  return (
    <div
      className="text-sm grid-cols-playlist grid px-2 py-2 hover:bg-white/10 font-inter items-center"
      key={track.uri}
      onMouseEnter={() => setPlayButton(<IconPlayerPlayFilled size={18} />)}
      onMouseLeave={() => setPlayButton(total)}
    >
      <button
        className="col-start-1 flex items-center justify-center cursor-pointer w-auto h-auto text-sm aspect-square transition-all"
        data-id={track.uri}
        onClick={(e) =>
          play({
            spotify_uri: e?.currentTarget?.dataset?.id!,
            access_token: accessToken!,
            progress_ms: playback?.progress_ms,
            device_id: current_device,
          })
        }
      >
        {playButton}
      </button>
      <div className="col-start-2 ml-2 flex items-center gap-3">
        <Image
          src={track?.album?.images[0]?.url}
          alt={track?.name!}
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <p className="cursor-pointer">{track.name}</p>
          <div className="flex">
            {track?.artists.map((artist, i: number) => {
              if (i + 1 === track?.artists.length) {
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
                    <p className="cursor-pointer opacity-60 hover:opacity-90 hover:underline">
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
      <p className="col-start-3 opacity-60 hover:underline hover:opacity-90 cursor-pointer">
        {track?.album?.name}
      </p>
      {/*
     adding timeStyle prop to Intl API will display the time too, but Spotify doenst show it so omitting it wont show it
    */}
      <p className="col-start-4 opacity-60 cursor-default">
        {new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
        }).format(Date.parse(playlistTrack?.added_at as string))}
      </p>
      <p className="col-start-5 cursor-default opacity-60">
        {millisToMinutesAndSeconds(track?.duration_ms)}
      </p>
    </div>
  );
}
export default TableItem;
