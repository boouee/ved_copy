import { Grid } from "@react-three/drei";
import { useControls } from "leva";
import { DoubleSide } from "three";
import Camera from "./Camera";

export default function InitialProps() {
  const { gridEnabled } = useControls("Настройки сцены", {
    gridEnabled: {
      value: true,
      label: "Сетка",
    },
  });
  return (
    <>
      <Grid
        visible={gridEnabled ?? true}
        infiniteGrid
        fadeStrength={4}
        sectionColor={0x121212}
        side={DoubleSide}
      />
      <Camera />
    </>
  );
}
