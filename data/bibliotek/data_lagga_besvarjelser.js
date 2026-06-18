export const LaggaBesvarjelser = {
laggabesvarjelser: {
  rubrik: "Lägga besvärjelser",
  text: `För att lägga en besvärjelse måste du spendera viljepoäng (VP samt slå ett slag mot ditt FV i magiskolan. För allmänna besvärjelser kan du slå mot vilken magiskola som helst. Om slaget lyckas har besvärjelsen avsedd effekt enligt dess beskrivning, annars inte. Du kan pressa slaget om ni använder denna frivillig regel. Trolleritrick lyckas automatiskt och kostar alltid 1 VP).  <br>  <b>Noll VP:</b> Vissa besvärjelser kan suga ut VP ur en annan person. Att gå ner på noll VP har ingen annan effekt än att förmågor som kräver VP inte kan användas.`,
  källa: "dod",
},
effektgrad: {
  rubrik: "Effektgrad",
  text: `En besvärjelses <i>effektgrad</i> mäter hur mycket kraft du lägger in i den. Effektgraden går från 1 till 3. Det krävs 2 VP per effektgrad för att lägga en besvärjelse, och det kostar alltid 1 VP att utföra ett trolleritrick. Vissa besvärjelser använder sig inte av effektgrad - dessa kostar alltid 2 VP att lägga.
  <br>
  <b>Kraft från kroppen:</b> Om du har noll VP kvar kan du i nödfall ta kraft från kroppen. Det är dock skadligt, potentiellt även dödligt. Slå valfri tärning (T4, T6, T8, T10, T12 eller T20) innan du lägger besvärjelsen - resultatet visar mängden VP du får och måste använda direkt, men du tar samtidigt lika mycket i skada. VP som inte används direkt går förlorade. Skadan tillämpas efter att besvärjelsen lagts. <i>Kraft från kroppen kan inte användas till läkande besvärjelser</i>.`,
  källa: "dod",
},
magiometall: {
  rubrik: "Magi och metall",
  text: `Metall har en antimagisk effekt och du kan därför inte använda magi om du bär metallrustning eller har metallvapen till hands. Det inkluderar föremål som delvis består av metall som yxor, spjut, pilar och nitläder (men inte stavar, klubbor eller slungor). Föremål i din packning räknas inte.`,
  källa: "dod",
},
rekvisit: {
  rubrik: "Rekvisit",
  text: `För att lägga en besvärjelse krävs ett eller flera <i>rekvisit</>, som anges vid respektive besvärjelse:
  <ul>
  <li><b>Ord:</b> Besvärjelsen aktiveras med mässande eller kraftord.</li>
  <li><b>Gest:</b> Besvärjelsen aktiveras genom att rita mönster i luften..</li>
  <li><b>Ingrediens:</b> Besvärjelsen aktiveras med ett visst föremål, som förbrukas vid användningen.</li>
  </ul>
  Vissa besvärjelser har flera rekvisit. Om något rekvisit saknas kan du inte lägga besvärjelsen.`
  ,
  källa: "dod",
},
tidsatgang: {
  rubrik: "Tidsåtgång",
  text: `Om inget annat anges räknas det som en handling i strid att lägga en besvärjelse. Det finns dock <i>reaktiva</i> besvärjelser som utgörs utanför din egen tur i rundan. Till skillnad från reaktiva handlingar i strid som parera och duka ersätter reaktiva besvärjelser <i>inte</i> din ordinarie handling i rundan, och du kan alltså utföra hur många du vill så länge dina VP räcker till. Det finns även <i>ritualer</i>, som tar en kvart eller till och med ett skift att utföra.
  <br>
  <b>Formelbok:</b> Om du lägger en oförberedd besvärjelse direkt ur din formelbok tar den dubbelt så lång tid att lägga och du behöver alltså lägga en extra runda, kvar eller skift på förberedelser. Slå slaget när besvärjelsen slutförs. Du kan inte lägga reaktiva besvärjelser från din formelbok.`,
  källa: "dod",
},
rackvidd: {
  rubrik: "Räckvidd",
  text: `Varje besvärjelse anger en maximal räckvidd. Till skillnad från avståndsvapen kan besvärjelser inte användas utanför räckvidden. Räckvidd Personlig innerbär att endast magikern själv påverkas.
  <br>
  <b>Ytverkan:</b> Vissa besvärjelser påverkar ett helt område. Området som påverkas kallas <i>effektområdet</i>. Effektområdet utgår alltid från magikern själv om inget annat anges. Det går som regel att ducka undan effekten av en ytverkande besvärjelse, men den kan inte pareras. Om du vill kan du undanta ett eller flera mål inom effektområdet från besvärjelsens effekter, men du får då nackdel på slaget.
  <br>
  <b>Sfär:</b> Om räckvidden anges som <i>sfär</i> påverkas alla mål inom det angivna avstånde utom magikern själv.
  <br>
  <b>Kon:</b> Om räckvidden anges som <i>kon</i> påverkas alla mål inom ett konformat område, vars bredd vid varje given punkt är lika med avståndet från besvärjelsens källa. Räckvidden anger konens längd`,
  källa: "dod",
},
varaktighet: {
  rubrik: "Varaktighet",
  text: `Varje besvärjelse anger hur länge effekten varar.
  <ul>
  <li><b>Omedelbar:</b> Effekten inträffar direkt och har ingen varaktig effekt.</li>
  <li><b>Runda:</b> Effekten varar fram till din nästa tur i påföljande runda.</li>
  <li><b>Kvart:</b> Effekten varar till slutet på pågående skift.</li>
  <li><b>Koncentration:</b> Effekten upphör om du utför en annan handling, om du tar skada eller om du misslyckas med ett PSY-slag för att motstå skräck. Om du störs av exempelvis ett plötsligt ljud måste du slå ett slag mot PSY (ej handling) för att inte tappa koncentrationen.</li>
  </ul>`,
  källa: "dod",
},
}