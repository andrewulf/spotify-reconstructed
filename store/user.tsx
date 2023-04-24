"use client";
import { PublicUser } from "@.types/spotify";
import { create } from "zustand";

interface IUserState {
  user: PublicUser | null;
}

export const useUserStore = create<IUserState>(() => ({
  user: null,
}));
