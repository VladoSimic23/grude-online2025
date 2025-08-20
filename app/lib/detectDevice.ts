"use server";

import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export type DeviceType = "mobile" | "tablet" | "desktop";

export const detectDevice = async (): Promise<DeviceType> => {
  if (typeof process === "undefined") {
    throw new Error(
      "[Server method] You are importing a server-only module outside of server context."
    );
  }

  const ua = (await headers()).get("user-agent") || "";

  const device = new UAParser(ua).getDevice();
  const deviceType = device.type; // 'mobile' | 'tablet' | undefined

  switch (deviceType) {
    case "mobile":
      return "mobile";
    case "tablet":
      return "tablet";
    default:
      return "desktop";
  }
};
