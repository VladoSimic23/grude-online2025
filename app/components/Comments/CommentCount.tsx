import { fetchClientComments } from "./fetchClientComments";

const CommentCount = async ({
  slug,
  fontSize,
}: {
  slug: string;
  fontSize: string;
}) => {
  const commentCount = await fetchClientComments(slug);

  return (
    <span style={{ fontWeight: "600" }}>
      {commentCount?.length}
      <i
        style={{
          marginLeft: "4px",
          fontSize: fontSize,
        }}
        className="bi bi-chat-left"
      ></i>
    </span>
  );
};

export default CommentCount;
