import useAccessToken from "@.hooks/useAccessToken";
import { useUserStore } from "@.store/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { USER_QUERY } from "./queries/user.queries";

function UserServices() {
  const [accessToken] = useAccessToken();

  const { data: user } = useQuery(
    [USER_QUERY.USERACCOUNT_KEY],
    () => USER_QUERY.USERACCOUNT_FN(accessToken!),
    {
      refetchOnWindowFocus: "always",
      enabled: accessToken !== undefined,
    }
  );

  useEffect(() => {
    useUserStore.setState({ user });
  }, [user]);

  return null;
}

export default UserServices;
