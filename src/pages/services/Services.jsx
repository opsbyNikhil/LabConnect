import { Link } from "react-router-dom";

import {
  Button,
  Card,
  Collapse,
  Col,
  Flex,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";

import {
  ExperimentOutlined,
  ArrowRightOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  MedicineBoxOutlined,
  ScanOutlined,
  HeartOutlined,
  FileSearchOutlined,
  SearchOutlined,
  CalendarOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function Services() {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* Services Hero Section */}

      <section
        style={{
          padding: "90px 6%",
          background: "linear-gradient(120deg, #e6f7f8 0%, #ffffff 75%)",
        }}
      >
        <Row align="middle" gutter={[48, 48]}>
          {/* Left Content */}

          <Col xs={24} lg={13}>
            <Space orientation="vertical" size={24} style={{ width: "100%" }}>
              <Tag color="cyan" style={{ padding: "6px 14px", fontSize: 14 }}>
                <ExperimentOutlined /> OUR SERVICES
              </Tag>

              <Title
                style={{
                  fontSize: "clamp(36px, 5vw, 58px)",
                  lineHeight: 1.2,
                  margin: 0,
                  color: "#12343b",
                }}
              >
                Comprehensive
                <br />
                <span style={{ color: "#087f8c" }}>Diagnostic Services.</span>
              </Title>

              <Paragraph
                style={{
                  fontSize: 17,
                  color: "#64748b",
                  lineHeight: 1.9,
                  maxWidth: 600,
                }}
              >
                Explore a range of diagnostic and laboratory services through
                LabConnect. Our platform makes it easier to discover available
                tests, understand service categories, and manage your
                appointments.
              </Paragraph>

              <Space wrap size={16}>
                <Link to="/tests">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ExperimentOutlined />}
                  >
                    Explore Diagnostic Tests
                  </Button>
                </Link>

                <Link to="/contact">
                  <Button size="large">
                    Contact Us <ArrowRightOutlined />
                  </Button>
                </Link>
              </Space>

              <Flex wrap gap={24} style={{ marginTop: 12 }}>
                <Text type="secondary">
                  <SafetyCertificateOutlined style={{ color: "#087f8c" }} />{" "}
                  Quality Focused
                </Text>

                <Text type="secondary">
                  <ClockCircleOutlined style={{ color: "#087f8c" }} />{" "}
                  Convenient Booking
                </Text>
              </Flex>
            </Space>
          </Col>

          {/* Right Content */}

          <Col xs={24} lg={11}>
            <Flex justify="center" align="center">
              <div
                style={{
                  width: "100%",
                  maxWidth: 430,
                  minHeight: 350,
                  borderRadius: 28,
                  background: "linear-gradient(145deg, #087f8c, #38a6ad)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexorientation: "column",
                  gap: 20,
                  boxShadow: "0 20px 50px rgba(8,127,140,0.18)",
                }}
              >
                <ExperimentOutlined
                  style={{ fontSize: 100, color: "#ffffff" }}
                />

                <Title
                  level={2}
                  style={{
                    color: "#ffffff",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  LabConnect Services
                </Title>

                <Text style={{ color: "#e6f7f8", fontSize: 16 }}>
                  Diagnostics Made Simpler.
                </Text>
              </div>
            </Flex>
          </Col>
        </Row>
      </section>
      {/* Diagnostic Service Categories */}

      <section
        style={{
          padding: "80px 6%",
          background: "#ffffff",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag color="cyan">OUR CATEGORIES</Tag>

          <Title level={2} style={{ color: "#12343b", marginTop: 16 }}>
            Explore Our Diagnostic Services
          </Title>

          <Paragraph
            style={{
              color: "#64748b",
              fontSize: 16,
              maxWidth: 650,
              margin: "0 auto",
            }}
          >
            Discover different diagnostic service categories designed to help
            you explore healthcare testing options.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {/* Laboratory Tests */}

          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              bordered={false}
              style={{
                height: "100%",
                borderRadius: 18,
                background: "#e6f7f8",
              }}
              bodyStyle={{ padding: 28 }}
            >
              <MedicineBoxOutlined style={{ fontSize: 42, color: "#087f8c" }} />

              <Title level={4} style={{ marginTop: 24 }}>
                Laboratory Tests
              </Title>

              <Paragraph style={{ color: "#64748b" }}>
                Explore routine blood tests and other laboratory investigation
                categories.
              </Paragraph>

              <Text strong style={{ color: "#087f8c" }}>
                Blood Tests · Routine Tests
              </Text>
            </Card>
          </Col>

          {/* Imaging Services */}

          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              bordered={false}
              style={{
                height: "100%",
                borderRadius: 18,
                background: "#edf3ff",
              }}
              bodyStyle={{ padding: 28 }}
            >
              <ScanOutlined style={{ fontSize: 42, color: "#3867c8" }} />

              <Title level={4} style={{ marginTop: 24 }}>
                Imaging Services
              </Title>

              <Paragraph style={{ color: "#64748b" }}>
                Explore diagnostic imaging categories and medical scanning
                services.
              </Paragraph>

              <Text strong style={{ color: "#3867c8" }}>
                X-Ray · Ultrasound
              </Text>
            </Card>
          </Col>

          {/* Health Packages */}

          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              bordered={false}
              style={{
                height: "100%",
                borderRadius: 18,
                background: "#fff9e6",
              }}
              bodyStyle={{ padding: 28 }}
            >
              <HeartOutlined style={{ fontSize: 42, color: "#d89614" }} />

              <Title level={4} style={{ marginTop: 24 }}>
                Health Packages
              </Title>

              <Paragraph style={{ color: "#64748b" }}>
                Discover preventive health checkup and wellness package
                categories.
              </Paragraph>

              <Text strong style={{ color: "#d89614" }}>
                Full Body · Preventive Care
              </Text>
            </Card>
          </Col>

          {/* Specialized Diagnostics */}

          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              bordered={false}
              style={{
                height: "100%",
                borderRadius: 18,
                background: "#f0fff4",
              }}
              bodyStyle={{ padding: 28 }}
            >
              <FileSearchOutlined style={{ fontSize: 42, color: "#389e63" }} />

              <Title level={4} style={{ marginTop: 24 }}>
                Specialized Diagnostics
              </Title>

              <Paragraph style={{ color: "#64748b" }}>
                Explore specialized testing categories for different diagnostic
                requirements.
              </Paragraph>

              <Text strong style={{ color: "#389e63" }}>
                Advanced · Specialized Tests
              </Text>
            </Card>
          </Col>
        </Row>
      </section>
      {/* Popular Diagnostic Tests Section */}

      <section
        style={{
          padding: "80px 6%",
          background: "#f5fafb",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag color="cyan">POPULAR TESTS</Tag>

          <Title level={2} style={{ color: "#12343b", marginTop: 16 }}>
            Explore Popular Diagnostic Tests
          </Title>

          <Paragraph
            style={{
              color: "#64748b",
              fontSize: 16,
              maxWidth: 650,
              margin: "0 auto",
            }}
          >
            Explore commonly requested diagnostic tests and learn more about the
            available testing categories.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {/* CBC */}

          <Col xs={24} sm={12} lg={8}>
            <Card
              hoverable
              bordered={false}
              style={{ height: "100%", borderRadius: 18 }}
              bodyStyle={{ padding: 28 }}
            >
              <Flex justify="space-between" align="center">
                <ExperimentOutlined
                  style={{ fontSize: 36, color: "#087f8c" }}
                />
                <Tag color="cyan">Blood Test</Tag>
              </Flex>

              <Title level={4} style={{ marginTop: 24 }}>
                Complete Blood Count (CBC)
              </Title>

              <Paragraph style={{ color: "#64748b", minHeight: 72 }}>
                A commonly used blood test that measures different components of
                blood, including red cells, white cells, and platelets.
              </Paragraph>

              <Link to="/tests">
                <Button type="link" icon={<ArrowRightOutlined />}>
                  Explore Test
                </Button>
              </Link>
            </Card>
          </Col>

          {/* Lipid Profile */}

          <Col xs={24} sm={12} lg={8}>
            <Card
              hoverable
              bordered={false}
              style={{ height: "100%", borderRadius: 18 }}
              bodyStyle={{ padding: 28 }}
            >
              <Flex justify="space-between" align="center">
                <ExperimentOutlined
                  style={{ fontSize: 36, color: "#3867c8" }}
                />
                <Tag color="blue">Blood Test</Tag>
              </Flex>

              <Title level={4} style={{ marginTop: 24 }}>
                Lipid Profile
              </Title>

              <Paragraph style={{ color: "#64748b", minHeight: 72 }}>
                A blood test that measures cholesterol and triglyceride levels
                to help assess cardiovascular health.
              </Paragraph>

              <Link to="/tests">
                <Button type="link" icon={<ArrowRightOutlined />}>
                  Explore Test
                </Button>
              </Link>
            </Card>
          </Col>

          {/* Thyroid Profile */}

          <Col xs={24} sm={12} lg={8}>
            <Card
              hoverable
              bordered={false}
              style={{ height: "100%", borderRadius: 18 }}
              bodyStyle={{ padding: 28 }}
            >
              <Flex justify="space-between" align="center">
                <ExperimentOutlined
                  style={{ fontSize: 36, color: "#d89614" }}
                />
                <Tag color="gold">Hormone Test</Tag>
              </Flex>

              <Title level={4} style={{ marginTop: 24 }}>
                Thyroid Profile
              </Title>

              <Paragraph style={{ color: "#64748b", minHeight: 72 }}>
                A group of blood tests used to evaluate thyroid function and
                related hormone levels.
              </Paragraph>

              <Link to="/tests">
                <Button type="link" icon={<ArrowRightOutlined />}>
                  Explore Test
                </Button>
              </Link>
            </Card>
          </Col>

          {/* HbA1c */}

          <Col xs={24} sm={12} lg={8}>
            <Card
              hoverable
              bordered={false}
              style={{ height: "100%", borderRadius: 18 }}
              bodyStyle={{ padding: 28 }}
            >
              <Flex justify="space-between" align="center">
                <ExperimentOutlined
                  style={{ fontSize: 36, color: "#389e63" }}
                />
                <Tag color="green">Diabetes Test</Tag>
              </Flex>

              <Title level={4} style={{ marginTop: 24 }}>
                HbA1c Test
              </Title>

              <Paragraph style={{ color: "#64748b", minHeight: 72 }}>
                Measures average blood glucose levels over approximately the
                previous two to three months.
              </Paragraph>

              <Link to="/tests">
                <Button type="link" icon={<ArrowRightOutlined />}>
                  Explore Test
                </Button>
              </Link>
            </Card>
          </Col>

          {/* Liver Function */}

          <Col xs={24} sm={12} lg={8}>
            <Card
              hoverable
              bordered={false}
              style={{ height: "100%", borderRadius: 18 }}
              bodyStyle={{ padding: 28 }}
            >
              <Flex justify="space-between" align="center">
                <ExperimentOutlined
                  style={{ fontSize: 36, color: "#cf5c36" }}
                />
                <Tag color="orange">Organ Function</Tag>
              </Flex>

              <Title level={4} style={{ marginTop: 24 }}>
                Liver Function Test
              </Title>

              <Paragraph style={{ color: "#64748b", minHeight: 72 }}>
                A group of blood tests that helps evaluate liver function and
                related markers.
              </Paragraph>

              <Link to="/tests">
                <Button type="link" icon={<ArrowRightOutlined />}>
                  Explore Test
                </Button>
              </Link>
            </Card>
          </Col>

          {/* Kidney Function */}

          <Col xs={24} sm={12} lg={8}>
            <Card
              hoverable
              bordered={false}
              style={{ height: "100%", borderRadius: 18 }}
              bodyStyle={{ padding: 28 }}
            >
              <Flex justify="space-between" align="center">
                <ExperimentOutlined
                  style={{ fontSize: 36, color: "#7952b3" }}
                />
                <Tag color="purple">Organ Function</Tag>
              </Flex>

              <Title level={4} style={{ marginTop: 24 }}>
                Kidney Function Test
              </Title>

              <Paragraph style={{ color: "#64748b", minHeight: 72 }}>
                Common blood and urine tests used to assess kidney function and
                related health markers.
              </Paragraph>

              <Link to="/tests">
                <Button type="link" icon={<ArrowRightOutlined />}>
                  Explore Test
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>

        <Flex justify="center" style={{ marginTop: 40 }}>
          <Link to="/tests">
            <Button type="primary" size="large">
              View All Diagnostic Tests <ArrowRightOutlined />
            </Button>
          </Link>
        </Flex>
      </section>
      {/* How Our Services Work */}

      <section
        style={{
          padding: "80px 6%",
          background: "#ffffff",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 55 }}>
          <Tag color="cyan">SIMPLE PROCESS</Tag>

          <Title level={2} style={{ color: "#12343b", marginTop: 16 }}>
            How LabConnect Works
          </Title>

          <Paragraph
            style={{
              color: "#64748b",
              fontSize: 16,
              maxWidth: 650,
              margin: "0 auto",
            }}
          >
            Discover how easy it is to explore diagnostic services and manage
            your appointments through LabConnect.
          </Paragraph>
        </div>

        <Row gutter={[24, 32]}>
          {/* Step 1 */}

          <Col xs={24} sm={12} lg={6}>
            <Flex vertical align="center" style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: "50%",
                  background: "#e6f7f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 22,
                }}
              >
                <SearchOutlined style={{ fontSize: 36, color: "#087f8c" }} />
              </div>

              <Tag color="cyan">STEP 01</Tag>

              <Title level={4} style={{ marginTop: 12 }}>
                Explore Tests
              </Title>

              <Paragraph style={{ color: "#64748b" }}>
                Browse available diagnostic tests and discover different
                laboratory service categories.
              </Paragraph>
            </Flex>
          </Col>

          {/* Step 2 */}

          <Col xs={24} sm={12} lg={6}>
            <Flex vertical align="center" style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: "50%",
                  background: "#edf3ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 22,
                }}
              >
                <FileTextOutlined style={{ fontSize: 36, color: "#3867c8" }} />
              </div>

              <Tag color="blue">STEP 02</Tag>

              <Title level={4} style={{ marginTop: 12 }}>
                Choose a Test
              </Title>

              <Paragraph style={{ color: "#64748b" }}>
                Review test information and select the diagnostic service you
                want to explore.
              </Paragraph>
            </Flex>
          </Col>

          {/* Step 3 */}

          <Col xs={24} sm={12} lg={6}>
            <Flex vertical align="center" style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: "50%",
                  background: "#fff9e6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 22,
                }}
              >
                <CalendarOutlined style={{ fontSize: 36, color: "#d89614" }} />
              </div>

              <Tag color="gold">STEP 03</Tag>

              <Title level={4} style={{ marginTop: 12 }}>
                Book Appointment
              </Title>

              <Paragraph style={{ color: "#64748b" }}>
                Select an available appointment option and submit your booking
                details.
              </Paragraph>
            </Flex>
          </Col>

          {/* Step 4 */}

          <Col xs={24} sm={12} lg={6}>
            <Flex vertical align="center" style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: "50%",
                  background: "#f0fff4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 22,
                }}
              >
                <CheckCircleOutlined
                  style={{ fontSize: 36, color: "#389e63" }}
                />
              </div>

              <Tag color="green">STEP 04</Tag>

              <Title level={4} style={{ marginTop: 12 }}>
                Manage Booking
              </Title>

              <Paragraph style={{ color: "#64748b" }}>
                View your booking details and keep track of your appointment
                information.
              </Paragraph>
            </Flex>
          </Col>
        </Row>
      </section>
      {/* Frequently Asked Questions */}

      <section
        style={{
          padding: "80px 6%",
          background: "#f5fafb",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 45 }}>
          <Tag color="cyan">HAVE QUESTIONS?</Tag>

          <Title level={2} style={{ color: "#12343b", marginTop: 16 }}>
            Frequently Asked Questions
          </Title>

          <Paragraph
            style={{
              color: "#64748b",
              fontSize: 16,
              maxWidth: 650,
              margin: "0 auto",
            }}
          >
            Find answers to common questions about LabConnect and its diagnostic
            service platform.
          </Paragraph>
        </div>

        <div style={{ maxWidth: 850, margin: "0 auto" }}>
          <Collapse
            bordered={false}
            expandIconPosition="end"
            size="large"
            items={[
              {
                key: "1",
                label: (
                  <Text strong>
                    What types of diagnostic services are available?
                  </Text>
                ),
                children: (
                  <Paragraph style={{ color: "#64748b", marginBottom: 0 }}>
                    LabConnect showcases different diagnostic categories,
                    including laboratory tests, imaging services, health
                    packages, and specialized diagnostics.
                  </Paragraph>
                ),
              },
              {
                key: "2",
                label: <Text strong>How can I explore diagnostic tests?</Text>,
                children: (
                  <Paragraph style={{ color: "#64748b", marginBottom: 0 }}>
                    Navigate to the Diagnostic Tests page to explore available
                    tests, their descriptions, and related information.
                  </Paragraph>
                ),
              },
              {
                key: "3",
                label: (
                  <Text strong>
                    Can I manage my appointments through LabConnect?
                  </Text>
                ),
                children: (
                  <Paragraph style={{ color: "#64748b", marginBottom: 0 }}>
                    The platform is designed to demonstrate appointment booking
                    and management workflows. These features will be developed
                    as part of the frontend experience.
                  </Paragraph>
                ),
              },
              {
                key: "4",
                label: (
                  <Text strong>
                    Is LabConnect a real diagnostic laboratory?
                  </Text>
                ),
                children: (
                  <Paragraph style={{ color: "#64748b", marginBottom: 0 }}>
                    No. LabConnect is a frontend demonstration project
                    showcasing a diagnostic and laboratory management platform.
                    It does not provide actual medical tests or laboratory
                    services.
                  </Paragraph>
                ),
              },
              {
                key: "5",
                label: <Text strong>How can I contact LabConnect?</Text>,
                children: (
                  <Paragraph style={{ color: "#64748b", marginBottom: 0 }}>
                    Visit our Contact page to explore the available contact
                    options and learn more about the platform.
                  </Paragraph>
                ),
              },
            ]}
          />
        </div>
      </section>
      {/* Services CTA Section */}

      <section
        style={{
          padding: "70px 6%",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            padding: "55px 35px",
            borderRadius: 24,
            background: "linear-gradient(120deg, #087f8c, #38a6ad)",
            textAlign: "center",
            boxShadow: "0 15px 40px rgba(8,127,140,0.18)",
          }}
        >
          <Title
            level={2}
            style={{
              color: "#ffffff",
              marginBottom: 16,
            }}
          >
            Take the Next Step Towards Better Health
          </Title>

          <Paragraph
            style={{
              color: "#e6f7f8",
              fontSize: 17,
              maxWidth: 650,
              margin: "0 auto 28px",
            }}
          >
            Explore diagnostic tests and discover how LabConnect simplifies the
            healthcare information experience.
          </Paragraph>

          <Flex justify="center" wrap="wrap" gap={16}>
            <Link to="/tests">
              <Button
                size="large"
                style={{
                  height: 48,
                  padding: "0 28px",
                  color: "#087f8c",
                  fontWeight: 600,
                  border: "none",
                }}
              >
                Explore Diagnostic Tests <ArrowRightOutlined />
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                size="large"
                ghost
                style={{
                  height: 48,
                  padding: "0 28px",
                  fontWeight: 600,
                }}
              >
                Contact Us
              </Button>
            </Link>
          </Flex>
        </div>
      </section>
    </div>
  );
}

export default Services;
