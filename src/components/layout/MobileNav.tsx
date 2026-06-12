import { Command } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_SECTIONS, type SectionId } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSection: SectionId;
  onNavigate: (id: string) => void;
  onOpenCommand: () => void;
}

export function MobileNav({
  open,
  onOpenChange,
  activeSection,
  onNavigate,
  onOpenCommand,
}: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-xs">
        <SheetTitle className="mb-8 text-left text-sm font-medium text-muted-foreground">
          Navigation
        </SheetTitle>
        <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => onNavigate(section.id)}
              className={cn(
                "rounded-lg px-4 py-3 text-left text-base transition-colors",
                activeSection === section.id
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              aria-current={activeSection === section.id ? "page" : undefined}
            >
              {section.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onOpenCommand}
            className="mt-4 flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-left text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Command className="h-4 w-4" aria-hidden="true" />
            <span>Command Menu</span>
            <kbd className="ml-auto rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
