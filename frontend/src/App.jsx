import { Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default App;
