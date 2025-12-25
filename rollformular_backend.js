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
import { socialt_stånd as socialtStandData } from "./data/listor/socialt_stand.js";

// Default skill states

const DEFAULT_SKILL_STATE = {
  tränad: false,
  förbättrad: false,
  förbättringar: []
};

function normalizeSkill(definition, characterState = {}) {
  return {
    ...definition,
    ...DEFAULT_SKILL_STATE,
    ...characterState
  };
}

// DERIVED VALUES (function)
export function computeDerived(rollperson) {
  // ── Derived grundegenskaper (Ålder applied) ──
  const derivedGrundegenskaper = {};

  for (const key of Object.keys(rollperson.grundegenskaper)) {
    const base = rollperson.grundegenskaper[key].värde;
    const mod =
      ålderData[rollperson.ålder]?.grundegenskaper?.[key] ?? 0;

    derivedGrundegenskaper[key] = {
      base,
      mod,
      value: base + mod
    };
  }

  // ── Släkte → grundförflyttning ──────────────
  const släkteDef = släkten[rollperson.släkte];
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
  const viljepoäng = computeViljepoäng(rollperson);
  const kroppspoäng = computeKroppspoäng(rollperson);

  // ── Färdigheter ─────────────────────────────
  const derivedFärdigheter = färdigheter.map(def => {
  const state =
    rollperson.färdigheter[def.id] ??
    DEFAULT_SKILL_STATE;

  const förbättringar = state.förbättringar ?? [];
  const förbättringBonus = förbättringar.length;

  return {
    ...def,
    ...state,
    förbättringar,
    förbättringBonus,
    grundchans:
      grundchansFörFärdighet(
        { ...def, ...state },
        rollperson
      ) + förbättringBonus
  };
});

  // ── Vapenfärdigheter ────────────────────────
  const derivedVapenfärdigheter = vapenfärdigheter.map(def => {
  const state =
    rollperson.vapenfärdigheter[def.id] ??
    DEFAULT_SKILL_STATE;

  const förbättringar = state.förbättringar ?? [];
  const förbättringBonus = förbättringar.length;

  return {
    ...def,
    ...state,
    förbättringar,
    förbättringBonus,
    grundchans:
      grundchansFörFärdighet(
        { ...def, ...state },
        rollperson
      ) + förbättringBonus
  };
});

  // ── FINAL RETURN (ONLY ONE) ─────────────────
  return {
    grundegenskaper: derivedGrundegenskaper,
    färdigheter: derivedFärdigheter,
    vapenfärdigheter: derivedVapenfärdigheter,
    förflyttning: grundförflyttning + förflyttningsBonus,
    skadebonus: {
      styrka: skadebonusStyrka,
      smidighet: skadebonusSmidighet
    },
    viljepoäng,
    kroppspoäng
  };
}
//ROLLPERSON
export const rollperson ={
  avatar: null,
  namn: "Kalax Argenbjärt",
  släkte: "människa",
  yrke: "bard",
  ålder: "medelålders",
  svaghet: "högfärdig",
  språk: "Jori, Nagurgiska",
  socialt_stånd: {
    namn: "adel",
    text:"Högadel från Aidne"
  },
  utseende: "Storslagen frisyr",
  minnessak: "Brev från en gammal vän eller släkting",

//GRUNDEGENSKAPER
  grundegenskaper: {
    styrka: { värde: 14, pressad: false },
    fysik: { värde: 12, pressad: false },
    smidighet: { värde: 13, pressad: false },
    intelligens: { värde: 14, pressad: false },
    psyke: { värde: 11, pressad: false },
    karisma: { värde: 16, pressad: false },
  },

  // RESURSER (current values)
  viljepoäng: {
    current: 0
  },
  kroppspoäng: {
    current: 0
  },

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
  hjälteförmågor: {
    tonkonst: 1,
    sändebud: 1
  }
  
};
const derived = computeDerived(rollperson);
console.log(derived.färdigheter);

export function validateResources(rollperson, derived) {
  // --- Kroppspoäng ---
  if (rollperson.kroppspoäng.current == null) {
    rollperson.kroppspoäng.current = derived.kroppspoäng.max;
  }

  rollperson.kroppspoäng.current = Math.max(
    0,
    Math.min(rollperson.kroppspoäng.current, derived.kroppspoäng.max)
  );

  // --- Viljepoäng ---
  if (rollperson.viljepoäng.current == null) {
    rollperson.viljepoäng.current = derived.viljepoäng.max;
  }

  rollperson.viljepoäng.current = Math.max(
    0,
    Math.min(rollperson.viljepoäng.current, derived.viljepoäng.max)
  );
}

// ── Spelmöten (global campaign timeline) ─────────────
export const spelmöten = [];
export function addSpelmöte() {
  const nextNr = spelmöten.length + 1;
  const sm = `SM${nextNr}`;
  spelmöten.push(sm);
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
// ── Remove entire spelmöte (undo helper) ─────────────────────
export function removeSpelmöte(spelmöte) {
  // 1. Remove from global spelmöten list
  const index = spelmöten.indexOf(spelmöte);
  if (index !== -1) {
    spelmöten.splice(index, 1);
  }

  // 2. Remove from all färdigheter
  Object.values(rollperson.färdigheter).forEach(entry => {
    if (!entry.förbättringar) return;

    entry.förbättringar =
      entry.förbättringar.filter(sm => sm !== spelmöte);
  });

  // 3. Remove from all vapenfärdigheter
  Object.values(rollperson.vapenfärdigheter).forEach(entry => {
    if (!entry.förbättringar) return;

    entry.förbättringar =
      entry.förbättringar.filter(sm => sm !== spelmöte);
  });
}