// <-- Make sure this file exists and is named correctly (e.g., fetchGrudeOnlineData.ts or .js)

import { FeaturedImageI, TagsI } from "@/app/tsTypes/tsTypes";
import { fetchAPI } from "../fetchGrudeOnlineFunction";

// export async function getPostsByTag(tag: string) {
//     const query = `query NewQuery {
//       posts(where: {tag: ""}) {
//         nodes {
//           title
//         }
//       }
//     }`;

//     const variables = {
//       tag,
//     };

//     try {
//       const data = await fetchAPI(query, { variables });
//       return data.postBy; // Adjust this based on the actual response structure
//     } catch (error) {
//       console.error("Error fetching post by tag:", error);
//       throw new Error("Failed to fetch post by tag");
//     }
//   }

export interface TagsSourceI {
  posts: {
    nodes: {
      slug: string;
      title: string;
      date: string;
      postId: string;
      featuredImage: FeaturedImageI;
      tags: TagsI;
    }[];
  };
}
export interface TagsPostsI {
  slug: string;
  title: string;
  date: string;
  postId: string;
  featuredImage: FeaturedImageI;
  tags: TagsI;
}

export async function getAllPostsByTags(tag?: string) {
  const data = await fetchAPI<TagsSourceI>(`query NewQuery {
      posts(where: {tag: "${tag}"}) {
        nodes {
          slug
          title
          date
          postId
          featuredImage {
            node {
              sourceUrl(size: LARGE)
            }
          }  
            tags {
                nodes {
                name
                }
            }
        }
      }
    }`);

  return data;
}

export async function getAllPostsByTagsClient(count: number, tag?: string) {
  const data = await fetchAPI<TagsSourceI>(`query NewQuery {
      posts(first: ${count}, where: {tag: "${tag}"}) {
        nodes {
          slug
          title
          date
          postId
          featuredImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
            tags {
                nodes {
                name
                }
            }
        }
      }
    }`);

  // if (!data || !tag) {
  //   return;
  // }

  return data;
}
