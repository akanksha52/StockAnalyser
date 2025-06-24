const express = require("express");
const router = express.Router();
const {
  fetchStockData,
  getStockData,
  getStockPlot
} = require("../controllers/stockController");

router.get("/fetch/:ticker", fetchStockData);
router.get("/data/:ticker", getStockData);
router.get("/plot/:ticker", getStockPlot);

module.exports = router;
