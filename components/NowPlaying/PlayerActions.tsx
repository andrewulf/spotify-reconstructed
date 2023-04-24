"use client";
import useAccessToken from "@.hooks/useAccessToken";
import { playerVolume } from "@.services/player.services";
import { IconDeviceSpeaker } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { List, Volume1, Volume2, VolumeX } from "react-feather";

const PlayerActions = ({ playback }) => {
  const [vol, setVol] = useState<number | undefined>(50);
  const [accessToken] = useAccessToken();
  const changeVolume = useMutation((volume: number) =>
    playerVolume(volume, accessToken!)
  );

  useEffect(() => {
    setVol(playback?.device?.volume_percent);
  }, []);

  return (
    <section className="gap-3  flex grow items-center justify-end right-0 mr-4">
      <Link href="/dashboard/queue">
        <List size={20} className="opacity-70" />
      </Link>
      <IconDeviceSpeaker size={20} className="opacity-70" />

      <div className="flex gap-4 text-xs items-center">
        {vol > 50 ? (
          <Volume2 size={20} className="opacity-70" />
        ) : vol !== 0 ? (
          <Volume1 size={20} className="opacity-70" />
        ) : (
          <VolumeX size={20} className="opacity-70" />
        )}
        <div className="h-[5px] w-[100px] group bg-neutral-200 dark:bg-neutral-600 rounded-md relative">
          <span
            className="absolute h-[5px] rounded-full bg-white group-hover:bg-green-400 group"
            style={{ width: vol + "%" }}
          ></span>
          <input
            className="absolute z-30 cursor-pointer appearance-none bg-transparent rounded-full h-[7px] w-[100px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[14px]  [&::-webkit-slider-thumb]:w-[14px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:invisible hover:[&::-webkit-slider-thumb]:visible [&::-webkit-slider-thumb]:transition-all
                "
            type="range"
            min={0}
            max={100}
            step="0.01"
            value={vol}
            onChange={(e) => {
              setVol(Number(e.currentTarget.value));
              changeVolume.mutate(Number(e.currentTarget.value));
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default PlayerActions;
// <div
//   className="h-[5px] bg-white rounded-md transition-all"
//   style={{
//     width: `${playback?.device?.volume_percent}%`,
//   }}
// ></div>
