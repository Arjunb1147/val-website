// ============================================================
// TEAM.JSX — The "Our Team" section.
//
// Displays a card for each founder/co-founder with:
// - A circular avatar showing their initials (e.g., "GR" for G. Ravindran)
// - Their name, role, credentials (if any), and area of expertise
//
// Each card has a unique color (matched to their pillar) shown as
// the bottom border and avatar background color.
//
// The cards lift up slightly when hovered for a nice interactive feel.
//
// DATA SOURCE: Receives "team" array from App.jsx via GET /api/team.
// ============================================================

// Unique color for each team member's card (matches their pillar theme)
const teamColors = [
  "#1a3c6e", // G. Ravindran — Dark blue (Industrial Engineering)
  "#8e44ad", // K. Padma — Purple (Architecture)
  "#e74c3c", // R. Suganya — Red (Cyber Security / Parenting)
  "#2980b9", // Arjun — Cyan (AI/ML)
];

export default function Team({ team }) {
  // Don't render until data loads from backend
  if (!team.length) return null;

  return (
    // id="team" allows the navbar "Team" link to scroll here
    <section id="team" className="section">
      <div className="container">
        <h2 className="section-title">Our Team</h2>
        <p className="section-subtitle">
          A family of industry experts with decades of combined real-world experience.
        </p>

        {/* Grid of team member cards — auto-fits to screen width */}
        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className="team-card" style={{ "--team-color": teamColors[i] }}>
              {/* Avatar circle with initials.
                  "G. Ravindran" → splits into ["G.", "Ravindran"] → takes first letter of each → "GR" */}
              <div className="team-card__avatar">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>

              {/* Member details */}
              <h3 className="team-card__name">{member.name}</h3>
              <p className="team-card__role">{member.role}</p>

              {/* Credentials only shown if they exist (only G. Ravindran has them) */}
              {member.credentials && (
                <p className="team-card__cred">{member.credentials}</p>
              )}

              {/* Area of expertise shown as a pill badge */}
              <p className="team-card__expertise">{member.expertise}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---- STYLES FOR THIS COMPONENT ---- */}
      <style>{`
        /* Responsive grid: fits as many 250px+ cards as possible per row */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        /* Team card: centered text, shadow, colored bottom border */
        .team-card {
          background: #fff;
          padding: 40px 28px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          text-align: center;
          transition: transform 0.3s;
          border-bottom: 4px solid var(--team-color); /* Unique color stripe at bottom */
        }
        .team-card:hover {
          transform: translateY(-6px); /* Lifts up on hover */
        }

        /* Circular avatar with initials (e.g., "GR") */
        .team-card__avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;       /* Makes it a circle */
          background: var(--team-color); /* Uses the member's unique color */
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0 auto 20px;      /* Centered horizontally */
          font-family: "Inter", sans-serif;
        }

        /* Member name */
        .team-card__name {
          font-size: 1.2rem;
          color: var(--dark);
          margin-bottom: 4px;
        }

        /* Role (e.g., "Founder & Director") — uses the member's color */
        .team-card__role {
          color: var(--team-color);
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 8px;
        }

        /* Credentials (e.g., "BE (Hons), MSc (UK)...") — smaller, italic */
        .team-card__cred {
          font-size: 0.8rem;
          color: var(--text-light);
          margin-bottom: 12px;
          font-style: italic;
        }

        /* Expertise badge — pill-shaped gray background */
        .team-card__expertise {
          font-size: 0.9rem;
          color: var(--text-light);
          background: var(--bg-alt);
          padding: 8px 16px;
          border-radius: 50px;
          display: inline-block;
        }
      `}</style>
    </section>
  );
}
