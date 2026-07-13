type Texture = 'solid' | 'stripes' | 'dots';

const data: { label: string; value: number; swatch: string; texture: Texture }[] = [
  { label: 'Active', value: 45, swatch: 'bg-primary', texture: 'solid' },
  { label: 'Pending', value: 30, swatch: 'bg-warning', texture: 'stripes' },
  { label: 'Inactive', value: 25, swatch: 'bg-muted-foreground', texture: 'dots' },
];

/** Real textures, so a segment is identifiable without relying on its colour. */
function textureStyle(texture: Texture): React.CSSProperties | undefined {
  if (texture === 'stripes') {
    return {
      backgroundImage:
        'repeating-linear-gradient(45deg, rgba(0,0,0,0.4) 0 3px, transparent 3px 7px)',
    };
  }
  if (texture === 'dots') {
    return {
      backgroundImage: 'radial-gradient(rgba(0,0,0,0.45) 1.2px, transparent 1.4px)',
      backgroundSize: '6px 6px',
    };
  }
  return undefined;
}

export function AccessibleChartsGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">User status</h3>
        <div className="flex h-5 rounded-full overflow-hidden mb-4">
          {data.map((item) => (
            <div
              key={item.label}
              className={item.swatch}
              style={{ width: `${item.value}%`, ...textureStyle(item.texture) }}
            />
          ))}
        </div>
        <div className="flex gap-4">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-sm ${item.swatch}`}
                style={textureStyle(item.texture)}
              />
              <span className="text-xs">
                {item.label} {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Each segment carries a distinct texture (solid, striped, dotted) as well as a colour and a text label, so the
        chart still reads in greyscale
      </p>
    </div>
  );
}
