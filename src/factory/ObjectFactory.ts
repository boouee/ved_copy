import {
  BoxGeometry,
  Color,
  CylinderGeometry,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { ObjectJSON } from "~/components/three/gui/ObjectSelector";
import { MeshWithJSON } from "~/components/three/objects/ObjectMesh";

export default class ObjectFactory {
  public getObject3dFromJSON(json: ObjectJSON): MeshWithJSON | null {
    switch (json.mesh) {
      case "Pipe": {
        return this.getPipeObject3dFromJSON(json);
      }
      case "Cube": {
        return this.getCubeObject3dFromJSON(json);
      }
      default: {
        return null;
      }
    }
  }

  private getCubeObject3dFromJSON(json: ObjectJSON): MeshWithJSON | null {
    if (!json.size?.x || !json.size.y || !json.size.z) return null;

    const cubeMesh: MeshWithJSON = new Mesh(
      new BoxGeometry(json.size.x / 100, json.size.y / 100, json.size.z / 100),
      new MeshStandardMaterial({
        side: DoubleSide,
        color: new Color("white"),
      })
    );

    cubeMesh.userData.json = json;

    return cubeMesh;
  }

  private getPipeObject3dFromJSON(json: ObjectJSON): MeshWithJSON | null {
    if (!json.size?.x || !json.size.y || !json.size.z) return null;

    const pipeMesh = new Mesh(
      new CylinderGeometry(
        json.size.y / 100,
        json.size.z / 100,
        json.size.x / 100,
        64,
        64
      ).rotateZ(Math.PI / 2),
      new MeshStandardMaterial({
        side: DoubleSide,
        color: new Color("white"),
      })
    );

    pipeMesh.userData.json = json;

    return pipeMesh;
  }
}
