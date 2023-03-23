import useAccessToken from "@.hooks/useAccessToken";
import { usePlaybackStore } from "@.store/player";
import { CLIENT_QUERY } from "@.utils/clientQueries";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function PlayerServices() {
  const [accessToken] = useAccessToken();

  const { data: playback } = useQuery(
    Array.from(CLIENT_QUERY.PLAYBACK_KEY),
    () => CLIENT_QUERY.PLAYBACK_FN(accessToken!),
    {
      refetchIntervalInBackground: true,
      refetchInterval: 1000,
      refetchOnWindowFocus: "always",
      enabled: accessToken !== undefined,
    }
  );

  const { data: devices } = useQuery(
    Array.from(CLIENT_QUERY.DEVICES_KEY),
    () => CLIENT_QUERY.DEVICES_FN(accessToken!),
    {
      refetchOnWindowFocus: "always",
      staleTime: 15000,
      enabled: accessToken !== undefined,
    }
  );

  useEffect(() => {
    usePlaybackStore.setState({ playback: playback, devices: devices });
  }, [devices, playback]);

  return null;
}
export default PlayerServices;
