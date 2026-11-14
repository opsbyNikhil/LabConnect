import { Layout } from "antd";

import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import AdminFooter from "../admin/AdminFooter";

const { Content } = Layout;

const AdminLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Admin Header */}
      <AdminHeader />

      {/* Sidebar and Main Content */}
      <Layout>
        <AdminSidebar />

        <Layout
          style={{
            background: "#f5f8fa",
            minHeight: "calc(100vh - 72px)",
          }}
        >
          <Content
            style={{
              padding: 24,
              minHeight: 400,
            }}
          >
            {children}
          </Content>

          {/* Admin Footer */}
          <AdminFooter />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
