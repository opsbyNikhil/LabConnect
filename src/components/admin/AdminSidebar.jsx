import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";

import {
  DashboardOutlined,
  TeamOutlined,
  ExperimentOutlined,
  CalendarOutlined,
  FileTextOutlined,
  FileAddOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/patients",
      icon: <TeamOutlined />,
      label: "Manage Patients",
    },
    {
      key: "/admin/tests",
      icon: <ExperimentOutlined />,
      label: "Manage Tests",
    },
    {
      key: "/admin/bookings",
      icon: <CalendarOutlined />,
      label: "Manage Bookings",
    },
    {
      key: "/admin/create-medical-report",
      icon: <FileAddOutlined />,
      label: "Create Medical Report",
    },
    {
      key: "/admin/medical-reports",
      icon: <FileTextOutlined />,
      label: "Manage Medical Reports",
    },
    {
      key: "/admin/analytics",
      icon: <BarChartOutlined />,
      label: "Analytics",
    },
  ];

  return (
    <Sider
      width={250}
      theme="light"
      style={{
        minHeight: "calc(100vh - 72px)",
        borderRight: "1px solid #e8edf0",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          padding: "24px 20px 12px",
          fontSize: 12,
          fontWeight: 600,
          color: "#8c969b",
          letterSpacing: 1,
        }}
      >
        MAIN MENU
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{
          borderRight: 0,
          padding: "0 10px",
          fontWeight: 500,
        }}
      />

      <div
        style={{
          margin: "30px 18px",
          padding: 16,
          background: "#e8f7f8",
          borderRadius: 10,
          fontSize: 12,
          color: "#087f8c",
        }}
      >
        <strong>LabConnect Admin</strong>

        <p style={{ margin: "6px 0 0" }}>
          Manage your diagnostic platform from one place.
        </p>
      </div>
    </Sider>
  );
};

export default AdminSidebar;
