import {
  getMobileIzdvojeno,
  IzdvojenoSourceMobileI,
} from "@/app/functions/queries/mobileIzdvojeno";
import MobileIzdvojenoVijesti from "./MobileIzdvojenoVijesti";

const MobileIzdvojeno = async () => {
  const recentPosts: IzdvojenoSourceMobileI = await getMobileIzdvojeno(
    "izdvojeno",
    3
  );
  const {
    posts: { nodes },
  } = recentPosts;

  return (
    <div>
      <MobileIzdvojenoVijesti vijesti={nodes} />
    </div>
  );
};

export default MobileIzdvojeno;
