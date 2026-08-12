const express = require("express");

const router = express.Router();

router.post("/mine", (req, res) => {
  res.json({ message: "mining started" });
});

module.exports = router;
