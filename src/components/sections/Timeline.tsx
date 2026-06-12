import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { timelineMilestones } from "@/data/timeline";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="timeline"
      className="section-padding py-24"
      aria-labelledby="timeline-heading"
      ref={containerRef}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Career
          </p>
          <h2
            id="timeline-heading"
            className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Timeline
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            A progression of systems built, integrations shipped, and skills
            developed.
          </p>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 h-px bg-border" />
            {!reducedMotion && (
              <motion.div
                className="absolute left-0 top-6 h-px bg-accent"
                style={{ width: progressWidth }}
              />
            )}
            <div className="relative grid grid-cols-5 gap-4">
              {timelineMilestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  className="flex flex-col items-center text-center"
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <div
                    className={cn(
                      "relative z-10 flex h-3 w-3 items-center justify-center rounded-full border-2 bg-surface",
                      milestone.isPresent
                        ? "border-accent"
                        : "border-border",
                    )}
                  >
                    {milestone.isPresent && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    )}
                  </div>
                  <p className="mt-6 font-mono text-xs text-muted-foreground">
                    {milestone.year}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold">{milestone.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden">
          <div className="relative ml-3 border-l border-border pl-8">
            {!reducedMotion && (
              <motion.div
                className="absolute left-0 top-0 w-px bg-accent"
                style={{ height: progressWidth }}
              />
            )}
            <div className="flex flex-col gap-10">
              {timelineMilestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  className="relative"
                  initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <div
                    className={cn(
                      "absolute -left-[2.125rem] flex h-3 w-3 items-center justify-center rounded-full border-2 bg-surface",
                      milestone.isPresent
                        ? "border-accent"
                        : "border-border",
                    )}
                  >
                    {milestone.isPresent && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    )}
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">
                    {milestone.year}
                  </p>
                  <h3 className="mt-1 text-base font-semibold">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
