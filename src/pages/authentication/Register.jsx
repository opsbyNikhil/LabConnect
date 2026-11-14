import { Link } from "react-router-dom";

import {
  Card,
  Typography,
  Flex,
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Space,
  message,
} from "antd";

import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  ExperimentOutlined,
  ArrowRightOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import useLocalStorage from "../../hooks/useLocalStorage";

const { Title, Text, Paragraph } = Typography;

function Register() {
  const [users, setUsers] = useLocalStorage("labconnect_users", []);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const handleRegister = (values) => {
    // Check whether email already exists
    const existingUser = users.find(
      (user) => user.email.toLowerCase() === values.email.trim().toLowerCase(),
    );

    if (existingUser) {
      messageApi.error("An account with this email already exists.");
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      fullName: values.fullName.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone,
      password: values.password,
      createdAt: new Date().toISOString(),
    };

    // Save user in LocalStorage
    setUsers((previousUsers) => [...previousUsers, newUser]);

    messageApi.success("Account created successfully!");

    // Reset registration form
    form.resetFields();

    console.log("Registered User:", newUser);
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
            maxWidth: 560,
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
              Create Your Account
            </Title>

            <Paragraph
              type="secondary"
              style={{
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Register with LabConnect to manage your diagnostic bookings.
            </Paragraph>
          </Flex>

          <Divider />

          {/* Registration Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleRegister}
            requiredMark={false}
            autoComplete="off"
          >
            {/* Full Name */}
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please enter your full name",
                },
                {
                  min: 3,
                  message: "Name must contain at least 3 characters",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your full name"
                size="large"
              />
            </Form.Item>

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

            {/* Mobile Number */}
            <Form.Item
              label="Mobile Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter your mobile number",
                },
                {
                  pattern: /^[6-9]\d{9}$/,
                  message: "Please enter a valid 10-digit mobile number",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Enter your mobile number"
                maxLength={10}
                size="large"
              />
            </Form.Item>

            {/* Password Fields */}
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a password",
                    },
                    {
                      min: 8,
                      message: "Password must contain at least 8 characters",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Create password"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password",
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
                    placeholder="Confirm password"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Create Account */}
            <Form.Item style={{ marginTop: 15 }}>
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
                Create Account
              </Button>
            </Form.Item>
          </Form>

          <Divider />

          {/* Login Link */}
          <Flex justify="center" align="center">
            <Space>
              <Text type="secondary">Already have an account?</Text>

              <Link
                to="/login"
                style={{
                  color: "#087f8c",
                  fontWeight: 600,
                }}
              >
                <LoginOutlined /> Login
              </Link>
            </Space>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}

export default Register;
