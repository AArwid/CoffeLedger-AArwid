import express from "express";

const router = express.Router();

router.get("/blockchain", (req, res) => {
  res.json({ chain: [] });
});

export default router;
