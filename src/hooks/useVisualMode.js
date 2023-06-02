import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  
  function transition(next, replace = false) {
    if (replace === true) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), next])
    } else {
      setHistory((prev)=> [...prev, next]);
    }
  }

  function back() {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory)
    }
  }

  return (
    {
      mode: history[history.length - 1],
      transition, 
      back
    }
  )
}

