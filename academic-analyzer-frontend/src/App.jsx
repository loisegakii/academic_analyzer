import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";


import Dashboard from "./pages/Dashboard";
// import Home from "./pages/Home";
import About from "./pages/About";
// import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Papers from "./pages/Papers";
import Topics from "./pages/Topics";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/about" element={<About />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/topics" element={<Topics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
