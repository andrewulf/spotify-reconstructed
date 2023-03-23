"use client";
import useAccessToken from "@.hooks/useAccessToken";
import { SearchContent } from "@.types/spotify";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface Props {
  searchQuery: string;
}

export default function TrackResults({ searchQuery }: Props) {
  const [accessToken] = useAccessToken();
  const trackQuery = useQuery<SearchContent>(
    ["track", searchQuery],
    async () => {
      return fetch(
        `https://api.spotify.com/v1/search?include_external=audio&q=${searchQuery}&type=track`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken },
        }
      )
        .then((data) => data.json())
        .then((bam) => bam);
    },
    { enabled: searchQuery.trim().length > 0 }
  );
  return (
    <section className="m-4">
      <h1>Songs</h1>
      <div className="pr-2 grid max-w-[600px] grid-cols-1 gap-2 items-center justify-center h-[400px] overflow-hidden overflow-y-auto">
        {trackQuery.data &&
          trackQuery?.data?.tracks?.items.map((i) => {
            return (
              <div
                key={i.id}
                className="flex items-center justify-start w-full gap-4 transition-all rounded-md cursor-pointer group dark:bg-zinc-800 hover:dark:bg-zinc-700"
              >
                <Image
                  className="rounded-tl-md rounded-bl-md"
                  src={i?.album.images[2].url}
                  height={i?.album.images[2].height! - 10}
                  width={i?.album.images[2].width! - 10}
                  alt={i.name}
                />
                <span className="flex flex-col gap-0">
                  <p className="pr-3 overflow-hidden text-xs font-bold truncate">
                    {i.name}
                  </p>
                  <p className="leading-3">
                    {i?.artists &&
                      i?.artists.map((artist, idx) => (
                        <span
                          key={artist.id}
                          className={` w-fit overflow-hidden text-xs group-hover:opacity-100 transition-opacity opacity-60 font-bold truncate`}
                        >
                          {idx + 1 === i?.artists.length
                            ? `${artist.name}`
                            : `${artist.name}, `}
                        </span>
                      ))}
                  </p>
                </span>
              </div>
            );
          })}
      </div>
    </section>
  );
}
