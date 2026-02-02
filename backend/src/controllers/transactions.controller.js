import * as transactionsService from "../services/transactions.service.js";

export async function createTransaction(req, res, next) {
  try {
    const userId = req.user?.userId;
    const { categoryId, amount, transDate, note } = req.body;
    // console.log(
    //   "[createTransaction, controller] userId =",
    //   req.user?.userId,
    //   "body =",
    //   req.body,
    // );

    const transaction = await transactionsService.createTransaction({
      userId,
      categoryId,
      amount,
      transDate,
      note,
    });
    return res.status(201).json({
      status: "success",
      message: "Transaction created successfully!",
      data: { transaction },
    });
  } catch (err) {
    next(err);
  }
}

export async function getTransactions(req, res, next) {
  try {
    const userId = req.user?.userId;
    const transactions = await transactionsService.getTransactions({ userId });

    return res.status(200).json({
      status: "success",
      message: "Get transactions successfully!",
      data: { transactions },
    });
  } catch (err) {
    next(err);
  }
}
