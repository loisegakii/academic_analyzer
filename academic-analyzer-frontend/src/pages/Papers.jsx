import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Papers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📌 Get keyword from URL (e.g., /papers?keyword=AI)
  const query = new URLSearchParams(useLocation().search);
  const keyword = query.get("keyword");

  useEffect(() => {
    const fetchPapers = async () => {
      setLoading(true);
      setError(null);

      try {
        // 🧠 Call FastAPI backend with keyword filter
        const response = await fetch(
          `http://localhost:8000/papers?keyword=${encodeURIComponent(keyword)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch papers");
        }

        const data = await response.json();
        setPapers(data.papers || []);
      } catch (err) {
        setError("Unable to load papers. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchPapers();
    } else {
      setError("No keyword provided in URL.");
      setLoading(false);
    }
  }, [keyword]);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* 🧭 Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-500 mb-2">📚 Search Results</h1>
          <p className="text-gray-400">Results for keyword: <span className="text-white font-semibold">{keyword}</span></p>
        </div>

        {/* 🔄 Loading & Errors */}
        {loading && (
          <p className="text-center text-blue-400 text-lg">Loading papers...</p>
        )}

        {error && (
          <p className="text-center text-red-400 text-lg">{error}</p>
        )}

        {/* 🗂️ Papers Grid */}
        {!loading && !error && papers.length === 0 ? (
          <p className="text-center text-gray-400">No papers found for this keyword.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {papers.map((paper, index) => (
              <div
                key={index}
                className="bg-gray-900 p-5 rounded-2xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all"
              >
                <h2 className="text-xl font-semibold text-blue-400 mb-2">
                  {paper.title}
                </h2>
                <p className="text-sm text-gray-400 mb-1">
                  <span className="font-medium text-white">Authors:</span>{" "}
                  {paper.authors || "N/A"}
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  <span className="font-medium text-white">Year:</span>{" "}
                  {paper.year || "Unknown"}
                </p>
                <p className="text-sm text-gray-300 mb-4">
                  {paper.abstract || "No abstract available."}
                </p>
                {paper.link && (
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                  >
                    🔗 View Paper
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 🔙 Back to Search */}
        <div className="mt-10 text-center">
          <Link
            to="/home"
            className="inline-block bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition-all"
          >
            🔍 Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
}
