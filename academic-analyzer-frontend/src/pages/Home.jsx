import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const [keywords, setKeywords] = useState("");       // 🔤 User's input
  const [isLoading, setIsLoading] = useState(false);  // ⏳ Loading state
  const [error, setError] = useState(null);           // ❌ Error message

  const navigate = useNavigate(); // ⛳ Used to redirect to /papers?keyword=...

  // 🔍 Handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!keywords.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // 🌐 Call backend API to scrape papers
      const response = await fetch(`http://localhost:8000/scrape/?keyword=${encodeURIComponent(keywords)}`);
      if (!response.ok) throw new Error("Failed to fetch papers");

      // ✅ If successful, navigate to Papers with the keyword in URL
      navigate(`/papers?keyword=${encodeURIComponent(keywords)}`);
    } catch (err) {
      setError("Failed to fetch papers. Please try again.");
      console.error("Error during search:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* 🔷 Centered main search content */}
      <main className="flex-grow flex items-center justify-center">
        <motion.div
          className="text-center max-w-2xl p-6 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 🧠 App Title */}
          <h1 className="text-5xl font-extrabold text-blue-500 mb-4 tracking-tight">
            Academic Analyzer
          </h1>

          {/* 📖 Subtitle */}
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Your gateway to smart research discovery. Analyze academic trends using AI-powered topic modeling.
          </p>

          {/* 🔍 Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter keywords (e.g., machine learning, climate change)"
                className="flex-grow max-w-xl px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? "Searching..." : "🔍 Search Papers"}
              </button>
            </div>

            {/* ⚠️ Error Message */}
            {error && <p className="mt-2 text-red-400">{error}</p>}
          </form>

          {/* 📁 Other Navigation Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/papers"
              className="inline-block bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300"
            >
              📚 Browse Papers
            </Link>
            <Link
              to="/topics"
              className="inline-block bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300"
            >
              📊 View Analysis
            </Link>
          </div>
        </motion.div>
      </main>

      {/* 🔻 Footer */}
      <footer className="bg-black text-gray-600 text-sm text-center py-4 border-t border-gray-800">
        © {new Date().getFullYear()} Academic Analyzer. Built with 💙 by Loise the Dev.
      </footer>
    </div>
  );
}
