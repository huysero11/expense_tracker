import pool from "../config/db.js";

export async function getUserByEmail(email) {
  const sql = `SELECT id FROM users WHERE email = ? LIMIT 1`;
  const [rows] = await pool.execute(sql, [email]);

  return rows[0] ?? null;
}

export async function createUser({ email, passwordHash, fullName }) {
  const sql = `INSERT INTO users (email, password_hash, full_name)
    VALUES (?, ?, ?)`;
  const [result] = await pool.execute(sql, [email, passwordHash, fullName]);

  return {
    id: result.insertId,
    email,
    fullName,
  };
}
