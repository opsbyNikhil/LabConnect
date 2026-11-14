import { useState } from "react";
import { Link } from "react-router-dom";
import tests from "../../data/tests";

import {
  Button,
  Card,
  Col,
  Flex,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  Empty,
} from "antd";

import {
  SearchOutlined,
  ExperimentOutlined,
  ArrowRightOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function TestListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter diagnostic tests
  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || test.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #e6f7f8 0%, #f5fafb 100%)",
          padding: "75px 24px",
          textAlign: "center",
        }}
      >
        <Tag color="cyan" style={{ marginBottom: 16, padding: "6px 14px" }}>
          <ExperimentOutlined /> Diagnostic Test Directory
        </Tag>

        <Title
          level={1}
          style={{
            color: "#12343b",
            fontSize: "42px",
            marginBottom: 16,
          }}
        >
          Find the Right Test for Your Health
        </Title>

        <Paragraph
          style={{
            color: "#64748b",
            fontSize: 17,
            maxWidth: 650,
            margin: "0 auto 28px",
          }}
        >
          Explore a wide range of diagnostic tests with transparent pricing,
          reliable reports, and convenient booking options.
        </Paragraph>

        <Space wrap>
          <Button
            type="primary"
            size="large"
            icon={<SearchOutlined />}
            onClick={() =>
              document
                .getElementById("test-search")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Tests
          </Button>

          <Button
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={() =>
              document
                .getElementById("test-search")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Learn More
          </Button>
        </Space>
      </section>

      {/* Search and Filter Section */}
      <section
        id="test-search"
        style={{ padding: "55px 6%", background: "#ffffff" }}
      >
        <Flex vertical align="center" gap={12} style={{ marginBottom: 30 }}>
          <Title level={2} style={{ color: "#12343b", margin: 0 }}>
            Explore Diagnostic Tests
          </Title>

          <Paragraph style={{ color: "#64748b", textAlign: "center" }}>
            Search and discover the right diagnostic test for your needs.
          </Paragraph>
        </Flex>

        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} md={15} lg={12}>
            <Input
              size="large"
              placeholder="Search tests by name..."
              prefix={<SearchOutlined style={{ color: "#087f8c" }} />}
              allowClear
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>

          <Col xs={24} md={9} lg={6}>
            <Select
              size="large"
              placeholder="Filter by category"
              style={{ width: "100%" }}
              suffix={<FilterOutlined />}
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value)}
              options={[
                { value: "all", label: "All Categories" },
                { value: "blood", label: "Blood Tests" },
                { value: "heart", label: "Heart Tests" },
                { value: "imaging", label: "Imaging Tests" },
                { value: "health", label: "Health Packages" },
              ]}
            />
          </Col>
        </Row>
      </section>

      {/* Diagnostic Test Cards */}
      <section style={{ padding: "30px 6% 70px", background: "#f5fafb" }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 24 }}
        >
          <Text strong style={{ color: "#12343b" }}>
            Available Diagnostic Tests
          </Text>

          <Tag color="cyan">{filteredTests.length} Tests Found</Tag>
        </Flex>
        <Row gutter={[24, 24]}>
          {filteredTests.length > 0 ? (
            filteredTests.map((test) => (
              <Col xs={24} sm={12} lg={8} key={test.id}>
                <Card
                  hoverable
                  style={{
                    height: "100%",
                    borderRadius: 12,
                  }}
                  actions={[
                    <Link to={`/tests/${test.id}`} key="details">
                      <Button type="link">View Details</Button>
                    </Link>,

                    <Link to={`/tests/${test.id}/book`} key="book">
                      <Button type="primary">Book Now</Button>
                    </Link>,
                  ]}
                >
                  <Space
                    orientation="vertical"
                    size={14}
                    style={{ width: "100%" }}
                  >
                    <Flex justify="space-between" align="center">
                      <Tag color="cyan">{test.category.toUpperCase()}</Tag>

                      <ExperimentOutlined
                        style={{
                          fontSize: 24,
                          color: "#087f8c",
                        }}
                      />
                    </Flex>

                    <Title
                      level={4}
                      style={{
                        color: "#12343b",
                        margin: 0,
                      }}
                    >
                      {test.name}
                    </Title>

                    <Paragraph
                      style={{
                        color: "#64748b",
                        minHeight: 48,
                      }}
                    >
                      {test.description}
                    </Paragraph>

                    <Title
                      level={3}
                      style={{
                        color: "#087f8c",
                        margin: 0,
                      }}
                    >
                      ₹{test.price}
                    </Title>

                    <Flex vertical gap={10}>
                      <Flex justify="space-between" align="center">
                        <Text type="secondary">Report Time</Text>
                        <Text strong style={{ color: "#12343b" }}>
                          {test.reportTime}
                        </Text>
                      </Flex>

                      <Flex justify="space-between" align="center">
                        <Text type="secondary">Fasting Required</Text>
                        <Tag
                          color={
                            test.fasting === "Not Required"
                              ? "success"
                              : "warning"
                          }
                        >
                          {test.fasting}
                        </Tag>
                      </Flex>
                    </Flex>
                  </Space>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Empty
                description="No diagnostic tests found"
                style={{ padding: "40px 0" }}
              />
            </Col>
          )}
        </Row>
      </section>
    </div>
  );
}

export default TestListing;
