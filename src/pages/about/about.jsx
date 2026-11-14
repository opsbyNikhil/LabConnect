import { Link } from "react-router-dom";

import { Button, Card, Col, Flex, Row, Space, Tag, Typography } from "antd";

import {
  ExperimentOutlined,
  ArrowRightOutlined,
  SafetyCertificateOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  AimOutlined,
  EyeOutlined,
  HeartFilled,
  SafetyOutlined,
  BulbOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  UserOutlined,
  CalendarOutlined,
  LockOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function About() {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* About Hero Section */}

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
                <HeartOutlined /> ABOUT LABCONNECT
              </Tag>

              <Title
                style={{
                  fontSize: "clamp(36px, 5vw, 58px)",
                  lineHeight: 1.2,
                  margin: 0,
                  color: "#12343b",
                }}
              >
                Connecting Healthcare,
                <br />
                <span style={{ color: "#087f8c" }}>Empowering Lives.</span>
              </Title>

              <Paragraph
                style={{
                  fontSize: 17,
                  color: "#64748b",
                  lineHeight: 1.9,
                  maxWidth: 600,
                }}
              >
                LabConnect is a modern diagnostic and laboratory management
                platform designed to make healthcare services more accessible.
                We simplify the way people explore diagnostic tests, manage
                appointments, and access laboratory information.
              </Paragraph>

              <Space wrap size={16}>
                <Link to="/services">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ExperimentOutlined />}
                  >
                    Explore Services
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
                  <HeartOutlined style={{ color: "#087f8c" }} /> Patient First
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
                  style={{
                    fontSize: 100,
                    color: "#ffffff",
                  }}
                />

                <Title
                  level={2}
                  style={{
                    color: "#ffffff",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  LabConnect
                </Title>

                <Text
                  style={{
                    color: "#e6f7f8",
                    fontSize: 16,
                  }}
                >
                  Your Health, Our Priority.
                </Text>
              </div>
            </Flex>
          </Col>
        </Row>
      </section>
      {/* Who We Are Section */}

      <section
        style={{
          padding: "80px 6%",
          background: "#ffffff",
        }}
      >
        <Row align="middle" gutter={[48, 48]}>
          {/* Left Content */}

          <Col xs={24} lg={12}>
            <Space orientation="vertical" size={20} style={{ width: "100%" }}>
              <Tag color="cyan">WHO WE ARE</Tag>

              <Title
                level={2}
                style={{
                  margin: 0,
                  color: "#12343b",
                }}
              >
                Making Diagnostic Healthcare
                <span style={{ color: "#087f8c" }}> Simpler.</span>
              </Title>

              <Paragraph
                style={{
                  color: "#64748b",
                  fontSize: 16,
                  lineHeight: 1.9,
                }}
              >
                LabConnect is a frontend demonstration of a modern diagnostic
                and laboratory management platform. It brings essential
                healthcare information and diagnostic booking experiences
                together in one convenient digital space.
              </Paragraph>

              <Paragraph
                style={{
                  color: "#64748b",
                  fontSize: 16,
                  lineHeight: 1.9,
                }}
              >
                Our platform is designed around accessibility, convenience, and
                a patient-first experience. From exploring diagnostic services
                to managing appointments, we aim to make the journey easier to
                understand and navigate.
              </Paragraph>

              <Flex align="center" gap={12}>
                <CheckCircleOutlined
                  style={{ fontSize: 20, color: "#087f8c" }}
                />
                <Text strong>Simple and convenient user experience</Text>
              </Flex>

              <Flex align="center" gap={12}>
                <CheckCircleOutlined
                  style={{ fontSize: 20, color: "#087f8c" }}
                />
                <Text strong>Accessible diagnostic information</Text>
              </Flex>

              <Flex align="center" gap={12}>
                <CheckCircleOutlined
                  style={{ fontSize: 20, color: "#087f8c" }}
                />
                <Text strong>Patient-focused platform design</Text>
              </Flex>
            </Space>
          </Col>

          {/* Right Content */}

          <Col xs={24} lg={12}>
            <Flex vertical gap={20}>
              <Card
                bordered={false}
                style={{
                  borderRadius: 16,
                  background: "#e6f7f8",
                }}
              >
                <Flex align="center" gap={20}>
                  <MedicineBoxOutlined
                    style={{ fontSize: 36, color: "#087f8c" }}
                  />

                  <div>
                    <Title level={4} style={{ margin: 0 }}>
                      Diagnostic Services
                    </Title>
                    <Paragraph style={{ color: "#64748b", margin: "6px 0 0" }}>
                      Explore a range of laboratory and diagnostic services.
                    </Paragraph>
                  </div>
                </Flex>
              </Card>

              <Card
                bordered={false}
                style={{
                  borderRadius: 16,
                  background: "#edf3ff",
                }}
              >
                <Flex align="center" gap={20}>
                  <TeamOutlined style={{ fontSize: 36, color: "#3867c8" }} />

                  <div>
                    <Title level={4} style={{ margin: 0 }}>
                      Patient-Centered Experience
                    </Title>
                    <Paragraph style={{ color: "#64748b", margin: "6px 0 0" }}>
                      Designed to make healthcare navigation simple and clear.
                    </Paragraph>
                  </div>
                </Flex>
              </Card>

              <Card
                bordered={false}
                style={{
                  borderRadius: 16,
                  background: "#f0fff4",
                }}
              >
                <Flex align="center" gap={20}>
                  <CheckCircleOutlined
                    style={{ fontSize: 36, color: "#389e63" }}
                  />

                  <div>
                    <Title level={4} style={{ margin: 0 }}>
                      Convenient Management
                    </Title>
                    <Paragraph style={{ color: "#64748b", margin: "6px 0 0" }}>
                      A streamlined way to explore tests and manage bookings.
                    </Paragraph>
                  </div>
                </Flex>
              </Card>
            </Flex>
          </Col>
        </Row>
      </section>
      {/* Mission & Vision Section */}

      <section
        style={{
          padding: "80px 6%",
          background: "#f5fafb",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag color="cyan">OUR PURPOSE</Tag>

          <Title level={2} style={{ color: "#12343b", marginTop: 16 }}>
            Our Mission & Vision
          </Title>

          <Paragraph
            style={{
              color: "#64748b",
              fontSize: 16,
              maxWidth: 650,
              margin: "0 auto",
            }}
          >
            Guided by a clear purpose and a vision for better digital healthcare
            experiences.
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} justify="center">
          {/* Mission Card */}

          <Col xs={24} md={12}>
            <Card
              bordered={false}
              style={{
                height: "100%",
                minHeight: 280,
                borderRadius: 20,
                background: "#ffffff",
                boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
              }}
              bodyStyle={{ padding: 36 }}
            >
              <Flex vertical gap={20}>
                <Flex
                  align="center"
                  justify="center"
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 18,
                    background: "#e6f7f8",
                  }}
                >
                  <AimOutlined style={{ fontSize: 34, color: "#087f8c" }} />
                </Flex>

                <Title level={3} style={{ margin: 0, color: "#12343b" }}>
                  Our Mission
                </Title>

                <Paragraph
                  style={{
                    color: "#64748b",
                    fontSize: 16,
                    lineHeight: 1.9,
                    margin: 0,
                  }}
                >
                  To simplify the diagnostic healthcare journey through an
                  accessible digital platform that helps people explore
                  laboratory services, understand available tests, and manage
                  appointments conveniently.
                </Paragraph>
              </Flex>
            </Card>
          </Col>

          {/* Vision Card */}

          <Col xs={24} md={12}>
            <Card
              bordered={false}
              style={{
                height: "100%",
                minHeight: 280,
                borderRadius: 20,
                background: "#ffffff",
                boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
              }}
              bodyStyle={{ padding: 36 }}
            >
              <Flex vertical gap={20}>
                <Flex
                  align="center"
                  justify="center"
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 18,
                    background: "#edf3ff",
                  }}
                >
                  <EyeOutlined style={{ fontSize: 34, color: "#3867c8" }} />
                </Flex>

                <Title level={3} style={{ margin: 0, color: "#12343b" }}>
                  Our Vision
                </Title>

                <Paragraph
                  style={{
                    color: "#64748b",
                    fontSize: 16,
                    lineHeight: 1.9,
                    margin: 0,
                  }}
                >
                  To build a connected digital healthcare experience where
                  technology makes diagnostic information easier to access and
                  healthcare management simpler for everyone.
                </Paragraph>
              </Flex>
            </Card>
          </Col>
        </Row>
      </section>
      {/* Core Values Section */}

      <section
        style={{
          padding: "80px 6%",
          background: "#ffffff",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag color="cyan">WHAT GUIDES US</Tag>

          <Title level={2} style={{ color: "#12343b", marginTop: 16 }}>
            Our Core Values
          </Title>

          <Paragraph
            style={{
              color: "#64748b",
              fontSize: 16,
              maxWidth: 650,
              margin: "0 auto",
            }}
          >
            The principles behind every feature and experience we design for the
            LabConnect platform.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {/* Patient First */}

          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              hoverable
              style={{
                height: "100%",
                borderRadius: 18,
                background: "#fff5f5",
                textAlign: "center",
              }}
              bodyStyle={{ padding: "32px 20px" }}
            >
              <HeartFilled
                style={{ fontSize: 42, color: "#e85d75", marginBottom: 20 }}
              />

              <Title level={4} style={{ color: "#12343b" }}>
                Patient First
              </Title>

              <Paragraph style={{ color: "#64748b", marginBottom: 0 }}>
                Designing every interaction around patient needs, convenience,
                and understanding.
              </Paragraph>
            </Card>
          </Col>

          {/* Trust & Transparency */}

          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              hoverable
              style={{
                height: "100%",
                borderRadius: 18,
                background: "#e6f7f8",
                textAlign: "center",
              }}
              bodyStyle={{ padding: "32px 20px" }}
            >
              <SafetyOutlined
                style={{ fontSize: 42, color: "#087f8c", marginBottom: 20 }}
              />

              <Title level={4} style={{ color: "#12343b" }}>
                Trust & Transparency
              </Title>

              <Paragraph style={{ color: "#64748b", marginBottom: 0 }}>
                Presenting clear, understandable information to support informed
                decisions.
              </Paragraph>
            </Card>
          </Col>

          {/* Innovation */}

          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              hoverable
              style={{
                height: "100%",
                borderRadius: 18,
                background: "#fff9e6",
                textAlign: "center",
              }}
              bodyStyle={{ padding: "32px 20px" }}
            >
              <BulbOutlined
                style={{ fontSize: 42, color: "#d89614", marginBottom: 20 }}
              />

              <Title level={4} style={{ color: "#12343b" }}>
                Innovation
              </Title>

              <Paragraph style={{ color: "#64748b", marginBottom: 0 }}>
                Exploring modern technology to create simpler digital healthcare
                experiences.
              </Paragraph>
            </Card>
          </Col>

          {/* Accessibility */}

          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              hoverable
              style={{
                height: "100%",
                borderRadius: 18,
                background: "#f0fff4",
                textAlign: "center",
              }}
              bodyStyle={{ padding: "32px 20px" }}
            >
              <GlobalOutlined
                style={{ fontSize: 42, color: "#389e63", marginBottom: 20 }}
              />

              <Title level={4} style={{ color: "#12343b" }}>
                Accessibility
              </Title>

              <Paragraph style={{ color: "#64748b", marginBottom: 0 }}>
                Making diagnostic information and platform features easier to
                explore.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </section>
      {/* Why Choose LabConnect Section */}

      <section
        style={{
          padding: "80px 6%",
          background: "#f5fafb",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag color="cyan">WHY LABCONNECT</Tag>

          <Title level={2} style={{ color: "#12343b", marginTop: 16 }}>
            Healthcare, Made Simpler
          </Title>

          <Paragraph
            style={{
              color: "#64748b",
              fontSize: 16,
              maxWidth: 650,
              margin: "0 auto",
            }}
          >
            Discover a convenient digital experience designed to make diagnostic
            information and appointment management easier.
          </Paragraph>
        </div>

        <Row gutter={[24, 32]}>
          {/* Benefit 1 */}

          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              style={{
                height: "100%",
                borderRadius: 18,
                background: "#ffffff",
                textAlign: "center",
              }}
              bodyStyle={{ padding: "32px 20px" }}
            >
              <ThunderboltOutlined
                style={{ fontSize: 40, color: "#087f8c", marginBottom: 20 }}
              />

              <Title level={4}>Easy to Use</Title>

              <Paragraph style={{ color: "#64748b", marginBottom: 0 }}>
                Explore services and navigate the platform through a simple,
                user-friendly interface.
              </Paragraph>
            </Card>
          </Col>

          {/* Benefit 2 */}

          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              style={{
                height: "100%",
                borderRadius: 18,
                background: "#ffffff",
                textAlign: "center",
              }}
              bodyStyle={{ padding: "32px 20px" }}
            >
              <UserOutlined
                style={{ fontSize: 40, color: "#3867c8", marginBottom: 20 }}
              />

              <Title level={4}>Patient Focused</Title>

              <Paragraph style={{ color: "#64748b", marginBottom: 0 }}>
                A digital experience designed around patient convenience and
                accessibility.
              </Paragraph>
            </Card>
          </Col>

          {/* Benefit 3 */}

          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              style={{
                height: "100%",
                borderRadius: 18,
                background: "#ffffff",
                textAlign: "center",
              }}
              bodyStyle={{ padding: "32px 20px" }}
            >
              <CalendarOutlined
                style={{ fontSize: 40, color: "#d89614", marginBottom: 20 }}
              />

              <Title level={4}>Booking Convenience</Title>

              <Paragraph style={{ color: "#64748b", marginBottom: 0 }}>
                Explore diagnostic tests and manage appointments through one
                platform.
              </Paragraph>
            </Card>
          </Col>

          {/* Benefit 4 */}

          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              style={{
                height: "100%",
                borderRadius: 18,
                background: "#ffffff",
                textAlign: "center",
              }}
              bodyStyle={{ padding: "32px 20px" }}
            >
              <LockOutlined
                style={{ fontSize: 40, color: "#389e63", marginBottom: 20 }}
              />

              <Title level={4}>Privacy Awareness</Title>

              <Paragraph style={{ color: "#64748b", marginBottom: 0 }}>
                Designed with user privacy and responsible information handling
                in mind.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </section>
      {/* About Page CTA Section */}

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
            Your Healthcare Journey Starts Here
          </Title>

          <Paragraph
            style={{
              color: "#e6f7f8",
              fontSize: 17,
              maxWidth: 650,
              margin: "0 auto 28px",
            }}
          >
            Explore LabConnect and discover a simpler way to access diagnostic
            information and manage your healthcare appointments.
          </Paragraph>

          <Flex justify="center" wrap="wrap" gap={16}>
            <Link to="/services">
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
                Explore Services <ArrowRightOutlined />
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

export default About;
