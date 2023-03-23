import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  let cookie = cookies().get("access-token")?.value;
  if (cookie) {
    redirect("/dashboard");
  }
}
