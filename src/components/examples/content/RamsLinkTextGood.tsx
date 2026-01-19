export function RamsLinkTextGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Descriptive Link Text</h4>
        <div className="space-y-3 p-3 bg-muted rounded-lg">
          <p className="text-sm">
            Explore our{' '}
            <a href="#" className="text-primary underline hover:no-underline">
              product documentation
            </a>{' '}
            to get started.
          </p>
          <p className="text-sm">
            Questions? Contact{' '}
            <a href="#" className="text-primary underline hover:no-underline">
              customer support
            </a>
            .
          </p>
          <p className="text-sm">
            <a href="#" className="text-primary underline hover:no-underline">
              View pricing plans
            </a>
          </p>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>{'<a href="#">View pricing plans</a>'}</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Screen reader lists: "product documentation, customer support, View pricing plans"
      </p>
    </div>
  );
}
