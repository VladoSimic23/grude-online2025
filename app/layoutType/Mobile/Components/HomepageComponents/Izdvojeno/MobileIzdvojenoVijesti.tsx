/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import style from "../../../mainStyle/mobileMainStyle.module.css";
//import Link from "next/link";

//import mobileStyle from "../Css/mobileHomepage.module.css";
import "./css/swiperCustomCss.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { IzdvojenoMobileI } from "@/app/functions/queries/mobileIzdvojeno";
import { cheerioCheck } from "@/app/functions/cheerioCheck/cheerioCheck";

const MobileIzdvojenoVijesti = ({
  vijesti,
}: {
  vijesti: IzdvojenoMobileI[];
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      effect="fade"
      navigation
      autoplay={{
        delay: 6000,
        //disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="mySwiper"
    >
      {vijesti.map((item: IzdvojenoMobileI, index: number) => {
        const { hasImages, hasVideo } = cheerioCheck(item?.content, item?.tags);
        return (
          <SwiperSlide
            key={index}
            className={`${index === 0 ? "active" : ""}`}
            style={{ fontSize: "10px !important" }}
          >
            <a href={`/${item.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "relative", aspectRatio: "7/4" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#222", // ili tvoja boja/skeleton/slika
                      zIndex: 1,
                    }}
                  >
                    <img
                      src="/blurImage.jpeg"
                      alt="placeholder"
                      width={400}
                      height={200}
                      //style={{ width: "300px", height: "40px" }}
                    />
                    {/* ili spinner, skeleton, itd. */}
                  </div>
                  <Image
                    style={{
                      //position: "relative",
                      zIndex: "2",
                      borderRadius: "0",
                    }}
                    className={style.imageCover}
                    src={item.featuredImage.node.sourceUrl}
                    fill
                    alt={item.title}
                    quality={30}
                    priority={true}
                    fetchPriority={"high"}
                  />
                  <h1
                    style={{
                      textAlign: "center",
                      padding: "4px 5px 6px 5px",
                      fontSize: "22px",
                      position: "absolute",
                      zIndex: "2",
                      bottom: "0",
                      width: "100%",
                      background: "#373a3e9e",
                      margin: "0",
                      color: "white",
                    }}
                    //className={`${style.h3Mobile}`}
                  >
                    {item?.title}
                  </h1>
                </div>

                <div
                  className="mobileCommentCount2"
                  style={
                    hasImages || hasVideo
                      ? {
                          background: "#373a3edc",
                          zIndex: "5",
                          borderRadius: "0",
                        }
                      : {}
                  }
                >
                  {hasImages && <i className="bi bi-camera"></i>}
                  {hasVideo && <i className="bi bi-youtube"></i>}
                </div>
              </div>
              {/* <div
                style={{
                  background: "#1e437d",
                  //borderRadius: "8px",
                  padding: "2px 5px 5px 5px",
                  //marginTop: "10px",
                }}
              ></div> */}
            </a>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MobileIzdvojenoVijesti;
