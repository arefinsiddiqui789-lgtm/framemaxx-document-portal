import React from "react";

// ─── Types ───────────────────────────────────────────────────────────

export type FieldType = "text" | "textarea" | "select" | "date" | "checkbox";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  rows?: number;
}

export interface FieldGroup {
  title: string;
  fields: FieldDef[];
}

export interface TemplateDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  fieldGroups: FieldGroup[];
  defaultValues: Record<string, string | boolean>;
  render: (data: Record<string, string | boolean>) => React.ReactNode;
}

// ─── Shared Styles ───────────────────────────────────────────────────

const gold = "#D4AF37";
const darkText = "#1A1A1A";
const grayText = "#555555";
const lightGray = "#888888";
const borderColor = "#E0E0E0";

const sectionStyle: React.CSSProperties = { marginBottom: 20 };
const sectionHeaderStyle: React.CSSProperties = {
  fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5,
  color: gold, marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${borderColor}`,
};
const fieldRowStyle: React.CSSProperties = { display: "flex", marginBottom: 8, fontSize: 13, lineHeight: 1.6 };
const fieldLabelStyle: React.CSSProperties = { width: 160, fontWeight: 600, color: grayText, flexShrink: 0 };
const paragraphStyle: React.CSSProperties = { fontSize: 13, color: grayText, lineHeight: 1.8, marginBottom: 12 };

const val = (data: Record<string, string | boolean>, key: string, fallback = ""): string => {
  const v = data[key];
  return typeof v === "string" ? (v.trim() || fallback) : fallback;
};

const fieldLine = (data: Record<string, string | boolean>, key: string): React.CSSProperties => ({
  borderBottom: "1px solid #CCCCCC", flexGrow: 1, minWidth: 200,
  color: val(data, key) ? darkText : "transparent",
});

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ textAlign: "center", paddingBottom: 20, borderBottom: `3px solid ${gold}`, marginBottom: 24 }}>
      <div style={{ fontSize: 11, color: gold, letterSpacing: 3, marginBottom: 4, fontWeight: 700 }}>FRAMEMAXX</div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: darkText, margin: 0 }}>{title}</h1>
      {subtitle && <div style={{ fontSize: 12, color: lightGray, marginTop: 4 }}>{subtitle}</div>}
    </div>
  );
}

function PageFooter() {
  return (
    <div style={{ marginTop: 40, paddingTop: 16, borderTop: `2px solid ${gold}`, textAlign: "center" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: gold, letterSpacing: 2 }}>FRAMEMAXX</div>
      <div style={{ fontSize: 10, color: lightGray, marginTop: 2 }}>FrameMaxx Web Development Agency • framemaxx.com</div>
    </div>
  );
}

function SigBlock({ party }: { party: string }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ borderTop: "1px solid #333", paddingTop: 6, fontSize: 11, color: lightGray, marginTop: 50 }}>
        <strong>{party}</strong><br />Signature
      </div>
      <div style={{ borderTop: "1px solid #333", paddingTop: 6, fontSize: 11, color: lightGray, marginTop: 20 }}>Date</div>
    </div>
  );
}

function FR({ label, value, style }: { label: string; value: string; style?: React.CSSProperties }) {
  return (
    <div style={fieldRowStyle}>
      <span style={fieldLabelStyle}>{label}</span>
      <span style={{ ...style, color: value ? darkText : grayText, flexGrow: 1, minWidth: 200, borderBottom: "1px solid #CCCCCC" }}>{value || "—"}</span>
    </div>
  );
}

// ─── 1. CONTRACT ─────────────────────────────────────────────────────

const contractFields: FieldGroup[] = [
  {
    title: "Document Info",
    fields: [
      { key: "contractId", label: "Contract ID", type: "text", placeholder: "FMX-CON-001" },
      { key: "date", label: "Date", type: "date" },
    ],
  },
  {
    title: "Client Information",
    fields: [
      { key: "clientName", label: "Client Name", type: "text", placeholder: "John Doe" },
      { key: "clientBusiness", label: "Business Name", type: "text", placeholder: "Acme Inc." },
      { key: "clientEmail", label: "Email", type: "text", placeholder: "john@acme.com" },
      { key: "clientPhone", label: "Phone", type: "text", placeholder: "+1 (555) 000-0000" },
    ],
  },
  {
    title: "Payment",
    fields: [
      { key: "totalFee", label: "Total Project Fee", type: "text", placeholder: "$5,000" },
      { key: "paymentSchedule", label: "Payment Schedule", type: "select", options: ["50% upfront + 50% on completion", "Milestone-based", "Monthly retainer", "Custom"] },
    ],
  },
  {
    title: "Timeline",
    fields: [
      { key: "startDate", label: "Start Date", type: "date" },
      { key: "completionDate", label: "Est. Completion", type: "date" },
    ],
  },
];

const contractDefaults: Record<string, string | boolean> = {
  contractId: "", date: "", clientName: "", clientBusiness: "", clientEmail: "",
  clientPhone: "", totalFee: "", paymentSchedule: "", startDate: "", completionDate: "",
};

function contractRender(data: Record<string, string | boolean>) {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
      <PageHeader title="Web Development Service Agreement" subtitle="Master Service Contract" />
      <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
        <span>Contract ID: {val(data, "contractId", "[___________]")}</span>
        <span>Date: {val(data, "date", "[___________]")}</span>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Parties</div>
        <div style={fieldRowStyle}><span style={fieldLabelStyle}>Service Provider:</span><span>FrameMaxx Web Development Agency</span></div>
        <FR label="Client Name" value={val(data, "clientName")} />
        <FR label="Client Business" value={val(data, "clientBusiness")} />
        <FR label="Client Email" value={val(data, "clientEmail")} />
        <FR label="Client Phone" value={val(data, "clientPhone")} />
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>1. Scope of Services</div>
        <p style={paragraphStyle}>FrameMaxx agrees to provide web development services as described in the attached Statement of Work (SOW) or Project Proposal. The scope includes design, development, testing, and deployment of the agreed-upon deliverables.</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>2. Payment Terms</div>
        <FR label="Total Project Fee" value={val(data, "totalFee")} />
        <FR label="Payment Schedule" value={val(data, "paymentSchedule")} />
        <p style={paragraphStyle}>All invoices are due within 15 business days of receipt. Late payments are subject to a 1.5% monthly interest charge.</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>3. Timeline & Deliverables</div>
        <FR label="Start Date" value={val(data, "startDate")} />
        <FR label="Est. Completion" value={val(data, "completionDate")} />
        <p style={paragraphStyle}>Timelines are estimates and may be affected by client feedback delays, scope changes, or third-party dependencies.</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>4. Intellectual Property</div>
        <p style={paragraphStyle}>Upon full payment, the Client receives ownership of all custom code and design assets. FrameMaxx retains the right to use generic code libraries, frameworks, and tools.</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>5. Confidentiality</div>
        <p style={paragraphStyle}>Both parties agree to maintain the confidentiality of proprietary information shared during the engagement. This obligation survives termination for 2 years.</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>6. Revisions & Change Requests</div>
        <p style={paragraphStyle}>The agreed scope includes up to 2 rounds of revisions per deliverable. Additional changes require a Change Request Form.</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>7. Termination</div>
        <p style={paragraphStyle}>Either party may terminate with 30 days written notice. Client is responsible for payment of all work completed up to termination.</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>8. Limitation of Liability</div>
        <p style={paragraphStyle}>FrameMaxx&apos;s total liability shall not exceed total fees paid. Not liable for indirect, incidental, or consequential damages.</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, gap: 40 }}>
        <SigBlock party="FrameMaxx" /><SigBlock party="Client" />
      </div>
      <PageFooter />
    </div>
  );
}

// ─── 2. NDA ──────────────────────────────────────────────────────────

const ndaFields: FieldGroup[] = [
  {
    title: "Document Info",
    fields: [
      { key: "ndaId", label: "NDA ID", type: "text", placeholder: "FMX-NDA-001" },
      { key: "effectiveDate", label: "Effective Date", type: "date" },
    ],
  },
  {
    title: "Receiving Party",
    fields: [
      { key: "receivingParty", label: "Name / Company", type: "text", placeholder: "Client Name" },
      { key: "receivingTitle", label: "Title / Role", type: "text", placeholder: "CEO" },
    ],
  },
  {
    title: "Term",
    fields: [
      { key: "duration", label: "Agreement Duration", type: "text", placeholder: "2 years" },
    ],
  },
];

const ndaDefaults: Record<string, string | boolean> = {
  ndaId: "", effectiveDate: "", receivingParty: "", receivingTitle: "", duration: "",
};

function ndaRender(data: Record<string, string | boolean>) {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
      <PageHeader title="Non-Disclosure Agreement" subtitle="Confidentiality Agreement" />
      <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
        <span>NDA ID: {val(data, "ndaId", "[___________]")}</span>
        <span>Effective Date: {val(data, "effectiveDate", "[___________]")}</span>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Parties</div>
        <p style={paragraphStyle}>This Non-Disclosure Agreement (&quot;Agreement&quot;) is entered into by and between:</p>
        <div style={fieldRowStyle}><span style={fieldLabelStyle}>Disclosing Party:</span><span>FrameMaxx Web Development Agency</span></div>
        <FR label="Receiving Party" value={val(data, "receivingParty")} />
        <FR label="Title / Role" value={val(data, "receivingTitle")} />
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>1. Purpose</div>
        <p style={paragraphStyle}>The Parties wish to explore a potential business relationship relating to web development services. Each Party may disclose certain confidential and proprietary information to the other.</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>2. Definition of Confidential Information</div>
        <p style={paragraphStyle}>&quot;Confidential Information&quot; means any and all non-public information, including but not limited to: business plans, technical data, trade secrets, software code, design specifications, client lists, pricing information, marketing strategies, and financial data.</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>3. Obligations of Receiving Party</div>
        <p style={paragraphStyle}>The Receiving Party agrees to: (a) hold Confidential Information in strict confidence; (b) not disclose to any third parties without prior written consent; (c) use solely for the Purpose; (d) protect using reasonable care; (e) limit access to employees who need to know.</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>4. Exclusions</div>
        <p style={paragraphStyle}>Does not include information that: (a) is or becomes publicly available; (b) was known prior to disclosure; (c) is independently developed; (d) is rightfully obtained from a third party.</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>5. Term</div>
        <FR label="Agreement Duration" value={val(data, "duration")} />
        <p style={paragraphStyle}>Obligations survive for 2 years from date of disclosure, unless a longer period is agreed upon in writing.</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>6. Return of Information</div>
        <p style={paragraphStyle}>Upon request or termination, the Receiving Party shall promptly return or destroy all Confidential Information and copies.</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>7. Remedies</div>
        <p style={paragraphStyle}>The Disclosing Party shall be entitled to seek injunctive relief for any breach, in addition to other available remedies.</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, gap: 40 }}>
        <SigBlock party="FrameMaxx (Disclosing Party)" /><SigBlock party="Receiving Party" />
      </div>
      <PageFooter />
    </div>
  );
}

// ─── 3. PROPOSAL ─────────────────────────────────────────────────────

const proposalFields: FieldGroup[] = [
  {
    title: "Document Info",
    fields: [
      { key: "proposalId", label: "Proposal ID", type: "text", placeholder: "FMX-PROP-001" },
      { key: "date", label: "Date", type: "date" },
    ],
  },
  {
    title: "Prepared For",
    fields: [
      { key: "clientName", label: "Client Name", type: "text", placeholder: "Jane Smith" },
      { key: "company", label: "Company", type: "text", placeholder: "Acme Corp" },
      { key: "clientEmail", label: "Email", type: "text", placeholder: "jane@acme.com" },
    ],
  },
  {
    title: "Prepared By",
    fields: [
      { key: "projectManager", label: "Project Manager", type: "text", placeholder: "Alex Johnson" },
    ],
  },
  {
    title: "Project Overview",
    fields: [
      { key: "projectName", label: "Project Name", type: "text", placeholder: "Acme Website Redesign" },
      { key: "projectType", label: "Project Type", type: "select", options: ["Portfolio", "Business Website", "E-commerce", "Custom Web App"] },
      { key: "projectDescription", label: "Description", type: "textarea", rows: 4, placeholder: "Describe the project goals and expected outcomes..." },
    ],
  },
  {
    title: "Proposed Solution",
    fields: [
      { key: "solution", label: "Technical Approach", type: "textarea", rows: 4, placeholder: "Describe the technical approach and methodology..." },
    ],
  },
  {
    title: "Milestones",
    fields: [
      { key: "m1", label: "Milestone 1", type: "text", placeholder: "Discovery & Wireframes" },
      { key: "m1Time", label: "Duration", type: "text", placeholder: "2 weeks" },
      { key: "m1Cost", label: "Cost", type: "text", placeholder: "$1,500" },
      { key: "m2", label: "Milestone 2", type: "text", placeholder: "Design & Prototyping" },
      { key: "m2Time", label: "Duration", type: "text", placeholder: "2 weeks" },
      { key: "m2Cost", label: "Cost", type: "text", placeholder: "$1,500" },
      { key: "m3", label: "Milestone 3", type: "text", placeholder: "Development" },
      { key: "m3Time", label: "Duration", type: "text", placeholder: "4 weeks" },
      { key: "m3Cost", label: "Cost", type: "text", placeholder: "$3,000" },
      { key: "m4", label: "Milestone 4", type: "text", placeholder: "Testing & Launch" },
      { key: "m4Time", label: "Duration", type: "text", placeholder: "2 weeks" },
      { key: "m4Cost", label: "Cost", type: "text", placeholder: "$1,000" },
    ],
  },
  {
    title: "Investment",
    fields: [
      { key: "totalCost", label: "Total Project Cost", type: "text", placeholder: "$7,000" },
      { key: "paymentTerms", label: "Payment Terms", type: "select", options: ["50/50", "40/30/30", "Monthly", "Custom"] },
    ],
  },
];

const proposalDefaults: Record<string, string | boolean> = {
  proposalId: "", date: "", clientName: "", company: "", clientEmail: "", projectManager: "",
  projectName: "", projectType: "", projectDescription: "", solution: "",
  m1: "", m1Time: "", m1Cost: "", m2: "", m2Time: "", m2Cost: "",
  m3: "", m3Time: "", m3Cost: "", m4: "", m4Time: "", m4Cost: "",
  totalCost: "", paymentTerms: "",
};

function proposalRender(data: Record<string, string | boolean>) {
  const milestones = [
    { name: val(data, "m1", "[Milestone 1]"), time: val(data, "m1Time", "[Weeks]"), cost: val(data, "m1Cost", "[$0]") },
    { name: val(data, "m2", "[Milestone 2]"), time: val(data, "m2Time", "[Weeks]"), cost: val(data, "m2Cost", "[$0]") },
    { name: val(data, "m3", "[Milestone 3]"), time: val(data, "m3Time", "[Weeks]"), cost: val(data, "m3Cost", "[$0]") },
    { name: val(data, "m4", "[Milestone 4]"), time: val(data, "m4Time", "[Weeks]"), cost: val(data, "m4Cost", "[$0]") },
  ];
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
      <PageHeader title="Project Proposal" subtitle="Web Development Services" />
      <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
        <span>Proposal ID: {val(data, "proposalId", "[___________]")}</span>
        <span>Date: {val(data, "date", "[___________]")}</span>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Prepared For</div>
        <FR label="Client Name" value={val(data, "clientName")} />
        <FR label="Company" value={val(data, "company")} />
        <FR label="Email" value={val(data, "clientEmail")} />
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Prepared By</div>
        <div style={fieldRowStyle}><span style={fieldLabelStyle}>Agency:</span><span>FrameMaxx Web Development Agency</span></div>
        <FR label="Project Manager" value={val(data, "projectManager")} />
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Project Overview</div>
        <FR label="Project Name" value={val(data, "projectName")} />
        <FR label="Project Type" value={val(data, "projectType")} />
        <p style={paragraphStyle}>{val(data, "projectDescription", "[Project description will appear here]")}</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Proposed Solution</div>
        <p style={paragraphStyle}>{val(data, "solution", "[Technical approach will appear here]")}</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Deliverables & Milestones</div>
        <div style={{ fontSize: 12, width: "100%" }}>
          <div style={{ display: "flex", fontWeight: 700, borderBottom: `2px solid ${gold}`, paddingBottom: 6, marginBottom: 6 }}>
            <span style={{ flex: 0.5 }}>#</span><span style={{ flex: 2 }}>Milestone</span><span style={{ flex: 1 }}>Timeline</span><span style={{ flex: 1 }}>Cost</span>
          </div>
          {milestones.map((m, i) => (
            <div key={i} style={{ display: "flex", borderBottom: `1px solid ${borderColor}`, padding: "6px 0", color: grayText }}>
              <span style={{ flex: 0.5 }}>{i + 1}</span><span style={{ flex: 2 }}>{m.name}</span><span style={{ flex: 1 }}>{m.time}</span><span style={{ flex: 1 }}>{m.cost}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Investment</div>
        <FR label="Total Project Cost" value={val(data, "totalCost")} />
        <FR label="Payment Terms" value={val(data, "paymentTerms")} />
      </div>
      <PageFooter />
    </div>
  );
}

// ─── 4. INVOICE ──────────────────────────────────────────────────────

const invoiceFields: FieldGroup[] = [
  {
    title: "Invoice Info",
    fields: [
      { key: "invoiceNumber", label: "Invoice #", type: "text", placeholder: "FMX-INV-001" },
      { key: "date", label: "Date", type: "date" },
      { key: "dueDate", label: "Due Date", type: "date" },
    ],
  },
  {
    title: "From (Agency)",
    fields: [
      { key: "fromAddress", label: "Address", type: "text", placeholder: "123 Main St, City, ZIP" },
      { key: "fromEmail", label: "Email", type: "text", placeholder: "billing@framemaxx.com" },
      { key: "fromPhone", label: "Phone", type: "text", placeholder: "+1 (555) 000-0000" },
    ],
  },
  {
    title: "Bill To",
    fields: [
      { key: "clientName", label: "Client Name", type: "text", placeholder: "Jane Smith" },
      { key: "clientCompany", label: "Company", type: "text", placeholder: "Acme Corp" },
      { key: "clientAddress", label: "Address", type: "text", placeholder: "456 Oak Ave, City, ZIP" },
      { key: "clientEmail", label: "Email", type: "text", placeholder: "jane@acme.com" },
    ],
  },
  {
    title: "Project",
    fields: [
      { key: "projectName", label: "Project Name", type: "text", placeholder: "Website Redesign" },
      { key: "projectId", label: "Project ID", type: "text", placeholder: "FMX-PRJ-001" },
    ],
  },
  {
    title: "Line Items",
    fields: [
      { key: "item1Desc", label: "Item 1 Description", type: "text", placeholder: "UI/UX Design" },
      { key: "item1Qty", label: "Qty", type: "text", placeholder: "1" },
      { key: "item1Rate", label: "Rate", type: "text", placeholder: "$2,000" },
      { key: "item1Amount", label: "Amount", type: "text", placeholder: "$2,000" },
      { key: "item2Desc", label: "Item 2 Description", type: "text", placeholder: "Frontend Development" },
      { key: "item2Qty", label: "Qty", type: "text", placeholder: "1" },
      { key: "item2Rate", label: "Rate", type: "text", placeholder: "$3,000" },
      { key: "item2Amount", label: "Amount", type: "text", placeholder: "$3,000" },
      { key: "item3Desc", label: "Item 3 Description", type: "text", placeholder: "Testing & Deployment" },
      { key: "item3Qty", label: "Qty", type: "text", placeholder: "1" },
      { key: "item3Rate", label: "Rate", type: "text", placeholder: "$1,000" },
      { key: "item3Amount", label: "Amount", type: "text", placeholder: "$1,000" },
    ],
  },
  {
    title: "Totals",
    fields: [
      { key: "subtotal", label: "Subtotal", type: "text", placeholder: "$6,000.00" },
      { key: "tax", label: "Tax", type: "text", placeholder: "$0.00" },
      { key: "totalDue", label: "Total Due", type: "text", placeholder: "$6,000.00" },
    ],
  },
  {
    title: "Payment Info",
    fields: [
      { key: "bankName", label: "Bank Name", type: "text", placeholder: "First National Bank" },
      { key: "accountNumber", label: "Account Number", type: "text", placeholder: "XXXX-XXXX-XXXX" },
      { key: "routingNumber", label: "Routing Number", type: "text", placeholder: "XXXX-XXXX" },
    ],
  },
];

const invoiceDefaults: Record<string, string | boolean> = {
  invoiceNumber: "", date: "", dueDate: "", fromAddress: "", fromEmail: "", fromPhone: "",
  clientName: "", clientCompany: "", clientAddress: "", clientEmail: "",
  projectName: "", projectId: "",
  item1Desc: "", item1Qty: "", item1Rate: "", item1Amount: "",
  item2Desc: "", item2Qty: "", item2Rate: "", item2Amount: "",
  item3Desc: "", item3Qty: "", item3Rate: "", item3Amount: "",
  subtotal: "", tax: "", totalDue: "",
  bankName: "", accountNumber: "", routingNumber: "",
};

function invoiceRender(data: Record<string, string | boolean>) {
  const items = [
    { desc: val(data, "item1Desc", "[Service]"), qty: val(data, "item1Qty", "1"), rate: val(data, "item1Rate", "$0"), amount: val(data, "item1Amount", "$0") },
    { desc: val(data, "item2Desc", "[Service]"), qty: val(data, "item2Qty", "1"), rate: val(data, "item2Rate", "$0"), amount: val(data, "item2Amount", "$0") },
    { desc: val(data, "item3Desc", "[Service]"), qty: val(data, "item3Qty", "1"), rate: val(data, "item3Rate", "$0"), amount: val(data, "item3Amount", "$0") },
  ];
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: gold, letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>FRAMEMAXX</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: darkText }}>INVOICE</div>
        </div>
        <div style={{ textAlign: "right", fontSize: 13, color: grayText }}>
          <div style={{ fontWeight: 700, color: darkText, fontSize: 16 }}>Invoice #: {val(data, "invoiceNumber", "[___________]")}</div>
          <div>Date: {val(data, "date", "[___________]")}</div>
          <div>Due Date: {val(data, "dueDate", "[___________]")}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 40, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={sectionHeaderStyle}>From</div>
          <div style={{ fontSize: 13, lineHeight: 1.8, color: grayText }}>
            <strong style={{ color: darkText }}>FrameMaxx Web Development Agency</strong><br />
            {val(data, "fromAddress", "[Address]")}<br />
            {val(data, "fromEmail", "[Email]")} | {val(data, "fromPhone", "[Phone]")}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={sectionHeaderStyle}>Bill To</div>
          <div style={{ fontSize: 13, lineHeight: 1.8, color: grayText }}>
            <strong style={{ color: darkText }}>{val(data, "clientName", "[Client Name]")}</strong><br />
            {val(data, "clientCompany", "[Company]")}<br />
            {val(data, "clientAddress", "[Address]")}<br />
            {val(data, "clientEmail", "[Email]")}
          </div>
        </div>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Project Details</div>
        <FR label="Project Name" value={val(data, "projectName")} />
        <FR label="Project ID" value={val(data, "projectId")} />
      </div>
      <div style={sectionStyle}>
        <div style={{ fontSize: 12, width: "100%" }}>
          <div style={{ display: "flex", fontWeight: 700, borderBottom: `2px solid ${gold}`, paddingBottom: 8, marginBottom: 4 }}>
            <span style={{ flex: 0.5 }}>#</span><span style={{ flex: 3 }}>Description</span><span style={{ flex: 0.7, textAlign: "center" }}>Qty</span><span style={{ flex: 1.2, textAlign: "right" }}>Rate</span><span style={{ flex: 1.2, textAlign: "right" }}>Amount</span>
          </div>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", borderBottom: `1px solid ${borderColor}`, padding: "8px 0", color: grayText, fontSize: 13 }}>
              <span style={{ flex: 0.5 }}>{i + 1}</span><span style={{ flex: 3 }}>{item.desc}</span><span style={{ flex: 0.7, textAlign: "center" }}>{item.qty}</span><span style={{ flex: 1.2, textAlign: "right" }}>{item.rate}</span><span style={{ flex: 1.2, textAlign: "right" }}>{item.amount}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <div style={{ width: 250 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0", borderBottom: `1px solid ${borderColor}` }}>
            <span style={{ color: grayText }}>Subtotal</span><span style={{ fontWeight: 600 }}>{val(data, "subtotal", "$0.00")}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0", borderBottom: `1px solid ${borderColor}` }}>
            <span style={{ color: grayText }}>Tax</span><span style={{ fontWeight: 600 }}>{val(data, "tax", "$0.00")}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, padding: "8px 0", fontWeight: 700, borderBottom: `2px solid ${gold}` }}>
            <span>Total Due</span><span style={{ color: gold }}>{val(data, "totalDue", "$0.00")}</span>
          </div>
        </div>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Payment Information</div>
        <p style={paragraphStyle}>Payment is due within 15 business days. Include the invoice number in your payment reference.</p>
        <FR label="Bank Name" value={val(data, "bankName")} />
        <div style={fieldRowStyle}><span style={fieldLabelStyle}>Account Name:</span><span>FrameMaxx Web Development Agency</span></div>
        <FR label="Account Number" value={val(data, "accountNumber")} />
        <FR label="Routing Number" value={val(data, "routingNumber")} />
      </div>
      <div style={{ textAlign: "center", fontSize: 11, color: lightGray, marginTop: 30 }}>Thank you for your business!</div>
      <PageFooter />
    </div>
  );
}

// ─── 5. PROJECT BRIEF ────────────────────────────────────────────────

const projectBriefFields: FieldGroup[] = [
  {
    title: "Document Info",
    fields: [
      { key: "briefId", label: "Brief ID", type: "text", placeholder: "FMX-PB-001" },
      { key: "date", label: "Date", type: "date" },
    ],
  },
  {
    title: "Client Information",
    fields: [
      { key: "fullName", label: "Full Name", type: "text", placeholder: "John Doe" },
      { key: "email", label: "Email Address", type: "text", placeholder: "john@company.com" },
      { key: "phone", label: "Phone Number", type: "text", placeholder: "+1 (555) 000-0000" },
      { key: "company", label: "Company Name", type: "text", placeholder: "Acme Inc." },
      { key: "jobTitle", label: "Job Title", type: "text", placeholder: "Marketing Director" },
    ],
  },
  {
    title: "Business Overview",
    fields: [
      { key: "businessDesc", label: "Describe your business", type: "textarea", rows: 3, placeholder: "What does your business do?" },
      { key: "targetAudience", label: "Target audience", type: "textarea", rows: 3, placeholder: "Who are your customers?" },
      { key: "competitors", label: "Main competitors", type: "textarea", rows: 2, placeholder: "Who are your competitors?" },
    ],
  },
  {
    title: "Project Goals",
    fields: [
      { key: "primaryGoal", label: "Primary goal", type: "text", placeholder: "Increase online sales by 50%" },
      { key: "problems", label: "Problems to solve", type: "textarea", rows: 3, placeholder: "What challenges are you facing?" },
      { key: "successMetrics", label: "How to measure success", type: "text", placeholder: "Conversion rate, traffic, engagement" },
    ],
  },
  {
    title: "Project Specifications",
    fields: [
      { key: "projectType", label: "Project Type", type: "select", options: ["Portfolio", "Business Website", "E-commerce", "Web App", "Other"] },
      { key: "budgetRange", label: "Budget Range", type: "select", options: ["$500 - $1,000", "$1,000 - $3,000", "$3,000 - $5,000", "$5,000 - $10,000", "$10,000 - $25,000", "$25,000+"] },
      { key: "launchDate", label: "Target Launch Date", type: "date" },
      { key: "existingWebsite", label: "Existing Website URL", type: "text", placeholder: "https://..." },
    ],
  },
  {
    title: "Features & Design",
    fields: [
      { key: "features", label: "Key features needed", type: "textarea", rows: 3, placeholder: "Login, payments, admin dashboard..." },
      { key: "integrations", label: "Third-party integrations", type: "text", placeholder: "Stripe, Mailchimp, etc." },
      { key: "references", label: "Reference websites", type: "textarea", rows: 2, placeholder: "https://stripe.com, https://linear.app..." },
      { key: "brandColors", label: "Brand colors", type: "text", placeholder: "#1A1A1A, #D4AF37" },
      { key: "stylePreference", label: "Style preference", type: "select", options: ["Minimal", "Bold", "Corporate", "Creative", "Other"] },
    ],
  },
];

const projectBriefDefaults: Record<string, string | boolean> = {
  briefId: "", date: "", fullName: "", email: "", phone: "", company: "", jobTitle: "",
  businessDesc: "", targetAudience: "", competitors: "",
  primaryGoal: "", problems: "", successMetrics: "",
  projectType: "", budgetRange: "", launchDate: "", existingWebsite: "",
  features: "", integrations: "", references: "", brandColors: "", stylePreference: "",
};

function projectBriefRender(data: Record<string, string | boolean>) {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
      <PageHeader title="Project Brief" subtitle="Client Intake Questionnaire" />
      <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
        <span>Brief ID: {val(data, "briefId", "[___________]")}</span><span>Date: {val(data, "date", "[___________]")}</span>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Client Information</div>
        <FR label="Full Name" value={val(data, "fullName")} />
        <FR label="Email Address" value={val(data, "email")} />
        <FR label="Phone Number" value={val(data, "phone")} />
        <FR label="Company Name" value={val(data, "company")} />
        <FR label="Job Title" value={val(data, "jobTitle")} />
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Business Overview</div>
        <p style={paragraphStyle}><strong style={{ color: darkText }}>Describe your business:</strong><br />{val(data, "businessDesc", "[___________]")}</p>
        <p style={paragraphStyle}><strong style={{ color: darkText }}>Target audience:</strong><br />{val(data, "targetAudience", "[___________]")}</p>
        <p style={paragraphStyle}><strong style={{ color: darkText }}>Main competitors:</strong><br />{val(data, "competitors", "[___________]")}</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Project Goals</div>
        <FR label="Primary Goal" value={val(data, "primaryGoal")} />
        <p style={paragraphStyle}><strong style={{ color: darkText }}>Problems to solve:</strong><br />{val(data, "problems", "[___________]")}</p>
        <FR label="Success Metrics" value={val(data, "successMetrics")} />
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Project Specifications</div>
        <FR label="Project Type" value={val(data, "projectType")} />
        <FR label="Budget Range" value={val(data, "budgetRange")} />
        <FR label="Target Launch Date" value={val(data, "launchDate")} />
        <FR label="Existing Website" value={val(data, "existingWebsite")} />
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Features & Design</div>
        <p style={paragraphStyle}><strong style={{ color: darkText }}>Key features:</strong><br />{val(data, "features", "[___________]")}</p>
        <FR label="Integrations" value={val(data, "integrations")} />
        <p style={paragraphStyle}><strong style={{ color: darkText }}>Reference websites:</strong><br />{val(data, "references", "[___________]")}</p>
        <FR label="Brand Colors" value={val(data, "brandColors")} />
        <FR label="Style Preference" value={val(data, "stylePreference")} />
      </div>
      <PageFooter />
    </div>
  );
}

// ─── 6. SCOPE OF WORK ────────────────────────────────────────────────

const sowFields: FieldGroup[] = [
  {
    title: "Document Info",
    fields: [
      { key: "sowId", label: "SOW ID", type: "text", placeholder: "FMX-SOW-001" },
      { key: "date", label: "Date", type: "date" },
    ],
  },
  {
    title: "Project",
    fields: [
      { key: "projectName", label: "Project Name", type: "text", placeholder: "E-commerce Platform" },
      { key: "client", label: "Client", type: "text", placeholder: "Acme Corp" },
      { key: "projectManager", label: "Project Manager", type: "text", placeholder: "Alex Johnson" },
      { key: "projectOverview", label: "Overview", type: "textarea", rows: 3, placeholder: "Comprehensive project overview..." },
    ],
  },
  {
    title: "Objectives",
    fields: [
      { key: "obj1", label: "Objective 1", type: "text", placeholder: "Design a responsive, modern website" },
      { key: "obj2", label: "Objective 2", type: "text", placeholder: "Implement user authentication" },
      { key: "obj3", label: "Objective 3", type: "text", placeholder: "Integrate payment processing" },
      { key: "obj4", label: "Objective 4", type: "text", placeholder: "Ensure SEO optimization" },
    ],
  },
  {
    title: "Technical Specifications",
    fields: [
      { key: "frontend", label: "Frontend", type: "text", placeholder: "Next.js, React, Tailwind CSS" },
      { key: "backend", label: "Backend", type: "text", placeholder: "Node.js, Express" },
      { key: "database", label: "Database", type: "text", placeholder: "PostgreSQL" },
      { key: "hosting", label: "Hosting", type: "text", placeholder: "Vercel / AWS" },
    ],
  },
  {
    title: "Timeline Phases",
    fields: [
      { key: "p1Duration", label: "Discovery Duration", type: "text", placeholder: "1 week" },
      { key: "p2Duration", label: "Design Duration", type: "text", placeholder: "2 weeks" },
      { key: "p3Duration", label: "Development Duration", type: "text", placeholder: "4 weeks" },
      { key: "p4Duration", label: "Testing Duration", type: "text", placeholder: "1 week" },
      { key: "p5Duration", label: "Launch Duration", type: "text", placeholder: "1 week" },
    ],
  },
];

const sowDefaults: Record<string, string | boolean> = {
  sowId: "", date: "", projectName: "", client: "", projectManager: "", projectOverview: "",
  obj1: "", obj2: "", obj3: "", obj4: "",
  frontend: "", backend: "", database: "", hosting: "",
  p1Duration: "", p2Duration: "", p3Duration: "", p4Duration: "", p5Duration: "",
};

function sowRender(data: Record<string, string | boolean>) {
  const phases = [
    { name: "Discovery", duration: val(data, "p1Duration", "[X weeks]") },
    { name: "Design", duration: val(data, "p2Duration", "[X weeks]") },
    { name: "Development", duration: val(data, "p3Duration", "[X weeks]") },
    { name: "Testing", duration: val(data, "p4Duration", "[X weeks]") },
    { name: "Launch", duration: val(data, "p5Duration", "[X weeks]") },
  ];
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
      <PageHeader title="Scope of Work" subtitle="Statement of Work" />
      <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
        <span>SOW ID: {val(data, "sowId", "[___________]")}</span><span>Date: {val(data, "date", "[___________]")}</span>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Project Overview</div>
        <FR label="Project Name" value={val(data, "projectName")} />
        <FR label="Client" value={val(data, "client")} />
        <FR label="Project Manager" value={val(data, "projectManager")} />
        <p style={paragraphStyle}>{val(data, "projectOverview", "[Project overview]")}</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Objectives</div>
        <p style={paragraphStyle}>
          1. {val(data, "obj1", "[Objective 1]")}<br />
          2. {val(data, "obj2", "[Objective 2]")}<br />
          3. {val(data, "obj3", "[Objective 3]")}<br />
          4. {val(data, "obj4", "[Objective 4]")}
        </p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>In Scope</div>
        <p style={paragraphStyle}>
          ☐ Custom UI/UX design &nbsp;&nbsp; ☐ Responsive development &nbsp;&nbsp; ☐ CMS integration<br />
          ☐ User authentication &nbsp;&nbsp; ☐ Payment gateway &nbsp;&nbsp; ☐ SEO optimization<br />
          ☐ Performance optimization &nbsp;&nbsp; ☐ Cross-browser testing &nbsp;&nbsp; ☐ Deployment &nbsp;&nbsp; ☐ 30-day support
        </p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Out of Scope</div>
        <p style={paragraphStyle}>
          ☐ Content writing &nbsp;&nbsp; ☐ Photography &nbsp;&nbsp; ☐ Video production<br />
          ☐ Ongoing maintenance &nbsp;&nbsp; ☐ Mobile app development &nbsp;&nbsp; ☐ Third-party API development
        </p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Technical Specifications</div>
        <FR label="Frontend" value={val(data, "frontend")} />
        <FR label="Backend" value={val(data, "backend")} />
        <FR label="Database" value={val(data, "database")} />
        <FR label="Hosting" value={val(data, "hosting")} />
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Timeline</div>
        <div style={{ fontSize: 12, width: "100%" }}>
          <div style={{ display: "flex", fontWeight: 700, borderBottom: `2px solid ${gold}`, paddingBottom: 6, marginBottom: 6 }}>
            <span style={{ flex: 0.5 }}>#</span><span style={{ flex: 2 }}>Phase</span><span style={{ flex: 1 }}>Duration</span>
          </div>
          {phases.map((p, i) => (
            <div key={p.name} style={{ display: "flex", borderBottom: `1px solid ${borderColor}`, padding: "6px 0", color: grayText }}>
              <span style={{ flex: 0.5 }}>{i + 1}</span><span style={{ flex: 2 }}>{p.name}</span><span style={{ flex: 1 }}>{p.duration}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Assumptions & Dependencies</div>
        <p style={paragraphStyle}>
          • Client provides content & assets within 5 business days<br />
          • Client provides feedback within 48 hours per review<br />
          • Third-party services are client&apos;s responsibility unless noted<br />
          • Scope changes require a formal Change Request
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, gap: 40 }}>
        <SigBlock party="FrameMaxx" /><SigBlock party="Client" />
      </div>
      <PageFooter />
    </div>
  );
}

// ─── 7. CHANGE REQUEST ───────────────────────────────────────────────

const changeRequestFields: FieldGroup[] = [
  {
    title: "Document Info",
    fields: [
      { key: "crId", label: "CR ID", type: "text", placeholder: "FMX-CR-001" },
      { key: "date", label: "Date", type: "date" },
    ],
  },
  {
    title: "Project Information",
    fields: [
      { key: "projectName", label: "Project Name", type: "text", placeholder: "E-commerce Platform" },
      { key: "projectId", label: "Project ID", type: "text", placeholder: "FMX-PRJ-001" },
      { key: "currentPhase", label: "Current Phase", type: "select", options: ["Discovery", "Design", "Development", "Testing", "Post-Launch"] },
    ],
  },
  {
    title: "Requestor",
    fields: [
      { key: "requestorName", label: "Name", type: "text", placeholder: "Jane Smith" },
      { key: "requestorRole", label: "Role", type: "text", placeholder: "Product Manager" },
      { key: "requestorEmail", label: "Email", type: "text", placeholder: "jane@acme.com" },
    ],
  },
  {
    title: "Change Description",
    fields: [
      { key: "changeDesc", label: "Describe the change", type: "textarea", rows: 3, placeholder: "Detailed description of the requested change..." },
      { key: "changeReason", label: "Reason for change", type: "textarea", rows: 3, placeholder: "Why is this change needed?" },
      { key: "ifNotImplemented", label: "If NOT implemented?", type: "textarea", rows: 2, placeholder: "What happens if this change is not made?" },
    ],
  },
  {
    title: "Impact Assessment",
    fields: [
      { key: "priority", label: "Priority Level", type: "select", options: ["Critical", "High", "Medium", "Low"] },
      { key: "timelineImpact", label: "Timeline Impact", type: "select", options: ["No change", "1-2 weeks delay", "2-4 weeks delay", "Major delay"] },
      { key: "budgetImpact", label: "Budget Impact", type: "select", options: ["No change", "Minor increase", "Significant increase"] },
      { key: "additionalCost", label: "Est. Additional Cost", type: "text", placeholder: "$500" },
      { key: "additionalTime", label: "Additional Time", type: "text", placeholder: "1 week" },
    ],
  },
  {
    title: "Affected Deliverables",
    fields: [
      { key: "affectedDeliverables", label: "Impacted deliverables", type: "textarea", rows: 2, placeholder: "List the deliverables impacted by this change..." },
    ],
  },
  {
    title: "Approval",
    fields: [
      { key: "decision", label: "Decision", type: "select", options: ["Approved", "Rejected", "Deferred", "Modified"] },
      { key: "approvedBy", label: "Approved By", type: "text", placeholder: "Name of approver" },
      { key: "approvalDate", label: "Approval Date", type: "date" },
      { key: "approvalNotes", label: "Notes / Conditions", type: "textarea", rows: 2, placeholder: "Any conditions for approval..." },
    ],
  },
];

const changeRequestDefaults: Record<string, string | boolean> = {
  crId: "", date: "", projectName: "", projectId: "", currentPhase: "",
  requestorName: "", requestorRole: "", requestorEmail: "",
  changeDesc: "", changeReason: "", ifNotImplemented: "",
  priority: "", timelineImpact: "", budgetImpact: "", additionalCost: "", additionalTime: "",
  affectedDeliverables: "",
  decision: "", approvedBy: "", approvalDate: "", approvalNotes: "",
};

function changeRequestRender(data: Record<string, string | boolean>) {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
      <PageHeader title="Change Request Form" subtitle="Project Modification Request" />
      <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
        <span>CR ID: {val(data, "crId", "[___________]")}</span><span>Date: {val(data, "date", "[___________]")}</span>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Project Information</div>
        <FR label="Project Name" value={val(data, "projectName")} />
        <FR label="Project ID" value={val(data, "projectId")} />
        <FR label="Current Phase" value={val(data, "currentPhase")} />
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Requestor Information</div>
        <FR label="Name" value={val(data, "requestorName")} />
        <FR label="Role" value={val(data, "requestorRole")} />
        <FR label="Email" value={val(data, "requestorEmail")} />
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Change Description</div>
        <p style={paragraphStyle}><strong style={{ color: darkText }}>Description:</strong><br />{val(data, "changeDesc", "[___________]")}</p>
        <p style={paragraphStyle}><strong style={{ color: darkText }}>Reason:</strong><br />{val(data, "changeReason", "[___________]")}</p>
        <p style={paragraphStyle}><strong style={{ color: darkText }}>If NOT implemented:</strong><br />{val(data, "ifNotImplemented", "[___________]")}</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Impact Assessment</div>
        <FR label="Priority Level" value={val(data, "priority")} />
        <FR label="Timeline Impact" value={val(data, "timelineImpact")} />
        <FR label="Budget Impact" value={val(data, "budgetImpact")} />
        <FR label="Est. Additional Cost" value={val(data, "additionalCost")} />
        <FR label="Additional Time" value={val(data, "additionalTime")} />
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Affected Deliverables</div>
        <p style={paragraphStyle}>{val(data, "affectedDeliverables", "[___________]")}</p>
      </div>
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Approval</div>
        <FR label="Decision" value={val(data, "decision")} />
        <FR label="Approved By" value={val(data, "approvedBy")} />
        <FR label="Approval Date" value={val(data, "approvalDate")} />
        <p style={paragraphStyle}><strong style={{ color: darkText }}>Notes / Conditions:</strong><br />{val(data, "approvalNotes", "[___________]")}</p>
      </div>
      <PageFooter />
    </div>
  );
}

// ─── 8. PRIVACY POLICY + TERMS ───────────────────────────────────────

const privacyTermsFields: FieldGroup[] = [
  {
    title: "Document Info",
    fields: [
      { key: "documentId", label: "Document ID", type: "text", placeholder: "FMX-PT-001" },
      { key: "effectiveDate", label: "Effective Date", type: "date" },
      { key: "lastUpdated", label: "Last Updated", type: "date" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { key: "contactEmail", label: "Privacy Contact Email", type: "text", placeholder: "privacy@framemaxx.com" },
      { key: "legalEmail", label: "Legal Contact Email", type: "text", placeholder: "legal@framemaxx.com" },
    ],
  },
];

const privacyTermsDefaults: Record<string, string | boolean> = {
  documentId: "", effectiveDate: "", lastUpdated: "", contactEmail: "", legalEmail: "",
};

function privacyTermsRender(data: Record<string, string | boolean>) {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
      <PageHeader title="Privacy Policy & Terms of Service" subtitle={`Effective Date: ${val(data, "effectiveDate", "[___________]")}`} />
      <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
        <span>Document ID: {val(data, "documentId", "[___________]")}</span>
        <span>Last Updated: {val(data, "lastUpdated", "[___________]")}</span>
      </div>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: darkText }}>PRIVACY POLICY</div>
        <div style={{ width: 60, height: 3, background: gold, margin: "8px auto" }}></div>
      </div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>1. Information We Collect</div><p style={paragraphStyle}>We collect information you provide directly through our intake forms, communications, and project engagements: name, email, phone, business name, project details, and any additional information you share. We also automatically collect technical information including IP address, browser type, and usage data.</p></div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>2. How We Use Your Information</div><p style={paragraphStyle}>• To evaluate and respond to your project requests<br />• To communicate about project progress<br />• To provide and improve our services<br />• To send relevant updates (with consent)<br />• To comply with legal obligations<br />• To protect our rights and prevent fraud</p></div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>3. Information Sharing</div><p style={paragraphStyle}>We do not sell, trade, or rent your personal information. We may share with trusted service providers, legal authorities when required, and business partners with your explicit consent.</p></div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>4. Data Security</div><p style={paragraphStyle}>We implement industry-standard security measures including encryption, secure servers, and access controls. No method is 100% secure, and we cannot guarantee absolute security.</p></div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>5. Data Retention</div><p style={paragraphStyle}>We retain personal information as long as necessary to fulfill the purposes outlined, unless longer retention is required by law. Project data is retained for up to 3 years after completion.</p></div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>6. Your Rights</div><p style={paragraphStyle}>You have the right to access, correct, delete your data, object to processing, request portability, and withdraw consent. Contact {val(data, "contactEmail", "privacy@framemaxx.com")}.</p></div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>7. Cookies</div><p style={paragraphStyle}>Our website uses cookies to enhance your experience, analyze traffic, and personalize content. You can control cookie preferences through browser settings.</p></div>
      <div style={{ textAlign: "center", marginTop: 30, marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: darkText }}>TERMS OF SERVICE</div>
        <div style={{ width: 60, height: 3, background: gold, margin: "8px auto" }}></div>
      </div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>1. Acceptance of Terms</div><p style={paragraphStyle}>By accessing our website or engaging our services, you agree to be bound by these Terms of Service.</p></div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>2. Services</div><p style={paragraphStyle}>FrameMaxx provides web development, design, and digital services. Specific scope and deliverables are defined in individual project agreements.</p></div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>3. Client Responsibilities</div><p style={paragraphStyle}>Clients agree to provide accurate information, deliver content timely, provide feedback within agreed timeframes, ensure rights to provided assets, and make payments on schedule.</p></div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>4. Intellectual Property</div><p style={paragraphStyle}>Upon full payment, Client receives ownership of custom code and design assets. FrameMaxx retains pre-existing tools and may showcase projects unless NDA is in place.</p></div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>5. Limitation of Liability</div><p style={paragraphStyle}>Total liability shall not exceed total fees paid. Not liable for indirect, incidental, special, or consequential damages.</p></div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>6. Dispute Resolution</div><p style={paragraphStyle}>Disputes shall first be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration.</p></div>
      <div style={sectionStyle}><div style={sectionHeaderStyle}>7. Modifications</div><p style={paragraphStyle}>FrameMaxx reserves the right to modify these Terms at any time. Continued use constitutes acceptance of modified Terms.</p></div>
      <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: lightGray }}>
        For questions, contact {val(data, "legalEmail", "legal@framemaxx.com")}
      </div>
      <PageFooter />
    </div>
  );
}

// ─── EXPORT ALL TEMPLATES ─────────────────────────────────────────────

export const templates: TemplateDef[] = [
  { id: "contract", title: "Contract Template", description: "Master service agreement for web development projects with legal terms, payment structure, and IP rights.", icon: "📜", fieldGroups: contractFields, defaultValues: contractDefaults, render: contractRender },
  { id: "nda", title: "NDA Template", description: "Non-disclosure agreement to protect confidential information shared during project discussions.", icon: "🔐", fieldGroups: ndaFields, defaultValues: ndaDefaults, render: ndaRender },
  { id: "proposal", title: "Proposal Template", description: "Professional project proposal with scope, milestones, deliverables, and pricing breakdown.", icon: "📋", fieldGroups: proposalFields, defaultValues: proposalDefaults, render: proposalRender },
  { id: "invoice", title: "Invoice Template", description: "Clean, professional invoice with itemized services, payment terms, and banking details.", icon: "🧾", fieldGroups: invoiceFields, defaultValues: invoiceDefaults, render: invoiceRender },
  { id: "project-brief", title: "Project Brief Form", description: "Comprehensive client intake questionnaire covering business overview, goals, and specifications.", icon: "📝", fieldGroups: projectBriefFields, defaultValues: projectBriefDefaults, render: projectBriefRender },
  { id: "scope-of-work", title: "Scope of Work", description: "Detailed statement of work with objectives, in/out of scope items, timeline, and dependencies.", icon: "📊", fieldGroups: sowFields, defaultValues: sowDefaults, render: sowRender },
  { id: "change-request", title: "Change Request Form", description: "Formal form for requesting project modifications with impact assessment and approval workflow.", icon: "✏️", fieldGroups: changeRequestFields, defaultValues: changeRequestDefaults, render: changeRequestRender },
  { id: "privacy-terms", title: "Privacy Policy + Terms", description: "Combined privacy policy and terms of service document with legal compliance provisions.", icon: "🛡️", fieldGroups: privacyTermsFields, defaultValues: privacyTermsDefaults, render: privacyTermsRender },
];
