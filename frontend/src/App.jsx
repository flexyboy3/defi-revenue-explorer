import React, { useState, useEffect } from "react";
import { getTopProtocolsByFees, getProtocolFeeHistory } from "./services/api";
import TopProtocolsTable from "./components/TopProtocolsTable";
import FeesBarChart from "./components/FeesBarChart";
import RevenueChart from "./components/RevenueChart";
import ProtocolSearch from "./components/ProtocolSearch";
import ProtocolDetail from "./components/ProtocolDetail";

const card = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  borderRadius: "14px",
  padding: "24px",
  marginBottom: "24px",
};

const sectionTitle = {
  color: "#f1f5f9",
  fontSize: "1rem",
  fontWeight: 700,
  marginBottom: "20px",
  letterSpacing: "0.02em",
};

function App() {
  const [protocols, setProtocols] = useState([]);
  const [loadingTop, setLoadingTop] = useState(true);
  const [protocolData, setProtocolData] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("charts");

  useEffect(() => {
    async function load() {
      setLoadingTop(true);
      const data = await getTopProtocolsByFees();
      setProtocols(data);
      setLoadingTop(false);
    }
    load();
  }, []);

  async function handleSearch(name) {
    setSearchLoading(true);
    setSearched(true);
    const data = await getProtocolFeeHistory(name);
    setProtocolData(data);
    setSearchLoading(false);
  }

  const tabStyle = (tab) => ({
    padding: "8px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.9rem",
    background: activeTab === tab ? "#22d3ee" : "#1e293b",
    color: activeTab === tab ? "#0f172a" : "#94a3b8",
    transition: "all 0.2s",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      fontFamily: "'Segoe UI', sans-serif",
      padding: "32px 48px",
    }}>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ color: "#22d3ee", fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>
          📊 DeFi Revenue Explorer
        </h1>
        <p style={{ color: "#475569", marginTop: "6px", fontSize: "0.9rem" }}>
          Live DeFi protocol fee & revenue data powered by DefiLlama
        </p>
      </div>

      {/* Protocol Search */}
      <div style={card}>
        <p style={sectionTitle}>🔍 Search Protocol</p>
        <ProtocolSearch onSearch={handleSearch} loading={searchLoading} />
        {searched && (
          <div style={{ marginTop: "24px" }}>
            {searchLoading ? (
              <p style={{ color: "#94a3b8", textAlign: "center" }}>Fetching data...</p>
            ) : (
              <ProtocolDetail data={protocolData} />
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button style={tabStyle("charts")} onClick={() => setActiveTab("charts")}>
          📈 Charts
        </button>
        <button style={tabStyle("table")} onClick={() => setActiveTab("table")}>
          🏆 Rankings Table
        </button>
      </div>

      {loadingTop ? (
        <div style={{ ...card, textAlign: "center" }}>
          <p style={{ color: "#94a3b8" }}>⏳ Loading top 20 protocols...</p>
        </div>
      ) : (
        <>
          {activeTab === "charts" && (
            <>
              <div style={card}>
                <p style={sectionTitle}>🏦 Top 20 Protocols — 30D Fees ($M)</p>
                <FeesBarChart protocols={protocols} />
              </div>
              <div style={card}>
                <p style={sectionTitle}>💰 Fees vs Revenue — Top 10 Protocols ($M)</p>
                <RevenueChart protocols={protocols} />
              </div>
            </>
          )}
          {activeTab === "table" && (
            <div style={card}>
              <p style={sectionTitle}>🏆 Top 20 DeFi Protocols by 30D Fees</p>
              <TopProtocolsTable protocols={protocols} />
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <p style={{ color: "#1e293b", fontSize: "0.8rem" }}>
          Data sourced from DefiLlama API · api.llama.fi · No API key required
        </p>
      </div>
    </div>
  );
}

export default App;