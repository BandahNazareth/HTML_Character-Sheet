export const hjälteförmågor = {
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
};