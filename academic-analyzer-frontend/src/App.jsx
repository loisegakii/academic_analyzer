import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Papers from "./pages/Papers";
import Topics from "./pages/Topics";

function App() {
  return (
    <Router>
      {/* Global navigation bar */}
      <Navbar />

      {/* Main page layout */}
      <div className="p-6">
        <Routes>
          {/* Dashboard as the landing page */}
          <Route path="/" element={<Dashboard />} />

          {/* About the app */}
          <Route path="/about" element={<About />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Search page for entering keywords */}
          <Route path="/home" element={<Home />} />

          {/* Scraped papers results page (filtered by ?keyword=...) */}
          <Route path="/papers" element={<Papers />} />

          {/* AI topic modeling analysis */}
          <Route path="/topics" element={<Topics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
