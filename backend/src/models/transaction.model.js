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

export async function getTransactions(userId) {
  const sql = `SELECT id, 
                user_id AS userId, 
                category_id AS categoryId, 
                type, 
                amount, 
                DATE_FORMAT(trans_date, '%Y-%m-%d') AS transDate,
                created_at AS createdAt, 
                updated_at AS updatedAt,
                note
              FROM transactions
              WHERE user_id = ?
              ORDER BY trans_date DESC, id DESC`;
  const [rows] = await pool.execute(sql, [userId]);
  return rows;
}
