import { create } from "zustand";
import { ObjectJSON } from "~/components/three/gui/ObjectSelector";
import { MeshWithJSON } from "~/components/three/objects/ObjectMesh";

export interface ObjectInfo {
  json: ObjectJSON;
  mesh: MeshWithJSON;
}

export interface SceneState {
  objects: ObjectInfo[];
  selectedObjectId: string | null;
  addObjects: (object: ObjectInfo[]) => void;
  setObjects: (objects: ObjectInfo[]) => void;
  setSelected: (id: string | null) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  objects: [],
  selectedObjectId: null,
  addObjects: (objects: ObjectInfo[]) =>
    set((state) => ({ objects: [...state.objects, ...objects] })),
  setObjects: (objects: ObjectInfo[]) => set(() => ({ objects: objects })),
  setSelected: (id: string | null) => set(() => ({ selectedObjectId: id })),
}));
