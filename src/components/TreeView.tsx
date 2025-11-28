import TreeNode from './TreeNode'

interface Props {
    data: any;
}

const TreeView = ({ data }: Props) => {
  return (
    <div>
        <TreeNode label="Root" value={data} />
    </div>
  )
}

export default TreeView