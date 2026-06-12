export interface OrbitalNode {
  id: string;
  label: string;
  description: string;
  angle: number;
}

export const orbitalNodes: OrbitalNode[] = [
  {
    id: "payments",
    label: "Payments",
    description:
      "Integrated multiple payment gateways and enterprise aggregators across production systems.",
    angle: 0,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    description:
      "Built WhatsApp Business API integrations, template engines, and automated messaging workflows.",
    angle: 51.4,
  },
  {
    id: "crm",
    label: "CRM",
    description:
      "Developed CRM solutions with lead sync, customer lifecycle management, and reporting pipelines.",
    angle: 102.8,
  },
  {
    id: "apis",
    label: "APIs",
    description:
      "Designed and maintained RESTful APIs powering mobile apps, admin panels, and third-party integrations.",
    angle: 154.3,
  },
  {
    id: "automation",
    label: "Automation",
    description:
      "Engineered background jobs, webhook handlers, and workflow automation to reduce manual operations.",
    angle: 205.7,
  },
  {
    id: "react",
    label: "React",
    description:
      "Expanding frontend capabilities with React, TypeScript, and modern component architecture.",
    angle: 257.1,
  },
  {
    id: "nodejs",
    label: "Node.js",
    description:
      "Building scalable backend services with Node.js and Express for new product initiatives.",
    angle: 308.6,
  },
];
