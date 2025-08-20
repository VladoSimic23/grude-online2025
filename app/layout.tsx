import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import "./globals.css";
import "./css/framework.scss";
import { detectDevice } from "./lib/detectDevice";
//import MobileNav from "./layoutType/Mobile/Components/Nav/MobileNav";
import mobileMainStyle from "./layoutType/Mobile/mainStyle/mobileMainStyle.module.css";
import { ThemeProvider } from "./lib/ThemeProvider";
import dynamic from "next/dynamic";
import MobileFooter from "./layoutType/Mobile/Components/Footer/MobileFooter";
import MobilePopularno from "./layoutType/Mobile/Components/HomepageComponents/MobilePopularno/MobilePopularno";
const MobileNav = dynamic(
  () => import("./layoutType/Mobile/Components/Nav/MobileNav")
);

const geistMono = Barlow_Condensed({
  weight: ["100", "400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grude Online",
  description: "Grudski News Portal",
  openGraph: {
    siteName: "Grude Online",
    description: "Grudski News Portal",
    url: "https://www.grude-online.info/",
    type: "website",
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const deviceType = await detectDevice();

  return (
    <html lang="en">
      <body
        className={`${geistMono.className} ${mobileMainStyle.mobileMainStyle}`}
      >
        <ThemeProvider>
          <MobileNav />
          {children}
          {deviceType === "mobile" && <MobilePopularno />}
          {deviceType === "mobile" && <MobileFooter />}
        </ThemeProvider>
      </body>
    </html>
  );
}
