function App() {
  return (
    <div className="w-full h-screen flex">
      {/* Left Panel */}
      <div className="w-1/3 border-r border-gray-300 p-4">
        <h2 className="text-xl font-semibold mb-4">Tree Explorer</h2>
        <p className="text-sm text-gray-500">Tree will appear here.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold mb-4">JSON Viewer</h2>
        <pre className="bg-gray-900 text-gray-200 p-4 rounded-md h-[calc(100%-60px)] overflow-auto">
          {}
        </pre>
      </div>
    </div>
  );
}

export default App;