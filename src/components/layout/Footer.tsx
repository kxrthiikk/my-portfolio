export function Footer() {
  return (
    <footer className="section-padding border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Karthik Santhosh
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Mission Control v1.0 — All systems operational
        </p>
      </div>
    </footer>
  );
}
