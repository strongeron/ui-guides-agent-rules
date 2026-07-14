export function DescriptiveLinkTextBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Generic Link Text</h4>
        <div className="space-y-3 p-3 bg-muted rounded-lg">
          <p className="text-sm">
            To see our documentation,{' '}
            <a href="#" className="text-primary underline hover:no-underline">
              click here
            </a>
            .
          </p>
          <p className="text-sm">
            For support,{' '}
            <a href="#" className="text-primary underline hover:no-underline">
              click here
            </a>
            .
          </p>
          <p className="text-sm">
            <a href="#" className="text-primary underline hover:no-underline">
              Read more
            </a>
          </p>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">{'<a href="#">click here</a>'}</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Screen reader lists: "click here, click here, Read more" - meaningless
      </p>
    </div>
  );
}
