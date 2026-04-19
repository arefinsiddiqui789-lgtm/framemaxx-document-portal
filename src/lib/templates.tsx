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

// ─── Compact Shared Styles (fits 1 A4 page) ──────────────────────────

const gold = "#D4AF37";
const darkText = "#1A1A1A";
const grayText = "#555555";
const lightGray = "#888888";
const borderColor = "#E0E0E0";

const sec: React.CSSProperties = { marginBottom: 8 };
const secH: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2,
  color: gold, marginBottom: 4, paddingBottom: 3, borderBottom: `1px solid ${borderColor}`,
};
const row: React.CSSProperties = { display: "flex", marginBottom: 3, fontSize: 10, lineHeight: 1.4 };
const lbl: React.CSSProperties = { width: 130, fontWeight: 600, color: grayText, flexShrink: 0, fontSize: 10 };
const para: React.CSSProperties = { fontSize: 10, color: grayText, lineHeight: 1.5, marginBottom: 4 };

const val = (data: Record<string, string | boolean>, key: string, fallback = ""): string => {
  const v = data[key];
  return typeof v === "string" ? (v.trim() || fallback) : fallback;
};

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ textAlign: "center", paddingBottom: 8, borderBottom: `2px solid ${gold}`, marginBottom: 10 }}>
      <div style={{ fontSize: 8, color: gold, letterSpacing: 3, marginBottom: 2, fontWeight: 700 }}>FRAMEMAXX</div>
      <h1 style={{ fontSize: 16, fontWeight: 700, color: darkText, margin: 0 }}>{title}</h1>
      {subtitle && <div style={{ fontSize: 9, color: lightGray, marginTop: 2 }}>{subtitle}</div>}
    </div>
  );
}

function PageFooter() {
  return (
    <div style={{ marginTop: 12, paddingTop: 6, borderTop: `1px solid ${gold}`, textAlign: "center" }}>
      <div style={{ fontSize: 8, fontWeight: 700, color: gold, letterSpacing: 2 }}>FRAMEMAXX</div>
      <div style={{ fontSize: 7, color: lightGray, marginTop: 1 }}>FrameMaxx Web Development Agency • framemaxx.com</div>
    </div>
  );
}

function SigBlock({ party }: { party: string }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ borderTop: "1px solid #333", paddingTop: 3, fontSize: 8, color: lightGray, marginTop: 24 }}>
        <strong>{party}</strong> — Signature
      </div>
      <div style={{ borderTop: "1px solid #333", paddingTop: 3, fontSize: 8, color: lightGray, marginTop: 12 }}>Date</div>
    </div>
  );
}

function FR({ label, value }: { label: string; value: string }) {
  return (
    <div style={row}>
      <span style={lbl}>{label}</span>
      <span style={{ color: value ? darkText : grayText, flexGrow: 1, borderBottom: "1px solid #CCC" }}>{value || "—"}</span>
    </div>
  );
}

// ─── 1. CONTRACT ─────────────────────────────────────────────────────

const contractFields: FieldGroup[] = [
  { title: "Document Info", fields: [
    { key: "contractId", label: "Contract ID", type: "text", placeholder: "FMX-CON-001" },
    { key: "date", label: "Date", type: "date" },
  ]},
  { title: "Client Information", fields: [
    { key: "clientName", label: "Client Name", type: "text", placeholder: "John Doe" },
    { key: "clientBusiness", label: "Business Name", type: "text", placeholder: "Acme Inc." },
    { key: "clientEmail", label: "Email", type: "text", placeholder: "john@acme.com" },
    { key: "clientPhone", label: "Phone", type: "text", placeholder: "+1 (555) 000-0000" },
  ]},
  { title: "Payment", fields: [
    { key: "totalFee", label: "Total Project Fee", type: "text", placeholder: "$5,000" },
    { key: "paymentSchedule", label: "Payment Schedule", type: "select", options: ["50% upfront + 50% on completion", "Milestone-based", "Monthly retainer", "Custom"] },
  ]},
  { title: "Timeline", fields: [
    { key: "startDate", label: "Start Date", type: "date" },
    { key: "completionDate", label: "Est. Completion", type: "date" },
  ]},
];

const contractDefaults: Record<string, string | boolean> = {
  contractId: "", date: "", clientName: "", clientBusiness: "", clientEmail: "",
  clientPhone: "", totalFee: "", paymentSchedule: "", startDate: "", completionDate: "",
};

function contractRender(data: Record<string, string | boolean>) {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText, fontSize: 10 }}>
      <PageHeader title="Web Development Service Agreement" subtitle="Master Service Contract" />
      <div style={{ ...sec, display: "flex", justifyContent: "space-between", fontSize: 9, color: grayText }}>
        <span>Contract ID: {val(data, "contractId", "[___________]")}</span>
        <span>Date: {val(data, "date", "[___________]")}</span>
      </div>
      <div style={sec}>
        <div style={secH}>Parties</div>
        <div style={row}><span style={lbl}>Service Provider:</span><span>FrameMaxx Web Development Agency</span></div>
        <FR label="Client Name" value={val(data, "clientName")} />
        <FR label="Client Business" value={val(data, "clientBusiness")} />
        <FR label="Client Email" value={val(data, "clientEmail")} />
        <FR label="Client Phone" value={val(data, "clientPhone")} />
      </div>
      <div style={sec}><div style={secH}>1. Scope of Services</div><p style={para}>FrameMaxx agrees to provide web development services as described in the attached Statement of Work or Project Proposal, including design, development, testing, and deployment.</p></div>
      <div style={sec}>
        <div style={secH}>2. Payment Terms</div>
        <FR label="Total Project Fee" value={val(data, "totalFee")} />
        <FR label="Payment Schedule" value={val(data, "paymentSchedule")} />
        <p style={para}>Invoices are due within 15 business days. Late payments subject to 1.5% monthly interest.</p>
      </div>
      <div style={sec}>
        <div style={secH}>3. Timeline & Deliverables</div>
        <FR label="Start Date" value={val(data, "startDate")} />
        <FR label="Est. Completion" value={val(data, "completionDate")} />
        <p style={para}>Timelines are estimates, subject to client feedback delays and scope changes.</p>
      </div>
      <div style={sec}><div style={secH}>4. Intellectual Property</div><p style={para}>Upon full payment, Client receives ownership of custom code and design assets. FrameMaxx retains right to use generic libraries and tools.</p></div>
      <div style={sec}><div style={secH}>5. Confidentiality</div><p style={para}>Both parties agree to maintain confidentiality of proprietary information. Obligation survives termination for 2 years.</p></div>
      <div style={sec}><div style={secH}>6. Revisions & Changes</div><p style={para}>Scope includes up to 2 rounds of revisions per deliverable. Additional changes require a Change Request Form.</p></div>
      <div style={sec}><div style={secH}>7. Termination</div><p style={para}>Either party may terminate with 30 days written notice. Client responsible for payment of work completed up to termination.</p></div>
      <div style={sec}><div style={secH}>8. Limitation of Liability</div><p style={para}>Total liability shall not exceed total fees paid. Not liable for indirect, incidental, or consequential damages.</p></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, gap: 40 }}>
        <SigBlock party="FrameMaxx" /><SigBlock party="Client" />
      </div>
      <PageFooter />
    </div>
  );
}

// ─── 2. NDA ──────────────────────────────────────────────────────────

const ndaFields: FieldGroup[] = [
  { title: "Document Info", fields: [
    { key: "ndaId", label: "NDA ID", type: "text", placeholder: "FMX-NDA-001" },
    { key: "effectiveDate", label: "Effective Date", type: "date" },
  ]},
  { title: "Receiving Party", fields: [
    { key: "receivingParty", label: "Name / Company", type: "text", placeholder: "Client Name" },
    { key: "receivingTitle", label: "Title / Role", type: "text", placeholder: "CEO" },
  ]},
  { title: "Term", fields: [
    { key: "duration", label: "Agreement Duration", type: "text", placeholder: "2 years" },
  ]},
];

const ndaDefaults: Record<string, string | boolean> = { ndaId: "", effectiveDate: "", receivingParty: "", receivingTitle: "", duration: "" };

function ndaRender(data: Record<string, string | boolean>) {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText, fontSize: 10 }}>
      <PageHeader title="Non-Disclosure Agreement" subtitle="Confidentiality Agreement" />
      <div style={{ ...sec, display: "flex", justifyContent: "space-between", fontSize: 9, color: grayText }}>
        <span>NDA ID: {val(data, "ndaId", "[___________]")}</span>
        <span>Effective Date: {val(data, "effectiveDate", "[___________]")}</span>
      </div>
      <div style={sec}>
        <div style={secH}>Parties</div>
        <p style={para}>This Agreement is entered into by and between:</p>
        <div style={row}><span style={lbl}>Disclosing Party:</span><span>FrameMaxx Web Development Agency</span></div>
        <FR label="Receiving Party" value={val(data, "receivingParty")} />
        <FR label="Title / Role" value={val(data, "receivingTitle")} />
      </div>
      <div style={sec}><div style={secH}>1. Purpose</div><p style={para}>The Parties wish to explore a potential business relationship relating to web development services and may disclose confidential information to each other.</p></div>
      <div style={sec}><div style={secH}>2. Confidential Information</div><p style={para}>&quot;Confidential Information&quot; means all non-public information including: business plans, technical data, trade secrets, software code, design specs, client lists, pricing, marketing strategies, and financial data.</p></div>
      <div style={sec}><div style={secH}>3. Obligations</div><p style={para}>Receiving Party agrees to: (a) hold information in strict confidence; (b) not disclose to third parties without consent; (c) use solely for the Purpose; (d) protect using reasonable care; (e) limit access to need-to-know employees.</p></div>
      <div style={sec}><div style={secH}>4. Exclusions</div><p style={para}>Not confidential if: (a) publicly available; (b) known prior to disclosure; (c) independently developed; (d) rightfully obtained from a third party.</p></div>
      <div style={sec}>
        <div style={secH}>5. Term</div>
        <FR label="Duration" value={val(data, "duration")} />
        <p style={para}>Obligations survive for 2 years from disclosure, unless longer period agreed in writing.</p>
      </div>
      <div style={sec}><div style={secH}>6. Return of Information</div><p style={para}>Upon request or termination, promptly return or destroy all Confidential Information and copies.</p></div>
      <div style={sec}><div style={secH}>7. Remedies</div><p style={para}>Disclosing Party entitled to injunctive relief for any breach, plus other available remedies.</p></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, gap: 40 }}>
        <SigBlock party="FrameMaxx (Disclosing)" /><SigBlock party="Receiving Party" />
      </div>
      <PageFooter />
    </div>
  );
}

// ─── 3. PROPOSAL ─────────────────────────────────────────────────────

const proposalFields: FieldGroup[] = [
  { title: "Document Info", fields: [
    { key: "proposalId", label: "Proposal ID", type: "text", placeholder: "FMX-PROP-001" },
    { key: "date", label: "Date", type: "date" },
  ]},
  { title: "Prepared For", fields: [
    { key: "clientName", label: "Client Name", type: "text", placeholder: "Jane Smith" },
    { key: "company", label: "Company", type: "text", placeholder: "Acme Corp" },
    { key: "clientEmail", label: "Email", type: "text", placeholder: "jane@acme.com" },
  ]},
  { title: "Prepared By", fields: [
    { key: "projectManager", label: "Project Manager", type: "text", placeholder: "Alex Johnson" },
  ]},
  { title: "Project Overview", fields: [
    { key: "projectName", label: "Project Name", type: "text", placeholder: "Acme Website Redesign" },
    { key: "projectType", label: "Project Type", type: "select", options: ["Portfolio", "Business Website", "E-commerce", "Custom Web App"] },
    { key: "projectDescription", label: "Description", type: "textarea", rows: 3, placeholder: "Describe the project goals..." },
  ]},
  { title: "Proposed Solution", fields: [
    { key: "solution", label: "Technical Approach", type: "textarea", rows: 3, placeholder: "Describe the approach and methodology..." },
  ]},
  { title: "Milestones", fields: [
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
  ]},
  { title: "Investment", fields: [
    { key: "totalCost", label: "Total Project Cost", type: "text", placeholder: "$7,000" },
    { key: "paymentTerms", label: "Payment Terms", type: "select", options: ["50/50", "40/30/30", "Monthly", "Custom"] },
  ]},
];

const proposalDefaults: Record<string, string | boolean> = {
  proposalId: "", date: "", clientName: "", company: "", clientEmail: "", projectManager: "",
  projectName: "", projectType: "", projectDescription: "", solution: "",
  m1: "", m1Time: "", m1Cost: "", m2: "", m2Time: "", m2Cost: "",
  m3: "", m3Time: "", m3Cost: "", m4: "", m4Time: "", m4Cost: "",
  totalCost: "", paymentTerms: "",
};

function proposalRender(data: Record<string, string | boolean>) {
  const ms = [
    { n: val(data, "m1", "[Milestone 1]"), t: val(data, "m1Time", "[Weeks]"), c: val(data, "m1Cost", "[$0]") },
    { n: val(data, "m2", "[Milestone 2]"), t: val(data, "m2Time", "[Weeks]"), c: val(data, "m2Cost", "[$0]") },
    { n: val(data, "m3", "[Milestone 3]"), t: val(data, "m3Time", "[Weeks]"), c: val(data, "m3Cost", "[$0]") },
    { n: val(data, "m4", "[Milestone 4]"), t: val(data, "m4Time", "[Weeks]"), c: val(data, "m4Cost", "[$0]") },
  ];
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText, fontSize: 10 }}>
      <PageHeader title="Project Proposal" subtitle="Web Development Services" />
      <div style={{ ...sec, display: "flex", justifyContent: "space-between", fontSize: 9, color: grayText }}>
        <span>Proposal ID: {val(data, "proposalId", "[___________]")}</span>
        <span>Date: {val(data, "date", "[___________]")}</span>
      </div>
      <div style={sec}><div style={secH}>Prepared For</div><FR label="Client Name" value={val(data, "clientName")} /><FR label="Company" value={val(data, "company")} /><FR label="Email" value={val(data, "clientEmail")} /></div>
      <div style={sec}><div style={secH}>Prepared By</div><div style={row}><span style={lbl}>Agency:</span><span>FrameMaxx Web Development Agency</span></div><FR label="Project Manager" value={val(data, "projectManager")} /></div>
      <div style={sec}><div style={secH}>Project Overview</div><FR label="Project Name" value={val(data, "projectName")} /><FR label="Project Type" value={val(data, "projectType")} /><p style={para}>{val(data, "projectDescription", "[Project description]")}</p></div>
      <div style={sec}><div style={secH}>Proposed Solution</div><p style={para}>{val(data, "solution", "[Technical approach]")}</p></div>
      <div style={sec}>
        <div style={secH}>Deliverables & Milestones</div>
        <div style={{ fontSize: 9, width: "100%" }}>
          <div style={{ display: "flex", fontWeight: 700, borderBottom: `2px solid ${gold}`, paddingBottom: 3, marginBottom: 2 }}>
            <span style={{ flex: 0.5 }}>#</span><span style={{ flex: 2 }}>Milestone</span><span style={{ flex: 1 }}>Timeline</span><span style={{ flex: 1 }}>Cost</span>
          </div>
          {ms.map((m, i) => (
            <div key={i} style={{ display: "flex", borderBottom: `1px solid ${borderColor}`, padding: "3px 0", color: grayText }}>
              <span style={{ flex: 0.5 }}>{i + 1}</span><span style={{ flex: 2 }}>{m.n}</span><span style={{ flex: 1 }}>{m.t}</span><span style={{ flex: 1 }}>{m.c}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={sec}><div style={secH}>Investment</div><FR label="Total Project Cost" value={val(data, "totalCost")} /><FR label="Payment Terms" value={val(data, "paymentTerms")} /></div>
      <PageFooter />
    </div>
  );
}

// ─── 4. INVOICE ──────────────────────────────────────────────────────

const invoiceFields: FieldGroup[] = [
  { title: "Invoice Info", fields: [
    { key: "invoiceNumber", label: "Invoice #", type: "text", placeholder: "FMX-INV-001" },
    { key: "date", label: "Date", type: "date" },
    { key: "dueDate", label: "Due Date", type: "date" },
  ]},
  { title: "From (Agency)", fields: [
    { key: "fromAddress", label: "Address", type: "text", placeholder: "123 Main St, City, ZIP" },
    { key: "fromEmail", label: "Email", type: "text", placeholder: "billing@framemaxx.com" },
    { key: "fromPhone", label: "Phone", type: "text", placeholder: "+1 (555) 000-0000" },
  ]},
  { title: "Bill To", fields: [
    { key: "clientName", label: "Client Name", type: "text", placeholder: "Jane Smith" },
    { key: "clientCompany", label: "Company", type: "text", placeholder: "Acme Corp" },
    { key: "clientAddress", label: "Address", type: "text", placeholder: "456 Oak Ave, City, ZIP" },
    { key: "clientEmail", label: "Email", type: "text", placeholder: "jane@acme.com" },
  ]},
  { title: "Project", fields: [
    { key: "projectName", label: "Project Name", type: "text", placeholder: "Website Redesign" },
    { key: "projectId", label: "Project ID", type: "text", placeholder: "FMX-PRJ-001" },
  ]},
  { title: "Line Items", fields: [
    { key: "item1Desc", label: "Item 1", type: "text", placeholder: "UI/UX Design" },
    { key: "item1Qty", label: "Qty", type: "text", placeholder: "1" },
    { key: "item1Rate", label: "Rate", type: "text", placeholder: "$2,000" },
    { key: "item1Amount", label: "Amount", type: "text", placeholder: "$2,000" },
    { key: "item2Desc", label: "Item 2", type: "text", placeholder: "Frontend Development" },
    { key: "item2Qty", label: "Qty", type: "text", placeholder: "1" },
    { key: "item2Rate", label: "Rate", type: "text", placeholder: "$3,000" },
    { key: "item2Amount", label: "Amount", type: "text", placeholder: "$3,000" },
    { key: "item3Desc", label: "Item 3", type: "text", placeholder: "Testing & Deploy" },
    { key: "item3Qty", label: "Qty", type: "text", placeholder: "1" },
    { key: "item3Rate", label: "Rate", type: "text", placeholder: "$1,000" },
    { key: "item3Amount", label: "Amount", type: "text", placeholder: "$1,000" },
  ]},
  { title: "Totals", fields: [
    { key: "subtotal", label: "Subtotal", type: "text", placeholder: "$6,000.00" },
    { key: "tax", label: "Tax", type: "text", placeholder: "$0.00" },
    { key: "totalDue", label: "Total Due", type: "text", placeholder: "$6,000.00" },
  ]},
  { title: "Payment Info", fields: [
    { key: "bankName", label: "Bank Name", type: "text", placeholder: "First National Bank" },
    { key: "accountNumber", label: "Account Number", type: "text", placeholder: "XXXX-XXXX" },
    { key: "routingNumber", label: "Routing Number", type: "text", placeholder: "XXXX-XXXX" },
  ]},
];

const invoiceDefaults: Record<string, string | boolean> = {
  invoiceNumber: "", date: "", dueDate: "", fromAddress: "", fromEmail: "", fromPhone: "",
  clientName: "", clientCompany: "", clientAddress: "", clientEmail: "",
  projectName: "", projectId: "",
  item1Desc: "", item1Qty: "", item1Rate: "", item1Amount: "",
  item2Desc: "", item2Qty: "", item2Rate: "", item2Amount: "",
  item3Desc: "", item3Qty: "", item3Rate: "", item3Amount: "",
  subtotal: "", tax: "", totalDue: "", bankName: "", accountNumber: "", routingNumber: "",
};

function invoiceRender(data: Record<string, string | boolean>) {
  const items = [
    { d: val(data, "item1Desc", "[Service]"), q: val(data, "item1Qty", "1"), r: val(data, "item1Rate", "$0"), a: val(data, "item1Amount", "$0") },
    { d: val(data, "item2Desc", "[Service]"), q: val(data, "item2Qty", "1"), r: val(data, "item2Rate", "$0"), a: val(data, "item2Amount", "$0") },
    { d: val(data, "item3Desc", "[Service]"), q: val(data, "item3Qty", "1"), r: val(data, "item3Rate", "$0"), a: val(data, "item3Amount", "$0") },
  ];
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText, fontSize: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div><div style={{ fontSize: 8, color: gold, letterSpacing: 3, fontWeight: 700, marginBottom: 2 }}>FRAMEMAXX</div><div style={{ fontSize: 22, fontWeight: 700, color: darkText }}>INVOICE</div></div>
        <div style={{ textAlign: "right", fontSize: 10, color: grayText }}>
          <div style={{ fontWeight: 700, color: darkText, fontSize: 13 }}>#{val(data, "invoiceNumber", "[___________]")}</div>
          <div>Date: {val(data, "date", "[___________]")}</div>
          <div>Due: {val(data, "dueDate", "[___________]")}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 30, marginBottom: 8 }}>
        <div style={{ flex: 1 }}><div style={secH}>From</div><div style={{ fontSize: 10, lineHeight: 1.5, color: grayText }}><strong style={{ color: darkText }}>FrameMaxx Web Development Agency</strong><br />{val(data, "fromAddress", "[Address]")}<br />{val(data, "fromEmail", "[Email]")} | {val(data, "fromPhone", "[Phone]")}</div></div>
        <div style={{ flex: 1 }}><div style={secH}>Bill To</div><div style={{ fontSize: 10, lineHeight: 1.5, color: grayText }}><strong style={{ color: darkText }}>{val(data, "clientName", "[Client]")}</strong><br />{val(data, "clientCompany", "[Company]")}<br />{val(data, "clientAddress", "[Address]")}<br />{val(data, "clientEmail", "[Email]")}</div></div>
      </div>
      <div style={sec}><div style={secH}>Project</div><FR label="Project Name" value={val(data, "projectName")} /><FR label="Project ID" value={val(data, "projectId")} /></div>
      <div style={sec}>
        <div style={{ fontSize: 9, width: "100%" }}>
          <div style={{ display: "flex", fontWeight: 700, borderBottom: `2px solid ${gold}`, paddingBottom: 4, marginBottom: 2 }}>
            <span style={{ flex: 0.5 }}>#</span><span style={{ flex: 3 }}>Description</span><span style={{ flex: 0.7, textAlign: "center" }}>Qty</span><span style={{ flex: 1.2, textAlign: "right" }}>Rate</span><span style={{ flex: 1.2, textAlign: "right" }}>Amount</span>
          </div>
          {items.map((it, i) => (
            <div key={i} style={{ display: "flex", borderBottom: `1px solid ${borderColor}`, padding: "4px 0", color: grayText, fontSize: 10 }}>
              <span style={{ flex: 0.5 }}>{i + 1}</span><span style={{ flex: 3 }}>{it.d}</span><span style={{ flex: 0.7, textAlign: "center" }}>{it.q}</span><span style={{ flex: 1.2, textAlign: "right" }}>{it.r}</span><span style={{ flex: 1.2, textAlign: "right" }}>{it.a}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <div style={{ width: 220 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, padding: "3px 0", borderBottom: `1px solid ${borderColor}` }}><span style={{ color: grayText }}>Subtotal</span><span style={{ fontWeight: 600 }}>{val(data, "subtotal", "$0.00")}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, padding: "3px 0", borderBottom: `1px solid ${borderColor}` }}><span style={{ color: grayText }}>Tax</span><span style={{ fontWeight: 600 }}>{val(data, "tax", "$0.00")}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0", fontWeight: 700, borderBottom: `2px solid ${gold}` }}><span>Total Due</span><span style={{ color: gold }}>{val(data, "totalDue", "$0.00")}</span></div>
        </div>
      </div>
      <div style={sec}>
        <div style={secH}>Payment Information</div>
        <p style={para}>Payment due within 15 business days. Include invoice number in payment reference.</p>
        <FR label="Bank Name" value={val(data, "bankName")} />
        <div style={row}><span style={lbl}>Account Name:</span><span>FrameMaxx Web Development Agency</span></div>
        <FR label="Account Number" value={val(data, "accountNumber")} />
        <FR label="Routing Number" value={val(data, "routingNumber")} />
      </div>
      <div style={{ textAlign: "center", fontSize: 9, color: lightGray, marginTop: 8 }}>Thank you for your business!</div>
      <PageFooter />
    </div>
  );
}

// ─── 5. PROJECT BRIEF ────────────────────────────────────────────────

const projectBriefFields: FieldGroup[] = [
  { title: "Document Info", fields: [
    { key: "briefId", label: "Brief ID", type: "text", placeholder: "FMX-PB-001" },
    { key: "date", label: "Date", type: "date" },
  ]},
  { title: "Client Information", fields: [
    { key: "fullName", label: "Full Name", type: "text", placeholder: "John Doe" },
    { key: "email", label: "Email", type: "text", placeholder: "john@company.com" },
    { key: "phone", label: "Phone", type: "text", placeholder: "+1 (555) 000-0000" },
    { key: "company", label: "Company Name", type: "text", placeholder: "Acme Inc." },
    { key: "jobTitle", label: "Job Title", type: "text", placeholder: "Marketing Director" },
  ]},
  { title: "Business Overview", fields: [
    { key: "businessDesc", label: "Describe your business", type: "textarea", rows: 2, placeholder: "What does your business do?" },
    { key: "targetAudience", label: "Target audience", type: "textarea", rows: 2, placeholder: "Who are your customers?" },
    { key: "competitors", label: "Main competitors", type: "text", placeholder: "Competitor names" },
  ]},
  { title: "Project Goals", fields: [
    { key: "primaryGoal", label: "Primary goal", type: "text", placeholder: "Increase online sales by 50%" },
    { key: "problems", label: "Problems to solve", type: "textarea", rows: 2, placeholder: "What challenges are you facing?" },
    { key: "successMetrics", label: "Measure success", type: "text", placeholder: "Conversion rate, traffic" },
  ]},
  { title: "Project Specifications", fields: [
    { key: "projectType", label: "Project Type", type: "select", options: ["Portfolio", "Business Website", "E-commerce", "Web App", "Other"] },
    { key: "budgetRange", label: "Budget Range", type: "select", options: ["$500 - $1,000", "$1,000 - $3,000", "$3,000 - $5,000", "$5,000 - $10,000", "$10,000+"] },
    { key: "launchDate", label: "Target Launch Date", type: "date" },
    { key: "existingWebsite", label: "Existing Website", type: "text", placeholder: "https://..." },
  ]},
  { title: "Features & Design", fields: [
    { key: "features", label: "Key features", type: "textarea", rows: 2, placeholder: "Login, payments, dashboard..." },
    { key: "integrations", label: "Integrations", type: "text", placeholder: "Stripe, Mailchimp" },
    { key: "references", label: "Reference sites", type: "text", placeholder: "https://stripe.com" },
    { key: "brandColors", label: "Brand colors", type: "text", placeholder: "#1A1A1A, #D4AF37" },
    { key: "stylePreference", label: "Style", type: "select", options: ["Minimal", "Bold", "Corporate", "Creative", "Other"] },
  ]},
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
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText, fontSize: 10 }}>
      <PageHeader title="Project Brief" subtitle="Client Intake Questionnaire" />
      <div style={{ ...sec, display: "flex", justifyContent: "space-between", fontSize: 9, color: grayText }}>
        <span>Brief ID: {val(data, "briefId", "[___________]")}</span><span>Date: {val(data, "date", "[___________]")}</span>
      </div>
      <div style={sec}><div style={secH}>Client Information</div><FR label="Full Name" value={val(data, "fullName")} /><FR label="Email" value={val(data, "email")} /><FR label="Phone" value={val(data, "phone")} /><FR label="Company" value={val(data, "company")} /><FR label="Job Title" value={val(data, "jobTitle")} /></div>
      <div style={sec}><div style={secH}>Business Overview</div><p style={para}><strong style={{ color: darkText }}>Business:</strong> {val(data, "businessDesc", "[___________]")}</p><p style={para}><strong style={{ color: darkText }}>Target audience:</strong> {val(data, "targetAudience", "[___________]")}</p><p style={para}><strong style={{ color: darkText }}>Competitors:</strong> {val(data, "competitors", "[___________]")}</p></div>
      <div style={sec}><div style={secH}>Project Goals</div><FR label="Primary Goal" value={val(data, "primaryGoal")} /><p style={para}><strong style={{ color: darkText }}>Problems:</strong> {val(data, "problems", "[___________]")}</p><FR label="Success Metrics" value={val(data, "successMetrics")} /></div>
      <div style={sec}><div style={secH}>Specifications</div><FR label="Project Type" value={val(data, "projectType")} /><FR label="Budget Range" value={val(data, "budgetRange")} /><FR label="Launch Date" value={val(data, "launchDate")} /><FR label="Existing Website" value={val(data, "existingWebsite")} /></div>
      <div style={sec}><div style={secH}>Features & Design</div><p style={para}><strong style={{ color: darkText }}>Features:</strong> {val(data, "features", "[___________]")}</p><FR label="Integrations" value={val(data, "integrations")} /><FR label="References" value={val(data, "references")} /><FR label="Brand Colors" value={val(data, "brandColors")} /><FR label="Style" value={val(data, "stylePreference")} /></div>
      <PageFooter />
    </div>
  );
}

// ─── 6. SCOPE OF WORK ────────────────────────────────────────────────

const sowFields: FieldGroup[] = [
  { title: "Document Info", fields: [
    { key: "sowId", label: "SOW ID", type: "text", placeholder: "FMX-SOW-001" },
    { key: "date", label: "Date", type: "date" },
  ]},
  { title: "Project", fields: [
    { key: "projectName", label: "Project Name", type: "text", placeholder: "E-commerce Platform" },
    { key: "client", label: "Client", type: "text", placeholder: "Acme Corp" },
    { key: "projectManager", label: "Project Manager", type: "text", placeholder: "Alex Johnson" },
    { key: "projectOverview", label: "Overview", type: "textarea", rows: 2, placeholder: "Project overview..." },
  ]},
  { title: "Objectives", fields: [
    { key: "obj1", label: "Objective 1", type: "text", placeholder: "Responsive modern website" },
    { key: "obj2", label: "Objective 2", type: "text", placeholder: "User authentication" },
    { key: "obj3", label: "Objective 3", type: "text", placeholder: "Payment integration" },
    { key: "obj4", label: "Objective 4", type: "text", placeholder: "SEO optimization" },
  ]},
  { title: "Technical Specs", fields: [
    { key: "frontend", label: "Frontend", type: "text", placeholder: "Next.js, React" },
    { key: "backend", label: "Backend", type: "text", placeholder: "Node.js, Express" },
    { key: "database", label: "Database", type: "text", placeholder: "PostgreSQL" },
    { key: "hosting", label: "Hosting", type: "text", placeholder: "Vercel / AWS" },
  ]},
  { title: "Timeline", fields: [
    { key: "p1Duration", label: "Discovery", type: "text", placeholder: "1 week" },
    { key: "p2Duration", label: "Design", type: "text", placeholder: "2 weeks" },
    { key: "p3Duration", label: "Development", type: "text", placeholder: "4 weeks" },
    { key: "p4Duration", label: "Testing", type: "text", placeholder: "1 week" },
    { key: "p5Duration", label: "Launch", type: "text", placeholder: "1 week" },
  ]},
];

const sowDefaults: Record<string, string | boolean> = {
  sowId: "", date: "", projectName: "", client: "", projectManager: "", projectOverview: "",
  obj1: "", obj2: "", obj3: "", obj4: "",
  frontend: "", backend: "", database: "", hosting: "",
  p1Duration: "", p2Duration: "", p3Duration: "", p4Duration: "", p5Duration: "",
};

function sowRender(data: Record<string, string | boolean>) {
  const phases = [
    { n: "Discovery", d: val(data, "p1Duration", "[X wks]") },
    { n: "Design", d: val(data, "p2Duration", "[X wks]") },
    { n: "Development", d: val(data, "p3Duration", "[X wks]") },
    { n: "Testing", d: val(data, "p4Duration", "[X wks]") },
    { n: "Launch", d: val(data, "p5Duration", "[X wks]") },
  ];
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText, fontSize: 10 }}>
      <PageHeader title="Scope of Work" subtitle="Statement of Work" />
      <div style={{ ...sec, display: "flex", justifyContent: "space-between", fontSize: 9, color: grayText }}>
        <span>SOW ID: {val(data, "sowId", "[___________]")}</span><span>Date: {val(data, "date", "[___________]")}</span>
      </div>
      <div style={sec}><div style={secH}>Project Overview</div><FR label="Project Name" value={val(data, "projectName")} /><FR label="Client" value={val(data, "client")} /><FR label="Project Manager" value={val(data, "projectManager")} /><p style={para}>{val(data, "projectOverview", "[Overview]")}</p></div>
      <div style={sec}><div style={secH}>Objectives</div><p style={para}>1. {val(data, "obj1", "[Obj 1]")}<br />2. {val(data, "obj2", "[Obj 2]")}<br />3. {val(data, "obj3", "[Obj 3]")}<br />4. {val(data, "obj4", "[Obj 4]")}</p></div>
      <div style={sec}><div style={secH}>In Scope</div><p style={para}>☐ Custom UI/UX design ☐ Responsive dev ☐ CMS integration ☐ User auth ☐ Payment gateway ☐ SEO optimization ☐ Performance optimization ☐ Cross-browser testing ☐ Deployment ☐ 30-day support</p></div>
      <div style={sec}><div style={secH}>Out of Scope</div><p style={para}>☐ Content writing ☐ Photography ☐ Video production ☐ Ongoing maintenance ☐ Mobile app dev ☐ Third-party API dev</p></div>
      <div style={sec}><div style={secH}>Technical Specifications</div><FR label="Frontend" value={val(data, "frontend")} /><FR label="Backend" value={val(data, "backend")} /><FR label="Database" value={val(data, "database")} /><FR label="Hosting" value={val(data, "hosting")} /></div>
      <div style={sec}>
        <div style={secH}>Timeline</div>
        <div style={{ fontSize: 9, width: "100%" }}>
          <div style={{ display: "flex", fontWeight: 700, borderBottom: `2px solid ${gold}`, paddingBottom: 3, marginBottom: 2 }}>
            <span style={{ flex: 0.5 }}>#</span><span style={{ flex: 2 }}>Phase</span><span style={{ flex: 1 }}>Duration</span>
          </div>
          {phases.map((p, i) => (
            <div key={p.n} style={{ display: "flex", borderBottom: `1px solid ${borderColor}`, padding: "3px 0", color: grayText }}>
              <span style={{ flex: 0.5 }}>{i + 1}</span><span style={{ flex: 2 }}>{p.n}</span><span style={{ flex: 1 }}>{p.d}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={sec}><div style={secH}>Assumptions</div><p style={para}>• Client provides content & assets within 5 business days • Client feedback within 48 hours per review • Third-party services are client&apos;s responsibility • Scope changes require formal Change Request</p></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, gap: 40 }}>
        <SigBlock party="FrameMaxx" /><SigBlock party="Client" />
      </div>
      <PageFooter />
    </div>
  );
}

// ─── 7. CHANGE REQUEST ───────────────────────────────────────────────

const changeRequestFields: FieldGroup[] = [
  { title: "Document Info", fields: [
    { key: "crId", label: "CR ID", type: "text", placeholder: "FMX-CR-001" },
    { key: "date", label: "Date", type: "date" },
  ]},
  { title: "Project", fields: [
    { key: "projectName", label: "Project Name", type: "text", placeholder: "E-commerce Platform" },
    { key: "projectId", label: "Project ID", type: "text", placeholder: "FMX-PRJ-001" },
    { key: "currentPhase", label: "Current Phase", type: "select", options: ["Discovery", "Design", "Development", "Testing", "Post-Launch"] },
  ]},
  { title: "Requestor", fields: [
    { key: "requestorName", label: "Name", type: "text", placeholder: "Jane Smith" },
    { key: "requestorRole", label: "Role", type: "text", placeholder: "Product Manager" },
    { key: "requestorEmail", label: "Email", type: "text", placeholder: "jane@acme.com" },
  ]},
  { title: "Change Description", fields: [
    { key: "changeDesc", label: "Describe the change", type: "textarea", rows: 2, placeholder: "Detailed description..." },
    { key: "changeReason", label: "Reason", type: "textarea", rows: 2, placeholder: "Why is this needed?" },
    { key: "ifNotImplemented", label: "If NOT implemented?", type: "text", placeholder: "What happens if not done?" },
  ]},
  { title: "Impact", fields: [
    { key: "priority", label: "Priority", type: "select", options: ["Critical", "High", "Medium", "Low"] },
    { key: "timelineImpact", label: "Timeline Impact", type: "select", options: ["No change", "1-2 weeks delay", "2-4 weeks delay", "Major delay"] },
    { key: "budgetImpact", label: "Budget Impact", type: "select", options: ["No change", "Minor increase", "Significant increase"] },
    { key: "additionalCost", label: "Est. Cost", type: "text", placeholder: "$500" },
    { key: "additionalTime", label: "Additional Time", type: "text", placeholder: "1 week" },
  ]},
  { title: "Deliverables", fields: [
    { key: "affectedDeliverables", label: "Impacted deliverables", type: "textarea", rows: 2, placeholder: "List impacted deliverables..." },
  ]},
  { title: "Approval", fields: [
    { key: "decision", label: "Decision", type: "select", options: ["Approved", "Rejected", "Deferred", "Modified"] },
    { key: "approvedBy", label: "Approved By", type: "text", placeholder: "Name" },
    { key: "approvalDate", label: "Date", type: "date" },
    { key: "approvalNotes", label: "Notes", type: "textarea", rows: 2, placeholder: "Conditions..." },
  ]},
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
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText, fontSize: 10 }}>
      <PageHeader title="Change Request Form" subtitle="Project Modification Request" />
      <div style={{ ...sec, display: "flex", justifyContent: "space-between", fontSize: 9, color: grayText }}>
        <span>CR ID: {val(data, "crId", "[___________]")}</span><span>Date: {val(data, "date", "[___________]")}</span>
      </div>
      <div style={sec}><div style={secH}>Project Information</div><FR label="Project Name" value={val(data, "projectName")} /><FR label="Project ID" value={val(data, "projectId")} /><FR label="Current Phase" value={val(data, "currentPhase")} /></div>
      <div style={sec}><div style={secH}>Requestor</div><FR label="Name" value={val(data, "requestorName")} /><FR label="Role" value={val(data, "requestorRole")} /><FR label="Email" value={val(data, "requestorEmail")} /></div>
      <div style={sec}><div style={secH}>Change Description</div><p style={para}><strong style={{ color: darkText }}>Description:</strong> {val(data, "changeDesc", "[___________]")}</p><p style={para}><strong style={{ color: darkText }}>Reason:</strong> {val(data, "changeReason", "[___________]")}</p><p style={para}><strong style={{ color: darkText }}>If NOT implemented:</strong> {val(data, "ifNotImplemented", "[___________]")}</p></div>
      <div style={sec}><div style={secH}>Impact Assessment</div><FR label="Priority" value={val(data, "priority")} /><FR label="Timeline Impact" value={val(data, "timelineImpact")} /><FR label="Budget Impact" value={val(data, "budgetImpact")} /><FR label="Est. Additional Cost" value={val(data, "additionalCost")} /><FR label="Additional Time" value={val(data, "additionalTime")} /></div>
      <div style={sec}><div style={secH}>Affected Deliverables</div><p style={para}>{val(data, "affectedDeliverables", "[___________]")}</p></div>
      <div style={sec}><div style={secH}>Approval</div><FR label="Decision" value={val(data, "decision")} /><FR label="Approved By" value={val(data, "approvedBy")} /><FR label="Approval Date" value={val(data, "approvalDate")} /><p style={para}><strong style={{ color: darkText }}>Notes:</strong> {val(data, "approvalNotes", "[___________]")}</p></div>
      <PageFooter />
    </div>
  );
}

// ─── 8. PRIVACY POLICY + TERMS ───────────────────────────────────────

const privacyTermsFields: FieldGroup[] = [
  { title: "Document Info", fields: [
    { key: "documentId", label: "Document ID", type: "text", placeholder: "FMX-PT-001" },
    { key: "effectiveDate", label: "Effective Date", type: "date" },
    { key: "lastUpdated", label: "Last Updated", type: "date" },
  ]},
  { title: "Contact", fields: [
    { key: "contactEmail", label: "Privacy Email", type: "text", placeholder: "privacy@framemaxx.com" },
    { key: "legalEmail", label: "Legal Email", type: "text", placeholder: "legal@framemaxx.com" },
  ]},
];

const privacyTermsDefaults: Record<string, string | boolean> = {
  documentId: "", effectiveDate: "", lastUpdated: "", contactEmail: "", legalEmail: "",
};

function privacyTermsRender(data: Record<string, string | boolean>) {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText, fontSize: 9 }}>
      <PageHeader title="Privacy Policy & Terms of Service" subtitle={`Effective: ${val(data, "effectiveDate", "[___________]")}`} />
      <div style={{ ...sec, display: "flex", justifyContent: "space-between", fontSize: 8, color: grayText }}>
        <span>Doc ID: {val(data, "documentId", "[___________]")}</span>
        <span>Updated: {val(data, "lastUpdated", "[___________]")}</span>
      </div>
      <div style={{ textAlign: "center", marginBottom: 6 }}><div style={{ fontSize: 13, fontWeight: 700, color: darkText }}>PRIVACY POLICY</div><div style={{ width: 40, height: 2, background: gold, margin: "4px auto" }}></div></div>
      <div style={sec}><div style={secH}>1. Information We Collect</div><p style={para}>We collect information you provide through forms and communications: name, email, phone, business name, project details. We also automatically collect technical data: IP address, browser type, device info, and usage data via cookies.</p></div>
      <div style={sec}><div style={secH}>2. How We Use Information</div><p style={para}>• Evaluate and respond to project requests • Communicate about project progress • Provide and improve services • Send relevant updates (with consent) • Comply with legal obligations • Protect rights and prevent fraud</p></div>
      <div style={sec}><div style={secH}>3. Information Sharing</div><p style={para}>We do not sell, trade, or rent personal information. May share with: trusted service providers, legal authorities when required, business partners with explicit consent.</p></div>
      <div style={sec}><div style={secH}>4. Data Security</div><p style={para}>Industry-standard measures including encryption, secure servers, and access controls. No method is 100% secure.</p></div>
      <div style={sec}><div style={secH}>5. Data Retention</div><p style={para}>Retained as long as necessary for outlined purposes. Project data retained up to 3 years after completion.</p></div>
      <div style={sec}><div style={secH}>6. Your Rights</div><p style={para}>Access, correct, delete your data, object to processing, request portability, withdraw consent. Contact: {val(data, "contactEmail", "privacy@framemaxx.com")}</p></div>
      <div style={sec}><div style={secH}>7. Cookies</div><p style={para}>Uses cookies to enhance experience, analyze traffic, and personalize content. Control via browser settings.</p></div>
      <div style={{ textAlign: "center", marginTop: 8, marginBottom: 6 }}><div style={{ fontSize: 13, fontWeight: 700, color: darkText }}>TERMS OF SERVICE</div><div style={{ width: 40, height: 2, background: gold, margin: "4px auto" }}></div></div>
      <div style={sec}><div style={secH}>1. Acceptance</div><p style={para}>By accessing our website or engaging our services, you agree to these Terms.</p></div>
      <div style={sec}><div style={secH}>2. Services</div><p style={para}>FrameMaxx provides web development, design, and digital services. Scope defined in individual project agreements.</p></div>
      <div style={sec}><div style={secH}>3. Client Responsibilities</div><p style={para}>Provide accurate info, deliver content timely, give feedback within agreed timeframes, ensure rights to provided assets, pay on schedule.</p></div>
      <div style={sec}><div style={secH}>4. Intellectual Property</div><p style={para}>Upon full payment, Client owns custom code and assets. FrameMaxx retains pre-existing tools and may showcase projects unless NDA in place.</p></div>
      <div style={sec}><div style={secH}>5. Limitation of Liability</div><p style={para}>Total liability shall not exceed fees paid. Not liable for indirect, incidental, or consequential damages.</p></div>
      <div style={sec}><div style={secH}>6. Dispute Resolution</div><p style={para}>Good-faith negotiation first, then binding arbitration if unresolved.</p></div>
      <div style={sec}><div style={secH}>7. Modifications</div><p style={para}>FrameMaxx may modify Terms at any time. Continued use constitutes acceptance.</p></div>
      <div style={{ textAlign: "center", marginTop: 6, fontSize: 8, color: lightGray }}>Questions? Contact {val(data, "legalEmail", "legal@framemaxx.com")}</div>
      <PageFooter />
    </div>
  );
}

// ─── EXPORT ──────────────────────────────────────────────────────────

export const templates: TemplateDef[] = [
  { id: "contract", title: "Contract Template", description: "Master service agreement with legal terms, payment, and IP rights.", icon: "📜", fieldGroups: contractFields, defaultValues: contractDefaults, render: contractRender },
  { id: "nda", title: "NDA Template", description: "Non-disclosure agreement to protect confidential information.", icon: "🔐", fieldGroups: ndaFields, defaultValues: ndaDefaults, render: ndaRender },
  { id: "proposal", title: "Proposal Template", description: "Project proposal with milestones, deliverables, and pricing.", icon: "📋", fieldGroups: proposalFields, defaultValues: proposalDefaults, render: proposalRender },
  { id: "invoice", title: "Invoice Template", description: "Professional invoice with itemized services and totals.", icon: "🧾", fieldGroups: invoiceFields, defaultValues: invoiceDefaults, render: invoiceRender },
  { id: "project-brief", title: "Project Brief Form", description: "Client intake questionnaire for business and project details.", icon: "📝", fieldGroups: projectBriefFields, defaultValues: projectBriefDefaults, render: projectBriefRender },
  { id: "scope-of-work", title: "Scope of Work", description: "Statement of work with objectives, scope, timeline, and tech specs.", icon: "📊", fieldGroups: sowFields, defaultValues: sowDefaults, render: sowRender },
  { id: "change-request", title: "Change Request Form", description: "Project modification request with impact assessment.", icon: "✏️", fieldGroups: changeRequestFields, defaultValues: changeRequestDefaults, render: changeRequestRender },
  { id: "privacy-terms", title: "Privacy Policy + Terms", description: "Combined privacy policy and terms of service.", icon: "🛡️", fieldGroups: privacyTermsFields, defaultValues: privacyTermsDefaults, render: privacyTermsRender },
];
