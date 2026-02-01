import { Button } from "antd";
import "./TransactionsToolbar.css";

const TransactionsToolbar = ({ onCreateClick }) => {
  return (
    <div className="transactions-toolbar__container">
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
