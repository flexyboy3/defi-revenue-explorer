import requests

BASE_URL = "https://api.llama.fi"

def get_top_protocols_by_fees():
    """
    Fetches the overview of all protocols by fees.
    Returns a sorted list of the top 20 by 30-day fees.
    """
    url = f"{BASE_URL}/overview/fees"
    
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to DefiLlama API. Check your internet connection.")
        return None
    except requests.exceptions.Timeout:
        print("Error: Request timed out. Try again later.")
        return None
    except requests.exceptions.HTTPError as e:
        print(f"Error: API returned an error — {e}")
        return None

    protocols = data.get("protocols", [])

    # Filter out protocols missing fee/revenue data
    filtered = []
    for p in protocols:
        fees = p.get("total30d")
        revenue = p.get("totalRevenue30d")
        name = p.get("name")
        if name and fees is not None:
            filtered.append({
                "name": name,
                "fees_30d": fees,
                "revenue_30d": revenue if revenue is not None else 0,
            })

    # Sort by 30-day fees descending and return top 20
    filtered.sort(key=lambda x: x["fees_30d"], reverse=True)
    return filtered[:20]


def get_protocol_fee_history(protocol_name):
    """
    Fetches fee and revenue history for a specific protocol.
    Returns daily breakdown data for the last 30 days.
    """
    slug = protocol_name.lower().replace(" ", "-")
    url = f"{BASE_URL}/summary/fees/{slug}"

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to DefiLlama API. Check your internet connection.")
        return None
    except requests.exceptions.Timeout:
        print("Error: Request timed out. Try again later.")
        return None
    except requests.exceptions.HTTPError:
        print(f"Error: Protocol '{protocol_name}' not found. Check the name and try again.")
        print("Tip: Use lowercase with hyphens e.g. 'uniswap', 'aave', 'pancakeswap'")
        return None

    # Pull out the last 30 days of fee data
    fee_entries = data.get("totalDataChartBreakdown", []) or data.get("totalDataChart", [])
    fee_entries = fee_entries[-30:]  # last 30 days only

    return {
        "name": data.get("name", protocol_name),
        "category": data.get("category", "Unknown"),
        "chains": data.get("chains", []),
        "total30d": data.get("total30d"),
        "totalRevenue30d": data.get("totalRevenue30d"),
        "daily_data": fee_entries,
    }