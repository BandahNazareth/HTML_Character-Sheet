export function computeKroppspoäng(character, derivedGrundegenskaper) {
  const fysik = derivedGrundegenskaper.fysik.value;

  const tåligStacks = character.hjälteförmågor.tålig ?? 0;

  return {
    max: fysik + tåligStacks * 2
  };
}