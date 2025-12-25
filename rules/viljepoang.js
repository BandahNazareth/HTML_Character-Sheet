export function computeViljepoäng(rollperson) {
  const psyke = rollperson.grundegenskaper.psyke.värde;

  const fokuseradStacks = rollperson.hjälteförmågor.fokuserad ?? 0;

  const max = psyke + fokuseradStacks * 2;

  return {
    max
  };
}