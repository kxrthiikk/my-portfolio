export interface MissionLog {
  id: string;
  year: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  technologies: string[];
  impact: string;
}

export const missionLogs: MissionLog[] = [
  {
    id: "gimac-aggregator",
    year: "2026",
    title: "Integrated GIMAC Aggregator",
    category: "Payments Infrastructure",
    problem:
      "Enterprise clients required a unified payment aggregator supporting multiple rails with real-time reconciliation.",
    solution:
      "Architected and integrated the GIMAC aggregator with idempotent transaction handling, webhook verification, and admin monitoring dashboards.",
    technologies: ["PHP", "Yii2", "MySQL", "REST APIs", "Webhooks"],
    impact:
      "Enabled multi-rail payment processing with 99.9% uptime and reduced reconciliation time by 70%.",
  },
  {
    id: "whatsapp-template-engine",
    year: "2026",
    title: "Built WhatsApp Template Engine",
    category: "Automation Systems",
    problem:
      "Marketing and support teams needed dynamic, approved WhatsApp templates without developer intervention.",
    solution:
      "Created a template management engine with variable substitution, approval workflows, and delivery tracking integrated with Meta's Business API.",
    technologies: ["PHP", "WhatsApp Business API", "MySQL", "Queue Workers"],
    impact:
      "Reduced template deployment time from days to minutes and increased message delivery success rate.",
  },
  {
    id: "google-ads-lead-sync",
    year: "2026",
    title: "Implemented Google Ads Lead Sync",
    category: "CRM Integrations",
    problem:
      "Sales teams lost leads due to manual transfer between Google Ads and internal CRM systems.",
    solution:
      "Built an automated lead sync pipeline with OAuth authentication, deduplication logic, and real-time CRM record creation.",
    technologies: ["PHP", "Google Ads API", "OAuth 2.0", "CRM APIs"],
    impact:
      "Eliminated manual lead entry and improved lead response time by 85%.",
  },
  {
    id: "realtime-notifications",
    year: "2026",
    title: "Developed Real-Time Notifications",
    category: "Infrastructure",
    problem:
      "Users and admins lacked timely visibility into critical system events and transaction updates.",
    solution:
      "Implemented a notification infrastructure with push delivery, in-app alerts, and configurable event triggers across services.",
    technologies: ["PHP", "WebSockets", "FCM", "MySQL", "Redis"],
    impact:
      "Delivered sub-second notification latency and improved operational response times across teams.",
  },
];
