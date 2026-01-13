export function getRefreshCookieOptions() {
  const secure = String(process.env.COOKIE_SECURE || "false") === "true";
  const sameSite = process.env.COOKIE_SAMESITE || "lax";

  return {
    httpOnly: true,
    secure,
    sameSite,
    path: "/api/auth/refresh",
  };
}
