import { Mesh } from "three";
import { create } from "zustand";

export interface CutPlaneState {
  cutPlane: Mesh | null;
  setCutPlane: (cutPlane: Mesh | null) => void;
}

export const useCutPlaneStore = create<CutPlaneState>((set) => ({
  cutPlane: null,
  setCutPlane: (cutPlane: Mesh | null) => set(() => ({ cutPlane: cutPlane })),
}));
