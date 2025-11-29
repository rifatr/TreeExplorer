import type { Path } from '../types/common';
import TreeNode from './TreeNode'

interface Props {
    data: any;
    selectedPath: Path;
    onSelectNode: (path: Path) => void;
}

const TreeView = ({ data, selectedPath, onSelectNode }: Props) => {
  return (
    <div className="text-sm font-mono select-none">
        {Object.entries(data).map(([key, value]) => (
            <TreeNode 
                key={key} 
                label={key} 
                value={value}
                currentPath={[key]}
                selectedPath={selectedPath}
                onSelectNode={onSelectNode} 
            />
        ))}
    </div>
  )
}

export default TreeView