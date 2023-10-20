import { CameraControls } from "@react-three/drei";

const cameraLimits = {
  zoom: {
    out: 26,
    in: 1,
    speed: 0.4,
  },
};

const zoomLimits = cameraLimits.zoom;

export default function Camera() {
  return (
    <CameraControls
      makeDefault
      dollySpeed={zoomLimits.speed}
      maxDistance={zoomLimits.out}
      minDistance={zoomLimits.in}
    />
  );
}
