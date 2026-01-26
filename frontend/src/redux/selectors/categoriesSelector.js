export const selectCategoriesState = (state) => state.categories;

export const selectCategoriesItems = (state) => state.categories.items;
export const selectCategoriesStatus = (state) => state.categories.status;
export const selectCategoriesError = (state) => state.categories.error;
export const selectCategoriesNotice = (state) => state.categories.notice;

// Derived
export const selectIsCategoriesLoading = (state) =>
  state.categories.status === "loading";

export const selectCategoriesCount = (state) =>
  Array.isArray(state.categories.items) ? state.categories.items.length : 0;

export const selectCategoriesByType = (type) => (state) => {
  const items = Array.isArray(state.categories.items)
    ? state.categories.items
    : [];
  if (!type || type === "all") {
    return items;
  }
  return items.filter((c) => c.type === type);
};
