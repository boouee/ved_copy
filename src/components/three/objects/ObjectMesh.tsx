import { useCursor } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import {TextureLoader} from "three";
import { Mesh } from "three";
import ReactDOM from "react-dom";
import { Canvas, extend, useThree } from "@react-three/fiber";
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
  const texture = new TextureLoader().load( 'sprite.png' );
  const onPointerOut = () => setIsMeshHovered(false);

  const meshRef = useRef<Mesh>(null!);
  const canvasRef = useRef(document.createElement("canvas"));
  const textureRef = useRef<THREE.CanvasTexture>();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    //canvas.width = 10;
    //canvas.height = 10;

    const context = canvas.getContext("2d");
    //context.rect(0, 0, canvas.width, canvas.height);
    //context.font = "30px Arial";
    //context.fillText("Hello World", 10, 50);
    //textureRef.current!.needsUpdate = true;
  }, []);
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
        <sprite>
          <spriteMaterial>
            <canvasTexture>
              <script></script>
            </canvasTexture>
          </spriteMaterial>
        </sprite>
      </primitive>
      {selectedObjectId === mesh.uuid ? <ObjectControls /> : <></>}
    </>
  );
}
