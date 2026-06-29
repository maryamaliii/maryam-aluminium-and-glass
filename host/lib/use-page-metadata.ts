"use client";

import { useEffect } from "react";

export function usePageMetadata(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} | Meer Engineering`;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);

      let ogMeta = document.querySelector('meta[property="og:description"]');
      if (!ogMeta) {
        ogMeta = document.createElement("meta");
        ogMeta.setAttribute("property", "og:description");
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute("content", description);
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", `${title} | Meer Engineering`);
  }, [title, description]);
}
