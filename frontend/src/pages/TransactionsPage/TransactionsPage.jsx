import TransactionsToolbar from "../../components/transactions/TransactionsToolbar/TransactionsToolbar";
import TransactionsModal from "../../components/transactions/TransactionsModal/TransactionsModal";
import TransactionsTable from "../../components/transactions/TransactionsTable/TransactionsTable";
import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoriesItems } from "../../redux/selectors/categoriesSelector";

import {
  selectTransactionsLoading,
  selectTransactions,
} from "../../redux/selectors/transactionsSelector";
import {
  createTransactionThunk,
  getTransactionsThunk,
  updateTransactionThunk,
  deleteTransactionThunk,
} from "../../redux/slices/transactionsSlice";
import { getCategoriesThunk } from "../../redux/slices/categoriesSlice";
import { message } from "antd";

import "./TransactionsPage.css";

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null); // editing category
  const [filters, setFilters] = useState({
    type: "all",
    categoryId: "all", // all || number
    dateRange: null, // [dayjs, dayjs] || null
    keyword: "", // string
  });

  const categories = useSelector(selectCategoriesItems);
  const loading = useSelector(selectTransactionsLoading);
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getTransactionsThunk());
  }, [dispatch]);

  const filteredTransactions = useMemo(() => {
    const { type, categoryId, dateRange, keyword } = filters;
    return transactions.filter((t) => {
      // type
      if (type !== "all" && type !== t.type) {
        return false;
      }

      // category id
      if (categoryId !== "all" && Number(t.categoryId) !== Number(categoryId)) {
        return false;
      }

      // date range
      if (dateRange?.length === 2) {
        const [from, to] = dateRange;
        const d = dayjs(t.transDate, "YYYY-MM-DD");
        if (d.isBefore(from, "day") || d.isAfter(to, "day")) return false;
      }

      // keyword in note
      if (keyword?.trim()) {
        const kw = keyword.trim().toLowerCase();
        const note = (t.note || "").toLowerCase();
        if (!note.includes(kw)) return false;
      }

      return true;
    });
  }, [transactions, filters]);

  const handleCreate = async (payload) => {
    try {
      await dispatch(createTransactionThunk(payload)).unwrap();
      message.success("Transaction created successfully!");
      setOpenModal(false);
    } catch (error) {
      message.error(String(error));
    }
  };

  const hanldeUpdate = async (payload) => {
    try {
      await dispatch(
        updateTransactionThunk({
          id: editing.id,
          ...payload,
        }),
      ).unwrap();
      message.success("Transaction updated!");
      setEditing(null);
    } catch (err) {
      message.error(String(err));
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTransactionThunk(id)).unwrap();
      message.success("Transaction deleted");
    } catch (err) {
      message.error(String(err));
    }
  };

  return (
    <div className="transactions-page">
      <div className="transactions-page__title">Transactions</div>
      <TransactionsToolbar
        onCreateClick={() => setOpenModal(true)}
        categories={categories}
        filters={filters}
        setFilters={setFilters}
      />
      {/**Create */}
      <TransactionsModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onSubmit={handleCreate}
        categories={categories}
        loading={loading}
        title="Create a transaction"
        okText="Create"
      />
      {/**Edit */}
      <TransactionsModal
        open={!!editing}
        onCancel={() => setEditing(null)}
        onSubmit={hanldeUpdate}
        categories={categories}
        loading={loading}
        title="Edit a transaction"
        okText="Save"
        initialValues={editing}
      />
      <TransactionsTable
        transactions={filteredTransactions}
        categories={categories}
        loading={loading}
        onEdit={(row) => setEditing(row)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TransactionsPage;
