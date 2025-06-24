class StockData:
    def __init__(self, ticker, date, open_price, close_price, high, low, volume, daily_return, volatility, ma_20, ma_50):
        self.ticker = ticker
        self.date = date
        self.open_price = open_price
        self.close_price = close_price
        self.high = high
        self.low = low
        self.volume = volume
        self.daily_return = daily_return
        self.volatility = volatility
        self.ma_20 = ma_20
        self.ma_50 = ma_50

    def to_dict(self):
        return {
            "ticker": self.ticker,
            "date": self.date,
            "open_price": self.open_price,
            "close_price": self.close_price,
            "high": self.high,
            "low": self.low,
            "volume": self.volume,
            "daily_return": self.daily_return,
            "volatility": self.volatility,
            "ma_20": self.ma_20,
            "ma_50": self.ma_50
        }
