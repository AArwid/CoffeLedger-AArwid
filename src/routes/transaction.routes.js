const express = require("express");

const router = express.Router();

router.post("/transactions", (req, res) => {
  res.status(201).json({ message: "transaction accepted" });
});

module.exports = router;
