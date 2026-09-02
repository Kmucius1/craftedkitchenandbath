"use client";

import { useEffect } from "react";
import { captureAttributionFromLocation, storeAttributionIfAbsent } from "@/lib/campaign";

// Mounted once in app/layout.tsx. Renders nothing — on first load it snapshots
// any utm_*/ref query params (and the landing path) into sessionStorage so
// lead-intake forms can attach them later, even after the visitor navigates
// away from the landing page and the query params are gone from the URL.
export default function CampaignCapture() {
  useEffect(() => {
    const attribution = captureAttributionFromLocation();
    if (attribution) storeAttributionIfAbsent(attribution);
  }, []);

  return null;
}
