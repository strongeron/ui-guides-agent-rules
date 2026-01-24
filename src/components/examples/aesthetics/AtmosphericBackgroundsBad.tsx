export function AtmosphericBackgroundsBad() {
  return (
    <div className="w-full max-w-md">
      <div
        className="p-8 rounded-lg"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        <h3 className="text-lg font-semibold text-white mb-2">
          Plain Background
        </h3>
        <p className="text-sm text-gray-400">
          A flat, solid color background with no depth or atmosphere.
          Content floats on a lifeless surface.
        </p>
      </div>
      <p className="text-xs text-destructive mt-4">
        Solid backgrounds feel flat and lack visual depth
      </p>
    </div>
  );
}
