import { Metadata } from "next";
import React from "react";
//import style from "../../css/style.module.css";
import Image from "next/image";
import Link from "next/link";
import defaultImage from "../../../public/noImage.jpg";
import { formatDateToCroatian } from "@/app/functions/formatDateToCroatian";
import LoadMoreTags from "./LoadMoreTags";
import { getAllPostsByTags } from "@/app/functions/queries/tags";
import "./../../css/framework.scss";

export const metadata: Metadata = {
  title: "Tags",
  description: "Tags - Grude Online",
};

const TagDetails = async ({ tag }: { tag: string }) => {
  const tagData = await getAllPostsByTags(tag);
  const {
    posts: { nodes },
  } = tagData;

  return (
    <div>
      <h1>Rezultati za: {tag}</h1>
      <ul style={{ listStyle: "none", padding: "0", marginTop: "60px" }}>
        {nodes.map((result, index) => {
          const { title, featuredImage, date } = result;
          return (
            <Link
              key={index}
              href={`/${result?.slug}`}
              style={{ textDecoration: "none" }}
            >
              <li style={{ marginBottom: "30px" }}>
                <div>
                  <Image
                    className="imageCover"
                    src={
                      featuredImage?.node?.sourceUrl
                        ? featuredImage?.node?.sourceUrl
                        : defaultImage
                    }
                    alt={`Ilustracija članka: ${title}`}
                    width={200}
                    height={180}
                  />
                </div>
                <div>
                  <h1 style={{ fontSize: "24px", lineHeight: "1.2" }}>
                    {title}
                  </h1>
                  <p style={{ fontSize: "14px" }}>
                    {formatDateToCroatian(date)}
                  </p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <LoadMoreTags tag={tag} />
    </div>
  );
};

export default TagDetails;
