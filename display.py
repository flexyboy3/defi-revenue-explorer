def format_currency(value):
    """
    Converts a raw number into a readable currency string.
    e.g. 1_200_000 -> $1.20M | 850_000_000 -> $850.00M
    """
    if value is None:
        return "N/A"
    if value >= 1_000_000_000:
        return f"${value / 1_000_000_000:.2f}B"
    if value >= 1_000_000:
        return f"${value / 1_000_000:.2f}M"
    if value >= 1_000:
        return f"${value / 1_000:.2f}K"
    return f"${value:.2f}"


def sustainability_signal(fees, revenue):
    """
    Returns a simple signal based on the revenue-to-fees ratio.
    """
    if fees is None or fees == 0:
        return "⚪ No Data"
    if revenue is None or revenue == 0:
        return "🔴 No Revenue"
    ratio = revenue / fees
    if ratio >= 0.5:
        return "🟢 Healthy"
    if ratio >= 0.2:
        return "🟡 Moderate"
    return "🔴 Low"


def display_top_protocols(protocols):
    """
    Prints a ranked table of the top 20 DeFi protocols by 30-day fees.
    """
    if not protocols:
        print("No data to display.")
        return

    # Column widths
    col_rank    = 4
    col_name    = 28
    col_fees    = 14
    col_revenue = 14
    col_signal  = 16

    # Build the header
    header = (
        f"{'#':<{col_rank}}"
        f"{'Protocol':<{col_name}}"
        f"{'30D Fees':>{col_fees}}"
        f"{'30D Revenue':>{col_revenue}}"
        f"  {'Sustainability':<{col_signal}}"
    )

    divider = "-" * len(header)

    print()
    print("  🏦 TOP 20 DeFi PROTOCOLS BY 30-DAY FEES")
    print(f"  Data source: DefiLlama (api.llama.fi)")
    print()
    print(header)
    print(divider)

    for i, p in enumerate(protocols, start=1):
        rank    = f"{i}."
        name    = p["name"][:col_name - 1]  # truncate long names
        fees    = format_currency(p["fees_30d"])
        revenue = format_currency(p["revenue_30d"])
        signal  = sustainability_signal(p["fees_30d"], p["revenue_30d"])

        row = (
            f"{rank:<{col_rank}}"
            f"{name:<{col_name}}"
            f"{fees:>{col_fees}}"
            f"{revenue:>{col_revenue}}"
            f"  {signal:<{col_signal}}"
        )
        print(row)

    print(divider)
    print(f"  💡 Sustainability = 30D Revenue / 30D Fees  |  🟢 ≥50%  🟡 ≥20%  🔴 <20%")
    print()


def display_protocol_summary(data):
    """
    Prints a 30-day summary for a single protocol.
    """
    if not data:
        print("No data to display.")
        return

    name     = data["name"]
    category = data["category"]
    chains   = ", ".join(data["chains"][:5]) if data["chains"] else "Unknown"
    fees     = data["total30d"]
    revenue  = data["totalRevenue30d"]
    signal   = sustainability_signal(fees, revenue)

    print()
    print(f"  📊 PROTOCOL SUMMARY — {name.upper()}")
    print(f"  Data source: DefiLlama (api.llama.fi)")
    print()
    print(f"  {'Category':<18} {category}")
    print(f"  {'Chains':<18} {chains}")
    print(f"  {'30D Total Fees':<18} {format_currency(fees)}")
    print(f"  {'30D Total Revenue':<18} {format_currency(revenue)}")
    print(f"  {'Sustainability':<18} {signal}")
    print()

    # Daily breakdown section
    daily = data.get("daily_data", [])
    if daily:
        print(f"  📅 LAST {len(daily)} DAYS — DAILY FEES SNAPSHOT")
        print()
        print(f"  {'Day':<6} {'Date':<14} {'Fees':>14}")
        print("  " + "-" * 36)

        for i, entry in enumerate(daily[-10:], start=1):
            # entry is usually [timestamp, {breakdown}] or [timestamp, value]
            if isinstance(entry, list) and len(entry) >= 2:
                timestamp = entry[0]
                value     = entry[1]

                # If breakdown dict, sum all values
                if isinstance(value, dict):
                    daily_total = sum(value.values())
                else:
                    daily_total = value

                # Convert unix timestamp to readable date
                from datetime import datetime, timezone
                date_str = datetime.fromtimestamp(
                    timestamp, tz=timezone.utc
                ).strftime("%Y-%m-%d")

                print(f"  {i:<6} {date_str:<14} {format_currency(daily_total):>14}")

        print("  " + "-" * 36)
    else:
        print("  No daily breakdown data available for this protocol.")

    print()