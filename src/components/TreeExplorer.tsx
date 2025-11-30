import React, { useEffect } from "react";
import type { Path } from "../types/common";
import { deleteFinalKeyOfPath } from "../utils/deleteFinalKeyOfPath";
import Breadcrumb from "./Breadcrumb";
import ConfirmModal from "./modals/ConfirmModal";
import ImportJsonModal from "./modals/ImportJsonModal";
import TreeView from "./TreeView";

interface Props {
    treeData: any;
}

const TreeExplorer = ({ treeData: initialTreeData } : Props) => {
    const [treeData, setTreeData] = React.useState(initialTreeData);
    const [selectedPath, setSelectedPath] = React.useState<Path>([Object.keys(treeData)[0]]);
    const [deleteNodePath, setDeleteNodePath] = React.useState<Path | null>(null);
    const [importModalOpen, setImportModalOpen] = React.useState(false);

    useEffect(() => {
        localStorage.setItem("treeData", JSON.stringify(treeData));
    }, [ treeData ]);
    
    let handleDeleteNode = () => {
        if (deleteNodePath) {
            const updatedData = deleteFinalKeyOfPath(treeData, deleteNodePath);
    
            setTreeData(updatedData);
            if (JSON.stringify(deleteNodePath) === JSON.stringify(selectedPath)) {
                setSelectedPath([]);
            }
            setDeleteNodePath(null);
        }
    }
    
    let onImportJson = (json: any) => {
        setTreeData(json);
        setImportModalOpen(false);
        setSelectedPath([]);
    }

    return (
        <div className="w-full h-screen flex">
            {/* Left Panel */}
            <div className="w-[480px] border-r border-gray-300 p-4 overflow-auto"> {/* Changing the width needs to reflect the tree node label in the TreeNode component */}
                <div className="justify-between flex">
                    <h2 className="text-xl font-semibold mb-4">Tree Explorer</h2>

                    <button
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => setImportModalOpen(true)}
                    >
                        Import
                    </button>
                </div>

                <TreeView
                    data={treeData}
                    selectedPath={selectedPath}
                    onSelectNode={setSelectedPath}
                    onDeleteNode={setDeleteNodePath}
                />
            </div>

            {/* Right Panel */}
            <div className="flex-1 p-4">
                {/* Breadcrumb */}
                <Breadcrumb path={selectedPath} />

                {/* JSON Display */}
                <pre className="bg-gray-900 text-gray-200 p-4 rounded-md h-[calc(100%-60px)] overflow-auto text-sm whitespace-pre-wrap break-words">
                    {JSON.stringify(treeData, null, 2)}
                </pre>
            </div>

            <ConfirmModal
                isOpen={deleteNodePath !== null}
                onConfirm={handleDeleteNode}
                onCancel={() => setDeleteNodePath(null)}
                message={`Are you sure to delete the node "${deleteNodePath?.[ deleteNodePath.length - 1 ]}"? This action cannot be undone.`}
            />

            <ImportJsonModal
                isOpen={importModalOpen}
                onImport={onImportJson}
                onClose={() => setImportModalOpen(false)}
            />
        </div>
    )
}

export default TreeExplorer;