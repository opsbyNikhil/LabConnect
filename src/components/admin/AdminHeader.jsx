import { useNavigate } from "react-router-dom";

import {
  Layout,
  Typography,
  Space,
  Avatar,
  Badge,
  Dropdown,
  Button,
} from "antd";

import {
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Title, Text } = Typography;

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("labconnect_admin");
    navigate("/admin/login");
  };

  const menuItems = [
    {
      key: "profile",
      label: "Admin Profile",
      icon: <UserOutlined />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
    }
  };

  return (
    <Header
      style={{
        height: 72,
        minHeight: 72,
        width: "100%",
        padding: "0 30px",
        boxSizing: "border-box",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        lineHeight: "normal",
        borderBottom: "1px solid #e8edf0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Left: Logo */}
      <Space size={12} align="center" style={{ flexShrink: 0 }}>
        <SafetyCertificateOutlined
          style={{
            fontSize: 34,
            color: "#087f8c",
          }}
        />

        <div>
          <Title
            level={4}
            style={{
              margin: 0,
              color: "#12343b",
              lineHeight: 1.3,
            }}
          >
            LabConnect
          </Title>

          <Text
            type="secondary"
            style={{
              fontSize: 10,
              letterSpacing: 1,
            }}
          >
            ADMINISTRATION PORTAL
          </Text>
        </div>
      </Space>

      {/* Right: Notifications and Profile */}
      <Space size={24} align="center" style={{ flexShrink: 0 }}>
        <Badge count={0} size="small">
          <Button
            type="text"
            shape="circle"
            icon={<BellOutlined style={{ fontSize: 20 }} />}
          />
        </Badge>

        <Dropdown
          menu={{
            items: menuItems,
            onClick: handleMenuClick,
          }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Space size={10} align="center" style={{ cursor: "pointer" }}>
            <Avatar
              size={40}
              style={{
                backgroundColor: "#087f8c",
              }}
              icon={<UserOutlined />}
            />

            <div>
              <Text
                strong
                style={{
                  display: "block",
                  lineHeight: 1.5,
                }}
              >
                Administrator
              </Text>

              <Text type="secondary" style={{ fontSize: 11 }}>
                Super Admin
              </Text>
            </div>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AdminHeader;
