export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  isPresent?: boolean;
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: "2023",
    year: "2023",
    title: "PHP Foundations",
    description:
      "Built foundational backend skills with PHP, MySQL, and MVC architecture.",
  },
  {
    id: "2024",
    year: "2024",
    title: "CRM Development",
    description:
      "Developed CRM solutions with lead management, reporting, and third-party integrations.",
  },
  {
    id: "2025",
    year: "2025",
    title: "WhatsApp Platform Engineering",
    description:
      "Engineered WhatsApp Business API platforms with template engines and automation workflows.",
  },
  {
    id: "2026",
    year: "2026",
    title: "Payment Infrastructure",
    description:
      "Architected payment gateway integrations and enterprise aggregator systems.",
  },
  {
    id: "present",
    year: "Present",
    title: "Node.js and React",
    description:
      "Expanding into modern JavaScript stack for full-stack product development.",
    isPresent: true,
  },
];
