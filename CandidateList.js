function CandidateList({ data }) {
  if (!data.length) return <p>No candidates found</p>;

  return (
    <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Skills</th>
          <th>Experience</th>
          <th>Location</th>
        </tr>
      </thead>

      <tbody>
        {data.map((c) => (
          <tr key={c._id}>
            <td>{c.name}</td>
            <td>{c.skills.join(", ")}</td>
            <td>{c.experience} yrs</td>
            <td>{c.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CandidateList;