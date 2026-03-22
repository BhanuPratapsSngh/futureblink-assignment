import { Handle, Position } from "@xyflow/react";

export default function InputNode({ data }) {
  return (
    <div style={styles.box}>
      <strong style={{ color: "#a5b4fc" }}>Input Node</strong>
      <textarea
        rows={4}
        style={styles.textarea}
        placeholder="Type your prompt..."
        value={data.value}
        onChange={(e) => data.onChange(e.target.value)}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const styles = {
  box: {
    padding: 16, border: "2px solid #6366f1", borderRadius: 10,
    background: "#1e1e2e", color: "#fff", width: 250,
    display: "flex", flexDirection: "column", gap: 8,
  },
  textarea: {
    width: "100%", background: "#2a2a3d", color: "#fff",
    border: "1px solid #444", borderRadius: 6,
    padding: 8, resize: "none", fontSize: 13,
  },
};