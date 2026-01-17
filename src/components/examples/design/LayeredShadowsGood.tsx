export function LayeredShadowsGood() {
  return (
    <div className="w-full max-w-sm flex items-center justify-center py-8">
      <div
        className="w-48 h-32 bg-card rounded-lg flex items-center justify-center"
        style={{
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 25px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p className="text-sm text-muted-foreground text-center px-4">
          Layered shadows (ambient + direct)
        </p>
      </div>
    </div>
  );
}
