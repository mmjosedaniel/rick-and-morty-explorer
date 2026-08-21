import type { ReactNode } from "react";

interface ShellProps {
  readonly children?: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="application-shell">
      <header className="application-header">
        <h1 className="text-3xl">Rick and Morty Explorer</h1>
      </header>
      <main className="application-main">{children}</main>
    </div>
  );
}
