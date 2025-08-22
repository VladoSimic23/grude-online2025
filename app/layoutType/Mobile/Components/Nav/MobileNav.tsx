"use client";
import { useState } from "react";
import Image from "next/image";
import mobileNavStyle from "./css/mobileNav.module.css";
import { ThemeToggle } from "./../../../../components/ThemeToggle";
import Link from "next/link";

const MobileNav = () => {
  const [showMenuItems, setShowMenuItems] = useState(false);
  return (
    <div className={mobileNavStyle.mobileNav}>
      <div className={mobileNavStyle.mobileLogo}>
        <ThemeToggle />
        <div>
          <Link href="/">
            <Image
              src="/Grude_online_Logotip2.webp"
              alt="Logo"
              width={180}
              height={42}
              priority
            />
          </Link>
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
          <Link href="/">Naslovnica</Link>
        </li>
        <li>
          <Link href="/category/vijesti">Vijesti</Link>
        </li>
        <li>
          <Link href="/category/crna-kronika">Crna Kronika</Link>
        </li>
        <li>
          <Link href="/category/sport">Sport</Link>
        </li>
        <li>
          <Link href="/category/politika">Politika</Link>
        </li>
        <li>
          <Link href="/category/gospodarstvo">Gospodarstvo</Link>
        </li>
        <li>
          <Link href="/category/kultura">Kultura</Link>
        </li>
        <li>
          <Link href="/category/zanimljivosti">Zanimljivosti</Link>
        </li>
        <li>
          <Link href="/category/lifestyle">Lifestyle</Link>
        </li>
        <li>
          <Link href="https://www.osmrtnica.ba/">Osmrtnice</Link>
        </li>
      </ul>

      {/* Additional mobile navigation content can go here */}
    </div>
  );
};

export default MobileNav;
