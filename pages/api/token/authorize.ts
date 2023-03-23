import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import queryString from "query-string";

let redirect_uri = process.env.REDIRECT_URI;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      {
        var query_code = req.query.code || null;
        var query_state = req.query.state || null;

        if (query_state === null) {
          res.redirect(
            "/login" +
              queryString.stringify({
                error: "state_mismatch",
              })
          );
          console.error("INVALID STATE FLOW");
        } else {
          let authOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization:
                "Basic " +
                Buffer.from(
                  process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
                ).toString("base64"),
            },
            withCredentials: true,
            body: new URLSearchParams({
              code: query_code as string,
              redirect_uri: redirect_uri as string,
              grant_type: "authorization_code",
              client_id: process.env.CLIENT_ID as string,
              client_secret: process.env.CLIENT_SECRET as string,
            }).toString(),
          };

          const resp = await fetch(
            "https://accounts.spotify.com/api/token?",
            authOptions
          );
          const data = await resp.json();
          console.log("auth data", data);

          const access_token_cookie = serialize(
            "access-token",
            String(data.access_token),
            {
              httpOnly: false,
              secure: true,
              path: "/",
              maxAge: data?.expires_in,
            }
          );
          res.setHeader("Set-Cookie", [access_token_cookie]);
          res.status(200);
          res.redirect("/dashboard");
        }
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} is not allowed.`);
  }
}
