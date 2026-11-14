import { Layout, Typography, Space } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

const AdminFooter = () => {
  return (
    <Footer
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e8edf0",
        padding: "18px 28px",
      }}
    >
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Text type="secondary" style={{ fontSize: 12 }}>
          © {new Date().getFullYear()} LabConnect. All rights reserved.
        </Text>

        <Text type="secondary" style={{ fontSize: 12 }}>
          Administration Portal | Version 1.0.0
        </Text>
      </Space>
    </Footer>
  );
};

export default AdminFooter;
