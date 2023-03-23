"use client";
import { usePlaybackStore } from "@.store/player";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function CurrentSong() {
  const [marqueeTrigger, setMarqueeTrigger] = useState<boolean>(false);
  const songNameRef = useRef<HTMLParagraphElement | null>(null);
  const { playback: data, isLoading } = usePlaybackStore();

  useEffect(() => {
    songNameRef?.current?.getBoundingClientRect()?.width! > 150
      ? setMarqueeTrigger(true)
      : setMarqueeTrigger(false);
  }, [data?.item?.id]);

  return (
    <>
      {isLoading && <div className="animate-pulse">Loading...</div>}
      {data?.currently_playing_type === "track" && (
        <div className="m-2 flex items-center gap-4 max-w-[500px] grow">
          <Image
            className=""
            src={data?.item?.album?.images[2].url}
            height={data?.item?.album?.images[2].height! - 20}
            width={data?.item?.album?.images[2].width! - 20}
            alt={data?.item?.name!}
          />
          <div className="overflow-x-hidden flex justify-center items-center text-white rounded-md">
            <span className="max-w-[200px] flex flex-col">
              <p className="flex gap-2 whitespace-nowrap group cursor-pointer">
                <span
                  ref={songNameRef}
                  className={`text-xs font-semibold whitespace-nowrap ${
                    marqueeTrigger && "animate-marquee"
                  } group-hover:underline`}
                >
                  {data?.item?.name}
                </span>
                {marqueeTrigger && (
                  <span
                    className={`text-xs font-semibold whitespace-nowrap  animate-marquee group-hover:underline`}
                  >
                    {data?.item?.name}
                  </span>
                )}
              </p>
              <p className="text-xs opacity-60 line-clamp-1 hover:opacity-100 cursor-pointer">
                {data?.item?.artists[0]?.name}
              </p>
            </span>
          </div>
          {!isLoading && (
            <>
              {false ? (
                <IconHeart
                  size={28}
                  className="hover:text-green-400 hover:opacity-100 opacity-70 transition-all cursor-pointer p-1"
                />
              ) : (
                <IconHeartFilled
                  className="text-green-400 cursor-pointer p-1"
                  size={28}
                />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
