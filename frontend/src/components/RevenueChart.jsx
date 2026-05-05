import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

function RevenueChart({ protocols }) {
  const data = protocols.slice(0, 10).map((p) => ({
    name: p.name.length > 10 ? p.name.slice(0, 10) + "…" : p.name,
    Fees: parseFloat((p.fees30d / 1_000_000).toFixed(2)),
    Revenue: parseFloat((p.revenue30d / 1_000_000).toFixed(2)),
  }));

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
          formatter={(value) => [`$${value}M`]}
          contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
          labelStyle={{ color: "#f1f5f9" }}
        />
        <Legend wrapperStyle={{ color: "#94a3b8", paddingTop: "20px" }} />
        <Bar dataKey="Fees" fill="#22d3ee" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Revenue" fill="#818cf8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default RevenueChart;