"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "../../../public/noImage.jpg";
import { formatDateToCroatian } from "@/app/functions/formatDateToCroatian";
import {
  getAllPostsByTagsClient,
  TagsSourceI,
} from "@/app/functions/queries/tags";
import "./../../css/framework.scss";
import "./../../layoutType/Mobile/Components/HomepageComponents/Izdvojeno/css/mobileIzdvojeno.scss";

const LoadMoreTags = ({ tag }: { tag: string }) => {
  const [tags, setTags] = useState<TagsSourceI>();
  const [count, setCount] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);
    setCount(count + 10);
    const data = await getAllPostsByTagsClient(count, tag);
    setTags(data);
    setIsLoading(false);
  };

  return (
    <div>
      <ul style={{ listStyle: "none" }}>
        {tags?.posts?.nodes?.slice(10)?.map((result, idx: number) => {
          const { slug, title, date, featuredImage } = result;
          return (
            <Link
              key={idx}
              href={`/${slug}`}
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
                    alt={title}
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
      <div>
        <button className="mobileButton" onClick={loadMore}>
          {isLoading ? "Loading..." : "Učitaj više vijesti ..."}
        </button>
      </div>
    </div>
  );
};

export default LoadMoreTags;
