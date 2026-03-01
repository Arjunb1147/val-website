// ============================================================
// CONTACT.JSX — The "Get in Touch" section.
//
// This section has two columns:
//
// LEFT COLUMN:
//   1. Contact Info Card (dark blue background) — Company name, address, phone, email
//   2. Course Pricing Card — Price range and monetization options
//
// RIGHT COLUMN:
//   An inquiry form where visitors can submit their name, email,
//   interest area (dropdown), and a message.
//
// FORM SUBMISSION FLOW (Serverless — Google Sheets):
// 1. Visitor types their name, email, selects an interest area, writes a message
// 2. React "watches" every keystroke and stores the current value in state
// 3. When they click "Send Message", we package the data as JSON
// 4. We send it directly to a Google Apps Script Web App URL
// 5. The Apps Script appends a new row to a Google Sheet
// 6. On success: form clears and shows a green "Thank you!" banner
//    On failure: shows a red "Something went wrong" banner
//
// No backend or database needed — leads go straight into a Google Sheet
// that the admin can view, filter, and manage from any device.
//
// DATA SOURCE: Receives "about" prop from App.jsx.
// Extracts "about.contact" which has: company, address, phone, email, gstin.
// ============================================================

// "useState" is a React feature that lets a component "remember" things.
// Without it, every keystroke would be forgotten instantly.
// Here we use it to track:
//   - What the user has typed in each form field (name, email, etc.)
//   - Whether the form is currently sending, sent successfully, or errored
import { useState } from "react";

// ============================================================
// GOOGLE SHEETS SETUP:
// Replace the URL below with your deployed Google Apps Script Web App URL.
// See the setup instructions provided separately for how to create this.
// ============================================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzSKFNMdqPoMXB2h4YuWSLMM-xFaaFuhrFUnnJx1Wf5ME-Od5O_NWFBjKv4QHi_XunIhA/exec"


export default function Contact({ about }) {
  // Safely extract contact info. The "?." is "optional chaining" —
  // it prevents errors if "about" is null (data hasn't loaded yet).
  const contact = about?.contact;

  // ---- FORM STATE ----
  // Each "useState" creates a piece of memory for one form field.
  // The pattern is: [currentValue, functionToUpdateIt] = useState(startingValue)
  //
  // For example, "name" starts as "" (empty string).
  // When the visitor types "John", setName("John") is called,
  // and "name" becomes "John". React then re-renders the input to show "John".
  const [name, setName] = useState("");         // "Your Name" field
  const [email, setEmail] = useState("");       // "Your Email" field
  const [interestArea, setInterestArea] = useState("");  // Dropdown selection
  const [message, setMessage] = useState("");   // "Your Message" textarea

  // Tracks the form's current submission status — like a traffic light:
  //   "idle"    = Form is ready to be filled out (default state)
  //   "sending" = Form was submitted, waiting for the server to respond
  //              (the button shows "Sending..." and is disabled)
  //   "sent"    = Server saved the lead successfully
  //              (green success banner appears, form clears)
  //   "error"   = Something went wrong (network issue, server down, etc.)
  //              (red error banner appears)
  const [status, setStatus] = useState("idle");

  // ---- FORM SUBMISSION HANDLER ----
  // This function runs when the visitor clicks "Send Message".
  // It collects all the form data and sends it to a Google Apps Script,
  // which appends it as a new row in a Google Sheet.
  //
  // We use "mode: no-cors" because Google Apps Script redirects the response,
  // which means we can't read the response status. Instead, if the fetch
  // completes without a network error, we assume the data was saved successfully.
  // The admin can verify by checking the Google Sheet directly.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ name, email, interestArea, message }),
      });

      // If we get here without an error, the data was sent to Google Sheets.
      // Clear all form fields so the visitor can submit another inquiry if needed.
      setName("");
      setEmail("");
      setInterestArea("");
      setMessage("");
      setStatus("sent");
    } catch {
      // A network error occurred (e.g., user is offline, script URL is wrong).
      setStatus("error");
    }
  };

  // Don't render until data loads
  if (!contact) return null;

  return (
    // id="contact" allows the navbar "Contact" link to scroll here
    <section id="contact" className="section" style={{ background: "var(--bg-alt)" }}>
      <div className="container">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">
          Ready to start your learning journey? Reach out to us.
        </p>

        {/* Two-column layout: Contact Info (left) | Form (right) */}
        <div className="contact-grid">

          {/* ---- LEFT COLUMN: Contact Info + Pricing ---- */}
          <div className="contact-info">
            {/* Dark blue card with company details */}
            <div className="contact-info__card">
              <h3>{contact.company}</h3>

              {/* Address with pin icon */}
              <div className="contact-item">
                <span className="contact-item__icon">&#128205;</span>
                <p>{contact.address}</p>
              </div>

              {/* Phone number — clickable on mobile (tel: link opens phone dialer) */}
              <div className="contact-item">
                <span className="contact-item__icon">&#128222;</span>
                <p>
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </p>
              </div>

              {/* Email — clickable (mailto: link opens email client) */}
              <div className="contact-item">
                <span className="contact-item__icon">&#9993;</span>
                <p>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              </div>
            </div>

            {/* Pricing information card */}
            <div className="contact-pricing">
              <h4>Course Pricing</h4>
              <p>Paid courses ranging from <strong>&#8377;999 – &#8377;25,000</strong></p>
              <ul>
                <li>Bundled learning paths</li>
                <li>Corporate training contracts</li>
                <li>One-to-one consulting</li>
                <li>Subscription-based access (Coming Soon)</li>
              </ul>
            </div>
          </div>

          {/* ---- RIGHT COLUMN: Inquiry Form ---- */}
          <div className="contact-form__wrapper">
            {/* The form sends data directly to a Google Sheet via Apps Script.
                No backend or database needed — fully serverless. */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send us a Message</h3>

              {/* Success message — shown after the form is submitted successfully */}
              {status === "sent" && (
                <div className="form-success">
                  Thank you! Your message has been received. We'll get back to you soon.
                </div>
              )}

              {/* Error message — shown if something went wrong */}
              {status === "error" && (
                <div className="form-error">
                  Something went wrong. Please try again.
                </div>
              )}

              {/* Name input — "value" and "onChange" make this a "controlled" input,
                  meaning React tracks its value in state at all times. */}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email input */}
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Interest area dropdown — matches the 5 pillars + Corporate Training */}
              <div className="form-group">
                <select
                  value={interestArea}
                  onChange={(e) => setInterestArea(e.target.value)}
                >
                  <option value="" disabled>Select Interest Area</option>
                  <option>Industrial Engineering & Valves</option>
                  <option>Architecture & Planning</option>
                  <option>AI, ML & Data Analytics</option>
                  <option>Cyber Security & Digital Safety</option>
                  <option>Parenting & Personal Development</option>
                  <option>Corporate Training</option>
                </select>
              </div>

              {/* Message textarea */}
              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              {/* Submit button — shows different text based on submission status.
                  Disabled while sending to prevent double-clicks. */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ---- STYLES FOR THIS COMPONENT ---- */}
      <style>{`
        /* Two equal columns: info on left, form on right */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;  /* Cards align to top, not stretch to equal height */
        }

        /* Dark blue contact details card */
        .contact-info__card {
          background: var(--primary);
          color: #fff;
          padding: 36px;
          border-radius: var(--radius);
          margin-bottom: 24px;
        }
        .contact-info__card h3 {
          font-size: 1.3rem;
          margin-bottom: 24px;
        }

        /* Each contact item: icon + text side by side */
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }
        .contact-item__icon {
          font-size: 1.2rem;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .contact-item p { color: rgba(255,255,255,0.85); }

        /* Clickable links (phone, email) shown in gold */
        .contact-item a {
          color: var(--secondary);
          font-weight: 500;
        }
        .contact-item a:hover { text-decoration: underline; }

        /* Pricing card */
        .contact-pricing {
          background: #fff;
          padding: 28px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
        }
        .contact-pricing h4 {
          font-size: 1.1rem;
          color: var(--primary);
          margin-bottom: 12px;
        }
        .contact-pricing p {
          color: var(--text-light);
          margin-bottom: 12px;
        }
        .contact-pricing ul {
          list-style: none;
          padding: 0;
        }
        .contact-pricing li {
          padding: 4px 0 4px 20px;
          position: relative;
          color: var(--text-light);
          font-size: 0.95rem;
        }
        /* Green checkmark bullet */
        .contact-pricing li::before {
          content: "\\2713";
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: bold;
        }

        /* Form wrapper card */
        .contact-form__wrapper {
          background: #fff;
          padding: 36px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
        }
        .contact-form h3 {
          font-size: 1.3rem;
          color: var(--primary);
          margin-bottom: 24px;
        }

        /* Form fields: consistent styling for inputs, selects, and textareas */
        .form-group {
          margin-bottom: 16px;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 1rem;
          font-family: "Inter", sans-serif;
          transition: border-color 0.2s;
          background: var(--bg-light);
        }
        /* When a field is focused (clicked into), the border turns blue */
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary);
        }
        .form-group textarea { resize: vertical; } /* User can resize vertically only */

        /* Success message — green background with checkmark feel */
        .form-success {
          background: #d4edda;
          color: #155724;
          padding: 14px 18px;
          border-radius: var(--radius-sm);
          margin-bottom: 16px;
          font-size: 0.95rem;
        }

        /* Error message — red background */
        .form-error {
          background: #f8d7da;
          color: #721c24;
          padding: 14px 18px;
          border-radius: var(--radius-sm);
          margin-bottom: 16px;
          font-size: 0.95rem;
        }

        /* On mobile: stack form below contact info */
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
