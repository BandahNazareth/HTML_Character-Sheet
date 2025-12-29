export const hjälmar = {
  inget: {
    name: "-",
    SV: 0,
    pris: "-",
    tillgång: "-",
    vikt: 0,
    nackdelarText: "-",
    nackdelar: {
      upptackafara: false,
      avstandsattacker: false
    },
    källa: "dod"
  },
  blomhjälm: {
    name: "Blomhjälm",
    SV: 1,
    pris: "300 silver",
    tillgång: "Sällsynt",
    vikt: 1,
    nackdelarText: "Nackdel på UPPTÄCKA FARA och FINNA DOLDA TING. Skyddsvärdet räknas 1 steg högre mot huggande attacker.",      
    nackdelar: {
      upptackafara: true,
      avstandsattacker: false,
      finnadoldating: true
    },
    källa: "kopparhavet"
  },
  tunnhjälm: {
    name: "Tunnhjälm",
    SV: 2,
    pris: "100 guld",
    tillgång: "Sällsynt",
    vikt: 1,
    nackdelarText: "Nackdel på UPPTÄCKA FARA och avståndsattacker",
    nackdelar: {
      upptackafara: true,
      avstandsattacker: true
    },
    källa: "dod"
  },
  visirhjälm: {
    name: "Visirhjälm",
    SV: 2,
    pris: "400 silver",
    tillgång: "Sällsynt",
    vikt: 1,
    nackdelarText: "Nackdel på UPPTÄCKA FARA och Skyddsvärde 1 med Visiret uppe. Nackdel på UPPTÄCKA FARA och avståndsattacker samt Skyddsvärde 2 med Visiret nere. Att fälla ner visiret är en fri handling.",
    nackdelar: {
      upptackafara: true,
      avstandsattacker: true
    },
    källa: "kopparhavet"
  },
  öppen_hjälm: {
    name: "Öppen hjälm",
    SV: 1,
    pris: "12 guld",
    tillgång: "Ovanlig",
    vikt: 1,
    nackdelarText: "Nackdel på UPPTÄCKA FARA",
    nackdelar: {
      upptackafara: true,
      avstandsattacker: false
    },
    källa: "dod"
  }
}

    