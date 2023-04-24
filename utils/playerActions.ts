export const playSong = ({
  spotify_uri,
  device_id,
  position_ms,
  access_token,
}: {
  spotify_uri?: string | null;
  device_id?: string;
  position_ms?: number;
  access_token: string;
}) => {
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
    method: "PUT",
    body: JSON.stringify({
      uris: [spotify_uri] || null,
      position_ms: position_ms,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
};
export const playContext = ({
  access_token,
  offset,
  device_id,
  context_uri,
  progress,
}: {
  access_token: string;
  device_id?: string | null;
  offset?: number | null;
  progress?: number | null;
  context_uri?: string | null;
}) => {
  fetch(
    `https://api.spotify.com/v1/me/player/play${
      device_id ? "?device_id=" + device_id : ""
    }`,
    {
      method: "PUT",
      body: JSON.stringify({
        context_uri: context_uri,
        offset: {
          position: offset,
        },
        position_ms: progress,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const transferPlayback = ({
  device_id,
  access_token,
}: {
  device_id?: string | null;
  access_token: string;
}) => {
  fetch(`https://api.spotify.com/v1/me/player`, {
    method: "PUT",
    body: JSON.stringify({
      device_ids: [device_id?.toString()],
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
};
