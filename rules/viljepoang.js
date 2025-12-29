export function computeViljepoäng(karaktär, derivedGrundegenskaper) {
  const psyke = derivedGrundegenskaper.psyke.value;

  const fokuseradStacks =
    karaktär.hjälteförmågor.fokuserad ?? 0;

  return {
    max: psyke + fokuseradStacks * 2
  };
}