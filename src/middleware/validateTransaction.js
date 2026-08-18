function validateTransaction(req, res, next) {
  const { sender, recipient, batchId, weightKg } = req.body ?? {};
  const hasValidTextFields = [sender, recipient, batchId].every(
    (field) => typeof field === "string" && field.trim().length > 0,
  );
  const hasValidWeight = typeof weightKg === "number" && weightKg > 0;

  if (!hasValidTextFields || !hasValidWeight) {
    return res.status(400).json({ error: "Invalid transaction" });
  }

  next();
}

export default validateTransaction;
