"use client";

import { useSiteChrome } from "@/lib/context/site-chrome";
import AboutServiceModal from "./AboutServiceModal";

export default function AboutModalHost() {
  const { openPanel, setOpenPanel } = useSiteChrome();

  if (openPanel !== "about") return null;

  return <AboutServiceModal onClose={() => setOpenPanel(null)} />;
}
