"use client";
import { usePlaybackStore } from "@.store/player";
import {
  IconPlayerPlayFilled,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
} from "@tabler/icons-react";

export function millisToMinutesAndSeconds(millis: number) {
  let minutes = Math.floor(millis / 60000);
  let seconds = Number(((millis % 60000) / 1000).toFixed(0));
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const PlayerControls = () => {
  const { playback: data, isLoading } = usePlaybackStore();

  let progress_ms = Number((data?.progress_ms! / 1000)?.toFixed(0));
  let duration_ms = Number((data?.item?.duration_ms! / 1000)?.toFixed(0));

  let progress_to_percentage =
    ((progress_ms / duration_ms) * 100).toFixed(2) + "%";

  return (
    <>
      {isLoading && <div className="animate-pulse">Loading...</div>}
      {data?.is_playing && (
        <section className="flex flex-col grow w-96 items-center gap-2 font-inter">
          <div className="flex gap-4">
            <IconPlayerSkipBack size={18} />
            <IconPlayerPlayFilled size={18} />
            <IconPlayerSkipForward size={18} />
          </div>
          <div className="flex gap-4 text-xs items-center">
            <span className="opacity-60">
              {millisToMinutesAndSeconds(data?.progress_ms!)}
            </span>
            <div className="h-[5px] w-[30vw] cursor-pointer group bg-neutral-200 dark:bg-neutral-600 [&>*]:rounded-md">
              <div
                className="relative h-[5px] bg-white group-hover:bg-green-400 transition-all group"
                style={{ width: progress_to_percentage }}
              >
                <span className="h-[12px] w-[12px] rounded-full right-0 -top-2/3 absolute bg-white opacity-0 group-hover:opacity-100 transition-all"></span>
              </div>
            </div>
            <span className="opacity-60">
              {millisToMinutesAndSeconds(data?.item?.duration_ms)}
            </span>
          </div>
        </section>
      )}
    </>
  );
};

export default PlayerControls;
