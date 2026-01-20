export function IbelickSafeAreasGood() {
  return (
    <div className="space-y-4">
      <div className="relative border rounded-[2rem] overflow-hidden bg-background" style={{ height: '280px' }}>
        {/* Simulated iPhone with notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-10" />

        <div className="h-full flex flex-col">
          {/* Header with safe area padding */}
          <div className="bg-primary text-primary-foreground px-4 pt-8 pb-3 text-center">
            <span className="font-medium">App Header</span>
          </div>

          <div className="flex-1 p-4 text-sm text-muted-foreground">
            Content area...
          </div>

          {/* Footer with safe area padding */}
          <div className="bg-muted px-4 pt-3 pb-6 flex justify-around">
            <button className="text-xs">Home</button>
            <button className="text-xs">Search</button>
            <button className="text-xs">Profile</button>
          </div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-black rounded-full" />
      </div>
      <p className="text-xs text-success">
        pt-safe and pb-safe keep content visible around notch and home indicator
      </p>
    </div>
  );
}
