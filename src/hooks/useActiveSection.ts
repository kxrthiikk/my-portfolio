import { useEffect, useState } from "react";

const SECTION_IDS = ["mission", "systems", "logs", "timeline", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>("mission");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return activeSection;
}

export const NAV_SECTIONS = [
  { id: "mission" as const, label: "Mission" },
  { id: "systems" as const, label: "Systems" },
  { id: "logs" as const, label: "Logs" },
  { id: "timeline" as const, label: "Timeline" },
  { id: "contact" as const, label: "Contact" },
];
