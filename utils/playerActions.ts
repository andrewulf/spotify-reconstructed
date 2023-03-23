export const play = ({
  spotify_uri,
  device_id,
  progress_ms,
  access_token,
}: {
  spotify_uri: string;
  device_id: string;
  progress_ms?: number | null | undefined;
  access_token: string;
}) => {
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
    method: "PUT",
    body: JSON.stringify({
      uris: [spotify_uri],
      progress_ms: progress_ms,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const transferPlayback = ({
  device_id,
  access_token,
}: {
  device_id: string;
  access_token: string;
}) => {
  fetch(`https://api.spotify.com/v1/me/player`, {
    method: "PUT",
    body: JSON.stringify({
      device_ids: [device_id.toString()],
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
};
