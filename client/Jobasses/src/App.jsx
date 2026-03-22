import { useState } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import axios from "axios";
import InputNode from "./InputNode";
import ResultNode from "./ResultNode";

const nodeTypes = { inputNode: InputNode, resultNode: ResultNode };

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const nodes = [
    { id: "1", type: "inputNode", position: { x: 100, y: 150 }, data: { value: prompt, onChange: setPrompt } },
    { id: "2", type: "resultNode", position: { x: 500, y: 150 }, data: { result } },
  ];

  const edges = [{ id: "e1-2", source: "1", target: "2", animated: true }];

  const handleRun = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setSaved(false);
    try {
      const res = await axios.post("https://futureblink-assignment-gbde.onrender.com/api/ask-ai"", { prompt });
      setResult(res.data.answer);
    } catch (err) {
      setResult("Error: Could not get response.");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!prompt || !result) return;
    try {
      await axios.post("https://futureblink-assignment-gbde.onrender.com/api/save"", { prompt, response: result });
      setSaved(true);
    } catch (err) {
      alert("Save failed");
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0f0f1a", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 20px", display: "flex", gap: 12 }}>
        <button onClick={handleRun} disabled={loading} style={btn("#6366f1")}>
          {loading ? "Running..." : "▶ Run Flow"}
        </button>
        <button onClick={handleSave} disabled={!result} style={btn("#22c55e")}>
          💾 Save
        </button>
        {saved && <span style={{ color: "#86efac", alignSelf: "center" }}>✓ Saved!</span>}
      </div>

      <div style={{ flex: 1 }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
          <Background color="#2a2a3d" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

const btn = (color) => ({
  background: color, color: "#fff", border: "none",
  borderRadius: 8, padding: "10px 22px", cursor: "pointer",
  fontWeight: "bold", fontSize: 14,
});
