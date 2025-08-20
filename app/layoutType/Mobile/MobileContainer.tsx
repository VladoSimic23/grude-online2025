import React from "react";
import MobileIzdvojeno from "./Components/HomepageComponents/Izdvojeno/MobileIzdvojeno";
import MobileNajnovijeContainer from "./Components/HomepageComponents/MobileNajnovije/MobileNajnovijeContainer";

const MobileContainer = () => {
  return (
    <div>
      <MobileIzdvojeno />
      <MobileNajnovijeContainer />
    </div>
  );
};

export default MobileContainer;
