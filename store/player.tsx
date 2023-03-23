"use client";
import { CurrentlyPlaying, Episode, Track } from "@.types/spotify";
import { create } from "zustand";

interface IPlaybackState {
  playback: CurrentlyPlaying<Track | Episode> | null;
  devices: any;
  current_device: any;
}

export const usePlaybackStore = create<IPlaybackState>(() => ({
  playback: null,
  devices: null,
  current_device: null,
}));
