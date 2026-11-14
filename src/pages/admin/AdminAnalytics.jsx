import { useMemo, useState } from "react";

import {
  Row,
  Col,
  Card,
  Statistic,
  Typography,
  Select,
  Space,
  Tag,
  Flex,
  Empty,
  Divider,
} from "antd";

import {
  TeamOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  FileTextOutlined,
  ExperimentOutlined,
  RiseOutlined,
} from "@ant-design/icons";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import useLocalStorage from "../../hooks/useLocalStorage";

const { Title, Text } = Typography;

const COLORS = [
  "#087f8c",
  "#16a34a",
  "#f59e0b",
  "#ef4444",
  "#6366f1",
  "#8b5cf6",
];

function AdminAnalytics() {
  // --------------------------------------------------
  // SHARED APPLICATION DATA
  // --------------------------------------------------

  const [users] = useLocalStorage("labconnect_users", []);

  const [bookings] = useLocalStorage("labconnect_bookings", []);

  const [reports] = useLocalStorage("labconnect_medical_reports", []);

  const [createdReports] = useLocalStorage("labconnect_created_reports", []);

  // --------------------------------------------------
  // FILTER
  // --------------------------------------------------

  const [timeFilter, setTimeFilter] = useState("All");

  // --------------------------------------------------
  // DATE FILTER HELPER
  // --------------------------------------------------

  const isWithinPeriod = (dateValue) => {
    if (timeFilter === "All") return true;

    if (!dateValue) return false;

    const recordDate = new Date(dateValue);

    if (Number.isNaN(recordDate.getTime())) return false;

    const now = new Date();

    const startDate = new Date();

    if (timeFilter === "7") {
      startDate.setDate(now.getDate() - 7);
    }

    if (timeFilter === "30") {
      startDate.setDate(now.getDate() - 30);
    }

    if (timeFilter === "12") {
      startDate.setFullYear(now.getFullYear() - 1);
    }

    return recordDate >= startDate && recordDate <= now;
  };

  // --------------------------------------------------
  // FILTERED DATA
  // --------------------------------------------------

  const filteredUsers = useMemo(() => {
    return users.filter((user) => isWithinPeriod(user.createdAt));
  }, [users, timeFilter]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) =>
      isWithinPeriod(booking.createdAt || booking.appointmentDate),
    );
  }, [bookings, timeFilter]);

  const filteredReports = useMemo(() => {
    const combinedReports = [...reports, ...createdReports];

    return combinedReports.filter((report) =>
      isWithinPeriod(report.createdAt || report.reportDate),
    );
  }, [reports, createdReports, timeFilter]);

  // --------------------------------------------------
  // BOOKING STATISTICS
  // --------------------------------------------------

  const analytics = useMemo(() => {
    const completed = filteredBookings.filter(
      (booking) => booking.status?.toLowerCase() === "completed",
    );

    const pending = filteredBookings.filter((booking) =>
      ["pending", "confirmed"].includes(booking.status?.toLowerCase()),
    );

    const cancelled = filteredBookings.filter(
      (booking) => booking.status?.toLowerCase() === "cancelled",
    );

    const bookingValue = filteredBookings.reduce(
      (total, booking) => total + (Number(booking.price) || 0),
      0,
    );

    const availableReports = filteredReports.filter(
      (report) => report.status === "Available",
    );

    const draftReports = filteredReports.filter(
      (report) => report.status === "Draft",
    );

    const pendingReports = filteredReports.filter(
      (report) => report.status === "Pending",
    );

    return {
      totalPatients: filteredUsers.length,
      totalBookings: filteredBookings.length,
      completedBookings: completed.length,
      pendingBookings: pending.length,
      cancelledBookings: cancelled.length,
      bookingValue,
      totalReports: filteredReports.length,
      availableReports: availableReports.length,
      draftReports: draftReports.length,
      pendingReports: pendingReports.length,
    };
  }, [filteredUsers, filteredBookings, filteredReports]);

  // --------------------------------------------------
  // MONTHLY BOOKING AND PATIENT GROWTH
  // --------------------------------------------------

  const monthlyTrend = useMemo(() => {
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();

      date.setDate(1);
      date.setMonth(date.getMonth() - i);

      const month = date.getMonth();
      const year = date.getFullYear();

      months.push({
        month,
        year,
        name: date.toLocaleDateString("en-IN", {
          month: "short",
          year: "2-digit",
        }),
        bookings: 0,
        patients: 0,
      });
    }

    filteredBookings.forEach((booking) => {
      const date = new Date(booking.createdAt || booking.appointmentDate);

      const item = months.find(
        (month) =>
          month.month === date.getMonth() && month.year === date.getFullYear(),
      );

      if (item) item.bookings++;
    });

    filteredUsers.forEach((user) => {
      const date = new Date(user.createdAt);

      const item = months.find(
        (month) =>
          month.month === date.getMonth() && month.year === date.getFullYear(),
      );

      if (item) item.patients++;
    });

    return months;
  }, [filteredBookings, filteredUsers]);

  // --------------------------------------------------
  // POPULAR TESTS
  // --------------------------------------------------

  const popularTests = useMemo(() => {
    const testCounts = {};

    filteredBookings.forEach((booking) => {
      const testName = booking.testName || "Other";

      testCounts[testName] = (testCounts[testName] || 0) + 1;
    });

    return Object.entries(testCounts)
      .map(([name, count]) => ({
        name,
        bookings: count,
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 6);
  }, [filteredBookings]);

  // --------------------------------------------------
  // BOOKING STATUS CHART
  // --------------------------------------------------

  const bookingStatusData = [
    {
      name: "Completed",
      value: analytics.completedBookings,
    },
    {
      name: "Pending / Confirmed",
      value: analytics.pendingBookings,
    },
    {
      name: "Cancelled",
      value: analytics.cancelledBookings,
    },
  ].filter((item) => item.value > 0);

  // --------------------------------------------------
  // REPORT STATUS CHART
  // --------------------------------------------------

  const reportStatusData = [
    {
      name: "Available",
      value: analytics.availableReports,
    },
    {
      name: "Draft",
      value: analytics.draftReports,
    },
    {
      name: "Pending",
      value: analytics.pendingReports,
    },
  ].filter((item) => item.value > 0);

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div style={{ paddingBottom: 30 }}>
      {/* PAGE HEADER */}

      <Flex
        justify="space-between"
        align="center"
        wrap="wrap"
        gap={16}
        style={{ marginBottom: 30 }}
      >
        <div>
          <Title
            level={2}
            style={{
              color: "#12343b",
              margin: 0,
            }}
          >
            Analytics Overview
          </Title>

          <Text type="secondary">
            Monitor laboratory performance and business insights.
          </Text>
        </div>

        <Space>
          <Text strong>Time Period:</Text>

          <Select
            value={timeFilter}
            onChange={setTimeFilter}
            style={{ width: 160 }}
            options={[
              { value: "All", label: "All Time" },
              { value: "7", label: "Last 7 Days" },
              { value: "30", label: "Last 30 Days" },
              { value: "12", label: "Last 12 Months" },
            ]}
          />
        </Space>
      </Flex>

      {/* OVERVIEW STATISTICS */}

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} lg={8} xl={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Total Patients"
              value={analytics.totalPatients}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#087f8c" }}
            />
            <Text type="secondary">Registered patients</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8} xl={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Total Bookings"
              value={analytics.totalBookings}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: "#6366f1" }}
            />
            <Text type="secondary">Diagnostic appointments</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8} xl={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Completed Bookings"
              value={analytics.completedBookings}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#16a34a" }}
            />
            <Text type="secondary">Successfully completed</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8} xl={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Pending Bookings"
              value={analytics.pendingBookings}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#d97706" }}
            />
            <Text type="secondary">Pending or confirmed</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8} xl={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Cancelled Bookings"
              value={analytics.cancelledBookings}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: "#dc2626" }}
            />
            <Text type="secondary">Cancelled appointments</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8} xl={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Total Booking Value"
              value={analytics.bookingValue}
              precision={2}
              prefix="₹"
              valueStyle={{ color: "#087f8c" }}
            />
            <Text type="secondary">
              Based on booking prices, not collected payments
            </Text>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* BOOKING AND PATIENT GROWTH */}

      <Row gutter={[20, 20]}>
        <Col xs={24} xl={16}>
          <Card
            title={
              <Space>
                <RiseOutlined style={{ color: "#087f8c" }} />
                Booking & Patient Growth
              </Space>
            }
            style={{ borderRadius: 12 }}
          >
            {monthlyTrend.some(
              (item) => item.bookings > 0 || item.patients > 0,
            ) ? (
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis allowDecimals={false} />

                  <Tooltip />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="bookings"
                    name="Bookings"
                    stroke="#087f8c"
                    strokeWidth={3}
                    activeDot={{ r: 7 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="patients"
                    name="New Patients"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Empty description="No growth data available" />
            )}
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Card
            title="Booking Status Distribution"
            style={{ borderRadius: 12 }}
          >
            {bookingStatusData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={bookingStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label
                    >
                      {bookingStatusData.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index]} />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <Space wrap>
                  {bookingStatusData.map((item, index) => (
                    <Tag key={item.name} color={COLORS[index]}>
                      {item.name}: {item.value}
                    </Tag>
                  ))}
                </Space>
              </>
            ) : (
              <Empty description="No booking data available" />
            )}
          </Card>
        </Col>
      </Row>

      {/* POPULAR TESTS */}

      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} xl={14}>
          <Card
            title={
              <Space>
                <ExperimentOutlined style={{ color: "#087f8c" }} />
                Most Popular Diagnostic Tests
              </Space>
            }
            style={{ borderRadius: 12 }}
          >
            {popularTests.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={popularTests}
                  layout="vertical"
                  margin={{ left: 20, right: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis type="number" allowDecimals={false} />

                  <YAxis
                    type="category"
                    dataKey="name"
                    width={130}
                    tick={{ fontSize: 11 }}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="bookings"
                    name="Bookings"
                    fill="#087f8c"
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Empty description="No test bookings available" />
            )}
          </Card>
        </Col>

        {/* MEDICAL REPORT ANALYTICS */}

        <Col xs={24} xl={10}>
          <Card
            title={
              <Space>
                <FileTextOutlined style={{ color: "#087f8c" }} />
                Medical Report Analytics
              </Space>
            }
            style={{ borderRadius: 12 }}
          >
            <Row gutter={[12, 20]}>
              <Col span={12}>
                <Statistic
                  title="Total Reports"
                  value={analytics.totalReports}
                />
              </Col>

              <Col span={12}>
                <Statistic
                  title="Available"
                  value={analytics.availableReports}
                  valueStyle={{ color: "#16a34a" }}
                />
              </Col>

              <Col span={12}>
                <Statistic
                  title="Draft"
                  value={analytics.draftReports}
                  valueStyle={{ color: "#d97706" }}
                />
              </Col>

              <Col span={12}>
                <Statistic
                  title="Pending"
                  value={analytics.pendingReports}
                  valueStyle={{ color: "#6366f1" }}
                />
              </Col>
            </Row>

            <Divider />

            {reportStatusData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie
                      data={reportStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={65}
                      label
                    >
                      {reportStatusData.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index]} />
                      ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </>
            ) : (
              <Empty description="No medical reports available" />
            )}
          </Card>
        </Col>
      </Row>

      {/* FOOTNOTE */}

      <Card
        style={{
          marginTop: 20,
          borderRadius: 12,
          background: "#f0f9fa",
          border: "1px solid #d6eeee",
        }}
      >
        <Space align="start">
          <DollarOutlined
            style={{
              fontSize: 22,
              color: "#087f8c",
            }}
          />

          <div>
            <Text strong>Analytics Information</Text>

            <br />

            <Text type="secondary">
              Booking value is calculated using diagnostic booking prices. It
              does not represent verified payments or collected revenue. Growth
              charts use the latest six calendar months.
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
}

export default AdminAnalytics;
