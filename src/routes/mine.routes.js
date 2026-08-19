import express from "express";

function createMineRouter(blockchain) {
  const router = express.Router();

  router.post("/mine", (req, res) => {
    try {
      const block = blockchain.minePendingTransactions();
      res.status(200).json({ block });
    } catch (error) {
      console.error("Error in mine route:", error);
      res.status(400).json({ message: "Internal server error" });
    }
  });

  return router;
}

export default createMineRouter;
