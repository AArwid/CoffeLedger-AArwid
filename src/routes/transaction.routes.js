import express from "express";

const router = express.Router();

router.post("/transactions", (req, res) => {
  res.status(201).json({ message: "transaction accepted" });
});

export default router;
