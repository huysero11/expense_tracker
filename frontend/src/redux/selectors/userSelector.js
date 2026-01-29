export const selectMe = (state) => state.user.me;
export const selectUserState = (state) => state.user;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export const selectUserUpdating = (state) => state.user.updating;
export const selectUserUpdateError = (state) => state.user.updateError;
