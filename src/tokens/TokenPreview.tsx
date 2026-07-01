/**
 * Small presentational helpers used only by the "Design Tokens" Storybook docs page
 * (see DesignTokens.mdx). Not exported from the package's public entry point (src/index.ts) —
 * these are documentation-only components, not part of the component library itself.
 *
 * They read the *live* value of each CSS custom property at render time (via
 * getComputedStyle), so the numbers shown on the docs page always match whatever is
 * currently defined in tokens.css — nothing here is hardcoded twice.
 */
import { useEffect, useState } from "react";

function useTokenValue(token: string): string {
  const [value, setValue] = useState("");

  useEffect(() => {
    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue(token)
      .trim();
    setValue(resolved);
  }, [token]);

  return value;
}

export interface TokenEntry {
  token: string;
  name: string;
}

export function ColorSwatch({ token, name }: TokenEntry) {
  const value = useTokenValue(token);
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 108 }}>
      <div
        style={{
          height: 56,
          borderRadius: 6,
          border: "1px solid var(--knky-color-border, #e5e5e5)",
          background: `var(${token})`,
        }}
      />
      <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>{name}</div>
      <div style={{ fontSize: 11, color: "#6d6d6d", fontFamily: "monospace" }}>
        {token}
      </div>
      <div style={{ fontSize: 11, color: "#6d6d6d" }}>{value}</div>
    </div>
  );
}

export function ColorGroup({
  title,
  tokens,
}: {
  title: string;
  tokens: TokenEntry[];
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
        {title}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        {tokens.map((t) => (
          <ColorSwatch key={t.token} token={t.token} name={t.name} />
        ))}
      </div>
    </div>
  );
}

export function SpaceSwatch({ token, name }: TokenEntry) {
  const value = useTokenValue(token);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "6px 0",
        borderBottom: "1px solid #f1f1f1",
      }}
    >
      <code style={{ fontSize: 12, width: 140 }}>{name}</code>
      <div
        style={{
          width: `var(${token})`,
          minWidth: 1,
          height: 16,
          background: "var(--knky-color-brand-400)",
          borderRadius: 2,
        }}
      />
      <span style={{ fontSize: 12, color: "#6d6d6d" }}>{value}</span>
    </div>
  );
}

export function RadiusSwatch({ token, name }: TokenEntry) {
  const value = useTokenValue(token);
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 108 }}>
      <div
        style={{
          height: 64,
          width: 64,
          background: "var(--knky-color-neutral-200)",
          borderRadius: `var(${token})`,
        }}
      />
      <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>{name}</div>
      <div style={{ fontSize: 11, color: "#6d6d6d" }}>{value}</div>
    </div>
  );
}

export interface TypeSampleProps {
  name: string;
  sizeVar: string;
  lineVar: string;
  weightVar: string;
}

export function TypeSample({ name, sizeVar, lineVar, weightVar }: TypeSampleProps) {
  const size = useTokenValue(sizeVar);
  const line = useTokenValue(lineVar);
  const weight = useTokenValue(weightVar);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 16,
        padding: "10px 0",
        borderBottom: "1px solid #f1f1f1",
      }}
    >
      <div style={{ width: 100, fontSize: 12, color: "#6d6d6d", fontFamily: "monospace" }}>
        {name}
      </div>
      <div style={{ width: 150, fontSize: 11, color: "#6d6d6d" }}>
        {size} / {line} / {weight}
      </div>
      <div
        style={{
          fontSize: `var(${sizeVar})`,
          lineHeight: `var(${lineVar})`,
          fontWeight: `var(${weightVar})` as never,
          fontFamily: "var(--knky-font-family-base)",
          color: "var(--knky-color-text-primary)",
        }}
      >
        Aa Bb Cc — KNKY design system
      </div>
    </div>
  );
}
