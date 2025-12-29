export const hjälteförmågor = {
  //GRUNDBOKEN
  ingen: {
    name: "-",
    text: `-`,
    kostnad: "undefined",
    källa: "dod"
  },
  blixtsnabb: {
    name: "Blixtsnabb",
    text: `Dra två initiativkort i början av rundan och välj det bästa. Kan användas en gång per runda.`,
    krav: "Undvika FV 12",
    kostnad: "2 VP",
    källa: "dod"
  },
  bärsärk: {
    name: "Bärsärk",
    text: `Du får tillståndet Arg och går omedelbart till angrepp i närstrid mot närmaste fiende. Om du redan är Arg får du ett annat valfritt tillstånd. Du måste sedan fortsätta slåss tills alla fiender inom synhåll är besegrade eller du själv når noll KP. Du får fördel på närstridsattacker men får varken parera eller ducka. Efter striden blir du Utmattad.`,
    krav: "Närstridsfärdighet FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  defensiv: {
    name: "Defensiv",
    text: `Du kan försöka parera en attack (sid 46), utan att det kostar dig din handling. Den extra paraden kan användas när du vill i rundan. Du får bara försöka parera en och samma attack en gång. Du kan använda förmågan flera gånger i samma runda, så länge du har nog med VP.`,
    krav: "Närstridsfärdighet FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  drakdräpare: {
    name: "Drakdräpare",
    text: `En attack som du utför mot ett monster gör T8 extra i skada. Du aktiverar denna förmåga efter slaget för att träffa men innan du slår för skadan. Läs mer om monster i kapitel 7.`,
    krav: "Vapenfärdighet FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  dubbelhugg: {
    name: "Dubbelhugg",
    text: `Med ett huggande vapen kan du anfalla två fiender inom 2 meter med ett och samma hugg. Slå bara ett tärningsslag - om det lyckas träffas båda fienderna. Fienderna kan parera eller ducka angreppet individuellt. Slå separat för skada. Förmågan kan kombineras med Två vapen.`,
    krav: "Svärd eller Yxa FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  enstöring: {
    name: "Enstöring",
    text: `Du kan utföra en lång vila ute i vildmarken utan att behöva slå mot VILDMARKSVANA för att slå läger först. Effekten gäller bara dig själv, även om du har ett tält`,
    krav: "Vildmarksvana FV 12",
    kostnad: "-",
    källa: "dod"
  },
  falköga: {
    name: "Falköga",
    text: `Du kan se detaljer på personer eller föremål upp till 200 meter bort som om de befunnit sig intill dig. Effekten varar i en kvart. I strid slipper du även nackdel för att skjuta på målet bortom vapnets effektiva räckvidd (sid 49). Varje nytt mål kräver ny aktivering av förmågan.`,
    krav: "Upptäcka fara FV 12",
    kostnad: "2 VP",
    källa: "dod"
  },
  fokuserad: {
    name: "Fokuserad",
    text: `Ditt maximala antal VP höjs permanent med 2. Du kan skaffa denna hjälteförmåga flera gånger om, utan begränsning.`,
    krav: "-",
    kostnad: "-",
    källa: "dod",
    stackable: true
  },
  följeslagare: {
    name: "Följeslagare",
    text: `Du kan aktivera denna förmåga till att göra ett djur (ej monster) du möter till din följeslagare. Detta tar en kvar, men du kan bara ha en följeslagare åt gången. SL avgör vilka djur som kan finnas i närheten, se listan på sidan 99. Djuret följer dig så länge du är kvar i dess naturliga miljö och kan spana åt dig utan att det kostar fler VP. För 3 extra VP kan djuret utföra ett anfall mot en fiende på din befallning (fri handling för dig).`,
    krav: "Jakt & Fiske FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  förklädnad: {
    name: "Förklädnad",
    text: `Du är en mästare på förklädnad och kan skickligt efterlikna andra personer. Efter en kvarts arbete kan du efterlikna en annan persons utseende, röst och beteende. Personen måste tillhöra samma släkte som du. Den som känner personen och ser dig på 10 meters håll eller mindre får slå UPPTÄCKA FARA för att genomskåda förklädnaden.`,
    krav: "Bluffa FV 12",
    kostnad: "2 VP",
    källa: "dod"
  },
  förkämpe: {
    name: "Förkämpe",
    text: `Du tvekar inte att ta smällar för att skydda dina vänner. Om du och eller flera andra rollpersoner är i närstrid med samma fiende (inom 2 meter) och fienden vill angripa en annan rollperson kan du ställa dig i vägen och tvinga fienden att angripa just dig. Att aktivera förmågan räknas inte som en handling`,
    krav: "Hammare, Svärd eller Yxa FV 12",
    kostnad: "2 VP",
    källa: "dod"
  },
  garverimästare: {
    name: "Garverimästare",
    text: `Denna förmåga kräver läderverktyg. På ett skift kan du tillverka en läderrustning (sid 73) från skinnet av ett djur eller monster. Rustningen får halva det skyddsvärde som besten hade (avrundat uppåt) dock minst 1. Kostnaden i VP är lika med skyddsvärdet.`,
    krav: "Hantverk FV 12",
    kostnad: "Varierar",
    källa: "dod"
  },
  gott_läkekött: {
    name: "Gott läkekött",
    text: `Läker T6 extra KP under en kort vila. Påverkar ej återhämtning av VP eller tillstånd.`,
    krav: "-",
    kostnad: "2 VP",
    källa: "dod"
  },
  hal_som_en_ål: {
    name: "Hal som en ål",
    text: `Du kan försöka ducka för en attack utan att det räknas som din handling för rundan. Du får bara försöka ducka en och samma attack en gång. Du kan använda förmågan flera gånger i samma runda, så länge du har nog med VP.`,
    krav: "Undvika FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  insikt: {
    name: "Insikt",
    text: `Om du pratar med en annan person en stund kan du slå UPPTÄCKA FARA för att avgöra om personen talar sanning eller inte. Du får inte veta exakt vad personen ljuger om.`,
    krav: "Bluffa FV 12",
    kostnad: "2 VP",
    källa: "dod"
  },
  intuition: {
    name: "Intuition",
    text: `Om du står inför ett svårt beslut kan du aktivera denna förmåga för att ställa en fråga direkt till SL och få ett användbart svar. Svaret representerar din stora allmänbildning och ska bara ge stöd till ditt beslut, inte avslöja allt som finns att veta.`,
    krav: "Myter och legender FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  järngrepp: {
    name: "Järngrepp",
    text: `Du får fördel på slaget mot SLAGSMÅL för att ta ett grepp på en annan person, eller för att motstå att fienden bryter sig ur ditt grepp.`,
    krav: "Slagsmål FV 12",
    kostnad: "1 VP",
    källa: "dod"
  },
  järnnäve: {
    name: "Järnnäve",
    text: `Obeväpnad attack ökar till 2T6 skada. Aktiveras som fri handling efter träffslag.`,
    krav: "Slagsmål FV 12",
    kostnad: "1 VP",
    källa: "dod"
  },
  kastarm: {
    name: "Kastarm",
    text: `Slungar ett enhandsvapen upp till STY meter mot en fiende. Fienden kan parera/ducka. Vapnet landar vid fötterna.`,
    krav: "Närstridsvapen FV 12",
    kostnad: "2 VP",
    källa: "dod"
  },
  kattfot: {
    name: "Kattfot",
    text: `Minskar fallskada med ?1T6 per VP du lägger. Du kan slå mot HOPPA & KLÄTTRA först, innan du aktiverar hjälteförmågan.`,
    krav: "Hoppa & klättra FV 12",
    kostnad: "Varierar",
    källa: "dod"
  },
  kraftslag: {
    name: "Kraftslag",
    text: `Tvåhandsattack gör +T8 skada men du kan inte förflytta dig samma runda. Aktiveras efter träffslag, men inte om du förflyttat dig.`,
    krav: "STY-baserad närstridsfärdighet FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  kvartermästare: {
    name: "Kvartermästare",
    text: `Lyckas automatiskt med slag mot VILDMARKSVANA för att slå läger under utfärd.`,
    krav: "Vildmarksvana FV 12",
    kostnad: "1 VP",
    källa: "dod"
  },
  lönnmördare: {
    name: "Lönnmördare",
    text: `Smygattack gör +T8 skada; kan kombineras med Tjuvhugg. Aktiveras efter träff men innan skada.`,
    krav: "Kniv FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  magisk_talang: {
    name: "Magisk talang",
    text: `Lär dig en ny magiskola. Kan tas flera gånger; besvärjelser lärs separat.`,
    krav: "-",
    kostnad: "-",
    källa: "dod",
    stackable: true
  },
  monsterjägare: {
    name: "Monsterjägare",
    text: `Vid vägskäl får du veta i vilken riktning de farligaste fienderna finns.`,
    krav: "Bestiologi FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  mästerbesvärjare: {
    name: "Mästerbesvärjare",
    text: `Om du aktiverar denna vid din tur i strid får du lägga två olika besvärjelser med samma handling. Det måste vara två olika besvärjelser. Du får slå för din första besvärjelse och aktivera förmågan efteråt.`,
    krav: "Magiskola FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  mästerkock: {
    name: "Mästerkock",
    text: `Lagar mat automatiskt utan att behöva slå mot VILDMARKSVANA.`,
    krav: "-",
    kostnad: "1 VP",
    källa: "dod"
  },
  mästersmed: {
    name: "Mästersmed",
    text: `Denna förmåga kräver smidesverktyg. På en kvart kan du vässa ett hugg- eller stickvapen. Det kostar 3VP och gör att skyddsvärdet för rustning räknas som ett steg lägre mot vapnet. Effekten försvinner efter en strid där vapnet har använts till attack eller parad. PÅ ett skift kan du tillverka valfritt metallvapen eller metallrustning ur listorna på sidorna 73-75. Detta kräver städ och ässja samt järn (vikt 1) och kostar antal VP lika med föremålets pris i guld (avrundat uppåt). Du kan sprida ut arbetet över flera skift om dina VP inte räcker.`,
    krav: "Hantverk FV 12",
    kostnad: "Varierar",
    källa: "dod"
  },
  mästersnickare: {
    name: "Mästersnickare",
    text: `Denna förmåga kräver snickarverktyg. Som en handling kan du åsamka en dörr, mur, vägg eller annat dött föremål T12 poäng skada för varje VP du lägger, utan hänsyn till föremålets skyddsvärde.`,
    krav: "Hantverk FV 12",
    kostnad: "Varierar",
    källa: "dod"
  },
  ormmänniska: {
    name: "Ormmänniska",
    text: `Du kan lirka dig ur bojor eller pressa dig igenom en smal passage utan att slå mot någon färdighet.`,        
    krav: "Undvika FV 12",
    kostnad: "1 VP",
    källa: "dod"
  },
  orädd: {
    name: "Orädd",
    text: `Du lyckas automatiskt motstrå skräck, utan slag mot PSY.`,
    krav: "-",
    kostnad: "2 VP",
    källa: "dod"
  },
  pilparad: {
    name: "Pilparad",
    text: `Du kan parera en avståndsattack med närstridsvapen, alltså utan sköld.`,
    krav: "Närstridsvapen FV 12",
    kostnad: "1 VP",
    källa: "dod"
  },
  sjöben: {
    name: "Sjöben",
    text: `Du kan aktivera denna förmåga (ej handling) när du ska utföra en handling i vatten, om än så bara midjedjupt. Du slipper då alla negativa effekter av att befinna dig i vatten under en runda, inklusive risken att drunkna.`,       
    krav: "Undvika FV 12",
    kostnad: "1 VP",
    källa: "dod"
  },
  skattletare: {
    name: "Skattletare",
    text: `Vid ett vägskäl av något slag kan du aktivera denna förmåga för att få veta i vilken riktning de största skatterna finns.`,
    krav: "Köpslå FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  sköldblockad: {
    name: "Sköldblockad",
    text: `Du kan använda denna förmåga när du parerar med sköld, och får då en fördel på slaget. Genom att aktivera denna förmåga kan du även parera icke ytverkande fysiska monsterattacker som vanligen inte kan pareras. Du måste använda sköld och du får fördel på slaget. Förmågan kan kombineras med Defensiv.`,
    krav: "STY-baserad närstridsfärdighet FV 12",
    kostnad: "2 VP",
    källa: "dod"
  },
  stigfinnare: {
    name: "Stigfinnare",
    text: `Du lyckas automatiskt med slag mot VILDMARKSVANA för att finna rätt riktning i vildmarken.`,
    krav: "Vildmarksvana FV 12",
    kostnad: "1 VP",
    källa: "dod"
  },
  stridsrop: {
    name: "Stridsrop",
    text: `Du kan, som en handling i strid, utstöta ett stridsrop som gjuter nytt mod i dina vänner. Alla andra rollpersoner inom hörhåll läker omedelbart ett valfritt tillstånd. Förmågan kan bara användas i strid.`,
    krav: "-",
    kostnad: "3 VP",
    källa: "dod"
  },
  stridsvana: {
    name: "Stridsvana",
    text: `Om du aktiverar denna förmåga i början av en runda i strid får du behålla ditt initiativkort från rundan före istället för att dra ett nytt. Att aktivera förmågan räknas inte som en handling.`,
    krav: "Vapenfärdighet FV 12",
    kostnad: "1 VP",
    källa: "dod"
  },
  tjuvhugg: {
    name: "Tjuvhugg",
    text: `Du kan aktivera denna förmåga när du i närstrid angriper en fiende som befinner sig inom 2 meter från en annan rollperson. Angreppet räknas så dom en smygattack, vilket innebär att angreppet inte kan duckas eller pareras, du får en fördel på slaget och antalet tärningar för skadan ökar med ett. Förmågan kan enbart användas med ett smidigt vapen. Att aktivera förmågan räknas inte som en handling.`,
    krav: "Kniv FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  tonkonst: {
    name: "Tonkonst",
    text: `Din vackra stämma kan gjuta mod i dina vänner eller sätta skräck i dina fiender. När du aktiverar denna förmåga (en handling i strid) kan du ge alla vänner inom 10 meter en fördel på alla slag, eller en nackdel till alla fiender inom samma område - du väljer vilket. Effekten varar till din tur nästa runda. Instrument: Du kan använda instrument till Tonkonst. Detta kan öka förmågans räckvidd eller minska kostnaden i VP.`,
    krav: "Uppträda FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  tvillingpil: {
    name: "Tvillingpil",
    text: `Om du aktiverar denna förmåga när du avlossar en pilbåge skjuter du två pilar istället för en. Slå bara en gång för att träffa, med nackdel. Skadan slåss separat. De båda pilarna kan riktas mot samma mål eller olika`,
    krav: "Pilbåga FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  två_vapen: {
    name: "Två vapen",
    text: `Du kan använda denna förmåga enbart om du har ett enhandsvapen i varje hand. STY-kravet för vapnet i din aviga hand (välj själv om du är höger- eller vänsterhänt) ökar med 3. Du aktiverar förmågan vid din tur i strid och får då utföra ett extra anfall med ditt andra vapen. Den andra attacken för nackdel. Du väljer själv vilken ordning du använder dina två vapen. Slutför den första attacken, inklusive skada, innan du slår för den andra. Förmågan kan kombineras med Dubbelhugg.`,
    krav: "Närstridsvapen FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  tålig: {
    name: "Tålig",
    text: `Ditt maximala antal KP ökar permanent med 2. Du kan skaffa denna hjälteförmåga flera gånger om, utan begränsning.`,
    krav: "-",
    kostnad: "-",
    källa: "dod",
    stackable: true
  },
  ynkrygg: {
    name: "Ynkrygg",
    text: `Om du blir angripen och har en annan rollperson inom 2 meter kan du aktivera förmågan och låta attacken träffa den rollpersonen istället. Förmågan har ingen effekt mot ytverkande attacker.`,
    krav: "Undvika FV 12",
    kostnad: "3 VP",
    källa: "dod"
  },
  //KOPPARHAVET
  andel: {
  name: "Andel",
  text: `Du har en andel i en handelsrutt, karavan eller sjöfartslinje.
Andelen har ett värde som börjar på 1.

» Begära passage med en karavan.
» Försöka höja din andels värde. Slå ett slag för Köpslå, om du lyckas höjs
värdet med ett, om du misslyckas sänks det med ett. Vid ett demonslag förlorar
du halva din andel, vid ett drakslag dubbleras din andel.
» Andelen ger fördel på ett slag i utmaningen för handelskontakter i en hamn,
karavanseraj eller marknad som ligger längs handelsrutten. Se sida 66.
» Begära ut din andel. Kräver ett lyckat slag för Köpslå. Inkassera valfri summa
ur andelen, och sänk andelens värde med lika mycket. Om andelens värde når noll
kan du stryka förmågan.`,
  krav: "-",
  kostnad: "-",
  källa: "kopparhavet"
},

  asket: {
    name: "Asket",
    text: `Du är prästvigd åt Shamash. Detta innebär ett liv av återhållsamhet och självrannsakan.
För att kunna dra nytta av din förmåga måste du klä dig enkelt och du kan endast under
korta och exceptionella tillfällen bära eller äga fler än 4 föremål.
Du är van vid att fasta, och kan återvinna VP även om du lider av hunger (se sida 54 i Regelboken).
Om du klär dig i trasor slipper du nackdel på slag för KAR. Detta kostar inga VP,
och för 2 VP får du istället fördel på KAR när SL finner det rimligt.`,
    krav: "-",
    kostnad: "2 VP",
    källa: "kopparhavet"
  },

  banzikan_ekens_teknik: {
    name: "Banzikan: Ekens teknik",
    text: `Du följer krigarläran Banzikan och har lärt dig ekens tillstånd – att avgränsa sin röta
gentemot kärnan. Du kan bota tillståndet Krasslig för 2 VP. Du kan även sänka värdet
på gift och sjukdomar du utsätts för med 1 VP/steg, upp till max 3 VP.`,
    krav: "-",
    kostnad: "Varierar",
    källa: "kopparhavet"
  },

  banzikan_froets_teknik: {
    name: "Banzikan: Fröets teknik",
    text: `Du följer krigarläran Banzikan och har lärt dig fröets tillstånd – att samla sitt väsen
i en sluten kammare. Om du har noll KP kan du övertala dig själv att kämpa på utan
nackdel på ditt PSY-slag.`,
    krav: "-",
    kostnad: "2 VP",
    källa: "kopparhavet"
  },

  banzikan_gyllene_snittet: {
    name: "Banzikan: Gyllene snittet",
    text: `Du måste använda tekniken innan du slår för en attack med ett svärd.
Om attacken träffar gör den maximal skada, och om den dödar din motståndare faller denne
i två delar där proportionerna mellan den mindre delen och den större delen är samma som
mellan den större delen och den ursprungliga kroppen.
Återställ omedelbart 2T6 VP av ren tillfredsställelse.`,
    krav: "Ekens teknik, Fröets teknik, Stenens teknik",
    kostnad: "3 VP",
    källa: "kopparhavet"
  },

  banzikan_sann_sinnesnarvaro: {
    name: "Banzikan: Sann sinnesnärvaro",
    text: `Du kan pressa ett slag utan att ta ett tillstånd.`,
    krav: "Ekens teknik, Fröets teknik, Stenens teknik",
    kostnad: "3 VP",
    källa: "kopparhavet"
  },
  banzikan_stenens_teknik: {
    name: "Banzikan: Stenens teknik",
    text: `Du följer krigarläran Banzikan och har lärt dig stenens tillstånd – att vila oberörd på
strömmens botten. Du kan bota tillståndet Rädd för 2 VP. Därefter är du stålsatt mot
rädsla och lyckas automatiskt med PSY-slag mot skräck under en kvarts tid.`,
    krav: "-",
    kostnad: "2 VP",
    källa: "kopparhavet"
  },

  dromedarkarist: {
    name: "Dromedarkårist",
    text: `Du tillhör Efaros Dromedarkår, och har svurit stordrottning Neferak evig trohet. Se sida
82 i Ereb Altor: Hjältar från Kopparhavet för mera information om kåren.
Om du väljer Dromedarkårist från spelstart börjar du spel med en stridstränad kamel,
och är van vid att röra dig långa sträckor genom öken och karg vildmark.
Du kan utföra en ilmarsch utan att bli Utmattad så länge du reser på kamel- eller
dromedarrygg (se Regelboken sida 101).
För 1 VP får du även fördel på att parera attacker uppe på din kamel på grund av dess
långa ben. Var du än rör dig i Efaro tas du emot av befolkningen och erbjuds gratis mat
och husrum.`,
    krav: "Rida 12",
    kostnad: "1 VP",
    källa: "kopparhavet"
  },

  fjaderfaktning: {
    name: "Fäktkonst: Fjäderfäktning",
    text: `Denna stridsform uppfanns ursprungligen av ankduellanter i Arkipelagen. Fäktaren
använder sina uppspärrade vingfjädrar för att dölja sina rörelser, och utför snabba stötar
med sitt vapen. Humanoider utan fjädrar kan istället använda en mantel.
Tekniken fungerar med enhands eggvapen som svärd och dolkar. De måste ha
egenskapen stickande. Den du angriper kan inte försöka parera dina attacker.`,
    krav: "Svärd 12, samt fäktlärare eller fäktbok",
    kostnad: "2 VP",
    källa: "kopparhavet"
  },

  halvsvard: {
    name: "Fäktkonst: Halvsvärd",
    text: `Genom att greppa ett svärd längs klingan kan du ge extra kraft till en stöt och pressa
genom plåt. För att utföra attacken måste du hålla svärdet med två händer (2H).
Vapnet får egenskapen genomslag (se sida 62) under attacken. Om vapnet har
egenskapen stickande ignorerar attacken helt motståndarens skydd.`,
    krav: "Svärd 12, samt fäktlärare eller fäktbok",
    kostnad: "1 VP",
    källa: "kopparhavet"
  },

  mothugg: {
    name: "Fäktkonst: Mothugg",
    text: `Om du utför en motattack med hjälp av vapenegenskapen balanserad (se sida 62)
lyckas du automatiskt med slaget, precis som om du utfört en fri attack efter ett
drakslag (se sida 46 i Regelboken).`,
    krav: "Svärd 12, samt fäktlärare eller fäktbok",
    kostnad: "-",
    källa: "kopparhavet"
  },

  mastarhugg: {
    name: "Fäktkonst: Mästarhugg",
    text: `Du utför ett överraskande hugg med ditt svärd, och din motståndare får inte försvara
sig. Förmågan kan endast användas med vapen med egenskapen balanserad.`,
    krav: "Svärd 16, samt fäktlärare eller fäktbok",
    kostnad: "3 VP",
    källa: "kopparhavet"
  },
  mordarslag: {
    name: "Fäktkonst: Mördarslag",
    text: `Du greppar ditt svärd runt klingan med båda händerna och använder parerstången
som hammare. Du måste hålla svärdet med två händer (2H), och tar T6 i skada om du
inte bär lämpligt handskydd eller har ett särskilt anpassat vapen.`,
    krav: "Svärd 12, samt fäktlärare eller fäktbok",
    kostnad: "-",
    källa: "kopparhavet"
  },
  forlaning: {
    name: "Förläning",
    text: `Du har erhållit en förläning av en furste eller härskare. Beskriv vem som givit dig
förläningen och var den är belägen. Förläningen ger dig rätt till inkomster, status
och inflytande i området. Exakt vad detta innebär avgörs av SL, men kan innefatta
skatteintäkter, soldater, tjänstefolk och politiskt inflytande.`,
    krav: "-",
    kostnad: "-",
    källa: "kopparhavet"
  },

  gesall: {
    name: "Gesäll",
    text: `Du är utbildad gesäll inom ett hantverk. Beskriv vilket skrå eller mästare du är knuten
till. Du får erkännande som yrkeskunnig och kan ta betalt för ditt arbete enligt
gällande normer. I städer och samhällen där ditt skrå är verksamt har du ofta tillgång
till arbete, logi och kontakter.`,
    krav: "-",
    kostnad: "-",
    källa: "kopparhavet"
  },

  handelshus: {
    name: "Handelshus",
    text: `Du är medlem i eller leder ett handelshus. Om slaget lyckas har ditt handelshus en
kontakt eller en agent på plats som ger dig Rätt att handla (se kapitel 4: Kampanjer),
och som kan hjälpa dig med råd och kontakter.
Välj eller slumpa en handelsvara (se sidorna 63–64) som ditt handelshus är
specialiserat på. När du köper eller säljer denna vara får du en fördel på slaget för
Köpslå (se handelsreglerna på sida 67).
Beskriv och namnge ditt handelshus om du skapar ett nytt eller välj ett som redan
finns beskrivet, till exempel i Ereb Altor: Hjältar från Kopparhavet.`,
    krav: "-",
    kostnad: "-",
    källa: "kopparhavet"
  },

  kapten: {
    name: "Kapten",
    text: `Du har erhållit en kaptenstitel och har erfarenhet som sjöbefäl. För 2 VP får du fördel
på Övertala och Taktik när du utför en utmaning ombord på ett fartyg. Beskriv den
stad, furste eller organisation som har givit dig din kaptensvärdighet. Denna
organisation kallas din flaggmakt. Välj ett av nedanstående (dessa kostar inte VP).
Du har fått ett kaparbrev i ditt namn. Detta ger dig rätt att angripa din flaggmakts
fiender och kapa deras skepp.
Du är en officer i din flaggmakts flotta. I krigstider har du rätt att beordra en mindre
grupp soldater och kronotjänare som tillhör din flaggmakt.
Du tillhör din flaggmakts stadsadel. Du är en högborgare i din hemstad. Du har en
passande bostad, och har tillgång till mat och förnödenheter när du är där. Beskriv
gärna din släkt och din bostad.`,
    krav: "Sjökunnighet 12",
    kostnad: "2 VP",
    källa: "kopparhavet"
  },

  kargor: {
    name: "Kargör",
    text: `När sällskapet reser med karavan eller fartyg (se resor i kapitel 4) kan du genom
noggrann bokföring, kreativa räkenskaper och diverse knep minska sällskapets
utgifter – halvera driftkostnaden för T4 regioner per långresa. Detta kostar inga VP.
Under långresor kan du för 2 VP öka antalet varor som du kan köpa och sälja på en ort
med T6 eller öka antalet läster med T20. Se sida 66.`,
    krav: "Köpslå 12",
    kostnad: "-",
    källa: "kopparhavet"
  },

  korsar: {
    name: "Korsar",
    text: `Du är en veteran från plundring och piratkrig på Altors hav. Du får fördel på
UPPTÄCKA FARA när du spanar på fartyg. För 2 VP kan du välja ut ett fartyg inom
synhåll som du har extra god uppsikt över.`,
    krav: "Upptäcka Fara 12",
    kostnad: "2 VP",
    källa: "kopparhavet"
  },
  luftryttare: {
    name: "Luftryttare",
    text: `Du har lärt dig att rida* på flygande varelser som flygödlor, gripar och albadorer.
Bärförmågan för flygande bestar är en person. Förmågan fungerar bara på varelser
som är tämjda. Många mäktiga flygande monster, som drakar och rockfågel, kan
aldrig tämjas.`,
    krav: "Rida 12",
    kostnad: "-",
    källa: "kopparhavet"
  },

  monstertamjare: {
    name: "Monstertämjare",
    text: `Du har lärt dig att tämja Ereb Altors vilda monster. Huruvida ett monster alls kan
tämjas varierar. Intelligenta och mäktiga monster som drakar, fågel rock eller
demoner kan som regel inte tämjas. Andra monster kan ge en eller två tärningar
nackdel på Bestiologi och Rida när du försöker tämja dem (se nedan). SL avgör
vilka monster som är svåra att tämja.
Ett monster som du tämjt kan för 3 VP utföra en monsterattack i strid. Om du rider
på ett monster du tämjt räknas det som stridstränat. Du kan inte själv attackera i
samma runda som ditt riddjur.`,
    krav: "Rida 12, Bestiologi 14",
    kostnad: "3 VP",
    källa: "kopparhavet"
  },
  mastare_i_ordo_magus: {
    name: "Mästare i Ordo Magus",
    text: `Du är en fullvärdig medlem av Ordo Magus i Krilloan, upptagen och invigd som mästare.
Läs mera om den anrika magikerorden på sida 57 i Ereb Altor: Hjältar från Kopparhavet.
Som tecken på din rang bär du en enkel ring av orikalk. Du kan använda den som ditt
fokus. Du har också tillgång till lärare inom magiskolan hög magi när du befinner dig
i Kristalltornet i Krilloan, och du har lärt dig besvärjelsen Tornportal (se sida 80).`,
    krav: "Valfri Magiskola 12",
    kostnad: "-",
    källa: "kopparhavet"
  },

  naturligt_vapen_klor: {
    name: "Naturligt vapen – klor",
    text: `Du kan välja att använda skadebonus för SMI istället för STY vid obeväpnad strid
(slagsmål).`,
    krav: "Djurfolk som har klor naturligt",
    kostnad: "-",
    källa: "kopparhavet"
  },

  navigator: {
    name: "Navigatör",
    text: `Du kan alltid avgöra var norr är och vet din ungefärliga position genom att studera
stjärnorna (2 VP) så länge stjärnhimlen är klar. Du slipper nackdel om du navigerar
eller agerar som stigfinnare i vildmarken utan lämpliga instrument.`,
    krav: "Sjökunnighet 12",
    kostnad: "2 VP",
    källa: "kopparhavet"
  },

  ryttmastare: {
    name: "Ryttmästare",
    text: `Du är närmast född i sadeln och lärde dig rida innan du kunde gå. Du kan utnyttja
din förmåga till följande:
» Höja riddjurets förflyttning med 2 så länge du sitter i sadeln.
» För 2 VP kan du utnyttja riddjurets kraft i en närstridsattack och utdela +T6 i skada.
» För 1 VP kan du bestämma om en attack mot dig träffar dig eller ditt riddjur.
» Börja spelet med en stridstränad häst, om du väljer förmågan vid spelstart.`,
    krav: "Rida 14",
    kostnad: "Varierar",
    källa: "kopparhavet"
  },
  sadelakrobat: {
    name: "Sadelakrobat",
    text: `Du kan utföra följande handlingar:
» Som en fri handling plocka upp ett föremål från marken eller utan problem ta dig
upp eller ner från ryggen även om riddjuret är i full rörelse. Detta kostar inte VP.
» Hoppa mellan två riddjurs ryggar med ett slag för Hoppa & Klättra, utan VP-kostnad.
» För 2 VP undvika att få nackdel för ritt utan sadel.
» Om du utför en avståndsattack från sadeln kan du för 2 VP ersätta din vanliga
förflyttning med en sprint.
» Börja spelet med en häst, om du väljer förmågan vid spelstart.`,
    krav: "Rida 12",
    kostnad: "Varierar",
    källa: "kopparhavet"
  },

  skeppare: {
    name: "Skeppare",
    text: `Du är van vid att framföra ett fartyg och föra befäl ombord. Om du befinner dig i en
befälsposition på ett fartyg får du fördel på alla slag mot SJÖKUNNIGHET och
OBSERVATION. Om du befinner dig i en hamnstad eller liknande miljö kan du använda
ditt rykte som skeppare för att rekrytera besättningsmedlemmar. Detta tar ett skift i
anspråk. Slå ett slag mot Övertala med fördel. Om du lyckas rekryterar du T6+4
erfarna besättningsmedlemmar.`,
    krav: "Sjökunnighet 12",
    kostnad: "2 VP",
    källa: "kopparhavet"
  },

  slaktare: {
    name: "Slaktare",
    text: `Du har upptagits som fullvärdig medlem i en av staden Krilloans största kriminella
organisationer – Slaktarna. Se sida 82 i Ereb Altor: Hjältar från Kopparhavet för mera
information om organisationen.
Du får en personlig slaktkniv (värden som mästersmidd dolk) som räknas som en
minnessak (sida 27 i Regelboken). Du får även ett skinnförkläde som räknas som
läderrustning. Du är van vid att stycka kött, och lyckas automatiskt med slag mot
VILDMARKSVANA för att laga mat i fält (se sida 103 i Regelboken).`,
    krav: "-",
    kostnad: "-",
    källa: "kopparhavet"
  },

  solriddare: {
    name: "Solriddare",
    text: `Du är en fullvärdig solriddare, svuren till Shamash, Utu, Sholak eller någon annan
solgud. Du kan även följa den Lysande Vägen. På sida 80 i Ereb Altor: Hjältar från
Kopparhavet kan du läsa mera om en av dessa ordnar (Sanna solriddarorden).
Du har rätt att begära mat och husrum i soltempel och hos präster och solriddare som
följer samma gud som du.
För 3 VP kan du få ditt vapen att lysa med ett starkt ljus. Detta lyser upp en yta om
20 meter i alla riktningar i en kvart. Ljuset räknas som solljus och orsakar skada på
varelser som är känsliga för sådant. Se sida 94 och 97 i Regelboken för hur solljus
påverkar nattfolk. I normalfallet kan SL utgå från att varelser som utsätts för den här
förmågan är oskyddade.`,
    krav: "Svärd 12 och socialt stånd motsvarande riddare",
    kostnad: "3 VP",
    källa: "kopparhavet"
  },

  spadom: {
    name: "Spådom",
    text: `Du kan genom spådom finna och tyda tecken i din omgivning. Spådomen kan gälla dig
själv eller en person som du spår. Detta visar högre makters avsikter och kan hjälpa
när du står inför ett svårt val eller inte vet vad ditt nästa steg bör vara. För 3 VP kan
du be om ett tecken av högre makter.
Du kan då använda en av flera klassiska spådomstekniker, vilka ofta kräver särskild
utrustning eller offerdjur. Du frågar SL vad du bör göra – vilken väg du bör ta, vem
du bör lita på, var du bör leta. Spelledaren svarar genom att beskriva det tecken du
får och beskriva din magkänsla.
Tecken kan vara tvetydiga och svekfulla, men de leder alltid mot mer äventyr, mot
skatter, ledtrådar, viktiga SLP:er eller vilda rykten.`,
    krav: "Myter & Legender 10",
    kostnad: "3 VP",
    källa: "kopparhavet"
  },

  storfiskare: {
    name: "Storfiskare",
    text: `Du slår med fördel vid fiske med nät eller fiskespö. Du får dubbelt så mycket
matransoner vid ett lyckat slag och vid ett drakslag det tredubbla. Du kan även fiska
med treudd, spjut eller pilar, men slår då utan fördel och får enbart fångst enligt
normalt fiske (Regelboken sida 103). Storfiskaren kan förse en besättning på upp till
12 personer med proviant under en sjöfart så länge denne inte behöver ägna sig åt
något annat under resan och rätt redskap finns att tillgå. Detta halverar
driftkostnaden för en seglats.`,
    krav: "Jakt & fiske 14",
    kostnad: "2 VP",
    källa: "kopparhavet"
  },
  stormprast: {
    name: "Stormpräst",
    text: `Du har svurit trohet till en av Altors vindgudar och upptagits i dess prästerskap.
Du har invigts i prästerskapets hemligheter. Se sida 68 i Ereb Altor: Hjältar från
Kopparhavet för information om Altors olika vindgudar som Marduk och Sankma.
För 3 VP och ett lämpligt offer (värt minst 5 silver) kan du påverka vädret. Du kan
lugna en storm, bryta stiltje eller få regn att falla. Inom en kvart har vädret ändrats.
Detta kan skapa fördelaktiga förhållanden för olika handlingar – torrt väder för resa,
molnigt väder för att röra sig osedd, och så vidare.
Om spelgruppen använder tilläggsreglerna för sjöfart i Ereb Altor: Kopparhavet
innebär detta att du kan modifiera resultatet i Vädertabellen ett snäpp (t.ex. från 3
till 2 eller 4).
Stormpräster är alltid välkomna på skepp och fartyg, och får ofta gratis passage.`,
    krav: "-",
    kostnad: "3 VP",
    källa: "kopparhavet"
  },

  svansforing: {
    name: "Svansföring",
    text: `Kan väljas av alla som har en svans. Ger fördel på alla slag som rör balansgång.
För 2 VP kan du försöka fälla en fiende med din svans som en fri handling och med
ett motståndsslag för slagsmål (se sida 48 i Regelboken).`,
    krav: "Svans",
    kostnad: "2 VP",
    källa: "kopparhavet"
  },
  sändebud: {
    name: "Sändebud",
    text: `Du är utvald av en högre makt – en gud eller högre demon, ande eller elementar – som talesperson och företrädare på Altor.
    Du bestämmer tillsammans med spelledaren vad din högre makt har för natur. Skriv därefter ner några ledord som beskriver din
    högre makt.När du talar i enlighet med din makts ledord fylls du av gudomlig karisma, och för 2 VP får du fördel på slag mot Övertala.
    Din högre makt kan ge dig ett tecken genom att tala direkt till dig. Se reglerna för
    Spådom. Detta är en överväldigande upp-levelse, och du får två tillstånd. Det kostar dessutom 3 VP.
    Din makt kan kräva att du utför en handling å dennes vägnar. Exakt vad är upp till spelledaren – det kan röra sig om allt
    från ett enkelt offer, till ett episkt äventyr i maktens namn. Om du vägrar eller avstår kan du inte längre återhämta VP högre än
    halva din PSY tills du återgår till att följa beskyddarens vilja eller utför en motsvarande botgöring. Du får gratis fördel på
    alla slag mot Övertala som syftar till att uppfylla ditt uppdrag. Detta kostar inga VP.`,
    krav: "-",
    kostnad: "Varierar",
    källa: "kopparhavet"
  },
  timmerman: {
    name: "Timmerman",
    text: `Du är utbildad timmerman och van vid att arbeta med träkonstruktioner.
Du får fördel på slag för HANTVERK när du bygger, reparerar eller bedömer
träbyggnader, fartyg eller belägringsverktyg. Du kan även bedöma kvaliteten på
trävirke och avgöra om en konstruktion är säker.`,
    krav: "-",
    kostnad: "-",
    källa: "kopparhavet"
  },

  vaghals: {
    name: "Våghals",
    text: `Du kastar dig huvudstupa in i farliga situationer utan att tveka.
När du tar en uppenbar risk på eget initiativ får du fördel på det första slaget som
följer. SL avgör när detta är tillämpligt.`,
    krav: "-",
    kostnad: "-",
    källa: "kopparhavet"
  }
};