import pool from "../config/db.js";

export async function createRefreshToken({ userId, tokenHash, expiresAt }) {
  const sql = `INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
        VALUES (?, ?, ?)`;
  const [result] = await pool.execute(sql, [userId, tokenHash, expiresAt]);

  return result.insertId;
}

export async function findValidByHash(tokenHash) {
  const sql = `SELECT * 
        FROM refresh_tokens
        WHERE token_hash = ? 
            AND revoked_at IS NULL
            AND expires_at > NOW()
        LIMIT 1`;
  const [rows] = await pool.execute(sql, [tokenHash]);

  return rows[0];
}

export async function rotate({ oldHash, newHash }) {
  const sql = `UPDATE refresh_tokens 
        SET revoked_at = NOW(), replaced_by_hash = ?
        WHERE token_hash = ? AND revoked_at IS NULL`;
  await pool.execute(sql, [newHash, oldHash]);
}

export async function revokeByHash(tokenHash) {
  const sql = `UPDATE refresh_tokens
        SET revoked_at = NOW()
        WHERE token_hash = ? AND revoked_at IS NULL`;
  await pool.execute(sql, [tokenHash]);
}
