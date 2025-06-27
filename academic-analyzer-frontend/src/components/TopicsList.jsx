import React, { useEffect, useState } from "react";

export default function TopicsList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/topics")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data); //  LOG THIS
        if (data && Array.isArray(data.topics)) {
          setTopics(data.topics);
        } else {
          setTopics([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching topics:", err);
        setTopics([]);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-500 mb-4">Topics</h2>
      {topics.length === 0 ? (
        <p className="text-gray-400">No topics available</p>
      ) : (
        <ul className="space-y-2">
          {topics.map((topic, index) => (
            <li key={index} className="bg-blue-100 text-blue-900 px-4 py-2 rounded">
              {topic}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
