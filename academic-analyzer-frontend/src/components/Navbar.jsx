import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-dark text-white border-b border-gray-800 shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-primary tracking-wide">📚 Academic Analyzer</div>
      <div className="space-x-6 text-sm">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <Link to="/about" className="hover:text-primary transition">About</Link>
        <Link to="/contact" className="hover:text-primary transition">Contact</Link>
        <Link to="/papers" className="hover:text-primary transition">Papers</Link>
        <Link to="/topics" className="hover:text-primary transition">Topics</Link>
        <Link to="/login" className="text-primary hover:underline">Login</Link>
        <Link to="/signup" className="bg-primary text-white px-4 py-1.5 rounded hover:bg-blue-700 transition">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
