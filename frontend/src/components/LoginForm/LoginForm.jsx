import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/slices/authSlice";
import { selectAuthToken } from "../../redux/selectors/authSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectAuthToken);

  // useEffect(() => {
  //   if (token) {
  //     navigate("/app/dashboard", { replace: true });
  //   }
  // }, [token, navigate]);

  const hanldeLogin = async (values) => {
    // console.log("Login form values:", values);
    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      await dispatch(loginThunk(payload)).unwrap();
      navigate("/app/dashboard");
    } catch (e) {
      message.error(e);
    }
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
