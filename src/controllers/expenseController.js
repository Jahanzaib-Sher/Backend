const Expense = require("../models/Expense");

// CREATE expense
exports.addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      user: req.userId
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ all expenses (user-specific)
exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.userId });
  res.json(expenses);
};

// UPDATE expense
exports.updateExpense = async (req, res) => {
  const expense = await Expense.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );

  if (!expense)
    return res.status(404).json({ message: "Expense not found" });

  res.json(expense);
};

// DELETE expense
exports.deleteExpense = async (req, res) => {
  const expense = await Expense.findOneAndDelete({
    _id: req.params.id,
    user: req.userId
  });

  if (!expense)
    return res.status(404).json({ message: "Expense not found" });

  res.json({ message: "Expense deleted" });
};
