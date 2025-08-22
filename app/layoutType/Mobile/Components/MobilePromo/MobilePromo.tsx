//import mobileStyle from "../MobileHomepage/Css/mobileHomepage.module.css";
//import styles from "../../../css/style.module.css";
import Image from "next/image";

//import Link from "next/link";
//import CommentCount from "../../CommentCount/CommentCount";
import defaultImage from "../../../../../public/noImage.jpg";
import { getPostsByCategorySmall2 } from "@/app/functions/queries/postsByCategorySmall";
import { decodeHTMLEntities } from "@/app/functions/decodeHtml";

//import { getRecentPostSlugs } from "@/app/libs/Queries/Queries/recentPosts";

const MobilePromo = async () => {
  //const naja = await getRecentPostSlugs(10);
  const promoNews = await getPostsByCategorySmall2("promo", 6, "MEDIUM");
  const {
    posts: { nodes },
  } = promoNews;

  return (
    <div
      className="slideTestParent"
      style={{
        margin: "25px 0 30px 0",
        background: "#342e35",
        padding: "0 15px",
      }}
    >
      <div>
        <h1 style={{ borderBottom: "2px solid #ea8a2b", color: "white" }}>
          Promo
        </h1>
      </div>
      <div className="slideTest">
        {nodes.map((item, index: number) => {
          return (
            <div key={index} className="slideTestChild">
              <a href={`/${item?.slug}`}>
                <div className="slideTestChildWrap">
                  <Image
                    src={
                      item?.featuredImage.node.sourceUrl
                        ? item?.featuredImage.node.sourceUrl
                        : defaultImage
                    }
                    width={200}
                    height={130}
                    alt={`Ilustracija članka: ${item?.title}`}
                    quality={20}
                    priority={false}
                    loading={"lazy"}
                  />
                  <span
                    style={{
                      position: "absolute",
                      width: "fit-content",
                      bottom: "0",
                      left: "0",
                      background: "rgb(206, 116, 26)",
                      padding: "4px 10px 3px 10px",
                      fontSize: "12px",
                      letterSpacing: "1px",
                      borderBottomLeftRadius: "7px",
                      borderBottomRightRadius: "0",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    OGLAS
                  </span>
                  {/* <CommentCount
                    slug={item?.slug}
                    color="white"
                    fontSize="12px"
                  /> */}
                </div>
                <h1 style={{ fontSize: "20px", color: "white" }}>
                  {decodeHTMLEntities(item?.title)}
                </h1>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobilePromo;
