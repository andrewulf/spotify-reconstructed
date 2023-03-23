import PlaylistCardGroup from "@.components/Cards/Playlist/PlaylistCardGroup";

export default async function Home() {
  return (
    <section className="flex w-full h-screen ">
      {/* @ts-expect-error Server Component */}
      <PlaylistCardGroup />
    </section>
  );
}
