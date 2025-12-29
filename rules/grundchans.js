export function grundchansFörFärdighet(färdighet, rollperson) {
  const värde =
    rollperson.grundegenskaper[färdighet.grundegenskap].värde;

  let grundchans = 0;
  if (värde > 0 && värde <= 5) grundchans = 3;
  else if (värde <= 8) grundchans = 4;
  else if (värde <= 12) grundchans = 5;
  else if (värde <= 15) grundchans = 6;
  else grundchans = 7;

 // const tränad =
 //   rollperson.färdigheter[färdighetDef.id]?.tränad ?? false;

  return färdighet.tränad ? grundchans * 2 : grundchans;
}
// Källhantering
export function groupByKälla(items) {
  const groups = {};

  items.forEach(item => {
    const källaId = item.källa ?? "okänd";
    groups[källaId] ??= [];
    groups[källaId].push(item);
  });

  return groups;
}