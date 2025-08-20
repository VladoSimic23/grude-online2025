import MobileContainer from "./layoutType/Mobile/MobileContainer";
import { detectDevice } from "./lib/detectDevice";

export default async function Home() {
  const deviceType = await detectDevice();

  if (deviceType === "mobile") {
    return (
      <div style={{ marginTop: "80px" }}>
        <MobileContainer />
      </div>
    );
  }
  if (deviceType === "tablet") {
    return <div>Tablet version is not implemented yet.</div>;
  }
  return (
    <div>
      <h1>dsadasd</h1>
      <h1>dsadsadasdgfdfg</h1>
      <h1>dsadasd</h1>
      <h1>dsadsadasdgfdfg</h1>
      <h1>dsadasd</h1>
      <h1>dsadsadasdgfdfg</h1>
    </div>
  );
}
