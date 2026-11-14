import { useMemo, useState } from "react";
import {
  Card,
  Table,
  Input,
  Typography,
  Space,
  Avatar,
  Tag,
  Button,
  Row,
  Col,
  Statistic,
  Empty,
  Drawer,
  Descriptions,
} from "antd";

import {
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import useLocalStorage from "../../hooks/useLocalStorage";

const { Title, Text } = Typography;

function ManagePatients() {
  const [users] = useLocalStorage("labconnect_users", []);
  const [searchText, setSearchText] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openPatientDetails = (patient) => {
    setSelectedPatient(patient);
    setDrawerOpen(true);
  };

  const filteredPatients = useMemo(() => {
    return users.filter((user) => {
      const search = searchText.toLowerCase();

      return (
        user.fullName?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search) ||
        user.phone?.toString().includes(search)
      );
    });
  }, [users, searchText]);

  const columns = [
    {
      title: "Patient",
      key: "patient",
      render: (_, record) => (
        <Space>
          <Avatar
            style={{
              background: "#e6f7f8",
              color: "#087f8c",
              fontWeight: 600,
            }}
          >
            {record.fullName?.charAt(0)?.toUpperCase() || "P"}
          </Avatar>

          <div>
            <Text strong style={{ color: "#12343b" }}>
              {record.fullName}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Patient ID: {record.id}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <Space>
          <MailOutlined style={{ color: "#087f8c" }} />
          {email}
        </Space>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => (
        <Space>
          <PhoneOutlined style={{ color: "#087f8c" }} />
          {phone || "—"}
        </Space>
      ),
    },
    {
      title: "Registration Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        if (!date) return "—";

        const parsedDate = new Date(date);

        return isNaN(parsedDate.getTime())
          ? "—"
          : parsedDate.toLocaleDateString("en-IN");
      },
    },
    {
      title: "Status",
      key: "status",
      render: () => <Tag color="success">Registered</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => openPatientDetails(record)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1600, margin: "0 auto" }}>
      <div style={{ marginBottom: 26 }}>
        <Title level={2} style={{ color: "#12343b", marginBottom: 6 }}>
          Manage Patients
        </Title>

        <Text type="secondary">
          View and manage all patients registered on LabConnect.
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
              title="Total Registered Patients"
              value={users.length}
              prefix={
                <Avatar
                  shape="square"
                  icon={<TeamOutlined />}
                  style={{
                    background: "#e6f7f8",
                    color: "#087f8c",
                  }}
                />
              }
              valueStyle={{
                color: "#12343b",
                fontWeight: 700,
              }}
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
              title="Recently Registered"
              value={
                users.filter((user) => {
                  if (!user.createdAt) return false;

                  const registrationDate = new Date(user.createdAt);
                  const today = new Date();

                  return (
                    !isNaN(registrationDate.getTime()) &&
                    registrationDate.toDateString() === today.toDateString()
                  );
                }).length
              }
              prefix={
                <Avatar
                  shape="square"
                  icon={<UserOutlined />}
                  style={{
                    background: "#e6f4ff",
                    color: "#1677ff",
                  }}
                />
              }
              valueStyle={{
                color: "#12343b",
                fontWeight: 700,
              }}
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
            <TeamOutlined style={{ color: "#087f8c" }} />
            <span>Patient Directory</span>
          </Space>
        }
        extra={
          <Text type="secondary">{filteredPatients.length} patients found</Text>
        }
      >
        <div style={{ marginBottom: 22 }}>
          <Input
            placeholder="Search by patient name, email or phone..."
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
          dataSource={filteredPatients}
          rowKey="id"
          pagination={{
            pageSize: 8,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} patients`,
          }}
          scroll={{ x: 850 }}
          locale={{
            emptyText: (
              <Empty
                description={
                  searchText
                    ? "No matching patients found"
                    : "No patients registered yet"
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      </Card>
      <Drawer
        title="Patient Details"
        placement="right"
        size="large"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {selectedPatient && (
          <>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Avatar
                size={80}
                style={{
                  backgroundColor: "#e6f7f8",
                  color: "#087f8c",
                  fontSize: 30,
                }}
              >
                {selectedPatient.fullName?.charAt(0).toUpperCase()}
              </Avatar>

              <Title level={4} style={{ marginTop: 12 }}>
                {selectedPatient.fullName}
              </Title>

              <Tag color="success">Registered Patient</Tag>
            </div>

            <Descriptions
              title="Account Information"
              bordered
              column={1}
              size="middle"
            >
              <Descriptions.Item label="Patient ID">
                {selectedPatient.id}
              </Descriptions.Item>

              <Descriptions.Item label="Full Name">
                {selectedPatient.fullName}
              </Descriptions.Item>

              <Descriptions.Item label="Email">
                {selectedPatient.email}
              </Descriptions.Item>

              <Descriptions.Item label="Phone">
                {selectedPatient.phone || "—"}
              </Descriptions.Item>

              <Descriptions.Item label="Registration Date">
                {selectedPatient.createdAt
                  ? new Date(selectedPatient.createdAt).toLocaleDateString(
                      "en-IN",
                    )
                  : "—"}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Drawer>
    </div>
  );
}

export default ManagePatients;
