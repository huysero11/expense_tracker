import AppHeader from "../../components/AppHeader/AppHeader.jsx";
import AppSider from "../../components/AppSider/AppSider.jsx";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import { tokenStorage } from "../../utils/tokenStorage.js";
import { useDispatch } from "react-redux";
import { getMeThunk } from "../../redux/slices/userSlice.js";
import { useEffect } from "react";

import "./AppLayout.css";

const { Content } = Layout;

const AppLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = tokenStorage.get();
    if (token) {
      dispatch(getMeThunk());
    }
  }, [dispatch]);

  return (
    <Layout className="app-layout">
      <AppHeader />
      <Layout className="app-layout__body">
        <AppSider />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
