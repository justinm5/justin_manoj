import { useEffect, useMemo, useState } from "react";

/**
 * Returns the id of the section currently closest to the top of the viewport.
 */
export const useScrollSpy = (ids: string[], offset = 140) => {
  const key = ids.join(",");
  const stableIds = useMemo(() => (key ? key.split(",") : []), [key]);
  const [activeId, setActiveId] = useState(stableIds[0] ?? "");

  useEffect(() => {
    if (stableIds.length === 0) return;

    const onScroll = () => {
      let current = stableIds[0];

      for (const id of stableIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 24;
      setActiveId(nearBottom ? stableIds[stableIds.length - 1] : current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [stableIds, offset]);

  return activeId;
};
