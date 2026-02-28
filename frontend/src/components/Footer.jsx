// ============================================================
// FOOTER.JSX — The bottom section of the website.
//
// Displays three columns:
//   1. Brand info — Company name, tagline, and parent company credit
//   2. Quick Links — Navigation links to scroll back to any section
//   3. Programs — Direct links to the 5 learning pillars
//
// Below the three columns is a copyright bar.
//
// This component has NO props — all content is static/hardcoded
// since footer content rarely changes.
// ============================================================

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* ---- THREE-COLUMN LAYOUT ---- */}
        <div className="footer__inner">

          {/* Column 1: Brand information */}
          <div className="footer__brand">
            <h3>Value Added Learning</h3>
            <p>Where Experience Meets Future Skills</p>
            <p className="footer__sub">A Valves Mind Consulting Initiative</p>
          </div>

          {/* Column 2: Quick navigation links — scroll to sections on the same page */}
          <div className="footer__links">
            <h4>Quick Links</h4>
            <a href="#about">About</a>
            <a href="#pillars">Programs</a>
            <a href="#formats">Formats</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
          </div>

          {/* Column 3: Links to each learning pillar (all scroll to the Pillars section) */}
          <div className="footer__links">
            <h4>Programs</h4>
            <a href="#pillars">Industrial Valves</a>
            <a href="#pillars">Architecture</a>
            <a href="#pillars">AI & Data Analytics</a>
            <a href="#pillars">Cyber Security</a>
            <a href="#pillars">Parenting</a>
          </div>
        </div>

        {/* ---- COPYRIGHT BAR ---- */}
        <div className="footer__bottom">
          <p>&copy; 2026 Value Added Learning (VAL). All rights reserved.</p>
        </div>
      </div>

      {/* ---- STYLES FOR THIS COMPONENT ---- */}
      <style>{`
        /* Dark background for the footer */
        .footer {
          background: var(--dark);
          color: rgba(255,255,255,0.7);
          padding: 60px 0 0;
        }

        /* Three-column grid: brand gets 2x width, links get 1x each */
        .footer__inner {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 40px;
        }

        /* Brand column */
        .footer__brand h3 {
          color: #fff;
          font-size: 1.4rem;
          margin-bottom: 8px;
        }
        .footer__brand p {
          color: var(--secondary); /* Gold tagline */
          font-style: italic;
          margin-bottom: 8px;
        }
        /* "A Valves Mind Consulting Initiative" — subtle, smaller text */
        .footer__sub {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4) !important;
          font-style: normal !important;
        }

        /* Links columns: stacked links with uppercase headings */
        .footer__links h4 {
          color: #fff;
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .footer__links a {
          display: block;
          color: rgba(255,255,255,0.6);
          font-size: 0.9rem;
          padding: 4px 0;
          transition: color 0.2s;
        }
        .footer__links a:hover {
          color: var(--secondary); /* Gold on hover */
        }

        /* Copyright bar at the very bottom with a thin divider line */
        .footer__bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 20px 0;
          text-align: center;
          font-size: 0.85rem;
        }

        /* On mobile: stack all three columns vertically */
        @media (max-width: 768px) {
          .footer__inner { grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>
    </footer>
  );
}
