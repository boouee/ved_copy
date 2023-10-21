import { useCursor } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import CutPlane from "~/components/three/objects/CutPlane";
import { ObjectJSON } from "~/components/three/gui/ObjectSelector";
import { ObjectInfo, useSceneStore } from "~/states/SceneState";
import useTextureSetup from "~/hooks/useTextureSetup";
import ObjectControls from "~/components/three/controls/ObjectControls";

export type MeshWithJSON = Mesh & {
  userData: {
    json?: ObjectJSON;
  };
};

export function ObjectMesh({ mesh, json }: ObjectInfo) {
  const { selectedObjectId, setSelected } = useSceneStore((state) => state);
  const [isMeshHovered, setIsMeshHovered] = useState(false);
  const { setupTexture } = useTextureSetup({ mesh, json });

  useCursor(isMeshHovered);

  useEffect(() => {
    if (!mesh.geometry.boundingBox) {
      mesh.geometry.computeBoundingBox();
    }

    void setupTexture();
  });

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();

    setSelected(meshRef.current.uuid);
  };

  const onPointerMissed = (e: MouseEvent) => {
    if (e.type !== "click") return;

    setSelected(null);
  };

  const onPointerOver = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();

    setIsMeshHovered(true);
  };

  const onPointerOut = () => setIsMeshHovered(false);

  const meshRef = useRef<Mesh>(null!);

  // console.log("ObjectWrapper rendered!", meshRef);

  if (!mesh) return <></>;

  return (
    <>
      <primitive
        object={mesh}
        ref={meshRef}
        onClick={onClick}
        onPointerMissed={onPointerMissed}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        userData={{ json }}
      >
        {selectedObjectId === mesh.uuid ? <CutPlane /> : <></>}
        <mesh
          position={[
            0,
            0,
            0,
          ]}
          rotation={[0, Math.PI / 2, 0]}
          //ref={cutPlaneRef}
          //{...props}
        >
          <planeGeometry args={[5, 5, 5, 5]} />
          <meshStandardMaterial color={"yellow"} wireframe />
        </mesh>
      </primitive>
      {selectedObjectId === mesh.uuid ? <ObjectControls /> : <></>}
    </>
  );
}
