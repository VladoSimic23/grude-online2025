import { fetchAPI } from "@/app/functions/fetchGrudeOnlineFunction";
import { temporaryApiUrl } from "@/app/GronlineURLs/gronlineURLs";

export interface CommentCountSourceI {
  data: {
    comments: {
      nodes: {
        commentId: number;
      }[];
    };
  };
}

export const fetchClientComments = async (contentName: string) => {
  try {
    const response = await fetch(temporaryApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query NewQuery {
            comments(first:500, where: {contentName: "${contentName}"}) {
              nodes {         
                commentId           
              }
            }
          }`,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result: CommentCountSourceI = await response.json();
    return result?.data?.comments?.nodes;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export interface ClientCommentsDetailedI {
  comments: {
    nodes: {
      content: string;
      date: string;
      author: {
        node: {
          name: string;
        };
      };
    }[];
  };
}

export interface ClientCommentsShortI {
  nodes: {
    content: string;
    date: string;
    author: {
      node: {
        name: string;
      };
    };
  }[];
}

export interface ClientCommentsContent {
  content: string;
  date: string;
  author: {
    node: {
      name: string;
    };
  };
}

export const fetchClientCommentsDetailed = async (contentName: string) => {
  const data = await fetchAPI<ClientCommentsDetailedI>(
    `query NewQuery {
            comments(first:500, where: {contentName: "${contentName}"}) {
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
          }`
  );
  return data;
};

export async function getCommentsForPost(postId: number) {
  const res = await fetch(
    `https://grude-online.info/wp-json/wp/v2/comments?post=${postId}&per_page=100`
  );
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}
