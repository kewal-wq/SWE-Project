import React, { useContext } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
const { Header, Content, Sider } = Layout;

const CustomLayout = ({ children }) => {
  const { handleLogout, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const items2 = [UserOutlined, LaptopOutlined, LogoutOutlined].map(
    (icon, index) => {
      const sideMenuItems = [
        "Home",
        "Weather of favourites",
        isAuthenticated ? "Logout" : "Signup/Login",
      ];
      console.log(isAuthenticated);

      return {
        key: index,
        icon: React.createElement(icon),
        label: sideMenuItems[index],
      };
    }
  );
  // if(!isAuthenticated){
  //   items2.pop();
  // }

  const navMap = {
    0: "/",
    1: "/weatherOffavourites",
    2: "/auth",
  };

  return (
    <Layout style={{ height: "100vh", overflowY: "clip" }}>
      <Header className="header">
        <p style={{ color: "white", fontSize: 24 }}>Weather application</p>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
            onSelect={(val) => {
              if (val.key !== "2") {
                navigate(navMap[val.key]);
              } else {
                handleLogout();
                navigate("/auth");
              }
            }}
          />
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: "white",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
