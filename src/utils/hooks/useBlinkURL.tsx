import { useMemo } from "react";
import URL_UTILS from "..";

/**
 * We get the reference of a div and we want to add a blinking effect for a second to it, blinking the border of the div
 */
export const useBlinkURL = (id: string, callback: () => void) => {
  const ref = useMemo(() => document.getElementById(`url-card-${id}`), [id]);

  const blink = (newUrl?: string) => {
    let urlRef: HTMLElement | null = ref;
    const oldBorder = ref?.style.border ?? "1px solid black";
    if (newUrl) {
      urlRef = document.getElementById(`url-card-${new URL(URL_UTILS.makeProper(newUrl)).href}`) ?? null;
    }
    if (!urlRef) return;
    urlRef.style.border = "2px dashed black";

    setTimeout(() => {
      if (!urlRef) return;
      urlRef.style.border = oldBorder as string;
      callback();
    }, 2000);
  };

  return { blink };
};
