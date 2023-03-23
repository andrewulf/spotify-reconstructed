export async function refreshAccessToken(current_refresh_token: string) {
  if (current_refresh_token == undefined) {
    throw new Error("Invalid refresh token, therefore the access token cannot be refreshed.");
  }

  try {
    const response = await fetch(String(process.env.REFRESH_TOKEN_ENDPOINT), {
      method: "GET",
      headers: {
        Cookie: `refresh-token=${current_refresh_token}`,
        withCredentials: "true",
        Authorization:
          "Basic " + Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64"),
      },
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    let ACCESS_TOKEN_EXPIRY_TIME = 10;

    return {
      access_token: refreshedTokens.access_token,
      access_token_expiry: Date.now() + ACCESS_TOKEN_EXPIRY_TIME,
      refresh_token: refreshedTokens.refresh_token ?? current_refresh_token, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      current_refresh_token,
      error: "RefreshAccessTokenError",
    };
  }
}
