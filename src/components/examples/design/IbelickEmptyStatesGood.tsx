export function IbelickEmptyStatesGood() {
  return (
    <div className="space-y-4">
      <div className="p-8 border border-dashed rounded-lg text-center">
        <div className="size-12 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
          <svg className="size-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="font-medium">No projects yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Create your first project to get started
        </p>
        <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
          Create Project
        </button>
      </div>
      <p className="text-xs text-success">
        Clear empty state with explanation and single call-to-action
      </p>
    </div>
  );
}
