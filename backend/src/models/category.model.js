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

export async function getCategories(userId, type) {
  if (type) {
    const sql = `SELECT id, user_id AS userId, name, type 
                FROM categories 
                WHERE user_id = ? AND type = ? 
                ORDER BY type ASC, name ASC`;
    const [rows] = await pool.execute(sql, [userId, type]);
    return rows;
  } else {
    const sql = `SELECT id, user_id AS userId, name, type 
                FROM categories 
                WHERE user_id = ? 
                ORDER BY type ASC, name ASC`;
    const [rows] = await pool.execute(sql, [userId]);
    return rows;
  }
}

export async function getCategoryById(id) {
  const sql = `SELECT id, user_id as userId, name, type
              FROM categories
              WHERE id = ?
              LIMIT 1`;
  const [rows] = await pool.execute(sql, [id]);
  return rows[0];
}

export async function updateCategory({ id, userId, name, type }) {
  const sql = `UPDATE categories
              SET name = ?, type = ?
              WHERE id = ? AND user_id = ?`;
  const [result] = await pool.execute(sql, [name, type, id, userId]);
  return result.affectedRows > 0;
}
