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
misslyckandedrakdemonslag: {
  rubrik: "Misslyckande, Drakslag och Demonslag",
  text: `Om slaget för att lägga besvärjelsen misslyckas förlorar du ändå de VP du satsat, och besvärjelsen tar inte effekt. Exakt hur du misslyckas yttrar sig i berättelsen kan du beskriva fritt, så länge det inte har någon spelmekanisk effekt.
  <br>
  <b>Drakslag:</b> Om du slår ett drakslag när du lägger din besvärjelse krävs det ett drakslag för att motstå, parera eller ducka besvärjelsen, samt att du får välja en av nedanstående effekter:
  <ul>
  <li>Skadan eller räckvidden av besvärjelsen fördubblas.</li>
  <li>Besvärjelsen kostar dig inga <b>VP</b>.</li>
  <li>Du får omedelbart lägga en besvärjelse till, fast med nackdel på slaget.</li>
  </ul>
  <b>Demonslag:</b> Om du slår ett demonslag (20) får du inte pressa slaget. Det kan även finnas risk att något går riktigt snett - se den frivilliga regeln om magiska missöden nedan.
  `,
  källa: "dod",
},
magiskaforemal: {
  rubrik: "Magiska föremål",
  text: `Magiska föremål kan ha en eller flera besvärjelser i sig som kan akriveras även av en icke-magiker. Om inget annat anges krävs det dock ett lyckat slag mot <b>FRÄMMANDE SPRÅK</b> eller valfri magiskola för att identifiera besvärjelserna och kunna använda dem.
  <br>
  <b>Viljepoäng:</b> Det kostar fortfarande <b>VP</b> att använda besvärjelser i ett magiskt föremål. Vissa magiska föremål kan lagra <b>VP</b> som du kan använda istället för dina egna. Läs mer på sidan 62.`,
  källa: "dod",
},
magiskamissöden: {
  rubrik: "Magiska missöden",
  text: `
  <table>
  <tr>
  <th>T20</th>
  <th>Magiskt missöde</th>
  </tr>
  <tr>
  <td>1</td>
  <td>De magiska krafterna gör dig Omtöcknad.</td>
  </tr>
  <tr>
  <td>2</td>
  <td>Besvärjandet gör dig plötsligt Utmattad.</td>
  </tr>
  <tr>
  <td>3</td>
  <td>Energierna suger musten ur din kropp och gör dig Krasslig.</td>
  </tr>
  <tr>
  <td>4</td>
  <td>Besvärjelsen undflyr din kontroll, vilket gör dig mycket Arg.</td>
  </tr>
  <tr>
  <td>5</td>
  <td>Besvärjelsen drabbar dig med demoniska syner som gör dig Rädd.</td>
  </tr>
  <tr>
  <td>6</td>
  <td>Du ser världen bakom slöjan och inser din egen betydelselöshet. Du blir Uppgive.</td>
  </tr>
  <tr>
  <td>7</td>
  <td>Magin härjar din kropp och du tar T6 KP skada per effektgrad.</td>
  </tr>
  <tr>
  <td>8</td>
  <td>Besvärjelsen suger ut din psykiska kraft och du förlorar T6 VP per effektgrad.</td>
  </tr>
  <tr>
  <td>9</td>
  <td>Besvärjelsen utlöser en magisk sjukdom med smittvärde 3T6. Du själv och alla du kommer i kontakt med under det kommande skiftet utsätts för smittan.</td>
  </tr>
  <tr>
  <td>10</td>
  <td>En slumpvis vald annan besvärjelse som du aktivera istället för den som du lade, med samma mål och samma effektgrad.</td>
  </tr>
  <tr>
  <td>11</td>
  <td>Så fort du uttalar en lögn kräks du upp en groda. Slå en T4 varje morgon. Vid en etta försvinner effekten. Den kan också hävas av SKINGRA.</td>
  </tr>
  <tr>
  <td>12</td>
  <td>Allt guld och silver som du vidrör vittrar sönder till damm. Slå en T4 varje morgon. Vid en etta försvinner effekten. Den kan också hävas av SKINGRA.</td>
  </tr>
  <tr>
  <td>13</td>
  <td>Besvärjelsen förblindar dig och du agerar som i totalt mörker (sid 52). Slå en T4 varje morgon. Vid en etta försvinner effekten. Den kan också hävas av SKINGRA.</td>
  </tr>
  <tr>
  <td>14</td>
  <td>Du får minnesförlust och glömmer vem du själv och de andra rollpersonerna är. Effekten måste rollspelas. Slå en T4 varje morgon. Vid en etta försvinner effekten.</td>
  </tr>
  <tr>
  <td>15</td>
  <td>Besvärjelsen drabbar även en vän eller något annat oavsiktligt offer. En helande eller hjälpande besvärjelse påverkar en fiende.</td>
  </tr>
  <tr>
  <td>16</td>
  <td>Besvärjelsens effekt slår bakut. En offensiv besvärjelse drabbar dig själv i stället för det avsedda målet. En skyddande eller helande besvärjelse skadar i stället för att läka.</td>
  </tr>
  <tr>
  <td>17</td>
  <td>Du förvandlas till ett djur. Slå T6: 1. Katt, 2. Räv, 3. Get, 4. varg, 5. hjort, 6. björn. Du får speldata enligt sid 99 och kan inte prata men du behåller dina mentala förmågor. Slå en T4 varje skift. Vid en etta återställs du. Förvandlingen kan också hävas av SKINGRA.</td>
  </tr>
  <tr>
  <td>18</td>
  <td>Du föryngras en kategori, exempelvis från medelålders till uing. Dina grundegenskaper påverkas enligt tabellen på sidan 24, men inte dina FV. Om du redan var ung blir du ett barn, med -2 i STY och FYS, ner till ett minimum av 3. Effekten är permanent, och du åldras normalt från din nya ålder.</td>
  </tr>
  <tr>
  <td>19</td>
  <td>Du åldras en kategori, exempelvis från medelålders till gammal. Dina grundegenskaper och sekundära egenskaper påverkas enligt tabellen på sidan 24, men inte dina FV. Om du redan var gammal blir du mycket skröplig och får -2 på STY och FYS. Effekten är permanent, och du åldras normalt från din nya ålder.</td>
  </tr>
  <tr>
  <td>20</td>
  <td>Din magi lockar till sig en demon (sid 85) från en annan dimension. Demonen dyker upp inom det kommande skiftet och går till angrepp och ställer till med något otyg. Detaljerna är upp till SL.</td>
  </tr>
  </table>`,
  källa: "dod",
},
larasigmagi: {
  rubrik: "Lära sig magi",
  text: `Du kan lära dig nya besvärjelser av en lärare eller från en formelsamling. Du måste ha FV i magiskolan som besvärjelsen tillhör, eller i vilken magiskola som helst för att lära dig en allmän besvärjelse.
  <br>
  <b>Krav:</b> Vissa besvärjelser anger krav som du måste uppfylla för att lära sig besvärjelsen. Oftast är det en magiskola eller att kunna en annan besvärjelse.
  <br>
  <b>Lärare:</b> Lättast (men ofta dyrast) är att lära sig en besvärjelse från en lärare som kan besvärjelsen. Undervisningen tar ett skift, men du kan aktivera den nya besvärjelsen först efter spelpassets slut. DÅ måste du använda ett förbättringskryss (sid 29) för magiskolan till att lära dig den nya besvärjelsen i stället för att försöka öka FV i magiskolan. Slå ett slag mot INT, med fördel. Om det lyckas har du lärt dig besvärjelsen, annars inte.
  <br>
  <b>Formelbok:</b> Har du tur kan du hitta besvärjelser i andra magikers formelböcker. Dessa kan du lära dig på egen hand. Detta fungerar som att lära sig av en lärare, men du slår mot FRÄMMANDE SPRÅK i stället för INT och utan fördel.
  <br>
  <b>Trolleritrick:</b> Trolleritrick är lättare att lära sig än riktiga besvärjelser. Du kan lära dig ett nytt trolleritrick på en kvart av en lärare eller en formelbok. Inget förbättringskryss eller slag krävs.
  <br>
  <b>Magiskolor:</b> Du kan lära dig fler magiskolor genom att skaffa hjälteförmågan Magisk talang (sid 38) och sedan studera för en lärare med FV i magiskolan i minst en vecka. Vid veckans slut får du slå mot INT, och får grundchans (INT) som FV i magiskolan om du lyckas. Om du misslyckas får du försöka igen efter ytterligare en veckas studier. Även icke-magiker kan lära sig magi på detta sätt.`,
  källa: "dod",
},
}