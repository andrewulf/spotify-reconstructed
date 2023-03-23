import { getFeaturedPlaylists } from "@.utils/serverQueries";
import PlaylistCard from "./PlaylistCard";

export default async function PlaylistCardGroup() {
  const data = await getFeaturedPlaylists();

  return (
    <section className="flex flex-col w-full m-8">
      <h1 className="text-xl font-bold">{data?.message}</h1>
      <div className="flex flex-wrap gap-2">
        {data &&
          data?.playlists?.items.map((playlist) => (
            <PlaylistCard
              images={playlist.images}
              name={playlist.name}
              description={playlist.description}
              key={playlist.id}
            />
          ))}
      </div>
    </section>
  );
}
// <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 mt-2 auto-rows-min">
