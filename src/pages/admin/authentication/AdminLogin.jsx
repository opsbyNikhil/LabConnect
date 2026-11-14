import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Typography, Space, message } from "antd";

import {
  LockOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (values) => {
    setLoading(true);

    setTimeout(() => {
      if (values.username === "admin" && values.password === "admin@12345") {
        localStorage.setItem(
          "labconnect_admin",
          JSON.stringify({
            username: "admin",
            role: "ADMIN",
            isAuthenticated: true,
          }),
        );

        message.success("Admin login successful!");

        navigate("/admin/dashboard");
      } else {
        message.error("Invalid username or password!");
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e0f7fa, #e8f0fe)",
        padding: 20,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 430,
          borderRadius: 16,
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
        styles={{
          body: {
            padding: 35,
          },
        }}
      >
        <Space
          direction="vertical"
          size={8}
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          <SafetyCertificateOutlined
            style={{
              fontSize: 48,
              color: "#087f8c",
            }}
          />

          <Title level={2} style={{ margin: 0, color: "#12343b" }}>
            LabConnect
          </Title>

          <Title level={4} style={{ margin: 0 }}>
            Admin Login
          </Title>

          <Text type="secondary">
            Sign in to access the administration panel.
          </Text>
        </Space>

        <Form
          layout="vertical"
          onFinish={handleLogin}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your username",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter admin username"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter admin password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 12 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{
                height: 45,
                background: "#087f8c",
                borderColor: "#087f8c",
                fontWeight: 600,
              }}
            >
              Admin Login
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            LabConnect Administration Portal
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
