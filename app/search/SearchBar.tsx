"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavbarSearch({
  setMenu,
}: {
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setMenu(false);
    }
  };

  return (
    <div style={{ width: "100%", padding: "1px 0 0 0" }}>
      <input
        type="text"
        placeholder="Pretražuj..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        style={{
          width: "100%",
          padding: "5px 10px",
          outline: "none",
        }}
      />
    </div>
  );
}
