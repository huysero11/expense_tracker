import { Select, Segmented, Button } from "antd";
import "./CategoryToolbar.css";

const CategoryToolbar = ({
  filterType, // all | income | expense
  sortOrder, // asc | desc
  onCreate,
  onFilterTypeChange,
  onSortOrderChange,
}) => {
  return (
    <div className="category-toolbar__container">
      <Button
        className="category-toolbar__create-button"
        type="primary"
        onClick={onCreate}
      >
        Create a category
      </Button>
      <div className="category-toolbar__tool-wrapper">
        <Select
          value={filterType}
          onChange={onFilterTypeChange}
          options={[
            { value: "all", label: "All types" },
            { value: "expense", label: "Expense" },
            { value: "income", label: "Income" },
          ]}
        />

        <Segmented
          value={sortOrder}
          onChange={onSortOrderChange}
          options={[
            { value: "asc", label: "Name A to Z" },
            { value: "desc", label: "Name Z to A" },
          ]}
        />
      </div>
    </div>
  );
};

export default CategoryToolbar;
