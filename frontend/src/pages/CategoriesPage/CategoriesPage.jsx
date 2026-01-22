import { useState, useMemo } from "react";
import CategoryToolbar from "../../components/categories/CategoryToolbar/CategoryToolbar";
import CategoryTable from "../../components/categories/CategoryTable/CategoryTable";
import CategoryFormModal from "../../components/categories/CategoryFormModal/CategoryFormModal";

import "./CategoriesPage.css";

const normalize = (s = "") => s.trim().toLowerCase();

// Mock data for UI testing
const mockCategories = [
  { id: 1, name: "Food", type: "expense" },
  { id: 2, name: "Salary", type: "income" },
  { id: 3, name: "Transport", type: "expense" },
  { id: 4, name: "Freelance", type: "income" },
];

const CategoriesPage = () => {
  const [ui, setUi] = useState({
    filterType: "all",
    sortOrder: "asc",
    modalOpen: false,
    editingCategory: null,
  });

  const visibleCategories = useMemo(() => {
    let list = mockCategories;

    if (ui.filterType !== "all") {
      list = list.filter((c) => c.type === ui.filterType);
    }

    list = [...list].sort((a, b) => {
      const A = normalize(a.name);
      const B = normalize(b.name);
      if (A < B) return ui.sortOrder === "asc" ? -1 : 1;
      if (A > B) return ui.sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [ui.filterType, ui.sortOrder]);

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

  /**
   * for table
   * category is a row of the table = {id, name, type..}
   */
  const handleEdit = (category) => {
    console.log("Edit, category = ", category);
    setUi((prev) => ({ ...prev, modalOpen: true, editingCategory: category }));
  };

  /**
   * for table
   * id is the id field of a row
   */
  const handleDelete = (id) => {
    console.log("Delete, id = ", id);
  };

  /**
   * for modal
   */
  const handleModalCancel = () => {
    setUi((prev) => ({ ...prev, modalOpen: false, editingCategory: null }));
  };

  /**
   * for modal
   */
  const handleModalSubmit = (values) => {
    // TEMP: just log; later connect to Redux thunks
    console.log("Submit values:", values);

    if (ui.editingCategory?.id) {
      console.log("Updating id:", ui.editingCategory.id);
    } else {
      console.log("Creating new category");
    }

    setUi((prev) => ({ ...prev, modalOpen: false, editingCategory: null }));
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
      <CategoryTable
        data={visibleCategories}
        loading={false}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryFormModal
        open={ui.modalOpen}
        initialValues={ui.editingCategory}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default CategoriesPage;
