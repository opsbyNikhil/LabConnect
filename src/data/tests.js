const tests = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    category: "blood",
    description:
      "Evaluates overall health and detects various blood disorders.",
    price: 499,
    reportTime: "24 Hours",
    fasting: "Not Required",
  },
  {
    id: 2,
    name: "Lipid Profile",
    category: "blood",
    description:
      "Measures cholesterol and triglyceride levels to assess heart health.",
    price: 799,
    reportTime: "24 Hours",
    fasting: "10–12 Hours",
  },
  {
    id: 3,
    name: "Thyroid Profile (T3, T4, TSH)",
    category: "blood",
    description:
      "Checks thyroid function and helps identify thyroid disorders.",
    price: 599,
    reportTime: "24 Hours",
    fasting: "Not Required",
  },
  {
    id: 4,
    name: "ECG",
    category: "heart",
    description: "Records the electrical activity and rhythm of your heart.",
    price: 399,
    reportTime: "Same Day",
    fasting: "Not Required",
  },
  {
    id: 5,
    name: "Chest X-Ray",
    category: "imaging",
    description:
      "Provides images of the chest, lungs, heart, and surrounding structures.",
    price: 699,
    reportTime: "24 Hours",
    fasting: "Not Required",
  },
  {
    id: 6,
    name: "Full Body Health Checkup",
    category: "health",
    description:
      "A comprehensive package covering essential health parameters.",
    price: 1999,
    reportTime: "48 Hours",
    fasting: "As Advised",
  },
];

export default tests;
