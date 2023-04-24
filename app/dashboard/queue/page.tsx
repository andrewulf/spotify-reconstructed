"use client";
import TableItem from "@.components/Playlist/TableItem";
import { usePlaybackStore } from "@.store/player";
import { Track } from "@.types/spotify";

function QueuePage() {
  const { playback, queue } = usePlaybackStore();

  return (
    <main className="flex gap-4 flex-col p-8 text-sm font-inter mt-16">
      <h1 className="text-xl font-bold tracking-wide">Queue</h1>
      <section>
        <h1 className="text-white/60 font-semibold text-md tracking-wider">
          Now playing
        </h1>
        <TableItem
          track={playback?.item as Track}
          key={playback?.item?.id}
          total={1}
        />
      </section>
      <section>
        <h1 className="text-white/60 font-semibold text-md tracking-wider">
          Playing next
        </h1>
        {queue?.queue?.map((q, i) => (
          <TableItem track={q as Track} key={q?.id} total={i + 2} />
        ))}
      </section>
    </main>
  );
}
export default QueuePage;
