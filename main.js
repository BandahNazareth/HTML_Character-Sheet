// ── COMPUTEDERIVED import ──────────────────────────────────
import { rollperson, computeDerived, validateResources }from "./rollformular_backend.js";


// SAVING imports
import { initPersistence } from "./persistence.js";

// REGLER imports
import { grundegenskaper as grundData } from "./data/karaktärsdata/grundegenskaper.js";
import { ålder as ålderData } from "./data/listor/data_alder.js";
import { hjälteförmågor as hjälteData } from "./data/listor/data_hjalteformagor.js";
import { socialt_stånd } from "./data/listor/socialt_stand.js";
import { släkten } from "./data/listor/data_slakten.js";
import { yrken } from "./data/listor/data_yrken.js";
import { förmågor } from "./data/listor/data_formagor.js";
import { kallor, buildGroupedOptions} from "./data/listor/data_kallor.js";
import { groupByKälla } from "./rules/grundchans.js";
import {ensureKällaVisibility, isKällaVisible, getSkillKälla, isItemFromVisibleKälla} from "./rules/kallaVisibility.js";

// ITEM imports
import { vapen } from "./data/listor/data_vapen.js";
import { rustningar } from "./data/listor/data_rustningar.js";
import { hjälmar } from "./data/listor/data_hjalmar.js";
import { instrument } from "./data/listor/data_instrument.js";

// Karaktärsdata imports
import { färdigheter } from "./data/karaktärsdata/fardigheter.js";
import { vapenfärdigheter } from "./data/karaktärsdata/vapenfardigheter.js";

//Color mode
function setTheme(themeName) {
  document.documentElement.setAttribute("data-theme", themeName);
}
function applyCharacterTheme() {
  setTheme(rollperson.theme || "main");
}
applyCharacterTheme();

//Kontrollerar om färdigheter har nackdel

function hasNackdelForSkill(rollperson, item) {
  // 1️⃣ Pressed grundegenskap
  const grund = item.grundegenskap;
  if (grund && rollperson.grundegenskaper[grund]?.pressad) {
    return true;
  }

  // 2️⃣ Armor-based nackdel (already calculated state)
  if (!rollperson.rustning) return false;

  const armor = rustningar[rollperson.rustning];
  if (!armor?.nackdelar) return false;

  // Map skill IDs → armor nackdel flags
  const armorNackdelMap = {
    smyga: "smyga",
    undvika: "undvika",
    hoppaochklattra: "hoppaochklattra"
  };

  const flag = armorNackdelMap[item.id];
  return flag ? armor.nackdelar[flag] === true : false;
}

//DOMCONTENTLOADED
window.addEventListener("DOMContentLoaded", () => {

  initPersistence(); //Load-Autosave hook
 
  // ── Schema migration: instrument → array ─────────────
  if (!Array.isArray(rollperson.instrument)) {
    const oldValue = rollperson.instrument;

    rollperson.instrument = [null, null, null];

  // Preserve old single value if it was meaningful
  if (oldValue && oldValue !== "inget") {
    rollperson.instrument[0] = oldValue;
  }
}
applyCharacterTheme();

function wrapAsFardCheckbox(input) {
  const label = document.createElement("label");
  label.className = "färd-checkbox";

  input.parentNode.insertBefore(label, input);
  label.appendChild(input);
}

ensureKällaVisibility(rollperson, kallor);

const BASE_KÄLLA_ID = "dod";

function renderSkillList({
  derivedList,
  container,
  stateObject
}) {
  container.innerHTML = "";

  const grouped = groupByKälla(
  derivedList,
  item => item.källa
);

Object.entries(grouped).forEach(([källaId, items]) => {
  if (!isKällaVisible(rollperson, källaId)) return;

  // 1️⃣ ALWAYS ensure state FIRST
items.forEach(item => {
  if (!stateObject[item.id]) {
    stateObject[item.id] = {
      tränad: false,
      förbättrad: false,
      förbättringar: []
    };
  }
});

// 2️⃣ THEN filter
const visibleItems = items.filter(item => {
  const state = stateObject[item.id];   // now guaranteed
  const källaDef = kallor[källaId];
  const isBase = källaDef?.type === "base";

  // Base skills are ALWAYS visible
  if (isBase) return true;

  // Addon skills only if trained
  return state.tränad === true;
});

  if (visibleItems.length === 0) return;

    // ── Källa header ─────────────────────
    const källaDef = kallor[källaId];

    const header = document.createElement("h4");
    header.className = "skill-kalla-header";
    header.textContent =
      källaDef?.altname ?? källaId;

    container.appendChild(header);

    // ── Render skills ───────────────────
    visibleItems.forEach(item => {
      const state = stateObject[item.id];

      const row = document.createElement("div");

      const hasNackdel = hasNackdelForSkill(rollperson, item);
      if (hasNackdel) {
        row.classList.add("has-nackdel");
      }

      row.innerHTML = `
        <label class="färd-checkbox">
          <input
            type="checkbox"
            class="förbättrad"
            ${state.förbättrad ? "checked" : ""}
          >
        </label>

        ${item.grundchans}
        <span class="skill-name ${hasNackdel ? "has-nackdel" : ""}">
          ${item.name}
          (${grundData[item.grundegenskap]?.kort ?? "?"})
          ${
            hasNackdel
              ? `<span class="nackdel-icon" title="Nackdel på slag">⚠️</span>`
              : ""
          }
        </span>

        ${state.tränad ? `<span class="tränad-label">Tränad</span>` : ""}
        `;

      container.appendChild(row);
    });
  });
}

// ── Render function ──────────────────────────
function render() {
  const derived = computeDerived(rollperson);
  validateResources(rollperson, derived);
// ---Avatar image
const avatarImg = document.getElementById("avatar-image");

if (rollperson.avatar) {
  avatarImg.src = rollperson.avatar;
} else {
  avatarImg.src = "./art/avatar_placeholder.png";
}

avatarImg.style.display = "block";

  // ── Character information ─────────────────────────
  document.getElementById("namn").textContent = rollperson.namn;

// ── Character details list ─────────────────
const leftEl = document.getElementById("character-details-left");
const rightEl = document.getElementById("character-details-right");

function addDetail(key, targetEl) {
  let value;

  switch (key) {
    case "släkte":
      value = släkten[rollperson.släkte]?.name;
      break;

    case "yrke":
      value = yrken[rollperson.yrke]?.name;
      break;

    case "ålder":
      value = ålderData[rollperson.ålder]?.name;
      break;

    case "socialt_stånd":
      value = rollperson.socialt_stånd?.text;
      break;

    default:
      value = rollperson[key];
  }

  if (!value) return;

  const label =
    key.replace(/_/g, " ");
  const formattedLabel =
    label.charAt(0).toUpperCase() + label.slice(1);

  const formattedValue =
    typeof value === "string"
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : value;

  const li = document.createElement("li");
  li.innerHTML = `<strong>${formattedLabel}:</strong> ${formattedValue}`;

  targetEl.appendChild(li);
}

leftEl.innerHTML = "";
rightEl.innerHTML = "";

const leftFields = [
  "yrke",
  "ålder",
  "släkte",
  "socialt_stånd",
  "svaghet"
];

const rightFields = [
  "språk",
  "utseende",
  "minnessak"
];

leftFields.forEach(key => addDetail(key, leftEl));
rightFields.forEach(key => addDetail(key, rightEl));

    // ── Grundegenskaper (table) ─────────────────
const grundEl = document.getElementById("grundegenskaper");
  grundEl.innerHTML = "";

const grid = document.createElement("div");
  grid.className = "grund-grid";

  for (const [key, state] of Object.entries(rollperson.grundegenskaper)) {
    const meta = grundData[key];

    const wrapper = document.createElement("div");
    wrapper.className = "grund-wrapper";

    // Circle (ONLY name + value)
    const circle = document.createElement("div");
    circle.className = "grund-circle";

    const derivedValue = derived.grundegenskaper[key].value;
    circle.innerHTML = `
      <div class="grund-code">${meta.kort}</div>
      <div class="grund-value">${derivedValue}</div>
    `;

    // Checkbox (below circle)
    const label = document.createElement("label");
    label.className = "grund-checkbox";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = state.pressad;

    checkbox.addEventListener("change", () => {
      state.pressad = checkbox.checked;
      render();
     });

  label.appendChild(checkbox);

  // Adjektiv (always visible)
  const adj = document.createElement("div");
  adj.className = "grund-adjektiv";
  adj.textContent = meta.adjektiv;

  if (state.pressad) {
    adj.classList.add("pressad");
  }

  wrapper.append(circle, label, adj);
  grid.appendChild(wrapper);
  }

grundEl.appendChild(grid);
  
  // ── Resurser: Viljepoäng & Kroppspoäng ───────

  // ── Init + clamp current VP/KP ───────────────
if (rollperson.viljepoäng.current == null) {
  rollperson.viljepoäng.current = derived.viljepoäng.max;
} else {
  rollperson.viljepoäng.current = Math.min(
    rollperson.viljepoäng.current,
    derived.viljepoäng.max
  );
}

if (rollperson.kroppspoäng.current == null) {
  rollperson.kroppspoäng.current = derived.kroppspoäng.max;
} else {
  rollperson.kroppspoäng.current = Math.min(
    rollperson.kroppspoäng.current,
    derived.kroppspoäng.max
  );
}

// Viljepoäng
document.getElementById("vp-current").textContent =
  rollperson.viljepoäng.current;
document.getElementById("vp-max").textContent =
  derived.viljepoäng.max;

// Kroppspoäng
document.getElementById("kp-current").textContent =
  rollperson.kroppspoäng.current;
document.getElementById("kp-max").textContent =
  derived.kroppspoäng.max;

  // VP buttons
document
  .querySelector(".viljepoang .resurs-plus")
  .onclick = () => {
    rollperson.viljepoäng.current = Math.min(
      rollperson.viljepoäng.current + 1,
      derived.viljepoäng.max
    );
    render();
  };

document
  .querySelector(".viljepoang .resurs-minus")
  .onclick = () => {
    rollperson.viljepoäng.current = Math.max(
      rollperson.viljepoäng.current - 1,
      0
    );
    render();
  };

// KP buttons
document
  .querySelector(".kroppspoang .resurs-plus")
  .onclick = () => {
    rollperson.kroppspoäng.current = Math.min(
      rollperson.kroppspoäng.current + 1,
      derived.kroppspoäng.max
    );
    render();
  };

document
  .querySelector(".kroppspoang .resurs-minus")
  .onclick = () => {
    rollperson.kroppspoäng.current = Math.max(
      rollperson.kroppspoäng.current - 1,
      0
    );
    render();
  };

// ── Förflyttning ────────────────────────────
  document.getElementById("förflyttning").innerHTML =
  `<div>Förflyttning: ${derived.förflyttning} meter</div>`;

  // ── Skadebonus ──────────────────────────────
  document.getElementById("skadebonus").innerHTML = `
  <div>Skadebonus STR: ${derived.skadebonus.styrka}</div>
  <div>Skadebonus SMI: ${derived.skadebonus.smidighet}</div>
`;

  // ── Hjälteförmågor ───────────────────────────
  const hjälteEl = document.getElementById("hjalteformagor-list");
  hjälteEl.innerHTML = "";

  const entries = Object.entries(rollperson.hjälteförmågor);

  if (entries.length === 0) {
    hjälteEl.innerHTML = "<em>Inga hjälteförmågor valda</em>";
  } else {
    entries.forEach(([id, count]) => {
      const data = hjälteData[id];
      if (!data) return;

      const row = document.createElement("div");
      row.className = "hjalte-row";

      row.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:baseline;">
        <strong>${data.name}${data.stackable ? ` × ${count}` : ""}</strong>
        <span style="opacity:0.7;">Kostnad: ${data.kostnad}</span>
      </div>
      <div class="hjalte-text">${data.text}</div>
      `;

      hjälteEl.appendChild(row);
    });
  }

  // ── Färdigheter/Vapenfärdigheter ─────────────────────────────
renderSkillList({
  derivedList: derived.färdigheter,
  container: document.getElementById("färdigheter"),
  stateObject: rollperson.färdigheter
});

renderSkillList({
  derivedList: derived.vapenfärdigheter,
  container: document.getElementById("vapenfärdigheter"),
  stateObject: rollperson.vapenfärdigheter
});
}

// ── Instrument ────────────────────────────────────
const instrumentBody = document.getElementById("instrument-rows");
instrumentBody.innerHTML = "";

// 3 slots
for (let slot = 0; slot < 3; slot++) {
  const tr = document.createElement("tr");

  // Selector
  const selectTd = document.createElement("td");
  const select = document.createElement("select");

  select.innerHTML = buildGroupedOptions({
  items: Object.fromEntries(
    Object.entries(instrument).filter(
      ([, item]) =>
        isItemFromVisibleKälla(rollperson, item.källa)
    )
  ),
  getLabel: i => i.name,
  getValue: id => id
});

  // 🔑 SLOT-SPECIFIC VALUE
  select.value = rollperson.instrument[slot] ?? "";

  selectTd.appendChild(select);

  // Effekt
  const effektTd = document.createElement("td");

  function updateInstrumentRow() {
    const data = instrument[select.value];
    effektTd.textContent = data?.effekt ?? "-";
  }

  select.addEventListener("change", () => {
    rollperson.instrument[slot] =
      select.value === "" ? null : select.value;

    updateInstrumentRow();
  });

  updateInstrumentRow();

  tr.append(selectTd, effektTd);
  instrumentBody.appendChild(tr);
}

// ── Släktesförmågor ─────────────────────────
const slaktesList = document.getElementById("slaktesformagor-list");
slaktesList.innerHTML = "";

const slakteDef = släkten[rollperson.släkte];

if (!slakteDef || !slakteDef.förmågor?.length) {
  slaktesList.innerHTML = "<em>Inga släktesförmågor</em>";
} else {
  slakteDef.förmågor.forEach(({ id }) => {
    const data = förmågor[id];
    if (!data) return;

    const row = document.createElement("div");
    row.className = "slaktes-formaga";

    row.innerHTML = `
      <div class="slaktes-formaga-title">
        <strong>${data.name}</strong>
        <span style="opacity:0.7;">Kostnad: ${data.kostnad}</span>
      </div>
      <div class="slaktes-formaga-text">
        ${data.text}
      </div>
    `;

    slaktesList.appendChild(row);
  });
}

// ── Vapen ────────────────────────────────────
const vapenBody = document.getElementById("vapen-rows");
vapenBody.innerHTML = "";

// 3 slots
for (let slot = 0; slot < 3; slot++) {
  const tr = document.createElement("tr");

  // ── Weapon selector ────────────────────────
  const selectTd = document.createElement("td");
  const select = document.createElement("select");

  select.innerHTML = buildGroupedOptions({
  items: Object.fromEntries(
    Object.entries(vapen).filter(
      ([, item]) =>
        isItemFromVisibleKälla(rollperson, item.källa)
    )
  ),
  getLabel: w => w.name,
  getValue: id => id
});

  select.value = rollperson.vapen[slot] ?? "inget";
  selectTd.appendChild(select);
  tr.appendChild(selectTd);

  // ── Data cells ─────────────────────────────
  const tdGrepp = document.createElement("td");
  const tdSTY = document.createElement("td");
  const tdRackvidd = document.createElement("td");
  const tdSkada = document.createElement("td");
  const tdBV = document.createElement("td");
  const tdEgenskaper = document.createElement("td");
  const tdAnteckningar = document.createElement("td");

  const notes = document.createElement("textarea");
  notes.rows = 1;
  notes.readOnly = true;
  notes.value = rollperson.vapenAnteckningar[slot] ?? "";

  notes.style.width = "100%";
  notes.style.resize = "none";
  notes.style.overflow = "hidden";
  notes.style.cursor = "pointer";

  // Auto-resize function
  function autoResize() {
  notes.style.height = "auto";
  notes.style.height = notes.scrollHeight + "px";
  }

  // Enable editing on click
  notes.addEventListener("click", () => {
  notes.readOnly = false;
  notes.style.cursor = "text";
  notes.focus();
  });

  // Save + lock on blur
  notes.addEventListener("blur", () => {
  notes.readOnly = true;
  notes.style.cursor = "pointer";
  rollperson.vapenAnteckningar[slot] = notes.value;
  });

  // Resize while typing
  notes.addEventListener("input", () => {
    autoResize();
  });

  autoResize();

  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";

  const placeholder = document.createElement("div");
  placeholder.textContent = "Anteckningar…";
  placeholder.style.position = "absolute";
  placeholder.style.top = "6px";
  placeholder.style.left = "6px";
  placeholder.style.color = "#999";
  placeholder.style.pointerEvents = "none";
  placeholder.style.fontStyle = "italic";

  function updatePlaceholder() {
    placeholder.style.display =
      notes.value || !notes.readOnly ? "none" : "block";
  }

  updatePlaceholder();

  notes.addEventListener("input", updatePlaceholder);
  notes.addEventListener("blur", updatePlaceholder);
  notes.addEventListener("click", updatePlaceholder);

  wrapper.appendChild(placeholder);
  wrapper.appendChild(notes);
  tdAnteckningar.appendChild(wrapper);
  

  tr.append(
    tdGrepp,
    tdSTY,
    tdRackvidd,
    tdSkada,
    tdBV,
    tdEgenskaper,
    tdAnteckningar
  );

  function updateRow() {
    const weaponId = rollperson.vapen[slot] ?? "inget";
    const weapon = vapen[select.value];

    tdGrepp.textContent = weapon.grepp ?? "-";
    tdSTY.textContent = weapon.STY ?? "-";
    tdRackvidd.textContent = weapon.räckvidd ?? "-";
    tdSkada.textContent = weapon.skada ?? "-";
    tdBV.textContent = weapon.BV ?? "-";
    tdEgenskaper.textContent = weapon.egenskaper ?? "-";
  }

  select.addEventListener("change", () => {
  rollperson.vapen[slot] =
    select.value === "inget" ? null : select.value;

  updateRow();
});

  updateRow(); // initial fill
  vapenBody.appendChild(tr);
}
// ── Rustning ─────────────────────────────────
const rustningSelect = document.getElementById("rustning-select");
const bvEl = document.getElementById("rustning-bv");

const cbSmyga = document.getElementById("nackdel-smyga");
wrapAsFardCheckbox(cbSmyga);
const cbUndvika = document.getElementById("nackdel-undvika");
wrapAsFardCheckbox(cbUndvika);
const cbHoppa = document.getElementById("nackdel-hoppa");
wrapAsFardCheckbox(cbHoppa);

const nackdelTextEl = document.getElementById("rustning-nackdel-text");

// Populate dropdown
rustningSelect.innerHTML = buildGroupedOptions({
  items: Object.fromEntries(
    Object.entries(rustningar).filter(
      ([, r]) =>
        isItemFromVisibleKälla(rollperson, r.källa)
    )
  ),
  getLabel: r => r.name,
  getValue: id => id
});

// Initial value
rustningSelect.value = rollperson.rustning ?? "inget";

function updateRustningUI() {
  const armorId = rustningSelect.value;
  const armor = rustningar[armorId];

  rollperson.rustning = armorId;

  bvEl.textContent = armor.SV || "0";

  cbSmyga.checked = armor.nackdelar.smyga;
  cbUndvika.checked = armor.nackdelar.undvika;
  cbHoppa.checked = armor.nackdelar.hoppaochklattra;

  nackdelTextEl.textContent = armor.nackdelarText;
}

rustningSelect.addEventListener("change", () => {
  updateRustningUI();
  render(); // if armor later affects rolls
});

updateRustningUI();

// ── Hjälm ────────────────────────────────────
const hjälmSelect = document.getElementById("hjälm-select");
const hjälmBVEl = document.getElementById("hjälm-bv");

const cbUpptäckaFara = document.getElementById("hjälm-upptackafara");
wrapAsFardCheckbox(cbUpptäckaFara);
const cbAvstånd = document.getElementById("hjälm-avstandsattacker");
wrapAsFardCheckbox(cbAvstånd);
const cbFinnaDolda = document.getElementById("hjälm-finnadoldating");
wrapAsFardCheckbox(cbFinnaDolda);

const hjälmNackdelTextEl = document.getElementById("hjälm-nackdel-text");

// Populate dropdown
hjälmSelect.innerHTML = buildGroupedOptions({
  items: Object.fromEntries(
    Object.entries(hjälmar).filter(
      ([, h]) =>
        isItemFromVisibleKälla(rollperson, h.källa)
    )
  ),
  getLabel: h => h.name,
  getValue: id => id
});

// Initial value
hjälmSelect.value = rollperson.hjälm ?? "inget";

function updateHjälmUI() {
  const hjälmId = hjälmSelect.value;
  const hjälm = hjälmar[hjälmId];

  rollperson.hjälm = hjälmId;

  hjälmBVEl.textContent = hjälm.SV || "0";

  cbUpptäckaFara.checked = hjälm.nackdelar.upptackafara ?? false;
  cbAvstånd.checked = hjälm.nackdelar.avstandsattacker ?? false;
  cbFinnaDolda.checked = hjälm.nackdelar.finnadoldating ?? false;

  hjälmNackdelTextEl.textContent = hjälm.nackdelarText;
}

hjälmSelect.addEventListener("change", () => {
  updateHjälmUI();
  render(); // future-proof if helmets affect rolls
});

updateHjälmUI();

// ── Initial render ───────────────────────────
render();

// Re-render when editor saves
window.addEventListener("character-updated", () => {
  applyCharacterTheme();
  render();
});

// expose render so editor can call it
window.renderCharacterSheet = render;
window.setTheme = setTheme;
});
