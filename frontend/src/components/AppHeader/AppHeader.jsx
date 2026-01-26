import { Dropdown, Layout } from "antd";
import { ProfileTwoTone } from "@ant-design/icons";
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import "./AppHeader.css";

const { Header } = Layout;

const user_dropdown_menu = [
  {
    key: "profile",
    label: "Profile",
    icon: <ProfileTwoTone />,
  },
  {
    key: "logout",
    label: "Logout",
    icon: <MdLogout />,
  },
];

const AppHeader = () => {
  return (
    <Header className="app-header__container">
      <div className="app-header__logo">Logo</div>
      <div className="app-header__user">
        <Dropdown
          menu={{ items: user_dropdown_menu }}
          placement="bottomRight"
          arrow
        >
          <div className="app-header__user-avatar">
            <FaUserCircle size={30} />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
