import React from "react";
import TreeView from "./components/TreeView";
import { hardcodedJson } from "./hardcodedJson";
import type { Path } from "./types/common";
import Breadcrumb from "./components/Breadcrumb";
import ConfirmModal from "./components/modals/ConfirmModal";
import { deleteFinalKeyOfPath } from "./utils/deleteFinalKeyOfPath";
import ImportJsonModal from "./components/modals/ImportJsonModal";

function App() {
  const [treeData, setTreeData] = React.useState(hardcodedJson);
  const [selectedPath, setSelectedPath] = React.useState<Path>([]);
  const [deleteNodePath, setDeleteNodePath] = React.useState<Path | null>(null);
  const [importModalOpen, setImportModalOpen] = React.useState(false);

  let handleDeleteNode = () => {
    if (deleteNodePath) {
      console.log("Delete node at path:", deleteNodePath);
      const updatedData = deleteFinalKeyOfPath(treeData, deleteNodePath);
      console.log("Updated data:", updatedData);

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

      {/* Confirm Delete Modal */}
      <ConfirmModal 
        isOpen={deleteNodePath !== null}
        onConfirm={handleDeleteNode}
        onCancel={() => setDeleteNodePath(null)}
        message={`Are you sure to delete the node "${deleteNodePath?.[deleteNodePath.length - 1]}"? This action cannot be undone.`}
      />

      {/* Import JSON Modal */}
      <ImportJsonModal
        isOpen={importModalOpen}
        onImport={onImportJson}
        onClose={() => setImportModalOpen(false)}
      />
    </div>

  );
}

export default App;