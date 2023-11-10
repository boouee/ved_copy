import { Canvas } from "@react-three/fiber";
import InitialProps from "~/components/three/environment/InitialProps";
import Lighting from "~/components/three/environment/Lighting";
import ObjectSelector from "~/components/three/gui/ObjectSelector";
import Utils from "~/components/three/gui/Utils";

import SceneObjects from "~/components/three/SceneObjects";

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  );
}
