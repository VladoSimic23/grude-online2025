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
          <div className="mobileSingleItem" style={{ position: "relative", display: "flex" }}>
            <Image
              style={{
                position: "relative",
                zIndex: "1",
                borderRadius: "10px",
              }}
              className="imageCover"
              src={sourceUrl}
              width={300}
              height={200}
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
            <div
              className="mobileCommentCount"
              style={{ background: matchColors(theCategoryColor), zIndex: "5" }}
            >
              {hasImages && <i className="bi bi-camera"></i>}
              {hasVideo && <i className="bi bi-youtube"></i>}
            </div>
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
    </>
  );
};

export default MobileNajnovijeDetails;
