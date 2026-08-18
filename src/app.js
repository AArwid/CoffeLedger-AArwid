import express from "express";
import { Blockchain } from "./blockchain/blockchain.js";
import createBlockchainRouter from "./routes/blockchain.routes.js";
import createMineRouter from "./routes/mine.routes.js";
import createTransactionRouter from "./routes/transaction.routes.js";

const app = express();
const blockchain = new Blockchain();

app.use(express.json());
app.use(createBlockchainRouter(blockchain));
app.use(createTransactionRouter(blockchain));
app.use(createMineRouter(blockchain));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
