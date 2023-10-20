import {
  Mesh,
  BufferGeometry,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
} from "three";
import { CSG } from "three-csg-ts";
import { ObjectJSON } from "~/components/three/gui/ObjectSelector";

import { useSceneStore } from "~/states/SceneState";

export default function useCutPlane() {
  const { selectedObjectId, setSelected, objects, setObjects } = useSceneStore(
    (state) => state
  );

  const cutWithPlane = (cutPlaneMesh: Mesh | null) => {
    if (selectedObjectId === undefined || selectedObjectId === null) return;

    if (!cutPlaneMesh) return;

    const objectMesh = objects.find(
      (child) => child.mesh.uuid === selectedObjectId
    )?.mesh as Mesh<BufferGeometry, MeshStandardMaterial>;

    if (!objectMesh) return;

    if (!isObjectCuttable(objectMesh)) return;

    const objectToCut = objectMesh.clone();
    const planeToCut = cutPlaneMesh.clone();

    copyMeshWorldPosition(objectMesh, objectToCut);
    copyMeshWorldPosition(cutPlaneMesh, planeToCut);

    const intersectResult = CSG.intersect(objectToCut, planeToCut);
    const subtractResult = CSG.subtract(objectToCut, planeToCut);

    objectToCut.remove();
    planeToCut.remove();

    if (
      intersectResult.geometry.getAttribute("position").count === 0 ||
      subtractResult.geometry.getAttribute("position").count === 0
    ) {
      // console.log("0 vertex");
      return;
    }

    centerMeshWithGeometry(intersectResult);
    centerMeshWithGeometry(subtractResult);

    const filteredSceneObjects = objects.filter(
      (object) => object.mesh.uuid !== selectedObjectId
    );

    setSelected(null);

    setObjects([
      ...filteredSceneObjects,
      {
        json: objectMesh.userData.json as ObjectJSON,
        mesh: subtractResult,
      },
      {
        json: objectMesh.userData.json as ObjectJSON,
        mesh: intersectResult,
      },
    ]);
  };
  console.log("cut");
  return { cutWithPlane };
}

function isObjectCuttable(object3d: Mesh) {
  object3d.geometry.computeBoundingBox();

  const boundingBox = object3d.geometry.boundingBox;

  if (!boundingBox) return false;

  return Math.abs(boundingBox.max.x - boundingBox.min.x) > 1.5;
}

function copyMeshWorldPosition(fromMesh: Mesh, toMesh: Mesh) {
  const rotation = new Quaternion();
  const position = new Vector3();

  fromMesh.geometry.computeBoundingBox();
  fromMesh.updateMatrix();

  fromMesh.getWorldQuaternion(rotation);
  fromMesh.getWorldPosition(position);

  toMesh.position.copy(position);
  toMesh.rotation.setFromQuaternion(rotation);

  toMesh.updateMatrix();
}

function centerMeshWithGeometry(mesh: Mesh) {
  const center = getCenterPoint(mesh);

  mesh.geometry.center();
  mesh.position.copy(center);
}

function getCenterPoint(mesh: Mesh) {
  const geometry = mesh.geometry;
  const center = new Vector3();

  geometry.computeBoundingBox();
  geometry.boundingBox?.getCenter(center);

  mesh.localToWorld(center);

  return center;
}
