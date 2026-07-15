export function CompoundOverMegaComponentGood() {
  return (
    <div className="w-full max-w-md py-6">
      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-relaxed text-foreground">
        {`<Select value={value} onChange={setValue}>
  <SelectTrigger placeholder="Pick one" />
  <SelectContent>
    <SelectLabel>Fruit</SelectLabel>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="pear">Pear</SelectItem>
  </SelectContent>
</Select>`}
      </pre>
      <p className="mt-4 text-xs text-success">
        Compound parts compose: add a label, divider, or custom row as children — no new prop, no branch in the parent.
      </p>
    </div>
  );
}
