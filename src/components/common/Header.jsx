import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Button,
  ConfigProvider,
  Drawer,
  Flex,
  Grid,
  Layout,
  Menu,
  Space,
  Typography,
  Modal,
} from "antd";

import {
  MenuOutlined,
  ExperimentOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  FileSearchOutlined,
  PhoneOutlined,
  LoginOutlined,
  UserAddOutlined,
  HistoryOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

function Header() {
  const [open, setOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("labconnect_current_user"));
    } catch {
      return null;
    }
  });

  const screens = useBreakpoint();
  const location = useLocation();
  const navigate = useNavigate();

  // Listen for login/logout events
  useEffect(() => {
    const handleAuthChange = (event) => {
      setCurrentUser(event.detail);
    };

    window.addEventListener("labconnect-auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("labconnect-auth-change", handleAuthChange);
    };
  }, []);

  // Navigation menu items
  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/about",
      icon: <InfoCircleOutlined />,
      label: <Link to="/about">About</Link>,
    },
    {
      key: "/services",
      icon: <AppstoreOutlined />,
      label: <Link to="/services">Services</Link>,
    },
    {
      key: "/tests",
      icon: <FileSearchOutlined />,
      label: <Link to="/tests">Tests</Link>,
    },
    {
      key: "/booking-history",
      icon: <HistoryOutlined />,
      label: <Link to="/booking-history">Booking History</Link>,
    },

    ...(currentUser
      ? [
          {
            key: "/patient-dashboard",
            icon: <DashboardOutlined />,
            label: <Link to="/patient-dashboard">Patient Dashboard</Link>,
          },
        ]
      : []),

    {
      key: "/contact",
      icon: <PhoneOutlined />,
      label: <Link to="/contact">Contact</Link>,
    },
  ];

  // Close mobile drawer
  const closeDrawer = () => {
    setOpen(false);
  };

  // Logout confirmation
  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to logout?",
      okText: "Yes",
      cancelText: "No",
      okType: "danger",
      centered: true,

      onOk: () => {
        localStorage.removeItem("labconnect_current_user");

        setCurrentUser(null);

        window.dispatchEvent(
          new CustomEvent("labconnect-auth-change", {
            detail: null,
          }),
        );

        closeDrawer();
        navigate("/");
      },
    });
  };

  // Authentication buttons
  const authButtons = (
    <Space size={12}>
      {currentUser ? (
        <>
          <Text strong style={{ color: "#12343b" }}>
            Hi, {currentUser.fullName?.split(" ")[0] || "Patient"}
          </Text>

          <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/login" onClick={closeDrawer}>
            <Button type="text" icon={<LoginOutlined />}>
              Login
            </Button>
          </Link>

          <Link to="/register" onClick={closeDrawer}>
            <Button type="primary" icon={<UserAddOutlined />}>
              Register
            </Button>
          </Link>
        </>
      )}
    </Space>
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#087f8c",
          borderRadius: 8,
          fontFamily: "Inter, Arial, sans-serif",
        },
      }}
    >
      <AntHeader
        style={{
          background: "#ffffff",
          height: 76,
          padding: "0 5%",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          lineHeight: "normal",
        }}
      >
        <Flex
          align="center"
          justify="space-between"
          style={{
            maxWidth: 1400,
            height: "100%",
            margin: "0 auto",
          }}
        >
          {/* Logo and Branding */}

          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <ExperimentOutlined
              style={{
                fontSize: 30,
                color: "#087f8c",
              }}
            />

            <Text
              strong
              style={{
                fontSize: 25,
                color: "#087f8c",
              }}
            >
              LabConnect
            </Text>
          </Link>

          {/* Desktop Navigation */}

          {screens.md ? (
            <Flex align="center" gap={12}>
              <Menu
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={menuItems}
                disabledOverflow
                style={{
                  flex: 1,
                  minWidth: 0,
                  borderBottom: "none",
                  fontWeight: 500,
                }}
              />

              {authButtons}
            </Flex>
          ) : (
            <>
              {/* Mobile Menu Button */}

              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setOpen(true)}
                style={{ fontSize: 22 }}
                aria-label="Open navigation menu"
              />

              {/* Mobile Navigation Drawer */}

              <Drawer
                title="LabConnect"
                placement="right"
                open={open}
                onClose={closeDrawer}
                size={300}
              >
                <Menu
                  mode="vertical"
                  selectedKeys={[location.pathname]}
                  items={menuItems}
                  onClick={closeDrawer}
                />

                <Flex vertical gap={12} style={{ marginTop: 25 }}>
                  {currentUser ? (
                    <>
                      <Text strong>Welcome, {currentUser.fullName}</Text>

                      <Button
                        danger
                        block
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={closeDrawer}>
                        <Button block icon={<LoginOutlined />}>
                          Login
                        </Button>
                      </Link>

                      <Link to="/register" onClick={closeDrawer}>
                        <Button type="primary" block icon={<UserAddOutlined />}>
                          Register
                        </Button>
                      </Link>
                    </>
                  )}
                </Flex>
              </Drawer>
            </>
          )}
        </Flex>
      </AntHeader>
    </ConfigProvider>
  );
}

export default Header;
