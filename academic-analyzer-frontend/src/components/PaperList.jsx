import React, { useEffect, useState } from "react";

export default function PaperList({ refresh }) {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/papers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.papers)) {
          setPapers(data.papers);
        } else {
          setPapers([]); // fallback if something goes wrong
        }
      })
      .catch((err) => {
        console.error("Error loading papers:", err);
        setPapers([]);
      });
  }, [refresh]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-blue-400">Scraped Papers</h2>
      {papers.length === 0 ? (
        <p className="text-gray-400">No papers available.</p>
      ) : (
        <ul className="space-y-4">
          {papers.map((paper, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded shadow">
              <h3 className="text-white font-bold">{paper.title}</h3>
              <p className="text-sm text-blue-300">{paper.authors}</p>
              <p className="text-gray-300 mt-1">{paper.abstract}</p>
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 inline-block"
              >
                View Paper
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
