import { useThree } from "@react-three/fiber";
import { useControls, folder } from "leva";
import RotateControls from "~/components/three/controls/RotateControls";
import TranslateControls from "~/components/three/controls/TranslateControls";
import { useSceneStore } from "~/states/SceneState";

export default function ObjectControls() {
  const scene = useThree((state) => state.scene);
  const { selectedObjectId } = useSceneStore((state) => state);
  const object = scene.children.find(
    (child) => child.uuid === selectedObjectId
  );
  const { selectedControl } = useControls("Работа с объектом", {
    "Изменение положения": folder({
      selectedControl: {
        options: {
          Перемещение: "translate",
          Вращение: "rotate",
        },
        order: -2,
        label: "Режим",
      },
    }),
  });

  return selectedControl === "translate" ? (
    <TranslateControls object={object} />
  ) : (
    <RotateControls object={object} />
  );
}
