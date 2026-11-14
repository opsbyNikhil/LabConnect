import { Link } from "react-router-dom";

import {
  Button,
  Card,
  Col,
  Flex,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
  Divider,
  Rate,
} from "antd";

import {
  ExperimentOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  MedicineBoxOutlined,
  CheckCircleFilled,
  HeartOutlined,
  ScanOutlined,
  FileSearchOutlined,
  ShoppingCartOutlined,
  ArrowRightOutlined,
  SafetyOutlined,
  FileProtectOutlined,
  CustomerServiceOutlined,
  SearchOutlined,
  CalendarOutlined,
  FileTextOutlined,
  UserOutlined,
  StarFilled,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function Home() {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* Hero Section */}

      <section
        style={{
          padding: "80px 6%",
          background: "linear-gradient(120deg, #e6f7f8 0%, #ffffff 75%)",
        }}
      >
        <Row align="middle" gutter={[48, 48]}>
          {/* Left Content */}

          <Col xs={24} lg={12}>
            <Space orientation="vertical" size={24} style={{ width: "100%" }}>
              <Tag color="cyan" style={{ padding: "6px 14px", fontSize: 14 }}>
                <SafetyCertificateOutlined /> Trusted Diagnostic Services
              </Tag>

              <Title
                style={{
                  fontSize: "clamp(36px, 5vw, 58px)",
                  lineHeight: 1.2,
                  margin: 0,
                  color: "#12343b",
                }}
              >
                Your Health,
                <br />
                Our <span style={{ color: "#087f8c" }}>Priority.</span>
              </Title>

              <Paragraph
                style={{
                  fontSize: 17,
                  color: "#64748b",
                  lineHeight: 1.9,
                  maxWidth: 550,
                }}
              >
                Take control of your health with LabConnect. Discover diagnostic
                tests, book appointments, and access your laboratory reports
                conveniently in one place.
              </Paragraph>

              <Space wrap size={16}>
                <Link to="/tests">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ExperimentOutlined />}
                  >
                    Book a Test
                  </Button>
                </Link>

                <Link to="/services">
                  <Button size="large">
                    Explore Services <ArrowRightOutlined />
                  </Button>
                </Link>
              </Space>

              <Flex wrap gap={24} style={{ marginTop: 20 }}>
                <Text type="secondary">
                  <CheckCircleFilled style={{ color: "#087f8c" }} /> Reliable
                  Testing
                </Text>

                <Text type="secondary">
                  <CheckCircleFilled style={{ color: "#087f8c" }} /> Easy
                  Booking
                </Text>

                <Text type="secondary">
                  <CheckCircleFilled style={{ color: "#087f8c" }} /> Secure
                  Reports
                </Text>
              </Flex>
            </Space>
          </Col>

          {/* Right Content */}

          <Col xs={24} lg={12}>
            <Flex justify="center" align="center">
              <Card
                bordered={false}
                style={{
                  width: "100%",
                  maxWidth: 480,
                  borderRadius: 24,
                  boxShadow: "0 20px 60px rgba(8,127,140,0.12)",
                  background: "#ffffff",
                }}
                styles={{ body: { padding: 32 } }}
              >
                <Flex vertical align="center" gap={20}>
                  <div
                    style={{
                      width: 110,
                      height: 110,
                      borderRadius: "50%",
                      background: "#e6f7f8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MedicineBoxOutlined
                      style={{ fontSize: 58, color: "#087f8c" }}
                    />
                  </div>

                  <Title level={3} style={{ margin: 0 }}>
                    Your Health Dashboard
                  </Title>

                  <Text type="secondary" style={{ textAlign: "center" }}>
                    Manage your diagnostic journey with confidence.
                  </Text>

                  <Row gutter={16} style={{ width: "100%" }}>
                    <Col span={12}>
                      <Card
                        size="small"
                        style={{
                          background: "#f0fbfc",
                          border: "none",
                          borderRadius: 12,
                        }}
                      >
                        <Statistic
                          title="Available Tests"
                          value={120}
                          suffix="+"
                          valueStyle={{ color: "#087f8c" }}
                        />
                      </Card>
                    </Col>

                    <Col span={12}>
                      <Card
                        size="small"
                        style={{
                          background: "#f6f9ff",
                          border: "none",
                          borderRadius: 12,
                        }}
                      >
                        <Statistic
                          title="Services"
                          value={25}
                          suffix="+"
                          valueStyle={{ color: "#3867c8" }}
                        />
                      </Card>
                    </Col>
                  </Row>

                  <Card
                    size="small"
                    style={{
                      width: "100%",
                      background: "#f6ffed",
                      border: "1px solid #d9f7be",
                      borderRadius: 12,
                    }}
                  >
                    <Flex align="center" gap={12}>
                      <CheckCircleFilled
                        style={{ fontSize: 24, color: "#52c41a" }}
                      />

                      <div>
                        <Text strong>Easy Test Booking</Text>
                        <br />
                        <Text type="secondary">
                          Book your tests anytime, anywhere.
                        </Text>
                      </div>
                    </Flex>
                  </Card>
                </Flex>
              </Card>
            </Flex>
          </Col>
        </Row>
      </section>
      {/* Diagnostic Services Section */}

      <section
        style={{
          padding: "80px 6%",
          background: "#ffffff",
        }}
      >
        <Flex vertical align="center" gap={16} style={{ marginBottom: 50 }}>
          <Tag color="cyan">OUR SERVICES</Tag>

          <Title
            level={2}
            style={{
              margin: 0,
              textAlign: "center",
              color: "#12343b",
            }}
          >
            Our Diagnostic Services
          </Title>

          <Paragraph
            style={{
              maxWidth: 650,
              textAlign: "center",
              color: "#64748b",
              fontSize: 16,
            }}
          >
            Explore our comprehensive range of diagnostic and healthcare
            services designed to help you stay informed about your health.
          </Paragraph>
        </Flex>

        <Row gutter={[24, 24]}>
          {[
            {
              title: "Blood Tests",
              description:
                "Accurate blood testing services to monitor your health and detect potential conditions.",
              icon: <ExperimentOutlined />,
              color: "#087f8c",
              background: "#e6f7f8",
            },
            {
              title: "Full Body Checkups",
              description:
                "Comprehensive health packages designed to provide insights into your overall health.",
              icon: <HeartOutlined />,
              color: "#e05275",
              background: "#fff0f3",
            },
            {
              title: "Radiology & Imaging",
              description:
                "Diagnostic imaging services to support accurate medical evaluation.",
              icon: <ScanOutlined />,
              color: "#3867c8",
              background: "#edf3ff",
            },
            {
              title: "Health Packages",
              description:
                "Convenient diagnostic packages tailored to different healthcare needs.",
              icon: <MedicineBoxOutlined />,
              color: "#8b5cc7",
              background: "#f5edff",
            },
            {
              title: "Pathology Tests",
              description:
                "Reliable laboratory testing to support diagnosis and health monitoring.",
              icon: <FileSearchOutlined />,
              color: "#d68b22",
              background: "#fff7e6",
            },
            {
              title: "Preventive Healthcare",
              description:
                "Proactive health screening to help identify potential health risks early.",
              icon: <SafetyCertificateOutlined />,
              color: "#389e63",
              background: "#f0fff4",
            },
          ].map((service, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                bordered
                style={{
                  height: "100%",
                  borderRadius: 16,
                  borderColor: "#edf0f2",
                }}
                styles={{
                  body: {
                    padding: 28,
                  },
                }}
              >
                <Flex vertical gap={18}>
                  <Flex
                    align="center"
                    justify="center"
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 14,
                      background: service.background,
                      color: service.color,
                      fontSize: 30,
                    }}
                  >
                    {service.icon}
                  </Flex>

                  <Title level={4} style={{ margin: 0 }}>
                    {service.title}
                  </Title>

                  <Paragraph
                    style={{
                      color: "#64748b",
                      margin: 0,
                      lineHeight: 1.8,
                      minHeight: 75,
                    }}
                  >
                    {service.description}
                  </Paragraph>

                  <Link to="/services">
                    <Button
                      type="link"
                      style={{
                        padding: 0,
                        color: service.color,
                        fontWeight: 600,
                      }}
                    >
                      Explore Service <ArrowRightOutlined />
                    </Button>
                  </Link>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      {/* Popular Diagnostic Tests Section */}

      <section
        style={{
          padding: "80px 6%",
          background: "#f5fafb",
        }}
      >
        <Flex vertical align="center" gap={16} style={{ marginBottom: 50 }}>
          <Tag color="cyan">POPULAR TESTS</Tag>

          <Title
            level={2}
            style={{
              margin: 0,
              textAlign: "center",
              color: "#12343b",
            }}
          >
            Our Popular Diagnostic Tests
          </Title>

          <Paragraph
            style={{
              maxWidth: 650,
              textAlign: "center",
              color: "#64748b",
              fontSize: 16,
            }}
          >
            Explore our most popular laboratory tests with reliable diagnostic
            information and convenient booking options.
          </Paragraph>
        </Flex>

        <Row gutter={[24, 24]}>
          {[
            {
              name: "Complete Blood Count (CBC)",
              description:
                "Evaluates red blood cells, white blood cells and platelets.",
              sample: "Blood",
              duration: "24 Hours",
              price: 450,
              category: "Blood Test",
            },
            {
              name: "Lipid Profile",
              description:
                "Measures cholesterol and triglyceride levels for heart health.",
              sample: "Blood",
              duration: "24 Hours",
              price: 650,
              category: "Heart Health",
            },
            {
              name: "Thyroid Profile",
              description:
                "Evaluates thyroid hormone levels to assess thyroid function.",
              sample: "Blood",
              duration: "24 Hours",
              price: 550,
              category: "Hormonal Test",
            },
            {
              name: "Liver Function Test",
              description:
                "Evaluates liver health through different enzyme measurements.",
              sample: "Blood",
              duration: "24 Hours",
              price: 700,
              category: "Organ Function",
            },
            {
              name: "Kidney Function Test",
              description:
                "Checks kidney health through creatinine and related markers.",
              sample: "Blood",
              duration: "24 Hours",
              price: 600,
              category: "Organ Function",
            },
            {
              name: "Vitamin D Test",
              description:
                "Measures vitamin D levels to assess bone and overall health.",
              sample: "Blood",
              duration: "24 Hours",
              price: 800,
              category: "Vitamin Test",
            },
          ].map((test, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  borderRadius: 16,
                  border: "1px solid #edf0f2",
                }}
                styles={{
                  body: {
                    padding: 24,
                  },
                }}
              >
                <Flex vertical gap={16}>
                  <Flex justify="space-between" align="center">
                    <Tag color="cyan">{test.category}</Tag>

                    <ExperimentOutlined
                      style={{
                        fontSize: 25,
                        color: "#087f8c",
                      }}
                    />
                  </Flex>

                  <Title level={4} style={{ margin: 0 }}>
                    {test.name}
                  </Title>

                  <Paragraph
                    style={{
                      color: "#64748b",
                      margin: 0,
                      minHeight: 50,
                      lineHeight: 1.7,
                    }}
                  >
                    {test.description}
                  </Paragraph>

                  <Flex vertical gap={10}>
                    <Flex justify="space-between">
                      <Text type="secondary">Sample Type</Text>
                      <Text strong>{test.sample}</Text>
                    </Flex>

                    <Flex justify="space-between">
                      <Text type="secondary">
                        <ClockCircleOutlined /> Report Time
                      </Text>
                      <Text strong>{test.duration}</Text>
                    </Flex>
                  </Flex>

                  <Divider style={{ margin: "4px 0" }} />

                  <Flex justify="space-between" align="center">
                    <div>
                      <Text type="secondary">Starting from</Text>
                      <Title
                        level={3}
                        style={{
                          margin: 0,
                          color: "#087f8c",
                        }}
                      >
                        ₹{test.price}
                      </Title>
                    </div>

                    <Tag color="success">Available</Tag>
                  </Flex>

                  <Space style={{ width: "100%" }}>
                    <Link to="/tests" style={{ flex: 1 }}>
                      <Button block>View Details</Button>
                    </Link>

                    <Link to="/tests" style={{ flex: 1 }}>
                      <Button
                        type="primary"
                        block
                        icon={<ShoppingCartOutlined />}
                      >
                        Book Now
                      </Button>
                    </Link>
                  </Space>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>

        <Flex justify="center" style={{ marginTop: 40 }}>
          <Link to="/tests">
            <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
              View All Tests
            </Button>
          </Link>
        </Flex>
      </section>
      {/* Why Choose LabConnect Section */}

      <section
        style={{
          padding: "80px 6%",
          background: "#ffffff",
        }}
      >
        <Flex vertical align="center" gap={16} style={{ marginBottom: 50 }}>
          <Tag color="cyan">WHY CHOOSE US</Tag>

          <Title
            level={2}
            style={{
              margin: 0,
              textAlign: "center",
              color: "#12343b",
            }}
          >
            Why Choose LabConnect?
          </Title>

          <Paragraph
            style={{
              maxWidth: 650,
              textAlign: "center",
              color: "#64748b",
              fontSize: 16,
            }}
          >
            We combine trusted laboratory services, modern technology, and
            patient-focused care to make your healthcare experience simple and
            reliable.
          </Paragraph>
        </Flex>

        <Row gutter={[24, 24]}>
          {[
            {
              title: "Certified Professionals",
              description:
                "Our qualified laboratory professionals follow trusted testing procedures and quality standards.",
              icon: <SafetyOutlined />,
              color: "#087f8c",
              background: "#e6f7f8",
            },
            {
              title: "Accurate Test Results",
              description:
                "Reliable diagnostic processes help provide clear and dependable laboratory results.",
              icon: <CheckCircleFilled />,
              color: "#389e63",
              background: "#f0fff4",
            },
            {
              title: "Secure Medical Reports",
              description:
                "Access your medical reports through a convenient platform with privacy in mind.",
              icon: <FileProtectOutlined />,
              color: "#3867c8",
              background: "#edf3ff",
            },
            {
              title: "Convenient Online Booking",
              description:
                "Explore available tests and manage your diagnostic bookings with ease.",
              icon: <ClockCircleOutlined />,
              color: "#d68b22",
              background: "#fff7e6",
            },
            {
              title: "Affordable Healthcare",
              description:
                "Explore accessible diagnostic services with transparent sample pricing.",
              icon: <HeartOutlined />,
              color: "#e05275",
              background: "#fff0f3",
            },
            {
              title: "Reliable Customer Support",
              description:
                "Get assistance with your bookings, tests, and general service enquiries.",
              icon: <CustomerServiceOutlined />,
              color: "#8b5cc7",
              background: "#f5edff",
            },
          ].map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                bordered
                style={{
                  height: "100%",
                  borderRadius: 16,
                  borderColor: "#edf0f2",
                }}
                styles={{
                  body: {
                    padding: 28,
                  },
                }}
              >
                <Flex vertical gap={18}>
                  <Flex
                    align="center"
                    justify="center"
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 14,
                      background: feature.background,
                      color: feature.color,
                      fontSize: 30,
                    }}
                  >
                    {feature.icon}
                  </Flex>

                  <Title level={4} style={{ margin: 0 }}>
                    {feature.title}
                  </Title>

                  <Paragraph
                    style={{
                      color: "#64748b",
                      margin: 0,
                      lineHeight: 1.8,
                      minHeight: 75,
                    }}
                  >
                    {feature.description}
                  </Paragraph>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      {/* How It Works Section */}

      <section
        style={{
          padding: "80px 6%",
          background: "#f5fafb",
        }}
      >
        <Flex vertical align="center" gap={16} style={{ marginBottom: 50 }}>
          <Tag color="cyan">SIMPLE PROCESS</Tag>

          <Title
            level={2}
            style={{
              margin: 0,
              textAlign: "center",
              color: "#12343b",
            }}
          >
            How LabConnect Works
          </Title>

          <Paragraph
            style={{
              maxWidth: 650,
              textAlign: "center",
              color: "#64748b",
              fontSize: 16,
            }}
          >
            Getting started with your diagnostic journey is simple. Follow these
            four easy steps to book your test and access your reports.
          </Paragraph>
        </Flex>

        <Row gutter={[24, 24]}>
          {[
            {
              step: "01",
              title: "Explore Tests",
              description:
                "Browse our range of diagnostic tests and healthcare services.",
              icon: <SearchOutlined />,
            },
            {
              step: "02",
              title: "Choose Your Test",
              description:
                "Select the diagnostic test that matches your healthcare needs.",
              icon: <FileTextOutlined />,
            },
            {
              step: "03",
              title: "Book Appointment",
              description:
                "Choose a convenient appointment and complete your booking.",
              icon: <CalendarOutlined />,
            },
            {
              step: "04",
              title: "Get Your Reports",
              description:
                "Access your diagnostic reports conveniently through your account.",
              icon: <UserOutlined />,
            },
          ].map((item, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                bordered={false}
                style={{
                  height: "100%",
                  borderRadius: 16,
                  textAlign: "center",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
                }}
                styles={{
                  body: {
                    padding: 28,
                  },
                }}
              >
                <Flex vertical align="center" gap={18}>
                  <Flex
                    align="center"
                    justify="center"
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: "50%",
                      background: "#e6f7f8",
                      color: "#087f8c",
                      fontSize: 32,
                    }}
                  >
                    {item.icon}
                  </Flex>

                  <Tag color="cyan">STEP {item.step}</Tag>

                  <Title level={4} style={{ margin: 0 }}>
                    {item.title}
                  </Title>

                  <Paragraph
                    style={{
                      color: "#64748b",
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </Paragraph>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      {/* LabConnect Statistics Section */}

      <section
        style={{
          padding: "80px 6%",
          background: "#ffffff",
        }}
      >
        <Flex vertical align="center" gap={16} style={{ marginBottom: 50 }}>
          <Tag color="cyan">OUR ACHIEVEMENTS</Tag>

          <Title
            level={2}
            style={{
              margin: 0,
              textAlign: "center",
              color: "#12343b",
            }}
          >
            LabConnect at a Glance
          </Title>

          <Paragraph
            style={{
              maxWidth: 650,
              textAlign: "center",
              color: "#64748b",
              fontSize: 16,
            }}
          >
            Making diagnostic healthcare more accessible through convenient
            services and a patient-focused experience.
          </Paragraph>
        </Flex>

        <Row gutter={[24, 24]}>
          {[
            {
              title: "Diagnostic Tests",
              value: 120,
              suffix: "+",
              icon: <ExperimentOutlined />,
              color: "#087f8c",
              background: "#e6f7f8",
            },
            {
              title: "Healthcare Services",
              value: 25,
              suffix: "+",
              icon: <MedicineBoxOutlined />,
              color: "#3867c8",
              background: "#edf3ff",
            },
            {
              title: "Happy Patients",
              value: 5000,
              suffix: "+",
              icon: <TeamOutlined />,
              color: "#389e63",
              background: "#f0fff4",
            },
            {
              title: "Customer Satisfaction",
              value: 98,
              suffix: "%",
              icon: <TrophyOutlined />,
              color: "#d68b22",
              background: "#fff7e6",
            },
          ].map((item, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                bordered={false}
                style={{
                  height: "100%",
                  borderRadius: 16,
                  background: item.background,
                  textAlign: "center",
                }}
                styles={{
                  body: {
                    padding: 28,
                  },
                }}
              >
                <Flex vertical align="center" gap={16}>
                  <div
                    style={{
                      fontSize: 34,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>

                  <Statistic
                    title={item.title}
                    value={item.value}
                    suffix={item.suffix}
                    valueStyle={{
                      color: item.color,
                      fontSize: 32,
                      fontWeight: 700,
                    }}
                  />
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      {/* Patient Testimonials Section */}

      <section
        style={{
          padding: "80px 6%",
          background: "#f5fafb",
        }}
      >
        <Flex vertical align="center" gap={16} style={{ marginBottom: 50 }}>
          <Tag color="cyan">PATIENT FEEDBACK</Tag>

          <Title
            level={2}
            style={{
              margin: 0,
              textAlign: "center",
              color: "#12343b",
            }}
          >
            What Our Patients Say
          </Title>

          <Paragraph
            style={{
              maxWidth: 650,
              textAlign: "center",
              color: "#64748b",
              fontSize: 16,
            }}
          >
            Discover how a simple and convenient diagnostic experience can make
            healthcare easier for everyone.
          </Paragraph>
        </Flex>

        <Row gutter={[24, 24]}>
          {[
            {
              name: "Priya Sharma",
              role: "Patient",
              feedback:
                "The booking process was simple and convenient. I could easily explore the available tests and manage my appointment.",
            },
            {
              name: "Rahul Verma",
              role: "Patient",
              feedback:
                "I really liked the clean interface and easy navigation. Finding the diagnostic services I needed was straightforward.",
            },
            {
              name: "Ananya Reddy",
              role: "Patient",
              feedback:
                "The platform makes managing diagnostic bookings much easier. The overall experience was smooth and user-friendly.",
            },
          ].map((review, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                bordered
                style={{
                  height: "100%",
                  borderRadius: 16,
                  borderColor: "#edf0f2",
                }}
                styles={{
                  body: {
                    padding: 28,
                  },
                }}
              >
                <Flex vertical gap={18}>
                  <Flex justify="space-between" align="center">
                    <StarFilled
                      style={{
                        fontSize: 28,
                        color: "#fadb14",
                      }}
                    />

                    <Text type="secondary">Patient Review</Text>
                  </Flex>

                  <Rate disabled defaultValue={5} />

                  <Paragraph
                    style={{
                      color: "#64748b",
                      lineHeight: 1.9,
                      margin: 0,
                      minHeight: 105,
                    }}
                  >
                    "{review.feedback}"
                  </Paragraph>

                  <Divider style={{ margin: "4px 0" }} />

                  <Flex align="center" gap={14}>
                    <Flex
                      align="center"
                      justify="center"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "#e6f7f8",
                        color: "#087f8c",
                        fontSize: 22,
                      }}
                    >
                      <UserOutlined />
                    </Flex>

                    <Flex vertical gap={2}>
                      <Text strong>{review.name}</Text>
                      <Text type="secondary">{review.role}</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
}

export default Home;
