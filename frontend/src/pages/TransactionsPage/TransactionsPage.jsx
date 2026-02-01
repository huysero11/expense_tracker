import TransactionsToolbar from "../../components/transactions/TransactionsToolbar/TransactionsToolbar";
import TransactionsCreateModal from "../../components/transactions/TransactionsCreateModal/TransactionsCreateModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoriesItems } from "../../redux/selectors/categoriesSelector";
import { selectTransactionsLoading } from "../../redux/selectors/transactionsSelector";
import { createTransactionThunk } from "../../redux/slices/transactionsSlice";
import { message } from "antd";

import "./TransactionsPage.css";

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const categories = useSelector(selectCategoriesItems);
  const loading = useSelector(selectTransactionsLoading);

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
    </div>
  );
};

export default TransactionsPage;
