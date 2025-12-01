import React, { useEffect } from "react";
import type { Path } from "../types/common";
import { deleteFinalKeyOfPath } from "../utils/deleteFinalKeyOfPath";
import Breadcrumb from "./Breadcrumb";
import ConfirmModal from "./modals/ConfirmModal";
import ImportJsonModal from "./modals/ImportJsonModal";
import TreeView from "./TreeView";
import RenameModal from "./modals/RenameModal";
import { renameFinalKeyOfPath } from "../utils/renameFinalKeyOfPath";
import JsonViewer from "./JsonViewer";

interface Props {
    treeData: any;
    oldTreeData?: any;
}

const TreeExplorer = ({ treeData: initialTreeData, oldTreeData: initialOldTreeData }: Props) => {
    const [ treeData, setTreeData ] = React.useState(initialTreeData);
    const [ oldTreeData, setOldTreeData ] = React.useState<any | null>(initialOldTreeData);
    const [ selectedPath, setSelectedPath ] = React.useState<Path>([]);

    const [ importModalOpen, setImportModalOpen ] = React.useState(false);

    const [ deleteNodePath, setDeleteNodePath ] = React.useState<Path | null>(null);
    const [ renameNodePath, setRenameNodePath ] = React.useState<Path | null>(null);

    useEffect(() => {
        localStorage.setItem("treeData", JSON.stringify(treeData));
        localStorage.setItem("oldTreeData", JSON.stringify(oldTreeData));
        initializeSelectedPath();
    }, [ treeData ]);
    useEffect(() => {
        localStorage.setItem("oldTreeData", JSON.stringify(oldTreeData));
    }, [ oldTreeData ]);

    let initializeSelectedPath = () => {
        const treeDataKeys = Object.keys(treeData);
        setSelectedPath(treeDataKeys.length > 0 ? [ treeDataKeys[ 0 ] ] : [])
    }

    let onImportJson = (json: any) => {
        setTreeData(json);
        setOldTreeData(null);
        setImportModalOpen(false);
        initializeSelectedPath();
    }

    let handleDeleteNode = () => {
        if (deleteNodePath) {
            const updatedData = deleteFinalKeyOfPath(treeData, deleteNodePath);

            setOldTreeData(treeData);
            setTreeData(updatedData);
            if (JSON.stringify(deleteNodePath) === JSON.stringify(selectedPath)) {
                initializeSelectedPath();
            }
            setDeleteNodePath(null);
        }
    }

    let handleRenameNode = (name: string) => {
        if (renameNodePath) {
            const updatedData = renameFinalKeyOfPath(treeData, renameNodePath, name);
            setOldTreeData(treeData);
            setTreeData(updatedData);
            setRenameNodePath(null);
        }
    }

    let undo = () => {
        if (oldTreeData) {
            setTreeData(oldTreeData);
            setOldTreeData(null);
            initializeSelectedPath();
        }
    }

    return (
        <div className="w-full h-screen flex">
            {/* Left Panel */}
            <div className="w-[480px] min-w-[480px] border-r border-gray-300 p-4 overflow-auto"> {/* Changing the width needs to reflect the tree node label in the TreeNode component */}
                <div className="justify-between flex">
                    <h2 className="text-xl font-semibold mb-4">Tree Explorer</h2>

                    <div className="flex gap-2">
                        {oldTreeData && (
                            <button
                            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={() => undo()}
                            >
                                Undo
                            </button>
                        )}

                        <button
                            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => setImportModalOpen(true)}
                        >
                            Import
                        </button>
                    </div>
                </div>
                
                {/* Tree Viewer */}
                {Object.keys(treeData).length > 0 ? (
                    <TreeView
                        data={treeData}
                        selectedPath={selectedPath}
                        onSelectNode={setSelectedPath}
                        onDeleteNode={setDeleteNodePath}
                        onRenameNode={setRenameNodePath}
                    />
                ) : (
                    <p className="text-gray-500 text-sm mt-2">
                        No data loaded. Click &quot;Import&quot; to load JSON.
                    </p>
                )}
            </div>

            {/* Right Panel */}
            <div className="flex-1 p-4 overflow-x-hidden">
                <Breadcrumb path={selectedPath} />

                <JsonViewer data={treeData} />
            </div>

            {/* Modals */}
            <ImportJsonModal
                isOpen={importModalOpen}
                onImport={onImportJson}
                onClose={() => setImportModalOpen(false)}
            />

            <ConfirmModal
                isOpen={deleteNodePath !== null}
                onConfirm={handleDeleteNode}
                onCancel={() => setDeleteNodePath(null)}
                message={`Are you sure to delete the node "${deleteNodePath?.[ deleteNodePath.length - 1 ]}"? This action cannot be undone.`}
            />

            <RenameModal
                isOpen={renameNodePath !== null}
                onRename={handleRenameNode}
                previousName={renameNodePath ? renameNodePath[ renameNodePath.length - 1 ] : undefined}
                onClose={() => setRenameNodePath(null)}
            />
        </div>
    )
}

export default TreeExplorer;