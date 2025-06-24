import yfinance as yf
import pandas as pd
import numpy as np
import sys
import os
import matplotlib.pyplot as plt
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from models.stock_data_model import StockData


class StockDataService:
    def __init__(self, ticker, start_date, end_date):
        self.ticker = ticker
        self.start_date = start_date
        self.end_date = end_date
        self.df = None

    def fetch_data(self):
        data = yf.download(self.ticker, start=self.start_date, end=self.end_date, auto_adjust=False)
        if data.empty:
            raise ValueError("No data fetched. Please check the ticker or date range.")
        self.df = data
        if isinstance(self.df.columns, pd.MultiIndex):
            self.df.columns = self.df.columns.get_level_values(0)

        

    def compute_metrics(self):
        if self.df is None:
            raise ValueError("No data available. Fetch data first.")              
        self.df["Daily Return"] = self.df["Close"].pct_change()
        self.df["Volatility"] = self.df["Daily Return"].rolling(window=20).std()
        self.df["MA_20"] = self.df["Close"].rolling(window=20).mean()
        self.df["MA_50"] = self.df["Close"].rolling(window=50).mean()



    def prepare_data_models(self):
        if self.df is None:
            raise ValueError("No data available. Fetch and compute metrics first.")
        
        models = []
        for date, row in self.df.iterrows():
            model = StockData(
                ticker=self.ticker,
                date=str(date.date()),
                open_price=row["Open"],
                close_price=row["Close"],
                high=row["High"],
                low=row["Low"],
                volume=int(row["Volume"].item()),
                daily_return=float(row["Daily Return"].item()) if pd.notna(row["Daily Return"]) else None,
                volatility=float(row["Volatility"].item()) if pd.notna(row["Volatility"]) else None,
                ma_20=float(row["MA_20"].item()) if pd.notna(row["MA_20"]) else None,
                ma_50=float(row["MA_50"].item()) if pd.notna(row["MA_50"]) else None
            )
            models.append(model)
        return models
    
    def save_price_plot(self):
        if self.df is None:
            raise ValueError("No data available. Fetch data first.")

        plt.figure(figsize=(10, 5))
        plt.plot(self.df.index, self.df['Close'])
        plt.title(f'{self.ticker} Stock Price')
        plt.xlabel('Date')
        plt.ylabel('Close Price')

        plot_dir = os.path.join(os.path.dirname(__file__), '..', 'static', 'plots')
        os.makedirs(plot_dir, exist_ok=True)
        plot_path = os.path.join(plot_dir, f"{self.ticker.lower()}_price_plot.png")

        plt.savefig(plot_path)
        plt.close()
