import TreeNode from './TreeNode'

interface Props {
    data: any;
    selectedPath: string[];
    onSelectNode: (path: string[]) => void;
}

const TreeView = ({ data, selectedPath, onSelectNode }: Props) => {
  return (
    <div>
        {
            Object.entries(data).map(([key, value]) => (
                <TreeNode 
                    key={key} 
                    label={key} 
                    value={value}
                    currentPath={[key]}
                    selectedPath={selectedPath}
                    onSelectNode={onSelectNode} 
                />
            ))
        }
    </div>
  )
}

export default TreeView