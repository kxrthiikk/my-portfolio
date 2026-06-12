import { motion } from "framer-motion";
import { Command, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ContactProps {
  onOpenCommand: () => void;
}

export function Contact({ onOpenCommand }: ContactProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="section-padding py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="bento-card flex flex-col items-center px-6 py-16 text-center sm:px-12"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted">
            <Command className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Command Interface
          </p>
          <h2
            id="contact-heading"
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Let&apos;s connect
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            No contact forms. Use the command palette to reach me — email,
            LinkedIn, GitHub, resume, or schedule a call.
          </p>

          <Button size="lg" className="mt-8 gap-3" onClick={onOpenCommand}>
            Open Command Palette
            <kbd className="hidden items-center gap-1 rounded border border-accent-foreground/20 bg-accent-foreground/10 px-2 py-0.5 font-mono text-xs sm:inline-flex">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </Button>

          <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <CornerDownLeft className="h-3 w-3" aria-hidden="true" />
            <span>Press Enter to execute a command</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
