import { create } from "zustand";

interface IsCompassModeState {
  isCompassMode: boolean;
  setIsCompassMode: (isCompassMode: boolean) => void;
}

export const isCompassModeStore = create<IsCompassModeState>((set) => ({
  isCompassMode: false,
  setIsCompassMode: (isCompassMode: boolean) => set({ isCompassMode }),
}));
