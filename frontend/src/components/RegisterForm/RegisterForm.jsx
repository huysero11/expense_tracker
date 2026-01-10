import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/slices/authSlice";
import "./RegisterForm.css";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const hanldeRegister = async (values) => {
    // console.log("Register form values:", values);
    const payload = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    };
    dispatch(registerThunk(payload));
  };

  return (
    <div className="register-form__page">
      <div className="register-form__container">
        <div className="register-form_title">Register</div>
        <Form
          layout="vertical"
          className="register-form__form"
          onFinish={hanldeRegister}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form__submit-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
