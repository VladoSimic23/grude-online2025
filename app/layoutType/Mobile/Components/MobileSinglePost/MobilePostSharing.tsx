"use client";
import Link from "next/link";
import React, { useState } from "react";
// import mobileStyle from "../MobileComponents/MobileHomepage/Css/mobileHomepage.module.css";
// import style from "../../css/style.module.css";
import "./../HomepageComponents/Izdvojeno/css/mobileIzdvojeno.scss";
import { grOnlineMainPath } from "@/app/GronlineURLs/gronlineURLs";

const MobilePostSharing = ({ slug }: { slug: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(window?.location?.href);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareImageViaWhatsApp = (currentSrc: string) => {
    const message = `${currentSrc}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div
      className="PostSharing"
      style={{ marginTop: "30px", padding: "0 5px" }}
    >
      <h1>Podijeli: </h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${grOnlineMainPath}/${slug}`}
          target="_blank"
          title="Podjeli putem Facebooka"
          style={{ marginRight: "15px" }}
        >
          <i style={{ color: "#0966ff" }} className="bi bi-facebook"></i>
        </Link>

        <Link
          href={`https://twitter.com/intent/tweet?url=${grOnlineMainPath}/${slug}`}
          target="_blank"
          title="Podjeli putem Twittera"
          style={{ marginRight: "15px" }}
        >
          <i
            style={{ color: "rgb(72, 157, 226)" }}
            className="bi bi-twitter"
          ></i>
        </Link>

        <span
          onClick={() => shareImageViaWhatsApp(`${grOnlineMainPath}/${slug}`)}
          style={{
            color: "rgb(40, 182, 40)",
            fontSize: "24px",
            marginTop: "1px",
            marginRight: "15px",
          }}
          title="Podijeli putem WhatsAppa"
        >
          <i className="bi bi-whatsapp"></i>
        </span>

        <span
          onClick={handleClick}
          title="Kopiraj Link"
          style={{
            color: "white",
            fontSize: "28px",
            cursor: "pointer",
            marginRight: "15px",
          }}
        >
          <i className="bi bi-link"></i>
        </span>
        {showTooltip && (
          <div>
            <p
              style={{
                background: "chocolate",
                color: "white",
                padding: "5px 10px",
                borderRadius: "10px",
                marginLeft: "20px",
                fontSize: "14px",
              }}
            >
              Link Kopiran !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilePostSharing;
