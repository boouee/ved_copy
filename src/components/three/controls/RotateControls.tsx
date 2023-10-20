import { TransformControls } from "@react-three/drei";
import { useControls, folder } from "leva";
import { Object3D, Event, MathUtils } from "three";

interface ObjectControlsProps {
  object: Object3D<Event> | undefined;
}

interface ControlsOptionItem {
  value: number;
  label: string;
  min: number;
  max: number;
  step: number;
}

export default function RotateControls({ object }: ObjectControlsProps) {
  const options = {
    rotationX: {
      value: object?.rotation.x ?? 0.0,
      min: -180,
      max: 180,
      step: 1,
      label: "Поворот X",
      onChange: (
        value: number,
        _: string,
        obj: {
          initial: boolean;
        }
      ) => {
        const valueRad = MathUtils.degToRad(value);
        if (obj.initial) {
          set({
            rotationX: MathUtils.radToDeg(object?.rotation.x ?? 0),
          });
        }
        if (object && valueRad !== object.rotation.x && !obj.initial) {
          object.rotation.x = valueRad;
        }
      },
    } as ControlsOptionItem,
    rotationY: {
      value: object?.rotation.y ?? 0.0,
      label: "Поворот Y",
      min: -180,
      max: 180,
      step: 1,
      onChange: (
        value: number,
        _: string,
        obj: {
          initial: boolean;
        }
      ) => {
        const valueRad = MathUtils.degToRad(value);
        if (obj.initial) {
          set({
            rotationY: MathUtils.radToDeg(object?.rotation.y ?? 0),
          });
        }
        if (object && valueRad !== object.rotation.y && !obj.initial) {
          object.rotation.y = valueRad;
        }
      },
    } as ControlsOptionItem,
    rotationZ: {
      value: object?.rotation.z ?? 0.0,
      label: "Поворот Z",
      min: -180,
      max: 180,
      step: 1,
      onChange: (
        value: number,
        _: string,
        obj: {
          initial: boolean;
        }
      ) => {
        const valueRad = MathUtils.degToRad(value);
        if (obj.initial) {
          set({
            rotationZ: MathUtils.radToDeg(object?.rotation.z ?? 0),
          });
        }
        if (object && valueRad !== object.rotation.z && !obj.initial) {
          object.rotation.z = valueRad;
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
      mode={"rotate"}
      onChange={() => {
        set({
          rotationX: MathUtils.radToDeg(object?.rotation.x ?? 0),
          rotationY: MathUtils.radToDeg(object?.rotation.y ?? 0),
          rotationZ: MathUtils.radToDeg(object?.rotation.z ?? 0),
        });
      }}
    />
  );
}
