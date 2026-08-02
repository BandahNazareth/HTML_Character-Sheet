import { LaggaBesvarjelser } from "./data_lagga_besvarjelser.js";
import { hjälteförmågor } from "../listor/data_hjalteformagor.js";
import { släkten } from "../listor/data_slakten.js";
import { förmågor } from "../listor/data_formagor.js";
import { yrken } from "../listor/data_yrken.js";
import { trolleritrick } from "../listor/data_trolleritrick.js";
import { besvärjelser } from "../listor/data_besvarjelser.js";
import { vapen } from "../listor/data_vapen.js";
import { rustningar } from "../listor/data_rustningar.js";
import { kläder } from "../listor/data_klader.js";
import { föremål } from "../listor/data_foremal.js";
import { tjänster } from "../listor/data_tjanster.js";
import { kallor } from "../listor/data_kallor.js";

function formatKällaLabel(källaId) {
  return kallor[källaId]?.name ?? källaId;
}

function formatAttributeKey(key) {
  const labels = {
    grepp: "Grepp",
    STY: "STY",
    räckvidd: "Räckvidd",
    skada: "Skada",
    BV: "BV",
    pris: "Pris",
    tillgång: "Tillgång",
    egenskaper: "Egenskaper",
    typ: "Typ",
    vikt: "Vikt",
    SV: "SV",
    nackdelarText: "Nackdelar",
    effekt: "Effekt",
    kategori: "Kategori",
    text: "Text",
    nivå: "Nivå",
    kostnad: "Kostnad",
  };

  return labels[key] ?? key.replace(/_/g, " ").replace(/([a-zåäö])([A-ZÅÄÖ])/g, "$1 $2").replace(/^\w/, (m) => m.toUpperCase());
}

function formatAttributeValue(value) {
  if (typeof value === "boolean") {
    return value ? "Ja" : "Nej";
  }

  return String(value);
}

function renderAttributes(item, extraExcludes = []) {
  const excludedKeys = new Set(["name", "title", "rubrik", "text", "beskrivning", "description", "källa", "kostnad", ...extraExcludes]);
  const fields = Object.entries(item).filter(
    ([key, value]) => !excludedKeys.has(key) && value !== undefined && value !== null && value !== ""
  );

  if (fields.length === 0) {
    return "";
  }

  return `
    <div class="bibliotek-entry__attributes">
      ${fields
        .map(([key, value]) => {
          const label = formatAttributeKey(key);

          if (Array.isArray(value)) {
            const items = value
              .map((entry) => {
                if (entry && typeof entry === "object") {
                  const abilityInfo = entry.id ? förmågor[entry.id] : null;
                  const nested = [
                    abilityInfo ? `<div class="bibliotek-entry__attribute-nested"><strong>Namn</strong>: <span class="bibliotek-entry__attribute-value">${abilityInfo.name}</span></div>` : null,
                    entry.id && !abilityInfo ? `<div class="bibliotek-entry__attribute-nested"><strong>ID</strong>: <span class="bibliotek-entry__attribute-value">${entry.id}</span></div>` : null,
                    entry.kostnad ? `<div class="bibliotek-entry__attribute-nested"><strong>Kostnad</strong>: <span class="bibliotek-entry__attribute-value">${formatAttributeValue(entry.kostnad)}</span></div>` : null,
                  ]
                    .filter(Boolean)
                    .join("");

                  return `<div class="bibliotek-entry__attribute-nested-item">${nested}</div>`;
                }

                return `<div class="bibliotek-entry__attribute-nested-item"><span class="bibliotek-entry__attribute-value">${formatAttributeValue(entry)}</span></div>`;
              })
              .join("");

            return `
              <div class="bibliotek-entry__attribute">
                <strong>${label}</strong>
                <div class="bibliotek-entry__attribute-nested-list">
                  ${items}
                </div>
              </div>
            `;
          }
          if (typeof value === "object" && !Array.isArray(value)) {
            const nested = Object.entries(value)
              .map(
                ([nestedKey, nestedValue]) =>
                  `<div class="bibliotek-entry__attribute-nested"><strong>${formatAttributeKey(nestedKey)}</strong>: <span class="bibliotek-entry__attribute-value">${formatAttributeValue(nestedValue)}</span></div>`
              )
              .join("");

            return `
              <div class="bibliotek-entry__attribute">
                <strong>${label}</strong>
                <div class="bibliotek-entry__attribute-nested-list">
                  ${nested}
                </div>
              </div>
            `;
          }

          return `
            <div class="bibliotek-entry__attribute">
              <strong>${label}</strong>: <span class="bibliotek-entry__attribute-value">${formatAttributeValue(value)}</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

let bibliotekSearchQuery = "";
let bibliotekSectionFilter = "all";
let bibliotekSourceFilters = new Set(Object.keys(kallor));

function normalizeSearchText(value) {
  return String(value ?? "").toLowerCase().trim();
}

function getItemSources(item) {
  if (!item) return ["okänd"];
  const k = item.källa;
  if (Array.isArray(k) && k.length > 0) return k.map((s) => s ?? "okänd");
  if (k) return [k];
  return ["okänd"];
}

function getPrimarySource(item) {
  const s = getItemSources(item);
  return s[0];
}

function getAvailableSources() {
  const sources = new Set(Object.keys(kallor));
  const entries = [
    LaggaBesvarjelser,
    hjälteförmågor,
    släkten,
    förmågor,
    yrken,
    trolleritrick,
    besvärjelser,
    vapen,
    rustningar,
    kläder,
    föremål,
    tjänster,
  ];

  entries.forEach((collection) => {
    Object.values(collection || {}).forEach((item) => {
      const itemSources = getItemSources(item);
      itemSources.forEach((s) => sources.add(s ?? "okänd"));
    });
  });

  return [...sources];
}

function sourceMatchesFilter(item) {
  if (bibliotekSourceFilters.size === 0) {
    return false;
  }

  const itemSources = getItemSources(item);
  return itemSources.some((s) => bibliotekSourceFilters.has(s));
}

function itemMatchesQuery(item, query) {
  if (!query) return true;

  const values = [
    item.name,
    item.title,
    item.rubrik,
    item.text,
    item.beskrivning,
    item.description,
    item.källa,
    item.kostnad,
    item.nivå,
    item.pris,
    item.tillgång,
    item.typ,
    item.egenskaper,
    item.effekt,
    item.kategori,
    item.vikt,
  ];

  const nestedValues = Object.entries(item)
    .filter(([, value]) => typeof value === "object" && !Array.isArray(value))
    .flatMap(([, value]) => Object.values(value));

  const arrayValues = Object.entries(item)
    .filter(([, value]) => Array.isArray(value))
    .flatMap(([, value]) =>
      value.flatMap((entry) =>
        entry && typeof entry === "object" ? Object.values(entry) : [entry]
      )
    );

  const haystack = [...values, ...nestedValues, ...arrayValues]
    .filter((value) => value !== undefined && value !== null)
    .map((value) => String(value).toLowerCase())
    .join(" ");

  return haystack.includes(query);
}

function renderBibliotekControls() {
  const sections = [
    { value: "all", label: "Visa alla" },
    { value: "lägga-besvärjelser", label: "Lägga besvärjelser" },
    { value: "hjälteförmågor", label: "Hjälteförmågor" },
    { value: "släkten", label: "Släkten" },
    { value: "förmågor", label: "Förmågor" },
    { value: "yrken", label: "Yrken" },
    { value: "trolleritrick", label: "Trolleritrick" },
    { value: "besvärjelser", label: "Besvärjelser" },
    { value: "vapen", label: "Vapen" },
    { value: "rustningar", label: "Rustningar" },
    { value: "kläder", label: "Kläder" },
    { value: "föremål", label: "Föremål" },
    { value: "tjänster", label: "Tjänster" },
  ];

  const sources = getAvailableSources();

  return `
    <div class="bibliotek-controls">
      <label class="bibliotek-control bibliotek-control--search">
        <span class="bibliotek-control__label">Sök</span>
        <div class="bibliotek-search-wrapper">
          <input id="bibliotek-search" type="search" placeholder="Sök i biblioteket..." value="${bibliotekSearchQuery}" />
          <button id="bibliotek-clear-search" type="button" class="bibliotek-clear-button">×</button>
        </div>
      </label>
      <label class="bibliotek-control">
        <span class="bibliotek-control__label">Sektion</span>
        <select id="bibliotek-section-filter">
          ${sections
            .map(
              (section) =>
                `<option value="${section.value}" ${bibliotekSectionFilter === section.value ? "selected" : ""}>${section.label}</option>`
            )
            .join("")}
        </select>
      </label>
    </div>
    <div class="bibliotek-source-filter">
      ${sources
        .map(
          (source) =>
            `<label class="bibliotek-source-filter__item"><input type="checkbox" value="${source}" ${
              bibliotekSourceFilters.has(source) ? "checked" : ""
            } /> ${formatKällaLabel(source)}</label>`
        )
        .join("")}
    </div>
  `;
}

function renderBibliotekList() {
  return `
    <div class="bibliotek-overview">
      ${renderEntries("Lägga besvärjelser", LaggaBesvarjelser)}
      ${renderEntries("Hjälteförmågor", hjälteförmågor)}
      ${renderEntries("Släkten", släkten)}
      ${renderEntries("Förmågor", förmågor)}
      ${renderEntries("Yrken", yrken)}
      ${renderEntries("Trolleritrick", trolleritrick)}
      ${renderEntries("Besvärjelser", besvärjelser)}
      ${renderEntries("Vapen", vapen)}
      ${renderEntries("Rustningar", rustningar)}
      ${renderEntries("Kläder", kläder)}
      ${renderEntries("Föremål", föremål)}
      ${renderEntries("Tjänster", tjänster)}
    </div>
  `;
}

function attachBibliotekFilterListeners() {
  const searchInput = document.getElementById("bibliotek-search");
  const sectionSelect = document.getElementById("bibliotek-section-filter");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      bibliotekSearchQuery = normalizeSearchText(searchInput.value);
      updateBibliotekList();
    });
  }

  if (sectionSelect) {
    sectionSelect.addEventListener("change", () => {
      bibliotekSectionFilter = sectionSelect.value;
      updateBibliotekList();
    });
  }

  const clearButton = document.getElementById("bibliotek-clear-search");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      bibliotekSearchQuery = "";
      const searchInput = document.getElementById("bibliotek-search");
      if (searchInput) {
        searchInput.value = "";
      }
      updateBibliotekList();
    });
  }

  const sourceCheckboxes = document.querySelectorAll("#bibliotek-content .bibliotek-source-filter input[type='checkbox']");
  sourceCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      bibliotekSourceFilters = new Set(
        Array.from(sourceCheckboxes)
          .filter((input) => input.checked)
          .map((input) => input.value)
      );
      updateBibliotekList();
    });
  });
}

function updateBibliotekList() {
  const listContainer = document.getElementById("bibliotek-list");
  if (!listContainer) return;

  const html = renderBibliotekList();
  listContainer.innerHTML = html;

  if (!html.includes("bibliotek-section")) {
    listContainer.innerHTML = `<p class="bibliotek-no-results">Inga poster matchar sökningen.</p>`;
  }
}

function renderEntries(title, entries) {
  if (!entries || Object.keys(entries).length === 0) {
    return `
      <section>
        <h3>${title}</h3>
        <p><em>Inget innehåll</em></p>
      </section>
    `;
  }

  const query = normalizeSearchText(bibliotekSearchQuery);
  const sectionKey = title.toLowerCase().replace(/\s+/g, "-");
  const matchesSection = bibliotekSectionFilter === "all" || bibliotekSectionFilter === sectionKey;

  const groups = Object.entries(entries)
    .filter(([, item]) => matchesSection && itemMatchesQuery(item, query) && sourceMatchesFilter(item))
    .sort(([, a], [, b]) =>
      (getPrimarySource(a) || "").localeCompare(getPrimarySource(b) || "", "sv") ||
      (a.name || a.title || a.rubrik || "").localeCompare(b.name || b.title || b.rubrik || "", "sv")
    )
    .reduce((acc, [id, item]) => {
      const itemSources = getItemSources(item);
      itemSources.forEach((källa) => {
        acc[källa] ??= [];
        acc[källa].push({ id, item });
      });
      return acc;
    }, {});

  const groupHtml = Object.entries(groups)
    .sort(([a], [b]) => formatKällaLabel(a).localeCompare(formatKällaLabel(b), "sv"))
    .map(([källa, items]) => {
      const renderEntryRow = ({ id, item }, extraExcludes = []) => {
        const name = item.name ?? item.title ?? item.rubrik ?? id;
        const description = item.text ?? item.beskrivning ?? item.description ?? "";
        const metadata = [
          item.kostnad ? `Kostnad: ${item.kostnad}` : null,
        ]
          .filter(Boolean)
          .join(" • ");
        const attributesHtml = renderAttributes(item, extraExcludes);

        return `
          <article class="bibliotek-entry">
            <details class="bibliotek-entry__details">
              <summary>
                ${name}
              </summary>
              <div class="bibliotek-entry__body">
                ${metadata ? `<p class="bibliotek-entry__meta">${metadata}</p>` : ""}
                ${attributesHtml}
                ${description ? `<p>${description}</p>` : ""}
              </div>
            </details>
          </article>
        `;
      };

      if (title === "Besvärjelser") {
        const levelGroups = items.reduce((acc, entry) => {
          const nivå = entry.item.nivå ?? "okänd";
          const magiskola = entry.item.magiskola ?? "okänd";
          acc[nivå] ??= {};
          acc[nivå][magiskola] ??= [];
          acc[nivå][magiskola].push(entry);
          return acc;
        }, {});

        const sortedLevels = Object.entries(levelGroups).sort(([a], [b]) => {
          const aNum = Number(a);
          const bNum = Number(b);
          if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
            return aNum - bNum;
          }
          if (!Number.isNaN(aNum)) {
            return -1;
          }
          if (!Number.isNaN(bNum)) {
            return 1;
          }
          return a.localeCompare(b, "sv");
        });

        const levelHtml = sortedLevels
          .map(([nivå, magGroups]) => {
            const levelLabel = nivå === "okänd" ? "Nivå okänd" : `Nivå ${nivå}`;
            const sortedMagiskolor = Object.entries(magGroups)
              .sort(([a], [b]) => a.localeCompare(b, "sv"));

            const magHtml = sortedMagiskolor
              .map(([magiskola, magItems]) => {
                const magLabel = magiskola === "okänd" ? "Magiskola okänd" : magiskola.charAt(0).toUpperCase() + magiskola.slice(1);
                const magCssVarName = `--${magiskola.replace(/\s+/g, "-").toLowerCase()}-color`;
                const magCssStyle = `--bibliotek-magiskola-color: var(${magCssVarName}, var(--accent-hover));`;
                const magRows = magItems
                  .sort((a, b) => {
                    const aName = a.item.name ?? a.item.title ?? a.item.rubrik ?? "";
                    const bName = b.item.name ?? b.item.title ?? b.item.rubrik ?? "";
                    return aName.localeCompare(bName, "sv");
                  })
                  .map((entry) => renderEntryRow(entry, ["nivå", "magiskola"]))
                  .join("");

                return `
                  <div class="bibliotek-magiskola-group" style="${magCssStyle}">
                    <div class="bibliotek-magiskola-header">${magLabel}</div>
                    <div class="bibliotek-group__items">
                      ${magRows}
                    </div>
                  </div>
                `;
              })
              .join("");

            return `
              <div class="bibliotek-nivå-group">
                <div class="bibliotek-nivå-header">${levelLabel}</div>
                ${magHtml}
              </div>
            `;
          })
          .join("");

        return `
          <div class="bibliotek-group">
            <div class="bibliotek-group__header">${formatKällaLabel(källa)}</div>
            ${levelHtml}
          </div>
        `;
      }

      let groupContent;

      if (title === "Föremål") {
        const categoryGroups = items.reduce((acc, entry) => {
          const category = entry.item.kategori ?? "okänd";
          acc[category] ??= [];
          acc[category].push(entry);
          return acc;
        }, {});

        groupContent = Object.entries(categoryGroups)
          .sort(([a], [b]) => a.localeCompare(b, "sv"))
          .map(([category, categoryItems]) => {
            const categoryLabel = category === "okänd" ? "Kategori okänd" : category;
            const categoryRows = categoryItems
              .map((entry) => renderEntryRow(entry, ["kategori"]))
              .join("");

            return `
              <div class="bibliotek-kategori-group">
                <div class="bibliotek-kategori-header">${categoryLabel}</div>
                <div class="bibliotek-group__items">
                  ${categoryRows}
                </div>
              </div>
            `;
          })
          .join("");
      } else if (title === "Trolleritrick") {
        const magiskolaGroups = items.reduce((acc, entry) => {
          const magiskola = entry.item.magiskola ?? "okänd";
          acc[magiskola] ??= [];
          acc[magiskola].push(entry);
          return acc;
        }, {});

        groupContent = Object.entries(magiskolaGroups)
          .sort(([a], [b]) => a.localeCompare(b, "sv"))
          .map(([magiskola, magItems]) => {
            const magLabel = magiskola === "okänd" ? "Magiskola okänd" : magiskola.charAt(0).toUpperCase() + magiskola.slice(1);
            const magCssVarName = `--${magiskola.replace(/\s+/g, "-").toLowerCase()}-color`;
            const magCssStyle = `--bibliotek-magiskola-color: var(${magCssVarName}, var(--accent-hover));`;
            const magRows = magItems
              .sort((a, b) => {
                const aName = a.item.name ?? a.item.title ?? a.item.rubrik ?? "";
                const bName = b.item.name ?? b.item.title ?? b.item.rubrik ?? "";
                return aName.localeCompare(bName, "sv");
              })
              .map((entry) => renderEntryRow(entry, ["magiskola"]))
              .join("");

            return `
              <div class="bibliotek-magiskola-group" style="${magCssStyle}">
                <div class="bibliotek-magiskola-header">${magLabel}</div>
                <div class="bibliotek-group__items">
                  ${magRows}
                </div>
              </div>
            `;
          })
          .join("");
      } else {
        const itemRows = items
          .map((entry) => renderEntryRow(entry))
          .join("");

        groupContent = `
          <div class="bibliotek-group__items">
            ${itemRows}
          </div>
        `;
      }

      return `
        <div class="bibliotek-group">
          <div class="bibliotek-group__header">${formatKällaLabel(källa)}</div>
          ${groupContent}
        </div>
      `;
    })
    .join("");

  if (!groupHtml.trim()) {
    return "";
  }

  const sectionClass = title === "Lägga besvärjelser" ? "bibliotek-section--single-column" : "";
  return `
    <section class="bibliotek-section ${sectionClass}" data-section="${title.toLowerCase().replace(/\s+/g, '-')}">
      <details class="bibliotek-section__details">
        <summary><h3>${title}</h3></summary>
        <div class="bibliotek-section__content">
          ${groupHtml}
        </div>
      </details>
    </section>
  `;
}

function renderBibliotekContent() {
  const content = document.getElementById("bibliotek-content");
  if (!content) return;

  content.innerHTML = `
    ${renderBibliotekControls()}
    <div id="bibliotek-list">
      ${renderBibliotekList()}
    </div>
  `;

  attachBibliotekFilterListeners();
}

export function initBibliotekOverlay(openModal) {
  const openBtn = document.getElementById("open-bibliotek");
  if (!openBtn) return;

  openBtn.addEventListener("click", () => {
    renderBibliotekContent();
    openModal("bibliotek");
  });
}
