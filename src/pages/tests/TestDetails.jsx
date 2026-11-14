import { useParams, Link } from "react-router-dom";

import {
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Row,
  Space,
  Tag,
  Typography,
  Result,
} from "antd";

import {
  ArrowLeftOutlined,
  ExperimentOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import tests from "../../data/tests";

const { Title, Paragraph, Text } = Typography;

function TestDetails() {
  const { id } = useParams();

  const test = tests.find((item) => item.id === Number(id));

  // Handle invalid test IDs
  if (!test) {
    return (
      <Result
        status="404"
        title="Test Not Found"
        subTitle="Sorry, the diagnostic test you are looking for does not exist."
        extra={
          <Link to="/tests">
            <Button type="primary">Back to Tests</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #e6f7f8 0%, #f5fafb 100%)",
          padding: "65px 6%",
        }}
      >
        <Space orientation="vertical" size={20}>
          <Link to="/tests">
            <Button type="link" icon={<ArrowLeftOutlined />}>
              Back to Diagnostic Tests
            </Button>
          </Link>

          <Tag color="cyan">
            <ExperimentOutlined /> {test.category.toUpperCase()}
          </Tag>

          <Title level={1} style={{ color: "#12343b", margin: 0 }}>
            {test.name}
          </Title>

          <Paragraph
            style={{
              color: "#64748b",
              fontSize: 17,
              maxWidth: 750,
            }}
          >
            {test.description}
          </Paragraph>

          <Title level={2} style={{ color: "#087f8c", margin: 0 }}>
            ₹{test.price}
          </Title>
        </Space>
      </section>

      {/* Test Information */}
      <section style={{ padding: "55px 6%", background: "#ffffff" }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card title="Test Information" style={{ borderRadius: 12 }}>
              <Descriptions column={1} bordered>
                <Descriptions.Item label="Test Name">
                  {test.name}
                </Descriptions.Item>

                <Descriptions.Item label="Category">
                  {test.category.toUpperCase()}
                </Descriptions.Item>

                <Descriptions.Item label="Report Availability">
                  {test.reportTime}
                </Descriptions.Item>

                <Descriptions.Item label="Fasting Requirement">
                  {test.fasting}
                </Descriptions.Item>

                <Descriptions.Item label="Test Price">
                  ₹{test.price}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Important Information" style={{ borderRadius: 12 }}>
              <Space orientation="vertical" size={20}>
                <Flex gap={12} align="center">
                  <ClockCircleOutlined
                    style={{ fontSize: 22, color: "#087f8c" }}
                  />

                  <div>
                    <Text strong>Report Time</Text>
                    <br />
                    <Text type="secondary">{test.reportTime}</Text>
                  </div>
                </Flex>

                <Flex gap={12} align="center">
                  <SafetyCertificateOutlined
                    style={{ fontSize: 22, color: "#087f8c" }}
                  />

                  <div>
                    <Text strong>Preparation</Text>
                    <br />
                    <Text type="secondary">{test.fasting}</Text>
                  </div>
                </Flex>

                <Flex gap={12} align="center">
                  <CalendarOutlined
                    style={{ fontSize: 22, color: "#087f8c" }}
                  />

                  <div>
                    <Text strong>Booking</Text>
                    <br />
                    <Text type="secondary">Convenient appointment booking</Text>
                  </div>
                </Flex>
              </Space>

              <Link to={`/tests/${test.id}/book`}>
                <Button
                  type="primary"
                  size="large"
                  block
                  style={{ marginTop: 30 }}
                >
                  Book This Test
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default TestDetails;
