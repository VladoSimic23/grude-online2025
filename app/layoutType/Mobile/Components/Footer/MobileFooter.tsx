import Link from "next/link";
import Image from "next/image";
import OsmrtniceImg from "../../../../../public/osmrtniceReklama.jpeg";
import "./css/footerMobile.scss";

const MobileFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footerLower">
      <div className="container">
        <div className="flexFooter">
          <Link
            href={"https://www.facebook.com/GrudeOnline/"}
            target="_blank"
            aria-label="Posjetite naš Facebook profil"
          >
            <i className="bi bi-facebook"></i>
          </Link>
          <Link
            href={"https://www.instagram.com/grudeonline/"}
            target="_blank"
            aria-label="Posjetite naš Instagram profil"
          >
            <i className="bi bi-instagram"></i>
          </Link>
          <Link
            href={"https://www.youtube.com/channel/UC0tJO-t-CtXhSqIHpE7JaCg"}
            target="_blank"
            aria-label="Posjetite naš Youtube kanal"
          >
            <i className="bi bi-youtube"></i>
          </Link>
        </div>

        <div className="osmrtniceFooter">
          <Link href={"https://www.osmrtnica.ba/"} target="_blank">
            {" "}
            <Image
              src={OsmrtniceImg}
              alt="osmrtnice"
              width={300}
              height={100}
              quality={20}
            />
          </Link>
        </div>

        <div className="copyrights">
          <p style={{ color: "#e4e4e4" }}>
            @ 2007 - {currentYear} Grude Online. All Right Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
