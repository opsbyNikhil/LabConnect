import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Typography,
  Space,
  message,
  Divider,
} from "antd";

import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  SendOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

function Contact() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: <PhoneOutlined />,
      title: "Phone Number",
      value: "+91 98765 43210",
      description: "Call us for immediate assistance.",
    },
    {
      icon: <MailOutlined />,
      title: "Email Address",
      value: "support@labconnect.com",
      description: "Send us your questions anytime.",
    },
    {
      icon: <EnvironmentOutlined />,
      title: "Our Location",
      value: "Hyderabad, Telangana, India",
      description: "We're here to support your healthcare needs.",
    },
    {
      icon: <ClockCircleOutlined />,
      title: "Working Hours",
      value: "Monday – Saturday",
      description: "9:00 AM – 6:00 PM",
    },
  ];

  const faqs = [
    {
      question: "How can I book a diagnostic test?",
      answer:
        "You can explore available diagnostic tests, select your preferred test, and book an appointment through your LabConnect account.",
    },
    {
      question: "Can I book tests for my family members?",
      answer:
        "Yes! You can book diagnostic tests for yourself, family members, friends, and children using your account.",
    },
    {
      question: "Can I reschedule my appointment?",
      answer:
        "Yes. Visit your Booking History or Booking Details page to reschedule an eligible appointment.",
    },
    {
      question: "How can I cancel my appointment?",
      answer:
        "You can cancel eligible appointments through the Booking Details page.",
    },
  ];

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      // Contact form frontend submission.
      // Backend/API integration can be added later.

      console.log("Contact Form Submission:", values);

      await new Promise((resolve) => setTimeout(resolve, 800));

      messageApi.success("Thank you! Your message has been submitted.");

      form.resetFields();
    } catch (error) {
      messageApi.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f5fafb", minHeight: "100vh" }}>
      {contextHolder}

      {/* HERO SECTION */}

      <section
        style={{
          background: "linear-gradient(120deg, #087f8c, #12343b)",
          padding: "75px 5%",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Space direction="vertical" size={16}>
          <CustomerServiceOutlined
            style={{ fontSize: 48, color: "#a5f3fc" }}
          />

          <Title level={1} style={{ color: "#fff", margin: 0 }}>
            Get in Touch
          </Title>

          <Paragraph
            style={{
              color: "#e0f7fa",
              fontSize: 17,
              maxWidth: 650,
              margin: "0 auto",
            }}
          >
            We're here to help you with your healthcare journey.
            Reach out to our team for assistance, questions, or feedback.
          </Paragraph>
        </Space>
      </section>

      {/* CONTACT INFORMATION */}

      <div style={{ padding: "60px 5%" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Title level={2} style={{ color: "#12343b" }}>
            Contact Information
          </Title>

          <Text type="secondary">
            Choose your preferred way to connect with us.
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          {contactInfo.map((item, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  borderRadius: 14,
                  textAlign: "center",
                  border: "1px solid #e6f0f2",
                }}
              >
                <div
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: "50%",
                    background: "#e6f7f8",
                    color: "#087f8c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 25,
                    margin: "0 auto 18px",
                  }}
                >
                  {item.icon}
                </div>

                <Title level={5}>{item.title}</Title>

                <Text strong style={{ color: "#087f8c" }}>
                  {item.value}
                </Text>

                <Paragraph
                  type="secondary"
                  style={{ marginTop: 10, marginBottom: 0 }}
                >
                  {item.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* CONTACT FORM */}

      <div style={{ padding: "20px 5% 70px" }}>
        <Row gutter={[40, 40]} align="stretch">
          <Col xs={24} lg={10}>
            <div
              style={{
                height: "100%",
                background: "#e6f7f8",
                borderRadius: 16,
                padding: "40px 30px",
              }}
            >
              <SafetyCertificateOutlined
                style={{
                  fontSize: 42,
                  color: "#087f8c",
                  marginBottom: 20,
                }}
              />

              <Title level={2} style={{ color: "#12343b" }}>
                We're Always Here for You
              </Title>

              <Paragraph style={{ fontSize: 16, color: "#52676b" }}>
                At LabConnect, we believe healthcare should be accessible,
                convenient, and stress-free.
              </Paragraph>

              <Divider />

              <Space direction="vertical" size={20}>
                <Text strong>
                  <PhoneOutlined style={{ color: "#087f8c" }} /> Personal
                  Assistance
                </Text>

                <Text strong>
                  <MailOutlined style={{ color: "#087f8c" }} /> Quick Email
                  Support
                </Text>

                <Text strong>
                  <QuestionCircleOutlined style={{ color: "#087f8c" }} /> Help
                  With Your Bookings
                </Text>
              </Space>
            </div>
          </Col>

          <Col xs={24} lg={14}>
            <Card
              style={{
                borderRadius: 16,
                height: "100%",
                boxShadow: "0 5px 25px rgba(0,0,0,0.04)",
              }}
              styles={{ body: { padding: 32 } }}
            >
              <Title level={3} style={{ color: "#12343b" }}>
                Send Us a Message
              </Title>

              <Paragraph type="secondary">
                Fill out the form below and we'll be happy to hear from you.
              </Paragraph>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark="optional"
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your name.",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        prefix={<CustomerServiceOutlined />}
                        placeholder="Enter your name"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Email Address"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your email.",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email.",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        prefix={<MailOutlined />}
                        placeholder="Enter your email"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number.",
                    },
                    {
                      pattern: /^[6-9]\d{9}$/,
                      message: "Enter a valid 10-digit Indian mobile number.",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<PhoneOutlined />}
                    placeholder="Enter your phone number"
                    maxLength={10}
                  />
                </Form.Item>

                <Form.Item
                  label="Subject"
                  name="subject"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a subject.",
                    },
                  ]}
                >
                  <Input size="large" placeholder="What is this regarding?" />
                </Form.Item>

                <Form.Item
                  label="Your Message"
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your message.",
                    },
                    {
                      min: 10,
                      message: "Message must contain at least 10 characters.",
                    },
                  ]}
                >
                  <TextArea
                    rows={5}
                    placeholder="Write your message here..."
                    showCount
                    maxLength={1000}
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading}
                  icon={<SendOutlined />}
                  style={{
                    background: "#087f8c",
                    height: 48,
                    borderRadius: 8,
                  }}
                >
                  Send Message
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>

      {/* FAQ SECTION */}

      <div
        style={{
          padding: "60px 5%",
          background: "#fff",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Title level={2} style={{ color: "#12343b" }}>
            Frequently Asked Questions
          </Title>

          <Text type="secondary">
            Quick answers to common questions about LabConnect.
          </Text>
        </div>

        <Row gutter={[20, 20]}>
          {faqs.map((faq, index) => (
            <Col xs={24} sm={12} key={index}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  borderRadius: 12,
                  border: "1px solid #e6f0f2",
                }}
              >
                <Space align="start">
                  <QuestionCircleOutlined
                    style={{
                      fontSize: 22,
                      color: "#087f8c",
                      marginTop: 4,
                    }}
                  />

                  <div>
                    <Title level={5} style={{ marginTop: 0 }}>
                      {faq.question}
                    </Title>

                    <Paragraph
                      type="secondary"
                      style={{ marginBottom: 0 }}
                    >
                      {faq.answer}
                    </Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Contact;
