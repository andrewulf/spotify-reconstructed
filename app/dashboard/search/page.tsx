import SearchBar from "@.components/Results/SearchBar";
import TrackResults from "@.components/Results/TrackResults";
import { getUserData } from "@.utils/serverQueries";
import { IconChevronDown } from "@tabler/icons-react";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function SearchPage() {
  const user = await getUserData();
  return (
    <>
      {cookies()?.get("access-token")?.value !== undefined && (
        <main className="flex h-screen">
          <span className="absolute right-0 flex items-center justify-start gap-2 p-1 pr-4 m-4 transition-all rounded-full cursor-pointer dark:bg-zinc-800 hover:bg-zinc-700">
            {user && (
              <Image
                src={user?.images[0]?.url}
                height={30}
                width={30}
                alt={user?.email}
                className="rounded-full"
                priority
              />
            )}
            {user && (
              <p className="flex items-center text-sm font-bold">
                {user.display_name}
                {<IconChevronDown size={20} />}
              </p>
            )}
          </span>
          <section>
            <SearchBar />
            <TrackResults searchQuery="lil durk" />
          </section>
        </main>
      )}
    </>
  );
}
