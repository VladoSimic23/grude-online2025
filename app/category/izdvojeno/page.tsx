import { Metadata } from "next";
//import PostListCategory from "@/app/Components/DesktopComponents/PostListCategory/PostListCategory";
//import PostListCategoryClient from "@/app/Components/DesktopComponents/PostListCategory/PostListCategoryClient";
//import Popularno from "@/app/Components/DesktopComponents/Popularno/Popularno";
import { getPostsByCategorySmall } from "../../functions/queries/postsByCategorySmall";
import { detectDevice } from "../../lib/detectDevice";
import MobilePostListByCategory from "../../layoutType/Mobile/Components/MobilePostListCategory/MobilePostListCategory";
import MobilePostListByCategoryClient from "../../layoutType/Mobile/Components/MobilePostListCategory/MobilePostListCategoryClient/MobilePostListCategoryClient";

export const metadata: Metadata = {
  title: "Arhiva Izdvojeno - Grude Online",
  description: "Kategorija - Izdvojeno",
  openGraph: {
    url: "https://www.grude-online.info/category/izdvojeno",
    description: "Kategorija - Izdvojeno",
    type: "article",
    siteName: "Grude Online",
    locale: "hr_HR",
  },
};

const Izdvojeno = async () => {
  const deviceType = await detectDevice();
  const data = await getPostsByCategorySmall(
    "Izdvojeno",
    10,
    deviceType === "mobile" ? "MEDIUM" : "LARGE"
  );

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      {deviceType === "mobile" && <h1 className={`orangeBorder`}>Izdvojeno</h1>}
      {deviceType === "mobile" && <MobilePostListByCategory data={data} />}
      {deviceType === "mobile" && (
        <MobilePostListByCategoryClient category="Izdvojeno" />
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

export default Izdvojeno;
