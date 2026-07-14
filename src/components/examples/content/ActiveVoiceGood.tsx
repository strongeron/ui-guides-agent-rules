export function ActiveVoiceGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h4 className="font-medium text-foreground">Getting started</h4>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Install the CLI.</li>
          <li>Log in, then link the project to your team.</li>
          <li>Deploy. We give you a preview URL.</li>
        </ol>
        <p className="text-xs text-muted-foreground">
          18 words. Every step opens with the verb you perform.
        </p>
      </div>
      <p className="text-xs text-success">
        Active voice names the actor and leads with the verb — the step is the
        instruction
      </p>
    </div>
  );
}
