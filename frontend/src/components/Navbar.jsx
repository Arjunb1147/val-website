// ============================================================
// NAVBAR.JSX — The top navigation bar that stays fixed as you scroll.
//
// WHAT IT DOES:
// - Shows the VAL logo and brand name on the left
// - Shows navigation links (About, Programs, Formats, Team, Contact) on the right
// - When you scroll down, the navbar gets a solid background (transparency effect)
// - On mobile phones, the links collapse into a "hamburger menu" (three lines icon)
//
// KEY BEHAVIORS:
// - "scrolled" state: Tracks whether the user has scrolled down more than 50px.
//   If yes, the navbar gets a dark blue background. If no, it's transparent.
// - "menuOpen" state: Controls whether the mobile side menu is visible or hidden.
// ============================================================

import { useState, useEffect } from "react";

// The list of navigation links shown in the navbar.
// "label" = the text displayed, "href" = which section to scroll to when clicked.
// The "#" means it scrolls to an element with that ID on the same page.
const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#pillars" },
  { label: "Formats", href: "#formats" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  // "scrolled" becomes true when user scrolls down 50+ pixels (triggers blue background)
  const [scrolled, setScrolled] = useState(false);
  // "menuOpen" becomes true when the hamburger icon is tapped on mobile (opens side menu)
  const [menuOpen, setMenuOpen] = useState(false);

  // This runs once when the component loads.
  // It listens for scroll events and updates "scrolled" accordingly.
  // The "return" cleanup function removes the listener when the component is removed.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // When scrolled, add the "navbar--scrolled" class which gives it a solid background
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">

        {/* ---- NAVIGATION LINKS ---- */}
        {/* On mobile: when menuOpen is true, the "navbar__links--open" class slides the menu in */}
        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              {/* When a link is clicked, close the mobile menu (if open) */}
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ---- HAMBURGER ICON (only visible on mobile screens) ---- */}
        {/* This is the three-lines icon that opens/closes the mobile menu */}
        <button
          className="navbar__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {/* When menu is open, the three lines animate into an "X" shape */}
          <span className={`hamburger ${menuOpen ? "hamburger--open" : ""}`} />
        </button>
      </div>

      {/* ---- STYLES FOR THIS COMPONENT ---- */}
      {/* These styles are scoped to the Navbar. The <style> tag is a React pattern
          for keeping styles close to the component they belong to. */}
      <style>{`
        /* The navbar is "fixed" — it stays at the top even when you scroll */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;        /* Ensures navbar sits on top of all other content */
          padding: 16px 0;
          transition: all 0.3s ease; /* Smooth transition when background appears */
        }

        /* When user scrolls down: add a semi-transparent dark blue background */
        .navbar--scrolled {
          background: rgba(26, 60, 110, 0.95);
          backdrop-filter: blur(10px);  /* Adds a frosted glass effect */
          padding: 10px 0;              /* Slightly smaller padding when scrolled */
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }

        /* Layout: logo pushed to far left, links pushed to far right.
           We override the container's default max-width so the navbar
           stretches across the full screen width with generous padding. */
        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 100%;
          padding: 0 48px;
        }

        /* Navigation links: horizontal row with spacing */
        .navbar__links {
          display: flex;
          list-style: none;
          gap: 32px;
        }
        .navbar__links a {
          color: rgba(255,255,255,0.85);
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        .navbar__links a:hover {
          color: var(--secondary);  /* Gold color on hover */
        }

        /* Hamburger button: hidden on desktop, shown on mobile */
        .navbar__toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        /* Hamburger icon: three horizontal white lines */
        .hamburger,
        .hamburger::before,
        .hamburger::after {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s;
          position: relative;
        }
        .hamburger::before,
        .hamburger::after {
          content: "";
          position: absolute;
          left: 0;
          width: 24px;
        }
        .hamburger::before { top: -7px; }  /* Top line */
        .hamburger::after { top: 7px; }    /* Bottom line */

        /* When menu is open: middle line disappears, top/bottom rotate into an "X" */
        .hamburger--open { background: transparent; }
        .hamburger--open::before { top: 0; transform: rotate(45deg); }
        .hamburger--open::after { top: 0; transform: rotate(-45deg); }

        /* ---- MOBILE LAYOUT (screens smaller than 768px) ---- */
        @media (max-width: 768px) {
          .navbar__toggle { display: block; }  /* Show hamburger icon */

          /* Links become a full-height side panel that slides in from the right */
          .navbar__links {
            position: fixed;
            top: 0;
            right: -100%;          /* Hidden off-screen by default */
            width: 260px;
            height: 100vh;
            background: var(--primary);
            flex-direction: column; /* Stack links vertically */
            padding: 80px 32px 32px;
            gap: 24px;
            transition: right 0.3s ease; /* Smooth slide animation */
          }
          .navbar__links--open { right: 0; } /* Slide into view when open */
          .navbar__links a { font-size: 1.1rem; }
        }
      `}</style>
    </nav>
  );
}
