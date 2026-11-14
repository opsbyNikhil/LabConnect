import { useState, useEffect } from "react";
import { useParams, Link, Navigate, useLocation } from "react-router-dom";

import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  Result,
  Divider,
  Flex,
} from "antd";

import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ExperimentOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import tests from "../../data/tests";
import useLocalStorage from "../../hooks/useLocalStorage";
import initialBookings from "../../data/bookings";

const { Title, Paragraph, Text } = Typography;

function TestBooking() {
  const { id } = useParams();
  const location = useLocation();
  const [form] = Form.useForm();

  const [currentUser] = useLocalStorage("labconnect_current_user", null);
  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        patientName: currentUser.fullName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      });
    }
  }, [currentUser, form]);

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookings, setBookings] = useLocalStorage(
    "labconnect_bookings",
    initialBookings,
  );

  const test = tests.find((item) => item.id === Number(id));

  // Require login before booking
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Handle invalid test IDs
  if (!test) {
    return (
      <Result
        status="404"
        title="Test Not Found"
        subTitle="Sorry, the diagnostic test you are trying to book does not exist."
        extra={
          <Link to="/tests">
            <Button type="primary">Back to Tests</Button>
          </Link>
        }
      />
    );
  }

  // Handle successful booking submission
  const handleBooking = (values) => {
    const newBooking = {
      id: Date.now(),

      // Account that created this booking
      accountUserId: currentUser.id,

      testId: test.id,
      testName: test.name,
      price: test.price,
      patientName: values.patientName,
      phone: values.phone,
      email: values.email,
      address: values.address,
      appointmentDate: values.appointmentDate.format("YYYY-MM-DD"),
      timeSlot: values.timeSlot,
      patientRelationship: values.patientRelationship,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };

    setBookings((previousBookings) => [...previousBookings, newBooking]);

    setBookingDetails(values);
    setBookingConfirmed(true);
  };

  // Booking confirmation screen
  if (bookingConfirmed) {
    return (
      <div
        style={{
          minHeight: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
          background: "#f5fafb",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 650,
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          <Result
            status="success"
            icon={<CheckCircleOutlined style={{ color: "#087f8c" }} />}
            title="Booking Submitted Successfully!"
            subTitle="Your diagnostic test booking has been submitted successfully."
            extra={[
              <Button
                type="primary"
                key="tests"
                onClick={() => {
                  window.location.href = "/tests";
                }}
              >
                Explore More Tests
              </Button>,
              <Button
                key="home"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Go to Home
              </Button>,
            ]}
          />

          <Divider />

          <Space orientation="vertical" size={12}>
            <Text strong>{test.name}</Text>

            <Text type="secondary">Patient: {bookingDetails?.patientName}</Text>

            <Text type="secondary">Phone: {bookingDetails?.phone}</Text>

            <Text type="secondary">
              Appointment:{" "}
              {bookingDetails?.appointmentDate?.format("DD MMM YYYY")}
            </Text>

            <Text type="secondary">Time Slot: {bookingDetails?.timeSlot}</Text>

            <Title level={3} style={{ color: "#087f8c" }}>
              ₹{test.price}
            </Title>
          </Space>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #e6f7f8 0%, #f5fafb 100%)",
          padding: "55px 6%",
        }}
      >
        <Space orientation="vertical" size={18}>
          <Link to={`/tests/${test.id}`}>
            <Button type="link" icon={<ArrowLeftOutlined />}>
              Back to Test Details
            </Button>
          </Link>

          <Tag color="cyan">
            <CalendarOutlined /> Diagnostic Test Booking
          </Tag>

          <Title
            level={1}
            style={{
              color: "#12343b",
              margin: 0,
            }}
          >
            Book Your Diagnostic Test
          </Title>

          <Paragraph
            style={{
              color: "#64748b",
              fontSize: 17,
              maxWidth: 700,
            }}
          >
            Schedule your diagnostic test with LabConnect. Fill in your details
            and choose a convenient appointment date and time.
          </Paragraph>
        </Space>
      </section>

      {/* Booking Form Section */}
      <section
        style={{
          padding: "55px 6%",
          background: "#ffffff",
        }}
      >
        <Row gutter={[30, 30]}>
          {/* Patient Information Form */}
          <Col xs={24} lg={16}>
            <Card
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Patient & Appointment Information
                </Title>
              }
              style={{
                borderRadius: 12,
              }}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleBooking}
                requiredMark="optional"
              >
                <Title level={5}>Patient Information</Title>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Booking For"
                      name="patientRelationship"
                      rules={[
                        {
                          required: true,
                          message: "Please select the relationship",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select who this test is for"
                        options={[
                          { value: "Self", label: "Myself" },
                          { value: "Father", label: "Father" },
                          { value: "Mother", label: "Mother" },
                          { value: "Spouse", label: "Spouse" },
                          { value: "Son", label: "Son" },
                          { value: "Daughter", label: "Daughter" },
                          { value: "Sibling", label: "Brother / Sister" },
                          { value: "Friend", label: "Friend" },
                          { value: "Other", label: "Other" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Patient Name"
                      name="patientName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter patient name",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Enter patient name" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Phone Number"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter phone number",
                        },
                        {
                          pattern: /^[6-9]\d{9}$/,
                          message:
                            "Enter a valid 10-digit Indian mobile number",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        maxLength={10}
                        placeholder="Enter 10-digit mobile number"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Email Address"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter email address",
                        },
                        {
                          type: "email",
                          message: "Enter a valid email address",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Enter email address" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Patient Address"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter patient address",
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={3}
                        placeholder="Enter your complete address"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider />

                <Title level={5}>Appointment Information</Title>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Appointment Date"
                      name="appointmentDate"
                      rules={[
                        {
                          required: true,
                          message: "Please select appointment date",
                        },
                      ]}
                    >
                      <DatePicker
                        size="large"
                        style={{ width: "100%" }}
                        format="DD MMM YYYY"
                        placeholder="Select appointment date"
                        disabledDate={(current) =>
                          current &&
                          current
                            .startOf("day")
                            .isBefore(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Appointment Time"
                      name="timeSlot"
                      rules={[
                        {
                          required: true,
                          message: "Please select time slot",
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        placeholder="Select time slot"
                        options={[
                          {
                            value: "09:00 AM - 10:00 AM",
                            label: "09:00 AM - 10:00 AM",
                          },
                          {
                            value: "10:00 AM - 11:00 AM",
                            label: "10:00 AM - 11:00 AM",
                          },
                          {
                            value: "11:00 AM - 12:00 PM",
                            label: "11:00 AM - 12:00 PM",
                          },
                          {
                            value: "12:00 PM - 01:00 PM",
                            label: "12:00 PM - 01:00 PM",
                          },
                          {
                            value: "02:00 PM - 03:00 PM",
                            label: "02:00 PM - 03:00 PM",
                          },
                          {
                            value: "03:00 PM - 04:00 PM",
                            label: "03:00 PM - 04:00 PM",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item style={{ marginTop: 20, marginBottom: 0 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    icon={<CalendarOutlined />}
                  >
                    Confirm Booking
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Selected Test Summary */}
          <Col xs={24} lg={8}>
            <Card
              title="Booking Summary"
              style={{
                borderRadius: 12,
                position: "sticky",
                top: 90,
              }}
            >
              <Space orientation="vertical" size={16} style={{ width: "100%" }}>
                <Flex justify="space-between" align="center">
                  <Tag color="cyan">
                    <ExperimentOutlined /> {test.category.toUpperCase()}
                  </Tag>

                  <Tag color="success">Available</Tag>
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

                <Paragraph type="secondary">{test.description}</Paragraph>

                <Divider />

                <Flex justify="space-between">
                  <Text type="secondary">Test Price</Text>
                  <Text strong>₹{test.price}</Text>
                </Flex>

                <Flex justify="space-between">
                  <Text type="secondary">Report Time</Text>
                  <Text strong>{test.reportTime}</Text>
                </Flex>

                <Flex justify="space-between" align="center">
                  <Text type="secondary">Fasting Requirement</Text>

                  <Tag
                    color={
                      test.fasting === "Not Required" ? "success" : "warning"
                    }
                  >
                    {test.fasting}
                  </Tag>
                </Flex>

                <Divider />

                <Flex justify="space-between" align="center">
                  <Text strong style={{ fontSize: 16 }}>
                    Total Amount
                  </Text>

                  <Title
                    level={3}
                    style={{
                      color: "#087f8c",
                      margin: 0,
                    }}
                  >
                    ₹{test.price}
                  </Title>
                </Flex>

                <Text type="secondary" style={{ fontSize: 12 }}>
                  This is a demonstration booking. No payment will be processed.
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default TestBooking;
