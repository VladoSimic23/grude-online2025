import Image from "next/image";
//import style from "../../../css/style.module.css";
//import mobileStyle from "../MobileHomepage/Css/mobileHomepage.module.css";
import { formatDateToCroatian } from "@/app/functions/formatDateToCroatian";
import * as cheerio from "cheerio";
import defaultImage from "./../../../../../public/noImage.jpg";
//import PostEmbedPreview from "./PostEmbedPreview";
import { JSX } from "react";
import "./swiperCustomCssPost.css";
import { SinglePostI } from "@/app/functions/queries/singlePosts";
import MobileCarousel from "./MobileCarousel";
import "./../HomepageComponents/Izdvojeno/css/mobileIzdvojeno.scss";
import "./../../../../css/framework.scss";
import ScrollToComments from "../MobileComments/ScrollToComments";
import PostEmbedPreview from "./PostEmbedPreview";

const MobileSinglePost = ({ post }: { post: SinglePostI }) => {
  const { title, content, date, postId } = post;

  const $ = cheerio.load(content);

  const images = $("img");
  $("img.wp-caption, div.wp-caption").each((index, element) => {
    $(element).remove();
  });

  const extraImages: string[] = [];
  if (images.length > 3) {
    images.each((index, img) => {
      extraImages.push($(img).attr("src") || "");
    });
  }

  // Zamjena WP embedded postova sa custom previewom
  $("blockquote.wp-embedded-content").each((i, el) => {
    // const link = $(el).find("a").attr("href");
    const link =
      $(el).find("a").attr("href") || // za blockquote
      $(el).attr("src"); // za iframe

    if (link && link.startsWith("https://www.grude-online.info/")) {
      // Zamijenimo cijeli blockquote sa custom wrapper divom i data-url
      $(el).replaceWith(`<div class="post-embed" data-url="${link}"></div>`);
    }
  });

  const updatedContent = $("body").html() || "";

  // Parsiramo embedove nakon rendera
  const renderWithEmbeds = () => {
    const $ = cheerio.load(updatedContent);
    const elements: JSX.Element[] = [];

    $("body")
      .contents()
      .each((i, el) => {
        // Ako je naš custom embed div
        if (
          el.type === "tag" &&
          el.name === "div" &&
          $(el).hasClass("post-embed")
        ) {
          const url = $(el).attr("data-url");
          if (url) {
            elements.push(<PostEmbedPreview key={`embed-${i}`} url={url} />);
          }
        }
        // Inače dodaj HTML samo ako NIJE wp-embedded-content
        else if (
          !(
            el.type === "tag" &&
            el.name === "blockquote" &&
            $(el).hasClass("wp-embedded-content")
          )
        ) {
          elements.push(
            <div
              key={`html-${i}`}
              dangerouslySetInnerHTML={{ __html: $.html(el) }}
            />
          );
        }
      });

    return elements;
  };

  return (
    <div style={{ marginTop: "80px", overflow: "hidden", padding: "0 5px" }}>
      <h1 style={{ textAlign: "center" }}>{title}</h1>

      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <h2 className={`text-center`} style={{ fontSize: "15px !important" }}>
            {formatDateToCroatian(date)}
          </h2>
        </div>
        {extraImages.length > 0 ? (
          <MobileCarousel
            images={extraImages}
            title={title}
            mainImg={post?.featuredImage?.node.sourceUrl}
            postId={postId}
          />
        ) : (
          <Image
            className={`imageContain`}
            style={{
              height: "auto",
              position: "relative",
              zIndex: "1",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            src={post?.featuredImage?.node?.sourceUrl || defaultImage}
            width={500}
            height={250}
            alt={`Ilustracija članka: ${title}`}
            priority={true}
            fetchPriority="high"
            quality={75}
            id={`post-image-${postId}`}
          />
        )}
      </div>

      <div
        className={`MobileInnerHTML`}
        style={{ color: "white", fontFamily: "sans-serif" }}
      >
        {renderWithEmbeds()}
      </div>

      <ScrollToComments />
    </div>
  );
};

export default MobileSinglePost;
