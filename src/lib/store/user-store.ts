// src/lib/store/user-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  fullName: string;
  avatarUrl: string | null;
  setUser: (data: { fullName?: string; avatarUrl?: string | null }) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      fullName: 'User',
      avatarUrl: null,
      setUser: (data) =>
        set((state) => ({
          fullName: data.fullName ?? state.fullName,
          avatarUrl: data.avatarUrl ?? state.avatarUrl,
        })),
    }),
    {
      name: 'user-storage', // key trong localStorage
    }
  )
);
