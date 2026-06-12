import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Calendar,
  Code2,
  Copy,
  FileText,
  Mail,
} from "lucide-react";

export interface CommandItem {
  id: string;
  label: string;
  keywords: string[];
  icon: LucideIcon;
  action: "link" | "copy" | "scroll";
  href?: string;
  value?: string;
  sectionId?: string;
}

export const CONTACT_EMAIL = "karthik@example.com";
export const LINKEDIN_URL = "https://linkedin.com/in/karthiksanthosh";
export const GITHUB_URL = "https://github.com/karthiksanthosh";
export const RESUME_URL = "/resume.pdf";
export const CALENDLY_URL = "https://calendly.com/karthiksanthosh";

export const commands: CommandItem[] = [
  {
    id: "email",
    label: "Send Email",
    keywords: ["email", "mail", "contact"],
    icon: Mail,
    action: "link",
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    id: "copy-email",
    label: "Copy Email Address",
    keywords: ["copy", "email", "clipboard"],
    icon: Copy,
    action: "copy",
    value: CONTACT_EMAIL,
  },
  {
    id: "linkedin",
    label: "Open LinkedIn",
    keywords: ["linkedin", "social", "profile"],
    icon: Briefcase,
    action: "link",
    href: LINKEDIN_URL,
  },
  {
    id: "github",
    label: "Open GitHub",
    keywords: ["github", "code", "repos"],
    icon: Code2,
    action: "link",
    href: GITHUB_URL,
  },
  {
    id: "resume",
    label: "Download Resume",
    keywords: ["resume", "cv", "download"],
    icon: FileText,
    action: "link",
    href: RESUME_URL,
  },
  {
    id: "schedule-call",
    label: "Schedule a Call",
    keywords: ["schedule", "call", "meeting", "calendar"],
    icon: Calendar,
    action: "link",
    href: CALENDLY_URL,
  },
];
