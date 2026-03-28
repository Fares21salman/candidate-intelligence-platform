import { useState } from "react";
import useCandidates from "./hooks/useCandidates";
import CandidateList from "./components/CandidateList";

function App() {
  const [search, setSearch] = useState("");

  const {
    data,
    fetchData,
    loading,
    error,
    hasMore,
    cursorStack
  } = useCandidates(search);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Candidate Search</h2>

      <input
        placeholder="Search candidates..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "300px",
          marginBottom: "20px"
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <CandidateList data={data} />

      {loading && <p>Loading...</p>}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => fetchData("prev")}
          disabled={cursorStack.length <= 1 || loading}
        >
          Previous
        </button>

        <button
          onClick={() => fetchData("next")}
          disabled={!hasMore || loading}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;