import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  Typography,
  Flex,
  Form,
  Input,
  Button,
  Divider,
  Space,
  message,
} from "antd";

import {
  MailOutlined,
  LockOutlined,
  ExperimentOutlined,
  ArrowRightOutlined,
  UserAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import useLocalStorage from "../../hooks/useLocalStorage";

const { Title, Text, Paragraph } = Typography;

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [users] = useLocalStorage("labconnect_users", []);
  const [, setCurrentUser] = useLocalStorage("labconnect_current_user", null);

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const handleLogin = (values) => {
    const enteredEmail = values.email.trim().toLowerCase();

    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === enteredEmail &&
        user.password === values.password,
    );

    if (!existingUser) {
      messageApi.error("Invalid email address or password.");
      return;
    }

    // Store logged-in user information
    const loggedInUser = {
      id: existingUser.id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      phone: existingUser.phone,
    };

    setCurrentUser(loggedInUser);
    window.dispatchEvent(
      new CustomEvent("labconnect-auth-change", {
        detail: loggedInUser,
      }),
    );

    messageApi.success("Login successful!");

    form.resetFields();

    // Navigate to Home page
    // Navigate to the requested page after login
    const redirectPath = location.state?.from || "/";

    navigate(redirectPath, { replace: true });
  };;

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
          {/* Login Header */}
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
              Welcome Back!
            </Title>

            <Paragraph
              type="secondary"
              style={{
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Login to your LabConnect account to manage your diagnostic
              bookings.
            </Paragraph>
          </Flex>

          <Divider />

          {/* Login Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleLogin}
            requiredMark={false}
            autoComplete="off"
          >
            {/* Email */}
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
                placeholder="Enter your email address"
                size="large"
              />
            </Form.Item>

            {/* Password */}
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
                placeholder="Enter your password"
                size="large"
              />
            </Form.Item>

            {/* Forgot Password */}
            <Flex justify="end" style={{ marginBottom: 20 }}>
              <Link
                to="/forgot-password"
                style={{
                  color: "#087f8c",
                  fontWeight: 500,
                }}
              >
                Forgot Password?
              </Link>
            </Flex>

            {/* Login Button */}
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
                Login
              </Button>
            </Form.Item>
          </Form>

          <Divider />

          {/* Register Link */}
          <Flex justify="center" align="center">
            <Space>
              <Text type="secondary">Don't have an account?</Text>

              <Link
                to="/register"
                style={{
                  color: "#087f8c",
                  fontWeight: 600,
                }}
              >
                <UserAddOutlined /> Register
              </Link>
            </Space>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}

export default Login;
