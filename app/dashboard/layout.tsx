import PlaybackBar from "@.components/NowPlaying/PlaybackBar";
import Player from "@.components/NowPlaying/Player";
import Sidebar from "@.components/Sidebar/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 grid-rows-1">
      <div className="col-span-2 md:col-span-2 xl:col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-full col-start-3 xl:col-start-2 overflow-x-auto">
        {children}
      </div>
      <div className="col-span-full h-[90px] z-50">
        <Player />
      </div>
      <PlaybackBar />
    </main>
  );
}
