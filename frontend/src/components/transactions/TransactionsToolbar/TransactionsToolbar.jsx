import { Button, Select, Input, DatePicker } from "antd";
import "./TransactionsToolbar.css";

const { RangePicker } = DatePicker;

const TransactionsToolbar = ({
  onCreateClick,
  categories,
  filters,
  setFilters,
}) => {
  const categoryOptions = [
    { label: "All categories", value: "all" },
    ...categories.map((c) => ({ label: c.name, value: c.id })),
  ];

  const typeOptions = [
    { label: "All", value: "all" },
    { label: "Expense", value: "expense" },
    { label: "Income", value: "income" },
  ];

  return (
    <div className="transactions-toolbar__container">
      <div className="transactions-toolbar__filters">
        {/**type */}
        <Select
          value={filters.type}
          options={typeOptions}
          onChange={(v) => setFilters({ ...filters, type: v })}
        />

        {/**category */}
        <Select
          value={filters.categoryId}
          options={categoryOptions}
          onChange={(v) => setFilters({ ...filters, categoryId: v })}
        />

        <RangePicker
          value={filters.dateRange}
          onChange={(v) => setFilters({ ...filters, dateRange: v })}
        />

        <Input
          placeholder="Search note..."
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
        />
      </div>
      <Button
        className="transactions-toolbar__create-button"
        onClick={onCreateClick}
        type="primary"
      >
        Create
      </Button>
    </div>
  );
};

export default TransactionsToolbar;
