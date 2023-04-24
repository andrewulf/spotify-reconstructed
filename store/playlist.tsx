"use client";
import { UserPlaylist } from "@.types/spotify";
import { create } from "zustand";

interface IPlaylistStore {
  playlists: any;
  saved_tracks: UserPlaylist | null;
  context: any; // context of the current playing playlist (if any)
}

export const usePlaylistStore = create<IPlaylistStore>(() => ({
  playlists: null,
  saved_tracks: null,
  context: null,
}));
