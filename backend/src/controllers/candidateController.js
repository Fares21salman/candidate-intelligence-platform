// src/controllers/candidateController.js
import { fetchCandidates } from "../services/candidateService.js";

export const getCandidates = async (req, res) => {
  try {
    const result = await fetchCandidates(req.query);

    res.json({
      data: result.data,
      meta: {
        nextCursor: result.nextCursor,
        hasMore: result.data.length > 0
      }
    });

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};