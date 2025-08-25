import { Metadata } from "next";
import MobileContainer from "./layoutType/Mobile/MobileContainer";
import { detectDevice } from "./lib/detectDevice";
import DesktopContainer from "./layoutType/Desktop/DesktopContainer";

export const metadata: Metadata = {
  title: "Grude Online",
  description: "Grudski News Portal",
  openGraph: {
    siteName: "Grude Online",
    description: "Grudski News Portal",
    url: "https://www.grude-online.info/",
    type: "website",
  },
};

export default async function Home() {
  const deviceType = await detectDevice();

  if (deviceType === "mobile") {
    return (
      <div style={{ marginTop: "58px" }}>
        <MobileContainer />
      </div>
    );
  }
  if (deviceType === "tablet") {
    return <div>Tablet version is not implemented yet.</div>;
  }
  return (
    <div style={{ marginTop: "80px" }}>
      <DesktopContainer />
    </div>
  );
}
