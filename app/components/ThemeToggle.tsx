"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Sprječava hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "22px",
        color: "#cf7730",
        marginTop: "3px",
      }}
    >
      {theme === "dark" ? (
        <i className="bi bi-brightness-high"></i>
      ) : (
        <i className="bi bi-moon"></i>
      )}
    </button>
  );
}
