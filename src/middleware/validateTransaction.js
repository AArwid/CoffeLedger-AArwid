function validateTransaction(req, res, next) {
  const { sender, recipient, batchId, weightKg } = req.body ?? {};

  function checkFieldValidity(field) {
    if (typeof field !== "string") {
      return false;
    }
    if (field.trim().length === 0) {
      return false;
    }
    if (field.length > 100) {
      return false;
    }

    return typeof field === "string" && field.trim().length > 0;
  }

  const hasValidTextFields =
    checkFieldValidity(sender) &&
    checkFieldValidity(recipient) &&
    checkFieldValidity(batchId);

  const hasValidWeight = typeof weightKg === "number" && weightKg > 0;

  if (!hasValidTextFields || !hasValidWeight) {
    return res.status(400).json({ error: "Invalid transaction" });
  }

  next();
}

export default validateTransaction;
