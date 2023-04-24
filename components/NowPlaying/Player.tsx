"use client";
import useAccessToken from "@.hooks/useAccessToken";
import PlayerServices from "@.services/player.services";
import { usePlaybackStore } from "@.store/player";
import { transferPlayback } from "@.utils/playerActions";
import { IconDeviceMobile } from "@tabler/icons-react";
import { useEffect } from "react";
import { Monitor, Speaker } from "react-feather";
import CurrentSong from "./CurrentSong";
import PlayerActions from "./PlayerActions";
import PlayerControls from "./PlayerControls";

const Player = () => {
  const [accessToken] = useAccessToken();
  const { devices, playback } = usePlaybackStore();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);
    let device = window?.navigator?.userAgent?.split(" ")[0].split("/")[0];

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: `Spotify Reconstructed (${device})`,
        getOAuthToken: (cb) => {
          cb(accessToken!);
        },
        volume: 0.5,
      });
      player?.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        usePlaybackStore.setState({ current_device: device_id });
      });

      player?.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player?.addListener("player_state_changed", (state) => {
        console.log("Player state changed.");
        if (!state) {
          console.error(
            "User is not playing music through the Web Playback SDK"
          );
          return;
        }
        player.resume();
      });
      player.connect();
    };
  }, [accessToken]);

  return (
    <aside className="border-t-[0.5px] border-t-white/5 px-4 w-screen h-full flex flex-row items-center justify-between bg-grack-900">
      <PlayerServices />
      <CurrentSong />
      <PlayerControls />
      <PlayerActions playback={playback} />
      <div className="absolute bottom-20 shadow-zinc-900 shadow-md right-5 m-4 bg-grack-800 border-[0.5px] border-white/5 px-6 py-4 rounded-md flex flex-col gap-2 text-xs">
        {devices?.devices?.map((device) => {
          if (device.is_active)
            return (
              <div
                key={device.id}
                className="flex gap-4 leading-4 items-center mb-4"
              >
                <Monitor size={28} />
                <aside>
                  <p className="font-bold text-lg">Current device</p>
                  <span className="flex items-center gap-2">
                    <Speaker size={18} />{" "}
                    <p className="text-green-400 truncate w-[120px]">
                      {device.name}
                    </p>
                  </span>
                </aside>
              </div>
            );
        })}

        <p className="font-bold">Select another device</p>
        {devices?.devices?.map((device) => {
          return (
            <span key={device.id} className="flex items-center gap-2">
              {device.type === "Computer" && <Monitor size={18} />}
              {device.type === "Smartphone" && <IconDeviceMobile size={19} />}
              <button
                data-id={device.id}
                key={device.id}
                className="p-2 rounded-md"
                onClick={(e) =>
                  transferPlayback({
                    device_id: e.currentTarget.dataset.id as string,
                    access_token: accessToken!,
                  })
                }
              >
                {device.name}
              </button>
            </span>
          );
        })}
      </div>
    </aside>
  );
};

export default Player;
