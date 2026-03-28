import { useEffect, useState, useRef, useCallback } from "react";
import { fetchCandidates } from "../api/candidateApi";

export default function useCandidates(search) {
  const [data, setData] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [cursorStack, setCursorStack] = useState([null]); // ✅ start with null
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef();

  const fetchData = useCallback(async (direction = "initial") => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      let currentCursor = null;

      // ✅ NEXT
      if (direction === "next") {
        currentCursor = cursor;

        if (cursor !== null) {
          setCursorStack(prev => [...prev, cursor]);
        }
      }

      // ✅ PREVIOUS
      if (direction === "prev") {
        if (cursorStack.length > 1) {
          const newStack = [...cursorStack];

          newStack.pop(); // remove current page
          const prevCursor = newStack[newStack.length - 1];

          setCursorStack(newStack);
          currentCursor = prevCursor;
        }
      }

      // ✅ INITIAL LOAD
      if (direction === "initial") {
        currentCursor = null;
      }

      const params = { search };
      if (currentCursor) params.cursor = currentCursor;

      const res = await fetchCandidates(params, controller.signal);

      setData(res.data);
      setCursor(res.meta.nextCursor);
      setHasMore(res.meta.hasMore);

    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [search, cursor, cursorStack]);

  // ✅ SEARCH / INITIAL LOAD
  useEffect(() => {
    const delay = setTimeout(() => {
      setCursor(null);
      setCursorStack([null]); // ✅ reset stack correctly
      fetchData("initial");
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return {
    data,
    fetchData,
    loading,
    error,
    hasMore,
    cursorStack
  };
}