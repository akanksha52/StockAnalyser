# 📊 Stock Analyzer (MERN + Python)

A web-based stock analyzer application built with the **MERN stack** (MongoDB, Express, React, Node.js) alongside **Python** services. The application fetches real-time and historical stock market data for predefined date ranges using the **Yahoo Finance API (via `yfinance`)**, displays essential stock information, and visualizes stock price trends through a clean **line graph**.

---

## 🚀 Features

- 📈 Fetches stock data for a company ticker provided by the user.
- 📅 Displays stock data for predefined fixed date ranges.
- 📊 Plots a **line graph** for stock price trends.
- 📦 Presents key stock details:
  - Open and close prices
  - High and low values
  - Maximum and minimum values
- 🌐 Clean, responsive **web-based interface** built with **React**.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js  
- Tailwind CSS (optional for styling)

**Backend:**
- Node.js  
- Express.js  
- Python (`yfinance`, `pandas`, `matplotlib`) for stock data services

**Database:**
- MongoDB (optional: for storing query history or user preferences)

---

## 📦 Installation

### 1️⃣ Clone the repository:
```bash
git clone https://github.com/your-username/stock-analyzer-web.git
cd stock-analyzer-web
