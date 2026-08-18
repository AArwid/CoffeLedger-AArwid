import express from "express";

function createBlockchainRouter(blockchain) {
  const router = express.Router();

  router.get("/blockchain", (req, res) => {
    try {
      const chain = blockchain.chain;
      const pendingTransactions = blockchain.pendingTransactions;
      res.status(200).json({ chain, pendingTransactions });
    } catch (error) {
      console.error("Error in blockchain route:", error);
      res.status(400).json({ error: "Internal server error" });
    }
  });

  return router;
}

export default createBlockchainRouter;
