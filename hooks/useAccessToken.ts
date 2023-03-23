import { useEffect, useState } from "react";

export default function useAccessToken() {
  const [accessToken, setAccessToken] = useState<string | undefined>();

  useEffect(() => {
    setAccessToken(document?.cookie?.split("=")[1]?.split(";")[0]);
  }, []);

  return [accessToken];
}
