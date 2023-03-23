import { authorizeAccountUsage } from "@.utils/serverQueries";
import Link from "next/link";

function LoginPage() {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="p-8 flex flex-col">
        <h1 className="mb-4 font-bold font-raleway">
          First, please log in to Spotify
        </h1>
        <Link
          href={authorizeAccountUsage()}
          className="px-4 py-2 bg-green-400 rounded-md text-zinc-900 text-center"
        >
          Log in
        </Link>
      </div>
    </section>
  );
}

export default LoginPage;
