import pool from "../config/db.js";

export async function createTransaction({
  userId,
  categoryId,
  type,
  amount,
  transDate,
  note,
}) {
  const sql = `INSERT INTO transactions (user_id, category_id, type, amount, trans_date, note)
                VALUES (?, ?, ?, ?, ?, ?)`;
  const [result] = await pool.execute(sql, [
    userId,
    categoryId,
    type,
    amount,
    transDate,
    note,
  ]);
  return {
    id: Number(result.insertId),
    userId: Number(userId),
    categoryId: Number(categoryId),
    type,
    amount,
    transDate,
    note,
  };
}
