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


// Export this router so it can be used in server.js
// (This is how server.js connects to all these routes via "app.use('/api', apiRoutes)")
module.exports = router;
