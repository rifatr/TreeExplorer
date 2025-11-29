import React from "react";
import TreeView from "./components/TreeView";
import { hardcodedJson } from "./hardcodedJson";
import type { Path } from "./types/common";
import Breadcrumb from "./components/Breadcrumb";

function App() {
  const [selectedPath, setSelectedPath] = React.useState<Path>([]);

  return (
    <div className="w-full h-screen flex">
      {/* Left Panel */}
      <div className="w-1/3 border-r border-gray-300 p-4">
        <h2 className="text-xl font-semibold mb-4">Tree Explorer</h2>
        <TreeView 
          data={hardcodedJson}
          selectedPath={selectedPath}
          onSelectNode={setSelectedPath} 
        />
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-4">
        {/* Breadcrumb */}
        <Breadcrumb path={selectedPath} />
        
        {/* JSON Display */}
        <pre className="bg-gray-900 text-gray-200 p-4 rounded-md h-[calc(100%-60px)] overflow-auto">
          {JSON.stringify(hardcodedJson, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;