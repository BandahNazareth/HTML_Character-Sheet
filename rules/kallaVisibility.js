import { färdigheter } from "../data/karaktärsdata/fardigheter.js";
import { vapenfärdigheter } from "../data/karaktärsdata/vapenfardigheter.js";

export function isKällaVisible(character, källaId) {
  if (!character.källorSynliga) return true;
  return character.källorSynliga[källaId] !== false;
}

export function ensureKällaVisibility(character, kallor) {
  character.källorSynliga ??= {};

  Object.keys(kallor).forEach(id => {
    if (character.källorSynliga[id] === undefined) {
      character.källorSynliga[id] = true; // 🔑 DEFAULT VISIBLE
    }
  });
}
export function getSkillKälla(id) {
  return (
    färdigheter[id]?.källa ??
    vapenfärdigheter[id]?.källa ??
    "okänd"
  );
}
export function isItemFromVisibleKälla(character, källaId) {
  if (!källaId) return true; // items without source are always visible
  return character.källorSynliga[källaId] !== false;
}