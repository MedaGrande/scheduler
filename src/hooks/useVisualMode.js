import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  let mode;

  function transition(next) {
    // if (replace === true) {
    //   mode = initial;
    // }
    setHistory([...history, next]);
  }

  function back() {
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory)
  }
  if (history.length >= 1) {
    mode = history.slice(-1)[0];
  } else {
    mode = initial;
  }
  

  return (
    {
      mode,
      transition, 
      back
    }
  )
}

