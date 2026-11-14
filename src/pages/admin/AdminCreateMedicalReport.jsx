import { useState } from "react";
import dayjs from "dayjs";

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Typography,
  Space,
  Tag,
  InputNumber,
  message,
  Divider,
  Modal,
} from "antd";

import {
  UserOutlined,
  ExperimentOutlined,
  MedicineBoxOutlined,
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import testParameters from "../../data/testParameters";
import useLocalStorage from "../../hooks/useLocalStorage";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const AdminCreateMedicalReport = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [users] = useLocalStorage("labconnect_users", []);
  const [bookings] = useLocalStorage("labconnect_bookings", []);
  const [createdReports, setCreatedReports] = useLocalStorage(
    "labconnect_created_reports",
    [],
  );

  const [parameters, setParameters] = useState([
    {
      id: 1,
      parameter: "",
      result: "",
      unit: "",
      referenceRange: "",
      flag: "Normal",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  // ELIGIBLE BOOKINGS

  const eligibleBookings = bookings.filter((booking) =>
    ["confirmed", "completed"].includes(booking.status?.toLowerCase()),
  );

  // BOOKING OPTIONS

  const bookingOptions = eligibleBookings.map((booking) => ({
    value: booking.id,
    label: `${booking.patientName} - ${booking.testName} - ${booking.appointmentDate || "Date unavailable"}`,
  }));

  // SELECT BOOKING AND AUTO-POPULATE DETAILS

  const generateSampleId = () => {
    const today = dayjs().format("YYYYMMDD");
    const storageKey = `labconnect_sample_counter_${today}`;

    const previousNumber = Number(localStorage.getItem(storageKey) || 0);

    const nextNumber = previousNumber + 1;

    localStorage.setItem(storageKey, String(nextNumber));

    return `LC-SMP-${today}-${String(nextNumber).padStart(4, "0")}`;
  };

  const handleBookingSelect = (bookingId) => {
    const selectedBooking = bookings.find(
      (booking) => String(booking.id) === String(bookingId),
    );

    if (!selectedBooking) return;

    const testConfig = testParameters[selectedBooking.testName];

    if (!testConfig) {
      message.warning("Configuration not found for this test.");
      return;
    }

    const mappedParameters = testConfig.sections.flatMap(
      (section, sectionIndex) =>
        section.parameters.map((item, index) => ({
          id: `${Date.now()}-${sectionIndex}-${index}`,
          section: section.name,
          parameter: item.parameter,
          result: "",
          unit: item.unit,
          referenceRange: item.referenceRange,
          flag: "",
        })),
    );

    setParameters(mappedParameters);

    form.setFieldsValue({
      accountUserId: selectedBooking.accountUserId,
      patientName: selectedBooking.patientName,
      testName: selectedBooking.testName,
      collectionDate: selectedBooking.appointmentDate
        ? dayjs(selectedBooking.appointmentDate)
        : null,
      sampleId: generateSampleId(),
      sampleType: testConfig.sampleType,
      methodology: testConfig.methodology,
    });
  };

  // ADD PARAMETER

  const addParameter = () => {
    setParameters((previous) => [
      ...previous,
      {
        id: Date.now(),
        parameter: "",
        result: "",
        unit: "",
        referenceRange: "",
        flag: "Normal",
      },
    ]);
  };

  // REMOVE PARAMETER

  const removeParameter = (id) => {
    setParameters((previous) => previous.filter((item) => item.id !== id));
  };

  // UPDATE PARAMETER

  const updateParameter = (id, field, value) => {
    setParameters((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  // FORM SUBMISSION

  const handleSubmit = (values) => {
    if (
      parameters.length === 0 ||
      parameters.some(
        (item) =>
          !item.parameter.trim() ||
          !item.result.trim() ||
          !item.unit.trim() ||
          !item.referenceRange.trim(),
      )
    ) {
      messageApi.warning("Please complete all investigation parameters.");
      return;
    }

    setLoading(true);

    const selectedBooking = bookings.find(
      (booking) => String(booking.id) === String(values.bookingId),
    );

    const selectedUser = users.find(
      (user) => String(user.id) === String(values.accountUserId),
    );

    if (!selectedBooking || !selectedUser) {
      messageApi.error("Booking or account information could not be found.");
      setLoading(false);
      return;
    }

    const reportData = {
      id: Date.now(),

      bookingId: selectedBooking.id,

      accountUserId: selectedBooking.accountUserId,
      accountOwnerName: selectedUser.fullName,
      accountOwnerEmail: selectedUser.email,

      patientName: values.patientName,
      age: values.age,
      gender: values.gender,
      referringDoctor: values.referringDoctor,

      sampleId: values.sampleId,
      sampleType: values.sampleType,

      collectionDate: values.collectionDate.format("YYYY-MM-DD"),
      reportDate: values.reportDate.format("YYYY-MM-DD"),

      testName: values.testName,

      parameters,

      methodology: values.methodology,
      observations: values.observations,
      clinicalInterpretation: values.clinicalInterpretation,
      clinicalRemarks: values.clinicalRemarks,

      technicianName: values.technicianName,
      technicianId: values.technicianId,

      pathologistName: values.pathologistName,
      pathologistRegistrationNumber: values.pathologistRegistrationNumber,

      status: "Draft",

      createdAt: new Date().toISOString(),
    };

    setPreviewData(reportData);
    setPreviewOpen(true);

    setLoading(false);
  };

  // SAVE MEDICAL REPORT AS DRAFT

  const handleSaveDraft = () => {
    if (!previewData) return;

    const savedReport = {
      ...previewData,
      status: "Draft",
      savedAt: new Date().toISOString(),
    };

    setCreatedReports((previousReports) => [...previousReports, savedReport]);

    messageApi.success("Medical report saved successfully!");

    setPreviewOpen(false);
  };

  return (
    <div style={{ paddingBottom: 30 }}>
      {contextHolder}

      {/* PAGE HEADER */}

      <div style={{ marginBottom: 25 }}>
        <Title
          level={2}
          style={{
            margin: 0,
            color: "#12343b",
          }}
        >
          Create Medical Report
        </Title>

        <Paragraph type="secondary">
          Prepare professional diagnostic laboratory reports for registered
          patients.
        </Paragraph>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          gender: "Male",
          sampleType: "Blood",
        }}
      >
        {/* PATIENT DETAILS */}

        <Card
          title={
            <Space>
              <UserOutlined style={{ color: "#087f8c" }} />
              Patient Information
            </Space>
          }
          style={{ borderRadius: 14, marginBottom: 20 }}
        >
          <Row gutter={[20, 0]}>
            <Col xs={24}>
              <Form.Item
                label="Select Booking"
                name="bookingId"
                rules={[
                  {
                    required: true,
                    message: "Please select a booking.",
                  },
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Select patient booking"
                  options={bookingOptions}
                  onChange={handleBookingSelect}
                />
              </Form.Item>
            </Col>

            {/* HIDDEN ACCOUNT OWNER ID */}

            <Form.Item name="accountUserId" hidden>
              <Input />
            </Form.Item>

            <Col xs={24} md={12}>
              <Form.Item
                label="Patient Name"
                name="patientName"
                rules={[
                  {
                    required: true,
                    message: "Patient name is required.",
                  },
                ]}
              >
                <Input
                  size="large"
                  readOnly
                  placeholder="Automatically populated from booking"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Diagnostic Test"
                name="testName"
                rules={[
                  {
                    required: true,
                    message: "Test name is required.",
                  },
                ]}
              >
                <Input
                  size="large"
                  readOnly
                  placeholder="Automatically populated from booking"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                label="Age"
                name="age"
                rules={[
                  {
                    required: true,
                    message: "Please enter patient age.",
                  },
                ]}
              >
                <InputNumber
                  size="large"
                  min={0}
                  max={120}
                  style={{ width: "100%" }}
                  placeholder="Enter age"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true }]}
              >
                <Select
                  size="large"
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="Referring Doctor" name="referringDoctor">
                <Input size="large" placeholder="Doctor name" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* SAMPLE INFORMATION */}

        <Card
          title={
            <Space>
              <ExperimentOutlined style={{ color: "#087f8c" }} />
              Sample & Investigation Information
            </Space>
          }
          style={{ borderRadius: 14, marginBottom: 20 }}
        >
          <Row gutter={[20, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Sample ID"
                name="sampleId"
                rules={[
                  {
                    required: true,
                    message: "Sample ID is required.",
                  },
                ]}
              >
                <Input
                  size="large"
                  readOnly
                  placeholder="Automatically generated"
                  style={{
                    color: "#087f8c",
                    fontWeight: 600,
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Sample Type"
                name="sampleType"
                rules={[{ required: true }]}
              >
                <Input
                  size="large"
                  readOnly
                  placeholder="Automatically populated from selected test"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Sample Collection Date"
                name="collectionDate"
                rules={[
                  {
                    required: true,
                    message: "Please select collection date.",
                  },
                ]}
              >
                <DatePicker
                  size="large"
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                />
              </Form.Item>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Suggested from the selected booking's appointment date. Update
                it if the actual collection date differs.
              </Text>
            </Col>

            <Col xs={24} md={12}>
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
            </Col>
          </Row>
        </Card>

        {/* INVESTIGATION PARAMETERS */}

        <Card
          title={
            <Space>
              <MedicineBoxOutlined style={{ color: "#087f8c" }} />
              Investigation Results
            </Space>
          }
          style={{ borderRadius: 14, marginBottom: 20 }}
        >
          <Paragraph type="secondary">
            Enter laboratory test parameters, measured results, units, and
            verified reference ranges.
          </Paragraph>

          {parameters.map((item, index) => (
            <Card
              key={item.id}
              size="small"
              style={{
                marginBottom: 15,
                background: "#f8fbfc",
                borderRadius: 10,
              }}
            >
              <FlexHeader index={index} />

              <Row gutter={[12, 12]}>
                <Col xs={24} md={6}>
                  <Text strong>Parameter</Text>
                  <Input
                    value={item.parameter}
                    onChange={(e) =>
                      updateParameter(item.id, "parameter", e.target.value)
                    }
                    placeholder="e.g. Haemoglobin"
                    style={{ marginTop: 8 }}
                  />
                </Col>

                <Col xs={24} md={4}>
                  <Text strong>Result</Text>
                  <Input
                    value={item.result}
                    onChange={(e) =>
                      updateParameter(item.id, "result", e.target.value)
                    }
                    placeholder="Result"
                    style={{ marginTop: 8 }}
                  />
                </Col>

                <Col xs={24} md={4}>
                  <Text strong>Unit</Text>
                  <Input
                    value={item.unit}
                    onChange={(e) =>
                      updateParameter(item.id, "unit", e.target.value)
                    }
                    placeholder="g/dL"
                    style={{ marginTop: 8 }}
                  />
                </Col>

                <Col xs={24} md={5}>
                  <Text strong>Reference Range</Text>
                  <Input
                    value={item.referenceRange}
                    onChange={(e) =>
                      updateParameter(item.id, "referenceRange", e.target.value)
                    }
                    placeholder="13.0–17.0"
                    style={{ marginTop: 8 }}
                  />
                </Col>

                <Col xs={20} md={3}>
                  <Text strong>Flag</Text>
                  <Select
                    value={item.flag}
                    onChange={(value) =>
                      updateParameter(item.id, "flag", value)
                    }
                    style={{
                      width: "100%",
                      marginTop: 8,
                    }}
                    options={[
                      { value: "Normal", label: "Normal" },
                      { value: "High", label: "High" },
                      { value: "Low", label: "Low" },
                    ]}
                  />
                </Col>

                <Col xs={4} md={2}>
                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    disabled={parameters.length === 1}
                    onClick={() => removeParameter(item.id)}
                    style={{ marginTop: 25 }}
                  />
                </Col>
              </Row>
            </Card>
          ))}

          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={addParameter}
          >
            Add Investigation Parameter
          </Button>
        </Card>

        {/* CLINICAL INFORMATION */}

        {/* CLINICAL INFORMATION */}

        <Card
          title={
            <Space>
              <MedicineBoxOutlined style={{ color: "#087f8c" }} />
              Clinical Information
            </Space>
          }
          style={{ borderRadius: 14, marginBottom: 20 }}
        >
          <Row gutter={[20, 0]}>
            <Col xs={24}>
              <Form.Item
                label="Methodology"
                name="methodology"
                rules={[
                  {
                    required: true,
                    message: "Methodology is required.",
                  },
                ]}
              >
                <Input
                  size="large"
                  readOnly
                  placeholder="Automatically populated from test configuration"
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Laboratory Observations" name="observations">
                <TextArea
                  rows={3}
                  placeholder="Enter laboratory observations..."
                  showCount
                  maxLength={1000}
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label="Clinical Interpretation"
                name="clinicalInterpretation"
              >
                <TextArea
                  rows={3}
                  placeholder="Enter interpretation based on verified test findings..."
                  showCount
                  maxLength={1000}
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Clinical Remarks" name="clinicalRemarks">
                <TextArea
                  rows={3}
                  placeholder="Enter additional clinical remarks..."
                  showCount
                  maxLength={1000}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* AUTHORIZATION */}

        {/* REPORT AUTHORIZATION */}

        <Card
          title={
            <Space>
              <MedicineBoxOutlined style={{ color: "#087f8c" }} />
              Report Authorization
            </Space>
          }
          style={{ borderRadius: 14, marginBottom: 25 }}
        >
          <Row gutter={[20, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Technician Name"
                name="technicianName"
                rules={[
                  {
                    required: true,
                    message: "Please enter technician name.",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter technician name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Technician ID" name="technicianId">
                <Input size="large" placeholder="Enter technician ID" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Pathologist Name"
                name="pathologistName"
                rules={[
                  {
                    required: true,
                    message: "Please enter pathologist name.",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter pathologist name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Pathologist Registration Number"
                name="pathologistRegistrationNumber"
              >
                <Input size="large" placeholder="Enter registration number" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Tag color="processing">
            Draft — Awaiting review and authorization
          </Tag>

          <Paragraph
            type="secondary"
            style={{ marginTop: 12, marginBottom: 0 }}
          >
            The report must be reviewed and authorized by the appropriate
            qualified professional before publication.
          </Paragraph>
        </Card>

        {/* ACTIONS */}

        <Card style={{ borderRadius: 14 }}>
          <Row justify="end">
            <Space wrap>
              <Button
                onClick={() => {
                  form.resetFields();

                  setParameters([
                    {
                      id: Date.now(),
                      parameter: "",
                      result: "",
                      unit: "",
                      referenceRange: "",
                      flag: "Normal",
                    },
                  ]);
                }}
              >
                Reset Form
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                style={{ background: "#087f8c" }}
              >
                Validate Report
              </Button>
            </Space>
          </Row>
        </Card>
      </Form>
      {/* MEDICAL REPORT PREVIEW */}

      <Modal
        title="Medical Report Preview"
        open={previewOpen}
        onCancel={() => setPreviewOpen(false)}
        width={1000}
        footer={[
          <Button key="close" onClick={() => setPreviewOpen(false)}>
            Close Preview
          </Button>,
          <Button
            key="print"
            type="primary"
            style={{ background: "#087f8c" }}
            onClick={() => window.print()}
          >
            Print Report
          </Button>,
          <Button
            key="save"
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSaveDraft}
            style={{ background: "#087f8c" }}
          >
            Save Draft
          </Button>,
        ]}
      >
        {previewData && (
          <div style={{ padding: 24, color: "#12343b" }}>
            {/* LAB HEADER */}

            <div
              style={{
                textAlign: "center",
                borderBottom: "2px solid #087f8c",
                paddingBottom: 20,
                marginBottom: 24,
              }}
            >
              <Title level={2} style={{ color: "#087f8c", margin: 0 }}>
                LABCONNECT
              </Title>

              <Text type="secondary">
                Diagnostic Laboratory & Healthcare Services
              </Text>

              <Title level={4} style={{ marginTop: 18 }}>
                MEDICAL DIAGNOSTIC REPORT
              </Title>
            </div>

            {/* PATIENT DETAILS */}

            <Title level={5}>Patient Information</Title>

            <Row gutter={[16, 12]}>
              <Col span={12}>
                <Text strong>Patient Name: </Text>
                {previewData.patientName}
              </Col>

              <Col span={12}>
                <Text strong>Age: </Text>
                {previewData.age}
              </Col>

              <Col span={12}>
                <Text strong>Gender: </Text>
                {previewData.gender}
              </Col>

              <Col span={12}>
                <Text strong>Referring Doctor: </Text>
                {previewData.referringDoctor || "N/A"}
              </Col>
            </Row>

            <Divider />

            {/* SAMPLE DETAILS */}

            <Title level={5}>Sample Information</Title>

            <Row gutter={[16, 12]}>
              <Col span={12}>
                <Text strong>Sample ID: </Text>
                {previewData.sampleId}
              </Col>

              <Col span={12}>
                <Text strong>Sample Type: </Text>
                {previewData.sampleType}
              </Col>

              <Col span={12}>
                <Text strong>Diagnostic Test: </Text>
                {previewData.testName}
              </Col>

              <Col span={12}>
                <Text strong>Collection Date: </Text>
                {previewData.collectionDate}
              </Col>

              <Col span={12}>
                <Text strong>Report Date: </Text>
                {previewData.reportDate}
              </Col>
            </Row>

            <Divider />

            {/* INVESTIGATION RESULTS */}

            <Title level={5}>Investigation Results</Title>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 12,
              }}
            >
              <thead>
                <tr style={{ background: "#eaf4f5" }}>
                  {[
                    "Parameter",
                    "Result",
                    "Unit",
                    "Reference Range",
                    "Flag",
                  ].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        border: "1px solid #d9e2e5",
                        padding: 10,
                        textAlign: "left",
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {previewData.parameters.map((item) => (
                  <tr key={item.id}>
                    <td style={{ border: "1px solid #d9e2e5", padding: 10 }}>
                      {item.parameter}
                    </td>

                    <td style={{ border: "1px solid #d9e2e5", padding: 10 }}>
                      {item.result}
                    </td>

                    <td style={{ border: "1px solid #d9e2e5", padding: 10 }}>
                      {item.unit}
                    </td>

                    <td style={{ border: "1px solid #d9e2e5", padding: 10 }}>
                      {item.referenceRange}
                    </td>

                    <td style={{ border: "1px solid #d9e2e5", padding: 10 }}>
                      {item.flag}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Divider />

            {/* CLINICAL INFORMATION */}

            <Title level={5}>Clinical Information</Title>

            <Paragraph>
              <Text strong>Methodology: </Text>
              {previewData.methodology || "N/A"}
            </Paragraph>

            <Paragraph>
              <Text strong>Laboratory Observations: </Text>
              {previewData.observations || "N/A"}
            </Paragraph>

            <Paragraph>
              <Text strong>Clinical Interpretation: </Text>
              {previewData.clinicalInterpretation || "N/A"}
            </Paragraph>

            <Paragraph>
              <Text strong>Clinical Remarks: </Text>
              {previewData.clinicalRemarks || "N/A"}
            </Paragraph>

            <Divider />

            {/* AUTHORIZATION */}

            <Title level={5}>Report Authorization</Title>

            <Row gutter={[16, 12]}>
              <Col span={12}>
                <Text strong>Technician: </Text>
                {previewData.technicianName}
              </Col>

              <Col span={12}>
                <Text strong>Technician ID: </Text>
                {previewData.technicianId || "N/A"}
              </Col>

              <Col span={12}>
                <Text strong>Pathologist: </Text>
                {previewData.pathologistName}
              </Col>

              <Col span={12}>
                <Text strong>Registration Number: </Text>
                {previewData.pathologistRegistrationNumber || "N/A"}
              </Col>
            </Row>

            <Divider />

            <div style={{ textAlign: "center", marginTop: 25 }}>
              <Tag color="processing">DRAFT — NOT YET AUTHORIZED</Tag>

              <Paragraph
                type="secondary"
                style={{ marginTop: 12, fontSize: 12 }}
              >
                This is a draft report for review. It is not a finalized
                diagnostic document.
              </Paragraph>

              <Text type="secondary">*** End of Report ***</Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};;;

// PARAMETER HEADER

const FlexHeader = ({ index }) => (
  <div style={{ marginBottom: 12 }}>
    <Text strong style={{ color: "#087f8c" }}>
      Parameter {index + 1}
    </Text>
  </div>
);

export default AdminCreateMedicalReport;
