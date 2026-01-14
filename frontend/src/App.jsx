import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import AppLayout from "./layouts/AppLayout/AppLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import TransactionsPage from "./pages/TransactionPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
