import Image from "next/image";
import Link from "next/link";
import defaultImage from "../../../../public/noImage.jpg";
import { formatDateToCroatian } from "@/app/functions/formatDateToCroatian";
import { getPostsByCategorySmall } from "@/app/functions/queries/postsByCategorySmall";

const PromoDesktop = async () => {
  const promoNews = await getPostsByCategorySmall("promo", 6, "LARGE");
  const {
    posts: { nodes },
  } = promoNews;

  return (
    <div>
      <div>
        <h1
          style={{
            borderBottom: "3px solid royalblue",
            display: "inline-block",
            marginBottom: "25px",
            paddingBottom: "5px",
            fontSize: "42px",
          }}
        >
          Promo
        </h1>
      </div>

      <div className="grid">
        {nodes.map((item, index) => {
          const { slug, featuredImage, title, date } = item;
          return (
            <div key={index} className="col-4">
              <Link href={`/${slug}`}>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      right: "10px",
                      bottom: "10px",
                      padding: "2px 8px",
                      fontSize: "18px",
                      background: "royalblue",
                      color: "white",
                    }}
                  >
                    <span>Oglas</span>
                  </div>
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
                <p style={{ fontSize: "16px" }}>{formatDateToCroatian(date)}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PromoDesktop;
