import { gonlinePopularPosts } from "../GronlineURLs/gronlineURLs";

export const fetchPopularPosts = async () => {
  try {
    const response = await fetch(gonlinePopularPosts, {
      next: { revalidate: 14400, tags: ["collection"] },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    // Fetch featured images for each post
    const postsWithImages = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.map(async (post: any) => {
        const mediaResponse = await fetch(
          `https://www.grude-online.info/wp-json/wp/v2/media/${post.featured_media}`
        );

        const mediaData = await mediaResponse.json();
        return { ...post, featured_image: mediaData };
      })
    );

    return postsWithImages;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
