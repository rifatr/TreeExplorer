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
        <div className="ml-4 mb-2 border">
            <div 
                className={`flex items-center gap-1 cursor-pointer 
                    ${isSelected ? "font-semibold text-blue-600" : ""}`}
                onClick = {() => {
                    setExpanded(!expanded);
                    onSelectNode(currentPath);
                }}
            >
                { 
                    hasChildren ? (
                        <span className="mr-2 mb-2">{expanded ? "▼" : "▶"}</span>
                    ) : (
                        <span className="inline-block"></span>
                    )
                }
                <span>{label}</span>
            </div>
        
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