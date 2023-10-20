import { button, folder, useControls } from "leva";
import jsonData from "~/objects.json";
import useObjectAdding from "~/hooks/useObjectAdding";

export interface ObjectRestrictions {
  left: number;
  right: number;
}

export interface ObjectOperations {
  straightCut: boolean;
  obliqueCut: boolean;
}

export interface ObjectSize {
  x: number;
  y: number;
  z: number;
}

interface ObjectJSONData {
  article: number;
  category: string;
  mesh: string;
  name: string;
  operation: ObjectOperations;
  price: number;
  size: ObjectSize;
  texture: string;
}

export type ObjectJSON = Partial<ObjectJSONData>;

export default function ObjectSelector() {
  const objects: ObjectJSON[] = jsonData.data;
  const groups = groupBy(objects, (i) => i.category ?? "");

  return (
    <>
      {Object.keys(groups).map((group, index) => (
        <FolderControls key={index} items={groups[group] ?? []} />
      ))}
    </>
  );
}

function FolderControls({ items }: { items: ObjectJSON[] }) {
  return (
    <>
      {items.map((itemJson, index) => {
        return <FolderButton json={itemJson} key={index} />;
      })}
    </>
  );
}

function FolderButton({ json }: { json: ObjectJSON }) {
  const { addObjectToScene } = useObjectAdding();

  const escapeCharacterRegex = /[.*+?^${}()|[\]\\]/g;

  const category = json.category?.replace(escapeCharacterRegex, "\\$&") ?? " "; // Character escaping in category
  const name = json.name ?? " ";

  useControls("Объекты", {
    [`${category}`]: folder({
      [`${name}`]: button(() => {
        addObjectToScene(json);
      }),
    }),
  });

  return <></>;
}

const groupBy = <T, K extends keyof never>(arr: T[], key: (i: T) => K) =>
  arr.reduce(
    (groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
    },
    {} as Record<K, T[]>
  );
