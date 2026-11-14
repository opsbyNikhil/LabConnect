import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const generateMedicalReportPDF = (report) => {
  try {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // --------------------------------------------------
    // HEADER
    // --------------------------------------------------

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(8, 127, 140);
    doc.text("LabConnect", 14, 19);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);

    doc.text("Diagnostic Laboratory & Healthcare Services", 14, 25);

    doc.setDrawColor(8, 127, 140);
    doc.setLineWidth(0.7);
    doc.line(14, 30, pageWidth - 14, 30);

    // --------------------------------------------------
    // REPORT TITLE
    // --------------------------------------------------

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(18, 52, 59);

    doc.text("DIAGNOSTIC MEDICAL REPORT", pageWidth / 2, 40, {
      align: "center",
    });

    // --------------------------------------------------
    // PATIENT INFORMATION
    // --------------------------------------------------

    autoTable(doc, {
      startY: 47,
      margin: { left: 14, right: 14, bottom: 22 },

      head: [["PATIENT INFORMATION", "DETAILS"]],

      body: [
        ["Patient Name", report.patientName || "N/A"],
        ["Age / Gender", `${report.age || "N/A"} / ${report.gender || "N/A"}`],
        ["Account Owner", report.accountOwnerName || "N/A"],
        ["Account Email", report.accountOwnerEmail || "N/A"],
        ["Referring Doctor", report.referringDoctor || "N/A"],
        ["Test Name", report.testName || "N/A"],
        ["Sample ID", report.sampleId || "N/A"],
        ["Sample Type", report.sampleType || "N/A"],
        ["Collection Date", report.collectionDate || "N/A"],
        ["Report Date", report.reportDate || "N/A"],
        ["Methodology", report.methodology || "N/A"],
      ],

      theme: "grid",

      headStyles: {
        fillColor: [8, 127, 140],
        textColor: 255,
      },

      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: "linebreak",
      },
    });

    // --------------------------------------------------
    // INVESTIGATION RESULTS
    // --------------------------------------------------

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      margin: { left: 14, right: 14, bottom: 22 },

      head: [["Parameter", "Result", "Unit", "Reference Range", "Flag"]],

      body: (report.parameters || []).map((item) => [
        item.parameter || "N/A",
        item.result || "N/A",
        item.unit || "N/A",
        item.referenceRange || "N/A",
        item.flag || "N/A",
      ]),

      theme: "grid",

      headStyles: {
        fillColor: [8, 127, 140],
        textColor: 255,
      },

      styles: {
        fontSize: 7,
        cellPadding: 2.5,
        overflow: "linebreak",
      },
    });

    // --------------------------------------------------
    // CLINICAL INFORMATION
    // --------------------------------------------------

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      margin: { left: 14, right: 14, bottom: 22 },

      head: [["CLINICAL INFORMATION", "DETAILS"]],

      body: [
        ["Observations", report.observations || "N/A"],
        ["Clinical Interpretation", report.clinicalInterpretation || "N/A"],
        ["Clinical Remarks", report.clinicalRemarks || "N/A"],
      ],

      theme: "grid",

      headStyles: {
        fillColor: [8, 127, 140],
        textColor: 255,
      },

      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: "linebreak",
      },
    });

    // --------------------------------------------------
    // REPORT AUTHORIZATION
    // --------------------------------------------------

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      margin: { left: 14, right: 14, bottom: 22 },

      head: [["REPORT AUTHORIZATION", "DETAILS"]],

      body: [
        ["Technician Name", report.technicianName || "N/A"],
        ["Technician ID", report.technicianId || "N/A"],
        ["Pathologist Name", report.pathologistName || "N/A"],
        ["Registration Number", report.pathologistRegistrationNumber || "N/A"],
      ],

      theme: "grid",

      headStyles: {
        fillColor: [8, 127, 140],
        textColor: 255,
      },

      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: "linebreak",
      },
    });

    // --------------------------------------------------
    // FOOTER ON EVERY PAGE
    // --------------------------------------------------

    const pageCount = doc.internal.getNumberOfPages();

    for (let page = 1; page <= pageCount; page++) {
      doc.setPage(page);

      doc.setDrawColor(200, 200, 200);

      doc.line(14, pageHeight - 20, pageWidth - 14, pageHeight - 20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(180, 90, 0);

      doc.text("DRAFT - NOT YET AUTHORIZED", pageWidth / 2, pageHeight - 14, {
        align: "center",
      });

      doc.setFont("helvetica", "normal");
      doc.setTextColor(120, 120, 120);

      doc.text(`Page ${page} of ${pageCount}`, pageWidth - 14, pageHeight - 7, {
        align: "right",
      });
    }

    // --------------------------------------------------
    // DOWNLOAD PDF
    // --------------------------------------------------

    const patientName = (report.patientName || "Patient").replace(
      /[^a-zA-Z0-9_-]/g,
      "_",
    );

    const testName = (report.testName || "Medical_Report").replace(
      /[^a-zA-Z0-9_-]/g,
      "_",
    );

    doc.save(`LabConnect_${patientName}_${testName}.pdf`);

    return true;
  } catch (error) {
    console.error("Medical report PDF generation error:", error);
    throw error;
  }
};

export default generateMedicalReportPDF;
