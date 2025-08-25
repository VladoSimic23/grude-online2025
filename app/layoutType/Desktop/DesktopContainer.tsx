import React from "react";
import NaslovneVijesti from "./NaslovneVijesti/NaslovneVijesti";
import NajnovijeDesktop from "./NajnovijeDesktop/NajnovijeDesktop";
import GrudeOnlineDesktop from "./GrudeOnline/GrudeOnlineDesktop";
import PromoDesktop from "./Promo/PromoDesktop";
import PopularnoDesktop from "./Popularno/PopularnoDesktop";

const DesktopContainer = () => {
  return (
    <div className="container">
      <NaslovneVijesti />
      <div className="grid">
        <div className="col-8">
          <NajnovijeDesktop />
          <GrudeOnlineDesktop />
          <PromoDesktop />
        </div>
        <div className="col-4">
          <PopularnoDesktop />
        </div>
      </div>
    </div>
  );
};

export default DesktopContainer;
