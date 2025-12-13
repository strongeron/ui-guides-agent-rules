interface PlaceholderExampleProps {
  type: 'bad' | 'good';
  title: string;
}

export function PlaceholderExample({ type, title }: PlaceholderExampleProps) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center p-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          type === 'good' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <span className={`text-2xl ${
            type === 'good' ? 'text-green-600' : 'text-red-600'
          }`}>
            {type === 'good' ? '✓' : '✗'}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {type === 'good' ? 'Good' : 'Bad'} Example
        </h3>
        <p className="text-sm text-gray-600">
          {title}
        </p>
        <p className="text-xs text-gray-500 mt-4">
          Interactive example coming soon
        </p>
      </div>
    </div>
  );
}
