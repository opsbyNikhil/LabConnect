import { Link } from "react-router-dom";

import { Button, Card, Empty, Flex, Space, Table, Tag, Typography } from "antd";

import {
  CalendarOutlined,
  ExperimentOutlined,
  EyeOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import useLocalStorage from "../../hooks/useLocalStorage";
import initialBookings from "../../data/bookings";

const { Title, Paragraph, Text } = Typography;

function BookingHistory() {
const [bookings] = useLocalStorage("labconnect_bookings", initialBookings);

const [currentUser] = useLocalStorage("labconnect_current_user", null);
  
const patientBookings = currentUser
  ? bookings.filter(
      (booking) =>
        booking.accountUserId === currentUser.id ||
        (!booking.accountUserId &&
          booking.email?.toLowerCase() === currentUser.email?.toLowerCase()),
    )
  : [];

const columns = [
  {
    title: "Booking ID",
    dataIndex: "id",
    key: "id",
    render: (id) => <Text strong>#{String(id).slice(-6)}</Text>,
  },
  {
    title: "Test Name",
    dataIndex: "testName",
    key: "testName",
    render: (name) => (
      <Space>
        <ExperimentOutlined style={{ color: "#087f8c" }} />
        <Text strong>{name}</Text>
      </Space>
    ),
  },
  {
    title: "Patient Name",
    dataIndex: "patientName",
    key: "patientName",
  },
  {
    title: "Appointment Date",
    dataIndex: "appointmentDate",
    key: "appointmentDate",
    render: (date) =>
      new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
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
    render: (price) => (
      <Text strong style={{ color: "#087f8c" }}>
        ₹{price}
      </Text>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => <Tag color="success">{status}</Tag>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      // <Link to={`/tests/${record.testId}`}>
      //   <Button type="link" icon={<EyeOutlined />}>
      //     View Test
      //   </Button>
      // </Link>
      <Link to={`/booking-details/${record.id}`}>
        <Button type="link" icon={<EyeOutlined />}>
          View Booking
        </Button>
      </Link>
    ),
  },
];

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #e6f7f8 0%, #f5fafb 100%)",
          padding: "65px 6%",
        }}
      >
        <Space orientation="vertical" size={16}>
          <Tag color="cyan">
            <CalendarOutlined /> Patient Appointments
          </Tag>

          <Title
            level={1}
            style={{
              color: "#12343b",
              margin: 0,
            }}
          >
            Booking History
          </Title>

          <Paragraph
            style={{
              color: "#64748b",
              fontSize: 17,
              maxWidth: 700,
            }}
          >
            View and manage your diagnostic test bookings and keep track of your
            scheduled appointments.
          </Paragraph>

          <Link to="/tests">
            <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
              Book a New Test
            </Button>
          </Link>
        </Space>
      </section>

      {/* Booking History Table */}
      <section
        style={{
          padding: "55px 6%",
          background: "#f5fafb",
        }}
      >
        <Card
          style={{
            borderRadius: 12,
          }}
        >
          <Flex
            justify="space-between"
            align="center"
            wrap="wrap"
            gap={12}
            style={{ marginBottom: 24 }}
          >
            <div>
              <Title
                level={3}
                style={{
                  margin: 0,
                  color: "#12343b",
                }}
              >
                My Appointments
              </Title>

              <Text type="secondary">
                {patientBookings.length} booking(s) found
              </Text>
            </div>

            <Tag color="cyan">Total Bookings: {patientBookings.length}</Tag>
          </Flex>

          {patientBookings.length > 0 ? (
            <Table
              columns={columns}
              dataSource={[...patientBookings].reverse()}
              rowKey="id"
              pagination={{
                pageSize: 5,
                showSizeChanger: true,
              }}
              scroll={{ x: 1000 }}
            />
          ) : (
            <Empty
              description="No bookings found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Link to="/tests">
                <Button type="primary">Explore Diagnostic Tests</Button>
              </Link>
            </Empty>
          )}
        </Card>
      </section>
    </div>
  );
}

export default BookingHistory;
