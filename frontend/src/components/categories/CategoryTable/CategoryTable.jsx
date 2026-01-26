import { Table, Tag, Space, Button, Popconfirm } from "antd";
import "./CategoryTable.css";

const CategoryTable = ({ data = [], loading = false, onEdit, onDelete }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag>{type}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => onEdit?.(record)}>Edit</Button>
          <Popconfirm
            title="Delete this category?"
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            onConfirm={() => onDelete?.(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey={(row) => row.id}
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 8, showSizeChanger: false }}
    />
  );
};

export default CategoryTable;
