import TransactionsToolbar from "../../components/transactions/TransactionsToolbar/TransactionsToolbar";
import TransactionsModal from "../../components/transactions/TransactionsModal/TransactionsModal";
import TransactionsTable from "../../components/transactions/TransactionsTable/TransactionsTable";
import { useState, useEffect } from "react";
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

  const categories = useSelector(selectCategoriesItems);
  const loading = useSelector(selectTransactionsLoading);
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getTransactionsThunk());
  }, [dispatch]);

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
      <TransactionsToolbar onCreateClick={() => setOpenModal(true)} />
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
        transactions={transactions}
        categories={categories}
        loading={loading}
        onEdit={(row) => setEditing(row)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TransactionsPage;
