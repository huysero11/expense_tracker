import AppHeader from "../../components/AppHeader/AppHeader.jsx";
import AppSider from "../../components/AppSider/AppSider.jsx";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./AppLayout.css";

const { Content } = Layout;

const AppLayout = () => {
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
