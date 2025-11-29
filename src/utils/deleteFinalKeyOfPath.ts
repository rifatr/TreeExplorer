import type { Path } from "../types/common";

export function deleteFinalKeyOfPath(obj: any, path: Path): any {
  if (path.length <= 1) return obj; // root-level key cannot be deleted here

  const [parent, ...nestedChilds] = path;

  const childsAfterDeletion =
    nestedChilds.length === 1 // reached the final key to delete
      ? Object.fromEntries(
          Object.entries(obj[parent]).filter(([childKey]) => childKey !== nestedChilds[0]))
      : deleteFinalKeyOfPath(obj[parent], nestedChilds);

  return {
    ...obj,
    [parent]: childsAfterDeletion
  };
}