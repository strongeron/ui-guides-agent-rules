export function PreloadFontsBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Custom Font Heading</h3>
        <p className="text-sm text-gray-600">
          When fonts aren't preloaded, you may see a flash of unstyled text (FOUT) or invisible text (FOIT) while the font downloads.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        No preload causes FOUT/FOIT and layout shift
      </p>
    </div>
  );
}
