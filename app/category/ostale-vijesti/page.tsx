import { Metadata } from "next";
//import PostListCategory from "@/app/Components/DesktopComponents/PostListCategory/PostListCategory";
//import PostListCategoryClient from "@/app/Components/DesktopComponents/PostListCategory/PostListCategoryClient";
//import Popularno from "@/app/Components/DesktopComponents/Popularno/Popularno";
import { getPostsByCategorySmall } from "../../functions/queries/postsByCategorySmall";
import { detectDevice } from "../../lib/detectDevice";
import MobilePostListByCategory from "../../layoutType/Mobile/Components/MobilePostListCategory/MobilePostListCategory";
import MobilePostListByCategoryClient from "../../layoutType/Mobile/Components/MobilePostListCategory/MobilePostListCategoryClient/MobilePostListCategoryClient";

export const metadata: Metadata = {
  title: "Arhiva Ostale Vijesti - Grude Online",
  description: "Kategorija - Ostale Vijesti",
  openGraph: {
    url: "https://www.grude-online.info/category/ostale-vijesti",
    description: "Kategorija - Ostale Vijesti",
    type: "article",
    siteName: "Grude Online",
    locale: "hr_HR",
  },
};

const OstaleVijesti = async () => {
  const deviceType = await detectDevice();
  const data = await getPostsByCategorySmall(
    "Ostale-Vijesti",
    10,
    deviceType === "mobile" ? "MEDIUM" : "LARGE"
  );

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      {deviceType === "mobile" && (
        <h1 className={`orangeBorder`}>Ostale-Vijesti</h1>
      )}
      {deviceType === "mobile" && <MobilePostListByCategory data={data} />}
      {deviceType === "mobile" && (
        <MobilePostListByCategoryClient category="Ostale-Vijesti" />
      )}

      {/* {deviceType === "desktop" && (
        <div className="row mt-4">
          <div className="col-lg-8">
            <h1 className={style.h2Desktop}>Crna Kronika</h1>
            <PostListCategory data={data} />
            <PostListCategoryClient category="Crna-Kronika" />
          </div>
          <div className="col-lg-4">
            <Popularno />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default OstaleVijesti;
