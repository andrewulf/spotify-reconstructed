import TableItem from "@.components/Playlist/TableItem";
import { Track } from "@.types/spotify";
import { getSinglePlaylist } from "@.utils/serverQueries";
import {
  IconChevronDown,
  IconPlayerPlayFilled,
  IconSearch,
} from "@tabler/icons-react";
import Image from "next/image";

export default async function PlaylistPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getSinglePlaylist(params?.id);
  let numFormat = new Intl.NumberFormat("en-US");

  return (
    <section className="flex flex-col">
      {data && (
        <div key={data.id} className="bg-grack-800 flex items-center gap-4 p-8">
          {data.images && (
            <Image
              priority
              src={data?.images[0]?.url}
              width={250}
              height={250}
              alt={data.id}
              className="aspect-square h-auto object-cover"
            />
          )}
          <div className="flex flex-col gap-2">
            {data?.public ? (
              <p className="text-xs font-semibold">PUBLIC PLAYLIST</p>
            ) : (
              <p className="text-xs font-semibold">PRIVATE PLAYLIST</p>
            )}
            <h1 className="text-4xl font-extrabold">{data.name}</h1>
            {data.description && (
              <p className="text-sm opacity-60">{data.description}</p>
            )}
            <div className="flex items-center gap-2 text-sm font-inter">
              <Image
                priority
                src={
                  data?.owner?.images
                    ? data?.owner?.images[0].url
                    : "/spotify.svg"
                }
                height={16}
                width={16}
                alt={data?.owner?.display_name!}
                className="rounded-full"
              />
              <p className="font-semibold">{data?.owner?.display_name}</p>
              {data?.followers?.total > 0 && (
                <>
                  <span className="text-xs">•</span>
                  <p>{numFormat.format(data?.followers?.total)} likes</p>
                </>
              )}
              <span className="text-xs">•</span>
              <p className="">{data?.tracks?.total} songs</p>
            </div>
          </div>
        </div>
      )}
      <aside className="flex justify-between items-center w-full px-8 py-4">
        <div className="flex">
          <span className="rounded-full p-4 bg-green-400 w-fit h-fit">
            {<IconPlayerPlayFilled className="text-gray-800" />}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <IconSearch className="text-gray-400" size={20} />
          <span className="flex items-center justify-center text-xs leading-2 gap-1 text-gray-400">
            Custom order
            <IconChevronDown size={18} className="leading-4" />
          </span>
        </div>
      </aside>
      <div className="mx-8 mb-2">
        <div className="grid-cols-playlist w-full grid px-4 text-sm opacity-60 py-2 hover:bg-white/10 transition-all font-inter items-center">
          <p className="col-start-1">#</p>
          <p className="col-start-2">Title</p>
          <p className="col-start-3">Album</p>
          <p className="col-start-4">Date added</p>
          <p className="col-start-5">Length</p>
        </div>
        <div className="w-full h-[1px] mb-4 bg-white/10"></div>
        {data?.tracks?.items?.map((track, i) => (
          <TableItem
            track={track?.track as Track}
            playlistTrack={track}
            key={track?.track?.id}
            total={i + 1}
          />
        ))}
      </div>
    </section>
  );
}
