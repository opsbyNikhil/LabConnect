import { useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  Card,
  Table,
  Input,
  Typography,
  Space,
  Tag,
  Button,
  Row,
  Col,
  Statistic,
  Select,
  Drawer,
  Descriptions,
  Divider,
  Empty,
} from "antd";

import {
  SearchOutlined,
  CalendarOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";

import useLocalStorage from "../../hooks/useLocalStorage";
import initialBookings from "../../data/bookings";

const { Title, Text } = Typography;

function ManageBookings() {
  const [bookings, setBookings] = useLocalStorage(
    "labconnect_bookings",
    initialBookings,
  );

  const [users] = useLocalStorage("labconnect_users", []);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Find account owner
  const getAccountOwner = (booking) => {
    return users.find(
      (user) => String(user.id) === String(booking.accountUserId),
    );
  };

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const search = searchText.toLowerCase();

      const matchesSearch =
        String(booking.id).includes(search) ||
        booking.patientName?.toLowerCase().includes(search) ||
        booking.testName?.toLowerCase().includes(search) ||
        booking.email?.toLowerCase().includes(search) ||
        booking.phone?.includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        booking.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchText, statusFilter]);

  // Booking statistics
  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "confirmed",
  ).length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "pending",
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "completed",
  ).length;

  // Status colors
  const getStatusColor = (status) => {
    const colors = {
      confirmed: "blue",
      pending: "orange",
      completed: "success",
      cancelled: "error",
    };

    return colors[status?.toLowerCase()] || "default";
  };

  // Open booking details
  const openBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setDrawerOpen(true);
  };

  // Update booking status
  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        String(booking.id) === String(bookingId)
          ? { ...booking, status: newStatus }
          : booking,
      ),
    );

    setSelectedBooking((previous) =>
      previous && String(previous.id) === String(bookingId)
        ? { ...previous, status: newStatus }
        : previous,
    );
  };

  // Table columns
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Text strong style={{ color: "#087f8c" }}>
          #{id}
        </Text>
      ),
    },
    {
      title: "Patient",
      dataIndex: "patientName",
      key: "patientName",
      render: (name, record) => (
        <Space orientation="vertical" size={0}>
          <Text strong style={{ color: "#12343b" }}>
            {name}
          </Text>

          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.patientRelationship || "—"}
          </Text>
        </Space>
      ),
    },
    {
      title: "Diagnostic Test",
      dataIndex: "testName",
      key: "testName",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (date) =>
        date ? new Date(`${date}T00:00:00`).toLocaleDateString("en-IN") : "—",
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
          ₹{Number(price || 0).toLocaleString("en-IN")}
        </Text>
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => openBookingDetails(record)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1600, margin: "0 auto" }}>
      {/* Page Heading */}
      <div style={{ marginBottom: 26 }}>
        <Title level={2} style={{ color: "#12343b", marginBottom: 6 }}>
          Manage Bookings
        </Title>

        <Text type="secondary">
          View and manage all diagnostic test appointments.
        </Text>
      </div>

      {/* Statistics */}
      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 16 }}>
            <Statistic
              title="Total Bookings"
              value={totalBookings}
              prefix={<FileTextOutlined style={{ color: "#087f8c" }} />}
              valueStyle={{ color: "#12343b", fontWeight: 700 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 16 }}>
            <Statistic
              title="Confirmed Bookings"
              value={confirmedBookings}
              prefix={<CheckCircleOutlined style={{ color: "#1677ff" }} />}
              valueStyle={{ color: "#12343b", fontWeight: 700 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 16 }}>
            <Statistic
              title="Pending Bookings"
              value={pendingBookings}
              prefix={<CalendarOutlined style={{ color: "#fa8c16" }} />}
              valueStyle={{ color: "#12343b", fontWeight: 700 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 16 }}>
            <Statistic
              title="Completed Bookings"
              value={completedBookings}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#12343b", fontWeight: 700 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Booking Directory */}
      <Card
        bordered={false}
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 18px rgba(18,52,59,0.04)",
        }}
        title={
          <Space>
            <CalendarOutlined style={{ color: "#087f8c" }} />
            <span>Booking Directory</span>
          </Space>
        }
        extra={
          <Text type="secondary">{filteredBookings.length} bookings found</Text>
        }
      >
        {/* Search and Filter */}
        <Row gutter={[16, 16]} style={{ marginBottom: 22 }}>
          <Col xs={24} md={14}>
            <Input
              placeholder="Search by booking ID, patient, test, email or phone..."
              prefix={<SearchOutlined style={{ color: "#087f8c" }} />}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              allowClear
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>

          <Col xs={24} md={10}>
            <Select
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: "100%" }}
              options={[
                { value: "All", label: "All Booking Statuses" },
                { value: "Confirmed", label: "Confirmed" },
                { value: "Pending", label: "Pending" },
                { value: "Completed", label: "Completed" },
                { value: "Cancelled", label: "Cancelled" },
              ]}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredBookings}
          rowKey="id"
          pagination={{
            pageSize: 8,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} bookings`,
          }}
          scroll={{ x: 1100 }}
          locale={{
            emptyText: (
              <Empty
                description={
                  searchText || statusFilter !== "All"
                    ? "No matching bookings found"
                    : "No bookings available yet"
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      </Card>

      {/* Booking Details Drawer */}
      <Drawer
        title="Booking Details"
        placement="right"
        size="large"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedBooking(null);
        }}
      >
        {selectedBooking && (
          <>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: "50%",
                  background: "#e6f7f8",
                  color: "#087f8c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  fontSize: 28,
                }}
              >
                <UserOutlined />
              </div>

              <Title level={4} style={{ marginBottom: 6 }}>
                {selectedBooking.patientName}
              </Title>

              <Tag color={getStatusColor(selectedBooking.status)}>
                {selectedBooking.status}
              </Tag>

              <div style={{ marginTop: 8 }}>
                <Text type="secondary">Booking ID: #{selectedBooking.id}</Text>
              </div>
            </div>

            <Descriptions
              title="Patient Information"
              bordered
              column={1}
              size="middle"
            >
              <Descriptions.Item label="Patient Name">
                {selectedBooking.patientName}
              </Descriptions.Item>

              <Descriptions.Item label="Relationship">
                {selectedBooking.patientRelationship || "—"}
              </Descriptions.Item>

              <Descriptions.Item label="Email">
                {selectedBooking.email}
              </Descriptions.Item>

              <Descriptions.Item label="Phone">
                {selectedBooking.phone}
              </Descriptions.Item>

              <Descriptions.Item label="Address">
                {selectedBooking.address || "—"}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions
              title="Account Owner"
              bordered
              column={1}
              size="middle"
            >
              <Descriptions.Item label="Account Name">
                {getAccountOwner(selectedBooking)?.fullName || "Not available"}
              </Descriptions.Item>

              <Descriptions.Item label="Account Email">
                {getAccountOwner(selectedBooking)?.email || "Not available"}
              </Descriptions.Item>

              <Descriptions.Item label="Account ID">
                {selectedBooking.accountUserId || "—"}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions
              title="Appointment Information"
              bordered
              column={1}
              size="middle"
            >
              <Descriptions.Item label="Test Name">
                {selectedBooking.testName}
              </Descriptions.Item>

              <Descriptions.Item label="Test ID">
                {selectedBooking.testId}
              </Descriptions.Item>

              <Descriptions.Item label="Appointment Date">
                {selectedBooking.appointmentDate
                  ? new Date(
                      `${selectedBooking.appointmentDate}T00:00:00`,
                    ).toLocaleDateString("en-IN")
                  : "—"}
              </Descriptions.Item>

              <Descriptions.Item label="Time Slot">
                {selectedBooking.timeSlot}
              </Descriptions.Item>

              <Descriptions.Item label="Amount">
                ₹{Number(selectedBooking.price || 0).toLocaleString("en-IN")}
              </Descriptions.Item>

              <Descriptions.Item label="Booking Created">
                {selectedBooking.createdAt
                  ? new Date(selectedBooking.createdAt).toLocaleString("en-IN")
                  : "—"}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={5}>Update Booking Status</Title>

            <Select
              size="large"
              style={{ width: "100%" }}
              value={selectedBooking.status}
              onChange={(value) =>
                updateBookingStatus(selectedBooking.id, value)
              }
              options={[
                { value: "Confirmed", label: "Confirmed" },
                { value: "Pending", label: "Pending" },
                { value: "Completed", label: "Completed" },
                { value: "Cancelled", label: "Cancelled" },
              ]}
            />

            <Text
              type="secondary"
              style={{ display: "block", marginTop: 10, fontSize: 12 }}
            >
              Changes are saved to LabConnect localStorage.
            </Text>
          </>
        )}
      </Drawer>
    </div>
  );
}

export default ManageBookings;
