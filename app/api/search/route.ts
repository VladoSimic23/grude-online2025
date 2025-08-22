import { temporaryApiUrl } from "@/app/GronlineURLs/gronlineURLs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { searchQuery, first, after } = await request.json();

  const graphQLQuery = `
      query SearchQuery($searchQuery: String!, $first: Int!, $after: String) {
        posts(first: $first, after: $after, where: { search: $searchQuery }) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            slug
            title
            date
            featuredImage {
              node {
                sourceUrl(size: LARGE)
              }
            }
          }
        }
      }
    `;

  const response = await fetch(temporaryApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: graphQLQuery,
      variables: { searchQuery, first, after },
    }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }

  const data = await response.json();

  return new Response(JSON.stringify(data), { status: 200 });
}
