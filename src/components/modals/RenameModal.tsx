import React, { useEffect } from "react";

interface Props {
    isOpen: boolean;
    previousName?: string;
    onRename: (name: string) => void;
    onClose: () => void;
}

const RenameModal = ({ isOpen, previousName, onRename, onClose }: Props) => {
    if (!isOpen) return null;

    let [textValue, setTextValue] = React.useState("");
    let [error, setError] = React.useState<string>("");

    useEffect(() => {
        setTextValue(previousName ?? "");
    }, [])

    let onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextValue(event.target.value);
        setError("");
    }

    let onSave = () => {
        if (textValue.trim() === "") {
            setError("Name cannot be empty")
        }
        else {
            onRename(textValue);
            setTextValue("");
            setError("");
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 shadow-lg w-[450px]">
                <h2 className="text-xl font-semibold mb-4 text-center">Rename</h2>

                <textarea
                    value={textValue}
                    onChange={onChangeText}
                    placeholder={previousName ?? "Enter new name"}
                    autoFocus={true}
                    className="w-full h-12 border border-gray-300 rounded p-2 mt-4 mb-4 font-mono text-sm resize-none"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="flex justify-between gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Close
                    </button>

                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={onSave}
                        
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RenameModal