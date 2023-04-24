"use client";
import useAccessToken from "@.hooks/useAccessToken";
import {
  pausePlaying,
  seekSongPosition,
  skipNext,
  skipPrev,
} from "@.services/player.services";
import { usePlaybackStore } from "@.store/player";
import { playSong } from "@.utils/playerActions";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function millisToMinutesAndSeconds(millis: number) {
  let minutes = Math.floor(millis / 60000);
  let seconds = Number(((millis % 60000) / 1000).toFixed(0));
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const PlayerControls = () => {
  const [_sliderPos, setSliderPos] = useState(0);
  const [accessToken] = useAccessToken();
  const { playback, current_device } = usePlaybackStore();

  const skipNextSong = useMutation(() => skipNext(accessToken!));
  const skipPrevSong = useMutation(() => skipPrev(accessToken!));
  const pauseSong = useMutation(() => pausePlaying(accessToken!));
  const seekPosition = useMutation((newPos: number) =>
    seekSongPosition(newPos, accessToken!)
  );

  let progress_ms = Number((playback?.progress_ms! / 1000)?.toFixed(0));
  let duration_ms = Number((playback?.item?.duration_ms! / 1000)?.toFixed(0));

  useEffect(() => {
    setSliderPos(progress_ms);
  }, [playback?.progress_ms!]);

  let progress_to_percentage =
    ((progress_ms / duration_ms) * 100).toFixed(2) + "%";

  return (
    <>
      {playback?.item.uri && (
        <section className="flex flex-col grow w-96 items-center gap-2 font-inter">
          <div className="flex gap-4">
            <IconPlayerSkipBack
              size={18}
              className="cursor-pointer"
              onClick={() => skipPrevSong.mutate()}
            />
            {playback?.is_playing ? (
              <IconPlayerPauseFilled
                size={19}
                onClick={() => pauseSong.mutate()}
                className="cursor-pointer"
              />
            ) : (
              <IconPlayerPlayFilled
                size={18}
                className="cursor-pointer"
                onClick={() =>
                  playSong({
                    access_token: accessToken!,
                    device_id: playback?.device?.id,
                    spotify_uri: playback?.item?.uri,
                    position_ms: playback?.progress_ms || 0,
                  })
                }
              />
            )}
            <IconPlayerSkipForward
              size={18}
              className="cursor-pointer"
              onClick={() => skipNextSong.mutate()}
            />
          </div>
          <div className="flex gap-4 text-xs items-center">
            <span className="opacity-60">
              {millisToMinutesAndSeconds(playback?.progress_ms!)}
            </span>
            <div className="relative h-[5px] w-[30vw] cursor-pointer group bg-neutral-200 dark:bg-neutral-600 [&>*]:rounded-md">
              <span
                className="absolute h-[5px] bg-white group-hover:bg-green-400 group"
                style={{ width: progress_to_percentage }}
              ></span>
              <input
                className={`absolute z-30 cursor-pointer appearance-none bg-transparent rounded-full h-[7px] w-[30vw] [&::-webkit-slider-runnable-track]:w-4 [&::-webkit-slider-runnable-track]:invisible [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[14px]  [&::-webkit-slider-thumb]:w-[14px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:invisible hover:[&::-webkit-slider-thumb]:visible [&::-webkit-slider-thumb]:transition-all`}
                type="range"
                min={0}
                max={duration_ms}
                step="0.001"
                value={progress_ms}
                onChange={(e) => {
                  seekPosition.mutate(Number(e.currentTarget.value));
                  setSliderPos(Number(e.currentTarget.value));
                }}
              />
            </div>

            <span className="opacity-60">
              {millisToMinutesAndSeconds(playback?.item?.duration_ms)}
            </span>
          </div>
        </section>
      )}
    </>
  );
};

export default PlayerControls;
