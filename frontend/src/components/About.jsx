// ============================================================
// ABOUT.JSX — The "About VAL" section.
//
// This section displays:
// - The core philosophy quote at the top
// - Two cards side by side: "Our Vision" (left) and "Our Mission" (right)
// - A row of "What Makes Us Different" badges at the bottom
//
// DATA SOURCE: Receives "about" as a prop from App.jsx, which fetches
// it from the backend API endpoint GET /api/about.
//
// The "about" object contains: vision, mission (array), philosophy,
// and differentiators (array).
// ============================================================

// "{ about }" means this component receives an "about" prop (input) from its parent.
// Think of props like function arguments — the parent passes data, and this component displays it.
export default function About({ about }) {
  // If the data hasn't loaded yet from the backend, show nothing.
  // Once the API call completes in App.jsx, this component will re-render with data.
  if (!about) return null;

  return (
    // id="about" allows the navbar link "About" to scroll directly to this section
    <section id="about" className="section" style={{ background: "var(--bg-light)" }}>
      <div className="container">
        {/* Section heading */}
        <h2 className="section-title">About VAL</h2>
        {/* The philosophy quote appears as the subtitle */}
        <p className="section-subtitle">{about.philosophy}</p>

        {/* ---- TWO CARDS: Vision & Mission side by side ---- */}
        <div className="about-grid">
          {/* Vision Card (left) — has a blue top border */}
          <div className="about-card about-card--vision">
            <div className="about-card__icon">&#127919;</div> {/* Target/bullseye emoji */}
            <h3>Our Vision</h3>
            <p>{about.vision}</p>
          </div>

          {/* Mission Card (right) — has a gold top border */}
          <div className="about-card about-card--mission">
            <div className="about-card__icon">&#127942;</div> {/* Trophy emoji */}
            <h3>Our Mission</h3>
            <ul>
              {/* Loop through each mission statement and display it as a list item */}
              {about.mission.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- DIFFERENTIATORS: Pill-shaped badges in a row ---- */}
        <div className="about-diff">
          <h3>What Makes Us Different</h3>
          <div className="about-diff__grid">
            {/* Loop through each differentiator and show it as a badge with a checkmark */}
            {about.differentiators.map((d, i) => (
              <div key={i} className="about-diff__item">
                <div className="about-diff__check">&#10003;</div> {/* Green checkmark */}
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- STYLES FOR THIS COMPONENT ---- */}
      <style>{`
        /* Two cards side by side (Vision | Mission) */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;  /* Equal width columns */
          gap: 32px;
          margin-bottom: 48px;
        }

        /* Card styling: white background, rounded corners, shadow, colored top border */
        .about-card {
          background: #fff;
          padding: 40px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          border-top: 4px solid var(--primary);  /* Blue top border by default */
        }
        /* Mission card gets a gold top border instead */
        .about-card--mission { border-top-color: var(--secondary); }

        .about-card__icon {
          font-size: 2rem;
          margin-bottom: 16px;
        }
        .about-card h3 {
          font-size: 1.5rem;
          color: var(--primary);
          margin-bottom: 16px;
        }
        .about-card p,
        .about-card li {
          color: var(--text-light);
          line-height: 1.7;
        }

        /* Mission list: remove default bullets, add arrow instead */
        .about-card ul {
          list-style: none;
          padding: 0;
        }
        .about-card li {
          padding: 6px 0;
          padding-left: 24px;
          position: relative;
        }
        .about-card li::before {
          content: "\\2192";       /* Arrow character */
          position: absolute;
          left: 0;
          color: var(--secondary); /* Gold arrow */
          font-weight: bold;
        }

        /* Differentiators section */
        .about-diff {
          text-align: center;
        }
        .about-diff h3 {
          font-size: 1.5rem;
          color: var(--primary);
          margin-bottom: 24px;
        }

        /* Pill-shaped badges in a wrapping row */
        .about-diff__grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }
        .about-diff__item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          padding: 12px 24px;
          border-radius: 50px;         /* Pill shape */
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          font-weight: 500;
        }
        .about-diff__check {
          color: var(--accent);        /* Green checkmark */
          font-weight: bold;
          font-size: 1.1rem;
        }

        /* On mobile: stack the two cards vertically instead of side by side */
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-card { padding: 28px; }
        }
      `}</style>
    </section>
  );
}
