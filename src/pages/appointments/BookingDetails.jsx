import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  Typography,
  Row,
  Col,
  Flex,
  Space,
  Tag,
  Button,
  Descriptions,
  Result,
  Modal,
  message,
  DatePicker,
  Select,
} from "antd";

import dayjs from "dayjs";

import {
  ArrowLeftOutlined,
  ExperimentOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import useLocalStorage from "../../hooks/useLocalStorage";
import initialBookings from "../../data/bookings";

const { Title, Text, Paragraph } = Typography;

function BookingDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [bookings, setBookings] = useLocalStorage(
    "labconnect_bookings",
    initialBookings,
  );
  
  const handleCancelBooking = () => {
    Modal.confirm({
      title: "Cancel Booking?",
      content: "Are you sure you want to cancel this appointment?",
      okText: "Yes, Cancel",
      cancelText: "Keep Booking",
      okType: "danger",
      centered: true,

      onOk: () => {
        const updatedBookings = bookings.map((item) =>
          String(item.id) === String(id)
            ? { ...item, status: "Cancelled" }
            : item,
        );

        setBookings(updatedBookings);

        messageApi.success("Booking cancelled successfully!");
      },
    });
  };

  const handleRescheduleBooking = () => {
    if (!newAppointmentDate || !newTimeSlot) {
      messageApi.warning("Please select a new date and time slot.");
      return;
    }

    const updatedBookings = bookings.map((item) =>
      String(item.id) === String(id)
        ? {
            ...item,
            appointmentDate: newAppointmentDate.format("YYYY-MM-DD"),
            timeSlot: newTimeSlot,
            status: "Confirmed",
          }
        : item,
    );

    setBookings(updatedBookings);

    setRescheduleVisible(false);
    setNewAppointmentDate(null);
    setNewTimeSlot(null);

    messageApi.success("Appointment rescheduled successfully!");
  };

  const [messageApi, contextHolder] = message.useMessage();
  const [rescheduleVisible, setRescheduleVisible] = useState(false);

  const [newAppointmentDate, setNewAppointmentDate] = useState(null);

  const [newTimeSlot, setNewTimeSlot] = useState(null);

  const booking = bookings.find((item) => String(item.id) === String(id));

  if (!booking) {
    return (
      <div style={{ padding: "60px 5%", background: "#f5fafb" }}>
        <Result
          status="404"
          title="Booking Not Found"
          subTitle="The booking you're looking for doesn't exist."
          extra={
            <Link to="/patient-dashboard">
              <Button type="primary">Back to Dashboard</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const statusColor =
    booking.status?.toLowerCase() === "completed"
      ? "success"
      : booking.status?.toLowerCase() === "cancelled"
        ? "error"
        : "processing";

  return (
    <div
      style={{
        minHeight: "80vh",
        padding: "40px 5%",
        background: "#f5fafb",
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        wrap="wrap"
        gap={16}
        style={{ marginBottom: 24 }}
      >
        <div>
          <Title level={2} style={{ margin: 0, color: "#12343b" }}>
            Booking Details
          </Title>

          <Paragraph type="secondary">
            View your diagnostic test appointment information.
          </Paragraph>
        </div>

        <Link to="/patient-dashboard">
          <Button icon={<ArrowLeftOutlined />}>Back to Dashboard</Button>
        </Link>
      </Flex>

      <Card style={{ borderRadius: 16, marginBottom: 24 }}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={16}>
          <Space size="middle">
            <ExperimentOutlined style={{ fontSize: 32, color: "#087f8c" }} />

            <div>
              <Title level={4} style={{ margin: 0 }}>
                {booking.testName}
              </Title>

              <Text type="secondary">
                Booking ID: #{String(booking.id).slice(-6)}
              </Text>
            </div>
          </Space>

          <Tag color={statusColor}>{booking.status}</Tag>
        </Flex>
      </Card>

      <Row gutter={[20, 20]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <UserOutlined />
                Patient Information
              </Space>
            }
            style={{ height: "100%", borderRadius: 12 }}
          >
            <Descriptions column={1}>
              <Descriptions.Item label="Booking For">
                <Tag color="blue">{booking.patientRelationship || "Self"}</Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Email">
                {booking.email}
              </Descriptions.Item>

              <Descriptions.Item label="Phone">
                {booking.phone}
              </Descriptions.Item>

              <Descriptions.Item label="Address">
                {booking.address}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <CalendarOutlined />
                Appointment Information
              </Space>
            }
            style={{ height: "100%", borderRadius: 12 }}
          >
            <Descriptions column={1}>
              <Descriptions.Item label="Test Name">
                {booking.testName}
              </Descriptions.Item>

              <Descriptions.Item label="Appointment Date">
                {booking.appointmentDate
                  ? new Date(
                      `${booking.appointmentDate}T00:00:00`,
                    ).toLocaleDateString("en-IN")
                  : "Not available"}
              </Descriptions.Item>

              <Descriptions.Item label="Time Slot">
                {booking.timeSlot}
              </Descriptions.Item>

              <Descriptions.Item label="Booking Status">
                <Tag color={statusColor}>{booking.status}</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24}>
          <Card style={{ borderRadius: 12 }}>
            <Space>
              <FileTextOutlined style={{ fontSize: 24, color: "#087f8c" }} />

              <Title level={4} style={{ margin: 0 }}>
                Payment Summary
              </Title>
            </Space>

            <Flex
              justify="space-between"
              align="center"
              style={{
                marginTop: 24,
                padding: 16,
                background: "#e6f7f8",
                borderRadius: 8,
              }}
            >
              <Text strong>Test Amount</Text>

              <Title level={3} style={{ margin: 0, color: "#087f8c" }}>
                ₹{booking.price}
              </Title>
            </Flex>
          </Card>
        </Col>
      </Row>

      <Flex justify="center" wrap="wrap" gap={12} style={{ marginTop: 24 }}>
        {booking.status !== "Cancelled" && booking.status !== "Completed" && (
          <Button
            danger
            size="large"
            icon={<CloseCircleOutlined />}
            onClick={handleCancelBooking}
          >
            Cancel Booking
          </Button>
        )}
        {booking.status !== "Cancelled" && booking.status !== "Completed" && (
          <Button
            size="large"
            icon={<CalendarOutlined />}
            onClick={() => setRescheduleVisible(true)}
          >
            Reschedule Appointment
          </Button>
        )}

        <Link to="/booking-history">
          <Button type="primary" size="large">
            View Booking History
          </Button>
        </Link>
      </Flex>
      <Modal
        title="Reschedule Appointment"
        open={rescheduleVisible}
        onCancel={() => setRescheduleVisible(false)}
        onOk={handleRescheduleBooking}
        okText="Confirm Reschedule"
        cancelText="Close"
        centered
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Text strong>Select New Appointment Date</Text>

          <DatePicker
            style={{ width: "100%" }}
            size="large"
            value={newAppointmentDate}
            onChange={setNewAppointmentDate}
            disabledDate={(current) =>
              current && current.startOf("day").isBefore(dayjs().startOf("day"))
            }
            format="DD-MM-YYYY"
            placeholder="Choose appointment date"
          />

          <Text strong>Select New Time Slot</Text>

          <Select
            style={{ width: "100%" }}
            size="large"
            placeholder="Choose time slot"
            value={newTimeSlot}
            onChange={setNewTimeSlot}
            options={[
              { value: "09:00 AM - 10:00 AM", label: "09:00 AM - 10:00 AM" },
              { value: "10:00 AM - 11:00 AM", label: "10:00 AM - 11:00 AM" },
              { value: "11:00 AM - 12:00 PM", label: "11:00 AM - 12:00 PM" },
              { value: "12:00 PM - 01:00 PM", label: "12:00 PM - 01:00 PM" },
              { value: "02:00 PM - 03:00 PM", label: "02:00 PM - 03:00 PM" },
              { value: "03:00 PM - 04:00 PM", label: "03:00 PM - 04:00 PM" },
            ]}
          />
        </Space>
      </Modal>
      {contextHolder}
    </div>
  );
}

export default BookingDetails;
