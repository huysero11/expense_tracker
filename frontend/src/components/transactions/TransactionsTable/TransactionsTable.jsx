import { Table, Button } from "antd";
import { useMemo } from "react";

const TransactionsTable = ({
  transactions = [],
  categories = [],
  loading,
  onEdit,
}) => {
  //   console.log("[TransactionsTable] transactions = ", transactions);
  //   console.log("[TransactionsTable] categories = ", categories);

  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach((c) => map.set(Number(c.id), c.name));
    return map;
  }, [categories]);
  const columns = [
    {
      title: "Date",
      dataIndex: "transDate",
      key: "transDate",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId) => categoryMap.get(Number(categoryId)) || categoryId,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) =>
        new Intl.NumberFormat("vi-VN").format(Number(amount) || 0),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (note) => note || "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => onEdit?.(record)}>Edit</Button>
      ),
    },
  ];
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={transactions}
      pagination={false}
      loading={loading}
    />
  );
};

export default TransactionsTable;
