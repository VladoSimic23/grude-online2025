"use client";

import "./../../Izdvojeno/css/mobileIzdvojeno.scss";
import Image from "next/image";
import { matchColors } from "@/app/functions/categoryColors";
import { formatDateToCroatian } from "@/app/functions/formatDateToCroatian";
import { cheerioCheck } from "@/app/functions/cheerioCheck/cheerioCheck";
import { RecentPostsI } from "@/app/functions/queries/recentPosts";
import CommentLink from "@/app/components/Comments/CommentsLink";
import "../../../../../../css/framework.scss";

const MobileNajnovijeClientDetails = ({
  props,
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
    <a href={`/${slug}`} style={{ textDecoration: "none" }}>
      <div style={{ marginBottom: "30px" }} className="landscapeView">
        <div className="mobileSingleItem" style={{ display: "flex" }}>
          <Image
            style={{ borderRadius: "10px" }}
            className="imageCover"
            src={sourceUrl}
            width={300}
            height={200}
            alt={`Ilustracija članka: ${title}`}
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
                style={{ background: matchColors(theCategoryColor) }}
              >
                {hasImages && (
                  <i
                    className="bi bi-camera"
                    style={
                      hasVideo ? { marginRight: "10px" } : { marginRight: "0" }
                    }
                  ></i>
                )}
                {hasVideo && <i className="bi bi-youtube"></i>}
              </div>
            ))}
        </div>
        <div className="landscapeViewChild">
          <h1>{title}</h1>
          <div className="mobileDateAndComments">
            <span
              className="mobileSpan"
              style={{
                borderBottom: `2px solid ${
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
  );
};

export default MobileNajnovijeClientDetails;
