export function ResponsiveCoverageBad() {
  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-lg p-4" style={{ width: '800px' }}>
        <h3 className="text-lg font-semibold mb-4">Dashboard</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded">Metric 1</div>
          <div className="p-4 bg-blue-50 rounded">Metric 2</div>
          <div className="p-4 bg-blue-50 rounded">Metric 3</div>
          <div className="p-4 bg-blue-50 rounded">Metric 4</div>
        </div>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Fixed width causes horizontal scroll on smaller screens
      </p>
    </div>
  );
}
