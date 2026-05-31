"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useAdminDoubleTap() {
  const [lastTap, setLastTap] = useState(0);
  const router = useRouter();

  const handleDoubleTap = (e: React.MouseEvent) => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTap;

    if (timeSinceLastTap < 500 && timeSinceLastTap > 0) {
      e.preventDefault();
      e.stopPropagation();
      setLastTap(0);
      window.dispatchEvent(new CustomEvent("open-admin-modal"));
    } else {
      e.preventDefault();
      setLastTap(now);
      setTimeout(() => {
        setLastTap((prev) => {
          if (prev === now) {
            router.push("/");
          }
          return prev;
        });
      }, 500);
    }
  };

  return handleDoubleTap;
}
