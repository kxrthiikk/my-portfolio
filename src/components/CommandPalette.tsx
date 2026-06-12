import { useCallback, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { commands } from "@/data/commands";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [copied, setCopied] = useState(false);

  const handleSelect = useCallback(
    async (commandId: string) => {
      const command = commands.find((c) => c.id === commandId);
      if (!command) return;

      if (command.action === "link" && command.href) {
        if (command.href.startsWith("mailto:")) {
          window.location.href = command.href;
        } else {
          window.open(command.href, "_blank", "noopener,noreferrer");
        }
      } else if (command.action === "copy" && command.value) {
        await navigator.clipboard.writeText(command.value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }

      onOpenChange(false);
    },
    [onOpenChange],
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          {commands.map((command) => {
            const Icon = command.icon;
            return (
              <CommandItem
                key={command.id}
                value={[command.label, ...command.keywords].join(" ")}
                onSelect={() => handleSelect(command.id)}
              >
                <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span>{command.label}</span>
                {command.id === "copy-email" && copied && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    Copied!
                  </span>
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          {[
            { id: "mission", label: "Go to Mission" },
            { id: "systems", label: "Go to Systems" },
            { id: "logs", label: "Go to Logs" },
            { id: "timeline", label: "Go to Timeline" },
            { id: "contact", label: "Go to Contact" },
          ].map((nav) => (
            <CommandItem
              key={nav.id}
              value={nav.label}
              onSelect={() => {
                document.getElementById(nav.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                onOpenChange(false);
              }}
            >
              <span>{nav.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
