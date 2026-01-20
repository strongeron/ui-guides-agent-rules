export function IbelickTailwindDefaultsBad() {
  return (
    <div className="space-y-4">
      {/* Using arbitrary values instead of Tailwind defaults */}
      <div className="p-[13px] rounded-[5px] bg-muted">
        <p className="text-[17px] leading-[1.3] mb-[7px]">Card Title</p>
        <p className="text-[13px] text-muted-foreground">
          This card uses arbitrary pixel values that don't align to the spacing scale.
        </p>
      </div>
      <button className="px-[18px] py-[9px] bg-primary text-primary-foreground rounded-[6px] text-[15px]">
        Submit
      </button>
      <p className="text-xs text-destructive mt-4">
        Arbitrary values like p-[13px] break visual consistency
      </p>
    </div>
  );
}
