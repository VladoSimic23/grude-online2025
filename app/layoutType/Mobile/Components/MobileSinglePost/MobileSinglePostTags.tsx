import { TagsI } from "@/app/tsTypes/tsTypes";
import Link from "next/link";
import React from "react";

const MobileSinglePostTags = ({ tags }: { tags: TagsI }) => {
  const { nodes } = tags;

  if (nodes.length === 0) {
    // Handle the case where tags are not available or empty.
    return null; // or return some default content/message
  }

  return (
    <div
      style={{
        display: "flex",
        marginTop: "30px",
        flexWrap: "wrap",
      }}
    >
      {nodes
        .filter((item) => item.name.toLowerCase() !== "video")
        .map((item, index) => {
          const tagEdit = item.name.split(" ").join("-").toLowerCase();
          return (
            <div
              key={index}
              style={{
                display: "flex",
                padding: "2px 6px 4px 6px",
                margin: "0 5px 5px 5px",
                border: "1px solid white",
                background: "#2b2626",
              }}
            >
              <Link
                href={`/tag/${tagEdit}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {item.name}
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default MobileSinglePostTags;
