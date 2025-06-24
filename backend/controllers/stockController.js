  const { exec } = require("child_process");
  const getDb = require("../mongo_connection");
  const path = require("path");

  const fetchStockData = (req, res) => {
  const ticker = req.params.ticker;
  const scriptPath = path.resolve(__dirname, "../../main.py");

  exec(`python "${scriptPath}" ${ticker}`, { cwd: path.resolve(__dirname, "../../") }, (err, stdout, stderr) => {
    if (err) {
      console.error("ERROR:", err.message);
      console.error("STDERR:", stderr);
      return res.status(500).json({ error: "Failed to run Python script" });
    }

    console.log("Python script output:", stdout);
    res.json({ message: `Data for ${ticker} fetched successfully`, log: stdout });
  });
};



  const getStockData = async (req, res) => {
    const ticker = req.params.ticker.toUpperCase();
    const db = await getDb();
    const data = await db.collection("StockData").find({ ticker: ticker }).toArray();
    res.json(data);
  };

  const getStockPlot = (req, res) => {
    const ticker = req.params.ticker.toLowerCase();
    const filePath = path.resolve(__dirname, `../../static/plots/${ticker}_price_plot.png`);
    res.sendFile(filePath);
  };

  module.exports = {
    fetchStockData,
    getStockData,
    getStockPlot
  };
