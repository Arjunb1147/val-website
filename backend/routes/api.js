// ============================================================
// API.JS — This file contains ALL the data and API endpoints for the VAL website.
//
// HOW IT WORKS:
// The frontend (React) makes requests like "GET /api/pillars" to fetch data.
// This file defines what data gets sent back for each request.
//
// Think of each "router.get(...)" at the bottom as a menu item —
// when the frontend asks for it, we serve the corresponding data.
//
// In a real production app, this data would come from a database.
// For now, it's stored directly here as JavaScript arrays/objects.
// ============================================================

const express = require("express");

// Import the database connection pool (from db.js) so we can
// save and retrieve leads from our PostgreSQL database.
// This is used by the POST /api/leads and GET /api/leads endpoints below.
const pool = require("../db");

// A "router" is like a mini-app that handles a group of related routes.
// We define all our routes here, then plug this router into the main server.
const router = express.Router();

// ============================================================
// DATA: THE 5 LEARNING PILLARS
// Each pillar represents a major area of expertise offered by VAL.
// Every pillar has: a title, who leads it, target audience,
// available courses, how courses are delivered, and what makes them valuable.
// ============================================================
const pillars = [
  {
    id: 1,
    title: "Industrial Engineering & Valves Academy",
    lead: "G. Ravindran", // The founder who teaches this pillar
    icon: "industry", // Used by the frontend to show the right icon
    targetAudience: [
      "Mechanical Engineers",
      "Maintenance & QA professionals",
      "EPC engineers",
      "Valve manufacturers & suppliers",
      "Fresh engineers entering industry",
    ],
    courses: [
      "Fundamentals of Industrial Valves (Gate, Globe, Ball, Check, Control Valves)",
      "Valve Design, Materials & Standards (API, ASME, ISO)",
      "Valve Selection for Process Industries",
      "Valve Testing, Failure Analysis & RCA",
      "Maintenance, Troubleshooting & Leakage Prevention",
      "Welding, WPS interpretation & quality aspects",
      "Case studies from real industry failures",
    ],
    deliveryMethod: [
      "Live expert sessions",
      "Recorded modules",
      "Industry case walkthroughs",
      "Downloadable reference notes",
      "Q&A clinics",
    ],
    valueAddition: [
      "Real plant experience",
      "Practical failure cases (not textbook theory)",
      "Certification with mentor credibility",
    ],
  },
  {
    id: 2,
    title: "Architecture, Planning & Built Environment",
    lead: "K. Padma",
    icon: "building",
    targetAudience: [
      "Architecture students",
      "Young architects",
      "Homeowners & developers",
      "Hindi-speaking learners (key differentiator)",
    ],
    courses: [
      "Fundamentals of Architecture & Space Planning",
      "Residential Design & Vastu (optional)",
      "Interior Planning for Practical Living",
      "Building Codes & Approvals (India-centric)",
      "Client communication & design presentation",
      "Architecture basics for non-architects (homeowners)",
    ],
    deliveryMethod: [
      "Visual presentations",
      "Case-based learning",
      "Hindi & English bilingual sessions",
      "Design critique workshops",
    ],
    valueAddition: [
      "Practical, experience-based guidance",
      "Local relevance",
      "Language inclusivity",
    ],
  },
  {
    id: 3,
    title: "AI, ML & Data Analytics Academy",
    lead: "Arjun Balasubramanian",
    icon: "brain",
    targetAudience: [
      "Engineers transitioning to data roles",
      "Working professionals",
      "Management professionals",
      "College students",
    ],
    courses: [
      "AI & ML Fundamentals for Non-Programmers",
      "Data Analytics using Python / Tools",
      "AI applications in Engineering & Manufacturing",
      "AI for Business Decision Making",
      "Automation & Productivity using AI tools",
      "Prompt Engineering & AI tools usage",
    ],
    deliveryMethod: [
      "Hands-on demos",
      "Real-world datasets",
      "Live coding walkthroughs",
      "Mini projects",
    ],
    valueAddition: [
      "Industry-relevant applications",
      "Practical use cases",
      "Clear learning paths (Beginner → Advanced)",
    ],
  },
  {
    id: 4,
    title: "Cyber Security & Digital Safety",
    lead: "R. Suganya",
    icon: "shield",
    targetAudience: [
      "Students",
      "Working professionals",
      "Parents",
      "Small business owners",
    ],
    courses: [
      "Cyber Security Fundamentals",
      "Safe Internet & Social Media Practices",
      "Cyber Safety for Children & Families",
      "Data Privacy & Digital Hygiene",
      "Cyber Awareness for Non-IT Professionals",
    ],
    deliveryMethod: [
      "Scenario-based learning",
      "Real attack case explanations",
      "Simple, non-technical language",
      "Interactive discussions",
    ],
    valueAddition: [
      "Awareness-first approach",
      "Family-safe digital habits",
      "Practical security tips",
    ],
  },
  {
    id: 5,
    title: "Parenting, Work-Life & Personal Development",
    lead: "R. Suganya",
    icon: "heart",
    targetAudience: [
      "New parents",
      "Working mothers & fathers",
      "Young families",
    ],
    courses: [
      "Parenting in the Digital Age",
      "Balancing Career & Motherhood",
      "Child Safety Online",
      "Emotional Intelligence for Parents",
      "Early Childhood Development (Basics)",
    ],
    deliveryMethod: [
      "Live discussion sessions",
      "Experience sharing",
      "Expert talks",
      "Community building",
    ],
    valueAddition: [
      "Real parenting experiences",
      "Supportive community",
      "Holistic family development",
    ],
  },
];

// ============================================================
// DATA: TEAM MEMBERS
// Information about each founder/co-founder displayed on the Team section.
// ============================================================
const teamMembers = [
  {
    name: "G. Ravindran",
    role: "Founder & Director",
    credentials: "BE (Hons), MSc (UK), Chartered Engineer I Mech. E (UK)",
    expertise: "Industrial Engineering & Valves",
  },
  {
    name: "K. Padma",
    role: "Co-Founder",
    expertise: "Architecture, Planning & Built Environment",
  },
  {
    name: "R. Suganya",
    role: "Co-Founder",
    expertise: "Cyber Security, Parenting & Personal Development",
  },
  {
    name: "Arjun Balasubramanian",
    role: "Co-Founder",
    expertise: "AI, ML & Data Analytics",
  },
];

// ============================================================
// DATA: LEARNING FORMATS
// The different ways students can take courses on the platform.
// ============================================================
const learningFormats = [
  "Live Cohort Programs (limited seats)",
  "Self-Paced Recorded Courses",
  "Weekend Masterclasses",
  "Corporate Training Modules",
  "Consulting & Mentorship Sessions",
];

// ============================================================
// API ENDPOINTS (ROUTES)
// These are the URLs the frontend calls to get data.
// Each "router.get" defines: the URL path + what data to return.
// ============================================================

// GET /api/pillars → Returns ALL 5 learning pillars with their full details.
// Used by: The "Our Learning Pillars" section on the homepage.
router.get("/pillars", (req, res) => {
  res.json(pillars);
});

// GET /api/pillars/3 → Returns a SINGLE pillar by its ID number.
// The ":id" is a dynamic parameter — it can be 1, 2, 3, 4, or 5.
// Used for: If we ever build individual pillar detail pages.
router.get("/pillars/:id", (req, res) => {
  const pillar = pillars.find((p) => p.id === parseInt(req.params.id));
  if (!pillar) return res.status(404).json({ error: "Pillar not found" });
  res.json(pillar);
});

// GET /api/team → Returns all team members.
// Used by: The "Our Team" section on the homepage.
router.get("/team", (req, res) => {
  res.json(teamMembers);
});

// GET /api/formats → Returns the list of learning formats.
// Used by: The "Learning Formats" section on the homepage.
router.get("/formats", (req, res) => {
  res.json(learningFormats);
});

// GET /api/about → Returns company-level info: vision, mission, contact details, etc.
// Used by: The "About VAL" and "Contact" sections on the homepage.
router.get("/about", (req, res) => {
  res.json({
    name: "Value Added Learning (VAL)",
    launchDate: "18 January 2026",
    mode: "Online | Live + Recorded | Exly Platform",
    vision:
      "To become a trusted value-based learning platform that bridges the gap between academic knowledge and real-world application, enabling professionals, students, and families to build skills, careers, and confident lives.",
    mission: [
      "Deliver industry-driven, experience-based learning",
      "Empower engineering professionals, architects, tech learners, and parents",
      "Combine technical depth, digital intelligence, and life skills",
      "Offer practical, implementable, and career-oriented education",
    ],
    philosophy:
      "Learning must add real value — to career, competence, and confidence.",
    tagline: "Value Added Learning – Where Experience Meets Future Skills.",
    differentiators: [
      "Multi-generation expertise",
      "Real industry experience",
      "Family-driven trust model",
      "Practical, implementable learning",
    ],
    contact: {
      company: "Valves Mind Consulting",
      address: "B. Plot 63, 12th Street, 2nd Sector, K.K.Nagar, Chennai 600078, India",
      phone: "+91 9841083049",
      email: "valvesmind@gmail.com",
      gstin: "33AABPR5072Q1Z9",
    },
  });
});

// ============================================================
// LEAD CAPTURE ENDPOINTS (NEW — PostgreSQL-backed)
//
// These two endpoints handle the "Get in Touch" form submissions.
// Unlike the endpoints above (which return hardcoded data),
// these actually read from and write to our PostgreSQL database.
//
// THE BUSINESS FLOW:
// 1. Visitor fills out the contact form on the website
// 2. Frontend sends the form data to POST /api/leads
// 3. Backend validates the data and saves it to the "leads" table
// 4. Lead is now permanently stored — even if the server restarts
// 5. You can view all leads via GET /api/leads (or directly in the database)
// ============================================================

// ---- POST /api/leads ----
// PURPOSE: Save a new lead (form submission) into the database.
//
// WHEN IS THIS CALLED?
// Every time a visitor fills out the "Get in Touch" form and clicks
// "Send Message", the frontend sends the form data here.
//
// WHAT DOES IT EXPECT?
// A JSON body with: { name, email, interestArea, message }
// - name and email are REQUIRED (returns error 400 if missing)
// - interestArea and message are OPTIONAL
//
// WHAT DOES IT RETURN?
// Success: { success: true, lead: { id: 1, name: "...", email: "...", ... } }
// Failure: { error: "Name and email are required." } (status 400)
//          { error: "Failed to save your inquiry..." } (status 500)
//
// "async" means this function waits for the database operation to finish
// before sending a response back to the user.
router.post("/leads", async (req, res) => {
  try {
    // Extract the 4 form fields from the incoming request body.
    // This is called "destructuring" — it pulls out specific keys from an object.
    const { name, email, interestArea, message } = req.body;

    // VALIDATION: Make sure the visitor provided at least their name and email.
    // Without these, the lead isn't useful for follow-up.
    // "400" is the HTTP status code for "Bad Request" — meaning the client
    // sent incomplete data.
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    // INSERT the lead into our PostgreSQL "leads" table.
    //
    // SECURITY NOTE: We use $1, $2, $3, $4 placeholders instead of directly
    // putting user input into the SQL string. This is called a "parameterized query"
    // and it prevents "SQL injection" attacks — where a malicious user could
    // type SQL commands into the form fields to hack the database.
    //
    // "RETURNING *" tells PostgreSQL to send back the newly created row
    // (including the auto-generated id and created_at timestamp).
    const result = await pool.query(
      `INSERT INTO leads (name, email, interest_area, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, interestArea || null, message || null]
    );

    // Send a success response back to the frontend.
    // "201" is the HTTP status code for "Created" — meaning a new resource
    // was successfully created in the database.
    // The frontend uses this to show the green "Thank you!" message.
    res.status(201).json({ success: true, lead: result.rows[0] });
  } catch (err) {
    // If anything goes wrong (database down, network issue, etc.),
    // log the error for developers and send a friendly message to the user.
    // "500" = "Internal Server Error" — something broke on our end, not the user's fault.
    console.error("Error saving lead:", err.message);
    res.status(500).json({ error: "Failed to save your inquiry. Please try again." });
  }
});

// ---- GET /api/leads ----
// PURPOSE: Retrieve all leads that have been submitted.
//
// WHEN IS THIS USEFUL?
// When you (as a PM/admin) want to see all inquiries that came through
// the contact form. You can hit this in a browser:
//   http://localhost:5001/api/leads
// or use the terminal:
//   curl http://localhost:5001/api/leads
//
// WHAT DOES IT RETURN?
// An array of all leads, sorted by newest first. For example:
// [
//   { id: 3, name: "Alice", email: "alice@...", interest_area: "AI, ML...", created_at: "..." },
//   { id: 2, name: "Bob",   email: "bob@...",   interest_area: "Cyber...",  created_at: "..." },
//   { id: 1, name: "Carol", email: "carol@...", interest_area: null,        created_at: "..." }
// ]
router.get("/leads", async (req, res) => {
  try {
    // "ORDER BY created_at DESC" = newest leads first (most recent at the top)
    const result = await pool.query("SELECT * FROM leads ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching leads:", err.message);
    res.status(500).json({ error: "Failed to fetch leads." });
  }
});

// Export this router so it can be used in server.js
// (This is how server.js connects to all these routes via "app.use('/api', apiRoutes)")
module.exports = router;
