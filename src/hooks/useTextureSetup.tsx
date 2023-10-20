import { useThree } from "@react-three/fiber";
import { RepeatWrapping, Texture, TextureLoader } from "three";
import { ObjectInfo } from "~/states/SceneState";

export default function useTextureSetup({ mesh, json }: ObjectInfo) {
  const renderer = useThree((state) => state.gl);

  const setupTexture = async () => {
    // console.log("Texture applied to object");
    const textureLoader = new TextureLoader();

    if (json.texture === "Default") return;

    const texture = await textureLoader.loadAsync(
      `textures/${json.texture}.jpg`
    );

    if (!texture) return;

    const material = Array.isArray(mesh.material)
      ? mesh.material[0]
      : mesh.material;

    if (!material || !("map" in material)) return;

    if (material.map) return;

    setTextureSettings(texture);

    material.map = texture;
    material.needsUpdate = true;

    return texture;
  };

  const setTextureSettings = (texture: Texture) => {
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;

    texture.repeat.set(4, 1);

    texture.needsUpdate = true;
  };

  return { setupTexture };
}
