/* eslint-disable @next/next/no-img-element */
// import style from "../../../../../css/style.module.css";
// import mobileStyle from "../../Css/mobileHomepage.module.css";
import Image from "next/image";
import "./../Izdvojeno/css/mobileIzdvojeno.scss";
//import Link from "next/link";

import { RecentPostsI } from "@/app/functions/queries/recentPosts";
import CommentLink from "@/app/components/Comments/CommentsLink";
import { cheerioCheck } from "@/app/functions/cheerioCheck/cheerioCheck";
import { formatDateToCroatian } from "@/app/functions/formatDateToCroatian";
import { matchColors } from "@/app/functions/categoryColors";

const MobileNajnovijeDetails = ({
  props,
  index,
}: {
  props: RecentPostsI;
  index: number;
}) => {
  const {
    featuredImage: {
      node: { sourceUrl },
    },
    title,
    date,
    content,
    slug,
    tags,
    categories: { edges },
    comments: { nodes },
  } = props;

  const theCategoryColor = edges[0]?.node?.slug;
  const { hasImages, hasVideo } = cheerioCheck(content, tags);
  const hasPromo = edges.some((item) => item.node.slug === "promo");

  return (
    <>
      <a href={`/${slug}`} style={{ textDecoration: "none" }}>
        <div style={{ marginBottom: "30px" }} className="landscapeView">
          <div
            className="mobileSingleItem"
            style={{
              position: "relative",
              display: "flex",
              width: "100%",
              aspectRatio: "7/4",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#222", // ili tvoja boja/skeleton/slika
                zIndex: 1,
              }}
            >
              <img
                src="/blurImage.jpeg"
                alt="placeholder"
                width={400}
                height={200}
                //style={{ width: "300px", height: "40px" }}
              />
              {/* ili spinner, skeleton, itd. */}
            </div>
            <Image
              style={{
                borderRadius: "10px",
                zIndex: 2,
              }}
              className="imageCover"
              src={sourceUrl}
              fill
              // placeholder="blur"
              // blurDataURL="/noImage.jpg"
              alt={`Ilustracija članka: ${title}`}
              quality={50}
              priority={index < 2 ? true : false}
              fetchPriority={index < 2 ? "high" : "low"}
            />
            {hasPromo && (
              <div
                className="mobileCategoryOverlay"
                style={{ background: "royalblue", zIndex: "5" }}
              >
                <span>Oglas</span>
              </div>
            )}
            {hasVideo ||
              (hasImages && (
                <div
                  className="mobileCommentCount"
                  style={{
                    background: matchColors(theCategoryColor),
                    zIndex: "5",
                  }}
                >
                  {hasImages && (
                    <i
                      className="bi bi-camera"
                      style={
                        hasVideo
                          ? { marginRight: "10px" }
                          : { marginRight: "0" }
                      }
                    ></i>
                  )}
                  {hasVideo && <i className="bi bi-youtube"></i>}
                </div>
              ))}
          </div>
          <div className="landscapeViewChild">
            <h1 style={{ fontSize: "26px" }}>{title}</h1>
            <div className="mobileDateAndComments">
              <span
                className="mobileSpan"
                style={{
                  borderBottom: `3px solid ${
                    hasPromo ? "royalblue" : matchColors(theCategoryColor)
                  }`,
                  paddingBottom: "5px",
                }}
              >
                {formatDateToCroatian(date)}
              </span>

              {hasPromo ? (
                ""
              ) : (
                <CommentLink
                  slug={slug}
                  color={theCategoryColor}
                  length={nodes?.length}
                />
              )}
            </div>
          </div>
        </div>
      </a>
    </>
  );
};

export default MobileNajnovijeDetails;
