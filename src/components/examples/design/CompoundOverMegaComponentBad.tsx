export function CompoundOverMegaComponentBad() {
  return (
    <div className="w-full max-w-md py-6">
      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-relaxed text-foreground">
        {`<Select
  label="Fruit"
  options={fruits}
  value={value}
  onChange={setValue}
  placeholder="Pick one"
  size="sm"
  error={error}
  renderOption={renderFruit}
  icon={<ChevronDown />}
/>`}
      </pre>
      <p className="mt-4 text-xs text-destructive">
        One component, ten props: every new need — a header, a divider, a custom row — means another prop and another branch inside.
      </p>
    </div>
  );
}
