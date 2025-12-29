export const kallor ={
    dod: {
        name: "Drakar & Demoner Grundbok",
        altname: "Grundfärdigheter",
        type: "base"
    },
    kopparhavet: {
        name: "Ereb Altor",
        altname: "Övriga färdigheter",
        type: "addon"
    }
};
// ── Render function ──────────────────────────
export function buildGroupedOptions({
  items,
  getLabel,
  getValue
}) {
  // Group by källa
  const groups = {};

  Object.entries(items).forEach(([id, item]) => {
    const källa = item.källa ?? "okänd";
    groups[källa] ??= [];
    groups[källa].push({ id, item });
  });

  // Build HTML
  return Object.entries(groups)
    .map(([källaId, entries]) => {
      const källaName =
        kallor[källaId]?.name ?? källaId;

      // Sort alphabetically by display name
      entries.sort((a, b) =>
        getLabel(a.item).localeCompare(
          getLabel(b.item),
          "sv"
        )
      );

      const options = entries
        .map(
          ({ id, item }) =>
            `<option value="${getValue(id, item)}">
              ${getLabel(item)}
            </option>`
        )
        .join("");

      return `
        <optgroup label="${källaName}">
          ${options}
        </optgroup>
      `;
    })
    .join("");
}
