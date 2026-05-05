import { formatCurrency, sustainabilitySignal } from "../services/api";

function TopProtocolsTable({ protocols }) {
  if (!protocols || protocols.length === 0) {
    return <p style={{ color: "#94a3b8", textAlign: "center" }}>No data available.</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #1e293b" }}>
            {["#", "Protocol", "Category", "30D Fees", "30D Revenue", "Sustainability"].map((h) => (
              <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#94a3b8", fontWeight: 600 }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {protocols.map((p, i) => {
            const signal = sustainabilitySignal(p.fees30d, p.revenue30d);
            return (
              <tr
                key={p.name}
                style={{ borderBottom: "1px solid #1e293b", transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1e293b")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "10px 14px", color: "#475569" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px", color: "#f1f5f9", fontWeight: 600 }}>{p.name}</td>
                <td style={{ padding: "10px 14px", color: "#94a3b8" }}>{p.category}</td>
                <td style={{ padding: "10px 14px", color: "#22d3ee" }}>{formatCurrency(p.fees30d)}</td>
                <td style={{ padding: "10px 14px", color: "#818cf8" }}>{formatCurrency(p.revenue30d)}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{
                    background: signal.color + "22",
                    color: signal.color,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                  }}>
                    {signal.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TopProtocolsTable;