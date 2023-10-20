import { TransformControls } from "@react-three/drei";
import { useControls, folder } from "leva";
import { Object3D, Event } from "three";

interface ObjectControlsProps {
  object: Object3D<Event> | undefined;
}

interface ControlsOptionItem {
  value: number;
  label: string;
}

export default function TranslateControls({ object }: ObjectControlsProps) {
  console.log(object?.position);

  const options = {
    positionX: {
      value: 0.0,
      label: "Позиция X",
      onChange: (
        value: number,
        _: string,
        obj: {
          initial: boolean;
        }
      ) => {
        if (obj.initial) {
          set({
            positionX: object?.position.x ?? 0,
          });
        }
        if (object && value !== object.position.x && !obj.initial) {
          object.position.x = value;
        }
      },
    } as ControlsOptionItem,
    positionY: {
      value: 0.0,
      label: "Позиция Y",
      onChange: (
        value: number,
        _: string,
        obj: {
          initial: boolean;
        }
      ) => {
        if (obj.initial) {
          set({
            positionY: object?.position.y ?? 0,
          });
        }
        if (object && value !== object.position.y && !obj.initial) {
          object.position.y = value;
        }
      },
    } as ControlsOptionItem,
    positionZ: {
      value: 0.0,
      label: "Позиция Z",
      onChange: (
        value: number,
        _: string,
        obj: {
          initial: boolean;
        }
      ) => {
        if (obj.initial) {
          set({
            positionZ: object?.position.z ?? 0,
          });
        }
        if (object && value !== object.position.z && !obj.initial) {
          object.position.z = value;
        }
      },
    } as ControlsOptionItem,
  };

  const [_, set] = useControls(
    () => ({
      "Работа с объектом": folder({
        "Изменение положения": folder(options),
      }),
    }),
    [object]
  );

  return (
    <TransformControls
      object={object}
      size={0.75}
      mode={"translate"}
      onChange={() => {
        set({
          positionX: object?.position.x ?? 0,
          positionY: object?.position.y ?? 0,
          positionZ: object?.position.z ?? 0,
        });
      }}
    />
  );
}
