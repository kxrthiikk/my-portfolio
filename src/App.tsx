import { lazy, Suspense } from "react";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { NoiseTexture } from "@/components/NoiseTexture";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { MissionOverview } from "@/components/sections/MissionOverview";
import { useCommandPalette } from "@/hooks/useCommandPalette";

const MissionLogs = lazy(() =>
  import("@/components/sections/MissionLogs").then((m) => ({
    default: m.MissionLogs,
  })),
);
const Systems = lazy(() =>
  import("@/components/sections/Systems").then((m) => ({
    default: m.Systems,
  })),
);
const Timeline = lazy(() =>
  import("@/components/sections/Timeline").then((m) => ({
    default: m.Timeline,
  })),
);

function SectionFallback() {
  return <div className="section-padding py-24" aria-hidden="true" />;
}

export default function App() {
  const { open, setOpen } = useCommandPalette();

  return (
    <div className="relative min-h-screen">
      <NoiseTexture />
      <a
        href="#mission"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <Navigation onOpenCommand={() => setOpen(true)} />

      <main className="relative z-10">
        <Hero onContact={() => setOpen(true)} />
        <MissionOverview />

        <Suspense fallback={<SectionFallback />}>
          <Systems />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <MissionLogs />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Timeline />
        </Suspense>

        <Contact onOpenCommand={() => setOpen(true)} />
      </main>

      <Footer />
      <CommandPalette open={open} onOpenChange={setOpen} />
    </div>
  );
}
