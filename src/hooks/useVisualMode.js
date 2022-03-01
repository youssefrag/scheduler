import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace) {
    if (replace === true) {
      history.pop()
      setHistory(history)
    }
    setMode(newMode)
    history.push(newMode)
    setHistory(history)
  }

  function back() {
    if (history.length === 1) {
      return
    }
    history.pop()
    setHistory(history)
    setMode(history[history.length - 1])
    console.log('history:', history)
  }

  return { mode, transition, back };
}