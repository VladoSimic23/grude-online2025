import Link from "next/link";
import Image from "next/image";
import defaultImage from "../../../../public/noImage.jpg";
import { formatDateToCroatian } from "@/app/functions/formatDateToCroatian";
import { cheerioCheck } from "@/app/functions/cheerioCheck/cheerioCheck";
import { getPostsByCategorySmall } from "@/app/functions/queries/postsByCategorySmall";
import "./../css/desktop.scss";
import "./../../../css/framework.scss";

const Naslovna = async () => {
  const data = await getPostsByCategorySmall("izdvojeno", 1, "LARGE");
  const {
    posts: { nodes },
  } = data;

  const { hasImages, hasVideo } = cheerioCheck(
    nodes[0]?.content,
    nodes[0]?.tags
  );
  // const isVideo = true;
  // const isImage = true;

  return (
    <div className="naslovna">
      <Link href={`/${nodes[0]?.slug}`} className="text-decoration-none">
        <div style={{ position: "relative" }}>
          <div style={{ position: "relative" }}>
            {hasImages && (
              <div className="desktopImage">
                {" "}
                <i className="bi bi-camera"></i>
              </div>
            )}
            {hasVideo && (
              <div
                className="desktopVideo"
                style={hasImages ? { right: "100px" } : { right: "10px" }}
              >
                <i className="bi bi-youtube"></i>
              </div>
            )}
            <Image
              className={`imageCover rounded-3`}
              src={
                nodes[0]?.featuredImage?.node?.sourceUrl
                  ? nodes[0]?.featuredImage?.node?.sourceUrl
                  : defaultImage
              }
              width={400}
              height={500}
              priority
              alt={"Ilustracija članka: " + nodes[0].title}
            />
          </div>
          <div className="dateAndComment">
            <h1 style={{ fontSize: "50px", margin: "16px 0" }}>
              {nodes[0].title}
            </h1>
            <div>
              <span>{formatDateToCroatian(nodes[0].date)}</span> |{" "}
              <span>
                {nodes.length} <i className="bi bi-chat-left-text"></i>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Naslovna;
