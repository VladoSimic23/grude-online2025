import Link from "next/link";
import Image from "next/image";
import defaultImage from "../../../../public/noImage.jpg";
//import desktopStyle from "../css/desktop.module.css";
import { formatDateToCroatian } from "@/app/functions/formatDateToCroatian";
import { getPostsByCategorySmall } from "@/app/functions/queries/postsByCategorySmall";

const GrudeOnlineDesktop = async () => {
  const data = await getPostsByCategorySmall("grude-online", 5, "LARGE");
  const {
    posts: { nodes },
  } = data;

  return (
    <div>
      {/* <div className={desktopStyle.decorUnderline}>
        <Link href="/category/grude-online">
          <h1>Grude Online</h1>
        </Link>
      </div> */}
      <div>
        <Link href="/category/grude-online">
          <h1
            style={{
              borderBottom: "3px solid darkmagenta",
              display: "inline-block",
              marginBottom: "25px",
              fontSize: "42px",
            }}
          >
            Grude Online
          </h1>
        </Link>
      </div>
      <div className="grid">
        <div className="col-6">
          <Link href={`/${nodes[0]?.slug}`}>
            <Image
              className="imageCover"
              src={
                nodes[0]?.featuredImage?.node?.sourceUrl
                  ? nodes[0]?.featuredImage?.node?.sourceUrl
                  : defaultImage
              }
              width={300}
              height={270}
              priority={true}
              alt={`Ilustracija članka: ${nodes[0]?.title}`}
            />
            <h1 style={{ fontSize: "26px" }}>{nodes[0]?.title}</h1>
            <p className="mt-2">{formatDateToCroatian(nodes[0]?.date)}</p>
          </Link>
        </div>
        <div className="col-6">
          <div>
            {nodes?.map((item, index) => {
              const { title, date, slug, featuredImage } = item;

              if (index !== 0) {
                return (
                  <div key={index} style={{ marginBottom: "15px" }}>
                    <Link href={`/${slug}`}>
                      <div className="grid p-2">
                        <div className="col-4">
                          <Image
                            className="imageCover"
                            src={
                              featuredImage?.node?.sourceUrl
                                ? featuredImage?.node?.sourceUrl
                                : defaultImage
                            }
                            width={150}
                            height={100}
                            priority={true}
                            alt={`Ilustracija članka: ${title}`}
                          />
                        </div>
                        <div className="col-8">
                          <h1
                            style={{
                              fontSize: "20px",
                              marginTop: "0px",
                              marginBottom: "10px",
                            }}
                          >
                            {title}
                          </h1>
                          <div>
                            <p style={{ fontSize: "16px" }}>
                              {formatDateToCroatian(date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrudeOnlineDesktop;
