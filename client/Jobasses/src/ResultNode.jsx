import { Handle, Position } from "@xyflow/react";

export default function ResultNode({ data }) {
  return (
    <div style={styles.box}>
      <strong style={{ color: "#86efac" }}>Result Node</strong>
      <div style={styles.result}>
        {data.result || "Answer will appear here..."}
      </div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
}

const styles = {
  box: {
    padding: 16, border: "2px solid #22c55e", borderRadius: 10,
    background: "#1e1e2e", color: "#fff", width: 280,
    display: "flex", flexDirection: "column", gap: 8,
  },
  result: {
    background: "#2a2a3d", borderRadius: 6, padding: 8,
    minHeight: 80, fontSize: 13, whiteSpace: "pre-wrap",
    color: "#d1fae5",
  },
};