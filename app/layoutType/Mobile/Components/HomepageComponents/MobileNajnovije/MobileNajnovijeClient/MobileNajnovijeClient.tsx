"use client";

import React, { useState } from "react";
import "./../../Izdvojeno/css/mobileIzdvojeno.scss";
import dynamic from "next/dynamic";
import {
  getRecentPostsHomepage,
  RecentPostsSourceI,
} from "@/app/functions/queries/recentPosts";
const MobileHomepageClientDetails = dynamic(
  () => import("./MobileNajnovijeClientDetails")
);

const MobileNajnovijeClient = () => {
  const [numOfPosts, setPostNum] = useState(20);
  const [theData, setTheData] = useState<RecentPostsSourceI>();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setPostNum(numOfPosts + 10);
    const data = await getRecentPostsHomepage(numOfPosts);
    setTheData(data);
    setIsLoading(false);
  };
  return (
    <div>
      <div className="container px-3">
        {theData?.posts?.nodes?.slice(10).map((item, index) => {
          return (
            <MobileHomepageClientDetails
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
    </div>
  );
};

export default MobileNajnovijeClient;
