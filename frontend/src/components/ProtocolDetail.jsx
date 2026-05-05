import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";
import { formatCurrency, sustainabilitySignal } from "../services/api";

function ProtocolDetail({ data }) {
  if (!data) return (
    <p style={{ color: "#ef4444", textAlign: "center" }}>
      Protocol not found. Try another name.
    </p>
  );

  const signal = sustainabilitySignal(data.fees30d, data.revenue30d);
  const dailyData = Array.isArray(data.dailyData) ? data.dailyData.filter(
    (d) => d && d.date && typeof d.fees === "number"
  ) : [];

  const stats = [
    { label: "Category", value: data.category || "Unknown" },
    { label: "Chains", value: Array.isArray(data.chains) ? data.chains.slice(0, 4).join(", ") || "Unknown" : "Unknown" },
    { label: "30D Fees", value: formatCurrency(data.fees30d), color: "#22d3ee" },
    { label: "30D Revenue", value: formatCurrency(data.revenue30d), color: "#818cf8" },
    { label: "Sustainability", value: signal.label, color: signal.color },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
        {stats.map((item) => (
          <div key={item.label} style={{
            background: "#1e293b",
            borderRadius: "10px",
            padding: "14px 20px",
            flex: "1 1 140px",
            minWidth: "120px",
          }}>
            <div style={{ color: "#94a3b8", fontSize: "0.78rem", marginBottom: "6px" }}>{item.label}</div>
            <div style={{ color: item.color || "#f1f5f9", fontWeight: 700, fontSize: "1rem" }}>{item.value}</div>
          </div>
        ))}
      </div>

      <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "12px" }}>
        Daily Fees — Last 30 Days
      </p>

      {dailyData.length > 0 ? (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={dailyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 10 }} interval={4} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => formatCurrency(v)} />
            <Tooltip
              formatter={(value) => [formatCurrency(value), "Daily Fees"]}
              contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
              labelStyle={{ color: "#f1f5f9" }}
            />
            <Line type="monotone" dataKey="fees" stroke="#22d3ee" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ color: "#475569", textAlign: "center", padding: "40px 0" }}>
          No daily breakdown data available for this protocol.
        </p>
      )}
    </div>
  );
}

export default ProtocolDetail;