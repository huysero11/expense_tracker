export const selectAuthState = (state) => state.auth;

export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;

export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export const selectAuthNotice = (state) => state.auth.notice;

// Derived selectors
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const selectIsAuthLoading = (state) => state.auth.status === "loading";
