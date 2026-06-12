import { motion } from "framer-motion";
import { Activity, BookOpen, Server } from "lucide-react";
import { systems, type SystemStatus } from "@/data/systems";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const icons = {
  backend: Server,
  integrations: Activity,
  frontend: BookOpen,
};

const statusConfig: Record<
  SystemStatus,
  { label: string; dotClass: string; textClass: string }
> = {
  operational: {
    label: "Operational",
    dotClass: "bg-[var(--color-status-operational)]",
    textClass: "text-[var(--color-status-operational)]",
  },
  learning: {
    label: "Learning",
    dotClass: "bg-[var(--color-status-learning)]",
    textClass: "text-[var(--color-status-learning)]",
  },
};

export function Systems() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="systems"
      className="section-padding py-24"
      aria-labelledby="systems-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Infrastructure
          </p>
          <h2
            id="systems-heading"
            className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Systems
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Expertise represented as operational systems with live status
            indicators.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((system, index) => {
            const Icon = icons[system.id as keyof typeof icons] ?? Server;
            const status = statusConfig[system.status];

            return (
              <motion.article
                key={system.id}
                className="bento-card group"
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn("h-2 w-2 rounded-full", status.dotClass)}
                      aria-hidden="true"
                    />
                    <span className={cn("text-xs font-medium", status.textClass)}>
                      {status.label}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold tracking-tight">
                  {system.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {system.description}
                </p>

                <div className="mt-6">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Capabilities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {system.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-foreground"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
