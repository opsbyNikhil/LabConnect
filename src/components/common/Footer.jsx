import { Link } from "react-router-dom";

import { Layout, Row, Col, Flex, Space, Typography, Divider } from "antd";

import {
  ExperimentOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Text } = Typography;

function Footer() {
  return (
    <AntFooter
      style={{
        background: "#f8fbfc",
        padding: "50px 6% 30px",
        borderTop: "1px solid #edf0f2",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "20px 0",
        }}
      >
        <Row gutter={[40, 40]}>
          <Col xs={24} md={12} lg={8}>
            <Space orientation="vertical" size={18}>
              <Flex align="center" gap={10}>
                <ExperimentOutlined
                  style={{
                    fontSize: 32,
                    color: "#087f8c",
                  }}
                />

                <Title
                  level={3}
                  style={{
                    margin: 0,
                    color: "#087f8c",
                  }}
                >
                  LabConnect
                </Title>
              </Flex>

              <Paragraph
                style={{
                  maxWidth: 350,
                  color: "#64748b",
                  lineHeight: 1.9,
                  margin: 0,
                }}
              >
                Your trusted healthcare companion. Explore diagnostic tests,
                manage appointments, and access your laboratory information
                through one convenient platform.
              </Paragraph>

              <Text type="secondary">
                Connecting healthcare with convenience.
              </Text>
            </Space>
          </Col>
          {/* Quick Links */}

          <Col xs={24} sm={12} md={6} lg={4}>
            <Space orientation="vertical" size={16}>
              <Title level={4} style={{ color: "#12343b", margin: 0 }}>
                Quick Links
              </Title>

              <Space orientation="vertical" size={12}>
                <Link to="/" style={{ color: "#64748b" }}>
                  Home
                </Link>
                <Link to="/about" style={{ color: "#64748b" }}>
                  About Us
                </Link>
                <Link to="/services" style={{ color: "#64748b" }}>
                  Services
                </Link>
                <Link to="/tests" style={{ color: "#64748b" }}>
                  Diagnostic Tests
                </Link>
                <Link to="/contact" style={{ color: "#64748b" }}>
                  Contact Us
                </Link>
              </Space>
            </Space>
          </Col>

          {/* Our Services */}

          <Col xs={24} sm={12} md={6} lg={4}>
            <Space orientation="vertical" size={16}>
              <Title level={4} style={{ color: "#12343b", margin: 0 }}>
                Our Services
              </Title>

              <Space orientation="vertical" size={12}>
                <Link to="/services" style={{ color: "#64748b" }}>
                  Blood Tests
                </Link>
                <Link to="/services" style={{ color: "#64748b" }}>
                  Full Body Checkups
                </Link>
                <Link to="/services" style={{ color: "#64748b" }}>
                  Radiology & Imaging
                </Link>
                <Link to="/services" style={{ color: "#64748b" }}>
                  Health Packages
                </Link>
                <Link to="/services" style={{ color: "#64748b" }}>
                  Pathology Tests
                </Link>
              </Space>
            </Space>
          </Col>
          {/* Contact Information */}

          <Col xs={24} sm={12} lg={8}>
            <Space orientation="vertical" size={18}>
              <Title level={4} style={{ color: "#12343b", margin: 0 }}>
                Contact Information
              </Title>

              <Flex align="center" gap={12}>
                <EnvironmentOutlined
                  style={{ fontSize: 18, color: "#087f8c" }}
                />
                <Text type="secondary">
                  Find your nearest diagnostic center
                </Text>
              </Flex>

              <Flex align="center" gap={12}>
                <PhoneOutlined style={{ fontSize: 18, color: "#087f8c" }} />
                <Text type="secondary">+91 00000 00000</Text>
              </Flex>

              <Flex align="center" gap={12}>
                <MailOutlined style={{ fontSize: 18, color: "#087f8c" }} />
                <Text type="secondary">support@example.com</Text>
              </Flex>
            </Space>
          </Col>
        </Row>
        <Divider style={{ borderColor: "#e5e7eb", margin: "35px 0 25px" }} />

        {/* Footer Bottom */}

        <Flex justify="space-between" align="center" wrap="wrap" gap={20}>
          <Text type="secondary">
            © {new Date().getFullYear()} LabConnect. All rights reserved.
          </Text>

          <Space size={20}>
            <FacebookOutlined
              style={{ fontSize: 22, color: "#087f8c", cursor: "pointer" }}
            />

            <InstagramOutlined
              style={{ fontSize: 22, color: "#087f8c", cursor: "pointer" }}
            />

            <LinkedinOutlined
              style={{ fontSize: 22, color: "#087f8c", cursor: "pointer" }}
            />

            <GithubOutlined
              style={{ fontSize: 22, color: "#087f8c", cursor: "pointer" }}
            />
          </Space>
        </Flex>
      </div>
    </AntFooter>
  );
}

export default Footer;
