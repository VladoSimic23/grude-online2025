import * as cheerio from "cheerio";

export const cheerioCheck = (
  content: string,
  tags: { nodes: { name: string }[] }
) => {
  const $ = cheerio.load(content);

  const hasImages = $("img").length > 0;

  // Provjera postoji li <video> tag u HTML-u
  const htmlHasVideo = $("video").length > 0;

  // Provjera postoji li "video" tag u tags.nodes
  const tagsHaveVideo = tags?.nodes?.some((tag) => tag.name === "video");

  const hasVideo = htmlHasVideo || tagsHaveVideo;

  return { hasImages, hasVideo };
};
