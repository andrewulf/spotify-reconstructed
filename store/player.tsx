"use client";
import {
  CurrentlyPlaying,
  Devices,
  Episode,
  Track,
  UsersQueueResponse,
} from "@.types/spotify";
import { create } from "zustand";

interface IPlaybackState {
  playback: CurrentlyPlaying<Track | Episode> | null;
  queue: UsersQueueResponse | null;
  devices: Devices | null;
  current_device: any;
}

export const usePlaybackStore = create<IPlaybackState>(() => ({
  playback: null,
  queue: null,
  devices: null,
  current_device: null,
}));
