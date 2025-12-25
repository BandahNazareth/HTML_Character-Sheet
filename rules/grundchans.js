export function grundchansFörFärdighet(färdighet, rollperson) {
  const värde =
    rollperson.grundegenskaper[färdighet.grundegenskap].värde;

  let grundchans = 0;
  if (värde > 0 && värde <= 6) grundchans = 3;
  else if (värde <= 9) grundchans = 4;
  else if (värde <= 13) grundchans = 5;
  else if (värde <= 16) grundchans = 6;
  else grundchans = 7;

 // const tränad =
 //   rollperson.färdigheter[färdighetDef.id]?.tränad ?? false;

  return färdighet.tränad ? grundchans * 2 : grundchans;
}