import type { Path } from '../types/common';
import TreeNode from './TreeNode'

interface Props {
    data: any;
    selectedPath: Path;
    onSelectNode: (path: Path) => void;
    onDeleteNode: (path: Path) => void;
    onRenameNode: (path: Path) => void;
}

const TreeView = ({ data, selectedPath, onSelectNode, onDeleteNode, onRenameNode }: Props) => {
  return (
    <div className="text-sm font-mono">
        {Object.entries(data).map(([key, value]) => (
            <TreeNode 
                key={key} 
                label={key} 
                value={value}
                currentPath={[key]}
                selectedPath={selectedPath}
                onSelectNode={onSelectNode} 
                onDeleteNode={onDeleteNode}
                onRenameNode={onRenameNode}
            />
        ))}
    </div>
  )
}

export default TreeView