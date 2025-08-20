import React from "react";
import MobileIzdvojeno from "./Components/HomepageComponents/Izdvojeno/MobileIzdvojeno";
import MobileNajnovijeContainer from "./Components/HomepageComponents/MobileNajnovije/MobileNajnovijeContainer";
import MobileNajnovijeClient from "./Components/HomepageComponents/MobileNajnovije/MobileNajnovijeClient/MobileNajnovijeClient";

const MobileContainer = () => {
  return (
    <div>
      <MobileIzdvojeno />
      <MobileNajnovijeContainer />
      <MobileNajnovijeClient />
    </div>
  );
};

export default MobileContainer;
