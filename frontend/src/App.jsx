// ============================================================
// APP.JSX — The main application component.
//
// This is the "table of contents" for the entire website.
// It does two things:
//   1. FETCHES DATA from the backend API when the page first loads
//   2. ASSEMBLES THE PAGE by placing each section in order
//      (Navbar -> Hero -> About -> Pillars -> Formats -> Team -> Contact -> Footer)
//
// Each section is a separate component (file) for better organization.
// Data flows from this file DOWN into each component as "props" (inputs).
// ============================================================

// "useState" lets us store data (like pillars, team info) that can change.
// "useEffect" lets us run code when the page first loads (like fetching data).
import { useState, useEffect } from "react";

// Import each section of the website as a separate component.
// Each file in /components/ handles one visual section of the page.
import Navbar from "./components/Navbar"; // Top navigation bar
import Hero from "./components/Hero"; // Big banner at the top with title & stats
import About from "./components/About"; // Vision, Mission, Differentiators
import Pillars from "./components/Pillars"; // The 5 learning pillars (expandable)
import Formats from "./components/Formats"; // Learning formats + certifications
import Team from "./components/Team"; // Founder team cards
import Contact from "./components/Contact"; // Contact info + inquiry form
import Footer from "./components/Footer"; // Bottom of the page with links

function App() {
  // This is our "data storage". It starts empty and gets filled
  // once the backend responds. The website shows a blank state until data arrives.
  const [data, setData] = useState({
    pillars: [], // Will hold the 5 learning pillars
    team: [], // Will hold team member info
    formats: [], // Will hold learning format options
    about: null, // Will hold company info (vision, mission, contact)
  });

  // useEffect with [] runs ONCE when the page first loads.
  // It fetches all the data we need from our backend API in parallel
  // (all 4 requests go out at the same time for speed).
  useEffect(() => {
    Promise.all([
      fetch("/api/pillars").then((r) => r.json()), // Get all 5 pillars
      fetch("/api/team").then((r) => r.json()), // Get team members
      fetch("/api/formats").then((r) => r.json()), // Get learning formats
      fetch("/api/about").then((r) => r.json()), // Get company info
    ]).then(([pillars, team, formats, about]) => {
      // Once ALL 4 requests complete, store the data.
      // This triggers a re-render — the page updates with real content.
      setData({ pillars, team, formats, about });
    });
  }, []);

  // The page layout — each component renders one section of the website.
  // Data is passed as "props" (the part inside curly braces like {data.pillars}).
  // Components that don't need backend data (Navbar, Hero, Footer) get no props.
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About about={data.about} />
      <Pillars pillars={data.pillars} />
      <Formats formats={data.formats} />
      <Team team={data.team} />
      <Contact about={data.about} />
      <Footer />
    </div>
  );
}

export default App;
