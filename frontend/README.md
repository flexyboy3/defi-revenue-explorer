# 📊 DeFi Revenue Explorer

A full-stack DeFi analytics tool that pulls live protocol fee and revenue data
from the [DefiLlama](https://defillama.com) free public API — no API key required.

🌐 **Live Demo:** [https://defi-revenue-explorer.vercel.app](https://defi-revenue-explorer.vercel.app)

---

## 🚀 How to Use the Live App

Visit [https://defi-revenue-explorer.vercel.app](https://defi-revenue-explorer.vercel.app)

### 📈 Charts Tab
- See the **Top 20 DeFi protocols** ranked by 30-day fees in a bar chart
- Compare **Fees vs Revenue** side by side for the top 10 protocols

### 🏆 Rankings Table Tab
- View a full ranked table with protocol name, category, 30D fees,
  30D revenue, and a sustainability signal

### 🔍 Search a Protocol
- Type any protocol name in the search bar and hit **Search**
- Examples: `uniswap`, `aave`, `gmx`, `pancakeswap`, `curve-dex`
- Displays category, supported chains, 30D fees, 30D revenue,
  sustainability rating, and a daily fees line chart for the last 30 days

### 💡 Sustainability Signal Explained

| Signal | Meaning | Revenue / Fees Ratio |
|---|---|---|
| 🟢 Healthy | Protocol retains most of its fees | ≥ 50% |
| 🟡 Moderate | Protocol retains some fees | ≥ 20% |
| 🔴 Low | Protocol retains very little | < 20% |
| 🔴 No Revenue | Protocol reports zero revenue | — |
| ⚪ No Data | Insufficient data available | — |

> In DeFi, fees are what users pay. Revenue is what the protocol keeps
> after paying liquidity providers. High fees with low revenue means
> most value goes to LPs, not the protocol itself.

---

## 🖥️ Run Locally

### Python CLI Tool

```bash
pip install requests
python main.py                  # Top 20 protocols table
python main.py uniswap          # Single protocol summary
python main.py --help           # Usage guide
```

### React Dashboard

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗂 Project Structure

```
defi-revenue-explorer/
│
├── main.py              ← CLI entry point
├── api.py               ← DefiLlama API calls (Python)
├── display.py           ← Terminal output formatting
├── README.md            ← You are here
│
└── frontend/
    ├── src/
    │   ├── App.jsx                    ← Main dashboard
    │   ├── services/api.js            ← DefiLlama API (browser)
    │   └── components/
    │       ├── FeesBarChart.jsx       ← Top 20 bar chart
    │       ├── RevenueChart.jsx       ← Fees vs Revenue chart
    │       ├── TopProtocolsTable.jsx  ← Rankings table
    │       ├── ProtocolSearch.jsx     ← Search bar
    │       └── ProtocolDetail.jsx     ← Protocol detail + line chart
    └── vite.config.js
```

---

## 📡 API Reference

| Endpoint | Used For |
|---|---|
| `GET /overview/fees` | Fetch all protocols with fee/revenue totals |
| `GET /summary/fees/{protocol}` | Fetch a single protocol's historical data |

Full docs: [https://defillama.com/docs/api](https://defillama.com/docs/api)

---

## 📄 License

MIT — free to use, modify, and distribute.