import { StatsGl } from "@react-three/drei";
import { useControls } from "leva";

export default function Utils() {
  const { statsEnabled } = useControls("Настройки сцены", {
    statsEnabled: {
      value: true,
      label: "FPS Stats",
    },
  });
  return <>{statsEnabled ? <StatsGl /> : <></>}</>;
}
