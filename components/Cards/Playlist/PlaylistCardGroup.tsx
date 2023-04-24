import { getFeaturedPlaylists } from "@.utils/serverQueries";
import PlaylistCard from "./PlaylistCard";

export default async function PlaylistCardGroup() {
  const data = await getFeaturedPlaylists();

  return (
    <section className="flex flex-col w-full m-8 mt-20">
      <h1 className="text-xl font-bold">{data?.message}</h1>
      <div className="flex flex-wrap gap-2">
        {data &&
          data?.playlists?.items.map((playlist) => (
            <PlaylistCard
              images={playlist.images}
              name={playlist.name}
              description={playlist.description}
              key={playlist.id}
              id={playlist.id}
            />
          ))}
      </div>
    </section>
  );
}
