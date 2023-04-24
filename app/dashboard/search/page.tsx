import NavigationBar from "@.components/Navigation/NavigationBar";
import SearchBar from "@.components/Results/SearchBar";
import TrackResults from "@.components/Results/TrackResults";
import { cookies } from "next/headers";

export default async function SearchPage() {
  return (
    <>
      {cookies()?.get("access-token")?.value !== undefined && (
        <main className="flex h-screen">
          <section>
            <SearchBar />
            <TrackResults searchQuery="lil durk" />
          </section>
        </main>
      )}
    </>
  );
}
