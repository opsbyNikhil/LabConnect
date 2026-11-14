import { useMemo } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  Typography,
  Flex,
  Row,
  Col,
  Space,
  Button,
  Table,
  Tag,
  Empty,
} from "antd";

import {
  UserOutlined,
  CalendarOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  EyeOutlined,
  ArrowRightOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";

import useLocalStorage from "../../hooks/useLocalStorage";
import initialBookings from "../../data/bookings";

const { Title, Text, Paragraph } = Typography;

function PatientDashboard() {
  // Logged-in patient
  const [currentUser] = useLocalStorage("labconnect_current_user", null);

  // All bookings stored in LocalStorage
  const [allBookings] = useLocalStorage("labconnect_bookings", initialBookings);

  // Get only the logged-in patient's bookings
  const patientBookings = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    return allBookings
      .filter(
        (booking) =>
          booking.accountUserId === currentUser.id ||
          (!booking.accountUserId &&
            booking.email?.toLowerCase() === currentUser.email?.toLowerCase()),
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [allBookings, currentUser]);

  // Today's date
  const today = new Date().toISOString().split("T")[0];

  // Calculate statistics
  const totalBookings = patientBookings.length;

  const upcomingAppointments = patientBookings.filter(
    (booking) =>
      booking.appointmentDate >= today &&
      !["completed", "cancelled"].includes(booking.status?.toLowerCase()),
  ).length;

  const completedTests = patientBookings.filter(
    (booking) => booking.status?.toLowerCase() === "completed",
  ).length;

  // Booking table columns
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
      render: (id) => `#${String(id).slice(-6)}`,
    },
    {
      title: "Test Name",
      dataIndex: "testName",
      key: "testName",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (date) =>
        new Date(`${date}T00:00:00`).toLocaleDateString("en-IN"),
    },
    {
      title: "Time Slot",
      dataIndex: "timeSlot",
      key: "timeSlot",
    },
    {
      title: "Amount",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status?.toLowerCase() === "completed"
            ? "success"
            : status?.toLowerCase() === "cancelled"
              ? "error"
              : "processing";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/booking-details/${record.id}`}>
          <Button type="link" icon={<EyeOutlined />}>
            View
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "80vh",
        padding: "40px 5%",
        background: "#f5fafb",
      }}
    >
      {/* Dashboard Header */}

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
            Patient Dashboard
          </Title>

          <Paragraph type="secondary">
            Manage your appointments, diagnostic tests, and health records.
          </Paragraph>
        </div>

        <Space wrap size={12}>
          <Link to="/tests">
            <Button
              type="primary"
              icon={<ExperimentOutlined />}
              size="large"
              style={{
                background: "#087f8c",
                borderRadius: 8,
                height: 44,
              }}
            >
              Book a Test
            </Button>
          </Link>

          <Link to="/medical-reports">
            <Button
              type="primary"
              icon={<FileSearchOutlined />}
              size="large"
              style={{
                background: "#087f8c",
                borderRadius: 8,
                height: 44,
              }}
            >
              Medical Reports
            </Button>
          </Link>
        </Space>
      </Flex>

      {/* Welcome Card */}

      <Card
        style={{
          borderRadius: 16,
          marginBottom: 24,
          background: "#e6f7f8",
        }}
      >
        <Flex align="center" gap={16}>
          <UserOutlined
            style={{
              fontSize: 40,
              color: "#087f8c",
            }}
          />

          <div>
            <Title
              level={3}
              style={{
                margin: 0,
                color: "#12343b",
              }}
            >
              Welcome, {currentUser?.fullName || "Patient"}!
            </Title>

            <Text type="secondary">
              Your personal health management dashboard.
            </Text>
          </div>
        </Flex>
      </Card>

      {/* Statistics Cards */}

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Space>
              <CalendarOutlined
                style={{
                  fontSize: 28,
                  color: "#087f8c",
                }}
              />

              <Text strong>Total Bookings</Text>
            </Space>

            <Title level={2} style={{ marginBottom: 0 }}>
              {totalBookings}
            </Title>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Space>
              <ExperimentOutlined
                style={{
                  fontSize: 28,
                  color: "#087f8c",
                }}
              />

              <Text strong>Upcoming Appointments</Text>
            </Space>

            <Title level={2} style={{ marginBottom: 0 }}>
              {upcomingAppointments}
            </Title>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Space>
              <FileTextOutlined
                style={{
                  fontSize: 28,
                  color: "#087f8c",
                }}
              />

              <Text strong>Completed Tests</Text>
            </Space>

            <Title level={2} style={{ marginBottom: 0 }}>
              {completedTests}
            </Title>
          </Card>
        </Col>
      </Row>

      {/* Recent Bookings */}

      <Card
        style={{
          marginTop: 30,
          borderRadius: 12,
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={12}
          style={{ marginBottom: 20 }}
        >
          <div>
            <Title level={4} style={{ margin: 0 }}>
              Recent Bookings
            </Title>

            <Text type="secondary">Your diagnostic test booking history.</Text>
          </div>

          <Link to="/booking-history">
            View All <ArrowRightOutlined />
          </Link>
        </Flex>

        {patientBookings.length > 0 ? (
          <Table
            columns={columns}
            dataSource={patientBookings.slice(0, 5)}
            rowKey="id"
            pagination={false}
            scroll={{ x: 850 }}
          />
        ) : (
          <Empty
            description="You haven't booked any tests yet."
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Link to="/tests">
              <Button type="primary">Explore Diagnostic Tests</Button>
            </Link>
          </Empty>
        )}
      </Card>
    </div>
  );
}

export default PatientDashboard;
