import { Edit, Trash2, Share2 } from 'lucide-react';

export function IconsHaveLabelsBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-2">
        <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
          <Edit className="w-5 h-5 text-gray-700" />
        </button>
        <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
          <Trash2 className="w-5 h-5 text-gray-700" />
        </button>
        <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
          <Share2 className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Icon-only buttons have no accessible labels
      </p>
    </div>
  );
}
