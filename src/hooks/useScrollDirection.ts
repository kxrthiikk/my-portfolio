import { useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState<ScrollDirection>("up");
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);

      if (Math.abs(currentY - lastScrollY.current) < threshold) return;

      setDirection(currentY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { direction, scrollY, isAtTop: scrollY < 50 };
}
