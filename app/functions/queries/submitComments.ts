import { temporaryApiUrl } from "@/app/GronlineURLs/gronlineURLs";

export async function submitComment(
  id: number,
  comment: string,
  username: string
) {
  try {
    const response = await fetch(temporaryApiUrl, {
      //next: { revalidate: 1, tags: ["collection"] },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            mutation {
              createComment(input: {
                commentOn: ${id}
                content: "${comment}"
                author: "${username}"        
              }) {
                success
               
              }
            }
          `,
      }),
    });

    const result = await response.json();
    const commentCreation = result.data?.createComment;

    if (commentCreation) {
      console.log(`Comment successfully added`);
    } else {
      console.log("Failed to add comment.");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error adding comment:", error.message);
  }
}
