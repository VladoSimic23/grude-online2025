import { temporaryApiUrl } from "../GronlineURLs/gronlineURLs";

type FetchAPIOptions = {
  variables?: Record<string, string>; // Define a flexible type for variables
};

export async function fetchAPI<TData>(
  query: string, // Define query as a string
  { variables }: FetchAPIOptions = {} // Default value for options
): Promise<TData> {
  // Generic type TData defines the shape of returned data
  const headers = {
    "Content-Type": "application/json",
  };

  const res = await fetch(temporaryApiUrl, {
    next: { revalidate: 14400, tags: ["collection"] },
    //cache: "no-store",
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch API: ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data as TData; // Cast the returned data to TData
}
