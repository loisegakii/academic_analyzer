import React, { useState } from "react";

export default function SearchBar({ onSearchComplete }) {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setMessage("🔄 Scraping papers...");

    try {
      const res = await fetch(`http://localhost:8000/scrape?keyword=${encodeURIComponent(keyword)}`);
      const data = await res.json();
      setMessage(`✅ Fetched ${data.count} papers`);
      onSearchComplete(); // Refresh paper list
    } catch (err) {
      console.error("Scrape failed:", err);
      setMessage("❌ Failed to scrape. Check backend, CORS, or internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-xl mb-2">Search Academic Papers</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Enter keyword e.g. deep learning"
          className="p-3 rounded bg-gray-800 text-white flex-1"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-bold"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      <p className="mt-3 text-blue-400">{message}</p>
    </div>
  );
}
