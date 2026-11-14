import { useMemo, useState } from "react";
import {
  Card,
  Table,
  Input,
  Typography,
  Space,
  Tag,
  Row,
  Col,
  Statistic,
  Empty,
} from "antd";

import {
  SearchOutlined,
  ExperimentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import useLocalStorage from "../../hooks/useLocalStorage";
import initialTests from "../../data/tests";

const { Title, Text } = Typography;

function ManageTests() {
  const [tests] = useLocalStorage("labconnect_tests", initialTests);
  const [searchText, setSearchText] = useState("");

  const filteredTests = useMemo(() => {
    const search = searchText.toLowerCase();

    return tests.filter(
      (test) =>
        test.name?.toLowerCase().includes(search) ||
        test.category?.toLowerCase().includes(search) ||
        test.description?.toLowerCase().includes(search),
    );
  }, [tests, searchText]);

  const columns = [
    {
      title: "Test Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <Space>
          <ExperimentOutlined style={{ color: "#087f8c", fontSize: 18 }} />
          <Text strong style={{ color: "#12343b" }}>
            {name}
          </Text>
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        const colors = {
          blood: "blue",
          heart: "red",
          imaging: "purple",
          health: "green",
        };

        return (
          <Tag color={colors[category] || "default"}>
            {category?.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <Text strong style={{ color: "#087f8c" }}>
          ₹{Number(price).toLocaleString("en-IN")}
        </Text>
      ),
    },
    {
      title: "Report Time",
      dataIndex: "reportTime",
      key: "reportTime",
      render: (time) => (
        <Space>
          <ClockCircleOutlined style={{ color: "#087f8c" }} />
          {time}
        </Space>
      ),
    },
    {
      title: "Fasting",
      dataIndex: "fasting",
      key: "fasting",
      render: (fasting) => (
        <Tag color={fasting === "Not Required" ? "success" : "warning"}>
          {fasting}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1600, margin: "0 auto" }}>
      <div style={{ marginBottom: 26 }}>
        <Title level={2} style={{ color: "#12343b", marginBottom: 6 }}>
          Manage Tests
        </Title>

        <Text type="secondary">
          Manage diagnostic tests, pricing, categories, and test information.
        </Text>
      </div>

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 18px rgba(18,52,59,0.04)",
            }}
          >
            <Statistic
              title="Total Diagnostic Tests"
              value={tests.length}
              prefix={<ExperimentOutlined style={{ color: "#087f8c" }} />}
              valueStyle={{ color: "#12343b", fontWeight: 700 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 18px rgba(18,52,59,0.04)",
            }}
          >
            <Statistic
              title="Average Test Price"
              value={
                tests.length
                  ? Math.round(
                      tests.reduce(
                        (total, test) => total + Number(test.price || 0),
                        0,
                      ) / tests.length,
                    )
                  : 0
              }
              prefix={<DollarOutlined style={{ color: "#087f8c" }} />}
              suffix="INR"
              valueStyle={{ color: "#12343b", fontWeight: 700 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 18px rgba(18,52,59,0.04)",
            }}
          >
            <Statistic
              title="Available Categories"
              value={new Set(tests.map((test) => test.category)).size}
              prefix={<ClockCircleOutlined style={{ color: "#087f8c" }} />}
              valueStyle={{ color: "#12343b", fontWeight: 700 }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        bordered={false}
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 18px rgba(18,52,59,0.04)",
        }}
        title={
          <Space>
            <ExperimentOutlined style={{ color: "#087f8c" }} />
            <span>Diagnostic Test Directory</span>
          </Space>
        }
        extra={<Text type="secondary">{filteredTests.length} tests found</Text>}
      >
        <div style={{ marginBottom: 22 }}>
          <Input
            placeholder="Search by test name, category or description..."
            prefix={<SearchOutlined style={{ color: "#087f8c" }} />}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            allowClear
            size="large"
            style={{ maxWidth: 450, borderRadius: 8 }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredTests}
          rowKey="id"
          pagination={{
            pageSize: 8,
            showSizeChanger: true,
            showTotal: (total) => `Total ₹{total} tests`,
          }}
          scroll={{ x: 850 }}
          locale={{
            emptyText: (
              <Empty
                description={
                  searchText
                    ? "No matching tests found"
                    : "No diagnostic tests available"
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      </Card>
    </div>
  );
}

export default ManageTests;
