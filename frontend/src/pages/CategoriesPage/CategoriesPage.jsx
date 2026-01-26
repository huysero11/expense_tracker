import { useState, useMemo, useEffect } from "react";
import CategoryToolbar from "../../components/categories/CategoryToolbar/CategoryToolbar";
import CategoryTable from "../../components/categories/CategoryTable/CategoryTable";
import CategoryFormModal from "../../components/categories/CategoryFormModal/CategoryFormModal";

import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import {
  getCategoriesThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from "../../redux/slices/categoriesSlice";

import {
  selectCategoriesItems,
  selectCategoriesStatus,
  selectCategoriesError,
} from "../../redux/selectors/categoriesSelector";

import "./CategoriesPage.css";

const normalize = (s = "") => s.trim().toLowerCase();

// Mock data for UI testing
// const mockCategories = [
//   { id: 1, name: "Food", type: "expense" },
//   { id: 2, name: "Salary", type: "income" },
//   { id: 3, name: "Transport", type: "expense" },
//   { id: 4, name: "Freelance", type: "income" },
// ];

const CategoriesPage = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectCategoriesItems);
  const status = useSelector(selectCategoriesStatus);
  const error = useSelector(selectCategoriesError);

  const [ui, setUi] = useState({
    filterType: "all",
    sortOrder: "asc",
    modalOpen: false,
    editingCategory: null,
  });

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (status == "failed" && error) {
      message.error(error);
    }
  }, [status, error]);

  const visibleCategories = useMemo(() => {
    let list = items;

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
  }, [items, ui.filterType, ui.sortOrder]);

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
    // console.log("Edit, category = ", category);
    setUi((prev) => ({ ...prev, modalOpen: true, editingCategory: category }));
  };

  /**
   * for table
   * id is the id field of a row
   */
  const handleDelete = async (id) => {
    // console.log("Delete, id = ", id);
    try {
      await dispatch(deleteCategoryThunk(id)).unwrap();
      message.success("Delete category successfully!");
    } catch (err) {
      message.error(err || "Failed to delete!");
    }
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
  const handleModalSubmit = async (values) => {
    try {
      if (ui.editingCategory?.id != null) {
        await dispatch(
          updateCategoryThunk({ id: ui.editingCategory.id, ...values }),
        ).unwrap();
        message.success("Category updated successfully.");
      } else {
        await dispatch(createCategoryThunk(values)).unwrap();
        message.success("Create category successfully!");
      }
      setUi((prev) => ({ ...prev, modalOpen: false, editingCategory: null }));
    } catch (err) {
      message.error(err || "Action failed!");
    }
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
