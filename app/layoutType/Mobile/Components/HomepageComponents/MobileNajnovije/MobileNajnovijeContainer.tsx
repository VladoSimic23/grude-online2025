import {
  getRecentPostsHomepage,
  RecentPostsSourceI,
} from "@/app/functions/queries/recentPosts";
import MobileNajnovijeDetails from "./MobileNajnovijeDetails";
import MobilePromo from "../../MobilePromo/MobilePromo";

const MobileNajnovijeContainer = async () => {
  const najnovije: RecentPostsSourceI = await getRecentPostsHomepage(10);

  const {
    posts: { nodes },
  } = najnovije;

  return (
    <div style={{ marginTop: "40px" }}>
      <div className="container">
        {nodes.slice(0, 5).map((item, index) => {
          return (
            <MobileNajnovijeDetails key={index} props={item} index={index} />
          );
        })}
      </div>

      <MobilePromo />
      <div className="container">
        {nodes.slice(5, 10).map((item, index) => {
          return (
            <MobileNajnovijeDetails key={index} props={item} index={index} />
          );
        })}
      </div>
    </div>
  );
};

export default MobileNajnovijeContainer;
