import { SearchType } from "@.types/spotify";
import { cookies } from "next/headers";
import queryString from "query-string";
import {
  FeaturedPlaylists,
  Playlist,
  SimplifiedPlaylist,
} from "./../types/spotify/playlist.d";
import { generateRandomString } from "./generateString";

let scopes =
  "streaming user-read-private user-read-email user-read-playback-state playlist-read-private user-read-currently-playing user-library-read playlist-read-collaborative";
let redirect_uri = process.env.REDIRECT_URI;

export function authorizeAccountUsage() {
  var state = generateRandomString(16);
  return (
    `https://accounts.spotify.com/authorize?` +
    queryString.stringify({
      response_type: "code",
      client_id: process.env.CLIENT_ID,
      scope: scopes,
      redirect_uri: redirect_uri,
      show_dialog: true,
      state: state,
    })
  );
}

export async function getUserData() {
  let current_access_token = cookies().get("access-token")?.value;
  try {
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + current_access_token },
    });
    const data = res.json();
    return data;
  } catch (e) {
    console.error("Error occured in getUserData()", e);
  }
}

export async function getFeaturedPlaylists() {
  let current_access_token = cookies().get("access-token")?.value;
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/browse/featured-playlists`,
      {
        headers: { Authorization: "Bearer " + current_access_token },
      }
    );
    const data = (await res.json()) as FeaturedPlaylists;
    return data;
  } catch (e) {
    console.error("Error occured in getUserPlaylists()", e);
  }
}

export async function getSinglePlaylist(id: string) {
  let current_access_token = cookies().get("access-token")?.value;
  try {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: { Authorization: "Bearer " + current_access_token },
    });
    const data = (await res.json()) as Playlist;
    console.log(data);
    return data;
  } catch (e) {
    console.error("Error occured in getSinglePlaylist()", e);
  }
}

export async function getCurrentlyPlaying() {
  let current_access_token = cookies().get("access-token")?.value;
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: "Bearer " + current_access_token },
        cache: "no-store",
      }
    );
    const data = res.json();
    return data;
  } catch (e) {
    console.error("Error occured in getUserData()", e);
  }
}
export async function getTrack() {
  let current_access_token = cookies().get("access-token")?.value;
  const res = await fetch(
    "https://api.spotify.com/v1/tracks/0wTTf3msjDJ8NcZGTmQJQV",
    {
      method: "GET",
      headers: { Authorization: "Bearer " + current_access_token },
    }
  );
  const data = await res.json();
  return data;
}

export async function searchSpotify(query: string, type: SearchType) {
  let current_access_token = cookies().get("access-token")?.value;
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?include_external=audio&q=${query}&type=${type}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + current_access_token },
      }
    );
    const data = res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
