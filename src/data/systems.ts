export type SystemStatus = "operational" | "learning";

export interface System {
  id: string;
  name: string;
  status: SystemStatus;
  capabilities: string[];
  description: string;
}

export const systems: System[] = [
  {
    id: "backend",
    name: "Backend Systems",
    status: "operational",
    capabilities: ["PHP", "Yii2", "MySQL", "REST APIs"],
    description:
      "Core application architecture, database design, and API development powering production systems.",
  },
  {
    id: "integrations",
    name: "Integrations",
    status: "operational",
    capabilities: ["WhatsApp Business", "Payment Gateways", "OAuth", "Webhooks"],
    description:
      "Third-party service integrations connecting platforms, payment rails, and communication channels.",
  },
  {
    id: "frontend",
    name: "Frontend Expansion",
    status: "learning",
    capabilities: ["React", "TypeScript", "Node.js", "Express"],
    description:
      "Growing full-stack capabilities with modern JavaScript tooling and component-driven development.",
  },
];
