import { motion } from "framer-motion";
import { Boxes, Link2, Rocket, Workflow } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const pillars = [
  {
    id: "build",
    icon: Boxes,
    title: "Build",
    description: "Architect robust backend systems and APIs that power production workloads.",
  },
  {
    id: "integrate",
    icon: Link2,
    title: "Integrate",
    description: "Connect payment rails, messaging platforms, and third-party services seamlessly.",
  },
  {
    id: "automate",
    icon: Workflow,
    title: "Automate",
    description: "Eliminate manual workflows with jobs, webhooks, and intelligent pipelines.",
  },
  {
    id: "deliver",
    icon: Rocket,
    title: "Deliver",
    description: "Ship reliable solutions with measurable impact and operational excellence.",
  },
];

export function MissionOverview() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-padding pb-16" aria-label="Mission pillars">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.article
              key={pillar.id}
              className="bento-card"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-semibold tracking-tight">{pillar.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
