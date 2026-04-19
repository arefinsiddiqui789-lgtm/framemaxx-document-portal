import React from "react";

export interface TemplateDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: React.ReactNode;
}

const gold = "#D4AF37";
const darkText = "#1A1A1A";
const grayText = "#555555";
const lightGray = "#888888";
const borderColor = "#E0E0E0";

const sectionStyle: React.CSSProperties = {
  marginBottom: 20,
};

const sectionHeaderStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: 1.5,
  color: gold,
  marginBottom: 10,
  paddingBottom: 6,
  borderBottom: `1px solid ${borderColor}`,
};

const fieldRowStyle: React.CSSProperties = {
  display: "flex",
  marginBottom: 8,
  fontSize: 13,
  lineHeight: 1.6,
};

const fieldLabelStyle: React.CSSProperties = {
  width: 160,
  fontWeight: 600,
  color: grayText,
  flexShrink: 0,
};

const fieldLineStyle: React.CSSProperties = {
  borderBottom: "1px solid #CCCCCC",
  flexGrow: 1,
  minWidth: 200,
};

const paragraphStyle: React.CSSProperties = {
  fontSize: 13,
  color: grayText,
  lineHeight: 1.8,
  marginBottom: 12,
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  paddingBottom: 20,
  borderBottom: `3px solid ${gold}`,
  marginBottom: 24,
};

const footerStyle: React.CSSProperties = {
  marginTop: 40,
  paddingTop: 16,
  borderTop: `2px solid ${gold}`,
  textAlign: "center",
};

const signatureStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 40,
  gap: 40,
};

const signatureBlockStyle: React.CSSProperties = {
  flex: 1,
};

const sigLineStyle: React.CSSProperties = {
  borderTop: "1px solid #333",
  paddingTop: 6,
  fontSize: 11,
  color: lightGray,
  marginTop: 50,
};

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={headerStyle}>
      <div style={{ fontSize: 11, color: gold, letterSpacing: 3, marginBottom: 4, fontWeight: 700 }}>
        FRAMEMAXX
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: darkText, margin: 0 }}>
        {title}
      </h1>
      {subtitle && (
        <div style={{ fontSize: 12, color: lightGray, marginTop: 4 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

function PageFooter() {
  return (
    <div style={footerStyle}>
      <div style={{ fontSize: 11, fontWeight: 700, color: gold, letterSpacing: 2 }}>
        FRAMEMAXX
      </div>
      <div style={{ fontSize: 10, color: lightGray, marginTop: 2 }}>
        FrameMaxx Web Development Agency • framemaxx.com
      </div>
    </div>
  );
}

function SignatureBlock({ party }: { party: string }) {
  return (
    <div style={signatureBlockStyle}>
      <div style={sigLineStyle}>
        <strong>{party}</strong>
        <br />
        Signature
      </div>
      <div style={{ ...sigLineStyle, marginTop: 20 }}>
        Date
      </div>
    </div>
  );
}

// 1. CONTRACT TEMPLATE
const contractContent = (
  <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
    <PageHeader title="Web Development Service Agreement" subtitle="Master Service Contract" />
    
    <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
      <span>Contract ID: FMX-CON-[___________]</span>
      <span>Date: [___________]</span>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Parties</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Service Provider:</span>
        <span>FrameMaxx Web Development Agency</span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Client Name:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Client Business:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Client Email:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Client Phone:</span>
        <span style={fieldLineStyle}></span>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>1. Scope of Services</div>
      <p style={paragraphStyle}>
        FrameMaxx agrees to provide web development services as described in the attached Statement of Work (SOW) or Project Proposal. The scope includes design, development, testing, and deployment of the agreed-upon deliverables.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>2. Payment Terms</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Total Project Fee:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Payment Schedule:</span>
        <span>☐ 50% upfront + 50% on completion &nbsp; ☐ Milestone-based &nbsp; ☐ Monthly retainer</span>
      </div>
      <p style={paragraphStyle}>
        All invoices are due within 15 business days of receipt. Late payments are subject to a 1.5% monthly interest charge. Work will pause on any project with payments overdue by more than 30 days.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>3. Timeline & Deliverables</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Start Date:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Estimated Completion:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <p style={paragraphStyle}>
        Timelines are estimates and may be affected by client feedback delays, scope changes, or third-party dependencies. FrameMaxx will communicate any timeline adjustments promptly.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>4. Intellectual Property</div>
      <p style={paragraphStyle}>
        Upon full payment, the Client receives ownership of all custom code and design assets created specifically for this project. FrameMaxx retains the right to use generic code libraries, frameworks, and tools. FrameMaxx may display the project in its portfolio unless otherwise agreed in writing.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>5. Confidentiality</div>
      <p style={paragraphStyle}>
        Both parties agree to maintain the confidentiality of proprietary information shared during the engagement. This obligation survives the termination of this agreement for a period of 2 years.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>6. Revisions & Change Requests</div>
      <p style={paragraphStyle}>
        The agreed scope includes up to 2 rounds of revisions per deliverable. Additional revisions or scope changes will be quoted separately through a Change Request Form and require written approval from both parties.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>7. Termination</div>
      <p style={paragraphStyle}>
        Either party may terminate this agreement with 30 days written notice. The Client is responsible for payment of all work completed up to the termination date. FrameMaxx will deliver all completed work and assets upon final payment.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>8. Limitation of Liability</div>
      <p style={paragraphStyle}>
        FrameMaxx&apos;s total liability under this agreement shall not exceed the total fees paid by the Client. FrameMaxx is not liable for indirect, incidental, or consequential damages.
      </p>
    </div>

    <div style={signatureStyle}>
      <SignatureBlock party="FrameMaxx" />
      <SignatureBlock party="Client" />
    </div>

    <PageFooter />
  </div>
);

// 2. NDA TEMPLATE
const ndaContent = (
  <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
    <PageHeader title="Non-Disclosure Agreement" subtitle="Confidentiality Agreement" />
    
    <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
      <span>NDA ID: FMX-NDA-[___________]</span>
      <span>Effective Date: [___________]</span>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Parties</div>
      <p style={paragraphStyle}>
        This Non-Disclosure Agreement (&quot;Agreement&quot;) is entered into by and between:
      </p>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Disclosing Party:</span>
        <span>FrameMaxx Web Development Agency</span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Receiving Party:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Receiving Party Title:</span>
        <span style={fieldLineStyle}></span>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>1. Purpose</div>
      <p style={paragraphStyle}>
        The Parties wish to explore a potential business relationship relating to web development services. In connection with this evaluation, each Party may disclose certain confidential and proprietary information to the other.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>2. Definition of Confidential Information</div>
      <p style={paragraphStyle}>
        &quot;Confidential Information&quot; means any and all non-public information, including but not limited to: business plans, technical data, trade secrets, software code, design specifications, client lists, pricing information, marketing strategies, financial data, and any other information designated as confidential or that reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>3. Obligations of Receiving Party</div>
      <p style={paragraphStyle}>
        The Receiving Party agrees to: (a) hold Confidential Information in strict confidence; (b) not disclose Confidential Information to any third parties without prior written consent; (c) use Confidential Information solely for the Purpose defined above; (d) protect Confidential Information using the same degree of care it uses for its own confidential information, but in no event less than reasonable care; (e) limit access to Confidential Information to employees and agents who need to know for the Purpose.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>4. Exclusions</div>
      <p style={paragraphStyle}>
        Confidential Information does not include information that: (a) is or becomes publicly available through no fault of the Receiving Party; (b) was known to the Receiving Party prior to disclosure; (c) is independently developed by the Receiving Party without use of the Confidential Information; (d) is rightfully obtained from a third party without restriction.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>5. Term</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Agreement Duration:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <p style={paragraphStyle}>
        The obligations of confidentiality shall survive for a period of 2 years from the date of disclosure of the Confidential Information, unless a longer period is agreed upon in writing.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>6. Return of Information</div>
      <p style={paragraphStyle}>
        Upon request, or upon termination of discussions, the Receiving Party shall promptly return or destroy all Confidential Information, including all copies, notes, and derivatives thereof.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>7. Remedies</div>
      <p style={paragraphStyle}>
        The Disclosing Party shall be entitled to seek injunctive relief for any breach or threatened breach of this Agreement, in addition to any other remedies available at law or in equity.
      </p>
    </div>

    <div style={signatureStyle}>
      <SignatureBlock party="FrameMaxx (Disclosing Party)" />
      <SignatureBlock party="Receiving Party" />
    </div>

    <PageFooter />
  </div>
);

// 3. PROPOSAL TEMPLATE
const proposalContent = (
  <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
    <PageHeader title="Project Proposal" subtitle="Web Development Services" />
    
    <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
      <span>Proposal ID: FMX-PROP-[___________]</span>
      <span>Date: [___________]</span>
    </div>
    <div style={{ ...sectionStyle, fontSize: 12, color: lightGray, textAlign: "center" }}>
      Valid for 30 days from date of issue
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Prepared For</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Client Name:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Company:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Email:</span>
        <span style={fieldLineStyle}></span>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Prepared By</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Agency:</span>
        <span>FrameMaxx Web Development Agency</span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Project Manager:</span>
        <span style={fieldLineStyle}></span>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Project Overview</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Project Name:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Project Type:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <p style={paragraphStyle}>
        [Brief description of the project, goals, and expected outcomes. This section should paint a clear picture of what will be built and why it matters to the client.]
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Proposed Solution</div>
      <p style={paragraphStyle}>
        [Detailed description of the technical approach, architecture, and methodology FrameMaxx will use to deliver the project. Include technology stack, development approach, and key design decisions.]
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Deliverables & Milestones</div>
      <div style={{ fontSize: 12, borderCollapse: "collapse", width: "100%" }}>
        <div style={{ display: "flex", fontWeight: 700, borderBottom: `2px solid ${gold}`, paddingBottom: 6, marginBottom: 6 }}>
          <span style={{ flex: 0.5 }}>#</span>
          <span style={{ flex: 2 }}>Milestone</span>
          <span style={{ flex: 2 }}>Deliverable</span>
          <span style={{ flex: 1 }}>Timeline</span>
          <span style={{ flex: 1 }}>Cost</span>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ display: "flex", borderBottom: `1px solid ${borderColor}`, padding: "6px 0", color: grayText }}>
            <span style={{ flex: 0.5 }}>{i}</span>
            <span style={{ flex: 2 }}>[Milestone {i}]</span>
            <span style={{ flex: 2 }}>[Deliverable {i}]</span>
            <span style={{ flex: 1 }}>[Week(s)]</span>
            <span style={{ flex: 1 }}>[$0,000]</span>
          </div>
        ))}
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Investment</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Total Project Cost:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Payment Terms:</span>
        <span>☐ 50/50 &nbsp; ☐ 40/30/30 &nbsp; ☐ Monthly &nbsp; ☐ Custom</span>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Next Steps</div>
      <p style={paragraphStyle}>
        1. Review and approve this proposal<br />
        2. Sign the Master Service Agreement<br />
        3. Submit initial payment<br />
        4. Kick-off meeting within 5 business days
      </p>
    </div>

    <PageFooter />
  </div>
);

// 4. INVOICE TEMPLATE
const invoiceContent = (
  <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
      <div>
        <div style={{ fontSize: 11, color: gold, letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>FRAMEMAXX</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: darkText }}>INVOICE</div>
      </div>
      <div style={{ textAlign: "right", fontSize: 13, color: grayText }}>
        <div style={{ fontWeight: 700, color: darkText, fontSize: 16 }}>Invoice #: FMX-INV-[___________]</div>
        <div>Date: [___________]</div>
        <div>Due Date: [___________]</div>
      </div>
    </div>

    <div style={{ display: "flex", gap: 40, marginBottom: 24 }}>
      <div style={{ flex: 1 }}>
        <div style={sectionHeaderStyle}>From</div>
        <div style={{ fontSize: 13, lineHeight: 1.8, color: grayText }}>
          <strong style={{ color: darkText }}>FrameMaxx Web Development Agency</strong><br />
          [Address Line 1]<br />
          [City, State, ZIP]<br />
          [Email] | [Phone]
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={sectionHeaderStyle}>Bill To</div>
        <div style={{ fontSize: 13, lineHeight: 1.8, color: grayText }}>
          <strong style={{ color: darkText }}>[Client Name]</strong><br />
          [Company Name]<br />
          [Address]<br />
          [Email] | [Phone]
        </div>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Project Details</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Project Name:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Project ID:</span>
        <span style={fieldLineStyle}></span>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={{ fontSize: 12, borderCollapse: "collapse", width: "100%" }}>
        <div style={{ display: "flex", fontWeight: 700, borderBottom: `2px solid ${gold}`, paddingBottom: 8, marginBottom: 4 }}>
          <span style={{ flex: 0.5 }}>#</span>
          <span style={{ flex: 3 }}>Description</span>
          <span style={{ flex: 0.7, textAlign: "center" }}>Qty</span>
          <span style={{ flex: 1.2, textAlign: "right" }}>Rate</span>
          <span style={{ flex: 1.2, textAlign: "right" }}>Amount</span>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: "flex", borderBottom: `1px solid ${borderColor}`, padding: "8px 0", color: grayText, fontSize: 13 }}>
            <span style={{ flex: 0.5 }}>{i}</span>
            <span style={{ flex: 3 }}>[Service description]</span>
            <span style={{ flex: 0.7, textAlign: "center" }}>[0]</span>
            <span style={{ flex: 1.2, textAlign: "right" }}>$0,000</span>
            <span style={{ flex: 1.2, textAlign: "right" }}>$0,000</span>
          </div>
        ))}
      </div>
    </div>

    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
      <div style={{ width: 250 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0", borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ color: grayText }}>Subtotal</span>
          <span style={{ fontWeight: 600 }}>$0,000.00</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0", borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ color: grayText }}>Tax</span>
          <span style={{ fontWeight: 600 }}>$0.00</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, padding: "8px 0", fontWeight: 700, borderBottom: `2px solid ${gold}` }}>
          <span>Total Due</span>
          <span style={{ color: gold }}>$0,000.00</span>
        </div>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Payment Information</div>
      <p style={paragraphStyle}>
        Payment is due within 15 business days. Please include the invoice number in your payment reference.
      </p>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Bank Name:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Account Name:</span>
        <span>FrameMaxx Web Development Agency</span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Account Number:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Routing Number:</span>
        <span style={fieldLineStyle}></span>
      </div>
    </div>

    <div style={{ textAlign: "center", fontSize: 11, color: lightGray, marginTop: 30 }}>
      Thank you for your business!
    </div>

    <PageFooter />
  </div>
);

// 5. PROJECT BRIEF FORM
const projectBriefContent = (
  <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
    <PageHeader title="Project Brief" subtitle="Client Intake Questionnaire" />
    
    <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
      <span>Brief ID: FMX-PB-[___________]</span>
      <span>Date: [___________]</span>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Client Information</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Full Name:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Email Address:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Phone Number:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Company Name:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Job Title:</span>
        <span style={fieldLineStyle}></span>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Business Overview</div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>Describe your business and what it does:</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 60, marginBottom: 8 }}></div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>Who is your target audience?</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 60, marginBottom: 8 }}></div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>Who are your main competitors?</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 60, marginBottom: 8 }}></div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Project Goals</div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>What is the primary goal of this project?</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 40, marginBottom: 8 }}></div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>What problems are you trying to solve?</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 60, marginBottom: 8 }}></div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>How will you measure success?</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 40, marginBottom: 8 }}></div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Project Specifications</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Project Type:</span>
        <span>☐ Portfolio &nbsp; ☐ Business &nbsp; ☐ E-commerce &nbsp; ☐ Web App &nbsp; ☐ Other</span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Budget Range:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Target Launch Date:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Existing Website:</span>
        <span style={fieldLineStyle}></span>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Features & Requirements</div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>List the key features you need:</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 80, marginBottom: 8 }}></div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>Any third-party integrations needed?</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 40, marginBottom: 8 }}></div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Design Preferences</div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>Reference websites you like:</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 40, marginBottom: 8 }}></div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Brand Colors:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Style Preference:</span>
        <span>☐ Minimal &nbsp; ☐ Bold &nbsp; ☐ Corporate &nbsp; ☐ Creative &nbsp; ☐ Other</span>
      </div>
    </div>

    <PageFooter />
  </div>
);

// 6. SCOPE OF WORK TEMPLATE
const sowContent = (
  <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
    <PageHeader title="Scope of Work" subtitle="Statement of Work" />
    
    <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
      <span>SOW ID: FMX-SOW-[___________]</span>
      <span>Date: [___________]</span>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Project Overview</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Project Name:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Client:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Project Manager:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <p style={paragraphStyle}>
        [Provide a comprehensive overview of the project, including background, motivation, and high-level objectives.]
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Objectives</div>
      <p style={paragraphStyle}>
        1. [Objective 1 - e.g., Design a responsive, modern website]<br />
        2. [Objective 2 - e.g., Implement user authentication and dashboard]<br />
        3. [Objective 3 - e.g., Integrate payment processing]<br />
        4. [Objective 4 - e.g., Ensure SEO optimization and performance]
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>In Scope</div>
      <p style={paragraphStyle}>
        ☐ Custom UI/UX design (up to [X] pages)<br />
        ☐ Responsive development (desktop, tablet, mobile)<br />
        ☐ Content Management System integration<br />
        ☐ User authentication and authorization<br />
        ☐ Payment gateway integration<br />
        ☐ SEO optimization and meta tag configuration<br />
        ☐ Performance optimization (Core Web Vitals)<br />
        ☐ Cross-browser testing<br />
        ☐ Deployment to production server<br />
        ☐ 30-day post-launch bug support
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Out of Scope</div>
      <p style={paragraphStyle}>
        ☐ Content writing and copywriting<br />
        ☐ Photography and stock image licensing<br />
        ☐ Video production<br />
        ☐ Ongoing maintenance and updates<br />
        ☐ Mobile application development<br />
        ☐ Third-party API development (only integration)
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Technical Specifications</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Frontend:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Backend:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Database:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Hosting:</span>
        <span style={fieldLineStyle}></span>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Timeline</div>
      <div style={{ fontSize: 12, borderCollapse: "collapse", width: "100%" }}>
        <div style={{ display: "flex", fontWeight: 700, borderBottom: `2px solid ${gold}`, paddingBottom: 6, marginBottom: 6 }}>
          <span style={{ flex: 0.5 }}>Phase</span>
          <span style={{ flex: 2 }}>Description</span>
          <span style={{ flex: 1 }}>Duration</span>
          <span style={{ flex: 1 }}>Deliverable</span>
        </div>
        {["Discovery", "Design", "Development", "Testing", "Launch"].map((phase, i) => (
          <div key={phase} style={{ display: "flex", borderBottom: `1px solid ${borderColor}`, padding: "6px 0", color: grayText }}>
            <span style={{ flex: 0.5 }}>{i + 1}</span>
            <span style={{ flex: 2 }}>{phase}</span>
            <span style={{ flex: 1 }}>[X weeks]</span>
            <span style={{ flex: 1 }}>[Deliverable]</span>
          </div>
        ))}
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Assumptions & Dependencies</div>
      <p style={paragraphStyle}>
        • Client will provide all content, images, and branding assets within 5 business days of request<br />
        • Client will provide timely feedback within 48 hours of each review cycle<br />
        • Third-party services (hosting, domains, APIs) are the client&apos;s responsibility unless otherwise noted<br />
        • Scope changes require a formal Change Request and may affect timeline and budget
      </p>
    </div>

    <div style={signatureStyle}>
      <SignatureBlock party="FrameMaxx" />
      <SignatureBlock party="Client" />
    </div>

    <PageFooter />
  </div>
);

// 7. CHANGE REQUEST FORM
const changeRequestContent = (
  <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
    <PageHeader title="Change Request Form" subtitle="Project Modification Request" />
    
    <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
      <span>CR ID: FMX-CR-[___________]</span>
      <span>Date: [___________]</span>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Project Information</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Project Name:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Project ID:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Current Phase:</span>
        <span>☐ Discovery &nbsp; ☐ Design &nbsp; ☐ Development &nbsp; ☐ Testing &nbsp; ☐ Post-Launch</span>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Requestor Information</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Name:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Role:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Email:</span>
        <span style={fieldLineStyle}></span>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Change Description</div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>Describe the requested change in detail:</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 80, marginBottom: 12 }}></div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>Reason for the change:</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 60, marginBottom: 12 }}></div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>What happens if this change is NOT implemented?</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 40, marginBottom: 8 }}></div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Impact Assessment</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Priority Level:</span>
        <span>☐ Critical &nbsp; ☐ High &nbsp; ☐ Medium &nbsp; ☐ Low</span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Timeline Impact:</span>
        <span>☐ No change &nbsp; ☐ 1-2 weeks delay &nbsp; ☐ 2-4 weeks delay &nbsp; ☐ Major delay</span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Budget Impact:</span>
        <span>☐ No change &nbsp; ☐ Minor increase &nbsp; ☐ Significant increase</span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Estimated Additional Cost:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Additional Time Required:</span>
        <span style={fieldLineStyle}></span>
      </div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Affected Deliverables</div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>List the deliverables impacted by this change:</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 40, marginBottom: 8 }}></div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>Approval</div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Decision:</span>
        <span>☐ Approved &nbsp; ☐ Rejected &nbsp; ☐ Deferred &nbsp; ☐ Modified</span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Approved By:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle}>Approval Date:</span>
        <span style={fieldLineStyle}></span>
      </div>
      <p style={{ ...paragraphStyle, marginBottom: 6 }}>Notes / Conditions:</p>
      <div style={{ borderBottom: `1px solid ${borderColor}`, height: 40, marginBottom: 8 }}></div>
    </div>

    <PageFooter />
  </div>
);

// 8. PRIVACY POLICY + TERMS
const privacyTermsContent = (
  <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: darkText }}>
    <PageHeader title="Privacy Policy & Terms of Service" subtitle="Effective Date: [___________]" />
    
    <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", fontSize: 12, color: grayText }}>
      <span>Document ID: FMX-PT-[___________]</span>
      <span>Last Updated: [___________]</span>
    </div>

    {/* PRIVACY POLICY */}
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: darkText }}>PRIVACY POLICY</div>
      <div style={{ width: 60, height: 3, background: gold, margin: "8px auto" }}></div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>1. Information We Collect</div>
      <p style={paragraphStyle}>
        We collect information you provide directly through our intake forms, communications, and project engagements. This includes: name, email address, phone number, business name, project details, and any additional information you choose to share.
      </p>
      <p style={paragraphStyle}>
        We also automatically collect certain technical information when you visit our website, including IP address, browser type, device information, and usage data through cookies and similar technologies.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>2. How We Use Your Information</div>
      <p style={paragraphStyle}>
        • To evaluate and respond to your project requests<br />
        • To communicate about project progress and deliverables<br />
        • To provide and improve our services<br />
        • To send relevant updates about our services (with your consent)<br />
        • To comply with legal obligations<br />
        • To protect our rights and prevent fraud
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>3. Information Sharing</div>
      <p style={paragraphStyle}>
        We do not sell, trade, or rent your personal information to third parties. We may share information with: trusted service providers who assist in our operations (hosting, email, analytics); legal authorities when required by law; business partners with your explicit consent.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>4. Data Security</div>
      <p style={paragraphStyle}>
        We implement industry-standard security measures including encryption, secure servers, and access controls to protect your information. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>5. Data Retention</div>
      <p style={paragraphStyle}>
        We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Project-related data is retained for up to 3 years after project completion.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>6. Your Rights</div>
      <p style={paragraphStyle}>
        You have the right to: access your personal data; request correction of inaccurate data; request deletion of your data; object to processing; request data portability; withdraw consent at any time. To exercise these rights, contact us at privacy@framemaxx.com.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>7. Cookies</div>
      <p style={paragraphStyle}>
        Our website uses cookies and similar tracking technologies to enhance your experience, analyze traffic, and personalize content. You can control cookie preferences through your browser settings. Disabling cookies may affect certain website features.
      </p>
    </div>

    {/* TERMS OF SERVICE */}
    <div style={{ textAlign: "center", marginTop: 30, marginBottom: 20 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: darkText }}>TERMS OF SERVICE</div>
      <div style={{ width: 60, height: 3, background: gold, margin: "8px auto" }}></div>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>1. Acceptance of Terms</div>
      <p style={paragraphStyle}>
        By accessing our website or engaging our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website or services.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>2. Services</div>
      <p style={paragraphStyle}>
        FrameMaxx provides web development, design, and related digital services. The specific scope, deliverables, and terms for each engagement are defined in individual project agreements, proposals, or statements of work.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>3. Client Responsibilities</div>
      <p style={paragraphStyle}>
        Clients agree to: provide accurate and complete information; deliver content and assets in a timely manner; provide feedback within agreed timeframes; ensure they have the right to use any content or assets provided to FrameMaxx; make payments according to agreed schedules.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>4. Intellectual Property</div>
      <p style={paragraphStyle}>
        Upon full payment, the Client receives ownership of custom code and design assets created specifically for their project. FrameMaxx retains ownership of pre-existing code, tools, frameworks, and methodologies. FrameMaxx may showcase the project in its portfolio unless a written NDA is in place.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>5. Limitation of Liability</div>
      <p style={paragraphStyle}>
        FrameMaxx&apos;s total liability for any claim shall not exceed the total fees paid by the Client for the specific project in question. We are not liable for indirect, incidental, special, or consequential damages, including lost profits or data.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>6. Dispute Resolution</div>
      <p style={paragraphStyle}>
        Any disputes arising from these terms shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration in accordance with applicable jurisdiction rules.
      </p>
    </div>

    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>7. Modifications</div>
      <p style={paragraphStyle}>
        FrameMaxx reserves the right to modify these Terms at any time. Changes will be posted on our website with an updated effective date. Continued use of our services after changes constitutes acceptance of the modified Terms.
      </p>
    </div>

    <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: lightGray }}>
      For questions about this Privacy Policy or Terms of Service, contact legal@framemaxx.com
    </div>

    <PageFooter />
  </div>
);

export const templates: TemplateDef[] = [
  {
    id: "contract",
    title: "Contract Template",
    description: "Master service agreement for web development projects with legal terms, payment structure, and IP rights.",
    icon: "📜",
    content: contractContent,
  },
  {
    id: "nda",
    title: "NDA Template",
    description: "Non-disclosure agreement to protect confidential information shared during project discussions.",
    icon: "🔐",
    content: ndaContent,
  },
  {
    id: "proposal",
    title: "Proposal Template",
    description: "Professional project proposal with scope, milestones, deliverables, and pricing breakdown.",
    icon: "📋",
    content: proposalContent,
  },
  {
    id: "invoice",
    title: "Invoice Template",
    description: "Clean, professional invoice with itemized services, payment terms, and banking details.",
    icon: "🧾",
    content: invoiceContent,
  },
  {
    id: "project-brief",
    title: "Project Brief Form",
    description: "Comprehensive client intake questionnaire covering business overview, goals, and specifications.",
    icon: "📝",
    content: projectBriefContent,
  },
  {
    id: "scope-of-work",
    title: "Scope of Work",
    description: "Detailed statement of work with objectives, in/out of scope items, timeline, and dependencies.",
    icon: "📊",
    content: sowContent,
  },
  {
    id: "change-request",
    title: "Change Request Form",
    description: "Formal form for requesting project modifications with impact assessment and approval workflow.",
    icon: "✏️",
    content: changeRequestContent,
  },
  {
    id: "privacy-terms",
    title: "Privacy Policy + Terms",
    description: "Combined privacy policy and terms of service document with legal compliance provisions.",
    icon: "🛡️",
    content: privacyTermsContent,
  },
];
