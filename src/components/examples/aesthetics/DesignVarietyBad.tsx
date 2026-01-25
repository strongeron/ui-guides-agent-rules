export function DesignVarietyBad() {
  return (
    <div className="w-full max-w-lg p-4 bg-white rounded-lg">
      <div className="grid grid-cols-3 gap-4">
        {/* Project Card 1 */}
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
          }}
        >
          <div
            className="w-full h-16 rounded-md mb-3"
            style={{ backgroundColor: '#3b82f6' }}
          />
          <h4
            className="text-sm font-medium mb-1"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1f2937' }}
          >
            Analytics Pro
          </h4>
          <p
            className="text-xs"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#6b7280' }}
          >
            Dashboard tool
          </p>
        </div>

        {/* Project Card 2 */}
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
          }}
        >
          <div
            className="w-full h-16 rounded-md mb-3"
            style={{ backgroundColor: '#3b82f6' }}
          />
          <h4
            className="text-sm font-medium mb-1"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1f2937' }}
          >
            CloudSync
          </h4>
          <p
            className="text-xs"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#6b7280' }}
          >
            Storage solution
          </p>
        </div>

        {/* Project Card 3 */}
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
          }}
        >
          <div
            className="w-full h-16 rounded-md mb-3"
            style={{ backgroundColor: '#3b82f6' }}
          />
          <h4
            className="text-sm font-medium mb-1"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1f2937' }}
          >
            TaskFlow
          </h4>
          <p
            className="text-xs"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#6b7280' }}
          >
            Project manager
          </p>
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        Three identical cards: same Inter font, same blue accent, same white background, same rounded corners - completely interchangeable
      </p>
    </div>
  );
}
