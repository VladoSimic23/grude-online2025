// components/Comments.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import "./../../layoutType/Mobile/Components/MobileComments/css/MobileComments.scss";

import { getCommentsForPost } from "./fetchClientComments";
import { formatCroatianDateWithClock } from "@/app/functions/formatDateSaSatima";

type Comment = {
  id: number;
  author_name: string;
  content: { rendered: string };
  date: string;
  ldc_likes: number;
  ldc_dislikes: number;
};

export default function RestComments({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [votedComments, setVotedComments] = useState<
    Record<number, "like" | "dislike">
  >({});

  useEffect(() => {
    getCommentsForPost(postId)
      .then((comments) => {
        // Sortiraj komentare po broju lajkova (najviše prema vrhu)
        const sorted = comments.sort(
          (a: { ldc_likes: number }, b: { ldc_likes: number }) =>
            (b.ldc_likes || 0) - (a.ldc_likes || 0)
        );
        setComments(sorted);
      })
      .catch(console.error);
  }, [postId]);

  async function vote(commentId: number, type: "like" | "dislike") {
    // Ako je korisnik već glasao isti tip za ovaj komentar, blokiraj
    if (votedComments[commentId] === type) return;

    // Ako je glasao suprotno, nemoj dozvoliti ponovno

    // Lokalno povećaj broj
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              ldc_likes: type === "like" ? c.ldc_likes + 1 : c.ldc_likes,
              ldc_dislikes:
                type === "dislike" ? c.ldc_dislikes + 1 : c.ldc_dislikes,
            }
          : c
      )
    );

    // Zabilježi da je korisnik glasao
    setVotedComments((prev) => ({ ...prev, [commentId]: type }));

    try {
      const res = await fetch(
        `https://grude-online.info/wp-json/ldc/v1/comment-vote/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ commentId, type }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        // Ako je greška, revertaj sve
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  ldc_likes: type === "like" ? c.ldc_likes - 1 : c.ldc_likes,
                  ldc_dislikes:
                    type === "dislike" ? c.ldc_dislikes - 1 : c.ldc_dislikes,
                }
              : c
          )
        );
        // Makni zabilježeni glas
        setVotedComments((prev) => {
          const updated = { ...prev };
          delete updated[commentId];
          return updated;
        });
      } else {
        // Stvarni brojevi s backend-a
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  ldc_likes: data.likes,
                  ldc_dislikes: data.dislikes,
                }
              : c
          )
        );
      }
    } catch (err) {
      // Network fail – revertaj
      console.log(err);

      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? {
                ...c,
                ldc_likes: type === "like" ? c.ldc_likes - 1 : c.ldc_likes,
                ldc_dislikes:
                  type === "dislike" ? c.ldc_dislikes - 1 : c.ldc_dislikes,
              }
            : c
        )
      );
      setVotedComments((prev) => {
        const updated = { ...prev };
        delete updated[commentId];
        return updated;
      });
    }
  }

  if (comments === undefined) {
    return;
  }

  if (comments.length < 1) {
    return (
      <div className="commentsContainer">
        <h1 style={{ marginTop: "30px" }}>Komentari: {comments?.length}</h1>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className="commentsContainer"
        style={{ marginTop: "40px" }}
        id="comments"
      >
        <h1>Komentari : {comments?.length}</h1>
        {comments.map((comment) => (
          <div key={comment.id} className="commentWrapper">
            <div className="displayComments">
              <div className="isMobileComments">
                <div className="mobileComments">
                  <Image
                    src={"/none.jpg"}
                    width={60}
                    height={60}
                    alt="commentIcon"
                  />{" "}
                  <div>
                    <h1
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                      }}
                    >
                      {" "}
                      {comment.author_name !== ""
                        ? comment.author_name
                        : "Anonymus"}{" "}
                    </h1>
                    <span>{formatCroatianDateWithClock(comment?.date)}</span>
                  </div>{" "}
                </div>
                <div className="mobileCommentsContent">
                  {parse(comment?.content?.rendered)}
                </div>
              </div>

              <>
                <div className="isDesktopComments">
                  <div className="desktopLogo">
                    <Image
                      src={"/none.jpg"}
                      width={60}
                      height={60}
                      alt="commentIcon"
                    />
                  </div>
                  <div className="commentDetails">
                    <h1
                      style={{
                        fontSize: "26px",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                      }}
                    >
                      {comment.author_name !== ""
                        ? comment.author_name
                        : "Anonymus"}{" "}
                    </h1>
                    <span style={{ marginBottom: "10px", display: "block" }}>
                      {formatCroatianDateWithClock(comment?.date)}
                    </span>
                    {parse(comment?.content.rendered)}
                  </div>
                </div>
              </>
              {/* )} */}
            </div>

            <div style={{ fontSize: "14px" }}>
              {/* <button onClick={handleLike}> */}
              <button
                style={{
                  background: "white",
                  border: "1px solid black",
                  color: "black",
                }}
                onClick={() => vote(comment.id, "like")}
              >
                <i
                  style={{ fontSize: "14px", color: "black" }}
                  className="bi bi-hand-thumbs-up"
                ></i>
                {/* <span>{likes}</span> */} {comment.ldc_likes}
              </button>
              <button
                style={{
                  background: "white",
                  border: "1px solid black",
                  color: "black",
                }}
                onClick={() => vote(comment.id, "dislike")}
              >
                <i
                  style={{ fontSize: "14px", color: "black" }}
                  className="bi bi-hand-thumbs-down"
                ></i>{" "}
                {comment.ldc_dislikes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
