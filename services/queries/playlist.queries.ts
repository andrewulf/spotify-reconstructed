import { UserPlaylist } from "@.types/spotify";
let SPOTIFY_ENDPOINT = "https://api.spotify.com/v1";

export async function getSavedTracks(
  accessToken: string,
  limit: number,
  offset: number
) {
  return fetch(
    `${SPOTIFY_ENDPOINT}/me/tracks?limit=${limit}&offset=${offset}`,
    {
      headers: { Authorization: "Bearer " + accessToken },
    }
  )
    .then((data) => data.json())
    .then((res) => res as UserPlaylist);
}

export const PLAYLIST_QUERY = {
  SAVED_TRACKS_KEY: "savedtracks",
  SAVED_TRACKS_FN: getSavedTracks,
};
