import React from "react";
import Image from "next/image";
import defaultImage from "../../../../public/noImage.jpg";
import Link from "next/link";
import { formatDateToCroatian } from "@/app/functions/formatDateToCroatian";
import { cheerioCheck } from "@/app/functions/cheerioCheck/cheerioCheck";
import { getPostsByCategorySmall } from "@/app/functions/queries/postsByCategorySmall";
import "./../css/desktop.scss";
import "./../../../css/framework.scss";

const OstaleNaslovne = async () => {
  const data = await getPostsByCategorySmall("izdvojeno", 3, "LARGE");
  const {
    posts: { nodes },
  } = data;

  // const isVideo = true;
  // const isImage = true;

  return (
    <div style={{ marginTop: "-3px" }}>
      {nodes.map((item, index) => {
        const {
          title,
          featuredImage,
          slug,
          date,
          content,
          tags,
          comments: { nodes },
        } = item;
        const { hasImages, hasVideo } = cheerioCheck(content, tags);
        if (index !== 0) {
          return (
            <div
              key={index}
              className={`ostaleNaslovneChild`}
              style={{ marginBottom: "30px" }}
            >
              <Link href={`/${slug}`}>
                <div className="grid" style={{ marginTop: "3px" }}>
                  {/* <div className={desktopStyle.desktopOverlay}></div> */}
                  <div className="col-12">
                    <div style={{ position: "relative" }}>
                      {hasImages && (
                        <div
                          style={{ fontSize: "20px" }}
                          className={`desktopImage`}
                        >
                          <i className="bi bi-camera"></i>
                        </div>
                      )}
                      {hasVideo && (
                        <div
                          className={`desktopVideo`}
                          style={
                            hasImages
                              ? { right: "90px", fontSize: "20px" }
                              : { right: "10px", fontSize: "20px" }
                          }
                        >
                          <i className="bi bi-youtube"></i>
                        </div>
                      )}
                      <Image
                        className={`imageCover rounded-3`}
                        src={
                          featuredImage?.node?.sourceUrl
                            ? featuredImage?.node?.sourceUrl
                            : defaultImage
                        }
                        width={350}
                        height={246}
                        priority={true}
                        alt={`Ilustracija članka: ${title}`}
                      />
                    </div>
                  </div>
                  <div
                    className={`bottom-0 p-3 dateAndComment col-12 d-flex flex-column justify-content-center`}
                  >
                    <h1
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        marginTop: "0",
                      }}
                    >
                      {title}
                    </h1>
                    <div>
                      <span style={{ fontSize: "16px" }}>
                        {formatDateToCroatian(date)}
                      </span>{" "}
                      |{" "}
                      <span style={{ fontSize: "16px" }}>
                        {nodes.length} <i className="bi bi-chat-left-text"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default OstaleNaslovne;
