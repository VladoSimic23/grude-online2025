import Image from "next/image";
import { formatDateToCroatian } from "@/app/functions/formatDateToCroatian";
import Link from "next/link";
import { PostsByCategorySourceI } from "@/app/functions/queries/postsByCategorySmall";
import CommentLink from "@/app/components/Comments/CommentsLink";
import "./../../../../css/framework.scss";
import "./../HomepageComponents/Izdvojeno/css/mobileIzdvojeno.scss";

const MobilePostListByCategory = ({
  data,
}: {
  data: PostsByCategorySourceI;
}) => {
  const {
    posts: { nodes },
  } = data;

  return (
    <div style={{ color: "white" }}>
      {nodes.map((item, index) => {
        const {
          title,
          date,
          slug,
          comments: { nodes },
          featuredImage: {
            node: { sourceUrl },
          },
        } = item;
        return (
          <Link
            key={index}
            href={`/${slug}`}
            style={{ textDecoration: "none" }}
          >
            <div style={{ marginBottom: "60px" }}>
              <div className="mobileSingleItem">
                <Image
                  className="imageCover"
                  src={sourceUrl}
                  width={300}
                  height={200}
                  alt={`Ilustracija članka: ${title}`}
                  priority={index < 3 ? true : false}
                />
              </div>
              <h1>{title}</h1>
              <div className="mobileDateAndComments">
                <span className="mobileSpan">{formatDateToCroatian(date)}</span>

                <CommentLink
                  slug={slug}
                  color={"black"}
                  length={nodes?.length}
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MobilePostListByCategory;
