import useAccessToken from "@.hooks/useAccessToken";
import { usePlaybackStore } from "@.store/player";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { CLIENT_QUERY } from "./queries/player.queries";

function PlayerServices() {
  const [accessToken] = useAccessToken();

  const { data: playback } = useQuery(
    [CLIENT_QUERY.PLAYBACK_KEY],
    () => CLIENT_QUERY.PLAYBACK_FN(accessToken!),
    {
      refetchIntervalInBackground: true,
      refetchInterval: 1000,
      refetchOnWindowFocus: "always",
      enabled: accessToken !== undefined,
    }
  );

  const { data: queue } = useQuery(
    [CLIENT_QUERY.USERQUEUE_KEY],
    () => CLIENT_QUERY.USERQUEUE_FN(accessToken!),
    {
      refetchOnWindowFocus: "always",
      refetchIntervalInBackground: true,
      refetchInterval: 1000,
      enabled: accessToken !== undefined,
    }
  );

  const { data: devices } = useQuery(
    [CLIENT_QUERY.DEVICES_KEY],
    () => CLIENT_QUERY.DEVICES_FN(accessToken!),
    {
      refetchOnWindowFocus: "always",
      refetchIntervalInBackground: true,
      refetchInterval: 1000,
      enabled: accessToken !== undefined,
    }
  );

  useEffect(() => {
    usePlaybackStore.setState({ playback, devices, queue });
  }, [devices, playback, queue]);

  return null;
}

// mutation fetch functions
export function playerVolume(volume: number, accessToken: string) {
  return fetch(
    `https://api.spotify.com/v1/me/player/volume?volume_percent=${Number(
      volume
    ).toFixed(0)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export function seekSongPosition(newPosition: number, accessToken: string) {
  return fetch(
    `https://api.spotify.com/v1/me/player/seek?position_ms=${
      newPosition * 1000
    }`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export function pausePlaying(accessToken: string) {
  return fetch(`https://api.spotify.com/v1/me/player/pause`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function skipPrev(accessToken: string) {
  return fetch(
    `
          https://api.spotify.com/v1/me/player/previous
          `,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}
export function skipNext(accessToken: string) {
  return fetch(
    `
          https://api.spotify.com/v1/me/player/next
          `,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export function addItemToQueue(trackUri: string, accessToken: string) {
  return fetch(
    `https://api.spotify.com/v1/me/player/queue?uri=${trackUri.replaceAll(
      ":",
      "%3A"
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export default PlayerServices;
