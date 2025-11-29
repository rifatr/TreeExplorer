import React from "react";
import TreeView from "./components/TreeView";
import { hardcodedJson } from "./hardcodedJson";
import type { Path } from "./types/common";
import Breadcrumb from "./components/Breadcrumb";
import ConfirmModal from "./components/modals/ConfirmModal";
import { deleteFinalKeyOfPath } from "./utils/deleteFinalKeyOfPath";

function App() {
  const [treeData, setTreeData] = React.useState(hardcodedJson);
  const [selectedPath, setSelectedPath] = React.useState<Path>([]);
  const [deleteNodePath, setDeleteNodePath] = React.useState<Path | null>(null);

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

  return (
    <div className="w-full h-screen flex">
      {/* Left Panel */}
      <div className="w-1/3 border-r border-gray-300 p-4">
        <h2 className="text-xl font-semibold mb-4">Tree Explorer</h2>
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
        <pre className="bg-gray-900 text-gray-200 p-4 rounded-md h-[calc(100%-60px)] overflow-auto">
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
    </div>

  );
}

export default App;