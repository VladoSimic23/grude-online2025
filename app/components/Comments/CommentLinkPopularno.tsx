"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchClientComments } from "./fetchClientComments"; // Adjust the import path as necessary

export default function CommentLinkPopularno({
  slug,
  color,
}: {
  slug: string;
  color: string;
}) {
  const router = useRouter();
  const [length, setLenght] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchClientComments(slug);
      if (data) {
        setLenght(data?.length);
      }
    };
    fetchData();
  }, [slug]);

  const handleClick = () => {
    sessionStorage.setItem("scrollToComments", "true");
    router.push(`/${slug}`);
  };

  return (
    <span
      style={{ fontWeight: "600", fontFamily: "sans-serif" }}
      onClick={handleClick}
    >
      {length}
      <i
        style={{
          color: color,
          marginLeft: "4px",
          fontSize: "12px",
        }}
        className="bi bi-chat-left"
      ></i>
    </span>
  );
}
