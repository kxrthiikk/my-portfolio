import { motion } from "framer-motion";
import { ArrowDown, FileText, MessageCircle } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { OrbitalVisualization } from "@/components/sections/OrbitalVisualization";
import { Button } from "@/components/ui/button";
import { RESUME_URL } from "@/data/commands";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroProps {
  onContact: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

export function Hero({ onContact }: HeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="mission"
      className="section-padding relative flex min-h-[calc(100vh-4rem)] items-center pt-24 pb-16"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <motion.p
            className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground"
            variants={fadeUp}
            initial={reducedMotion ? false : "hidden"}
            animate="visible"
            custom={0}
          >
            Mission Control
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
            variants={fadeUp}
            initial={reducedMotion ? false : "hidden"}
            animate="visible"
            custom={1}
          >
            Karthik Santhosh
          </motion.h1>

          <motion.p
            className="mt-3 text-lg text-muted-foreground sm:text-xl"
            variants={fadeUp}
            initial={reducedMotion ? false : "hidden"}
            animate="visible"
            custom={2}
          >
            Software Engineer
          </motion.p>

          <motion.p
            className="mt-6 max-w-lg text-balance text-base leading-relaxed text-foreground sm:text-lg"
            variants={fadeUp}
            initial={reducedMotion ? false : "hidden"}
            animate="visible"
            custom={3}
          >
            I build systems that integrate, automate, and scale.
          </motion.p>

          <motion.p
            className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
            variants={fadeUp}
            initial={reducedMotion ? false : "hidden"}
            animate="visible"
            custom={4}
          >
            Backend-focused engineer specializing in APIs, payment systems, CRM
            solutions, and automation. Currently expanding into Node.js and React.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            variants={fadeUp}
            initial={reducedMotion ? false : "hidden"}
            animate="visible"
            custom={5}
          >
            <MagneticButton>
              <Button asChild size="lg">
                <a href={RESUME_URL} download>
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Resume
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button variant="outline" size="lg" onClick={onContact}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Contact
              </Button>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center lg:justify-end"
          variants={fadeUp}
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          custom={3}
        >
          <OrbitalVisualization />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-hidden="true"
      >
        <ArrowDown className="h-4 w-4 animate-bounce text-muted-foreground" />
      </motion.div>
    </section>
  );
}
