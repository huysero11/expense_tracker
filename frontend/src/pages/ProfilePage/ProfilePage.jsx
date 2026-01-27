import { selectUserState } from "../../redux/selectors/userSelector";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Card, Button, Form, Input, Spin, message, Space } from "antd";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { me, loading, error } = useSelector(selectUserState);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // console.log("[ProfilePage] me =", me);
  const initialValues = useMemo(() => {
    return {
      email: me?.email,
      fullName: me?.fullName,
      updatedAt: me?.updatedAt,
      createdAt: me?.createdAt,
    };
  }, [me]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const onEdit = () => setIsEditing(true);

  const onCancel = () => {
    form.setFieldsValue(initialValues);
    setIsEditing(false);
  };

  const onSave = async () => {
    try {
      // only validate editable fields
      const values = await form.validateFields(["fullName"]);

      // payload we will send later in update thunk
      const payload = { fullName: values.fullName };

      console.log("[ProfilePage] payload for update thunk =", payload);

      // placeholder until update thunk is implemented
      message.info("Save clicked — will dispatch update thunk in next case.");

      setIsEditing(false);
    } catch {
      // validation failed -> AntD shows errors, do nothing
    }
  };

  if (loading) return <Spin />;

  if (error) {
    return (
      <Alert
        type="error"
        showIcon
        message={error?.message || "Failed to load profile"}
        description={typeof error === "string" ? <Text>{error}</Text> : null}
      />
    );
  }

  return (
    <div className="profile__page">
      <Card
        className="profile__card"
        title="Profile"
        extra={
          !isEditing ? (
            <Button type="primary" onClick={onEdit} disabled={!me}>
              Edit
            </Button>
          ) : (
            <Space>
              <Button onClick={onCancel}>Cancel</Button>
              <Button type="primary" onClick={onSave}>
                Save
              </Button>
            </Space>
          )
        }
        style={{ maxWidth: 720 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Full name"
            name="fullName"
            rules={[
              { required: true, message: "Full name is required" },
              { max: 100, message: "Max 100 characters" },
            ]}
          >
            <Input disabled={!isEditing} placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item label="Created at" name="createdAt">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Updated at" name="updatedAt">
            <Input disabled />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProfilePage;
