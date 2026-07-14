export function ActiveVoiceBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h4 className="font-medium text-foreground">Getting started</h4>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>The CLI will be installed by the setup script.</li>
          <li>
            Once authentication has been completed, the project can be linked to
            an existing team by the user.
          </li>
          <li>
            Your first deployment will then be created and a preview URL will be
            provided.
          </li>
        </ol>
        <p className="text-xs text-muted-foreground">
          72 words. No sentence says who does what.
        </p>
      </div>
      <p className="text-xs text-error">
        Passive voice buries the actor and the action — the reader can't tell
        what to actually do
      </p>
    </div>
  );
}
