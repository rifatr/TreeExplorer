import React from "react";

interface Props {
    isOpen: boolean;
    onImport: (json: any) => void;
    onCancel: () => void;
}

const ImportJsonModal = ({ isOpen, onImport, onCancel }: Props) => {
    if (!isOpen) return null;

    let [textValue, setTextValue] = React.useState("");
    let [error, setError] = React.useState<string>("");

    let onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextValue(event.target.value);
        setError("");
    }

    let handleImport = () => {
        try {
            const parsedJson = JSON.parse(textValue);
            onImport(parsedJson);
            setTextValue("");
            setError("");
        } catch (err) {
            setError("Invalid JSON. Please correct the errors and try again.");
            console.error("JSON parse error:", err);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 shadow-lg w-[450px]">
                <h2 className="text-xl font-semibold mb-4 text-center">Import JSON</h2>

                <textarea
                    value={textValue}
                    onChange={onChangeText}
                    placeholder="Paste your JSON here"
                    className="w-full h-48 border border-gray-300 rounded p-2 mt-4 mb-4 font-mono text-sm resize-none"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="flex justify-between gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleImport}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Import
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImportJsonModal