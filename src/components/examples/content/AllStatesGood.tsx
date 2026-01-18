export function AllStatesGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Your Projects</h3>
        <div className="border border-dashed border-border rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h4 className="font-medium text-foreground mb-1">No projects yet</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Create your first project to get started
          </p>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90">
            Create Project
          </button>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Empty state with icon, explanation, and clear CTA
      </p>
    </div>
  );
}
