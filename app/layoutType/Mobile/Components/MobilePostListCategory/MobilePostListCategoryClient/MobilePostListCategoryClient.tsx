"use client";

import React, { useState } from "react";

//import dynamic from "next/dynamic";
import {
  getPostsByCategorySmall,
  PostsByCategorySourceI,
} from "@/app/functions/queries/postsByCategorySmall";
import MobilePostListByCategoryClientDetails from "./MobilePostListCategoryClientDetails";
import "./../../HomepageComponents/Izdvojeno/css/mobileIzdvojeno.scss";
// const MobilePostListByCategoryClientDetails = dynamic(
//   () => import("./MobilePostListByCategoryClientDetails"),
//   { ssr: false }
// );

const MobilePostListByCategoryClient = ({ category }: { category: string }) => {
  const [numOfPosts, setPostNum] = useState(20);
  const [theData, setTheData] = useState<PostsByCategorySourceI>();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setPostNum(numOfPosts + 10);
    const data = await getPostsByCategorySmall(category, numOfPosts, "MEDIUM");
    setTheData(data);
    setIsLoading(false);
  };

  return (
    <div>
      {theData?.posts?.nodes?.slice(10).map((item, index) => {
        return (
          <MobilePostListByCategoryClientDetails
            key={index}
            props={item}
            index={index}
          />
        );
      })}

      <button className="mobileButton" onClick={handleClick}>
        {isLoading ? "Loading..." : "Učitaj više vijesti ..."}
      </button>
    </div>
  );
};

export default MobilePostListByCategoryClient;
