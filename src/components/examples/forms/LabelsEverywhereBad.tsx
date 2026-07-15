import { ScreenReaderView } from '@/components/demo-kit/ScreenReaderView';

export function LabelsEverywhereBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <ScreenReaderView>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Full Name"
          />
          <input
            type="email"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Email"
          />
          <input
            type="tel"
            className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Phone"
          />
        </div>
      </ScreenReaderView>
      <p className="text-xs text-muted-foreground">
        No labels — turn on the emulation: every field announces as an unnamed text field (the placeholder is not a name).
      </p>
    </div>
  );
}
