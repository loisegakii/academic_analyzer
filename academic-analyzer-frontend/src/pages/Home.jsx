import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import PaperList from "../components/PaperList";
import TopicsList from "../components/TopicsList";

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  return (
    <div>
      <SearchBar onSearchComplete={() => setRefresh(!refresh)} />
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <PaperList refresh={refresh} />
        <TopicsList refresh={refresh} />
      </div>
    </div>
  );
}
