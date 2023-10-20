import { ObjectJSON } from "~/components/three/gui/ObjectSelector";
import { useSceneStore } from "~/states/SceneState";
import ObjectFactory from "~/factory/ObjectFactory";

export default function useObjectAdding() {
  const addObjects = useSceneStore((state) => state.addObjects);

  const addObjectToScene = (json: ObjectJSON) => {
    const mesh = new ObjectFactory().getObject3dFromJSON(json);

    if (!mesh) return;

    addObjects([
      {
        json,
        mesh,
      },
    ]);
  };

  return { addObjectToScene };
}
