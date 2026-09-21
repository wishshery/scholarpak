"use client";
import { createContext, useContext, useEffect, useState } from "react";
const Context = createContext({ saved: [], toggle: () => {}, ready: false });
export const useShortlist = () => useContext(Context);
const KEY = "scholarpak-shortlist-v1";
export default function ShortlistProvider({ children }) {
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    function read() {
      try {
        const value = JSON.parse(localStorage.getItem(KEY) || "[]");
        setSaved(
          Array.isArray(value)
            ? value.filter((x) => typeof x === "string")
            : [],
        );
      } catch {
        setSaved([]);
      }
    }
    read();
    setReady(true);
    const sync = (e) => {
      if (e.key === KEY || e.key === null) read();
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function toggle(id) {
    const next = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    setSaved(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      setError("");
    } catch {
      setError(
        "Saved for this visit only. Your browser has disabled local storage.",
      );
    }
  }
  return (
    <Context.Provider value={{ saved, toggle, ready }}>
      {children}
      {error && (
        <p className="storage-notice" role="status">
          {error}
        </p>
      )}
    </Context.Provider>
  );
}
