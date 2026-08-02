//RULES
import { grundchansFörFärdighet } from "./rules/grundchans.js";
import { förflyttningsBonusFrånSmidighet } from "./rules/forflyttning.js";
import { skadebonusFrånVärde } from "./rules/skadebonus.js";
import { computeViljepoäng } from "./rules/viljepoang.js";
import { computeKroppspoäng } from "./rules/kroppspoang.js";

// DATA DEFINITIONS
import { färdigheter } from "./data/karaktärsdata/fardigheter.js";
import { vapenfärdigheter } from "./data/karaktärsdata/vapenfardigheter.js";
import { släkten } from "./data/listor/data_slakten.js";
import { ålder as ålderData } from "./data/listor/data_alder.js";
import { magiskolor } from "./data/karaktärsdata/magiskolor.js";

// Default skill states

const DEFAULT_SKILL_STATE = {
  tränad: false,
  förbättrad: false,
  förbättringar: []
};

function normalizeSpells(character) {
  // Ensure objects exist
  character.trolleritrick ??= {};
  character.besvärjelser ??= {};

  // Normalize trolleritrick
  for (const [id, value] of Object.entries(character.trolleritrick)) {
    if (value === true) {
      character.trolleritrick[id] = { known: true };
    } else {
      character.trolleritrick[id].known ??= false;
    }
  }

  // Normalize besvärjelser
  for (const [id, value] of Object.entries(character.besvärjelser)) {
    if (value === true) {
      character.besvärjelser[id] = {
        known: true,
        prepared: false
      };
    } else {
      character.besvärjelser[id].known ??= false;
      character.besvärjelser[id].prepared ??= false;
    }
  }
}
// DERIVED VALUES (function)
export function computeDerived(character) {

  normalizeSpells(character);

  character.magiskolor ??= {};
character.färdigheter ??= {};

for (const magiskolaId of Object.keys(character.magiskolor)) {
  const def = magiskolor.find(m => m.id === magiskolaId);
  if (!def) continue;

  const färdighetId = `magiskola_${def.id}`;

  character.färdigheter[färdighetId] ??= {
    tränad: true,
    förbättrad: false,
    förbättringar: [],
    harFörbättrats: false
  };

  // 🔒 Magiskolor are ALWAYS trained
  character.färdigheter[färdighetId].tränad = true;
}

// Remove orphaned magiskola skills
for (const färdighetId of Object.keys(character.färdigheter)) {
  if (!färdighetId.startsWith("magiskola_")) continue;

  const magiskolaId = färdighetId.replace("magiskola_", "");

  if (!character.magiskolor[magiskolaId]) {
    delete character.färdigheter[färdighetId];
  }
}
  for (const färdighetId of Object.keys(rollperson.färdigheter)) {
  if (!färdighetId.startsWith("magiskola_")) continue;

  const magiskolaId = färdighetId.replace("magiskola_", "");

  if (!rollperson.magiskolor[magiskolaId]) {
    delete rollperson.färdigheter[färdighetId];
  }
}
  // ── Derived grundegenskaper (Ålder applied) ──
  const derivedGrundegenskaper = {};

  for (const key of Object.keys(character.grundegenskaper)) {
    const base = character.grundegenskaper[key].värde;
    const mod =
      ålderData[character.ålder]?.grundegenskaper?.[key] ?? 0;

    derivedGrundegenskaper[key] = {
      base,
      mod,
      value: base + mod
    };
  }
  // ── INT grundchans (used for prepared spells limit) ──
  const intelligensGrundchans =
  grundchansFörFärdighet(
    { grundegenskap: "intelligens" },
    {
      ...character,
      derivedGrundegenskaper
    }
  );
     // ── Enforce prepared besvärjelser limit ─────────────
  const preparedIds = Object.entries(character.besvärjelser ?? {})
    .filter(([, s]) => s.prepared)
    .map(([id]) => id);

  if (preparedIds.length > intelligensGrundchans) {
    // Too many prepared → unprepare extras (last ones)
    preparedIds
      .slice(intelligensGrundchans)
      .forEach(id => {
        character.besvärjelser[id].prepared = false;
      });
  }
  // ── Släkte → grundförflyttning ──────────────
  const släkteDef = släkten[character.släkte];
  const grundförflyttning = släkteDef.grundförflyttning;

  // ── Förflyttning ────────────────────────────
  const smidighetVärde = derivedGrundegenskaper.smidighet.value;
  const förflyttningsBonus =
    förflyttningsBonusFrånSmidighet(smidighetVärde);

  // ── Skadebonus ──────────────────────────────
  const styrkaVärde = derivedGrundegenskaper.styrka.value;

  const skadebonusStyrka = skadebonusFrånVärde(styrkaVärde);
  const skadebonusSmidighet = skadebonusFrånVärde(smidighetVärde);

  // ── Resurser ────────────────────────────────
  const viljepoäng = computeViljepoäng(
  character,
  derivedGrundegenskaper
);
  const kroppspoäng = computeKroppspoäng(
  character,
  derivedGrundegenskaper
);

  // ── Färdigheter ─────────────────────────────
  const derivedFärdigheter = färdigheter.map(def => {
  const state = character.färdigheter[def.id] ?? DEFAULT_SKILL_STATE;

  return {
    ...def,
    ...state,
    källa: def.källa, // ✅ ADD THIS
    förbättringBonus: state.förbättringar?.length ?? 0,
    grundchans:
      grundchansFörFärdighet({ ...def, ...state }, character) +
      (state.förbättringar?.length ?? 0)
  };
});
// ── Magiskolor → dynamic färdigheter ─────────────────
const magiskolaFärdigheter = Object.keys(character.magiskolor).map(id => {
  const def = magiskolor.find(m => m.id === id);
  if (!def) return null;

  const färdighetId = `magiskola_${id}`;

  const state = character.färdigheter[färdighetId] ?? {
    tränad: true,
    förbättrad: false,
    förbättringar: []
  };

  return {
    id: färdighetId,
    name: def.name,
    grundegenskap: def.grundegenskap,
    källa: def.källa,

    tränad: true, // 🔒 ALWAYS trained
    förbättrad: state.förbättrad,
    förbättringar: state.förbättringar ?? [],
    förbättringBonus: state.förbättringar?.length ?? 0,

    grundchans:
      grundchansFörFärdighet(
        { grundegenskap: def.grundegenskap, tränad: true },
        character
      ) +
      (state.förbättringar?.length ?? 0)
  };
}).filter(Boolean);

  // ── Vapenfärdigheter ────────────────────────
  const derivedVapenfärdigheter = vapenfärdigheter.map(def => {
  const state = character.vapenfärdigheter[def.id] ?? DEFAULT_SKILL_STATE;

  return {
    ...def,
    ...state,
    källa: def.källa, // ✅ ADD THIS
    förbättringBonus: state.förbättringar?.length ?? 0,
    grundchans:
      grundchansFörFärdighet({ ...def, ...state }, character) +
      (state.förbättringar?.length ?? 0)
  };
});

  // ── FINAL RETURN (ONLY ONE) ─────────────────
  return {
  grundegenskaper: derivedGrundegenskaper,
  färdigheter: [
    ...derivedFärdigheter,
    ...magiskolaFärdigheter
  ],
  vapenfärdigheter: derivedVapenfärdigheter,
  förflyttning: grundförflyttning + förflyttningsBonus,
  skadebonus: {
    styrka: skadebonusStyrka,
    smidighet: skadebonusSmidighet
  },
  viljepoäng,
  kroppspoäng,
  magi: {
    intelligensGrundchans,
    maxPreparedBesvärjelser: intelligensGrundchans
  }
};
}
//ROLLPERSON
export const rollperson ={
  avatar: null,
  theme: "main",
  namn: "Fyll i namn...",
  släkte: "människa",
  yrke: "bard",
  ålder: "medelålders",
  svaghet: "Fyll i svaghet...",
  språk: "Fyll i språk...",
  socialt_stånd: {
    namn: "adel",
    text:"Specificera socialt stånd..."
  },
  utseende: "Fyll i utseende...",
  minnessak: "Fyll i minnessak...",
  magiker: false,
  magiskolor: {},
  trolleritrick: {
    // trickId: { known: true }
    },

    besvärjelser: {
      // spellId: { known: true, prepared: false }
    },

//GRUNDEGENSKAPER
  grundegenskaper: {
    styrka: { värde: 10, pressad: false },
    fysik: { värde: 10, pressad: false },
    smidighet: { värde: 10, pressad: false },
    intelligens: { värde: 10, pressad: false },
    psyke: { värde: 10, pressad: false },
    karisma: { värde: 10, pressad: false },
  },

  // RESURSER (current values)
  viljepoäng: {
    current: 0
  },
  kroppspoäng: {
    current: 0
  },

//SPELMÖTEN
spelmöten: [],
//KÄLLOR
källorSynliga: {},
//FÄRDIGHETER
  färdigheter: Object.fromEntries(
  färdigheter.map(f => [
    f.id,
    { tränad: false, förbättringar: [] }
  ])
),
//VAPENFÄRDIGHETER
  vapenfärdigheter: Object.fromEntries(
  vapenfärdigheter.map(v => [
    v.id,
    { tränad: false, förbättringar: [] }
  ])
),

//INSTRUMENT (som används)
instrument: [
  null,
  null,
  null
],
//VAPEN (som används)
vapen: [
  null,
  null,
  null
],
vapenAnteckningar: [
  "",
  "",
  ""
],
//RUSTNING (som används)
rustning: "inget",
//HJÄLM (som används)
hjälm: "inget",
//HJÄLTEFÖRMÅGOR
  hjälteförmågor: {}
  ,
// Bibliotek favoriter
  bibliotekFavoriter: {}
};
const derived = computeDerived(rollperson);
console.log(derived.färdigheter);

export function validateResources(character, derived) {
  // --- Kroppspoäng ---
  if (character.kroppspoäng.current == null) {
    character.kroppspoäng.current = derived.kroppspoäng.max;
  }

  character.kroppspoäng.current = Math.max(
    0,
    Math.min(character.kroppspoäng.current, derived.kroppspoäng.max)
  );

  // --- Viljepoäng ---
  if (character.viljepoäng.current == null) {
    character.viljepoäng.current = derived.viljepoäng.max;
  }

  character.viljepoäng.current = Math.max(
    0,
    Math.min(character.viljepoäng.current, derived.viljepoäng.max)
  );
}

// ── Spelmöten (stored on character) ─────────────────────

export function getSpelmöten(character) {
  character.spelmöten ??= [];
  return character.spelmöten;
}

export function addSpelmöte(character) {
  character.spelmöten ??= [];
  const nextNr = character.spelmöten.length + 1;
  const sm = `SM${nextNr}`;
  character.spelmöten.push(sm);
  return sm;
}

// ── Förbättringar helpers ──────────────────────────────

export function addImprovement(stateObj, id, spelmöte) {
  const entry = stateObj[id];
  if (!entry) return;

  entry.förbättringar ??= [];

  // Prevent duplicates for same session
  if (!entry.förbättringar.includes(spelmöte)) {
    entry.förbättringar.push(spelmöte);
  }
}

export function removeImprovement(stateObj, id, spelmöte) {
  const entry = stateObj[id];
  if (!entry?.förbättringar) return;

  entry.förbättringar =
    entry.förbättringar.filter(sm => sm !== spelmöte);
}

export function getImprovementBonus(entry) {
  return entry?.förbättringar?.length ?? 0;
}
export function removeSpelmöte(character, spelmöte) {
  // 1. Remove from spelmöten list
  character.spelmöten =
    (character.spelmöten ?? []).filter(sm => sm !== spelmöte);

  // 2. Remove from all färdigheter
  Object.values(character.färdigheter).forEach(entry => {
    entry.förbättringar =
      (entry.förbättringar ?? []).filter(sm => sm !== spelmöte);
  });

  // 3. Remove from all vapenfärdigheter
  Object.values(character.vapenfärdigheter).forEach(entry => {
    entry.förbättringar =
      (entry.förbättringar ?? []).filter(sm => sm !== spelmöte);
  });
}
// Återställt formulär.
export function createDefaultRollperson() {
  return structuredClone({
    avatar: null,
    theme: "main",
    namn: "Fyll i namn...",
    släkte: "människa",
    yrke: "bard",
    ålder: "medelålders",
    svaghet: "Fyll i svaghet...",
    språk: "Fyll i språk...",
    socialt_stånd: {
      namn: "adel",
      text: "Specificera socialt stånd..."
    },
    utseende: "Fyll i utseende...",
    minnessak: "Fyll i minnessak...",
    magiker: false,
    magiskolor: {},
    trolleritrick: {
    // trickId: { known: true }
    },

    besvärjelser: {
      // spellId: { known: true, prepared: false }
    },

    grundegenskaper: {
      styrka: { värde: 10, pressad: false },
      fysik: { värde: 10, pressad: false },
      smidighet: { värde: 10, pressad: false },
      intelligens: { värde: 10, pressad: false },
      psyke: { värde: 10, pressad: false },
      karisma: { värde: 10, pressad: false }
    },

    viljepoäng: { current: 0 },
    kroppspoäng: { current: 0 },

    spelmöten: [],

    källorSynliga: {},

    färdigheter: Object.fromEntries(
      färdigheter.map(f => [
        f.id,
        { tränad: false, förbättrad: false, förbättringar: [] }
      ])
    ),

    vapenfärdigheter: Object.fromEntries(
      vapenfärdigheter.map(v => [
        v.id,
        { tränad: false, förbättrad: false, förbättringar: [] }
      ])
    ),

    instrument: [null, null, null],
    vapen: [null, null, null],
    vapenAnteckningar: ["", "", ""],

    rustning: "inget",
    hjälm: "inget",

    hjälteförmågor: {}
  });
}