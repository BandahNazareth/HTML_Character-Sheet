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

// Default skill states

const DEFAULT_SKILL_STATE = {
  tränad: false,
  förbättrad: false,
  förbättringar: []
};


// DERIVED VALUES (function)
export function computeDerived(character) {
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
  const viljepoäng = computeViljepoäng(character);
  const kroppspoäng = computeKroppspoäng(character);

  // ── Färdigheter ─────────────────────────────
  const derivedFärdigheter = färdigheter.map(def => {
  const state =
    character.färdigheter[def.id] ??
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
        character
      ) + förbättringBonus
  };
});

  // ── Vapenfärdigheter ────────────────────────
  const derivedVapenfärdigheter = vapenfärdigheter.map(def => {
  const state =
    character.vapenfärdigheter[def.id] ??
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
        character
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