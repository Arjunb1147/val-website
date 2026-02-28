// ============================================================
// FORMATS.JSX — The "Learning Formats" section.
//
// This section shows:
// 1. TOP HALF — The 5 different ways students can learn at VAL:
//    Live Cohorts, Self-Paced, Masterclasses, Corporate Training, Consulting.
//    Each is shown as a card with an icon.
//
// 2. BOTTOM HALF — Certification & Credibility information:
//    4 types of certifications/credentials VAL offers.
//
// DATA SOURCE: Receives "formats" array from App.jsx via GET /api/formats.
// The certification items are hardcoded since they rarely change.
// ============================================================

// Icons for each learning format card (matched by array position)
const formatIcons = [
  "\uD83C\uDF93", // Graduation cap — Live Cohort Programs
  "\uD83D\uDCF9", // Video camera — Self-Paced Recorded Courses
  "\uD83D\uDCC5", // Calendar — Weekend Masterclasses
  "\uD83C\uDFE2", // Office building — Corporate Training
  "\uD83E\uDD1D", // Handshake — Consulting & Mentorship
];

export default function Formats({ formats }) {
  // Don't render until data loads from backend
  if (!formats.length) return null;

  return (
    // id="formats" allows the navbar "Formats" link to scroll here
    <section id="formats" className="section" style={{ background: "var(--bg-alt)" }}>
      <div className="container">
        <h2 className="section-title">Learning Formats</h2>
        <p className="section-subtitle">
          Flexible learning options designed to fit every schedule and learning style.
        </p>

        {/* ---- LEARNING FORMAT CARDS (auto-fit grid) ---- */}
        {/* Each card shows an icon + the format name (e.g., "Weekend Masterclasses") */}
        <div className="formats-grid">
          {formats.map((format, i) => (
            <div key={i} className="format-card">
              <span className="format-card__icon">{formatIcons[i]}</span>
              <span className="format-card__text">{format}</span>
            </div>
          ))}
        </div>

        {/* ---- CERTIFICATION & CREDIBILITY SECTION ---- */}
        <div className="cert-section">
          <h3>Certification & Credibility</h3>
          <div className="cert-grid">
            <div className="cert-item">
              <span className="cert-icon">{"\uD83D\uDCDC"}</span> {/* Scroll/certificate */}
              <p>Course Completion Certificates</p>
            </div>
            <div className="cert-item">
              <span className="cert-icon">{"\u2B50"}</span> {/* Star */}
              <p>Founder-led Certification Credibility</p>
            </div>
            <div className="cert-item">
              <span className="cert-icon">{"\uD83D\uDCBC"}</span> {/* Briefcase */}
              <p>Industry-oriented Project Certificates</p>
            </div>
            <div className="cert-item">
              <span className="cert-icon">{"\uD83C\uDF10"}</span> {/* Globe */}
              <p>Future Industry Body Tie-ups</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---- STYLES FOR THIS COMPONENT ---- */}
      <style>{`
        /* Responsive grid: cards auto-fit, minimum 220px wide */
        .formats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 56px;
        }

        /* Each format card: icon + text side by side, lifts on hover */
        .format-card {
          background: #fff;
          padding: 28px 24px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          display: flex;
          align-items: center;
          gap: 14px;
          transition: transform 0.2s;
        }
        .format-card:hover {
          transform: translateY(-4px); /* Slight lift effect on hover */
        }
        .format-card__icon {
          font-size: 1.8rem;
          flex-shrink: 0;
        }
        .format-card__text {
          font-weight: 500;
          color: var(--text);
        }

        /* Certification section heading */
        .cert-section {
          text-align: center;
        }
        .cert-section h3 {
          font-size: 1.5rem;
          color: var(--primary);
          margin-bottom: 28px;
        }

        /* Certification cards grid */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        .cert-item {
          background: #fff;
          padding: 24px;
          border-radius: var(--radius-sm);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .cert-icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 12px;
        }
        .cert-item p {
          color: var(--text-light);
          font-size: 0.95rem;
        }
      `}</style>
    </section>
  );
}
