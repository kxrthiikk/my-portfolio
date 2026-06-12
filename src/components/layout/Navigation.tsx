import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { NAV_SECTIONS, useActiveSection } from "@/hooks/useActiveSection";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";

interface NavigationProps {
  onOpenCommand: () => void;
}

export function Navigation({ onOpenCommand }: NavigationProps) {
  const { direction, isAtTop } = useScrollDirection();
  const activeSection = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isVisible = direction === "up" || isAtTop;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b border-transparent transition-[border-color,background-color] duration-300",
          !isAtTop && "border-border bg-background/80 backdrop-blur-md",
        )}
        initial={false}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <nav
          className="section-padding mx-auto flex h-16 max-w-6xl items-center justify-between"
          aria-label="Main navigation"
        >
          <button
            type="button"
            onClick={() => scrollToSection("mission")}
            className="text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
            aria-label="Go to top"
          >
            KS
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "relative px-4 py-2 text-sm transition-colors",
                  activeSection === section.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={activeSection === section.id ? "page" : undefined}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-2 -bottom-px h-px bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenCommand}
              className="hidden text-muted-foreground sm:inline-flex"
              aria-label="Open command palette"
            >
              <kbd className="pointer-events-none hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-block">
                ⌘K
              </kbd>
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </motion.header>

      <MobileNav
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenCommand={() => {
          setMobileOpen(false);
          onOpenCommand();
        }}
      />
    </>
  );
}
