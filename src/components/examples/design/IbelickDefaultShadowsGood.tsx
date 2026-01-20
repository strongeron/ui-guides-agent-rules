export function IbelickDefaultShadowsGood() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="p-4 bg-background rounded-lg shadow-sm">
          <p className="font-medium">Card A</p>
          <p className="text-xs text-muted-foreground">shadow-sm</p>
        </div>
        <div className="p-4 bg-background rounded-lg shadow">
          <p className="font-medium">Card B</p>
          <p className="text-xs text-muted-foreground">shadow</p>
        </div>
        <div className="p-4 bg-background rounded-lg shadow-md">
          <p className="font-medium">Card C</p>
          <p className="text-xs text-muted-foreground">shadow-md</p>
        </div>
      </div>
      <p className="text-xs text-success">
        Tailwind defaults - consistent elevation hierarchy across the app
      </p>
    </div>
  );
}
