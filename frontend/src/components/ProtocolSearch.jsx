import { useState } from "react";

function ProtocolSearch({ onSearch, loading }) {
  const [input, setInput] = useState("");

  function handleSubmit() {
    if (input.trim()) onSearch(input.trim().toLowerCase());
  }

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <input
        type="text"
        placeholder="e.g. uniswap, aave, gmx..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        style={{
          flex: 1,
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid #334155",
          background: "#1e293b",
          color: "#f1f5f9",
          fontSize: "0.95rem",
          outline: "none",
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "10px 22px",
          borderRadius: "8px",
          border: "none",
          background: "#22d3ee",
          color: "#0f172a",
          fontWeight: 700,
          fontSize: "0.95rem",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Loading..." : "Search"}
      </button>
    </div>
  );
}

export default ProtocolSearch;