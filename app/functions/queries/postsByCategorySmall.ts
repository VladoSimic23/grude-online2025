import {
  CategoriesI,
  CommentsI,
  FeaturedImageI,
  TagsI,
} from "@/app/tsTypes/tsTypes";
import { fetchAPI } from "../fetchGrudeOnlineFunction";

export interface PostsByCategorySourceI {
  posts: {
    nodes: {
      slug: string;
      title: string;
      date: string;
      featuredImage: FeaturedImageI;
      categories: CategoriesI;
      comments: CommentsI;
      content: string;
      tags: TagsI;
    }[];
  };
}

export interface PostsByCategoryI {
  slug: string;
  title: string;
  date: string;
  featuredImage: FeaturedImageI;
  categories: CategoriesI;
  comments: CommentsI;
}

export async function getPostsByCategorySmall2(
  category: string,
  numOfPosts: number,
  size: string
  //excludedSlugs: string[]
) {
  const data = await fetchAPI<PostsByCategorySourceI>(`query {
    posts(first: ${numOfPosts}, where: {categoryName: "${category}"}) {
      nodes {
        slug
        title
        date
        content
          tags {
                nodes {
                  name
                }
              }
        featuredImage {
          node {
            sourceUrl(size: ${size})
          }
        }
        categories {
          edges {
            node {
              slug
            }
          }
        }
        comments(first: 500) {
          nodes {
            commentId
          }
        }
      }
    }
  }`);

  // Filter out excluded slugs on frontend
  // const filteredPosts = data?.posts?.nodes?.filter(
  //   (post) => !excludedSlugs?.includes(post?.slug)
  // );

  return {
    posts: {
      nodes: data?.posts?.nodes,
    },
  };
}

export async function getPostsByCategorySmall(
  category: string,
  numOfPosts: number,
  size: string
) {
  const data = await fetchAPI<PostsByCategorySourceI>(`query NewQuery {
      posts(first: ${numOfPosts}, where: {categoryName: "${category}"}) {
          nodes {
            slug
            title
            date
            content
              tags {
                nodes {
                  name
                }
              }
            
            featuredImage {
              node {
                sourceUrl(size: ${size})
              }
            }
            categories {
              edges {
                node {
                  slug
                }
              }
            }
              comments(first:500) {
                nodes {
                commentId
                }
              }
          }

      }
    }`);

  return data;
}
