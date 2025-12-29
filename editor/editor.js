import { rollperson, computeDerived, validateResources, createDefaultRollperson } from "../rollformular_backend.js";
import { grundegenskaper as grundData } from "../data/karaktärsdata/grundegenskaper.js";
import { färdigheter } from "../data/karaktärsdata/fardigheter.js";
import { vapenfärdigheter } from "../data/karaktärsdata/vapenfardigheter.js";
import { hjälteförmågor as hjälteData } from "../data/listor/data_hjalteformagor.js";
import { släkten } from "../data/listor/data_slakten.js";
import { yrken } from "../data/listor/data_yrken.js";
import { ålder as ålderData } from "../data/listor/data_alder.js";
import { socialt_stånd as socialtStandData } from "../data/listor/socialt_stand.js";
import { getMaxTrainedFärdigheter } from "../rules/MaxTranadeFardigheter.js";
import { addImprovement, removeImprovement, addSpelmöte, removeSpelmöte, getSpelmöten } from "../rollformular_backend.js";

function ensureInitialSpelmöte(character) {
  character.spelmöten ??= [];

  if (character.spelmöten.length === 0) {
    character.spelmöten.push("SM1");
  }
}

async function exportCharacter() {
  const payload = {
    _schemaVersion: SCHEMA_VERSION,
    data: rollperson
  };

  const json = JSON.stringify(payload, null, 2);

  const suggestedName =
    (rollperson.namn || "rollperson")
      .toLowerCase()
      .replace(/\s+/g, "_");

  // ── Chromium browsers ─────────────────────────────
  if ("showSaveFilePicker" in window) {
    try {
      const options = {
        suggestedName: `${suggestedName}.json`,
        types: [
          {
            description: "Karaktärsfil",
            accept: { "application/json": [".json"] }
          }
        ]
      };

      const handle = await window.showSaveFilePicker(options);

      // 🔑 Remember directory
      const parent = await handle.getParent?.();
      if (parent) {
        localStorage.setItem(LAST_EXPORT_DIR_KEY, "true");
      }

      const writable = await handle.createWritable();
      await writable.write(json);
      await writable.close();
      return;

    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err);
        alert("Kunde inte spara filen.");
      }
      return;
    }
  }

  // ── Fallback ──────────────────────────────────────
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${suggestedName}.json`;
  a.click();

  URL.revokeObjectURL(url);
}

// ── Version helpers ─────────────────────────
const SCHEMA_VERSION = 1;

// ── Import Character Function ─────────────────────────
function importCharacter(file, onDone) {
  const reader = new FileReader();

  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);

      const data = migrateCharacterSave(payload);

      // Minimal structural validation
      if (!data.grundegenskaper || !data.färdigheter) {
        throw new Error("Invalid character structure");
      }

      // Replace rollperson IN PLACE
      Object.keys(rollperson).forEach(k => delete rollperson[k]);
      Object.assign(rollperson, data);

      window.dispatchEvent(new Event("character-updated"));
      onDone?.();
    } catch (err) {
      alert("Kunde inte importera karaktärsfilen.");
      console.error(err);
    }
  };

  reader.readAsText(file);
}
// ── Remember directory function ─────────────────────────

const LAST_EXPORT_DIR_KEY = "lastExportDirectoryHandle";

async function getLastDirectoryHandle() {
  const stored = localStorage.getItem(LAST_EXPORT_DIR_KEY);
  if (!stored) return null;

  try {
    return await window.showDirectoryPicker({
      id: "export-dir",
      startIn: "documents",
      mode: "readwrite"
    });
  } catch {
    return null;
  }
}

// ── Migration function ─────────────────────────
function migrateCharacterSave(payload) {
  const version = payload._schemaVersion ?? 0;
  let data = payload.data ?? payload;

  switch (version) {
    case 0:
      // Example: pre-versioned saves
      // data = migrateFromV0(data);
      return data;

    case 1:
      // Current schema
      return data;

    default:
      throw new Error("Unsupported save version: " + version);
  }
}
// ── Förbättringar overlay state ─────────────────────
let currentDraft = null;
const modalOverlay = document.getElementById("modal-overlay");

// ── Commit improvements to live character ─────────
function commitDraftToRollperson() {
  if (!currentDraft) return;

  Object.keys(rollperson).forEach(key => delete rollperson[key]);
  Object.assign(rollperson, structuredClone(currentDraft));

  window.dispatchEvent(new Event("character-updated"));
}
// ── Modal helper ──────────────────────────────────
const Modal = (() => {
  let isOpen = false;

  function open(name) {
    document.querySelectorAll(".modal").forEach(m =>
      m.classList.remove("active")
    );

    modalOverlay.classList.remove("hidden");
    document
      .querySelector(`.modal[data-modal="${name}"]`)
      ?.classList.add("active");

    document.body.style.overflow = "hidden";
    isOpen = true;
  }

  function close() {
  // 🔑 If improvements were open, commit them
  if (
    document
      .querySelector('.modal[data-modal="improvements"]')
      ?.classList.contains("active")
  ) {
    commitDraftToRollperson();
  }

  modalOverlay.classList.add("hidden");
  document.querySelectorAll(".modal").forEach(m =>
    m.classList.remove("active")
  );

  document.body.style.overflow = "";
  isOpen = false;
}

  function init() {
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && isOpen) {
        close();
      }
    });

    modalOverlay.addEventListener("click", e => {
      if (e.target === modalOverlay) {
        close();
      }
    });

    document.querySelectorAll(".modal-close").forEach(btn =>
      btn.addEventListener("click", close)
    );
  }

  return { open, close, init };
})();

const impContent = document.getElementById("improvements-content");
const openImpBtn = document.getElementById("open-improvements");
let addSMBtn;

function renderImprovements() {
  impContent.innerHTML = "";

  if (!currentDraft) return;
    const spelmöten = currentDraft.spelmöten ?? [];
    const latestSM = spelmöten[spelmöten.length - 1];
  /* ── Spelmöten timeline ───────────────────── */
  const smSection = document.createElement("section");
  smSection.innerHTML = `<h3>Spelmöten</h3>`;

  if (getSpelmöten(currentDraft).length === 0) {
  smSection.innerHTML += `<em>Inga spelmöten ännu</em>`;
  } else {
    const list = document.createElement("div");
    list.style.display = "flex";
    list.style.flexWrap = "wrap";
    list.style.gap = "0.5rem";

    getSpelmöten(currentDraft).forEach(sm => {
      const chip = document.createElement("span");
      chip.className = "spelmote-chip";
      chip.textContent = sm;
      chip.title = "Klicka för att ta bort spelmöte";

      chip.addEventListener("click", () => {
      const confirmed = confirm(
        `Ta bort ${sm}?\n\nDetta tar bort alla förbättringar från detta spelmöte.`
      );
      if (!confirmed) return;

      // ✅ Remove spelmöte from draft ONLY
      removeSpelmöte(currentDraft, sm);

      // ✅ Re-render from updated draft
      renderImprovements();

      // (optional but fine)
      window.dispatchEvent(new Event("character-updated"));
    });

      list.appendChild(chip);
    });

    smSection.appendChild(list);
  }

  impContent.appendChild(smSection);

    const info = document.createElement("p");
    info.style.opacity = "0.7";
    info.textContent = "Klicka +SM för att lägga till förbättringar.";
    impContent.appendChild(info);

  function renderList(title, stateObj) {
  const section = document.createElement("section");
  section.innerHTML = `<h3>${title}</h3>`;

  Object.entries(stateObj).forEach(([id, entry]) => {
    entry.förbättringar ??= [];

    if (!entry.harFörbättrats && entry.förbättringar.length === 0) {
      return;
    };

    // ── Resolve base FV FIRST ─────────────────────
    const derived = computeDerived(currentDraft);

    const derivedEntry =
      derived.färdigheter.find(f => f.id === id) ||
      derived.vapenfärdigheter.find(v => v.id === id);

    const baseFV =
    derivedEntry?.grundchans - entry.förbättringar.length || 0;

    // ── Apply Rule C (max FV 18) ──────────────────
    const totalFV = baseFV + entry.förbättringar.length;
    const isMaxed = totalFV >= 18;

    // ── UI row ───────────────────────────────────
      const row = document.createElement("div");
      row.className = "improvement-row";

      // Resolve display name
      const meta =
        färdigheter.find(f => f.id === id) ||
        vapenfärdigheter.find(v => v.id === id);

      const label = document.createElement("strong");
      label.textContent = meta?.name ?? id;

      row.appendChild(label);

    // Existing improvement chips
    entry.förbättringar.forEach(sm => {
    const chip = document.createElement("span");
    chip.className = "improvement-chip";
    chip.textContent = sm;

    chip.addEventListener("click", () => {
      const target =
        title === "Färdigheter"
          ? currentDraft.färdigheter
          : currentDraft.vapenfärdigheter;

      removeImprovement(target, id, sm);

      const entry = target[id];
      if ((entry.förbättringar?.length ?? 0) === 0) {
        entry.förbättrad = false;
        entry.harFörbättrats = false;
      }

      renderImprovements();
    });

    row.appendChild(chip);
  });

    // + SM button (only if spelmöten exist and not already added)
    if (isMaxed) {
      const cap = document.createElement("span");
      cap.className = "improvement-cap";
      cap.textContent = "Max (18)";
      row.appendChild(cap);

    } else if (
      latestSM &&
      entry.förbättrad &&                 // 🔑 MUST be checked this SM
      !entry.förbättringar.includes(latestSM)
    ) {
      const addChip = document.createElement("button");
      addChip.className = "add-improvement";
      addChip.textContent = `+ ${latestSM}`;

      addChip.addEventListener("click", () => {
      const target =
        title === "Färdigheter"
          ? currentDraft.färdigheter
          : currentDraft.vapenfärdigheter;

      addImprovement(target, id, latestSM);

      renderImprovements();
    });

      row.appendChild(addChip);
    }

    section.appendChild(row);
  });

  impContent.appendChild(section);
}

  renderList("Färdigheter", currentDraft.färdigheter);
  renderList("Vapenfärdigheter", currentDraft.vapenfärdigheter);
}
//Color mode
window.addEventListener("DOMContentLoaded", () => {
  
  const openBtn = document.getElementById("open-editor");
  const saveBtn = document.getElementById("save-editor");
  saveBtn.classList.add("ui-button", "ui-button--primary");
  const content = document.getElementById("editor-content");
  let draft = null;

  Modal.init();

/* ───────────────── Editor button ───────────────── */
openBtn.addEventListener("click", () => {
  currentDraft = typeof structuredClone === "function"
    ? structuredClone(rollperson)
    : JSON.parse(JSON.stringify(rollperson));

  draft = currentDraft;

  Modal.open("editor");
  renderEditor();
});

/* ─────────────── Improvements button ────────────── */
openImpBtn.addEventListener("click", () => {
  // Always refresh draft from rollperson when opening improvements
currentDraft = typeof structuredClone === "function"
  ? structuredClone(rollperson)
  : JSON.parse(JSON.stringify(rollperson));

    ensureInitialSpelmöte(currentDraft);

// 🔑 Sync eligibility → visibility
function syncEligibility(src, dest) {
  Object.entries(src).forEach(([id, srcEntry]) => {
    const destEntry = dest[id];
    if (!destEntry) return;

    if (srcEntry.förbättrad) {
      destEntry.harFörbättrats = true;
    }
  });
}

syncEligibility(rollperson.färdigheter, currentDraft.färdigheter);
syncEligibility(rollperson.vapenfärdigheter, currentDraft.vapenfärdigheter);

  Modal.open("improvements");
  renderImprovements();

  const addSMBtn = document.getElementById("add-spelmote");
  if (!addSMBtn) {
    console.error("❌ add-spelmote button not found");
    return;
  }

  addSMBtn.onclick = () => {
  addSpelmöte(currentDraft);

  function resetEligibility(group) {
    Object.values(group).forEach(entry => {
      entry.förbättrad = false;
    });
  }

    resetEligibility(currentDraft.färdigheter);
    resetEligibility(currentDraft.vapenfärdigheter);

    renderImprovements();
  };
  });
  saveBtn.addEventListener("click", () => {
  // ── FINAL VALIDATION ─────────────────────
  const trainedCountFinal =
    Object.values(draft.färdigheter).filter(f => f.tränad).length +
    Object.values(draft.vapenfärdigheter).filter(v => v.tränad).length;

  const maxTrainedFinal = getMaxTrainedFärdigheter(draft);

  if (trainedCountFinal > maxTrainedFinal) {
    alert("För många tränade färdigheter …");
    return;
  }

  // ✅ MOVE yrkeDef HERE
  const yrkeDef = yrken[draft.yrke];

  if (yrkeDef?.hjälteförmågorStart) {
    for (const h of yrkeDef.hjälteförmågorStart) {
      if (!draft.hjälteförmågor[h.id]) {
        draft.hjälteförmågor[h.id] = 1;
      }
    }
  }

  // Commit
  Object.keys(rollperson).forEach(key => delete rollperson[key]);
  Object.assign(rollperson, structuredClone(draft));

  Modal.close();
  window.dispatchEvent(new Event("character-updated"));
});

  function renderAddHjälteUI(parent) {
    if (parent.querySelector(".add-hjälte-ui")) return;
  const wrapper = document.createElement("div");
  wrapper.className = "add-hjälte-ui";

  const select = document.createElement("select");

  const available = Object.entries(hjälteData)
    .filter(([id]) => id !== "ingen")
    .filter(([id]) => !draft.hjälteförmågor[id]);

  select.innerHTML = `
    <option value="">Välj hjälteförmåga…</option>
    ${available.map(
      ([id, h]) =>
        `<option value="${id}">
          ${h.name} (${h.kostnad}${h.krav ? ", krav: " + h.krav : ""})
        </option>`
    ).join("")}
  `;

  const addBtn = document.createElement("button");
  addBtn.textContent = "Lägg till";
  addBtn.disabled = true;

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Avbryt";

  select.addEventListener("change", () => {
    addBtn.disabled = !select.value;
  });

  addBtn.addEventListener("click", () => {
    draft.hjälteförmågor[select.value] = 1;
    renderEditor();
  });

  cancelBtn.addEventListener("click", () => {
    wrapper.remove();
  });

  wrapper.append(select, addBtn, cancelBtn);
  parent.appendChild(wrapper);
}

function labelWrap(label, input) {
  const wrapper = document.createElement("label");
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.marginBottom = "0.5rem";
  wrapper.innerHTML = `<strong>${label}</strong>`;
  wrapper.appendChild(input);
  return wrapper;
}

  function renderEditor() {
    const derived = computeDerived(draft);
    validateResources(draft, derived);
    content.innerHTML = "";

    // ── Export / Import UI ───────────────────────
const saveSection = document.createElement("section");
saveSection.innerHTML = `<h3>Spara / Ladda</h3>`;
const resetBtn = document.createElement("button");
resetBtn.textContent = "Återställ karaktär";
resetBtn.className = "ui-button ui-button--danger";

const exportBtn = document.createElement("button");
exportBtn.textContent = "Exportera karaktär (JSON)";
exportBtn.className = "ui-button";

exportBtn.addEventListener("click", () => {
  exportCharacter();
});

const importBtn = document.createElement("button");
importBtn.textContent = "Importera karaktär (JSON)";
importBtn.className = "ui-button";

const importInput = document.createElement("input");
importInput.type = "file";
importInput.accept = "application/json";
importInput.hidden = true;

importBtn.addEventListener("click", () => {
  importInput.click();
});

importInput.addEventListener("change", () => {
  const file = importInput.files[0];
  if (!file) return;

  const confirmed = confirm(
    "Detta kommer att ersätta nuvarande karaktär.\n\nVill du fortsätta?"
  );

  if (!confirmed) {
    importInput.value = "";
    return;
  }

  importCharacter(file, () => {
    Modal.close();
  });
});
// ── Reset Character Button ─────────────────────────
resetBtn.addEventListener("click", () => {
    const confirmed = confirm(
      "⚠️ Återställ karaktär\n\n" +
      "Detta kommer att radera ALLT:\n" +
      "• Grundegenskaper\n" +
      "• Färdigheter & förbättringar\n" +
      "• Hjälteförmågor\n" +
      "• Utrustning\n\n" +
      "Detta kan inte ångras.\n\n" +
      "Vill du fortsätta?"
    );

    if (!confirmed) return;

    // 🔥 Create fresh default character
    const fresh = createDefaultRollperson();
    ensureInitialSpelmöte(fresh);

    // 🔄 Replace rollperson IN PLACE (important)
    Object.keys(rollperson).forEach(k => delete rollperson[k]);
    Object.assign(rollperson, fresh);

    // 🧹 Clear autosave / persistence
    localStorage.clear();

    // 🔁 Update UI everywhere
    Modal.close();
    window.dispatchEvent(new Event("character-updated"));
  });

//Save Handling
saveSection.append(exportBtn, importBtn, resetBtn, importInput);
content.appendChild(saveSection);


// ── Theme selection ─────────────────────────
const themeSection = document.createElement("section");
themeSection.innerHTML = `<h3>Färgtema</h3>`;

const themeSelect = document.createElement("select");

themeSelect.innerHTML = `
  <option value="main">Standard</option>
  <option value="dark">Mörk pergament</option>
  <option value="pink-dragon">Pink dragon</option>
  <option value="blue-steel">Blue steel</option>
`;

themeSelect.value = draft.theme ?? "main";

themeSelect.addEventListener("change", () => {
  draft.theme = themeSelect.value;
});

themeSection.appendChild(themeSelect);
content.appendChild(themeSection); 
     
// ── Avatar / Porträtt ─────────────────────────
const avatarSection = document.createElement("section");
avatarSection.innerHTML = `<h3>Porträtt</h3>`;

const avatarWrapper = document.createElement("div");
avatarWrapper.className = "editor-avatar";

const avatarImg = document.createElement("img");
avatarImg.src = draft.avatar || "../art/avatar_placeholder.png";
avatarImg.alt = "Porträtt";

avatarWrapper.appendChild(avatarImg);

// ── Drag & drop support for avatar ─────────────
avatarWrapper.addEventListener("dragover", e => {
  e.preventDefault();               // REQUIRED
  avatarWrapper.classList.add("drag-over");
});

avatarWrapper.addEventListener("dragleave", () => {
  avatarWrapper.classList.remove("drag-over");
});

avatarWrapper.addEventListener("drop", e => {
  e.preventDefault();
  avatarWrapper.classList.remove("drag-over");

  const file = e.dataTransfer.files[0];
  if (!file) return;

  // Reuse SAME validation logic as file input
  if (file.size > 4 * 1024 * 1024) {
    alert("Bilden är för stor (max 4 MB).");
    return;
  }

  if (!["image/png", "image/jpeg"].includes(file.type)) {
    alert("Endast PNG eller JPG är tillåtna.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    draft.avatar = reader.result;
    avatarImg.src = reader.result;
  };
  reader.readAsDataURL(file);
});

const changeBtn = document.createElement("button");
changeBtn.type = "button";
changeBtn.textContent = "Ändra porträtt";
changeBtn.className = "ui-button";

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "image/png, image/jpeg";
fileInput.hidden = true;

const help = document.createElement("div");
help.className = "editor-help";
help.textContent = "PNG eller JPG, max 4 MB.";

changeBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  if (file.size > 4 * 1024 * 1024) {
    alert("Bilden är för stor (max 4 MB).");
    fileInput.value = "";
    return;
  }

  if (!["image/png", "image/jpeg"].includes(file.type)) {
    alert("Endast PNG eller JPG är tillåtna.");
    fileInput.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    draft.avatar = reader.result;   // saved with character
    avatarImg.src = reader.result; // live preview
  };
  reader.readAsDataURL(file);
});

avatarSection.append(
  avatarWrapper,
  changeBtn,
  fileInput,
  help
);

content.appendChild(avatarSection);

  const trainedCount =
    Object.values(draft.färdigheter).filter(f => f.tränad).length +
    Object.values(draft.vapenfärdigheter).filter(v => v.tränad).length;

  const maxTrained = getMaxTrainedFärdigheter(draft);

  // ── Enforce max trained skills ─────────────────
  if (trainedCount > maxTrained) {
    let toRemove = trainedCount - maxTrained;

    // Untrain färdigheter first
    for (const f of Object.values(draft.färdigheter)) {
      if (toRemove <= 0) break;
      if (f.tränad) {
        f.tränad = false;
        toRemove--;
      }
    }

    // Then vapenfärdigheter if still needed
    for (const v of Object.values(draft.vapenfärdigheter)) {
      if (toRemove <= 0) break;
      if (v.tränad) {
        v.tränad = false;
        toRemove--;
      }
    }
  }

// ── Rollperson (basinfo) ─────────────────────
const metaSection = document.createElement("section");
metaSection.innerHTML = `<h3>Rollperson</h3>`;

// Släkte
const släkteSelect = document.createElement("select");
släkteSelect.innerHTML = Object.entries(släkten)
  .map(([id, s]) => `<option value="${id}">${s.name}</option>`)
  .join("");
släkteSelect.value = draft.släkte;
släkteSelect.onchange = () => {
  draft.släkte = släkteSelect.value;
  renderEditor();
};

// Yrke
const yrkeSelect = document.createElement("select");
yrkeSelect.innerHTML = Object.entries(yrken)
  .map(([id, y]) => `<option value="${id}">${y.name}</option>`)
  .join("");
yrkeSelect.value = draft.yrke;
yrkeSelect.onchange = () => {
  draft.yrke = yrkeSelect.value;
};

// Ålder
const ålderSelect = document.createElement("select");
ålderSelect.innerHTML = Object.entries(ålderData)
  .map(([id, a]) => `<option value="${id}">${a.name}</option>`)
  .join("");
ålderSelect.value = draft.ålder;
ålderSelect.onchange = () => {
  draft.ålder = ålderSelect.value;
  renderEditor(); // age affects stats
};

// Svaghet
const svaghetInput = document.createElement("input");
svaghetInput.value = draft.svaghet;
svaghetInput.oninput = () => {
  draft.svaghet = svaghetInput.value;
};

// Språk
const språkInput = document.createElement("input");
språkInput.value = draft.språk;
språkInput.oninput = () => {
  draft.språk = språkInput.value;
};

// Socialt stånd
const socialSelect = document.createElement("select");
socialSelect.innerHTML = Object.entries(socialtStandData)
  .map(([id, s]) => `<option value="${id}">${s.name}</option>`)
  .join("");
socialSelect.value = draft.socialt_stånd.namn;
socialSelect.onchange = () => {
  draft.socialt_stånd.namn = socialSelect.value;
  renderEditor();
};

const socialText = document.createElement("input");
socialText.value = draft.socialt_stånd.text;
socialText.oninput = () => {
  draft.socialt_stånd.text = socialText.value;
};

// Utseende
const utseendeInput = document.createElement("input");
utseendeInput.value = draft.utseende;
utseendeInput.oninput = () => {
  draft.utseende = utseendeInput.value;
};

// Minnessak
const minnessakInput = document.createElement("input");
minnessakInput.value = draft.minnessak;
minnessakInput.oninput = () => {
  draft.minnessak = minnessakInput.value;
};

// Layout
metaSection.append(
  labelWrap("Släkte", släkteSelect),
  labelWrap("Yrke", yrkeSelect),
  labelWrap("Ålder", ålderSelect),
  labelWrap("Svaghet", svaghetInput),
  labelWrap("Språk", språkInput),
  labelWrap("Socialt stånd", socialSelect),
  labelWrap("Beskrivning", socialText),
  labelWrap("Utseende", utseendeInput),
  labelWrap("Minnessak", minnessakInput)
);

content.appendChild(metaSection);
// ── Resurser (KP / VP) ───────────────────────
const resursSection = document.createElement("section");
resursSection.innerHTML = `
  <h3>Resurser</h3>

  <div class="editor-resurser">

    <div class="editor-resurs kp">
      <strong>Kroppspoäng</strong>
      <div class="editor-resurs-controls">
        <button class="kp-plus">+</button>
        <span class="editor-resurs-value">
          ${draft.kroppspoäng.current} / ${derived.kroppspoäng.max}
        </span>
        <button class="kp-minus">−</button>
      </div>
    </div>

    <div class="editor-resurs vp">
      <strong>Viljepoäng</strong>
      <div class="editor-resurs-controls">
        <button class="vp-plus">+</button>
        <span class="editor-resurs-value">
          ${draft.viljepoäng.current} / ${derived.viljepoäng.max}
        </span>
        <button class="vp-minus">−</button>
      </div>
    </div>

  </div>
`;

content.appendChild(resursSection);
    
// KP buttons
resursSection.querySelector(".kp-plus").addEventListener("click", () => {
  draft.kroppspoäng.current = Math.min(
    draft.kroppspoäng.current + 1,
    derived.kroppspoäng.max
  );
  renderEditor();
});

resursSection.querySelector(".kp-minus").addEventListener("click", () => {
  draft.kroppspoäng.current = Math.max(
    draft.kroppspoäng.current - 1,
    0
  );
  renderEditor();
});

// VP buttons
resursSection.querySelector(".vp-plus").addEventListener("click", () => {
  draft.viljepoäng.current = Math.min(
    draft.viljepoäng.current + 1,
    derived.viljepoäng.max
  );
  renderEditor();
});

resursSection.querySelector(".vp-minus").addEventListener("click", () => {
  draft.viljepoäng.current = Math.max(
    draft.viljepoäng.current - 1,
    0
  );
  renderEditor();
});

  // ── Grundegenskaper ───────────────────────
  const section = document.createElement("section");
  section.innerHTML = `<h3>Grundegenskaper</h3>`;

  const table = document.createElement("table");
  table.className = "editor-table";

  table.innerHTML = `
    <thead>
      <tr>
        <th>Egenskap</th>
        <th>Rullad</th>
        <th>Ålder</th>
        <th>Slutvärde</th>
        <th>Pressad</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  for (const [key, state] of Object.entries(draft.grundegenskaper)) {
  const meta = grundData[key];          // ✅ MISSING
  const tr = document.createElement("tr"); // ✅ MISSING

  const ageMod =
    ålderData[draft.ålder]?.grundegenskaper?.[key] ?? 0;

  const derivedValue =
  derived.grundegenskaper[key].value;

  tr.innerHTML = `
    <td>${meta.name} (${meta.kort})</td>
    <td>
      <input type="number" min="1" max="18" value="${state.värde}">
    </td>
    <td>
      ${ageMod !== 0 ? (ageMod > 0 ? "+" : "") + ageMod : "—"}
    </td>
    <td><strong>${derivedValue}</strong></td>
    <td>
      <input type="checkbox" ${state.pressad ? "checked" : ""}>
    </td>
  `;

  const valueInput = tr.querySelector('input[type="number"]');
  const pressadInput = tr.querySelector('input[type="checkbox"]');

  valueInput.addEventListener("input", () => {
    state.värde = Number(valueInput.value);
    renderEditor();
  });

  pressadInput.addEventListener("change", () => {
    state.pressad = pressadInput.checked;
    renderEditor();
  });

  tbody.appendChild(tr);
}

  section.appendChild(table);
  content.appendChild(section);
  // ── Färdigheter ─────────────────────────────
const färdSection = document.createElement("section");
färdSection.innerHTML = `<h3>Färdigheter</h3>`;

const färdTable = document.createElement("table");
färdTable.className = "editor-table";

färdTable.innerHTML = `
  <thead>
    <tr>
      <th>Färdighet</th>
      <th>Grund</th>
      <th>FV</th>
      <th>Tränad</th>
      <th>Förbättras</th>
    </tr>
  </thead>
  <tbody></tbody>
`;

const färdTbody = färdTable.querySelector("tbody");

for (const f of färdigheter) {
  const state =
    draft.färdigheter[f.id] ??
    (draft.färdigheter[f.id] = {
      tränad: false,
      förbättrad: false, 
      förbättringar: [],  
      harFörbättrats: false   
    });
  const derivedF = derived.färdigheter.find(x => x.id === f.id);
  const totalFV = derivedF.grundchans + state.förbättringar.length;
  const isMaxed = totalFV >= 18;

  const tr = document.createElement("tr");

  tr.innerHTML = `
  <td>${f.name}</td>
  <td>${grundData[f.grundegenskap]?.kort ?? "?"}</td>
  <td><strong>${derivedF.grundchans}</strong></td>
  <td>
  <input type="checkbox" class="trained" ${state.tränad ? "checked" : ""} />
  </td>
  <td>
    <input
      type="checkbox"
      class="improvable"
      ${state.förbättrad ? "checked" : ""}
      ${isMaxed ? "disabled" : ""}
    />
  </td>
`;

  const trainedBox = tr.querySelector(".trained");
const improvableBox = tr.querySelector(".improvable");

trainedBox.addEventListener("change", () => {
  state.tränad = trainedBox.checked;
  renderEditor();
});

improvableBox.addEventListener("change", () => {
  if (isMaxed) return; // 🔒 hard stop

  state.förbättrad = improvableBox.checked;

  if (improvableBox.checked) {
    state.harFörbättrats = true;
  }

  renderEditor();
});

  färdTbody.appendChild(tr);
}

färdSection.appendChild(färdTable);
content.appendChild(färdSection);
// ── Vapenfärdigheter ────────────────────────
const vapenSection = document.createElement("section");
vapenSection.innerHTML = `<h3>Vapenfärdigheter</h3>`;

const vapenTable = document.createElement("table");
vapenTable.className = "editor-table";

vapenTable.innerHTML = `
  <thead>
    <tr>
      <th>Vapenfärdighet</th>
      <th>Grund</th>
      <th>FV</th>
      <th>Tränad</th>
    </tr>
  </thead>
  <tbody></tbody>
`;

const vapenTbody = vapenTable.querySelector("tbody");

for (const v of vapenfärdigheter) {
  const state =
    draft.vapenfärdigheter[v.id] ??
    (draft.vapenfärdigheter[v.id] = {
      tränad: false,
      förbättrad: false,
      förbättringar: [],
      harFörbättrats: false
    });
  const derivedV = derived.vapenfärdigheter.find(x => x.id === v.id);

  const tr = document.createElement("tr");

  tr.innerHTML = `
  <td>${v.name}</td>
  <td>${grundData[v.grundegenskap]?.kort ?? "?"}</td>
  <td><strong>${derivedV.grundchans}</strong></td>
  <td>
    <input
      type="checkbox"
      ${state.tränad ? "checked" : ""}
      ${!state.tränad && trainedCount >= maxTrained ? "disabled" : ""}
    />
  </td>
`;

  const checkbox = tr.querySelector("input");

  checkbox.addEventListener("change", () => {
  state.tränad = checkbox.checked;
  renderEditor();
});

  vapenTbody.appendChild(tr);
}

vapenSection.appendChild(vapenTable);
content.appendChild(vapenSection);

// ── Tränade färdigheter ──────────────────────
const limitEl = document.createElement("div");
limitEl.style.marginTop = "0.75rem";
limitEl.style.fontWeight = "bold";

limitEl.textContent =
  `Tränade färdigheter: ${trainedCount} / ${maxTrained}`;

if (trainedCount >= maxTrained) {
  limitEl.style.color = "#b45309"; // amber
}

if (trainedCount > maxTrained) {
  limitEl.style.color = "#b91c1c"; // red
}

content.appendChild(limitEl);

// ── Hjälteförmågor ───────────────────────────
const hjälteSection = document.createElement("section");
hjälteSection.innerHTML = `<h3>Hjälteförmågor</h3>`;

const hjälteTable = document.createElement("table");
hjälteTable.className = "editor-table";

hjälteTable.innerHTML = `
  <thead>
    <tr>
      <th>Namn</th>
      <th>Kostnad</th>
      <th>Beskrivning</th>
      <th></th>
    </tr>
  </thead>
  <tbody></tbody>
`;

const hjälteTbody = hjälteTable.querySelector("tbody");

for (const [id, count] of Object.entries(draft.hjälteförmågor)) {
  const data = hjälteData[id];
  if (!data) continue;

  const tr = document.createElement("tr");

  const stackControls = data.stackable
    ? `
      <div class="stack-controls">
        <button class="stack-plus">+</button>
        <span class="stack-count">× ${count}</span>
        <button class="stack-minus">−</button>
      </div>
    `
    : "";

  tr.innerHTML = `
    <td>
      <strong>${data.name}</strong>
      ${data.stackable ? `<div class="stack-label">Stackbar</div>` : ""}
    </td>
    <td>${data.kostnad}</td>
    <td class="hjälte-text">${data.text}</td>
    <td>
      ${stackControls}
      <button class="remove-hjälte ui-button">✕</button>
    </td>
  `;

  // Remove button
  tr.querySelector(".remove-hjälte").addEventListener("click", () => {
    const confirmed = confirm(
      "Är du säker att du vill ta bort din hjälteförmåga?"
    );
    if (!confirmed) return;
    delete draft.hjälteförmågor[id];
    renderEditor();
  });

  // Stack controls
  if (data.stackable) {
    tr.querySelector(".stack-plus").addEventListener("click", () => {
      draft.hjälteförmågor[id]++;
      renderEditor();
    });

    tr.querySelector(".stack-minus").addEventListener("click", () => {
      draft.hjälteförmågor[id]--;

      if (draft.hjälteförmågor[id] <= 0) {
        delete draft.hjälteförmågor[id];
      }
      renderEditor();
    });
  }

  hjälteTbody.appendChild(tr);
}
hjälteSection.appendChild(hjälteTable);

const addBtn = document.createElement("button");
addBtn.textContent = "+ Lägg till hjälteförmåga";
addBtn.className = "ui-button";

addBtn.addEventListener("click", () => {
  renderAddHjälteUI(hjälteSection);
});

hjälteSection.appendChild(addBtn);
content.appendChild(hjälteSection);
  }
});