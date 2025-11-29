import React from "react";

interface Props {
    label: string;
    value: any;
    currentPath: string[];
    selectedPath: string[];
    onSelectNode: (path: string[]) => void;
}

const TreeNode = ({ 
    label,
    value,
    currentPath,
    selectedPath,
    onSelectNode
 }: Props) => {
    const hasChildren = value && typeof value === 'object';
    const [expanded, setExpanded] = React.useState(false);
    const isSelected = JSON.stringify(currentPath) === JSON.stringify(selectedPath);

    return (
        <div className="pl-4 relative">
            {/* Vertical guide line except the root component */}
            {currentPath.length > 1 && (
                <div className="absolute left-[4px] top-0 bottom-0 border-l border-gray-300"></div>
            )}

            <div className="flex justify-between">
                <div 
                    className={`flex items-center gap-1 cursor-pointer mb-4
                        ${isSelected ? "font-semibold text-blue-600" : ""}`}
                    onClick = {() => {
                        setExpanded(!expanded);
                        onSelectNode(currentPath);
                    }}
                >
                    { 
                        hasChildren ? (
                            <span className="mr-2">{expanded ? "▼" : "▶"}</span>
                        ) : (
                            <span className="inline-block"></span>
                        )
                    }
                    <span>{label}</span>
                </div>
 
                {/* Delete button except the root */}
                {currentPath.length > 1 && (
                    <button
                        onClick={(e) => {
                        e.stopPropagation();
                        console.log(currentPath);
                        }}
                        className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
                    >
                        −
                    </button>
                )}
            </div>
            {/* Node row */}
            
            {/* Children */}
            { 
                expanded &&
                hasChildren && 
                Object.entries(value).map(([key, val]) =>
                    <TreeNode 
                        key={key}
                        label={key} 
                        value={val}
                        currentPath={[...currentPath, key]}
                        selectedPath={selectedPath}
                        onSelectNode={onSelectNode}
                    />
                )
            }
        </div>
    )
}

export default TreeNode