import { hjälteförmågor } from "../listor/data_hjalteformagor.js";
import { släkten } from "../listor/data_slakten.js";
import { yrken } from "../listor/data_yrken.js";
import { trolleritrick } from "../listor/data_trolleritrick.js";
import { besvärjelser } from "../listor/data_besvarjelser.js";
import { kallor } from "../listor/data_kallor.js";
import { LaggaBesvarjelser } from "./data_lagga_besvarjelser.js";

function formatKällaLabel(källaId) {
  return kallor[källaId]?.name ?? källaId;
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

  const groups = Object.entries(entries)
    .sort(([, a], [, b]) => (a.källa || "").localeCompare(b.källa || "") || (a.name || "").localeCompare(b.name || ""))
    .reduce((acc, [id, item]) => {
      const källa = item.källa ?? "okänd";
      acc[källa] ??= [];
      acc[källa].push({ id, item });
      return acc;
    }, {});

  const groupHtml = Object.entries(groups)
    .sort(([a], [b]) => formatKällaLabel(a).localeCompare(formatKällaLabel(b)))
    .map(([källa, items]) => {
      const itemRows = items
        .map(({ id, item }) => {
  const name = item.name ?? item.title ?? item.rubrik ?? id;
          const description = item.text ?? item.beskrivning ?? item.description ?? "";
          const metadata = [
            item.kostnad ? `Kostnad: ${item.kostnad}` : null,
            item.nivå ? `Nivå ${item.nivå}` : null,
          ]
            .filter(Boolean)
            .join(" • ");

          return `
            <article class="bibliotek-entry">
              <details class="bibliotek-entry__details">
                <summary>
                  <strong>${name}</strong>
                </summary>
                <div class="bibliotek-entry__body">
                  ${metadata ? `<p class="bibliotek-entry__meta">${metadata}</p>` : ""}
                  ${description ? `<p>${description}</p>` : ""}
                </div>
              </details>
            </article>
          `;
        })
        .join("");

      return `
        <div class="bibliotek-group">
          <div class="bibliotek-group__header">${formatKällaLabel(källa)}</div>
          <div class="bibliotek-group__items">
            ${itemRows}
          </div>
        </div>
      `;
    })
    .join("");

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
    <div class="bibliotek-overview">
      ${renderEntries("Hjälteförmågor", hjälteförmågor)}
      ${renderEntries("Yrken", yrken)}
      ${renderEntries("Släkten", släkten)}
      ${renderEntries("Trolleritrick", trolleritrick)}
      ${renderEntries("Besvärjelser", besvärjelser)}
      ${renderEntries("Lägga besvärjelser", LaggaBesvarjelser)}
    </div>
  `;
}

export function initBibliotekOverlay(openModal) {
  const openBtn = document.getElementById("open-bibliotek");
  if (!openBtn) return;

  openBtn.addEventListener("click", () => {
    renderBibliotekContent();
    openModal("bibliotek");
  });
}
