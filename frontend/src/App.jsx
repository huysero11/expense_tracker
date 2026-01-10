import { Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
};

export default App;
