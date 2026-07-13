export function CrispBordersGood() {
  return (
    <div className="space-y-4">
      {/* Same light plate as the Bad example, so the edges compare fairly. */}
      <div className="rounded-xl bg-neutral-100 p-8">
        <div className="bg-white rounded-lg p-4 shadow-md border border-black/[0.08]">
          <h3 className="text-base font-semibold mb-1 text-neutral-900">Border and shadow</h3>
          <p className="text-sm text-neutral-600">
            A hairline border draws the edge; the shadow does the lifting.
          </p>
        </div>
      </div>
      <p className="text-xs text-success">
        A semi-transparent hairline (<code>border-black/[0.08]</code>) defines the edge while the shadow conveys
        elevation. Crisp, not muddy
      </p>
    </div>
  );
}
