export const rustningar = {
  inget: {
    name: "-",
    SV: 0,
    pris: "-",
    tillgång: "-",
    vikt: 0,
    nackdelarText: "-",
    nackdelar: {
      smyga: false,
      undvika: false,
      hoppaochklattra: false
    },
    källa: "dod"
  },
  fjallpansar: {
    name: "Fjällpansar",
    SV: 5,
    pris: "1000 silver",
    tillgång: "Ovanlig",
    vikt: 1,
    nackdelarText: "Nackdel på UNDVIKA och SMYGA",
    nackdelar: {
      smyga: true,
      undvika: true,
      hoppaochklattra: false
    },
    källa: "kopparhavet"
  },
  gambeson: {
    name: "Gambeson",
    SV: 2,
    pris: "200 silver",
    tillgång: "Vanlig",
    vikt: 1,
    nackdelarText: "Nackdel på HOPPA & KLÄTTRA. Skyddsvärdet räknas 1 steg högre mot krosskada.",
    nackdelar: {
      smyga: false,
      undvika: false,
      hoppaochklattra: true
    },
    källa: "kopparhavet"
  },
  helrustning: {
    name: "Helrustning",
    SV: 7,
    pris: "7000 silver",
    tillgång: "Unik",
    vikt: 1,
    nackdelarText: "Nackdel på UNDVIKA och SMYGA",
    nackdelar: {
      smyga: true,
      undvika: true,
      hoppaochklattra: false
    },
    källa: "kopparhavet"
  },
  kyrass: {
    name: "Kyrass",
    SV: 5,
    pris: "900 silver",
    tillgång: "Ovanlig",
    vikt: 1,
    nackdelarText: "Nackdel på HOPPA & KLÄTTRA och UNDVIKA",
    nackdelar: {
      smyga: false,
      undvika: true,
      hoppaochklattra: true
    },
    källa: "kopparhavet"
  },
  lader: {
    name: "Läder",
    SV: 1,
    pris: "2 guld",
    tillgång: "Vanlig",
    vikt: 1,
    nackdelarText: "—",
    nackdelar: {
      smyga: false,
      undvika: false,
      hoppaochklattra: false
    },
    källa: "dod"
  },
  nitlader: {
    name: "Nitläder",
    SV: 2,
    pris: "10 guld",
    tillgång: "Ovanlig",
    vikt: 1,
    nackdelarText: "Nackdel på SMYGA",
    nackdelar: {
      smyga: true,
      undvika: false,
      hoppaochklattra: false
    },
    källa: "dod"
  },
  platrustning: {
    name: "Plåtrustning",
    SV: 6,
    pris: "500 guld",
    tillgång: "Sällsynt",
    vikt: 1,
    nackdelarText: "Nackdel på HOPPA & KLÄTTRA, UNDVIKA och SMYGA",
    nackdelar: {
      smyga: true,
      undvika: true,
      hoppaochklattra: true
    },
    källa: "dod"
  },
  ringbrynja: {
    name: "Ringbrynja",
    SV: 4,
    pris: "50 guld",
    tillgång: "Ovanlig",
    vikt: 1,
    nackdelarText: "Nackdel på UNDVIKA och SMYGA",
    nackdelar: {
      smyga: true,
      undvika: true,
      hoppaochklattra: false
    },
    källa: "dod"
  }
}
