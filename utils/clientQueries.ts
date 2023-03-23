// these are for react query, dont depend on next/cookies or next/headers
let SPOTIFY_ENDPOINT = "https://api.spotify.com/v1";

import {
  CurrentlyPlaying,
  Devices,
  Episode,
  SimplifiedPlaylist,
  Track,
  UserPlaylist,
} from "@.types/spotify";

async function* pageIterator<T>(endpoint: string, accessToken: string) {
  async function* requestData(_endpoint: string): AsyncGenerator<T> {
    const response = await fetch(_endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    yield data;

    if (data.next) {
      yield* requestData(data.next);
    }
  }

  yield* requestData(endpoint);
}

export async function getUserPlaylists(at: string) {
  const playlistsArr: Pick<SimplifiedPlaylist, "name" | "id">[] = [];
  if (!at) return;
  const endpoint = `${SPOTIFY_ENDPOINT}/me/playlists?offset=${0}&limit=${10}`;
  const data = pageIterator<UserPlaylist>(endpoint, at);

  for await (const playlists of data) {
    for (let playlist of playlists.items) {
      playlistsArr.push({ name: playlist.name, id: playlist.id });
    }
  }

  return playlistsArr;
}

export async function getDevices(access_token: string): Promise<Devices> {
  return fetch(`https://api.spotify.com/v1/me/player/devices`, {
    method: "GET",
    headers: { Authorization: "Bearer " + access_token },
  })
    .then((data) => data.json())
    .then((res) => res);
}

export async function getPlaybackData(
  access_token: string
): Promise<CurrentlyPlaying<Track | Episode>> {
  return fetch(
    `https://api.spotify.com/v1/me/player?additional_types=episode`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    }
  )
    .then((data) => data.json())
    .then((res) => res as CurrentlyPlaying<Track>);
}

export const CLIENT_QUERY = {
  PLAYBACK_KEY: "playback",
  PLAYBACK_FN: getPlaybackData,
  DEVICES_KEY: "devices",
  DEVICES_FN: getDevices,
};
