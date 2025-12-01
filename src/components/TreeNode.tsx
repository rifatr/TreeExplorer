import React from "react";
import type { Path } from "../types/common";
import renameIcon from "../assets/rename.svg";

interface Props {
    label: string;
    value: any;
    currentPath: Path;
    selectedPath: Path;
    onSelectNode: (path: Path) => void;
    onDeleteNode: (path: Path) => void;
    onRenameNode: (path: Path) => void;
}

const TreeNode = ({
    label,
    value,
    currentPath,
    selectedPath,
    onSelectNode,
    onDeleteNode,
    onRenameNode
}: Props) => {
    const hasChildren = value && typeof value === 'object';
    const isSelected = JSON.stringify(currentPath) === JSON.stringify(selectedPath);
    const isRootNode = currentPath.length === 1;

    const [ expanded, setExpanded ] = React.useState(isRootNode); // Root node expanded by default

    return (
        <div className="pl-4 relative">
            {/* Vertical guide line except the root component */}
            {!isRootNode && (
                <div className="absolute left-[4px] top-0 bottom-0 border-l border-gray-300 -mt-4"></div>
            )}

            {/* Node row */}
            <div className="flex justify-between">
                <div
                    className={`flex items-center gap-1 cursor-pointer mb-4
                                ${isSelected ? "font-semibold text-blue-600" : ""}`}
                    onClick={() => {
                        setExpanded(!expanded);
                        onSelectNode(currentPath);
                    }}
                >
                    {hasChildren ? (
                        <span className="mr-2">{expanded ? "▼" : "▶"}</span>
                    ) : (
                        <span className="inline-block"></span>
                    )}
                    <span
                        className="mr-2 text-sm max-w-[320px] overflow-hidden text-ellipsis whitespace-nowrap inline-block align-middle"
                        title={label}
                    >
                        {label}
                    </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                    {!isRootNode && (
                        <button
                            className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
                            onClick={() => onDeleteNode(currentPath)}
                        >−</button>
                    )}

                    <button
                        className="w-5 h-5 border rounded-full text-gray-500 hover:bg-gray-200 hover:text-blue-600"
                        onClick={() => onRenameNode(currentPath)}
                    >
                        <img src={renameIcon} alt="Rename" className="w-5 h-5 text-current" />
                    </button>
                </div>
            </div>

            {/* Children */}
            {expanded &&
                hasChildren &&
                Object.entries(value).map(([ key, val ]) =>
                    <TreeNode
                        key={key}
                        label={key}
                        value={val}
                        currentPath={[ ...currentPath, key ]}
                        selectedPath={selectedPath}
                        onSelectNode={onSelectNode}
                        onDeleteNode={onDeleteNode}
                        onRenameNode={onRenameNode}
                    />
                )}
        </div>
    )
}

export default TreeNode