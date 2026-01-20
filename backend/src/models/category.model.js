import pool from "../config/db.js";

export async function createCategory({ userId, name, type }) {
  const sql = `INSERT INTO categories (user_id, name, type) VALUES (?, ?, ?)`;
  const [result] = await pool.execute(sql, [userId, name, type]);

  return {
    id: Number(result.insertId),
    userId: Number(userId),
    name,
    type,
  };
}
