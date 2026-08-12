const express = require("express");

const router = express.Router();

router.get("/blockchain", (req, res) => {
  res.json({ chain: [] });
});

module.exports = router;
