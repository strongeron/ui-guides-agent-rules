import { Triangle } from 'lucide-react';

export function BrandResourcesBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <nav className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
        {/* Right-clicking gets the plain browser menu — the logo offers nothing. */}
        <Triangle className="w-5 h-5 fill-current text-foreground" />
        <span className="text-sm font-semibold text-foreground">Acme</span>
        <span className="ml-auto text-xs text-muted-foreground">Docs</span>
      </nav>

      <div className="bg-muted border border-border rounded-lg p-3">
        <p className="text-xs font-medium text-foreground mb-1">
          Where a journalist has to go for the logo
        </p>
        <p className="text-xs text-muted-foreground font-mono leading-relaxed">
          Footer → About → Newsroom → Press Kit → &quot;assets-final-v3.zip&quot;
        </p>
      </div>

      <p className="text-xs text-error">
        Right-clicking the logo does nothing, so anyone who needs the mark
        screenshots it — and ships a blurry, wrong-colored logo.
      </p>
    </div>
  );
}
