import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell
} from "recharts";
import { formatCurrency } from "../services/api";

function FeesBarChart({ protocols }) {
  const data = protocols.map((p) => ({
    name: p.name.length > 10 ? p.name.slice(0, 10) + "…" : p.name,
    fees: parseFloat((p.fees30d / 1_000_000).toFixed(2)),
  }));

  const COLORS = [
    "#22d3ee", "#818cf8", "#34d399", "#fb923c",
    "#f472b6", "#a78bfa", "#38bdf8", "#4ade80",
  ];

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
        <XAxis
          dataKey="name"
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          angle={-45}
          textAnchor="end"
          interval={0}
        />
        <YAxis
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          tickFormatter={(v) => `$${v}M`}
        />
        <Tooltip
          formatter={(value) => [`$${value}M`, "30D Fees"]}
          contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
          labelStyle={{ color: "#f1f5f9" }}
        />
        <Bar dataKey="fees" radius={[4, 4, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default FeesBarChart;