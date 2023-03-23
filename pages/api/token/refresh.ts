import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      // build post request
      const formdata = new URLSearchParams();
      formdata.append("grant_type", "refresh_token");
      formdata.append("refresh_token", req.cookies["refresh-token"] as string);
      var authOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
            ).toString("base64"),
        },
        body: formdata.toString(),
        withCredentials: true,
      };

      // after user permissions, get refresh token and generate an access token using spotify endpoint
      const resp = await fetch(
        "https://accounts.spotify.com/api/token?",
        authOptions
      );
      const data = await resp.json();
      res.status(200);
      res.send(data);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.setHeader("Access-Control-Expose-Headers", "Set-Cookie");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Set-Cookie"
      );
      res.status(405).end(`Method ${method} is not allowed.`);
  }
}
