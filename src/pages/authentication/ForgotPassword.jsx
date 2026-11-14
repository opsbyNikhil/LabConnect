import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  Typography,
  Flex,
  Form,
  Input,
  Button,
  Divider,
  message,
} from "antd";

import {
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
  LoginOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";

import { useState } from "react";

import useLocalStorage from "../../hooks/useLocalStorage";

const { Title, Paragraph, Text } = Typography;

function ForgotPassword() {
  const navigate = useNavigate();

  const [users, setUsers] = useLocalStorage("labconnect_users", []);
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const [emailVerified, setEmailVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");

  // Step 1: Verify registered email
  const handleEmailVerification = (values) => {
    const enteredEmail = values.email.trim().toLowerCase();

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === enteredEmail,
    );

    if (!existingUser) {
      messageApi.error("No account found with this email address.");
      return;
    }

    setVerifiedEmail(enteredEmail);
    setEmailVerified(true);

    messageApi.success("Email verified successfully!");
  };

  // Step 2: Update password
  const handlePasswordReset = (values) => {
    const updatedUsers = users.map((user) => {
      if (user.email.toLowerCase() === verifiedEmail) {
        return {
          ...user,
          password: values.password,
        };
      }

      return user;
    });

    setUsers(updatedUsers);

    messageApi.success("Password updated successfully!");

    form.resetFields();

    setEmailVerified(false);
    setVerifiedEmail("");

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <>
      {contextHolder}

      <Flex
        justify="center"
        align="center"
        style={{
          minHeight: "80vh",
          padding: "50px 20px",
          background: "#f5fafb",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 480,
            borderRadius: 16,
            boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
          }}
          styles={{
            body: {
              padding: "35px",
            },
          }}
        >
          {/* Header */}
          <Flex vertical align="center" gap={10}>
            <ExperimentOutlined
              style={{
                fontSize: 42,
                color: "#087f8c",
              }}
            />

            <Title
              level={2}
              style={{
                margin: 0,
                color: "#12343b",
                textAlign: "center",
              }}
            >
              Forgot Password?
            </Title>

            <Paragraph
              type="secondary"
              style={{
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {emailVerified
                ? "Create a new password for your LabConnect account."
                : "Enter your registered email address to reset your password."}
            </Paragraph>
          </Flex>

          <Divider />

          {!emailVerified ? (
            /* Email Verification Form */
            <Form
              form={form}
              layout="vertical"
              onFinish={handleEmailVerification}
              requiredMark={false}
              autoComplete="off"
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Enter your registered email"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  icon={<ArrowRightOutlined />}
                  style={{
                    height: 48,
                    background: "#087f8c",
                    fontWeight: 600,
                  }}
                >
                  Verify Email
                </Button>
              </Form.Item>
            </Form>
          ) : (
            /* Password Reset Form */
            <Form
              layout="vertical"
              onFinish={handlePasswordReset}
              requiredMark={false}
              autoComplete="off"
            >
              <Form.Item label="Verified Email">
                <Input
                  value={verifiedEmail}
                  prefix={<MailOutlined />}
                  size="large"
                  disabled
                />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password",
                  },
                  {
                    min: 8,
                    message: "Password must contain at least 8 characters",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your new password"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Confirm New Password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("Passwords do not match"),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm your new password"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  icon={<LockOutlined />}
                  style={{
                    height: 48,
                    background: "#087f8c",
                    fontWeight: 600,
                  }}
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          )}

          <Divider />

          {/* Login Link */}
          <Flex justify="center" align="center">
            <Text type="secondary">Remember your password?</Text>

            <Link
              to="/login"
              style={{
                color: "#087f8c",
                fontWeight: 600,
                marginLeft: 8,
              }}
            >
              <LoginOutlined /> Login
            </Link>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}

export default ForgotPassword;
