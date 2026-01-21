import { useState } from "react";
import CategoryToolbar from "../../components/categories/CategoryToolbar/CategoryToolbar";
import CategoryTable from "../../components/categories/CategoryTable/CategoryTable";
import "./CategoriesPage.css";

const CategoriesPage = () => {
  const [ui, setUi] = useState({
    filterType: "all",
    sortOrder: "asc",
    modalOpen: false,
    editingCategory: null,
  });

  /**
   * for Toolbar
   */
  const hanldeCreate = () => {
    setUi((prev) => ({ ...prev, modalOpen: true, editingCategory: null }));
    console.log("Open modal");
  };

  /**
   * for Toolbar
   * value = all | income | expense, retrieve when changing Select option, from value field
   */
  const handleFilterTypeChange = (value) => {
    // console.log("in hanlde filter type change function, value = ", value);
    setUi((prev) => ({ ...prev, filterType: value }));
  };

  /**
   * for Toolbar
   * value = asc | desc, retrieve when changing Segmented option, from value field
   */
  const handleSortOrderChange = (value) => {
    setUi((prev) => ({ ...prev, sortOrder: value }));
  };

  return (
    <div className="category-page__container">
      <div className="category-page__title">Categories</div>
      <CategoryToolbar
        filterType={ui.filterType}
        sortOrder={ui.sortOrder}
        onCreate={hanldeCreate}
        onFilterTypeChange={handleFilterTypeChange}
        onSortOrderChange={handleSortOrderChange}
      />
    </div>
  );
};

export default CategoriesPage;
