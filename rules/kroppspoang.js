export function computeKroppspoäng(rollperson) {
  const fysik = rollperson.grundegenskaper.fysik.värde;

  const tåligStacks = rollperson.hjälteförmågor.tålig ?? 0;

  const max = fysik + tåligStacks * 2;

  return {
    max
  };
}