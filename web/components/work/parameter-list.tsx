export function ParameterList({
  parameters,
}: {
  parameters: Array<{ key?: string; value?: string }> | null | undefined;
}) {
  const rows = (parameters ?? []).filter((p) => p.key && p.value);
  if (!rows.length) return null;

  return (
    <dl className="flex flex-col gap-[15px]">
      {rows.map((p) => (
        <div key={p.key}>
          <dt className="text-muted-foreground text-xs leading-[1.2]">
            {p.key}
            {String(p.key).trim().endsWith(":") ? "" : ":"}
          </dt>
          <dd className="text-foreground mt-0 text-[18px] leading-normal">{p.value}</dd>
        </div>
      ))}
    </dl>
  );
}
