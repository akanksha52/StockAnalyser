import sys
from services.stock_data_service import StockDataService
from utils.database import Database
import os

def main(ticker="AAPL"):
    start_date = "2025-01-01"
    end_date = "2025-04-30"

    stock_service = StockDataService(ticker, start_date, end_date)
    db = Database()

    try:
        print(f"Fetching data for {ticker}...")
        stock_service.fetch_data()

        print("Computing metrics...")
        stock_service.compute_metrics()

        print("Saving stock price plot...")
        stock_service.save_price_plot()

        print("Preparing data models...")
        stock_data_models = stock_service.prepare_data_models()

        print("Inserting data into database...")
        db.insert_data([data.to_dict() for data in stock_data_models])

        print("Data insertion complete.")

    except Exception as e:
        print(f"Error: {e}")

    finally:
        db.close()


if __name__ == "__main__":
    ticker = sys.argv[1] if len(sys.argv) > 1 else "AAPL"
    main(ticker)
