"use client";
import { create } from "zustand";

interface IPlaylistStore {
  playlists: any;
}

export const usePlaylistStore = create<IPlaylistStore>(() => ({
  playlists: null,
}));
