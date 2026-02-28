// ============================================================
// PILLARS.JSX — The "Our Learning Pillars" section.
//
// This is the most interactive section on the page. It displays
// VAL's 5 learning pillars as expandable/collapsible cards.
//
// HOW IT WORKS:
// - By default, all cards are collapsed (showing just title + lead name)
// - When you click a card, it EXPANDS to show full details:
//   Target Audience, Courses Offered, Delivery Method, and Value Addition
// - Clicking the same card again COLLAPSES it
// - Only ONE card can be expanded at a time
//
// Each pillar has its own unique color (blue, purple, cyan, green, red)
// shown as a left border stripe on each card.
//
// DATA SOURCE: Receives "pillars" array from App.jsx via GET /api/pillars.
// ============================================================

import { useState } from "react";

// Maps the pillar "icon" field (from the API) to actual emoji characters.
// For example, pillar 1 has icon: "industry" which maps to the gear emoji.
const iconMap = {
  industry: "\u2699\uFE0F",       // Gear (Industrial Engineering)
  building: "\uD83C\uDFD7\uFE0F", // Construction (Architecture)
  brain: "\uD83E\uDDE0",          // Brain (AI/ML)
  shield: "\uD83D\uDEE1\uFE0F",   // Shield (Cyber Security)
  heart: "\u2764\uFE0F",          // Heart (Parenting)
};

// Each pillar gets a unique color for its left border and headings.
const colorMap = {
  1: "#1a3c6e", // Dark blue — Industrial Engineering
  2: "#8e44ad", // Purple — Architecture
  3: "#2980b9", // Cyan — AI & Data Analytics
  4: "#27ae60", // Green — Cyber Security
  5: "#e74c3c", // Red — Parenting
};

export default function Pillars({ pillars }) {
  // Tracks which pillar card is currently expanded (by its ID number).
  // null = all collapsed. Example: expanded=3 means the AI/ML card is open.
  const [expanded, setExpanded] = useState(null);

  // Don't render anything until data has loaded from the backend
  if (!pillars.length) return null;

  return (
    // id="pillars" allows the navbar "Programs" link to scroll here
    <section id="pillars" className="section">
      <div className="container">
        <h2 className="section-title">Our Learning Pillars</h2>
        <p className="section-subtitle">
          Five comprehensive pillars of learning, each led by an industry expert
          with decades of real-world experience.
        </p>

        {/* Stack of expandable pillar cards */}
        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className={`pillar-card ${expanded === pillar.id ? "pillar-card--expanded" : ""}`}
              // Set a CSS variable so this card uses its unique color
              style={{ "--pillar-color": colorMap[pillar.id] }}
            >
              {/* ---- CARD HEADER (always visible, clickable to expand/collapse) ---- */}
              <div
                className="pillar-card__header"
                onClick={() => setExpanded(expanded === pillar.id ? null : pillar.id)}
                // If this card is already expanded, clicking collapses it (set to null).
                // Otherwise, expand this card (set to its ID).
              >
                <span className="pillar-card__icon">{iconMap[pillar.icon]}</span>
                <div>
                  <h3 className="pillar-card__title">{pillar.title}</h3>
                  <p className="pillar-card__lead">Led by {pillar.lead}</p>
                </div>
                {/* Plus/minus toggle indicator on the right */}
                <span className="pillar-card__toggle">
                  {expanded === pillar.id ? "\u2212" : "+"}
                </span>
              </div>

              {/* ---- CARD BODY (only visible when this card is expanded) ---- */}
              {expanded === pillar.id && (
                <div className="pillar-card__body">
                  {/* Target Audience — shown as pill-shaped tags */}
                  <div className="pillar-card__section">
                    <h4>Target Audience</h4>
                    <div className="pillar-tags">
                      {pillar.targetAudience.map((t, i) => (
                        <span key={i} className="pillar-tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Courses Offered — bullet list */}
                  <div className="pillar-card__section">
                    <h4>Courses Offered</h4>
                    <ul>
                      {pillar.courses.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Delivery Method — bullet list */}
                  <div className="pillar-card__section">
                    <h4>Delivery Method</h4>
                    <ul>
                      {pillar.deliveryMethod.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Value Addition — bullet list */}
                  <div className="pillar-card__section">
                    <h4>Value Addition</h4>
                    <ul>
                      {pillar.valueAddition.map((v, i) => (
                        <li key={i}>{v}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ---- STYLES FOR THIS COMPONENT ---- */}
      <style>{`
        /* Cards stacked vertically with gaps */
        .pillars-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Each pillar card: white with a colored left border stripe */
        .pillar-card {
          background: #fff;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          border-left: 5px solid var(--pillar-color); /* Unique color stripe */
          transition: box-shadow 0.3s;
        }
        .pillar-card:hover {
          box-shadow: var(--shadow-lg); /* Stronger shadow on hover */
        }

        /* Clickable header area */
        .pillar-card__header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px 28px;
          cursor: pointer;         /* Shows hand icon indicating it's clickable */
          user-select: none;       /* Prevents text selection when clicking */
        }
        .pillar-card__icon {
          font-size: 2rem;
          flex-shrink: 0;
        }
        .pillar-card__title {
          font-size: 1.25rem;
          color: var(--pillar-color); /* Uses the pillar's unique color */
          margin-bottom: 2px;
        }
        .pillar-card__lead {
          font-size: 0.9rem;
          color: var(--text-light);
        }

        /* The +/- toggle button on the right side */
        .pillar-card__toggle {
          margin-left: auto;
          font-size: 1.5rem;
          color: var(--pillar-color);
          font-weight: 300;
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(0,0,0,0.04);
        }

        /* Expanded body: 2-column grid (Audience + Courses | Delivery + Value) */
        .pillar-card__body {
          padding: 0 28px 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        /* Section headers inside expanded body (e.g., "TARGET AUDIENCE") */
        .pillar-card__section h4 {
          font-family: "Inter", sans-serif;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--pillar-color);
          margin-bottom: 12px;
        }

        /* Bullet lists inside expanded body */
        .pillar-card__section ul {
          list-style: none;
          padding: 0;
        }
        .pillar-card__section li {
          padding: 4px 0 4px 20px;
          position: relative;
          color: var(--text-light);
          font-size: 0.95rem;
        }
        /* Custom bullet: small triangle arrow */
        .pillar-card__section li::before {
          content: "\\25B8";           /* Right-pointing triangle */
          position: absolute;
          left: 0;
          color: var(--pillar-color);
        }

        /* Target audience tags: pill-shaped badges */
        .pillar-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pillar-tag {
          background: var(--bg-alt);
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.85rem;
          color: var(--text);
        }

        /* On mobile: expanded content goes single column */
        @media (max-width: 768px) {
          .pillar-card__body { grid-template-columns: 1fr; }
          .pillar-card__header { padding: 18px 20px; }
        }
      `}</style>
    </section>
  );
}
