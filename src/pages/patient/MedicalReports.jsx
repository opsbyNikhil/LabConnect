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
} from "@ant-design/icons";

import useLocalStorage from "../../hooks/useLocalStorage";
import generateMedicalReportPDF from "../../utils/generateMedicalReportPDF";

const { Title, Text, Paragraph } = Typography;

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

const { Dragger } = Upload;

function MedicalReport() {
  const [messageApi, contextHolder] = message.useMessage();

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [uploadVisible, setUploadVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);

  //   const [reports, setReports] = useState([
  //     {
  //       id: 1,
  //       patientName: "Nikhil Marati",
  //       testName: "Complete Blood Count",
  //       reportDate: "2026-11-10",
  //       status: "Available",
  //       fileName: "CBC_Report.pdf",
  //       file: null,
  //     },
  //     {
  //       id: 2,
  //       patientName: "Nikhil Marati",
  //       testName: "Lipid Profile",
  //       reportDate: "2026-11-08",
  //       status: "Available",
  //       fileName: "Lipid_Profile.pdf",
  //       file: null,
  //     },
  //     {
  //       id: 3,
  //       patientName: "Nikhil Marati",
  //       testName: "Thyroid Profile",
  //       reportDate: "2026-11-14",
  //       status: "Pending",
  //       fileName: "Not Available",
  //       file: null,
  //     },
  //     {
  //       id: 4,
  //       patientName: "Nikhil Marati",
  //       testName: "Vitamin D Test",
  //       reportDate: "2026-11-05",
  //       status: "Available",
  //       fileName: "Vitamin_D_Report.pdf",
  //       file: null,
  //     },
  //   ]);

  // LOGGED-IN USER

  const [currentUser] = useLocalStorage("labconnect_current_user", null);

  // ADMIN UPLOADED REPORTS

  const [adminUploadedReports] = useLocalStorage(
    "labconnect_medical_reports",
    [],
  );

  // ADMIN CREATED REPORTS

  const [createdReports] = useLocalStorage("labconnect_created_reports", []);

  // PATIENT UPLOADED REPORTS

  const [reports, setReports] = useState([]);

  // ADMIN REPORTS AVAILABLE TO THE LOGGED-IN ACCOUNT
  const visibleAdminReports = useMemo(() => {
    if (!currentUser?.id) return [];

    const uploadedReports = adminUploadedReports.map((report) => ({
      ...report,
      reportSource: "AdminUploaded",
    }));

    const structuredReports = createdReports.map((report) => ({
      ...report,
      reportSource: "AdminCreated",
    }));

    return [...uploadedReports, ...structuredReports].filter(
      (report) =>
        String(report.accountUserId) === String(currentUser.id) &&
        report.status === "Available",
    );
  }, [currentUser, adminUploadedReports, createdReports]);

  // COMBINE ADMIN REPORTS AND PATIENT-UPLOADED REPORTS
  const allPatientReports = useMemo(
    () => [...visibleAdminReports, ...reports],
    [visibleAdminReports, reports],
  );

  // REPORT STATISTICS

  const totalReports = allPatientReports.length;

  const availableReports = allPatientReports.filter(
    (report) => report.status === "Available",
  ).length;

  const pendingReports = allPatientReports.filter(
    (report) => report.status === "Pending",
  ).length;

  // SEARCH AND FILTER

  const filteredReports = allPatientReports.filter((report) => {
    const matchesSearch =
      (report.patientName || "")
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      (report.testName || "").toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // VIEW REPORT
  const handleViewReport = async (report) => {
    // ADMIN-CREATED MEDICAL REPORT
    if (report.reportSource === "AdminCreated") {
      setSelectedReport(report);
      return;
    }

    try {
      let file = null;

      // ADMIN-UPLOADED REPORT
      if (report.reportSource === "AdminUploaded") {
        file = await getReportFile(report.id);
      }

      // PATIENT-UPLOADED REPORT
      else if (report.reportSource === "PatientUpload") {
        file = report.file;
      }

      if (!file) {
        messageApi.error("Report file could not be found.");
        return;
      }

      const url = URL.createObjectURL(file);

      setPreviewUrl(url);
      setSelectedReport(report);
    } catch (error) {
      console.error("Report preview error:", error);
      messageApi.error("Unable to preview medical report.");
    }
  };

  // DOWNLOAD REPORT
  const handleDownloadReport = async (report) => {
    // ADMIN-CREATED REPORT — GENERATE PDF
    if (report.reportSource === "AdminCreated") {
      try {
        generateMedicalReportPDF(report);

        messageApi.success("Medical report PDF downloaded successfully!");
      } catch (error) {
        console.error(error);
        messageApi.error("Unable to generate medical report PDF.");
      }

      return;
    }

    try {
      let file = null;

      // ADMIN-UPLOADED REPORT — GET FILE FROM INDEXEDDB
      if (report.reportSource === "AdminUploaded") {
        file = await getReportFile(report.id);
      }

      // PATIENT-UPLOADED REPORT — USE EXISTING FILE
      else if (report.reportSource === "PatientUpload") {
        file = report.file;
      }

      if (!file) {
        messageApi.error("Report file could not be found.");
        return;
      }

      const fileUrl = URL.createObjectURL(file);

      const link = document.createElement("a");

      link.href = fileUrl;
      link.download = report.fileName || "Medical_Report";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(fileUrl);

      messageApi.success("Report download started!");
    } catch (error) {
      console.error("Report download error:", error);
      messageApi.error("Unable to download medical report.");
    }
  };
  // UPLOAD REPORT

  const handleUploadReport = (values) => {
    if (fileList.length === 0) {
      messageApi.warning("Please select a report file.");
      return;
    }

    const uploadedFile = fileList[0];

    const newReport = {
      id: Date.now(),
      accountUserId: currentUser?.id,
      reportSource: "PatientUpload",
      patientName: values.patientName,
      testName: values.testName,
      reportDate: values.reportDate.format("YYYY-MM-DD"),
      status: "Available",
      fileName: uploadedFile.name,
      file: uploadedFile.originFileObj,
    };

    setReports((previousReports) => [newReport, ...previousReports]);

    form.resetFields();
    setFileList([]);

    setUploadVisible(false);

    messageApi.success("Medical report uploaded successfully!");
  };

  // DELETE REPORT

  const handleDeleteReport = (reportId) => {
    Modal.confirm({
      title: "Delete Medical Report?",
      content: "Are you sure you want to delete this report?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,

      onOk: () => {
        setReports((previousReports) =>
          previousReports.filter((report) => report.id !== reportId),
        );

        messageApi.success("Medical report deleted successfully!");
      },
    });
  };

  // TABLE COLUMNS

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      render: (name) => (
        <Space>
          <FilePdfOutlined style={{ fontSize: 22, color: "#087f8c" }} />

          <Text strong>{name}</Text>
        </Space>
      ),
    },

    {
      title: "Test Name",
      dataIndex: "testName",
      key: "testName",
      render: (name) => <Text>{name}</Text>,
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
      render: (fileName) => <Text type="secondary">{fileName}</Text>,
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
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            disabled={record.status !== "Available"}
            onClick={() => handleViewReport(record)}
          >
            View
          </Button>

          <Button
            type="text"
            icon={<DownloadOutlined />}
            disabled={record.status !== "Available"}
            onClick={() => handleDownloadReport(record)}
          >
            Download
          </Button>

          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteReport(record.id)}
          />
        </Space>
      ),
    },
  ];

  // CLOSE REPORT PREVIEW
  const closePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    setSelectedReport(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5fafb",
        padding: "35px 5%",
      }}
    >
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
          <Title level={2} style={{ color: "#12343b", margin: 0 }}>
            Medical Reports
          </Title>

          <Paragraph type="secondary">
            View, manage, and access your diagnostic test reports.
          </Paragraph>
        </div>

        {/* <Button
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
        </Button> */}
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

      <Card
        style={{
          borderRadius: 14,
          marginBottom: 30,
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
            <Title level={4} style={{ margin: 0 }}>
              My Medical Reports
            </Title>

            <Text type="secondary">Manage your diagnostic test results.</Text>
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
                description="No medical reports found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      </Card>

      {/* INFORMATION CARD */}

      <Card
        style={{
          borderRadius: 14,
          background: "#e6f7f8",
          border: "none",
        }}
      >
        <Row align="middle" gutter={[20, 20]}>
          <Col xs={24} sm={3}>
            <InboxOutlined
              style={{
                fontSize: 42,
                color: "#087f8c",
              }}
            />
          </Col>

          <Col xs={24} sm={21}>
            <Title level={4} style={{ margin: 0, color: "#12343b" }}>
              Your Medical Reports in One Place
            </Title>

            <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
              Access your diagnostic reports conveniently. You can view,
              download, and manage your uploaded reports whenever you need them.
            </Paragraph>
          </Col>
        </Row>
      </Card>

      {/* UPLOAD REPORT MODAL */}

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
            label="Patient Name"
            name="patientName"
            rules={[
              {
                required: true,
                message: "Please enter patient name.",
              },
            ]}
          >
            <Input size="large" placeholder="Enter patient name" />
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
                Click or drag a report file to this area
              </p>

              <p className="ant-upload-hint">
                Supports PDF, JPG, JPEG, and PNG files. Maximum 10 MB.
              </p>
            </Dragger>
          </Form.Item>

          <Space
            style={{
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
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
              icon={<UploadOutlined />}
              style={{ background: "#087f8c" }}
            >
              Upload Report
            </Button>
          </Space>
        </Form>
      </Modal>

      {/* VIEW MEDICAL REPORT MODAL */}

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
        width={850}
        destroyOnHidden
      >
        {selectedReport && (
          <>
            {/* ADMIN-CREATED STRUCTURED REPORT */}

            {selectedReport.reportSource === "AdminCreated" ? (
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

                  <Tag color="success">AVAILABLE — RELEASED</Tag>
                </Flex>

                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="Patient Name">
                    {selectedReport.patientName}
                  </Descriptions.Item>

                  <Descriptions.Item label="Age / Gender">
                    {selectedReport.age || "N/A"} /{" "}
                    {selectedReport.gender || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Test Name">
                    {selectedReport.testName}
                  </Descriptions.Item>

                  <Descriptions.Item label="Sample ID">
                    {selectedReport.sampleId || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Sample Type">
                    {selectedReport.sampleType || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Methodology">
                    {selectedReport.methodology || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Collection Date">
                    {selectedReport.collectionDate || "N/A"}
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
                  rowKey={(record, index) => record.id || index}
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
                  *** END OF REPORT — RELEASED TO PATIENT ***
                </Paragraph>
              </>
            ) : (
              /* ADMIN-UPLOADED OR PATIENT-UPLOADED FILE */

              <>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Patient Name">
                    {selectedReport.patientName}
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
                  (selectedReport.fileType === "application/pdf" ||
                  selectedReport.file?.type === "application/pdf" ? (
                    <iframe
                      title="Medical Report Preview"
                      src={previewUrl}
                      style={{
                        width: "100%",
                        height: 500,
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
                        maxHeight: 500,
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

export default MedicalReport;
