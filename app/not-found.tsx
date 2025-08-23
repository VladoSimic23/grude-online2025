import Link from "next/link";
//import { isMobileDevice } from "./libs/UserAgent/UserAgent";
import "./layoutType/Mobile/Components/HomepageComponents/Izdvojeno/css/mobileIzdvojeno.scss";

export default async function NotFound() {
  //const isMobile = await isMobileDevice();

  // if (isMobile) {
  //   return (
  //     <div className="container mt-4 text-center p-4">
  //       <h2 className="text-white">404 Not Found</h2>
  //       <p className="text-white">
  //         The post or page you requested is no longer available.
  //       </p>
  //       <Link
  //         className={`${mobileStyles.mobileButton} d-inline-block`}
  //         href="/"
  //       >
  //         Return Home
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <div
      className="container"
      style={{ marginTop: "120px", textAlign: "center" }}
    >
      <h1>404 - Nije pronađeno</h1>
      <p style={{ fontSize: "18px" }}>
        Post ili stranica koju ste tražili više nije dostupna.
      </p>
      <Link
        className="mobileButton"
        href="/"
        style={{ display: "inline-block" }}
      >
        Povratak na početnu
      </Link>
    </div>
  );
}
