import type { Path } from "../types/common";

export function renameFinalKeyOfPath(obj: any, path: Path, newName: string) : any {
    if (path.length === 1) { // Root key rename
        return Object.fromEntries(
            Object.entries(obj).map(([key, val]) => 
                key == path[0] ? [newName, val] : [key, val]));
    }

    const [parent, ...nestedChilds] = path;

    const childsAfterRename =
        nestedChilds.length === 1
        ? Object.fromEntries(
            Object.entries(obj[parent]).map(([childKey, childVal]) => 
                childKey == nestedChilds[0] ? [newName, childVal] : [childKey, childVal]))
        : renameFinalKeyOfPath(obj[parent], nestedChilds, newName);

    return {
        ...obj,
        [parent]: childsAfterRename
    };
}