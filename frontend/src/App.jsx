import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import AppLayout from "./layouts/AppLayout/AppLayout.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage.jsx";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";

const App = () => {
  return (
    <Routes>
      {/* default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* auth pages */}
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />

      {/* app pages */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
