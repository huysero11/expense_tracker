import { Modal, Form, Select, InputNumber, DatePicker, Input } from "antd";
import { useMemo, useEffect } from "react";
import dayjs from "dayjs";

const TransactionsModal = ({
  open,
  onCancel,
  onSubmit,
  categories = [],
  loading = false,
  title = "Create a transaction",
  okText = "Create",
  initialValues, // {categoryId, amount, transDate, note}
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) {
      return;
    }

    form.setFieldsValue({
      categoryId: initialValues?.categoryId ?? undefined,
      amount: initialValues?.amount ?? undefined,
      transDate: initialValues?.transDate
        ? dayjs(initialValues.transDate)
        : dayjs(),
      note: initialValues?.note ?? undefined,
    });
  }, [open, initialValues, form]);

  const options = useMemo(() => {
    const expense = categories
      .filter((c) => c.type === "expense")
      .map((c) => ({ label: c.name, value: c.id }));
    const income = categories
      .filter((c) => c.type === "income")
      .map((c) => ({ label: c.name, value: c.id }));

    return [
      { label: "Expense", options: expense },
      { label: "Income", options: income },
    ];
  }, [categories]);

  const hanldeOk = async () => {
    const values = await form.validateFields();
    // console.log(values);

    onSubmit({
      categoryId: values.categoryId,
      amount: values.amount,
      transDate: values.transDate.format("YYYY-MM-DD"),
      note: values.note || null,
    });

    form.resetFields();
  };

  return (
    <Modal
      title={title}
      open={open}
      onOk={hanldeOk}
      okText={okText}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ transDate: dayjs() }}
      >
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Choose a category" }]}
        >
          <Select placeholder="Select category" options={options} />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Enter amount" }]}
        >
          <InputNumber style={{ width: "100%" }} min={1} />
        </Form.Item>

        <Form.Item
          label="Date"
          name="transDate"
          rules={[{ required: true, message: "Choose date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Note" name="note">
          <Input placeholder="Optional note" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransactionsModal;
