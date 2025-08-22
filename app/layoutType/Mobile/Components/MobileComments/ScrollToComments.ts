"use client";
import { useEffect } from "react";

export default function ScrollToComments() {
  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("scrollToComments");
    if (shouldScroll !== "true") return;

    // Wait for DOM render
    const interval = setInterval(() => {
      const el = document.getElementById("comments");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        sessionStorage.removeItem("scrollToComments");
        clearInterval(interval);
      }
    }, 100); // Retry every 100ms

    // Clean up in case something goes wrong
    setTimeout(() => clearInterval(interval), 5000); // stop after 5s

    return () => clearInterval(interval);
  }, []);

  return null;
}
