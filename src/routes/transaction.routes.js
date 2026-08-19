import express from "express";
import validateTransaction from "../middleware/validateTransaction.js";

function createTransactionRouter(blockchain) {
  const router = express.Router();
  router.post("/transactions", validateTransaction, (req, res) => {
    try {
      const transaction = blockchain.addTransaction(req.body);
      res.status(201).json({ transaction });
    } catch (error) {
      console.error("Error in transaction route:", error);
      res.status(400).json({ message: "Internal server error" });
    }
  });

  return router;
}

export default createTransactionRouter;
