import {
  CategoriesI,
  CommentsI,
  FeaturedImageI,
  TagsI,
} from "@/app/tsTypes/tsTypes";
import { fetchAPI } from "../fetchGrudeOnlineFunction";

export interface RecentPostsSourceI {
  posts: {
    nodes: {
      title: string;
      slug: string;
      date: string;
      content: string;
      featuredImage: FeaturedImageI;
      comments: CommentsI;
      categories: CategoriesI;
      tags: TagsI;
    }[];
  };
}
export interface RecentPostsI {
  title: string;
  slug: string;
  date: string;
  content: string;
  featuredImage: FeaturedImageI;
  comments: CommentsI;
  categories: CategoriesI;
  tags: TagsI;
}

export const getRecentPostsHomepage = async (numOfPosts: number) => {
  const data = await fetchAPI<RecentPostsSourceI>(`{
        posts(first: ${numOfPosts}) {
          nodes {
            title
            slug
            date
            content
            tags {
                nodes {
                name
                }
            }
            featuredImage {
              node {
                sourceUrl(size: MEDIUM)
              }
            }
            comments(first:500) {
              nodes {
                content

              }
            }
            categories {
              edges {
                node {
                  slug
                }
              }
            }
          }
        }
      }`);

  return data;
};

export const getRecentPostSlugs = async (numOfPosts: number) => {
  const data = await fetchAPI<{ posts: { nodes: { slug: string }[] } }>(`{
    posts(first: ${numOfPosts}) {
      nodes {
        slug
      }
    }
  }`);
  return data.posts.nodes.map((post) => post.slug);
};
