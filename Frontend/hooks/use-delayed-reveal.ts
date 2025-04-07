"use client"

import { useState, useEffect } from "react"

export const useDelayedReveal = (delay: number = 0) => {
  const [showLines, setShowLines] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const linesTimer = setTimeout(() => setShowLines(true), delay)
    const textTimer = setTimeout(() => setShowText(true), delay + 500)

    return () => {
      clearTimeout(linesTimer)
      clearTimeout(textTimer)
    }
  }, [delay])

  return { showLines, showText }
} 