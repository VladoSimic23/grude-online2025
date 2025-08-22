import Image from "next/image";
//import Link from "next/link";
import defaultImage from "../../../../../../public/noImage.jpg";
//import CommentCount from "../../CommentCount/CommentCount";
import "./../Izdvojeno/css/mobileIzdvojeno.scss";
import { decodeHTMLEntities } from "@/app/functions/decodeHtml";
import "./../../../../../css/framework.scss";
import { fetchPopularPosts } from "@/app/functions/fetchPopularPosts";
import CommentLinkPopularno from "@/app/components/Comments/CommentLinkPopularno";

const MobilePopularno = async () => {
  const popular = await fetchPopularPosts();

  return (
    <div className="container">
      <h1
        style={{
          borderBottom: `2px solid royalblue`,
          display: "inline-block",
          paddingBottom: "5px",
        }}
      >
        Popularno
      </h1>
      {popular?.slice(0, 5).map((item, index) => {
        return (
          <div key={index} className={`slideTestChild`}>
            <a
              key={index}
              href={`/${item?.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{ marginBottom: "20px" }}
                className="grid align-items-center"
              >
                <div className="col-5">
                  <div className={`slideTestChildWrap`}>
                    <Image
                      className="imageCover"
                      src={
                        item?.featured_image?.source_url
                          ? item?.featured_image?.source_url
                          : defaultImage
                      }
                      width={80}
                      height={80}
                      alt={`Ilustracija članka: ${item?.title.rendered}`}
                      quality={20}
                      priority={false}
                      loading={"lazy"}
                    />
                    {/* <CommentCount
                      slug={item?.slug}
                      color="white"
                      fontSize="12px"
                    /> */}
                    <CommentLinkPopularno slug={item?.slug} color={"white"} />
                  </div>
                </div>
                <div
                  className="col-7"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {decodeHTMLEntities(item?.title?.rendered)}
                  </h1>
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default MobilePopularno;
