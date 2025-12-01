import React, { useEffect } from "react";
import ImportJsonModal from "./components/modals/ImportJsonModal";
import TreeExplorer from "./components/TreeExplorer";

function App() {
	const [ treeData, setTreeData ] = React.useState<any | null>(null);
	const [ oldTreeData, setOldTreeData ] = React.useState<any | null>(null);
	const [ importModalOpen, setImportModalOpen ] = React.useState(false);

	useEffect(() => {
		const savedData = localStorage.getItem("treeData");
		const oldSavedData = localStorage.getItem("oldTreeData");

		if(savedData) {
			try {
				const parsedData = JSON.parse(savedData);
				setTreeData(parsedData)
			} catch (err) {
				console.log(`Saved data is inconsistant.\nError: ${err}\nSaved Data: ${savedData}`)
			}
		}
		if(oldSavedData) {
			try {
				const parsedOldData = JSON.parse(oldSavedData);
				setOldTreeData(parsedOldData)
			} catch (err) {
				console.log(`Old saved data is inconsistant.\nError: ${err}\nSaved Data: ${oldSavedData}`)
			}
		}
	}, []);

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
				<TreeExplorer 
					treeData={treeData}
					oldTreeData={oldTreeData}
				/>
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