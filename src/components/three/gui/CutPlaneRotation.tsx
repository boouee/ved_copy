import { useControls, folder } from "leva";
import { useEffect } from "react";
import { MathUtils, Mesh } from "three";
import { useCutPlaneStore } from "~/states/CutPlaneState";
import { ObjectInfo, useSceneStore } from "~/states/SceneState";

interface CutPlaneRotationXYProps {
  objectInfo?: ObjectInfo;
  cutPlane: Mesh | null;
}

export default function CutPlaneRotation() {
  const { selectedObjectId, objects } = useSceneStore((state) => state);
  const { cutPlane } = useCutPlaneStore((state) => state);

  const objectInfo = objects.find(
    (object) => object.mesh.uuid === selectedObjectId
  );

  const box = objectInfo?.mesh.geometry.boundingBox;

  if (!box) {
    objectInfo?.mesh.geometry.computeBoundingBox();
  }

  const operation = objectInfo?.json.operation;

  const rotationCheckBoxOptions = {
    rotationXYCheckbox: {
      value: false,
      label: " ",
      disabled: !operation?.obliqueCut ?? false,
      order: 5,
    },
  };

  const [controlValues] = useControls(() => ({
    "Работа с объектом": folder({
      "Плоскость реза": folder(rotationCheckBoxOptions),
    }),
  }));

  return !controlValues.rotationXYCheckbox ? (
    <CutPlaneRotationX objectInfo={objectInfo} cutPlane={cutPlane} />
  ) : (
    <CutPlaneRotationY objectInfo={objectInfo} cutPlane={cutPlane} />
  );
}

export function CutPlaneRotationX({
  objectInfo,
  cutPlane,
}: CutPlaneRotationXYProps) {
  const operation = objectInfo?.json.operation;

  const rotationXOptions = {
    planeRotationX: {
      label: "Поворот X",
      value: 90,
      min: 0,
      max: 180,
      step: 1,
      disabled: !operation?.obliqueCut ?? false,
    },
  };

  const [rotationXValues, set] = useControls(() => ({
    "Работа с объектом": folder({
      "Плоскость реза": folder(rotationXOptions),
    }),
  }));

  useEffect(() => {
    if (cutPlane && rotationXValues.planeRotationX) {
      cutPlane.rotation.x = 0;
      cutPlane.rotation.y = MathUtils.degToRad(rotationXValues.planeRotationX);
    }
  });

  useEffect(() => {
    set({
      planeRotationX: 90,
    });
  }, [objectInfo]);

  return <></>;
}

export function CutPlaneRotationY({
  objectInfo,
  cutPlane,
}: CutPlaneRotationXYProps) {
  const operation = objectInfo?.json.operation;

  const rotationYOptions = {
    planeRotationY: {
      label: "Поворот Y",
      value: 90,
      min: 0,
      max: 180,
      step: 1,
      disabled: !operation?.obliqueCut ?? false,
    },
  };

  const [rotationYValues, set] = useControls(() => ({
    "Работа с объектом": folder({
      "Плоскость реза": folder(rotationYOptions),
    }),
  }));

  useEffect(() => {
    if (cutPlane && rotationYValues.planeRotationY) {
      cutPlane.rotation.x = Math.PI / 2;
      cutPlane.rotation.y = MathUtils.degToRad(rotationYValues.planeRotationY);
    }
  });

  useEffect(() => {
    set({
      planeRotationY: 90,
    });
  }, [objectInfo]);

  return <></>;
}
