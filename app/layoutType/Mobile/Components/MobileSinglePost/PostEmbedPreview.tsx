"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import defaultImage from "../../../../../public/noImage.jpg";
import { fetchAPI } from "@/app/functions/fetchGrudeOnlineFunction";

//import CommentLinkInPost from "../../Comments/CommentLinkInPost";

const POST_EMBED_QUERY = `
  query PostByUri($uri: String!) {
    postBy(uri: $uri) {
      title
      excerpt
      content
        commentCount
      uri
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

type PostPreview = {
  title: string;
  excerpt: string;
  content: string;
  uri: string;
  commentCount: number;
  featuredImage?: { node?: { sourceUrl: string } };
};

const PostEmbedPreview = ({ url }: { url: string }) => {
  const [post, setPost] = useState<PostPreview | null>(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const uri = new URL(url).pathname;
        const data = await fetchAPI<{ postBy: PostPreview }>(POST_EMBED_QUERY, {
          variables: { uri },
        });
        setPost(data.postBy);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja embedded posta:", error);
      }
    };

    getPost();
  }, [url]);

  if (!post) return null;

  const previewText = post.excerpt
    ? post.excerpt
    : post.content
        .replace(/<[^>]*>?/gm, "") // remove HTML
        .slice(0, 200) + "...";

  return (
    <a
      href={post.uri}
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        margin: "20px 0",
        border: "2px solid #ccc",
        borderRadius: "10px",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        backgroundColor: "#1c1e20",
        padding: "15px",
        flexDirection: "column",
        maxWidth: "500px",
      }}
    >
      <h1 style={{ color: "white", textAlign: "center" }}>{post.title}</h1>
      <Image
        src={post.featuredImage?.node?.sourceUrl || defaultImage}
        alt={post.title}
        width={320}
        height={150}
        style={{ objectFit: "cover", borderRadius: "6px" }}
      />
      <div>
        <div
          style={{ color: "white", fontSize: "16px" }}
          dangerouslySetInnerHTML={{ __html: previewText }}
        />

        <small style={{ color: "#007bff", display: "block", marginTop: "6px" }}>
          → Pročitaj više
        </small>
      </div>
    </a>
  );
};

export default PostEmbedPreview;
