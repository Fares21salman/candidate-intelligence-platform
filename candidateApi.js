export const fetchCandidates = async (params, signal) => {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(
    `http://localhost:5000/api/candidates?${query}`,
    { signal }
  );

  if (!res.ok) {
    throw new Error("API failed");
  }

  return res.json();
};