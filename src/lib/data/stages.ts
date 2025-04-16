import type { Stage } from './types';

export const stages: Stage[] = [
  {
    id: 'beige',
    color: 'Beige',
    focus: { en: 'Individual', sv: 'Individuell' },
    hex: '#D6D1C4',
    name: { en: 'Beige', sv: 'Beige' },
    association: { en: 'Survival', sv: 'Överlevnad' },
    essence: {
      en: 'Survival at its most basic. Life is instinctual, reactive, and moment-to-moment.',
      sv: 'Överlevnad på sin mest grundläggande nivå. Livet är instinktivt, reaktivt och levs ögonblick för ögonblick.'
    },
    emergence: {
      en: 'Beige emerges when no other structures exist. It is the first spark of awareness after birth, trauma, or collapse.',
      sv: 'Beige uppstår när inga andra strukturer finns. Det är den första gnistan av medvetande efter födelse, trauma eller kollaps.'
    },
    keyTraits: {
      en: ['Instinct-driven', 'Present-moment focused', 'No language or abstraction', 'Survival-oriented'],
      sv: ['Instinktsstyrd', 'Fokuserad på nuet', 'Ingen språk- eller abstraktionsförmåga', 'Överlevnadsorienterad']
    },
    insights: {
      en: ['The body must survive', 'Hunger, thirst, shelter are primary', 'There is no “other”'],
      sv: ['Kroppen måste överleva', 'Hunger, törst och skydd är primärt', 'Det finns inget "annat"']
    },
    pitfalls: {
      en: ['No long-term memory', 'No moral judgment', 'No abstract thought'],
      sv: ['Ingen långsiktig minne', 'Ingen moralisk bedömning', 'Ingen abstrakt tanke']
    },
    triggers: {
      en: ['Threat to physical survival', 'Hunger', 'Pain', 'Trauma'],
      sv: ['Hot mot fysisk överlevnad', 'Hunger', 'Smärta', 'Trauma']
    },
    growthPath: {
      en: 'Beige evolves into Purple when survival becomes more secure and bonding or magic begins to emerge.',
      sv: 'Beige utvecklas till Lila när överlevnaden säkras och band eller magi börjar uppstå.'
    },
    archetypes: {
      en: ['Newborn infants', 'Severe dementia patients', 'Disaster victims in shock'],
      sv: ['Nyfödda spädbarn', 'Patienter med svår demens', 'Katastrofoffer i chock']
    },
    quotes: {
      en: [
        "Hunger. Cold. Move.",
        "Don’t die.",
        "This is pain. That is warmth.",
        "I need… now.",
        "Sleep. Wake. Find food.",
        "“SKREEEEEEEEONK!!” — Godzilla"
      ],
      sv: [
        "Hunger. Kyla. Rör dig.",
        "Dö inte.",
        "Det här gör ont. Där är värme.",
        "Jag behöver… nu.",
        "Sova. Vakna. Hitta mat.",
        "“SKREEEEEEEEONK!!” — Godzilla"
      ]
    },
    transitionQuote: {
      en: '“Food. Warmth. Shelter.”',
      sv: '”Mat. Värme. Skydd.”'
    }
  },
  {
    id: 'purple',
    color: 'Purple',
    focus: { en: 'Collective', sv: 'Kollektiv' },
    hex: '#8E44AD',
    name: { en: 'Purple', sv: 'Lila' },
    association: { en: 'Tribal', sv: 'Stam' },
    essence: {
      en: 'Magic, myth, and tribe. Life is enchanted and governed by spirits, rituals, and ancestors.',
      sv: 'Magi, myt och stam. Livet är förtrollat och styrt av andar, ritualer och förfäder.'
    },
    emergence: {
      en: 'Purple arises when small human groups begin forming tribes and family bonds for protection and meaning.',
      sv: 'Lila uppstår när små mänskliga grupper börjar bilda stammar och familjeband för skydd och mening.'
    },
    keyTraits: {
      en: ['Tribal loyalty', 'Rituals', 'Spiritual animism', 'Obedience to elders', 'Sacred myths'],
      sv: ['Stamlojalitet', 'Ritualer', 'Animistisk andlighet', 'Lydnad mot äldre', 'Heliga myter']
    },
    insights: {
      en: ['We are safer together', 'Ritual creates order', 'Nature is alive'],
      sv: ['Vi är säkrare tillsammans', 'Ritual skapar ordning', 'Naturen är levande']
    },
    pitfalls: {
      en: ['Superstition', 'Fear of spirits', 'Resistance to change', 'Xenophobia'],
      sv: ['Övertro', 'Rädsla för andar', 'Motstånd mot förändring', 'Främlingsfientlighet']
    },
    triggers: {
      en: ['Disrespect for tradition', 'Breaking rituals', 'Isolation from the tribe'],
      sv: ['Brist på respekt för tradition', 'Bryta ritualer', 'Isolering från stammen']
    },
    growthPath: {
      en: 'Purple evolves into Red when individual strength becomes necessary and separation from the tribe begins.',
      sv: 'Lila utvecklas till Röd när individuell styrka blir nödvändig och separation från stammen börjar.'
    },
    archetypes: {
      en: ['Shamans', 'Totem rituals', 'Tribal elders', 'Fairy tales', 'Witch doctors'],
      sv: ['Schamaner', 'Totemritualer', 'Stamäldste', 'Sagosagor', 'Häxdoktorer']
    },
    quotes: {
      en: [
        "The spirits are watching.",
        "We belong together.",
        "This is how we always do it.",
        "The elder knows best.",
        "Don’t break the circle.",
        "“The least of things with a meaning is worth more in life than the greatest of things without it.” — Carl Jung"
      ],
      sv: [
        "Andarna ser oss.",
        "Vi hör ihop.",
        "Så här har vi alltid gjort.",
        "Den äldre vet bäst.",
        "Bryt inte cirkeln.",
        "“Det minsta med mening är mer värt i livet än det största utan.” — Carl Jung"
      ]
    },
    transitionQuote: {
      en: '“The spirits must be pleased.”',
      sv: '”Andarna måste blidkas.”'
    }
  },
  {
    id: 'red',
    color: 'Red',
    focus: { en: 'Individual', sv: 'Individuell' },
    hex: '#D32F2F',
    name: { en: 'Red', sv: 'Röd' },
    association: { en: 'Power', sv: 'Makt' },
    essence: {
      en: 'Raw power, survival instincts, and dominance rule the world. Respect is earned through force.',
      sv: 'Rå kraft, överlevnadsinstinkt och dominans styr världen. Respekt förtjänas genom styrka.'
    },
    emergence: {
      en: 'Red emerges when basic needs are threatened and control must be seized. It breaks free from tribal order and asserts itself with might.',
      sv: 'Röd uppstår när grundläggande behov hotas och kontroll måste tas. Det frigör sig från stamordningen och hävdar sig med kraft.'
    },
    keyTraits: {
      en: ['Power-centric', 'Impulsive', 'Fearless', 'Dominant', 'Charismatic'],
      sv: ['Maktfokuserad', 'Impulsiv', 'Orädd', 'Dominerande', 'Karismatisk']
    },
    insights: {
      en: ['The strong survive', 'Respect must be taken', 'Rules are for the weak'],
      sv: ['De starka överlever', 'Respekt måste tas', 'Regler är för de svaga']
    },
    pitfalls: {
      en: ['Violence', 'Corruption', 'Lack of empathy', 'Short-termism'],
      sv: ['Våld', 'Korruption', 'Brist på empati', 'Kortsiktighet']
    },
    triggers: {
      en: ['Weakness', 'Disrespect', 'Rules and authority'],
      sv: ['Svaghet', 'Respektlöshet', 'Regler och auktoritet']
    },
    growthPath: {
      en: 'Red matures by learning discipline, remorse, and the power of structure. Blue offers the next step in channeling energy into order.',
      sv: 'Röd utvecklas genom att lära sig disciplin, ånger och kraften i struktur. Blå erbjuder nästa steg genom att kanalisera energi till ordning.'
    },
    archetypes: {
      en: ['Saddam Hussein', 'Mafia bosses', 'Pirates', 'Vikings', 'Andrew Tate'],
      sv: ['Saddam Hussein', 'Maffiabossar', 'Piratkaptener', 'Vikingar', 'Andrew Tate']
    },
    quotes: {
      en: [
        "No one tells me what to do.",
        "I take what I want.",
        "They’ll respect me — or fear me.",
        "I am the strongest here.",
        "This world belongs to the bold.",
        "“I am the greatest. I said that even before I knew I was.” — Muhammad Ali"
      ],
      sv: [
        "Ingen bestämmer över mig.",
        "Jag tar det jag vill ha.",
        "De kommer att respektera mig — eller frukta mig.",
        "Jag är starkast här.",
        "Den här världen tillhör de modiga.",
        "“Jag är den störste. Jag sa det redan innan jag visste att det var sant.” — Muhammad Ali"
      ]
    },
    transitionQuote: {
      en: '“Might makes right.”',
      sv: '”Styrka ger rätt.”'
    }
  },
  {
    id: 'blue',
    color: 'Blue',
    focus: { en: 'Collective', sv: 'Kollektiv' },
    hex: '#3B82F6',
    name: { en: 'Blue', sv: 'Blå' },
    association: { en: 'Order', sv: 'Ordning' },
    essence: {
      en: 'There is one right way. Life has order, meaning, and purpose through obedience to authority and divine law.',
      sv: 'Det finns ett rätt sätt. Livet har ordning, mening och syfte genom lydnad till auktoritet och gudomlig lag.'
    },
    emergence: {
      en: 'Blue arises when chaotic Red becomes unsustainable. To avoid destruction, people submit to order, tradition, and a higher truth.',
      sv: 'Blå uppstår när kaotisk Röd blir ohållbar. För att undvika förintelse underkastar sig människor ordning, tradition och en högre sanning.'
    },
    keyTraits: {
      en: ['Absolute truth', 'Moral codes', 'Obedience to authority', 'Faith', 'Tradition'],
      sv: ['Absolut sanning', 'Moralkoder', 'Lydnad mot auktoritet', 'Tro', 'Tradition']
    },
    insights: {
      en: ['Law brings order', 'Meaning comes from serving a higher cause', 'Sacrifice ensures salvation'],
      sv: ['Lag skapar ordning', 'Mening kommer av att tjäna ett högre syfte', 'Uppoffring leder till frälsning']
    },
    pitfalls: {
      en: ['Dogmatism', 'Judgmentalism', 'Oppression through tradition', 'Fear of change'],
      sv: ['Dogmatism', 'Dömande attityd', 'Förtryck genom tradition', 'Rädsla för förändring']
    },
    triggers: {
      en: ['Moral relativism', 'Disobedience', 'Lack of structure', 'Multiculturalism'],
      sv: ['Moralisk relativism', 'Olydnad', 'Brist på struktur', 'Multikulturalism']
    },
    growthPath: {
      en: 'Blue evolves into Orange when people begin to question dogma and seek individual achievement through reason.',
      sv: 'Blå utvecklas till Orange när människor börjar ifrågasätta dogmer och söka individuell framgång genom förnuft.'
    },
    archetypes: {
      en: ['Priests', 'Monks', 'Military officers', 'Zealots', 'Religious conservatives'],
      sv: ['Präster', 'Munkar', 'Militärofficerare', 'Fanatiker', 'Religiösa konservativa']
    },
    quotes: {
      en: [
        "There is one truth.",
        "Obey and you will be rewarded.",
        "Discipline builds character.",
        "Goodness comes from sacrifice.",
        "Stay on the path.",
        "“Set your house in perfect order before you criticize the world.” — Jordan B. Peterson"
      ],
      sv: [
        "Det finns en sanning.",
        "Lyd och du kommer att belönas.",
        "Disciplin bygger karaktär.",
        "Godhet kräver uppoffring.",
        "Håll dig på vägen.",
        "“Sätt ditt eget hus i perfekt ordning innan du kritiserar världen.” — Jordan B. Peterson"
      ]
    },
    transitionQuote: {
      en: '“We follow God’s law.”',
      sv: '”Vi följer Guds lag.”'
    }
  },
  {
    id: 'orange',
    color: 'Orange',
    focus: { en: 'Individual', sv: 'Individuell' },
    hex: '#FFA500',
    name: { en: 'Orange', sv: 'Orange' },
    association: { en: 'Achievement', sv: 'Prestation' },
    essence: {
      en: 'Ambition, progress, and personal success fuel the fire of innovation and individuality.',
      sv: 'Ambition, framsteg och personlig framgång eldar på innovation och individualitet.'
    },
    emergence: {
      en: 'Orange rises when the rigidity of Blue becomes suffocating. It begins to doubt authority and seeks success through logic, strategy, and self-reliance.',
      sv: 'Orange växer fram när Blås rigiditet blir kvävande. Den börjar tvivla på auktoritet och söker framgång genom logik, strategi och självständighet.'
    },
    keyTraits: {
      en: ['Rational', 'Ambitious', 'Pragmatic', 'Strategic', 'Individualistic'],
      sv: ['Rationell', 'Ambitiös', 'Pragmatisk', 'Strategisk', 'Individualistisk']
    },
    insights: {
      en: ['You can build your own success', 'Truth can be measured', 'Progress never stops'],
      sv: ['Du kan skapa din egen framgång', 'Sanning kan mätas', 'Framsteg stannar aldrig']
    },
    pitfalls: {
      en: ['Shallow materialism', 'Workaholism', 'Manipulation', 'Environmental harm'],
      sv: ['Ytlig materialism', 'Arbetsnarkomani', 'Manipulation', 'Miljöförstörelse']
    },
    triggers: {
      en: ['Mysticism', 'Spirituality', 'Government regulation', '“Woo-woo” culture'],
      sv: ['Mysticism', 'Andlighet', 'Statlig reglering', '“Flummig” kultur']
    },
    growthPath: {
      en: 'Orange begins to transcend when it sees the hollowness of endless success. Green calls for deeper connection, purpose, and compassion.',
      sv: 'Orange börjar överskridas när det inser tomheten i ständig framgång. Grön kallar på djupare kontakt, mening och medkänsla.'
    },
    archetypes: {
      en: ['Elon Musk', 'Tony Robbins', 'Wall Street', 'Silicon Valley', 'Bill Gates'],
      sv: ['Elon Musk', 'Tony Robbins', 'Wall Street', 'Silicon Valley', 'Bill Gates']
    },
    transitionQuote: {
    },
    quotes: {
      en: [
        "If you can measure it, you can manage it.",
        "Success is earned, not given.",
        "Let’s optimize this.",
        "What gets rewarded gets repeated.",
        "I’ll figure it out myself.",
        "“I think it is possible for ordinary people to choose to be extraordinary.” — Elon Musk"
      ],
      sv: [
        "Om du kan mäta det, kan du styra det.",
        "Framgång förtjänas, inte ges.",
        "Låt oss optimera det här.",
        "Det som belönas upprepas.",
        "Jag löser det själv.",
        "“Jag tror att vanliga människor kan välja att bli extraordinära.” — Elon Musk"
      ]
    }
  },
  {
    id: 'green',
    color: 'Green',
    focus: { en: 'Collective', sv: 'Kollektiv' },
    hex: '#10B981',
    name: { en: 'Green', sv: 'Grön' },
    association: { en: 'Communal', sv: 'Gemenskap' },
    essence: {
      en: 'All voices matter. Love, empathy, and equality create a harmonious world for people and planet.',
      sv: 'Alla röster räknas. Kärlek, empati och jämlikhet skapar en harmonisk värld för människor och planeten.'
    },
    emergence: {
      en: 'Green arises when Orange’s materialism feels empty. It seeks deeper connection, emotional intelligence, and social justice.',
      sv: 'Grön uppstår när Oranges materialism känns tom. Den söker djupare kontakt, emotionell intelligens och social rättvisa.'
    },
    keyTraits: {
      en: ['Empathy', 'Community', 'Social justice', 'Inclusiveness', 'Consensus'],
      sv: ['Empati', 'Gemenskap', 'Social rättvisa', 'Inkludering', 'Konsensus']
    },
    insights: {
      en: ['Everyone is equal', 'Feelings matter', 'Systems of oppression must be dismantled'],
      sv: ['Alla är lika mycket värda', 'Känslor spelar roll', 'Förtryckande system måste avvecklas']
    },
    pitfalls: {
      en: ['Groupthink', 'Over-sensitivity', 'Anti-hierarchy bias', 'Lack of pragmatism'],
      sv: ['Gruppmentalitet', 'Överkänslighet', 'Motstånd mot hierarki', 'Brist på pragmatism']
    },
    triggers: {
      en: ['Inequality', 'Authoritarianism', 'Intolerance', 'Corporate greed'],
      sv: ['Ojämlikhet', 'Auktoritärt styre', 'Intolerans', 'Korporativ girighet']
    },
    growthPath: {
      en: 'Green evolves into Yellow when it recognizes the limitations of idealism and begins to think systemically.',
      sv: 'Grön utvecklas till Gul när den inser idealismens begränsningar och börjar tänka systemiskt.'
    },
    archetypes: {
      en: ['Social workers', 'Activists', 'NGO founders', 'Therapists', 'Environmentalists'],
      sv: ['Socialarbetare', 'Aktivister', 'NGO-grundare', 'Terapeuter', 'Miljövänner']
    },
    quotes: {
      en: [
        "We’re all in this together.",
        "Listen — everyone deserves a voice.",
        "No one should be left out.",
        "It’s not about winning.",
        "Let’s feel into this.",
        "“Connection is why we’re here; it gives purpose and meaning to our lives.” — Brené Brown"
      ],
      sv: [
        "Vi sitter alla i samma båt.",
        "Lyssna — alla har rätt att bli hörda.",
        "Ingen ska uteslutas.",
        "Det handlar inte om att vinna.",
        "Låt oss känna in det här.",
        "“Förbindelse är varför vi är här; det ger våra liv mening och syfte.” — Brené Brown"
      ]
    },
    transitionQuote: {
    }
  },
  {
    id: 'yellow',
    color: 'Yellow',
    focus: { en: 'Individual', sv: 'Individuell' },
    hex: '#FACC15',
    name: { en: 'Yellow', sv: 'Gul' },
    association: { en: 'Systemic', sv: 'Systemiskt' },
    essence: {
      en: 'Systems within systems. Life is a complex dance of perspectives. Freedom and flow come from understanding the whole.',
      sv: 'System i system. Livet är en komplex dans av perspektiv. Frihet och flöde uppstår genom att förstå helheten.'
    },
    emergence: {
      en: 'Yellow emerges when Green’s idealism proves limited. It seeks to solve problems not through blame, but deep integration.',
      sv: 'Gul uppstår när Gröns idealism visar sig otillräcklig. Den söker lösa problem inte genom skuld, utan genom djup integration.'
    },
    keyTraits: {
      en: ['Systems thinking', 'Flexibility', 'Curiosity', 'Self-reliance', 'Non-ideological'],
      sv: ['Systemtänkande', 'Flexibilitet', 'Nyfikenhet', 'Självständighet', 'Icke-ideologisk']
    },
    insights: {
      en: ['Each perspective is partially true', 'Everything is interconnected', 'Truth is contextual'],
      sv: ['Varje perspektiv är delvis sant', 'Allt hänger samman', 'Sanning är kontextuell']
    },
    pitfalls: {
      en: ['Analysis paralysis', 'Emotional detachment', 'Overcomplexity', 'Difficulty relating'],
      sv: ['Analyströtthet', 'Emotionell distans', 'Överkomplexitet', 'Svårigheter att relatera']
    },
    triggers: {
      en: ['Black-and-white thinking', 'Dogma', 'Simplistic solutions', 'Tribalism'],
      sv: ['Svartvitt tänkande', 'Dogmer', 'Förenklade lösningar', 'Stammentalitet']
    },
    growthPath: {
      en: 'Yellow becomes Turquoise when it realizes that intellectual clarity alone is not enough — presence, compassion, and being are also needed.',
      sv: 'Gul utvecklas till Turkos när den inser att intellektuell klarhet inte räcker — närvaro, medkänsla och varande behövs också.'
    },
    archetypes: {
      en: ['System designers', 'Visionary engineers', 'Polymaths', 'Holistic strategists'],
      sv: ['Systemdesigners', 'Visionära ingenjörer', 'Polymater', 'Holistiska strateger']
    },
    quotes: {
      en: [
        "Every perspective is partially true.",
        "Let’s map this out holistically.",
        "Systems evolve when you stop blaming parts.",
        "What’s the meta-pattern here?",
        "A good model doesn’t end the conversation — it opens it.",
        "“You never change things by fighting the existing reality. To change something, build a new model that makes the existing model obsolete.” — Buckminster Fuller"
      ],
      sv: [
        "Varje perspektiv är delvis sant.",
        "Låt oss kartlägga detta holistiskt.",
        "System utvecklas när man slutar skylla på delarna.",
        "Vad är metamönstret här?",
        "En bra modell avslutar inte samtalet — den öppnar det.",
        "“Du förändrar inte saker genom att bekämpa det som finns. För att förändra något, bygg en ny modell som gör den gamla överflödig.” — Buckminster Fuller"
      ]
    },
    transitionQuote: {
      en: '“Every model is wrong — but some are useful.”',
      sv: '”Varje modell är fel — men vissa är användbara.”'
    }
  },
  {
    id: 'turquoise',
    color: 'Turquoise',
    focus: { en: 'Collective', sv: 'Kollektiv' },
    hex: '#06B6D4',
    name: { en: 'Turquoise', sv: 'Turkos' },
    association: { en: 'Holistic', sv: 'Holistiskt' },
    essence: {
      en: 'All is one. Being is sacred. The cosmos is intelligent and we are its embodied expression.',
      sv: 'Allt är ett. Varandet är heligt. Kosmos är intelligent och vi är dess förkroppsligade uttryck.'
    },
    emergence: {
      en: 'Turquoise arises when Yellow’s mind surrenders to the heart. It seeks integration not just of systems, but of soul.',
      sv: 'Turkos uppstår när Guls sinne överlämnas till hjärtat. Den söker integration inte bara av system, utan av själ.'
    },
    keyTraits: {
      en: ['Holism', 'Mystical awareness', 'Collective upliftment', 'Sacred action', 'Emotional mastery'],
      sv: ['Helhetssyn', 'Mystisk medvetenhet', 'Kollektivt uppvaknande', 'Heligt handlande', 'Emotionell behärskning']
    },
    insights: {
      en: ['We are the Earth dreaming', 'Love and presence are intelligence', 'Everything is already whole'],
      sv: ['Vi är Jorden som drömmer', 'Kärlek och närvaro är intelligens', 'Allt är redan helt']
    },
    pitfalls: {
      en: ['Isolation', 'Spiritual bypassing', 'Cosmic overwhelm', 'Lack of practicality'],
      sv: ['Isolering', 'Andlig flykt', 'Kosmisk överväldigande', 'Brist på praktisk förankring']
    },
    triggers: {
      en: ['Materialism', 'Overanalysis', 'Competitive ego', 'Cynicism'],
      sv: ['Materialism', 'Överanalys', 'Tävlingsinriktat ego', 'Cynism']
    },
    growthPath: {
      en: 'Turquoise evolves into Coral when it re-engages with the world as Source, balancing form and formlessness with grounded expression.',
      sv: 'Turkos utvecklas till Korall när den återknyter till världen som Källan, och balanserar form och formlöshet med förankrat uttryck.'
    },
    archetypes: {
      en: ['Mystics', 'Visionary leaders', 'Healers', 'Sacred technologists', 'Quantum poets'],
      sv: ['Mystiker', 'Visionära ledare', 'Helare', 'Heliga teknologer', 'Kvantpoeter']
    },
    quotes: {
      en: [
        "All is one — and yet every thread matters.",
        "I move with the field, not against it.",
        "What we heal in ourselves echoes outward.",
        "I am not the wave. I am the ocean remembering itself.",
        "The real does not die — the unreal never lived. — Nisargadatta Maharaj"
      ],
      sv: [
        "Allt är ett — och ändå spelar varje tråd roll.",
        "Jag rör mig med fältet, inte mot det.",
        "Det vi helar i oss själva genljuder utåt.",
        "Jag är inte vågen. Jag är havet som minns sig självt.",
        "Det verkliga dör inte — det overkliga har aldrig levt. — Nisargadatta Maharaj"
      ]
    },
    transitionQuote: {
      en: '“I am the wave — and the ocean too.”',
      sv: '”Jag är vågen — och havet också.”'
    }
  },
  {
    id: 'coral',
    color: 'Coral',
    focus: { en: 'Individual', sv: 'Individuell' },
    association: { en: 'Sovereign Unity', sv: 'Suverän Enhet' },
    hex: '#FB7185',
    name: { en: 'Coral', sv: 'Korall' },
    essence: {
      en: 'Reclaiming power after transcendence. Coral acts freely and fluidly from Source, blending the mystical with bold, embodied action.',
      sv: 'Återtagande av kraft efter transcendens. Korall handlar fritt och flytande från Källan, och förenar det mystiska med djärv, förkroppsligad handling.'
    },
    emergence: {
      en: 'Coral arises when Turquoise has stabilized non-duality but feels the call to re-enter the world — not as ego, but as a conscious agent of evolution.',
      sv: 'Korall uppstår när Turkos har stabiliserat icke-dualitet men känner kallelsen att återvända till världen — inte som ego, utan som medveten evolutionär aktör.'
    },
    keyTraits: {
      en: ['Post-egoic action', 'Fluid sovereignty', 'Shadow integration', 'Embodied mysticism', 'Sacred disruption'],
      sv: ['Post-egoiskt handlande', 'Flytande suveränitet', 'Skuggintegration', 'Förkroppsligad mystik', 'Helig störning']
    },
    insights: {
      en: ['Power can be sacred', 'Chaos can be creative', 'You can be whole and still act'],
      sv: ['Kraft kan vara helig', 'Kaos kan vara kreativt', 'Du kan vara hel och ändå agera']
    },
    pitfalls: {
      en: ['Hyper-individualism', 'Mythic inflation', 'Magical arrogance', 'Tribal fracturing'],
      sv: ['Hyperindividualism', 'Mythisk uppblåsthet', 'Magisk arrogans', 'Stamuppdelning']
    },
    triggers: {
      en: ['Passive spirituality', 'Denial of power', 'Excessive harmony', 'Fixed systems'],
      sv: ['Passiv andlighet', 'Förnekelse av kraft', 'Överdriven harmoni', 'Fasta system']
    },
    growthPath: {
      en: 'Coral matures into Ultra-Violet when it lets go of identity as a sacred actor and becomes transparent to the unfolding of being itself.',
      sv: 'Korall mognar till Ultra-Violett när den släpper identiteten som helig aktör och blir transparent för varandets utveckling.'
    },
    archetypes: {
      en: ['Chaos shamans', 'Planetary healers', 'Quantum ritualists', 'Mythic mystics'],
      sv: ['Kaosschamaner', 'Planetära helare', 'Kvantritualister', 'Mytiska mystiker']
    },
    quotes: {
      en: [
        "I act from the source — not from the story.",
        "Sometimes you have to shake the web to restore its rhythm.",
        "I move as a myth made flesh.",
        "My freedom serves the whole.",
        "The volcano is part of the peace.",
        "“I'm no fucking Buddhist, but this is Enlightenment.” — Björk"
      ],
      sv: [
        "Jag agerar från källan — inte från berättelsen.",
        "Ibland måste man skaka nätet för att återställa dess rytm.",
        "Jag rör mig som en myt i kött och blod.",
        "Min frihet tjänar helheten.",
        "Vulkanen är en del av freden.",
        "“Jag är ingen jävla buddhist, men det här är upplysning.” — Björk"
      ]
    },
    transitionQuote: {
    }
  },
  {
    id: 'ultraviolet',
    color: 'Ultra-Violet',
    hex: '#A855F7',
    name: { en: 'Ultra-Violet', sv: 'Ultra-Violett' },
    association: { en: 'Infinite Flow', sv: 'Oändligt Flöde' },
    essence: {
      en: 'Transparency beyond identity. Being without needing to act. A harmonic resonance with the mystery of existence.',
      sv: 'Transparens bortom identitet. Varande utan behov av handling. En harmonisk resonans med existensens mysterium.'
    },
    emergence: {
      en: 'Ultra-Violet arises when Coral’s mythic power dissolves into luminous silence. The self becomes an echo, then a membrane, then disappears.',
      sv: 'Ultra-Violett uppstår när Koralls mytiska kraft löses upp i ett ljust tystnadstillstånd. Självet blir ett eko, sedan ett membran, och försvinner.'
    },
    keyTraits: {
      en: ['Non-doing', 'Effortless transmission', 'Radical emptiness', 'Sacred stillness', 'Luminous awareness'],
      sv: ['Icke-handlande', 'Ansträngningslös transmission', 'Radikal tomhet', 'Helig stillhet', 'Ljusmedvetande']
    },
    insights: {
      en: ['All is already done', 'Nothing needs to happen', 'Truth is silence'],
      sv: ['Allt är redan gjort', 'Inget behöver hända', 'Sanningen är tystnad']
    },
    pitfalls: {
      en: ['Disconnection from form', 'Loss of direction', 'Difficulty communicating', 'Perceived aloofness'],
      sv: ['Frånkoppling från form', 'Brist på riktning', 'Svårighet att kommunicera', 'Upplevd distans']
    },
    triggers: {
      en: ['Mission-driven behavior', 'Identity formation', 'Power structures', 'Attachment to action'],
      sv: ['Uppdrivna syften', 'Identitetsformande', 'Maktstrukturer', 'Bundenhet till handling']
    },
    growthPath: {
      en: 'Ultra-Violet becomes Clear when even the radiant transparency dissolves. All that remains is presence without reference.',
      sv: 'Ultra-Violett blir Klar när även den lysande transparensen upplöses. Det enda som återstår är närvaro utan referens.'
    },
    archetypes: {
      en: ['Living mandalas', 'Walking prayers', 'Translucent sages', 'Pure presence'],
      sv: ['Levande mandalor', 'Gående böner', 'Genomskinliga visdomsbärare', 'Ren närvaro']
    },
    quotes: {
      en: [
        "There is no center. There is only echo.",
        "The message is not spoken. It is lived.",
        "You are not the form — you are the transparency behind it.",
        "In resting completely, all things unfold.",
        "Be still. The truth you seek is not elsewhere.",
        "“Trying to define yourself is like trying to bite your own teeth.” — Alan Watts"
      ],
      sv: [
        "Det finns inget centrum. Bara eko.",
        "Budskapet uttalas inte. Det levs.",
        "Du är inte formen — du är transparensen bakom den.",
        "I fullständig vila vecklas allt ut.",
        "Var stilla. Sanningen du söker är inte någon annanstans.",
        "“Att försöka definiera sig själv är som att försöka bita sina egna tänder.” — Alan Watts"
      ]
    },
    transitionQuote: {
      en: '“There is no I. Only the song echoing through the empty sky.”',
      sv: '”Det finns inget jag. Bara sången som ekar genom den tomma himlen.”'
    }
  },
  {
    id: 'clear',
    color: 'Clear',
    hex: '#E0F2F1',
    name: { en: 'Clear', sv: 'Klar' },
    association: { en: 'Silent Transparency', sv: 'Tyst Transparens' },
    essence: {
      en: 'No identity. No trace. Not even silence. Clear is the stage of being that leaves no mark and makes no claim.',
      sv: 'Ingen identitet. Inga spår. Inte ens tystnad. Klar är stadiet av varande som inte lämnar något avtryck och inte gör något anspråk.'
    },
    emergence: {
      en: 'Clear arises when Ultra-Violet’s gentle glow is surrendered completely. Not from effort, but because nothing more is needed. Even presence dissolves.',
      sv: 'Klar uppstår när Ultra-Violetts milda sken släpps helt. Inte genom ansträngning, utan för att inget mer behövs. Även närvaro upplöses.'
    },
    keyTraits: {
      en: ['Emptiness', 'Formless clarity', 'Absence of agenda', 'Beyond paradox', 'No transmission'],
      sv: ['Tomhet', 'Formlös klarhet', 'Frånvaro av agenda', 'Bortom paradox', 'Ingen överföring']
    },
    insights: {
      en: ['Nothing remains', 'Even being is optional', 'The world is a teacup evaporating'],
      sv: ['Inget återstår', 'Även varande är valfritt', 'Världen är en tekopp som avdunstar']
    },
    pitfalls: {
      en: ['Incommunicability', 'Disappearance from engagement', 'Being perceived as void'],
      sv: ['Oförmedlingsbarhet', 'Försvinnande från engagemang', 'Uppfattas som tomhet']
    },
    triggers: {
      en: ['Any need to act', 'Meaning-seeking', 'Presence as performance', 'Being seen'],
      sv: ['Allt behov av att agera', 'Sökande efter mening', 'Närvaro som prestation', 'Att bli sedd']
    },
    growthPath: {
      en: 'Clear has no further upward movement. It dissolves even the concept of development. But what arises beyond it may be a re-entry into playful multiplicity.',
      sv: 'Klar har ingen ytterligare uppåtgående rörelse. Den löser upp själva begreppet utveckling. Men bortom detta kan ett lekfullt återinträde uppstå.'
    },
    archetypes: {
      en: ['Disappearing sage', 'Silent witness', 'Vanished mystic', 'Pure awareness without location'],
      sv: ['Försvunnen vis man', 'Tyst vittne', 'Borta mystiker', 'Ren medvetenhet utan plats']
    },
    quotes: {
      en: [
        "Nothing remains. Not even the need for nothing.",
        "You are the space in which it all appears and disappears.",
        "There is no more story to tell. There is no one to tell it.",
        "Beyond presence, there is… nothing. And even that is not true.",
        "“Silence is the language of God.” — Rumi",
        "“The Tao does nothing, yet nothing is left undone.” — Lao-zi"
      ],
      sv: [
        "Inget återstår. Inte ens behovet av intighet.",
        "Du är rymden där allt uppstår och försvinner.",
        "Det finns ingen berättelse kvar. Ingen kvar att berätta den.",
        "Bortom närvaro finns… ingenting. Och inte ens det är sant.",
        "“Tystnad är Guds språk.” — Rumi",
        "“Tao gör ingenting, men ingenting lämnas ogjort.” — Lao-zi"
      ]
    },
    transitionQuote: {
      en: '“You are the empty space in which all this happens — and does not happen.”',
      sv: '”Du är det tomma utrymmet där allt detta sker — och inte sker.”'
    }
  }


];
