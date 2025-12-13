export function LayeredShadowsBad() {
  return (
    <div className="w-full max-w-sm flex items-center justify-center py-8">
      <div
        className="w-48 h-32 bg-white rounded-lg flex items-center justify-center"
        style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        }}
      >
        <p className="text-sm text-gray-600 text-center px-4">
          Single flat shadow
        </p>
      </div>
    </div>
  );
}
