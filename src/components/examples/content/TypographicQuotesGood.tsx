export function TypographicQuotesGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <blockquote className="text-sm text-gray-700 italic mb-2">
          "Design is not just what it looks like and feels like. Design is how it works."
        </blockquote>
        <p className="text-xs text-gray-500">— Steve Jobs</p>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Curly quotes and em dash look professional
      </p>
    </div>
  );
}
