import TransactionsToolbar from "../../components/transactions/TransactionsToolbar/TransactionsToolbar";
import TransactionsCreateModal from "../../components/transactions/TransactionsCreateModal/TransactionsCreateModal";
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
} from "../../redux/slices/transactionsSlice";
import { getCategoriesThunk } from "../../redux/slices/categoriesSlice";
import { message } from "antd";

import "./TransactionsPage.css";

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <div className="transactions-page">
      <div className="transactions-page__title">Transactions</div>
      <TransactionsToolbar onCreateClick={() => setOpenModal(true)} />
      <TransactionsCreateModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onSubmit={handleCreate}
        categories={categories}
        loading={loading}
      />
      <TransactionsTable
        transactions={transactions}
        categories={categories}
        loading={loading}
      />
    </div>
  );
};

export default TransactionsPage;
