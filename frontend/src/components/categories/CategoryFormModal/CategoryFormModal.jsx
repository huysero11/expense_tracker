import { Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

const CategoryFormModal = ({ open, initialValues, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) {
      return;
    }

    form.resetFields();

    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        type: initialValues.type,
      });
    } else {
      form.setFieldsValue({
        name: "",
        type: "expense",
      });
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    const values = await form.validateFields(); // { name, type }
    onSubmit?.(values);
  };

  return (
    <Modal
      title="Edit category"
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Save"
      destroyOnHidden
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter category name." },
            { max: 100, message: "Max length is 100 characters." },
          ]}
        >
          <Input placeholder="e.g., Food, Salary" />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select type!" }]}
        >
          <Select
            options={[
              { value: "expense", label: "Expense" },
              { value: "income", label: "Income" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryFormModal;
