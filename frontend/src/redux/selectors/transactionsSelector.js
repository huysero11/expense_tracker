export const selectTransactionsState = (state) => state.transactions;
export const selectTransactions = (state) => state.transactions.items;
export const selectTransactionsLoading = (state) => state.transactions.loading;
export const selectTransactionsError = (state) => state.transactions.error;
