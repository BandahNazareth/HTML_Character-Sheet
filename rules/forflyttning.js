export function förflyttningsBonusFrånSmidighet(smidighet) {
  if (smidighet <= 6) return -4;
  if (smidighet <= 9) return -2;
  if (smidighet <= 12) return 0;
  if (smidighet <= 15) return 2;
  return 4;
}