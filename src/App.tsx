import React from "react";
import ImportJsonModal from "./components/modals/ImportJsonModal";
import TreeExplorer from "./components/TreeExplorer";

function App() {
	const [ treeData, setTreeData ] = React.useState<any | null>(null);
	const [ importModalOpen, setImportModalOpen ] = React.useState(false);

	let onImportJson = (data: any) => {
		setTreeData(data);
		setImportModalOpen(false);
	}

	return (
		<div className="h-screen flex justify-center items-center">
			{!treeData ? (
				<button
					className="px-4 py-4 bg-blue-500 text-white rounded hover:bg-blue-600"
					onClick={() => setImportModalOpen(true)}
				>
					Import JSON to Start
				</button>
			) : (
				<TreeExplorer treeData={treeData} />
			)}

			<ImportJsonModal
				isOpen={importModalOpen}
				onImport={onImportJson}
				onClose={() => setImportModalOpen(false)}
			/>
		</div>
	);
}

export default App;