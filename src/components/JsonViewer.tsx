interface Props {
    data: any
}

const JsonViewer = ({ data }: Props) => {
    return (
        <pre className="
            bg-gray-900 text-gray-200 p-4 rounded-md 
            h-[calc(100%-60px)] overflow-auto 
            whitespace-pre text-sm"
        >
            {JSON.stringify(data, null, 2)}
        </pre>
    );
};

export default JsonViewer