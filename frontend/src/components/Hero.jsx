// ============================================================
// HERO.JSX — The big, full-screen banner section at the top of the page.
//
// This is the first thing visitors see. It shows:
// - The VAL brand name and tagline
// - A short description of what VAL does
// - Two call-to-action buttons ("Explore Programs" and "Get in Touch")
// - Three key stats (5 Pillars, 30+ Courses, 4 Founders)
//
// The background is the HomeBanner.jpeg image with a dark blue overlay
// on top so the white text is readable.
//
// This component has NO data from the backend — all content is static/hardcoded.
// ============================================================

export default function Hero() {
  return (
    <section className="hero">
      {/* Dark gradient overlay on top of the background image so text is readable */}
      <div className="hero__overlay" />

      <div className="container hero__content">
        {/* Small badge showing the launch date */}
        <p className="hero__badge">Launched 18 January 2026</p>

        {/* Main headline — "Learning" is highlighted in gold */}
        <h1 className="hero__title">
          Value Added <span>Learning</span>
        </h1>

        {/* Tagline in italics */}
        <p className="hero__tagline">
          Where Experience Meets Future Skills
        </p>

        {/* Brief description of the platform */}
        <p className="hero__desc">
          A trusted value-based learning platform bridging the gap between
          academic knowledge and real-world application. Empowering
          professionals, students, and families.
        </p>

        {/* Two action buttons — they scroll to sections below */}
        <div className="hero__actions">
          <a href="#pillars" className="btn btn-primary">
            Explore Programs
          </a>
          <a href="#contact" className="btn btn-outline">
            Get in Touch
          </a>
        </div>

        {/* Quick stats bar at the bottom of the hero */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">5</span>
            <span className="hero__stat-label">Learning Pillars</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">30+</span>
            <span className="hero__stat-label">Courses Planned</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">4</span>
            <span className="hero__stat-label">Expert Founders</span>
          </div>
        </div>
      </div>

      {/* ---- STYLES FOR THIS COMPONENT ---- */}
      <style>{`
        /* Full-screen hero with the HomeBanner image as background */
        .hero {
          position: relative;
          min-height: 100vh;      /* Takes up the full height of the screen */
          display: flex;
          align-items: center;    /* Vertically centers the content */
          background: url("/images/HomeBanner.jpeg") center/cover no-repeat;
          color: #fff;
        }

        /* Semi-transparent dark overlay on top of the background image.
           This makes the white text readable against any background image. */
        .hero__overlay {
          position: absolute;
          inset: 0;               /* Covers the entire hero section */
          background: linear-gradient(
            135deg,
            rgba(26, 60, 110, 0.92) 0%,   /* Dark blue, 92% opacity */
            rgba(26, 26, 46, 0.88) 100%    /* Dark navy, 88% opacity */
          );
        }

        /* Content sits above the overlay (z-index: 1 puts it on top) */
        .hero__content {
          position: relative;
          z-index: 1;
          padding: 120px 0 80px;  /* Extra top padding so content doesn't hide behind navbar */
          max-width: 800px;
        }

        /* The "Launched 18 January 2026" badge — pill-shaped with gold border */
        .hero__badge {
          display: inline-block;
          background: rgba(232, 168, 56, 0.2);
          border: 1px solid rgba(232, 168, 56, 0.4);
          color: var(--secondary);
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 24px;
          letter-spacing: 0.5px;
        }

        /* Main title: "Value Added Learning" — very large, bold */
        .hero__title {
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.1;
        }
        /* The word "Learning" is highlighted in gold */
        .hero__title span {
          color: var(--secondary);
        }

        /* Italic tagline below the title */
        .hero__tagline {
          font-size: 1.4rem;
          font-weight: 300;
          color: rgba(255,255,255,0.85);
          margin-bottom: 20px;
          font-style: italic;
        }

        /* Description paragraph */
        .hero__desc {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.75);
          margin-bottom: 36px;
          line-height: 1.7;
          max-width: 600px;
        }

        /* Row of two buttons side by side */
        .hero__actions {
          display: flex;
          gap: 16px;
          margin-bottom: 60px;
          flex-wrap: wrap;   /* On small screens, buttons stack vertically */
        }

        /* Stats bar: separated from buttons by a thin white line */
        .hero__stats {
          display: flex;
          gap: 48px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.15);
        }
        .hero__stat {
          display: flex;
          flex-direction: column;
        }
        /* Big gold numbers (5, 30+, 4) */
        .hero__stat-num {
          font-family: "Playfair Display", serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--secondary);
        }
        /* Small labels below the numbers */
        .hero__stat-label {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
          margin-top: 4px;
        }

        /* ---- MOBILE: Smaller text and tighter spacing ---- */
        @media (max-width: 768px) {
          .hero__title { font-size: 2.5rem; }
          .hero__tagline { font-size: 1.1rem; }
          .hero__stats { gap: 24px; }
          .hero__stat-num { font-size: 1.6rem; }
          .hero__content { padding: 100px 0 60px; }
        }
      `}</style>
    </section>
  );
}
