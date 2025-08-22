"use client";
import { useState } from "react";
import Image from "next/image";
import mobileNavStyle from "./css/mobileNav.module.css";
import { ThemeToggle } from "./../../../../components/ThemeToggle";

const MobileNav = () => {
  const [showMenuItems, setShowMenuItems] = useState(false);
  return (
    <div className={mobileNavStyle.mobileNav}>
      <div className={mobileNavStyle.mobileLogo}>
        <ThemeToggle />
        <div>
          <Image
            src="/Grude_online_Logotip2.webp"
            alt="Logo"
            width={180}
            height={42}
            priority
          />
        </div>
        <div
          className={
            mobileNavStyle.menuBtn +
            (showMenuItems ? " " + mobileNavStyle.open : "")
          }
          onClick={() => setShowMenuItems(!showMenuItems)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <ul
        className={
          `${mobileNavStyle.mobileNavItems} ` +
          (showMenuItems ? mobileNavStyle.open : mobileNavStyle.closed)
        }
      >
        <li>
          <a href="">Naslovnica</a>
        </li>
        <li>
          <a href="">Vijesti</a>
        </li>
        <li>
          <a href="/category/crna-kronika">Crna Kronika</a>
        </li>
        <li>
          <a href="">Gospodarstvo</a>
        </li>
        <li>
          <a href="">Kultura</a>
        </li>
        <li>
          <a href="">Zanimljivosti</a>
        </li>
        <li>
          <a href="">Sport</a>
        </li>
        <li>
          <a href="">Politika</a>
        </li>
        <li>
          <a href="">Lifestyle</a>
        </li>
        <li>
          <a href="">Kontakt</a>
        </li>
        <li>
          <a href="">Osmrtnice</a>
        </li>
      </ul>

      {/* Additional mobile navigation content can go here */}
    </div>
  );
};

export default MobileNav;
