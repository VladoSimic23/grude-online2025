"use client";
import { SetStateAction, useState } from "react";
import { submitComment } from "@/app/functions/queries/submitComments";
import "./css/MobileComments.scss";
import "./../HomepageComponents/Izdvojeno/css/mobileIzdvojeno.scss";

const MobileCommentForm = ({ id }: { slug: string; id: string }) => {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const formattedComment = comment.replace(/\n/g, "\\n");

  const handleCommentChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setComment(e.target.value);
  };

  const handleUsernameChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    if (e.target.value === "") {
      setUsername("Anonimno");
    }
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const finalUsername = username === "" ? "Anonimno" : username;
      await submitComment(Number(id), formattedComment, finalUsername);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }

    setComment("");
    setUsername("");
  };

  return (
    <form onSubmit={handleSubmit} className="commentForm">
      <h1 style={{ marginBottom: "20px", marginTop: "50px" }}>
        Ostavi komentar
      </h1>
      <textarea
        placeholder="Tvoj komentar..."
        value={comment}
        onChange={handleCommentChange}
        rows={5}
        name="Komentar"
      />
      <br />
      <input
        placeholder="Ime"
        name="Ime"
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />
      <br />

      <div>
        <button className="mobileButtonOrange" type="submit">
          Objavi
        </button>
      </div>
    </form>
  );
};

export default MobileCommentForm;
