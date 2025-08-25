//import styles from "../../../css/style.module.css";
import Image from "next/image";
import { decodeHTMLEntities } from "@/app/functions/decodeHtml";
import Link from "next/link";
import defaultImage from "../../../../public/noImage.jpg";
//import desktopStyle from "../../DesktopComponents/css/desktop.module.css";
import { fetchPopularPosts } from "@/app/functions/fetchPopularPosts";
import "./../css/desktop.scss";
import CommentCount from "@/app/components/Comments/CommentCount";

const PopularnoDesktop = async () => {
  const popular = await fetchPopularPosts();

  return (
    <div className="desktopPopularno">
      <h1
        style={{
          display: "inline-block",
          borderBottom: "3px solid #ffa700",
          paddingBottom: "5px",
          fontFamily: "Barlow Condensed",
          fontWeight: "600",
          fontSize: "30px",
          marginBottom: "20px",
        }}
      >
        Popularno
      </h1>
      <div>
        {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
        {popular?.slice(0, 6).map((item: any, index) => {
          return (
            <div key={index} style={{ marginBottom: "15px" }}>
              <Link href={`/${item?.slug}`}>
                <div className="grid">
                  <div className="col-4">
                    <Image
                      src={
                        item?.featured_image?.source_url
                          ? item?.featured_image?.source_url
                          : defaultImage
                      }
                      width={150}
                      height={80}
                      alt={`Ilustracija članka: ${decodeHTMLEntities(
                        item?.title?.rendered
                      )}`}
                      quality={40}
                      priority={false}
                      loading={"lazy"}
                      className="imageCover"
                    />
                  </div>
                  <div className="col-8 ">
                    <h1
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        marginTop: "0px",
                      }}
                    >
                      {decodeHTMLEntities(item?.title?.rendered)}
                    </h1>
                    <CommentCount slug={item?.slug} fontSize="12px" />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularnoDesktop;
