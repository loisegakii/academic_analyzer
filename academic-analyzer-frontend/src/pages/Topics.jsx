import React from "react";
import TopicsList from "../components/TopicsList";

export default function Topics() {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">Topic Analysis</h2>
      <TopicsList />
    </div>
  );
}
