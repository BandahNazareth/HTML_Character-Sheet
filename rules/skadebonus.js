export function skadebonusFrånVärde(värde) {
  if (värde <= 11) return "-";
  if (värde <= 16) return "T4";;
  return "T6";
}