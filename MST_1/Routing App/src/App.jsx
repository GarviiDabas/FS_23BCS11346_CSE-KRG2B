import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="card">
      <h1>Home Page</h1>
      <p>Welcome to the Home page! Explore the navigation links above.</p>
    </div>
  );
}

function About() {
  return (
    <div className="card">
      <h1>About Page</h1>
      <p>This is the About page. Here you can learn more about us.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="card">
      <h1>Contact Page</h1>
      <p>Reach us through the Contact page. We’d love to hear from you!</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h2 className="logo">My Routing App</h2>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
