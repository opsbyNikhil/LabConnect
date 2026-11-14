const testParameters = {
  // 1. Complete Blood Count
  "Complete Blood Count (CBC)": {
    sampleType: "Whole Blood (EDTA)",
    methodology: "Automated Hematology Analyzer",
    sections: [
      {
        name: "Complete Blood Count",
        parameters: [
          {
            parameter: "Haemoglobin",
            unit: "g/dL",
            referenceRange: "13.0–17.0",
          },
          {
            parameter: "RBC Count",
            unit: "million/µL",
            referenceRange: "4.5–5.9",
          },
          {
            parameter: "WBC Count",
            unit: "cells/µL",
            referenceRange: "4,000–11,000",
          },
          {
            parameter: "Platelet Count",
            unit: "cells/µL",
            referenceRange: "150,000–450,000",
          },
          {
            parameter: "Haematocrit (PCV)",
            unit: "%",
            referenceRange: "40–50",
          },
          { parameter: "MCV", unit: "fL", referenceRange: "80–100" },
          { parameter: "MCH", unit: "pg", referenceRange: "27–33" },
          { parameter: "MCHC", unit: "g/dL", referenceRange: "32–36" },
          { parameter: "Neutrophils", unit: "%", referenceRange: "40–70" },
          { parameter: "Lymphocytes", unit: "%", referenceRange: "20–40" },
          { parameter: "Eosinophils", unit: "%", referenceRange: "1–6" },
          { parameter: "Monocytes", unit: "%", referenceRange: "2–10" },
          { parameter: "Basophils", unit: "%", referenceRange: "0–2" },
        ],
      },
    ],
  },

  // 2. Lipid Profile
  "Lipid Profile": {
    sampleType: "Serum",
    methodology: "Enzymatic Colorimetric Method",
    sections: [
      {
        name: "Lipid Profile",
        parameters: [
          {
            parameter: "Total Cholesterol",
            unit: "mg/dL",
            referenceRange: "< 200",
          },
          {
            parameter: "HDL Cholesterol",
            unit: "mg/dL",
            referenceRange: "> 40",
          },
          {
            parameter: "LDL Cholesterol",
            unit: "mg/dL",
            referenceRange: "Lab/clinical target dependent",
          },
          {
            parameter: "VLDL Cholesterol",
            unit: "mg/dL",
            referenceRange: "5–40",
          },
          {
            parameter: "Triglycerides",
            unit: "mg/dL",
            referenceRange: "< 150",
          },
          {
            parameter: "Non-HDL Cholesterol",
            unit: "mg/dL",
            referenceRange: "< 160",
          },
          {
            parameter: "Total Cholesterol/HDL Ratio",
            unit: "Ratio",
            referenceRange: "Laboratory-specific",
          },
        ],
      },
    ],
  },

  // 3. Thyroid Profile
  "Thyroid Profile (T3, T4, TSH)": {
    sampleType: "Serum",
    methodology: "Chemiluminescence Immunoassay (CLIA)",
    sections: [
      {
        name: "Thyroid Profile",
        parameters: [
          { parameter: "Total T3", unit: "ng/dL", referenceRange: "80–200" },
          { parameter: "Total T4", unit: "µg/dL", referenceRange: "5.1–14.1" },
          { parameter: "TSH", unit: "µIU/mL", referenceRange: "0.4–4.0" },
        ],
      },
    ],
  },

  // 4. ECG
  ECG: {
    sampleType: "Electrical Cardiac Recording",
    methodology: "12-Lead Electrocardiography",
    sections: [
      {
        name: "ECG Measurements",
        parameters: [
          { parameter: "Heart Rate", unit: "bpm", referenceRange: "60–100" },
          { parameter: "PR Interval", unit: "ms", referenceRange: "120–200" },
          { parameter: "QRS Duration", unit: "ms", referenceRange: "< 120" },
          {
            parameter: "QT Interval",
            unit: "ms",
            referenceRange: "Heart-rate dependent",
          },
          {
            parameter: "QTc Interval",
            unit: "ms",
            referenceRange: "Sex and method dependent",
          },
          {
            parameter: "P Wave",
            unit: "—",
            referenceRange: "Clinical interpretation",
          },
          {
            parameter: "Rhythm",
            unit: "—",
            referenceRange: "Clinical interpretation",
          },
          {
            parameter: "ST Segment",
            unit: "—",
            referenceRange: "Clinical interpretation",
          },
        ],
      },
      {
        name: "ECG Impression",
        parameters: [
          {
            parameter: "Clinical Interpretation",
            unit: "—",
            referenceRange: "Professional assessment",
          },
        ],
      },
    ],
  },

  // 5. Chest X-Ray
  "Chest X-Ray": {
    sampleType: "Radiographic Imaging",
    methodology: "Digital Chest Radiography (PA View)",
    sections: [
      {
        name: "Radiological Findings",
        parameters: [
          {
            parameter: "Lung Fields",
            unit: "—",
            referenceRange: "Radiologist assessment",
          },
          {
            parameter: "Heart Size",
            unit: "—",
            referenceRange: "Radiologist assessment",
          },
          {
            parameter: "Cardiac Silhouette",
            unit: "—",
            referenceRange: "Radiologist assessment",
          },
          {
            parameter: "Diaphragm",
            unit: "—",
            referenceRange: "Radiologist assessment",
          },
          {
            parameter: "Costophrenic Angles",
            unit: "—",
            referenceRange: "Radiologist assessment",
          },
          {
            parameter: "Bony Thorax",
            unit: "—",
            referenceRange: "Radiologist assessment",
          },
          {
            parameter: "Pleural Space",
            unit: "—",
            referenceRange: "Radiologist assessment",
          },
        ],
      },
      {
        name: "Radiologist Impression",
        parameters: [
          {
            parameter: "Clinical Interpretation",
            unit: "—",
            referenceRange: "Professional assessment",
          },
        ],
      },
    ],
  },

  // 6. Full Body Health Checkup
  "Full Body Health Checkup": {
    sampleType: "Blood and Urine",
    methodology: "Multiple Laboratory Methods",
    sections: [
      {
        name: "A. Complete Blood Count",
        parameters: [
          { parameter: "Haemoglobin", unit: "g/dL", referenceRange: "" },
          { parameter: "RBC Count", unit: "million/µL", referenceRange: "" },
          { parameter: "WBC Count", unit: "cells/µL", referenceRange: "" },
          { parameter: "Platelet Count", unit: "cells/µL", referenceRange: "" },
        ],
      },
      {
        name: "B. Blood Sugar",
        parameters: [
          {
            parameter: "Fasting Blood Glucose",
            unit: "mg/dL",
            referenceRange: "",
          },
          { parameter: "HbA1c", unit: "%", referenceRange: "" },
          {
            parameter: "Estimated Average Glucose",
            unit: "mg/dL",
            referenceRange: "",
          },
        ],
      },
      {
        name: "C. Lipid Profile",
        parameters: [
          { parameter: "Total Cholesterol", unit: "mg/dL", referenceRange: "" },
          { parameter: "HDL Cholesterol", unit: "mg/dL", referenceRange: "" },
          { parameter: "LDL Cholesterol", unit: "mg/dL", referenceRange: "" },
          { parameter: "Triglycerides", unit: "mg/dL", referenceRange: "" },
        ],
      },
      {
        name: "D. Liver Function Test (LFT)",
        parameters: [
          { parameter: "Total Bilirubin", unit: "mg/dL", referenceRange: "" },
          { parameter: "Direct Bilirubin", unit: "mg/dL", referenceRange: "" },
          { parameter: "SGOT (AST)", unit: "U/L", referenceRange: "" },
          { parameter: "SGPT (ALT)", unit: "U/L", referenceRange: "" },
          {
            parameter: "Alkaline Phosphatase",
            unit: "U/L",
            referenceRange: "",
          },
          { parameter: "Total Protein", unit: "g/dL", referenceRange: "" },
          { parameter: "Albumin", unit: "g/dL", referenceRange: "" },
        ],
      },
      {
        name: "E. Kidney Function Test (KFT)",
        parameters: [
          { parameter: "Blood Urea", unit: "mg/dL", referenceRange: "" },
          { parameter: "Serum Creatinine", unit: "mg/dL", referenceRange: "" },
          { parameter: "Uric Acid", unit: "mg/dL", referenceRange: "" },
          { parameter: "Sodium", unit: "mmol/L", referenceRange: "" },
          { parameter: "Potassium", unit: "mmol/L", referenceRange: "" },
          { parameter: "Chloride", unit: "mmol/L", referenceRange: "" },
        ],
      },
      {
        name: "F. Thyroid Profile",
        parameters: [
          { parameter: "T3", unit: "ng/dL", referenceRange: "" },
          { parameter: "T4", unit: "µg/dL", referenceRange: "" },
          { parameter: "TSH", unit: "µIU/mL", referenceRange: "" },
        ],
      },
      {
        name: "G. Vitamin Profile",
        parameters: [
          { parameter: "Vitamin D (25-OH)", unit: "ng/mL", referenceRange: "" },
          { parameter: "Vitamin B12", unit: "pg/mL", referenceRange: "" },
        ],
      },
      {
        name: "H. Urine Routine Examination",
        parameters: [
          { parameter: "Colour", unit: "—", referenceRange: "" },
          { parameter: "Appearance", unit: "—", referenceRange: "" },
          { parameter: "pH", unit: "—", referenceRange: "" },
          { parameter: "Specific Gravity", unit: "—", referenceRange: "" },
          { parameter: "Protein", unit: "—", referenceRange: "" },
          { parameter: "Glucose", unit: "—", referenceRange: "" },
          { parameter: "Ketones", unit: "—", referenceRange: "" },
          { parameter: "Pus Cells", unit: "/HPF", referenceRange: "" },
          { parameter: "RBC", unit: "/HPF", referenceRange: "" },
        ],
      },
    ],
  },
};

export default testParameters;
