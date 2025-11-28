import TreeNode from './TreeNode'

interface Props {
    data: any;
}

const TreeView = ({ data }: Props) => {
  return (
    <div>
        {
            Object.entries(data).map(([key, value]) => (
                <TreeNode key={key} label={key} value={value} />
            ))
        }
    </div>
  )
}

export default TreeView