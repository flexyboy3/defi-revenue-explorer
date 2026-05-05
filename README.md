# 📊 defi-revenue-explorer

A lightweight Python command-line tool that pulls live DeFi protocol fee and
revenue data from the [DefiLlama](https://defillama.com) free public API —
no API key required.

---

## 🗂 Project Structure

```
defi-revenue-explorer/
│
├── main.py        ← entry point, handles CLI arguments
├── api.py         ← all DefiLlama API calls
├── display.py     ← all terminal output and formatting
└── README.md      ← you are here
```

---

## ⚙️ Requirements

- Python 3.7 or higher
- `requests` library

---

## 🔧 Installation

**1. Navigate into the project folder:**

```bash
cd defi-revenue-explorer
```

**2. Install the only dependency:**

```bash
pip install requests
```

---

## 🚀 How to Run

### Top 20 protocols by 30-day fees
```bash
python main.py
```

### Single protocol 30-day summary
```bash
python main.py uniswap
python main.py aave
python main.py pancakeswap
python main.py curve-dex
python main.py gmx
```

### Help
```bash
python main.py --help
```

---

## 📡 API Reference

| Endpoint | Used For |
|---|---|
| `GET /overview/fees` | Fetch all protocols with fee/revenue totals |
| `GET /summary/fees/{protocol}` | Fetch a single protocol's historical data |

Full API docs: [https://defillama.com/docs/api](https://defillama.com/docs/api)

---

## 💡 Sustainability Signal Explained

| Signal | Meaning | Revenue / Fees Ratio |
|---|---|---|
| 🟢 Healthy | Protocol retains most of its fees | ≥ 50% |
| 🟡 Moderate | Protocol retains some fees | ≥ 20% |
| 🔴 Low | Protocol retains very little | < 20% |
| 🔴 No Revenue | Protocol reports zero revenue | — |
| ⚪ No Data | Insufficient data available | — |

---

## 🛠 Troubleshooting

- Use lowercase: `uniswap` not `Uniswap`
- Use hyphens for spaces: `curve-dex` not `curve dex`
- Check the protocol exists on [defillama.com/fees](https://defillama.com/fees)

---

## 📄 License

MIT — free to use, modify, and distribute.