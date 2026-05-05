import sys
from api import get_top_protocols_by_fees, get_protocol_fee_history
from display import display_top_protocols, display_protocol_summary


def print_help():
    print()
    print("  📖 defi-revenue-explorer — Usage Guide")
    print()
    print("  python main.py                  Show top 20 DeFi protocols by 30D fees")
    print("  python main.py <protocol>       Show 30-day summary for a protocol")
    print("  python main.py --help           Show this help message")
    print()
    print("  Examples:")
    print("    python main.py uniswap")
    print("    python main.py aave")
    print("    python main.py pancakeswap")
    print()


def main():
    args = sys.argv[1:]  # everything after 'python main.py'

    # No arguments — show the top 20 table
    if len(args) == 0:
        print("\n  ⏳ Fetching top 20 DeFi protocols by fees...")
        data = get_top_protocols_by_fees()
        display_top_protocols(data)

    # Help flag
    elif args[0] in ("--help", "-h", "help"):
        print_help()

    # Protocol name provided — show its summary
    elif len(args) == 1:
        protocol = args[0]
        print(f"\n  ⏳ Fetching fee data for '{protocol}'...")
        data = get_protocol_fee_history(protocol)
        display_protocol_summary(data)

    # Too many arguments
    else:
        print()
        print("  ❌ Too many arguments. Only one protocol name is supported at a time.")
        print_help()


if __name__ == "__main__":
    main()