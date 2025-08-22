import { Metadata } from "next";
//import PostListCategory from "@/app/Components/DesktopComponents/PostListCategory/PostListCategory";
//import PostListCategoryClient from "@/app/Components/DesktopComponents/PostListCategory/PostListCategoryClient";
//import Popularno from "@/app/Components/DesktopComponents/Popularno/Popularno";
import { getPostsByCategorySmall } from "../../functions/queries/postsByCategorySmall";
import { detectDevice } from "../../lib/detectDevice";
import MobilePostListByCategory from "../../layoutType/Mobile/Components/MobilePostListCategory/MobilePostListCategory";
import MobilePostListByCategoryClient from "../../layoutType/Mobile/Components/MobilePostListCategory/MobilePostListCategoryClient/MobilePostListCategoryClient";

export const metadata: Metadata = {
  title: "Arhiva Lifestyle - Grude Online",
  description: "Kategorija - Lifestyle",
  openGraph: {
    url: "https://www.grude-online.info/category/lifestyle",
    description: "Kategorija - Lifestyle",
    type: "article",
    siteName: "Grude Online",
    locale: "hr_HR",
  },
};

const Lifestyle = async () => {
  const deviceType = await detectDevice();
  const data = await getPostsByCategorySmall(
    "Lifestyle",
    10,
    deviceType === "mobile" ? "MEDIUM" : "LARGE"
  );

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      {deviceType === "mobile" && <h1 className={`orangeBorder`}>Lifestyle</h1>}
      {deviceType === "mobile" && <MobilePostListByCategory data={data} />}
      {deviceType === "mobile" && (
        <MobilePostListByCategoryClient category="Lifestyle" />
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

export default Lifestyle;
