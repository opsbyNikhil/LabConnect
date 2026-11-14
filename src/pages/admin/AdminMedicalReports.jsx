import { useMemo, useState } from "react";

import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Space,
  Table,
  Tag,
  Input,
  Select,
  Modal,
  Form,
  Upload,
  message,
  Statistic,
  Empty,
  Descriptions,
  Flex,
  DatePicker,
} from "antd";

import {
  FilePdfOutlined,
  FileSearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  UploadOutlined,
  SearchOutlined,
  ExperimentOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  InboxOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";

import useLocalStorage from "../../hooks/useLocalStorage";
import generateMedicalReportPDF from "../../utils/generateMedicalReportPDF";

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

// --------------------------------------------------
// INDEXED DB CONFIGURATION
// --------------------------------------------------

const DB_NAME = "LabConnectMedicalReports";
const STORE_NAME = "reportFiles";

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });
      }
    };

    request.onsuccess = () => resolve(request.result);

    request.onerror = () => reject(request.error);
  });
};

const saveReportFile = async (id, file) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");

    transaction.objectStore(STORE_NAME).put({
      id,
      file,
    });

    transaction.oncomplete = () => {
      db.close();
      resolve(true);
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
};

const getReportFile = async (id) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");

    const request = transaction.objectStore(STORE_NAME).get(id);

    request.onsuccess = () => {
      db.close();
      resolve(request.result?.file || null);
    };

    request.onerror = () => {
      db.close();
      reject(request.error);
    };
  });
};

const deleteReportFile = async (id) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");

    transaction.objectStore(STORE_NAME).delete(id);

    transaction.oncomplete = () => {
      db.close();
      resolve(true);
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
};

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

function AdminMedicalReports() {
  const [messageApi, contextHolder] = message.useMessage();

  // SHARED DATA

  const [users] = useLocalStorage("labconnect_users", []);

  const [bookings] = useLocalStorage("labconnect_bookings", []);

  const [reports, setReports] = useLocalStorage(
    "labconnect_medical_reports",
    [],
  );
  const [createdReports, setCreatedReports] = useLocalStorage(
    "labconnect_created_reports",
    [],
  );

  // STATES

  const [searchText, setSearchText] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [uploadVisible, setUploadVisible] = useState(false);

  const [selectedReport, setSelectedReport] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  const [fileList, setFileList] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  // --------------------------------------------------
  // PATIENT ACCOUNT OPTIONS
  // --------------------------------------------------

  const patientOptions = users.map((user) => ({
    value: user.id,
    label: `${user.fullName} (${user.email})`,
  }));

  // --------------------------------------------------
  // FILTERED REPORTS
  // --------------------------------------------------

  // --------------------------------------------------
  // COMBINED AND FILTERED REPORTS
  // --------------------------------------------------

  const allReports = useMemo(() => {
    return [
      ...reports.map((report) => ({
        ...report,
        reportSource: "Uploaded",
      })),
      ...createdReports.map((report) => ({
        ...report,
        reportSource: "Created",
      })),
    ];
  }, [reports, createdReports]);

  // --------------------------------------------------
  // REPORT STATISTICS
  // --------------------------------------------------

  const totalReports = allReports.length;

  const availableReports = allReports.filter(
    (report) => report.status === "Available",
  ).length;

  const pendingReports = allReports.filter((report) =>
    ["Pending", "Draft"].includes(report.status),
  ).length;

  const filteredReports = useMemo(() => {
    return allReports.filter((report) => {
      const matchesSearch =
        (report.patientName || "")
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        (report.testName || "")
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        (report.accountOwnerName || "")
          .toLowerCase()
          .includes(searchText.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [allReports, searchText, statusFilter]);

  // --------------------------------------------------
  // UPLOAD REPORT
  // --------------------------------------------------

  const handleUploadReport = async (values) => {
    if (fileList.length === 0) {
      messageApi.warning("Please select a medical report file.");
      return;
    }

    const selectedUser = users.find((user) => user.id === values.accountUserId);

    if (!selectedUser) {
      messageApi.error("Selected patient account was not found.");
      return;
    }

    const uploadedFile = fileList[0].originFileObj;

    const reportId = Date.now();

    const newReport = {
      id: reportId,

      accountUserId: selectedUser.id,

      accountOwnerName: selectedUser.fullName,

      accountOwnerEmail: selectedUser.email,

      patientName: values.patientName,

      testName: values.testName,

      reportDate: values.reportDate.format("YYYY-MM-DD"),

      status: "Available",

      fileName: uploadedFile.name,

      fileType: uploadedFile.type,

      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);

      // Save actual file in IndexedDB
      await saveReportFile(reportId, uploadedFile);

      // Save report details in localStorage
      setReports((previousReports) => [newReport, ...previousReports]);

      messageApi.success("Medical report uploaded successfully!");

      form.resetFields();
      setFileList([]);
      setUploadVisible(false);
    } catch (error) {
      console.error("Report upload error:", error);

      messageApi.error("Unable to upload medical report.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // VIEW REPORT
  // --------------------------------------------------

  const handleViewReport = async (report) => {
    // Handle reports created through the Create Medical Report page
    if (report.reportSource === "Created") {
      setPreviewUrl(null);
      setSelectedReport(report);
      return;
    }

    // Handle uploaded PDF and image reports
    try {
      const file = await getReportFile(report.id);

      if (!file) {
        messageApi.error("Report file could not be found.");
        return;
      }

      const url = URL.createObjectURL(file);

      setPreviewUrl(url);
      setSelectedReport(report);
    } catch (error) {
      console.error(error);
      messageApi.error("Unable to preview report.");
    }
  };

  // --------------------------------------------------
  // DOWNLOAD REPORT
  // --------------------------------------------------

  const handleDownloadReport = async (report) => {
    // CREATED REPORT — GENERATE PDF
    if (report.reportSource === "Created") {
      try {
        generateMedicalReportPDF(report);

        messageApi.success("Medical report PDF downloaded successfully!");
      } catch (error) {
        console.error(error);
        messageApi.error("Unable to generate medical report PDF.");
      }

      return;
    }

    // UPLOADED REPORT — DOWNLOAD ORIGINAL FILE
    try {
      const file = await getReportFile(report.id);

      if (!file) {
        messageApi.error("Report file could not be found.");
        return;
      }

      const url = URL.createObjectURL(file);
      const link = document.createElement("a");

      link.href = url;
      link.download = report.fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      messageApi.success("Report download started!");
    } catch (error) {
      console.error(error);
      messageApi.error("Unable to download report.");
    }
  };

  // --------------------------------------------------
  // RELEASE REPORT TO PATIENT
  // --------------------------------------------------

  const handleReleaseReport = (report) => {
    Modal.confirm({
      title: "Release Medical Report?",
      content: `Are you sure you want to release ${report.testName} for ${report.patientName}? The patient will be able to view and download this report.`,
      okText: "Release Report",
      cancelText: "Cancel",
      okType: "primary",
      centered: true,

      onOk: () => {
        setCreatedReports((previousReports) =>
          previousReports.map((item) =>
            item.id === report.id
              ? {
                  ...item,
                  status: "Available",
                  releasedAt: new Date().toISOString(),
                }
              : item,
          ),
        );

        if (selectedReport?.id === report.id) {
          setSelectedReport((previous) => ({
            ...previous,
            status: "Available",
            releasedAt: new Date().toISOString(),
          }));
        }

        messageApi.success("Medical report released to patient!");
      },
    });
  };

  // --------------------------------------------------
  // DELETE REPORT
  // --------------------------------------------------

  const handleDeleteReport = (report) => {
    Modal.confirm({
      title: "Delete Medical Report?",

      content: `Are you sure you want to delete ${report.fileName}?`,

      okText: "Delete",

      okType: "danger",

      cancelText: "Cancel",

      centered: true,

      onOk: async () => {
        try {
          await deleteReportFile(report.id);

          setReports((previousReports) =>
            previousReports.filter((item) => item.id !== report.id),
          );

          messageApi.success("Medical report deleted successfully!");

          if (selectedReport?.id === report.id) {
            closePreview();
          }
        } catch (error) {
          console.error(error);
          messageApi.error("Unable to delete report.");
        }
      },
    });
  };

  // --------------------------------------------------
  // CLOSE PREVIEW
  // --------------------------------------------------

  const closePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    setSelectedReport(null);
  };

  // --------------------------------------------------
  // TABLE COLUMNS
  // --------------------------------------------------

  const columns = [
    {
      title: "Patient Name",

      dataIndex: "patientName",

      key: "patientName",

      render: (name) => (
        <Space>
          <UserOutlined
            style={{
              fontSize: 20,
              color: "#087f8c",
            }}
          />

          <Text strong>{name}</Text>
        </Space>
      ),
    },

    {
      title: "Account Owner",

      dataIndex: "accountOwnerName",

      key: "accountOwnerName",

      render: (name) => <Text>{name}</Text>,
    },

    {
      title: "Test Name",

      dataIndex: "testName",

      key: "testName",
    },

    {
      title: "Report Date",

      dataIndex: "reportDate",

      key: "reportDate",

      render: (date) =>
        new Date(`${date}T00:00:00`).toLocaleDateString("en-IN"),
    },

    {
      title: "Report File",

      dataIndex: "fileName",

      key: "fileName",

      render: (fileName) => (
        <Space>
          <FilePdfOutlined style={{ color: "#087f8c" }} />
          <Text type="secondary">{fileName}</Text>
        </Space>
      ),
    },

    {
      title: "Status",

      dataIndex: "status",

      key: "status",

      render: (status) => (
        <Tag color={status === "Available" ? "success" : "warning"}>
          {status}
        </Tag>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space wrap>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewReport(record)}
          >
            View
          </Button>

          <Button
            type="text"
            icon={<DownloadOutlined />}
            onClick={() => handleDownloadReport(record)}
          >
            Download
          </Button>

          {record.reportSource === "Created" && record.status === "Draft" && (
            <Button
              type="primary"
              size="small"
              icon={<CheckCircleOutlined />}
              onClick={() => handleReleaseReport(record)}
              style={{ background: "#16a34a" }}
            >
              Release to Patient
            </Button>
          )}

          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteReport(record)}
          />
        </Space>
      ),
    },
  ];

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div style={{ paddingBottom: 30 }}>
      {contextHolder}

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
            Medical Reports
          </Title>

          <Paragraph type="secondary">
            Upload, view, and manage patient diagnostic reports.
          </Paragraph>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<UploadOutlined />}
          onClick={() => setUploadVisible(true)}
          style={{
            background: "#087f8c",
            borderRadius: 8,
          }}
        >
          Upload Report
        </Button>
      </Flex>

      {/* STATISTICS */}

      <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Total Reports"
              value={totalReports}
              prefix={<FileSearchOutlined style={{ color: "#087f8c" }} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Available Reports"
              value={availableReports}
              valueStyle={{ color: "#16a34a" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Pending Reports"
              value={pendingReports}
              valueStyle={{ color: "#d97706" }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* REPORTS TABLE */}

      <Card style={{ borderRadius: 14 }}>
        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={16}
          style={{ marginBottom: 24 }}
        >
          <div>
            <Title level={4} style={{ margin: 0 }}>
              Patient Medical Reports
            </Title>

            <Text type="secondary">Manage uploaded diagnostic reports.</Text>
          </div>

          <Space wrap>
            <Input
              placeholder="Search reports..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              style={{ width: 220 }}
              allowClear
            />

            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 150 }}
              options={[
                { value: "All", label: "All Reports" },
                { value: "Available", label: "Available" },
                { value: "Pending", label: "Pending" },
              ]}
            />
          </Space>
        </Flex>

        <Table
          columns={columns}
          dataSource={filteredReports}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 1100 }}
          locale={{
            emptyText: (
              <Empty
                description="No medical reports uploaded yet"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      </Card>

      {/* UPLOAD MODAL */}

      <Modal
        title={
          <Space>
            <UploadOutlined style={{ color: "#087f8c" }} />
            Upload Medical Report
          </Space>
        }
        open={uploadVisible}
        onCancel={() => {
          setUploadVisible(false);
          form.resetFields();
          setFileList([]);
        }}
        footer={null}
        centered
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUploadReport}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            label="Patient Account"
            name="accountUserId"
            rules={[
              {
                required: true,
                message: "Please select a patient account.",
              },
            ]}
          >
            <Select
              size="large"
              showSearch
              optionFilterProp="label"
              placeholder="Select registered patient account"
              options={patientOptions}
              notFoundContent="No registered patients found"
            />
          </Form.Item>

          <Form.Item
            label="Patient Name"
            name="patientName"
            rules={[
              {
                required: true,
                message: "Please enter patient name.",
              },
            ]}
          >
            <Input size="large" placeholder="Enter actual patient name" />
          </Form.Item>

          <Form.Item
            label="Test Name"
            name="testName"
            rules={[
              {
                required: true,
                message: "Please enter test name.",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<ExperimentOutlined />}
              placeholder="Enter diagnostic test name"
            />
          </Form.Item>

          <Form.Item
            label="Report Date"
            name="reportDate"
            rules={[
              {
                required: true,
                message: "Please select report date.",
              },
            ]}
          >
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              format="DD-MM-YYYY"
            />
          </Form.Item>

          <Form.Item label="Medical Report File">
            <Dragger
              accept=".pdf,.jpg,.jpeg,.png"
              maxCount={1}
              fileList={fileList}
              beforeUpload={(file) => {
                const isValid =
                  file.type === "application/pdf" ||
                  file.type.startsWith("image/");

                if (!isValid) {
                  messageApi.error("Only PDF and image files are allowed.");

                  return Upload.LIST_IGNORE;
                }

                if (file.size > 10 * 1024 * 1024) {
                  messageApi.error("File size must be below 10 MB.");

                  return Upload.LIST_IGNORE;
                }

                return false;
              }}
              onChange={({ fileList: newFileList }) => {
                setFileList(newFileList.slice(-1));
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ color: "#087f8c" }} />
              </p>

              <p className="ant-upload-text">
                Click or drag a report file here
              </p>

              <p className="ant-upload-hint">
                PDF, JPG, JPEG, and PNG. Maximum 10 MB.
              </p>
            </Dragger>
          </Form.Item>

          <Flex justify="end" gap={10}>
            <Button
              onClick={() => {
                setUploadVisible(false);
                form.resetFields();
                setFileList([]);
              }}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<UploadOutlined />}
              style={{ background: "#087f8c" }}
            >
              Upload Report
            </Button>
          </Flex>
        </Form>
      </Modal>

      {/* VIEW REPORT MODAL */}

      <Modal
        title="Medical Report Details"
        open={!!selectedReport}
        onCancel={closePreview}
        footer={[
          <Button key="close" onClick={closePreview}>
            Close
          </Button>,

          <Button
            key="download"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => handleDownloadReport(selectedReport)}
            style={{ background: "#087f8c" }}
          >
            Download
          </Button>,
        ]}
        centered
        width={800}
        destroyOnHidden
      >
        {selectedReport && (
          <>
            {selectedReport.reportSource === "Created" ? (
              <>
                <Flex
                  justify="space-between"
                  align="center"
                  style={{ marginBottom: 20 }}
                >
                  <div>
                    <Title level={4} style={{ color: "#087f8c", margin: 0 }}>
                      LabConnect
                    </Title>
                    <Text type="secondary">
                      Diagnostic Laboratory & Healthcare Services
                    </Text>
                  </div>
                  <Tag
                    color={
                      selectedReport.status === "Available"
                        ? "success"
                        : "orange"
                    }
                  >
                    {selectedReport.status === "Available"
                      ? "AVAILABLE — RELEASED"
                      : "DRAFT — NOT AUTHORIZED"}
                  </Tag>{" "}
                </Flex>

                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="Patient Name">
                    {selectedReport.patientName}
                  </Descriptions.Item>

                  <Descriptions.Item label="Age / Gender">
                    {selectedReport.age || "N/A"} /{" "}
                    {selectedReport.gender || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Account Owner">
                    {selectedReport.accountOwnerName}
                  </Descriptions.Item>

                  <Descriptions.Item label="Account Email">
                    {selectedReport.accountOwnerEmail}
                  </Descriptions.Item>

                  <Descriptions.Item label="Test Name">
                    {selectedReport.testName}
                  </Descriptions.Item>

                  <Descriptions.Item label="Sample ID">
                    {selectedReport.sampleId}
                  </Descriptions.Item>

                  <Descriptions.Item label="Sample Type">
                    {selectedReport.sampleType}
                  </Descriptions.Item>

                  <Descriptions.Item label="Methodology">
                    {selectedReport.methodology}
                  </Descriptions.Item>

                  <Descriptions.Item label="Collection Date">
                    {selectedReport.collectionDate}
                  </Descriptions.Item>

                  <Descriptions.Item label="Report Date">
                    {selectedReport.reportDate}
                  </Descriptions.Item>
                </Descriptions>

                <Title level={5} style={{ marginTop: 24 }}>
                  Investigation Results
                </Title>

                <Table
                  size="small"
                  pagination={false}
                  rowKey="id"
                  dataSource={selectedReport.parameters || []}
                  columns={[
                    {
                      title: "Parameter",
                      dataIndex: "parameter",
                    },
                    {
                      title: "Result",
                      dataIndex: "result",
                    },
                    {
                      title: "Unit",
                      dataIndex: "unit",
                    },
                    {
                      title: "Reference Range",
                      dataIndex: "referenceRange",
                    },
                    {
                      title: "Flag",
                      dataIndex: "flag",
                      render: (flag) => (
                        <Tag color={flag === "Normal" ? "success" : "warning"}>
                          {flag || "N/A"}
                        </Tag>
                      ),
                    },
                  ]}
                />

                <Title level={5} style={{ marginTop: 24 }}>
                  Clinical Information
                </Title>

                <Descriptions bordered column={1} size="small">
                  <Descriptions.Item label="Observations">
                    {selectedReport.observations || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Clinical Interpretation">
                    {selectedReport.clinicalInterpretation || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Clinical Remarks">
                    {selectedReport.clinicalRemarks || "N/A"}
                  </Descriptions.Item>
                </Descriptions>

                <Title level={5} style={{ marginTop: 24 }}>
                  Report Authorization
                </Title>

                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="Technician">
                    {selectedReport.technicianName || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Technician ID">
                    {selectedReport.technicianId || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Pathologist">
                    {selectedReport.pathologistName || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Registration Number">
                    {selectedReport.pathologistRegistrationNumber || "N/A"}
                  </Descriptions.Item>
                </Descriptions>

                <Paragraph
                  type="secondary"
                  style={{ textAlign: "center", marginTop: 24 }}
                >
                  {selectedReport.status === "Available"
                    ? "*** END OF REPORT — RELEASED TO PATIENT ***"
                    : "*** END OF REPORT — AWAITING AUTHORIZATION ***"}{" "}
                </Paragraph>
              </>
            ) : (
              <>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Patient Name">
                    {selectedReport.patientName}
                  </Descriptions.Item>

                  <Descriptions.Item label="Account Owner">
                    {selectedReport.accountOwnerName}
                  </Descriptions.Item>

                  <Descriptions.Item label="Account Email">
                    {selectedReport.accountOwnerEmail}
                  </Descriptions.Item>

                  <Descriptions.Item label="Test Name">
                    {selectedReport.testName}
                  </Descriptions.Item>

                  <Descriptions.Item label="Report Date">
                    {selectedReport.reportDate}
                  </Descriptions.Item>

                  <Descriptions.Item label="File Name">
                    {selectedReport.fileName}
                  </Descriptions.Item>

                  <Descriptions.Item label="Status">
                    <Tag color="success">Available</Tag>
                  </Descriptions.Item>
                </Descriptions>

                {previewUrl &&
                  (selectedReport.fileType === "application/pdf" ? (
                    <iframe
                      title="Medical Report Preview"
                      src={previewUrl}
                      style={{
                        width: "100%",
                        height: 450,
                        marginTop: 20,
                        border: "1px solid #eee",
                        borderRadius: 8,
                      }}
                    />
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Medical Report"
                      style={{
                        width: "100%",
                        maxHeight: 450,
                        objectFit: "contain",
                        marginTop: 20,
                      }}
                    />
                  ))}
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}

export default AdminMedicalReports;
