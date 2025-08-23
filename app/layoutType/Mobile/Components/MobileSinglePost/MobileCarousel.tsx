/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
//import style from "../../../../css/style.module.css";
//import mobileStyle from "../../MobileHomepage/Css/mobileHomepage.module.css";
import "./swiperCustomCssPost.css";
import defaultImage from "../../../../../public/noImage.jpg";
import "./../HomepageComponents/Izdvojeno/css/mobileIzdvojeno.scss";
import "./../../../../css/framework.scss";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  FreeMode,
  Thumbs,
  Zoom,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/zoom";

const MobileCarousel = ({
  images,
  postId,
  mainImg,
}: {
  images: string[];
  title: string;
  postId: string;
  mainImg: string;
}) => {
  const [displayGallery, setDisplayGallery] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSrc, setCurrentSrc] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  // Open gallery handler
  const openGallery = (index: number) => {
    setActiveIndex(index);
    setCurrentSrc(images[index]); // <-- update currentSrc
    setDisplayGallery(true);
    window.location.hash = "gallery";

    setTimeout(() => {
      if (swiperRef.current?.slideToLoop) {
        swiperRef.current.slideToLoop(index);
      }
    }, 100);
  };

  const openGalleryWithoutIndex = () => {
    setDisplayGallery(true);
    // Update the URL hash to indicate gallery is open
    window.location.hash = "gallery";
  };

  // Close gallery handler
  const closeGallery = () => {
    setDisplayGallery(false);
    // Remove the hash to indicate gallery is closed
    window.location.hash = "";
  };

  useEffect(() => {
    // Listen for changes in the URL hash
    const handleHashChange = () => {
      if (window.location.hash === "#gallery") {
        setDisplayGallery(true);
      } else {
        setDisplayGallery(false);
      }
    };

    // Attach the event listener to hashchange
    window.addEventListener("hashchange", handleHashChange);

    // Check the initial state when the component mounts
    if (window.location.hash === "#gallery") {
      setDisplayGallery(true);
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // const shareImageViaWhatsApp = () => {
  //   const message = `Pogledaj ovu sliku: ${currentSrc}`;
  //   const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
  //   window.open(whatsappLink, "_blank");
  // };

  return (
    <div style={{ margin: "30px 0" }}>
      <div style={{ position: "relative", aspectRatio: "7/4" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        >
          <img
            src="/blurImage.jpeg"
            alt="placeholder"
            width={400}
            height={140}
          />
          {/* ili spinner, skeleton, itd. */}
        </div>
        <Image
          className={`imageContain`}
          onClick={openGalleryWithoutIndex}
          style={{
            height: "auto",
            position: "relative",
            zIndex: "2",
          }}
          src={mainImg ? mainImg : defaultImage}
          width={500}
          height={250}
          alt={`post image ${postId}`}
          priority={true}
          quality={75}
          fetchPriority="high"
          id={`post-image-${postId}`}
        />
      </div>
      {/* Preview Thumbnails */}
      <div
        style={{ marginTop: "-25px", position: "relative", padding: "30px 0" }}
      >
        <div className="grid">
          {images.slice(0, 4).map((img, index) => (
            <div
              key={index}
              onClick={() => openGallery(index)}
              style={{ cursor: "pointer" }}
              className="col-3"
            >
              <Image
                src={img}
                alt="thumbnail"
                width={100}
                height={70}
                style={{ objectFit: "cover", maxWidth: "100%" }}
                quality={20}
                priority
              />
            </div>
          ))}
        </div>
        <div
          onClick={openGalleryWithoutIndex}
          style={{
            position: "absolute",
            bottom: "15px",
            right: "0",
            color: "black",
            display: "inline-block",
            background: "white",
            padding: "7px 16px",
          }}
        >
          <h1
            style={{
              margin: "0",
              fontSize: "20px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            {images.length}
          </h1>
        </div>
      </div>

      {/* Fullscreen Gallery */}
      {displayGallery && (
        <>
          <div
            className="custom-swiper"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "93vh",
              width: "100%",
              background: "rgba(34, 32, 32)",
              zIndex: 10000,
              padding: "15px",
            }}
          >
            <div className={`mobCarousel carousel-nav`}>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator
                      .share({
                        url: `${currentSrc}`,
                      })
                      .catch((error) => console.log("Error sharing", error));
                  } else {
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(
                        `${currentSrc}`
                      )}`
                    );
                  }
                }}
                style={{
                  // position: "absolute",
                  // top: "15px",
                  // right: "100px",
                  backgroundColor: "#222020",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 2px 5px 2px",
                  color: "#cb7623",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                title="Podijeli putem WhatsAppa"
              >
                <i className="bi bi-share-fill"></i>
              </button>

              <Image
                src="/Grude_online_Logotip2.webp"
                alt="grudeOnlineLogo"
                width={330}
                height={42}
              />

              <i
                onClick={closeGallery}
                className="bi bi-x-lg"
                style={{
                  color: "#008aa1",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 24,
                }}
              ></i>
            </div>

            <Swiper
              modules={[
                Navigation,
                Pagination,
                Scrollbar,
                A11y,
                Thumbs,
                FreeMode,
                Zoom,
              ]}
              initialSlide={activeIndex}
              spaceBetween={50}
              slidesPerView={1}
              loop={true}
              zoom={true}
              navigation
              pagination={{ type: "progressbar" }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              onSlideChange={(swiper) => {
                const index = swiper.realIndex;
                setActiveIndex(index);
                setCurrentSrc(images[index]); // <-- update currentSrc
              }}
              scrollbar={{ draggable: true }}
              className="mySwiper"
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              {images.map((src: string, index: number) => (
                <SwiperSlide
                  key={index}
                  className={`${index === 0 ? "active" : ""}`}
                  style={{
                    fontSize: "10px !important",
                    height: "auto",
                    display: "grid",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="mobileSingleItem"
                    style={{ position: "relative" }}
                  >
                    <div
                      style={{
                        position: "relative",
                        marginTop: "-15%",
                      }}
                    >
                      <div className="swiper-zoom-container image-style">
                        <Image
                          style={{
                            position: "relative",
                            zIndex: "1",
                            height: "auto",
                          }}
                          className="imageCover"
                          src={src}
                          width={300}
                          height={220}
                          alt={`Gallery Image ${index + 1}`}
                          quality={75}
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Thumbnails */}
          <div
            className="custom-thumb"
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              height: "12vh",
              width: "100%",
              background: "rgba(34, 32, 32, 0.99)",
              zIndex: 10000,
              padding: "10px 15px",
            }}
          >
            <Swiper
              onSwiper={setThumbsSwiper}
              loop
              spaceBetween={10}
              slidesPerView={4}
              freeMode
              watchSlidesProgress
              slideToClickedSlide
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {images.map((src, index) => (
                <SwiperSlide
                  key={index}
                  className={index === activeIndex ? "is-active" : ""}
                >
                  <div className="mobileSingleItem">
                    <Image
                      className="imageCover"
                      src={src}
                      width={70}
                      height={70}
                      alt={`Gallery Image ${index + 1}`}
                      quality={75}
                      priority
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileCarousel;
