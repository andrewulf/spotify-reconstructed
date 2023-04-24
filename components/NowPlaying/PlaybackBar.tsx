"use client";
import { usePlaybackStore } from "@.store/player";
import { Speaker } from "react-feather";

function PlaybackBar() {
  // this needs to be the webplaybacksdk state
  const { devices, playback, current_device } = usePlaybackStore();
  return (
    <>
      {devices?.devices?.find(
        (dev) => dev.is_active && dev.id !== current_device
      ) && (
        <div className="col-span-full px-4 w-screen bg-green-400 h-6 flex justify-end">
          <p className="text-black font-semibold text-xs flex gap-2 items-center leading-2">
            <Speaker size={14} /> Listening on {playback?.device?.name}
          </p>
        </div>
      )}
    </>
  );
}
export default PlaybackBar;
