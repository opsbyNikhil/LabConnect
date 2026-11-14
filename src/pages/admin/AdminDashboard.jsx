import {
  Row,
  Col,
  Card,
  Statistic,
  Typography,
  Tag,
  Empty,
  Button,
  Space,
  Table,
  Avatar,
} from "antd";

import {
  TeamOutlined,
  ExperimentOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ArrowRightOutlined,
  UserAddOutlined,
  CalendarFilled,
  ClockCircleOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import tests from "../../data/tests";
import useLocalStorage from "../../hooks/useLocalStorage";

const { Title, Text } = Typography;

const chartColors = ["#087f8c", "#1677ff", "#faad14", "#722ed1"];

const cardStyle = {
  borderRadius: 16,
  border: "1px solid #edf1f5",
  boxShadow: "0 4px 18px rgba(18, 52, 59, 0.04)",
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function AdminDashboard() {
  const [users] = useLocalStorage("labconnect_users", []);
  const [bookings] = useLocalStorage("labconnect_bookings", []);
  const [reports] = useLocalStorage("labconnect_reports", []);

  // Booking trends
  const bookingTrends = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - (5 - index));

    const count = bookings.filter((booking) => {
      const bookingDate = new Date(booking.createdAt);

      return (
        !isNaN(bookingDate.getTime()) &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear()
      );
    }).length;

    return {
      month: date.toLocaleString("en-IN", { month: "short" }),
      bookings: count,
    };
  });

  // Patient registrations
  const patientRegistrations = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - (5 - index));

    const count = users.filter((user) => {
      const registrationDate = new Date(user.createdAt);

      return (
        !isNaN(registrationDate.getTime()) &&
        registrationDate.getMonth() === date.getMonth() &&
        registrationDate.getFullYear() === date.getFullYear()
      );
    }).length;

    return {
      month: date.toLocaleString("en-IN", { month: "short" }),
      patients: count,
    };
  });

  // Booking status distribution
  const bookingStatuses = ["Confirmed", "Pending", "Cancelled"];

  const bookingStatusData = bookingStatuses
    .map((status) => ({
      name: status,
      value: bookings.filter(
        (booking) => booking.status?.toLowerCase() === status.toLowerCase(),
      ).length,
    }))
    .filter((item) => item.value > 0);

  // Test distribution
  const testDistribution = tests.map((test) => ({
    test: test.name,
    bookings: bookings.filter(
      (booking) => Number(booking.testId) === Number(test.id),
    ).length,
  }));

  // Statistics
  const statistics = [
    {
      title: "Total Patients",
      value: users.length,
      icon: <TeamOutlined />,
      color: "#087f8c",
      background: "#e6f7f8",
      description: "Registered patients",
    },
    {
      title: "Total Tests",
      value: tests.length,
      icon: <ExperimentOutlined />,
      color: "#1677ff",
      background: "#e6f4ff",
      description: "Available diagnostic tests",
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: <CalendarOutlined />,
      color: "#722ed1",
      background: "#f9f0ff",
      description: "All test appointments",
    },
    {
      title: "Total Reports",
      value: reports.length,
      icon: <FileTextOutlined />,
      color: "#389e0d",
      background: "#f6ffed",
      description: "Uploaded medical reports",
    },
  ];

  // Recent bookings
  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    )
    .slice(0, 5);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      case "completed":
        return "processing";
      default:
        return "default";
    }
  };

  const bookingColumns = [
    {
      title: "Patient",
      dataIndex: "patientName",
      key: "patientName",
      render: (name) => (
        <Space>
          <Avatar
            style={{
              background: "#e6f7f8",
              color: "#087f8c",
              fontWeight: 600,
            }}
          >
            {name?.charAt(0)?.toUpperCase() || "P"}
          </Avatar>

          <Text strong style={{ color: "#12343b" }}>
            {name || "Unknown Patient"}
          </Text>
        </Space>
      ),
    },
    {
      title: "Diagnostic Test",
      dataIndex: "testName",
      key: "testName",
      render: (name) => <Text style={{ color: "#52636a" }}>{name || "—"}</Text>,
    },
    {
      title: "Appointment",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (date) => (
        <Space size={6}>
          <CalendarFilled style={{ color: "#087f8c" }} />
          {formatDate(date)}
        </Space>
      ),
    },
    {
      title: "Time Slot",
      dataIndex: "timeSlot",
      key: "timeSlot",
      render: (time) => (
        <Space size={6}>
          <ClockCircleOutlined style={{ color: "#8c8c8c" }} />
          {time || "—"}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status || "Unknown"}</Tag>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1600,
        margin: "0 auto",
        paddingBottom: 24,
      }}
    >
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(120deg, #087f8c 0%, #075b68 100%)",
          borderRadius: 18,
          padding: "30px 32px",
          marginBottom: 28,
          color: "#ffffff",
          boxShadow: "0 8px 24px rgba(8, 127, 140, 0.18)",
        }}
      >
        <Row align="middle" justify="space-between" gutter={[20, 20]}>
          <Col xs={24} md={15}>
            <Text
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: 13,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Administration Overview
            </Text>

            <Title
              level={2}
              style={{
                color: "#ffffff",
                margin: "8px 0",
                fontWeight: 700,
              }}
            >
              Welcome to LabConnect!
            </Title>

            <Text style={{ color: "rgba(255,255,255,0.85)" }}>
              Manage patients, diagnostic tests, appointments and medical
              reports from one place.
            </Text>

            <div style={{ marginTop: 22 }}>
              <Space wrap>
                <Link to="/admin/bookings">
                  <Button
                    type="primary"
                    ghost
                    icon={<CalendarOutlined />}
                    style={{
                      borderColor: "#ffffff",
                      color: "#ffffff",
                    }}
                  >
                    Manage Bookings
                  </Button>
                </Link>

                <Link to="/admin/patients">
                  <Button
                    icon={<UserAddOutlined />}
                    style={{
                      background: "#ffffff",
                      color: "#087f8c",
                      border: "none",
                    }}
                  >
                    View Patients
                  </Button>
                </Link>
              </Space>
            </div>
          </Col>

          <Col xs={24} md={9} style={{ textAlign: "right" }}>
            <div
              style={{
                display: "inline-block",
                padding: "16px 20px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.12)",
              }}
            >
              <Text
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.75)",
                  marginBottom: 6,
                }}
              >
                Today's Date
              </Text>

              <Title level={4} style={{ color: "#ffffff", margin: 0 }}>
                {new Date().toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </Title>
            </div>
          </Col>
        </Row>
      </div>

      {/* Statistics */}
      <Row gutter={[20, 20]}>
        {statistics.map((item) => (
          <Col xs={24} sm={12} xl={6} key={item.title}>
            <Card
              bordered={false}
              style={cardStyle}
              styles={{ body: { padding: 22 } }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <Text
                    style={{
                      color: "#75858b",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </Text>

                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#12343b",
                      marginTop: 10,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.value.toLocaleString("en-IN")}
                  </div>
                </div>

                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: item.background,
                    color: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 23,
                  }}
                >
                  {item.icon}
                </div>
              </div>

              <Text
                type="secondary"
                style={{
                  display: "block",
                  marginTop: 14,
                  fontSize: 12,
                }}
              >
                {item.description}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Analytics Heading */}
      <div style={{ marginTop: 34, marginBottom: 18 }}>
        <Title level={4} style={{ color: "#12343b", marginBottom: 4 }}>
          Platform Analytics
        </Title>

        <Text type="secondary">
          Monitor booking activity, patient growth and diagnostic services.
        </Text>
      </div>

      {/* Booking Trends and Booking Status */}
      <Row gutter={[20, 20]}>
        <Col xs={24} xl={14}>
          <Card
            title="Booking Trends"
            bordered={false}
            style={cardStyle}
            styles={{ body: { padding: 24 } }}
          >
            <Text type="secondary">
              Monthly booking activity over the last six months
            </Text>

            <div style={{ height: 300, marginTop: 20 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={bookingTrends}
                  margin={{ top: 10, right: 15, left: -15, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#edf1f5"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#75858b", fontSize: 12 }}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#75858b", fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid #edf1f5",
                    }}
                  />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="bookings"
                    name="Bookings"
                    stroke="#087f8c"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#087f8c" }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} xl={10}>
          <Card
            title="Booking Status"
            bordered={false}
            style={cardStyle}
            styles={{ body: { padding: 24 } }}
          >
            <Text type="secondary">Distribution of appointment statuses</Text>

            <div style={{ height: 300, marginTop: 20 }}>
              {bookingStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bookingStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      innerRadius={65}
                      outerRadius={105}
                      paddingAngle={4}
                      label
                    >
                      {bookingStatusData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Empty description="No booking data available" />
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Patient and Test Analytics */}
      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} xl={12}>
          <Card
            title="Patient Registrations"
            bordered={false}
            style={cardStyle}
            styles={{ body: { padding: 24 } }}
          >
            <Text type="secondary">
              New patient registrations over the last six months
            </Text>

            <div style={{ height: 300, marginTop: 20 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={patientRegistrations}
                  margin={{ top: 10, right: 10, left: -15, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#edf1f5"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#75858b", fontSize: 12 }}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#75858b", fontSize: 12 }}
                  />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="patients"
                    name="New Patients"
                    fill="#1677ff"
                    radius={[7, 7, 0, 0]}
                    barSize={34}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} xl={12}>
          <Card
            title="Bookings by Diagnostic Test"
            bordered={false}
            style={cardStyle}
            styles={{ body: { padding: 24 } }}
          >
            <Text type="secondary">
              Number of appointments for each diagnostic test
            </Text>

            <div style={{ height: 300, marginTop: 20 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={testDistribution}
                  margin={{ top: 10, right: 10, left: -15, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#edf1f5"
                  />

                  <XAxis
                    dataKey="test"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#75858b", fontSize: 10 }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                    height={65}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#75858b", fontSize: 12 }}
                  />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="bookings"
                    name="Bookings"
                    fill="#722ed1"
                    radius={[7, 7, 0, 0]}
                    barSize={34}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Bookings */}
      <div style={{ marginTop: 34, marginBottom: 18 }}>
        <Title level={4} style={{ color: "#12343b", marginBottom: 4 }}>
          Recent Bookings
        </Title>

        <Text type="secondary">
          Latest patient appointments registered on LabConnect.
        </Text>
      </div>

      <Card
        bordered={false}
        style={cardStyle}
        styles={{ body: { padding: 0 } }}
        title="Latest Appointments"
        extra={
          <Link to="/admin/bookings">
            <Button
              type="link"
              icon={<ArrowRightOutlined />}
              iconPlacement="end"
            >
              View All
            </Button>
          </Link>
        }
      >
        <Table
          columns={bookingColumns}
          dataSource={recentBookings}
          rowKey="id"
          pagination={false}
          scroll={{ x: 750 }}
          locale={{
            emptyText: (
              <Empty
                description="No bookings available yet"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      </Card>
    </div>
  );
}

export default AdminDashboard;
