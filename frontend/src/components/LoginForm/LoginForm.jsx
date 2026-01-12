import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/slices/authSlice";
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();

  const hanldeLogin = (values) => {
    // console.log("Login form values:", values);
    const payload = {
      email: values.email,
      password: values.password,
    };

    dispatch(loginThunk(payload));
  };

  return (
    <div className="login-form__page">
      <div className="login-form__container">
        <div className="login-form__title">Login</div>
        <Form
          layout="vertical"
          className="login-form__form"
          onFinish={hanldeLogin}
        >
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
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form__button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
