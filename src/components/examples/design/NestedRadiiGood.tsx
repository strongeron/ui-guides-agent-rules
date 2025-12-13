export function NestedRadiiGood() {
  return (
    <div className="w-full max-w-sm flex items-center justify-center py-8">
      <div className="w-48 p-4 bg-blue-100 rounded-xl">
        <div className="p-3 bg-white rounded-lg">
          <p className="text-sm text-gray-700">
            Inner radius = outer - padding. Curves are concentric.
          </p>
        </div>
      </div>
    </div>
  );
}
