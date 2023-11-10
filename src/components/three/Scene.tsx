import { Canvas, useLoader } from "@react-three/fiber";
import InitialProps from "~/components/three/environment/InitialProps";
import Lighting from "~/components/three/environment/Lighting";
import ObjectSelector from "~/components/three/gui/ObjectSelector";
import Utils from "~/components/three/gui/Utils";
import { DoubleSide } from "three";
import { TextureLoader } from 'three/src/loaders/TextureLoader';

import SceneObjects from "~/components/three/SceneObjects";

export default function Scene() {
  const colorMap = useLoader(TextureLoader, 'textures/albedo.jpg')
  return (
    <Canvas camera={{ fov: 75, near: 0.1, far: 3000, position: [15, 15, 15] }}>
      <InitialProps />
      <ambientLight intensity={1} />
      <mesh position ={[0,0,0]} rotation = {[0, Math.PI/2,0]}>
          <planeGeometry attach="geometry" args={[25, 7]} />
          <meshBasicMaterial attach="material" color="green" side={DoubleSide}/>
      </mesh>
      <mesh position ={[0,0,0]}>
          <planeGeometry attach="geometry" args={[25, 7]} />
          <meshBasicMaterial attach="material" color="green" side={DoubleSide}/>
      </mesh>
      <mesh position ={[0,0,0]}>
          <planeGeometry attach="geometry" args={[25, 7]} />
          <meshBasicMaterial attach="material" color="green" side={DoubleSide}/>
      </mesh>
      <mesh position ={[0,0,0]}>
          <planeGeometry attach="geometry" args={[25, 7]} />
          <meshBasicMaterial attach="material" color="green" side={DoubleSide}/>
      </mesh>
      <mesh position ={[0,0,0]}>
          <planeGeometry attach="geometry" args={[25, 7]} />
          <meshBasicMaterial attach="material" color="green" side={DoubleSide}/>
      </mesh>
    </Canvas>
  );
}
