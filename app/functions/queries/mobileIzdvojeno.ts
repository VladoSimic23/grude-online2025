import { TagsI } from "@/app/tsTypes/tsTypes";
import { fetchAPI } from "../fetchGrudeOnlineFunction";
export interface IzdvojenoMobileI {
  slug: string;
  title: string;
  content: string;
  tags: TagsI;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}
export interface IzdvojenoSourceMobileI {
  posts: {
    nodes: {
      slug: string;
      title: string;
      content: string;
      tags: TagsI;
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      };
    }[];
  };
}

export async function getMobileIzdvojeno(category: string, numOfPosts: number) {
  const data = await fetchAPI<IzdvojenoSourceMobileI>(`query NewQuery {
      posts(first: ${numOfPosts}, where: {categoryName: "${category}"}) {     
          nodes {
            slug
            title
            content
             tags {
                nodes {
                name
                }
            } 
            featuredImage {
              node {
                sourceUrl(size: LARGE)
              }
            }
          }
        
      }
    }`);

  return data;
}
