import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ImageIcon } from "lucide-react";
import { useState } from "react";
import { missionLogs } from "@/data/missionLogs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

function LogEntry({
  log,
  isOpen,
  onToggle,
}: {
  log: (typeof missionLogs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center gap-4 py-5 text-left transition-colors hover:bg-muted/50"
        aria-expanded={isOpen}
        aria-controls={`log-detail-${log.id}`}
      >
        <span className="w-12 shrink-0 font-mono text-xs text-muted-foreground">
          {log.year}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground transition-colors group-hover:text-accent">
            {log.title}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">{log.category}</p>
        </div>
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-90",
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`log-detail-${log.id}`}
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-16 pr-4">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Problem
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {log.problem}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Solution
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {log.solution}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Technologies
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {log.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Impact
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {log.impact}
                </p>
              </div>

              <div
                className="mt-6 flex aspect-video items-center justify-center rounded-lg border border-dashed border-border bg-muted"
                role="img"
                aria-label={`Screenshot placeholder for ${log.title}`}
              >
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="mx-auto h-8 w-8 opacity-40" aria-hidden="true" />
                  <p className="mt-2 text-xs">Screenshot placeholder</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MissionLogs() {
  const [openId, setOpenId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="logs"
      className="section-padding py-24"
      aria-labelledby="logs-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Operations
          </p>
          <h2
            id="logs-heading"
            className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Mission Logs
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Projects documented as operational event logs. Expand any entry for
            full mission details.
          </p>
        </div>

        <motion.div
          className="bento-card overflow-hidden !p-0"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="border-b border-border px-6 py-4">
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-[var(--color-status-operational)]" />
              <span>event_log.sys — {missionLogs.length} entries</span>
            </div>
          </div>
          <div className="px-6">
            {missionLogs.map((log) => (
              <LogEntry
                key={log.id}
                log={log}
                isOpen={openId === log.id}
                onToggle={() =>
                  setOpenId((prev) => (prev === log.id ? null : log.id))
                }
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
