import { PublicUser } from "@.types/spotify";

let SPOTIFY_ENDPOINT = "https://api.spotify.com/v1";

export async function getUserAccount(
  access_token: string
): Promise<PublicUser> {
  return fetch(`${SPOTIFY_ENDPOINT}/me`, {
    method: "GET",
    headers: { Authorization: "Bearer " + access_token },
  })
    .then((data) => data.json())
    .then((res) => res as PublicUser);
}

export const USER_QUERY = {
  USERACCOUNT_KEY: "useraccount",
  USERACCOUNT_FN: getUserAccount,
};
