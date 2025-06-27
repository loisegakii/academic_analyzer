import React from "react";
import PaperList from "../components/PaperList";

export default function Papers() {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">All Papers</h2>
      <PaperList />
    </div>
  );
}
