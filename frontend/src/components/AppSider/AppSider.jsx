import "./AppSider.css";
import { Menu, Layout } from "antd";
import { BiSolidDashboard } from "react-icons/bi";
import { TbTransactionDollar } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const AppSider = () => {
  const items = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <BiSolidDashboard />,
    },
    {
      key: "transactions",
      label: "Transactions",
      icon: <TbTransactionDollar />,
    },
    {
      key: "categories",
      label: "Categories",
      icon: <MdCategory />,
    },
  ];

  const navigate = useNavigate();
  const handleMenuClick = (e) => {
    const { key } = e;
    navigate(`/${key}`);
  };

  return (
    <Sider className="app-sider__container">
      <Menu
        defaultSelectedKeys={["dashboard"]}
        mode="inline"
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default AppSider;
