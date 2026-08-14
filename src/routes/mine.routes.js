import express from "express";

const router = express.Router();

router.post("/mine", (req, res) => {
  res.json({ message: "mining started" });
});

export default router;
