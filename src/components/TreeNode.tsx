interface Props {
    label: string;
    value: any;
}

const TreeNode = ({ label, value }: Props) => {
    const hasChildren = value && typeof value === 'object';

    return (
        <div className="ml-4">
            <div className="font-medium">
                <span>▼</span>
                <span className="ml-3">{label}</span>
            </div>

            { 
                hasChildren && 
                Object.entries(value).map(([key, val]) =>
                    <TreeNode 
                        key={key}
                        label={key} 
                        value={val}
                    />
                )
            }
        </div>
    )
}

export default TreeNode