export const socialt_stånd ={
    inget: {
        name: "-",
        text: "-",
        möjligaFärdigheter:[],
        extraFardighet: 0
    },
    slav: {
        name: "Slav",
        text: "Exempel: Livegen, roddarslav, gruvträl. Du växte upp under piskan och varje dag var en kamp.",
        möjligaFärdigheter:[
            {id: "Slagsmål"},
            {id: "Undvika"},
            {id: "Undre världen"}
        ],
        extraFardighet: 1
    },
    egendomslös: {
        name: "Egendomslös",
        text: "Exempel: Gycklare, herde, nomad. Du växte upp i den vilda ödemarken eller stadens slum.",
        möjligaFärdigheter:[
            {id: "Smyga"},
            {id: "Bluffa"},
            {id: "Finna dolda ting"}
        ],
        extraFardighet: 1
    },
    bonde: {
        name: "Bonde",
        text: "Exempel: Fiskare, mjölnare, värdshusvärd. Du kommer från landsbygden och är van att leva på det som du själv skördat.",
        möjligaFärdigheter:[
            {id: "Vildmarksvana"},
            {id: "Jakt & fiske"},
            {id: "Sjökunnighet"}
        ],
        extraFardighet: 1
    },
    borgare: {
        name: "Borgare",
        text: "Exempel: Handlare, gesäll, lärd. Staden är ditt hem och du har lärt dig att klara dig bland folk och fä.",
        möjligaFärdigheter:[
            {id: "Köpslå"},
            {id: "Hantverk"},
            {id: "Främmande språk"}
        ],
        extraFardighet: 1
    },
    prästerskap: {
        name: "Prästerskap",
        text: "Exempel: Akolyt, tempelmoder, schaman. Gudarna var ständigt närvarande i din uppväxt och du är van att lyssna på deras ord.",
        möjligaFärdigheter:[
            {id: "Myter & legender"},
            {id: "Läkekonst"},
            {id: "Observation"}
        ],
        extraFardighet: 1
    },
    adel: {
        name: "Adel",
        text: "Exempel: Hövding, solriddare, kastellan. Du växte upp i överklassen bland tjänstefolk och gamla seder och bruk.",
        möjligaFärdigheter:[
            {id: "Taktik"},
            {id: "Höviskhet"},
            {id: "Övertala"}
        ],
        extraFardighet: 1
    }
}