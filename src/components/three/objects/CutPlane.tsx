import { ThreeElements } from "@react-three/fiber";
import { button, folder, useControls } from "leva";
import useCutPlane from "~/hooks/useCutPlane";
import { useSceneStore } from "~/states/SceneState";
import { useCutPlaneStore } from "~/states/CutPlaneState";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import CutPlaneRotation from "~/components/three/gui/CutPlaneRotation";

interface CutPlaneProps {
  props?: ThreeElements["mesh"];
}

export default function CutPlane({ ...props }: CutPlaneProps) {
  const { selectedObjectId, objects } = useSceneStore((state) => state);

  const cutPlaneRef = useRef<Mesh>(null!);

  const forObject = objects.find(
    (object) => object.mesh.uuid === selectedObjectId
  );

  const box = forObject?.mesh.geometry.boundingBox;

  if (!box) {
    forObject?.mesh.geometry.computeBoundingBox();
  }

  const operation = forObject?.json.operation;

  const planePositionMaxValue =
    Math.abs(box?.min.x ?? 0) + Math.abs(box?.max.x ?? 0);

  const options = {
    planePosition: {
      label: "Позиция",
      value: 0,
      min: 0,
      max: planePositionMaxValue * 100,
      step: 1,
      disabled: !operation?.straightCut ?? false,
    },
  };

  const setCutPlane = useCutPlaneStore((state) => state.setCutPlane);

  const { cutWithPlane } = useCutPlane();

  useControls(
    "Работа с объектом",
    {
      "Плоскость реза": folder({
        Разрезать: button(() => {
          cutWithPlane(cutPlaneRef.current);
        }),
      }),
    },
    [forObject, objects]
  );

  const [controlValues, set] = useControls(() => ({
    "Работа с объектом": folder({
      "Плоскость реза": folder(options),
    }),
  }));

  useEffect(() => {
    if (forObject) {
      setCutPlane(cutPlaneRef.current);
      set({
        planePosition: cutPlaneRef.current.position.x,
      });
    }
  }, [forObject]);

  console.log("CutPlane rendered");

  return (
    <>
      <mesh
        position={[
          (controlValues.planePosition ?? 0) / 100 - Math.abs(box?.min.x ?? 0),
          0,
          0,
        ]}
        rotation={[0, Math.PI / 2, 0]}
        ref={cutPlaneRef}
        {...props}
      >
        <planeGeometry args={[10, 10, 10, 10]} />
        <meshStandardMaterial color={"green"} wireframe />
      </mesh>
      <mesh
        position={[
          0,
          0,
          0,
        ]}
        rotation={[0, Math.PI / 2, 0]}
        ref={cutPlaneRef}
        {...props}
      >
        <planeGeometry args={[10, 10, 10, 10]} />
        <meshStandardMaterial color={"green"} wireframe />
      </mesh>
      <CutPlaneRotation />
    </>
  );
}
