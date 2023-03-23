import useAccessToken from "@.hooks/useAccessToken";
import { usePlaylistStore } from "@.store/playlist";
import { getUserPlaylists } from "@.utils/clientQueries";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function PlaylistServices() {
  const [accessToken] = useAccessToken();
  const { data: playlists } = useQuery(
    ["user-playlists"],
    async () => await getUserPlaylists(accessToken!),
    {
      enabled: accessToken != undefined,
    }
  );

  useEffect(() => {
    usePlaylistStore.setState({ playlists: playlists });
  }, [playlists]);

  return null;
}
export default PlaylistServices;
