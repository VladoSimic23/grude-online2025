import {
  CategoriesI,
  CommentsI,
  FeaturedImageI,
  TagsI,
} from "@/app/tsTypes/tsTypes";
import { fetchAPI } from "../fetchGrudeOnlineFunction";

export interface SinglePostSourceI {
  postBy: {
    title: string;
    slug: string;
    content: string;
    date: string;
    postId: string;
    author: {
      node: {
        name: string;
      };
    };
    commentStatus: "closed" | "open";
    featuredImage: FeaturedImageI;
    categories: CategoriesI;
    tags: TagsI;
    comments: CommentsI;
  };
}
export interface SinglePostI {
  title: string;
  slug: string;
  content: string;
  date: string;
  postId: string;
  author: {
    node: {
      name: string;
    };
  };
  commentStatus: "closed" | "open";
  featuredImage: FeaturedImageI;
  categories: CategoriesI;
  tags: TagsI;
  comments: CommentsI;
}

export async function getSinglePost(slug: string) {
  const query = `
      query SinglePost($slug: String!) {
        postBy(slug: $slug) {
          slug
              title
              content
              date
              postId
              author {
                node {
                  name
                }
              }
              commentStatus
                featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
              categories {
                edges {
                  node {
                    slug
                  }
                }
              }
              tags {
                nodes {
                  name
                }
              }
              comments {
                nodes {
                  content
                  date
                  author {
                    node {
                      name
                    }
                  }
                }
              }
        }
      }
    `;

  const variables = {
    slug,
  };

  const data = await fetchAPI<SinglePostSourceI>(query, { variables });

  return data;
}
