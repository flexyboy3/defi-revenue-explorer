const BASE_URL = "https://api.llama.fi";

/**
 * Fetch top 20 DeFi protocols by 30-day fees
 */
export async function getTopProtocolsByFees() {
  try {
    const response = await fetch(`${BASE_URL}/overview/fees`);
    if (!response.ok) throw new Error("Failed to fetch overview");
    const data = await response.json();

    const protocols = data.protocols || [];

    const filtered = protocols
      .filter((p) => p.name && p.total30d != null)
      .map((p) => ({
        name: p.name,
        fees30d: p.total30d || 0,
        revenue30d: p.totalRevenue30d || 0,
        category: p.category || "Unknown",
      }))
      .sort((a, b) => b.fees30d - a.fees30d)
      .slice(0, 20);

    return filtered;
  } catch (error) {
    console.error("getTopProtocolsByFees error:", error);
    return [];
  }
}

/**
 * Fetch fee + revenue history for a single protocol
 */
export async function getProtocolFeeHistory(protocolName) {
  const slug = protocolName.toLowerCase().replace(/\s+/g, "-");
  try {
    const response = await fetch(`${BASE_URL}/summary/fees/${slug}`);
    if (!response.ok) throw new Error(`Protocol '${slug}' not found`);
    const data = await response.json();

    // Get last 30 days of daily data
    const rawEntries =
      data.totalDataChartBreakdown || data.totalDataChart || [];
    const last30 = rawEntries.slice(-30);

    const dailyData = last30.map((entry) => {
      const timestamp = entry[0];
      const value = entry[1];
      const total =
        typeof value === "object" && value !== null
          ? Object.values(value).reduce((a, b) => a + b, 0)
          : value || 0;

      const date = new Date(timestamp * 1000).toISOString().slice(0, 10);
      return { date, fees: total };
    });

    return {
      name: data.name || protocolName,
      category: data.category || "Unknown",
      chains: data.chains || [],
      fees30d: data.total30d || 0,
      revenue30d: data.totalRevenue30d || 0,
      dailyData,
    };
  } catch (error) {
    console.error("getProtocolFeeHistory error:", error);
    return null;
  }
}

/**
 * Format a raw number into $1.20M / $850.00K / $2.10B
 */
export function formatCurrency(value) {
  if (value == null) return "N/A";
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}

/**
 * Return a sustainability label based on revenue/fees ratio
 */
export function sustainabilitySignal(fees, revenue) {
  if (!fees || fees === 0) return { label: "No Data", color: "#94a3b8" };
  if (!revenue || revenue === 0) return { label: "No Revenue", color: "#ef4444" };
  const ratio = revenue / fees;
  if (ratio >= 0.5) return { label: "Healthy", color: "#22c55e" };
  if (ratio >= 0.2) return { label: "Moderate", color: "#eab308" };
  return { label: "Low", color: "#ef4444" };
}