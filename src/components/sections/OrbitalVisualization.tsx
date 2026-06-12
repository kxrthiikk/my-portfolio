import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useId, useState } from "react";
import { orbitalNodes } from "@/data/orbitalNodes";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const ORBIT_RADIUS = 120;
const CENTER = 160;
const VIEW_SIZE = 320;

function polarToCartesian(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

export function OrbitalVisualization() {
  const gradientId = useId();
  const reducedMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const displayNode = hoveredNode ?? activeNode;
  const selected = orbitalNodes.find((n) => n.id === displayNode);

  const handleNodeInteraction = useCallback((id: string) => {
    setActiveNode((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div
      className="relative flex w-full flex-col items-center"
      role="img"
      aria-label="Orbital systems visualization showing Karthik's technical expertise areas"
    >
      <div className="relative aspect-square w-full max-w-[320px]">
        <svg
          viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Outer orbit ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={ORBIT_RADIUS}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          {/* Inner orbit ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={ORBIT_RADIUS * 0.55}
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />

          {/* Ambient rotation group */}
          <motion.g
            animate={reducedMotion ? {} : { rotate: 360 }}
            transition={
              reducedMotion
                ? {}
                : { duration: 120, repeat: Infinity, ease: "linear" }
            }
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          >
            {orbitalNodes.map((node) => {
              const pos = polarToCartesian(node.angle, ORBIT_RADIUS);
              const isActive = displayNode === node.id;

              return (
                <g key={node.id}>
                  <line
                    x1={CENTER}
                    y1={CENTER}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="var(--border)"
                    strokeWidth="1"
                    strokeOpacity={isActive ? 0.8 : 0.3}
                  />
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 5 : 3}
                    fill={isActive ? "var(--accent)" : "var(--muted-fg)"}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </motion.g>

          {/* Counter-rotating labels */}
          <motion.g
            animate={reducedMotion ? {} : { rotate: -360 }}
            transition={
              reducedMotion
                ? {}
                : { duration: 120, repeat: Infinity, ease: "linear" }
            }
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          >
            {orbitalNodes.map((node) => {
              const pos = polarToCartesian(node.angle, ORBIT_RADIUS + 28);
              const isActive = displayNode === node.id;

              return (
                <text
                  key={`label-${node.id}`}
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={cn(
                    "cursor-pointer select-none text-[10px] font-medium transition-opacity duration-300",
                    isActive ? "fill-accent" : "fill-muted-foreground",
                  )}
                  style={{ fontFamily: "var(--font-sans)" }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => handleNodeInteraction(node.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleNodeInteraction(node.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.label}: ${node.description}`}
                >
                  {node.label}
                </text>
              );
            })}
          </motion.g>

          {/* Center */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={36}
            fill={`url(#${gradientId})`}
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x={CENTER}
            y={CENTER}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-sm font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Karthik
          </text>
        </svg>

        {/* Interactive hit areas for mobile */}
        <div className="absolute inset-0 md:hidden" aria-hidden="true">
          {orbitalNodes.map((node) => {
            const pos = polarToCartesian(node.angle, ORBIT_RADIUS);
            const left = (pos.x / VIEW_SIZE) * 100;
            const top = (pos.y / VIEW_SIZE) * 100;
            return (
              <button
                key={`hit-${node.id}`}
                type="button"
                className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ left: `${left}%`, top: `${top}%` }}
                onClick={() => handleNodeInteraction(node.id)}
                aria-label={`View details for ${node.label}`}
              />
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-4 w-full max-w-sm rounded-lg border border-border bg-surface px-4 py-3 text-center"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm font-medium text-foreground">{selected.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {selected.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!selected && (
        <p className="mt-4 text-xs text-muted-foreground md:hidden">
          Tap a node to explore
        </p>
      )}
      {!selected && (
        <p className="mt-4 hidden text-xs text-muted-foreground md:block">
          Hover a node to explore
        </p>
      )}
    </div>
  );
}
