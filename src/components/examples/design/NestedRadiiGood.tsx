export function NestedRadiiGood() {
  return (
    <div className="w-full max-w-sm flex items-center justify-center py-8">
      <div className="w-48 p-4 bg-primary/10 rounded-xl">
        <div className="p-3 bg-card rounded-lg">
          <p className="text-sm text-foreground">
            Inner radius = outer - padding. Curves are concentric.
          </p>
        </div>
      </div>
    </div>
  );
}
