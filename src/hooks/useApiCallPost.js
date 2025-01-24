import { useState } from "react";

const useApiCall = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeApiCall = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error(err);
      throw err; // Rethrow for additional error handling
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, makeApiCall };
};

export default useApiCall;
