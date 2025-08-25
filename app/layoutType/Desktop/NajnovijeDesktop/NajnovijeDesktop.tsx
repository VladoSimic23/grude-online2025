import Image from "next/image";
import Link from "next/link";
import defaultImage from "../../../../public/noImage.jpg";
import { formatDateToCroatian } from "@/app/functions/formatDateToCroatian";
import "./../css/desktop.scss";
import "./../../../css/framework.scss";
import {
  getRecentPostsHomepage,
  RecentPostsSourceI,
} from "@/app/functions/queries/recentPosts";
import { cheerioCheck } from "@/app/functions/cheerioCheck/cheerioCheck";

const NajnovijeDesktop = async () => {
  const najnovije: RecentPostsSourceI = await getRecentPostsHomepage(6);

  const {
    posts: { nodes },
  } = najnovije;

  return (
    <div>
      <div>
        <h1
          style={{
            borderBottom: "3px solid #362295",
            display: "inline-block",
            marginBottom: "25px",
            paddingBottom: "5px",
            fontSize: "42px",
          }}
        >
          Najnovije
        </h1>
      </div>

      <div className="grid">
        {nodes.map((item, index) => {
          const { slug, featuredImage, title, date, content, tags } = item;
          const { hasImages, hasVideo } = cheerioCheck(content, tags);
          return (
            <div key={index} className="col-4">
              <Link href={`/${slug}`}>
                <div style={{ position: "relative" }}>
                  <div
                    style={{ position: "absolute", top: "5px", left: "5px" }}
                  >
                    <span
                      style={{
                        background: "#362295",
                        padding: "2px 15px 4px 15px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        color: "white",
                      }}
                    >
                      {index + 1}
                    </span>
                  </div>
                  {hasImages && (
                    <div
                      style={{
                        fontSize: "16px",
                        padding: "3px 10px 5px 10px",
                        background: "#362295",
                      }}
                      className="desktopImage"
                    >
                      <i className="bi bi-camera"></i>
                    </div>
                  )}

                  {hasVideo && (
                    <div
                      className="desktopVideo"
                      style={
                        hasImages
                          ? {
                              right: "50px",
                              padding: "3px 10px 5px 10px",
                              fontSize: "16px",
                              background: "#362295",
                            }
                          : {
                              right: "10px",
                              padding: "3px 10px 5px 10px",
                              fontSize: "16px",
                              background: "#362295",
                            }
                      }
                    >
                      <i className="bi bi-youtube"></i>
                    </div>
                  )}

                  <Image
                    className="imageCover"
                    src={
                      featuredImage?.node?.sourceUrl
                        ? featuredImage?.node?.sourceUrl
                        : defaultImage
                    }
                    width={300}
                    height={220}
                    priority={true}
                    alt={`Ilustracija članka: ${title}`}
                  />
                </div>
                <h1 style={{ fontSize: "24px", margin: "16px 0" }}>{title}</h1>
                <p>{formatDateToCroatian(date)}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NajnovijeDesktop;
