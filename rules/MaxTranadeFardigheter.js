
import { ålder as ålderData } from "../data/listor/data_alder.js";
import { socialt_stånd as socialtStandData } from "../data/listor/socialt_stand.js";

// ── RULE: Max trained färdigheter ────────────
export function getMaxTrainedFärdigheter(rollperson) {
  const base =
    ålderData[rollperson.ålder]?.tränadeFärdigheter ?? 0;

  const extra =
    socialtStandData?.[rollperson.socialt_stånd?.namn]?.extraFardighet ?? 0;

  return base + extra;
}