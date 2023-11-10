import { Canvas } from "@react-three/fiber";
import InitialProps from "~/components/three/environment/InitialProps";
import Lighting from "~/components/three/environment/Lighting";
import ObjectSelector from "~/components/three/gui/ObjectSelector";
import Utils from "~/components/three/gui/Utils";
import { THREE } from "three";

import SceneObjects from "~/components/three/SceneObjects";

export default function Scene() {
  return (
    <Canvas camera={{ fov: 75, near: 0.1, far: 3000, position: [15, 15, 15] }}>
      <InitialProps />
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <mesh position ={[0,0,0]}>
          <planeGeometry attach="geometry" args={[25, 15]} />
          <meshPhongMaterial attach="material" color="green" side={THREE.BackSide}/>
      </mesh>
    </Canvas>
  );
}
