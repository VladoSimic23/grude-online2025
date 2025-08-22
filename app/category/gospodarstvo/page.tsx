import { Metadata } from "next";
//import PostListCategory from "@/app/Components/DesktopComponents/PostListCategory/PostListCategory";
//import PostListCategoryClient from "@/app/Components/DesktopComponents/PostListCategory/PostListCategoryClient";
//import Popularno from "@/app/Components/DesktopComponents/Popularno/Popularno";
import { getPostsByCategorySmall } from "../../functions/queries/postsByCategorySmall";
import { detectDevice } from "../../lib/detectDevice";
import MobilePostListByCategory from "../../layoutType/Mobile/Components/MobilePostListCategory/MobilePostListCategory";
import MobilePostListByCategoryClient from "../../layoutType/Mobile/Components/MobilePostListCategory/MobilePostListCategoryClient/MobilePostListCategoryClient";

export const metadata: Metadata = {
  title: "Arhiva Gospodarstvo - Grude Online",
  description: "Kategorija - Gospodarstvo",
  openGraph: {
    url: "https://www.grude-online.info/category/gospodarstvo",
    description: "Kategorija - Gospodarstvo",
    type: "article",
    siteName: "Grude Online",
    locale: "hr_HR",
  },
};

const Gospodarstvo = async () => {
  const deviceType = await detectDevice();
  const data = await getPostsByCategorySmall(
    "Gospodarstvo",
    10,
    deviceType === "mobile" ? "MEDIUM" : "LARGE"
  );

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      {deviceType === "mobile" && (
        <h1 className={`orangeBorder`}>Gospodarstvo</h1>
      )}
      {deviceType === "mobile" && <MobilePostListByCategory data={data} />}
      {deviceType === "mobile" && (
        <MobilePostListByCategoryClient category="Gospodarstvo" />
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

export default Gospodarstvo;
