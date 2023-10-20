import { ObjectMesh } from "~/components/three/objects/ObjectMesh";
import { useSceneStore } from "~/states/SceneState";

export default function SceneObjects() {
  const objects = useSceneStore((state) => state.objects);
  // const scene = useThree((state) => state.scene);

  // console.log("Objects from state ", objects);
  // console.log("Scene children ", scene.children);

  return (
    <>
      {objects.map((object) => (
        <ObjectMesh
          mesh={object.mesh}
          json={object.json}
          key={object.mesh.uuid}
        />
      ))}
    </>
  );
}
