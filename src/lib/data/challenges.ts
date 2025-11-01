// Challenge types and data structure for Spiralize.org

export type DifficultyLevel = 'gentle' | 'active' | 'deep';
export type ChallengeContext = 'work' | 'relationships' | 'community' | 'beliefs' | 'decisions' | 'daily-life';

export interface Challenge {
  id: string;
  transition: string; // e.g., "purple-red", "blue-orange"
  fromStage: string;
  toStage: string;
  difficulty: DifficultyLevel;
  context: ChallengeContext;
  title: {
    en: string;
    sv: string;
  };
  description: {
    en: string;
    sv: string;
  };
  action: {
    en: string;
    sv: string;
  };
  reflectionPrompts: {
    en: string[];
    sv: string[];
  };
  timeframe?: {
    en: string;
    sv: string;
  };
  warning?: {
    en: string;
    sv: string;
  };
}

export const challenges: Challenge[] = [
  // BEIGE → PURPLE Challenges
  {
    id: 'beige-purple-gentle-daily',
    transition: 'beige-purple',
    fromStage: 'beige',
    toStage: 'purple',
    difficulty: 'gentle',
    context: 'daily-life',
    title: {
      en: 'Create a simple ritual',
      sv: 'Skapa en enkel ritual'
    },
    description: {
      en: 'Beige consciousness is purely instinctual and reactive. Purple consciousness begins to recognize patterns and create meaning through ritual. This challenge helps you connect actions to intention.',
      sv: 'Beige medvetande är rent instinktivt och reaktivt. Lila medvetande börjar känna igen mönster och skapa mening genom ritualer. Den här utmaningen hjälper dig att koppla handlingar till avsikt.'
    },
    action: {
      en: 'Choose one daily activity (making coffee, going to bed, eating breakfast). Add a simple intentional element: light a candle, say a phrase, pause for a breath. Repeat it for three days and notice what changes.',
      sv: 'Välj en daglig aktivitet (att koka kaffe, gå och lägga sig, äta frukost). Lägg till ett enkelt avsiktligt element: tänd ett ljus, säg en fras, pausa för ett andetag. Upprepa i tre dagar och märk vad som förändras.'
    },
    reflectionPrompts: {
      en: [
        'Did the repeated action start to feel meaningful?',
        'How did adding intention change the experience?',
        'Did you feel more connected to the moment?'
      ],
      sv: [
        'Började den upprepade handlingen kännas meningsfull?',
        'Hur förändrade den tillagda avsikten upplevelsen?',
        'Kände du dig mer ansluten till ögonblicket?'
      ]
    },
    timeframe: {
      en: 'Three days',
      sv: 'Tre dagar'
    }
  },
  {
    id: 'beige-purple-active-relationships',
    transition: 'beige-purple',
    fromStage: 'beige',
    toStage: 'purple',
    difficulty: 'active',
    context: 'relationships',
    title: {
      en: 'Recognize your tribe',
      sv: 'Känn igen din stam'
    },
    description: {
      en: 'Moving from survival-only thinking to tribal consciousness means recognizing that you are safer and stronger as part of a group.',
      sv: 'Att gå från enbart överlevnadstänkande till stam-medvetande innebär att inse att du är säkrare och starkare som en del av en grupp.'
    },
    action: {
      en: 'Identify 3-5 people who consistently support you. Write down what each person provides (safety, food, comfort, guidance). Thank one of them explicitly. Notice how belonging feels different from just surviving.',
      sv: 'Identifiera 3-5 personer som konsekvent stöttar dig. Skriv ner vad varje person ger (trygghet, mat, tröst, vägledning). Tacka en av dem uttryckligen. Märk hur tillhörighet känns annorlunda än att bara överleva.'
    },
    reflectionPrompts: {
      en: [
        'How does it feel to acknowledge you need others?',
        'What changes when you see yourself as part of something larger?',
        'Can vulnerability within your tribe actually increase safety?'
      ],
      sv: [
        'Hur känns det att erkänna att du behöver andra?',
        'Vad förändras när du ser dig själv som en del av något större?',
        'Kan sårbarhet inom din stam faktiskt öka tryggheten?'
      ]
    },
    timeframe: {
      en: 'One week',
      sv: 'En vecka'
    }
  },
  {
    id: 'beige-purple-deep-beliefs',
    transition: 'beige-purple',
    fromStage: 'beige',
    toStage: 'purple',
    difficulty: 'deep',
    context: 'beliefs',
    title: {
      en: 'Connect to ancestral wisdom',
      sv: 'Anslut till förfäders visdom'
    },
    description: {
      en: 'Purple consciousness honors ancestors and recognizes that wisdom flows through generations. This challenge helps you see beyond immediate survival to inherited knowledge.',
      sv: 'Lila medvetande hedrar förfäder och inser att visdom flödar genom generationer. Den här utmaningen hjälper dig att se bortom omedelbar överlevnad till ärvd kunskap.'
    },
    action: {
      en: 'Learn one story, skill, or tradition from your elders or cultural heritage. It could be a recipe, a song, a craft, or a tale. Practice it yourself and consider what wisdom it carries about surviving and thriving.',
      sv: 'Lär dig en berättelse, färdighet eller tradition från dina äldre eller ditt kulturarv. Det kan vara ett recept, en sång, ett hantverk eller en saga. Utöva det själv och fundera över vilken visdom det bär på om att överleva och blomstra.'
    },
    reflectionPrompts: {
      en: [
        'What practical wisdom was embedded in this tradition?',
        'How does it feel to connect to something older than you?',
        'What changes when you see yourself as a link in a chain rather than alone?',
        'Can old ways contain knowledge that individual reasoning might miss?'
      ],
      sv: [
        'Vilken praktisk visdom fanns inbäddad i denna tradition?',
        'Hur känns det att ansluta till något äldre än du själv?',
        'Vad förändras när du ser dig själv som en länk i en kedja snarare än ensam?',
        'Kan gamla sedvänjor innehålla kunskap som individuellt resonerande kan missa?'
      ]
    },
    timeframe: {
      en: 'Two weeks of learning and practice',
      sv: 'Två veckors lärande och övning'
    }
  },

  // PURPLE → RED Challenges
  {
    id: 'purple-red-gentle-beliefs',
    transition: 'purple-red',
    fromStage: 'purple',
    toStage: 'red',
    difficulty: 'gentle',
    context: 'beliefs',
    title: {
      en: 'Question a family tradition',
      sv: 'Ifrågasätt en familjetradition'
    },
    description: {
      en: 'Purple consciousness finds safety in traditions and family rituals. This challenge invites you to gently examine one tradition from a personal perspective.',
      sv: 'Lila medvetande finner trygghet i traditioner och familjeritualer. Den här utmaningen bjuder in dig att försiktigt granska en tradition ur ett personligt perspektiv.'
    },
    action: {
      en: 'Choose one family tradition or ritual you participate in. Ask yourself: "If I were designing this from scratch today, would I do it the same way? What would I change?" Write down your thoughts privately.',
      sv: 'Välj en familjetradition eller ritual du deltar i. Fråga dig själv: "Om jag designade detta från grunden idag, skulle jag göra det på samma sätt? Vad skulle jag ändra?" Skriv ner dina tankar privat.'
    },
    reflectionPrompts: {
      en: [
        'How did it feel to question something you usually accept?',
        'Did you feel disloyal or uncomfortable? That\'s normal - traditions create our sense of belonging.',
        'What part of the tradition still feels meaningful to you, independent of "because we\'ve always done it"?'
      ],
      sv: [
        'Hur kändes det att ifrågasätta något du vanligtvis accepterar?',
        'Kände du dig illojal eller obekväm? Det är normalt - traditioner skapar vår känsla av tillhörighet.',
        'Vilken del av traditionen känns fortfarande meningsfull för dig, oberoende av "för att vi alltid har gjort så"?'
      ]
    },
    timeframe: {
      en: 'One quiet moment of reflection',
      sv: 'Ett tyst ögonblick av reflektion'
    }
  },
  {
    id: 'purple-red-active-daily',
    transition: 'purple-red',
    fromStage: 'purple',
    toStage: 'red',
    difficulty: 'active',
    context: 'daily-life',
    title: {
      en: 'Make one decision independently',
      sv: 'Fatta ett beslut självständigt'
    },
    description: {
      en: 'Moving toward Red means trusting your own judgment, even when it differs from the group. This challenge helps you practice personal agency in a safe way.',
      sv: 'Att röra sig mot Rött innebär att lita på sitt eget omdöme, även när det skiljer sig från gruppens. Den här utmaningen hjälper dig att öva på personlig handlingskraft på ett säkert sätt.'
    },
    action: {
      en: 'Identify a small decision you would normally ask family/elders about (what to eat, what to wear, how to spend an evening). Make the choice yourself without consulting anyone. Notice what happens.',
      sv: 'Identifiera ett litet beslut du normalt skulle fråga familj/äldre om (vad du ska äta, vad du ska ha på dig, hur du ska tillbringa en kväll). Fatta beslutet själv utan att konsultera någon. Märk vad som händer.'
    },
    reflectionPrompts: {
      en: [
        'What feelings came up when you didn\'t consult the group?',
        'Did anything bad actually happen?',
        'How did it feel to trust your own instincts?',
        'Can you honor your community while also honoring your own needs?'
      ],
      sv: [
        'Vilka känslor dök upp när du inte konsulterade gruppen?',
        'Hände det faktiskt något dåligt?',
        'Hur kändes det att lita på dina egna instinkter?',
        'Kan du hedra din gemenskap samtidigt som du hedrar dina egna behov?'
      ]
    },
    timeframe: {
      en: 'One day',
      sv: 'En dag'
    }
  },

  // RED → BLUE Challenges
  {
    id: 'red-blue-gentle-daily',
    transition: 'red-blue',
    fromStage: 'red',
    toStage: 'blue',
    difficulty: 'gentle',
    context: 'daily-life',
    title: {
      en: 'Follow a simple rule',
      sv: 'Följ en enkel regel'
    },
    description: {
      en: 'Red consciousness resists external constraints and follows impulses. Blue consciousness finds freedom in discipline. This challenge invites you to experience structure as supportive rather than limiting.',
      sv: 'Rött medvetande motsätter sig yttre begränsningar och följer impulser. Blått medvetande finner frihet i disciplin. Den här utmaningen bjuder in dig att uppleva struktur som stödjande snarare än begränsande.'
    },
    action: {
      en: 'Choose one small daily rule to follow for a week (wake up at the same time, make your bed, eat meals at set times). Notice what happens when you commit to consistency instead of spontaneity.',
      sv: 'Välj en liten daglig regel att följa i en vecka (vakna vid samma tid, bädda sängen, ät måltider vid bestämda tider). Märk vad som händer när du förbinder dig till konsistens istället för spontanitet.'
    },
    reflectionPrompts: {
      en: [
        'Did the structure feel constraining or freeing?',
        'What energy was freed up by not deciding each time?',
        'Did you feel proud of keeping a commitment to yourself?'
      ],
      sv: [
        'Kändes strukturen begränsande eller befriande?',
        'Vilken energi frigjordes genom att inte behöva besluta varje gång?',
        'Kände du dig stolt över att hålla ett åtagande gentemot dig själv?'
      ]
    },
    timeframe: {
      en: 'One week',
      sv: 'En vecka'
    }
  },
  {
    id: 'red-blue-active-relationships',
    transition: 'red-blue',
    fromStage: 'red',
    toStage: 'blue',
    difficulty: 'active',
    context: 'relationships',
    title: {
      en: 'Keep one promise',
      sv: 'Håll ett löfte'
    },
    description: {
      en: 'Red consciousness takes what it wants when it wants it. Blue consciousness discovers that reliability and duty create deeper respect than power alone.',
      sv: 'Rött medvetande tar vad det vill ha när det vill ha det. Blått medvetande upptäcker att pålitlighet och plikt skapar djupare respekt än makt enbart.'
    },
    action: {
      en: 'Make a promise to someone and keep it, even when it becomes inconvenient. Choose something meaningful but achievable (help with a project, show up on time, complete a task). Notice the other person\'s response.',
      sv: 'Ge ett löfte till någon och håll det, även när det blir obekvämt. Välj något meningsfullt men uppnåeligt (hjälpa till med ett projekt, komma i tid, slutföra en uppgift). Lägg märke till den andra personens respons.'
    },
    reflectionPrompts: {
      en: [
        'How did it feel to honor your word even when you didn\'t feel like it?',
        'Did keeping the promise build trust in a way dominance never could?',
        'What kind of respect did you earn?',
        'Can discipline be a form of power?'
      ],
      sv: [
        'Hur kändes det att hålla ditt ord även när du inte kände för det?',
        'Byggde hållandet av löftet förtroende på ett sätt som dominans aldrig skulle kunna?',
        'Vilken typ av respekt förtjänade du?',
        'Kan disciplin vara en form av makt?'
      ]
    },
    timeframe: {
      en: 'One commitment cycle',
      sv: 'En åtagandecykel'
    }
  },
  {
    id: 'red-blue-deep-beliefs',
    transition: 'red-blue',
    fromStage: 'red',
    toStage: 'blue',
    difficulty: 'deep',
    context: 'beliefs',
    title: {
      en: 'Submit to a higher purpose',
      sv: 'Underkasta dig ett högre syfte'
    },
    description: {
      en: 'This challenge asks you to experience what happens when you serve something greater than your immediate desires - a cause, a community, a principle.',
      sv: 'Den här utmaningen ber dig uppleva vad som händer när du tjänar något större än dina omedelbara begär - ett mål, en gemenskap, en princip.'
    },
    action: {
      en: 'Identify a cause or principle you respect (justice, service, faith, duty to family). For two weeks, make daily decisions by asking: "What does this higher purpose require of me?" even when it conflicts with what you want.',
      sv: 'Identifiera ett mål eller en princip du respekterar (rättvisa, tjänst, tro, plikt mot familjen). Fatta dagliga beslut i två veckor genom att fråga: "Vad kräver detta högre syfte av mig?" även när det strider mot vad du vill.'
    },
    reflectionPrompts: {
      en: [
        'Did sacrifice for something meaningful feel different than just restraint?',
        'What did you gain by serving something beyond yourself?',
        'How did your sense of identity change?',
        'Can surrender to purpose be more powerful than raw will?'
      ],
      sv: [
        'Kändes uppoffring för något meningsfullt annorlunda än bara återhållsamhet?',
        'Vad vann du på att tjäna något bortom dig själv?',
        'Hur förändrades din identitetskänsla?',
        'Kan överlåtelse till ett syfte vara mäktigare än rå vilja?'
      ]
    },
    timeframe: {
      en: 'Two weeks of daily practice',
      sv: 'Två veckors daglig övning'
    },
    warning: {
      en: 'Choose a purpose carefully - this is about meaning, not blind obedience. The goal is to discover how order can serve life.',
      sv: 'Välj ett syfte noggrant - det handlar om mening, inte blind lydnad. Målet är att upptäcka hur ordning kan tjäna livet.'
    }
  },

  // BLUE → ORANGE Challenges
  {
    id: 'blue-orange-gentle-beliefs',
    transition: 'blue-orange',
    fromStage: 'blue',
    toStage: 'orange',
    difficulty: 'gentle',
    context: 'beliefs',
    title: {
      en: 'Examine one "should"',
      sv: 'Granska ett "borde"'
    },
    description: {
      en: 'Blue consciousness operates on clear rules and shoulds. This challenge invites you to question whether a rule serves its intended purpose.',
      sv: 'Blått medvetande fungerar enligt tydliga regler och "borden". Den här utmaningen bjuder in dig att ifrågasätta om en regel tjänar sitt avsedda syfte.'
    },
    action: {
      en: 'Identify one "should" or rule you follow (religious, social, or personal). Ask: "What is the actual outcome of following this rule? Is there a more effective way to achieve that outcome?" Write down your analysis.',
      sv: 'Identifiera ett "borde" eller en regel du följer (religiös, social eller personlig). Fråga: "Vad är det faktiska resultatet av att följa denna regel? Finns det ett effektivare sätt att uppnå det resultatet?" Skriv ner din analys.'
    },
    reflectionPrompts: {
      en: [
        'Did questioning the rule feel rebellious or wrong?',
        'Can you distinguish between the rule\'s purpose and the rule itself?',
        'What would happen if you modified the method while keeping the intention?'
      ],
      sv: [
        'Kändes det upproriskt eller fel att ifrågasätta regeln?',
        'Kan du skilja mellan regelns syfte och själva regeln?',
        'Vad skulle hända om du ändrade metoden men behöll avsikten?'
      ]
    },
    timeframe: {
      en: '15-20 minutes of reflection',
      sv: '15-20 minuters reflektion'
    }
  },
  {
    id: 'blue-orange-active-work',
    transition: 'blue-orange',
    fromStage: 'blue',
    toStage: 'orange',
    difficulty: 'active',
    context: 'work',
    title: {
      en: 'Propose a process improvement',
      sv: 'Föreslå en processförbättring'
    },
    description: {
      en: 'Orange thinking focuses on efficiency and results. This challenge helps you shift from "following the process" to "improving the outcome."',
      sv: 'Orange tänkande fokuserar på effektivitet och resultat. Den här utmaningen hjälper dig att gå från att "följa processen" till att "förbättra resultatet".'
    },
    action: {
      en: 'Identify one process at work or in your organization that feels inefficient. Document: (1) Current method, (2) Actual outcome, (3) Alternative approach, (4) Predicted outcome. Share it with someone in charge.',
      sv: 'Identifiera en process på jobbet eller i din organisation som känns ineffektiv. Dokumentera: (1) Nuvarande metod, (2) Faktiskt resultat, (3) Alternativt tillvägagångssätt, (4) Förväntat resultat. Dela det med någon ansvarig.'
    },
    reflectionPrompts: {
      en: [
        'How did it feel to suggest changing "the way we\'ve always done it"?',
        'Did you focus on criticizing the old way, or on the potential for better results?',
        'What resistance did you encounter - in others or in yourself?'
      ],
      sv: [
        'Hur kändes det att föreslå en ändring av "sättet vi alltid har gjort det på"?',
        'Fokuserade du på att kritisera det gamla sättet, eller på potentialen för bättre resultat?',
        'Vilket motstånd mötte du - hos andra eller hos dig själv?'
      ]
    },
    timeframe: {
      en: 'One week',
      sv: 'En vecka'
    }
  },
  {
    id: 'blue-orange-deep-beliefs',
    transition: 'blue-orange',
    fromStage: 'blue',
    toStage: 'orange',
    difficulty: 'deep',
    context: 'beliefs',
    title: {
      en: 'Test a deeply held belief',
      sv: 'Testa en djupt rotad övertygelse'
    },
    description: {
      en: 'This challenge asks you to temporarily suspend judgment on a core belief and examine it through a scientific lens.',
      sv: 'Den här utmaningen ber dig att tillfälligt skjuta upp ditt omdöme om en central övertygelse och granska den genom en vetenskaplig lins.'
    },
    action: {
      en: 'Choose a belief you hold strongly (religious, political, moral). For one week, actively seek out credible sources that challenge this belief. Don\'t try to refute them - just listen. Keep a journal of what you learn.',
      sv: 'Välj en övertygelse du håller starkt (religiös, politisk, moralisk). Sök aktivt efter trovärdiga källor som utmanar denna övertygelse under en vecka. Försök inte motbevisa dem - bara lyssna. För en dagbok över vad du lär dig.'
    },
    reflectionPrompts: {
      en: [
        'Could you genuinely listen without immediately defending your position?',
        'What did you discover about why people hold different views?',
        'Did any part of the opposing view have merit?',
        'Can truth be more complex than "right vs. wrong"?'
      ],
      sv: [
        'Kunde du genuint lyssna utan att omedelbart försvara din position?',
        'Vad upptäckte du om varför människor har olika åsikter?',
        'Hade någon del av den motsatta åsikten någon poäng?',
        'Kan sanningen vara mer komplex än "rätt kontra fel"?'
      ]
    },
    timeframe: {
      en: 'One week of active research',
      sv: 'En veckas aktiv efterforskning'
    },
    warning: {
      en: 'This can feel destabilizing. It\'s okay to maintain your beliefs while understanding others\' perspectives.',
      sv: 'Detta kan kännas destabiliserande. Det är okej att behålla dina övertygelser samtidigt som du förstår andras perspektiv.'
    }
  },

  // ORANGE → GREEN Challenges
  {
    id: 'orange-green-gentle-relationships',
    transition: 'orange-green',
    fromStage: 'orange',
    toStage: 'green',
    difficulty: 'gentle',
    context: 'relationships',
    title: {
      en: 'Listen without solving',
      sv: 'Lyssna utan att lösa'
    },
    description: {
      en: 'Orange consciousness wants to fix problems and optimize outcomes. Green consciousness emphasizes being present and holding space for others.',
      sv: 'Orange medvetande vill fixa problem och optimera resultat. Grönt medvetande betonar att vara närvarande och hålla utrymme för andra.'
    },
    action: {
      en: 'The next time someone shares a problem with you, resist the urge to offer solutions. Instead, ask: "How does that feel for you?" and "What do you need right now?" Just listen.',
      sv: 'Nästa gång någon delar ett problem med dig, motstå lusten att erbjuda lösningar. Fråga istället: "Hur känns det för dig?" och "Vad behöver du just nu?" Bara lyssna.'
    },
    reflectionPrompts: {
      en: [
        'How hard was it to not jump to problem-solving?',
        'What did you notice about the other person when you just listened?',
        'Did the conversation feel "productive" in a different way than usual?'
      ],
      sv: [
        'Hur svårt var det att inte hoppa till problemlösning?',
        'Vad lade du märke till hos den andra personen när du bara lyssnade?',
        'Kändes konversationen "produktiv" på ett annat sätt än vanligt?'
      ]
    },
    timeframe: {
      en: 'One conversation',
      sv: 'En konversation'
    }
  },
  {
    id: 'orange-green-gentle-daily',
    transition: 'orange-green',
    fromStage: 'orange',
    toStage: 'green',
    difficulty: 'gentle',
    context: 'daily-life',
    title: {
      en: 'Measure what matters',
      sv: 'Mät det som betyder något'
    },
    description: {
      en: 'Orange focuses on measurable success. Green recognizes that the most important things can\'t be measured. This challenge invites you to track qualitative experience.',
      sv: 'Orange fokuserar på mätbar framgång. Grönt inser att de viktigaste sakerna inte kan mätas. Den här utmaningen bjuder in dig att spåra kvalitativ erfarenhet.'
    },
    action: {
      en: 'For one week, keep a journal of "unmeasurable wins" - moments of connection, beauty, peace, or shared laughter. Notice how tracking these changes your definition of a "successful day."',
      sv: 'För en vecka, för en dagbok över "omätbara vinster" - stunder av kontakt, skönhet, frid eller delat skratt. Lägg märke till hur spårningen av dessa förändrar din definition av en "framgångsrik dag."'
    },
    reflectionPrompts: {
      en: [
        'What became visible when you stopped measuring outcomes?',
        'Did your sense of success expand beyond achievement?',
        'What relationships deepened when you valued connection over accomplishment?'
      ],
      sv: [
        'Vad blev synligt när du slutade mäta resultat?',
        'Expanderade din framgångskänsla bortom prestation?',
        'Vilka relationer fördjupades när du värderade kontakt framför prestation?'
      ]
    },
    timeframe: {
      en: 'One week',
      sv: 'En vecka'
    }
  },
  {
    id: 'orange-green-active-decisions',
    transition: 'orange-green',
    fromStage: 'orange',
    toStage: 'green',
    difficulty: 'active',
    context: 'decisions',
    title: {
      en: 'Map the stakeholders',
      sv: 'Kartlägg intressenterna'
    },
    description: {
      en: 'Green thinking considers the impact on all people, not just measurable outcomes. This challenge expands your decision-making framework.',
      sv: 'Grönt tänkande tar hänsyn till påverkan på alla människor, inte bara mätbara resultat. Den här utmaningen utvidgar ditt ramverk för beslutsfattande.'
    },
    action: {
      en: 'Before making your next significant decision (business, personal, community), create a stakeholder map. List everyone affected - including those who don\'t benefit you. Consider their needs. How does this change your decision?',
      sv: 'Innan du fattar ditt nästa viktiga beslut (affärsmässigt, personligt, i samhället), skapa en intressentkarta. Lista alla som påverkas - inklusive de som inte gynnar dig. Beakta deras behov. Hur förändrar detta ditt beslut?'
    },
    reflectionPrompts: {
      en: [
        'Which stakeholders did you initially overlook?',
        'How did considering others\' wellbeing feel - burdensome or enriching?',
        'Did you find a way to create more mutual benefit?',
        'Can success include others\' thriving?'
      ],
      sv: [
        'Vilka intressenter förbisåg du initialt?',
        'Hur kändes det att beakta andras välbefinnande - betungande eller berikande?',
        'Hittade du ett sätt att skapa mer ömsesidig nytta?',
        'Kan framgång inkludera andras blomstrande?'
      ]
    },
    timeframe: {
      en: 'Before your next major decision',
      sv: 'Inför ditt nästa stora beslut'
    }
  },
  {
    id: 'orange-green-deep-community',
    transition: 'orange-green',
    fromStage: 'orange',
    toStage: 'green',
    difficulty: 'deep',
    context: 'community',
    title: {
      en: 'Experience true consensus',
      sv: 'Upplev äkta konsensus'
    },
    description: {
      en: 'This challenge asks you to participate in a process where the goal isn\'t winning, but collective wisdom.',
      sv: 'Den här utmaningen ber dig att delta i en process där målet inte är att vinna, utan kollektiv visdom.'
    },
    action: {
      en: 'Attend or organize a group decision-making session where the explicit goal is consensus, not compromise. Everyone must genuinely support the decision, not just "go along with it." Notice the pace, the listening, the emergence.',
      sv: 'Delta i eller organisera ett gruppbeslutsmöte där det uttryckliga målet är konsensus, inte kompromiss. Alla måste genuint stödja beslutet, inte bara "hänga med". Lägg märke till tempot, lyssnandet, det som växer fram.'
    },
    reflectionPrompts: {
      en: [
        'How did it feel to slow down and truly hear all voices?',
        'Was the final decision better than what you initially proposed?',
        'What was lost and gained compared to top-down decision-making?',
        'Can collective wisdom be as effective as expert judgment?'
      ],
      sv: [
        'Hur kändes det att sakta ner och verkligen höra alla röster?',
        'Var det slutgiltiga beslutet bättre än vad du ursprungligen föreslog?',
        'Vad förlorades och vanns jämfört med toppstyrt beslutsfattande?',
        'Kan kollektiv visdom vara lika effektiv som expertbedömning?'
      ]
    },
    timeframe: {
      en: 'One collaborative session',
      sv: 'En samarbetssession'
    }
  },

  // GREEN → YELLOW Challenges
  {
    id: 'green-yellow-gentle-beliefs',
    transition: 'green-yellow',
    fromStage: 'green',
    toStage: 'yellow',
    difficulty: 'gentle',
    context: 'beliefs',
    title: {
      en: 'Hold paradox lightly',
      sv: 'Håll paradoxer lättsamt'
    },
    description: {
      en: 'Green seeks harmony and consensus. Yellow embraces paradox and multiple truths. This challenge invites you to sit with contradiction.',
      sv: 'Grönt söker harmoni och konsensus. Gult omfamnar paradoxer och multipla sanningar. Den här utmaningen bjuder in dig att sitta med motsägelser.'
    },
    action: {
      en: 'Identify a belief you hold strongly. Then write down the strongest opposing view. For 10 minutes, try to hold both as simultaneously valid in different contexts. Don\'t resolve the tension.',
      sv: 'Identifiera en övertygelse du håller starkt. Skriv sedan ner den starkaste motsatta åsikten. Försök i 10 minuter att hålla båda som samtidigt giltiga i olika sammanhang. Lös inte spänningen.'
    },
    reflectionPrompts: {
      en: [
        'How uncomfortable was it to not resolve the contradiction?',
        'Could you see how both views serve different purposes?',
        'What happens when you stop seeing disagreement as a problem to solve?'
      ],
      sv: [
        'Hur obekvämt var det att inte lösa motsägelsen?',
        'Kunde du se hur båda åsikterna tjänar olika syften?',
        'Vad händer när du slutar se oenighet som ett problem att lösa?'
      ]
    },
    timeframe: {
      en: '10-15 minutes of contemplation',
      sv: '10-15 minuters kontemplation'
    }
  },
  {
    id: 'green-yellow-active-community',
    transition: 'green-yellow',
    fromStage: 'green',
    toStage: 'yellow',
    difficulty: 'active',
    context: 'community',
    title: {
      en: 'Map the system',
      sv: 'Kartlägg systemet'
    },
    description: {
      en: 'Yellow consciousness sees systems and patterns. This challenge helps you shift from "who\'s to blame" to "what\'s the pattern."',
      sv: 'Gult medvetande ser system och mönster. Den här utmaningen hjälper dig att skifta från "vems fel är det" till "vad är mönstret".'
    },
    action: {
      en: 'Choose a recurring problem in your organization or community. Map it: (1) What patterns repeat? (2) What reinforces those patterns? (3) Where are the leverage points? Focus on structure, not individuals.',
      sv: 'Välj ett återkommande problem i din organisation eller gemenskap. Kartlägg det: (1) Vilka mönster upprepas? (2) Vad förstärker dessa mönster? (3) Var finns hävstångspunkterna? Fokusera på struktur, inte individer.'
    },
    reflectionPrompts: {
      en: [
        'How did it feel to stop blaming people and look at patterns?',
        'What systemic factors did you discover that you hadn\'t noticed before?',
        'Where could small changes create large effects?',
        'Can problems be no one\'s fault and still need solving?'
      ],
      sv: [
        'Hur kändes det att sluta skylla på människor och titta på mönster?',
        'Vilka systemiska faktorer upptäckte du som du inte hade lagt märke till tidigare?',
        'Var skulle små förändringar kunna skapa stora effekter?',
        'Kan problem vara ingens fel och ändå behöva lösas?'
      ]
    },
    timeframe: {
      en: 'A few hours of mapping',
      sv: 'Några timmars kartläggning'
    }
  },
  {
    id: 'green-yellow-deep-beliefs',
    transition: 'green-yellow',
    fromStage: 'green',
    toStage: 'yellow',
    difficulty: 'deep',
    context: 'beliefs',
    title: {
      en: 'Examine your sacred cows',
      sv: 'Granska dina heliga kor'
    },
    description: {
      en: 'This challenge asks you to question a value you consider universal and explore its context-dependency.',
      sv: 'Den här utmaningen ber dig ifrågasätta ett värde du anser vara universellt och utforska dess kontextberoende.'
    },
    action: {
      en: 'Identify one of your core values (equality, freedom, compassion, etc.). Research contexts where that value, taken to its extreme, could create harm. Write about when and how this value might need to be balanced with others.',
      sv: 'Identifiera ett av dina kärnvärden (jämlikhet, frihet, medkänsla, etc.). Undersök sammanhang där det värdet, taget till sin spets, skulle kunna orsaka skada. Skriv om när och hur detta värde kan behöva balanseras med andra.'
    },
    reflectionPrompts: {
      en: [
        'Could you acknowledge limitations without betraying the value?',
        'What other values came into tension with this one?',
        'How did it feel to discover your values are context-dependent?',
        'Can you hold strong values while recognizing their boundaries?'
      ],
      sv: [
        'Kunde du erkänna begränsningar utan att svika värdet?',
        'Vilka andra värden hamnade i spänning med detta?',
        'Hur kändes det att upptäcka att dina värderingar är kontextberoende?',
        'Kan du hålla fast vid starka värderingar samtidigt som du inser deras gränser?'
      ]
    },
    timeframe: {
      en: 'A week of reflection and research',
      sv: 'En vecka av reflektion och efterforskning'
    },
    warning: {
      en: 'This isn\'t about abandoning your values - it\'s about understanding their nuances and trade-offs.',
      sv: 'Detta handlar inte om att överge dina värderingar - det handlar om att förstå deras nyanser och avvägningar.'
    }
  },
  {
    id: 'green-yellow-deep-community',
    transition: 'green-yellow',
    fromStage: 'green',
    toStage: 'yellow',
    difficulty: 'deep',
    context: 'community',
    title: {
      en: 'Transcend consensus',
      sv: 'Transcendera konsensus'
    },
    description: {
      en: 'Green seeks harmony through consensus. Yellow recognizes that some truths transcend group agreement. This challenge asks you to speak an uncomfortable truth that serves the whole, even if it disrupts harmony.',
      sv: 'Grönt söker harmoni genom konsensus. Gult inser att vissa sanningar transcenderar gruppöverenskommelse. Den här utmaningen ber dig att tala en obekväm sanning som tjänar helheten, även om den stör harmonin.'
    },
    action: {
      en: 'Identify a pattern in your community that everyone avoids naming (an elephant in the room). Speak it clearly and compassionately, without blame. Hold the tension that follows without rushing to restore harmony.',
      sv: 'Identifiera ett mönster i din gemenskap som alla undviker att namnge (en elefant i rummet). Tala om det tydligt och medkännande, utan att skylla på någon. Håll spänningen som följer utan att skynda dig att återställa harmonin.'
    },
    reflectionPrompts: {
      en: [
        'What became possible when you stopped protecting feelings?',
        'Did the truth ultimately serve the group more than harmony would have?',
        'Can you distinguish between cruel honesty and necessary truth-telling?',
        'What systemic patterns became visible when you stopped colluding with silence?'
      ],
      sv: [
        'Vad blev möjligt när du slutade skydda känslor?',
        'Tjänade sanningen slutligen gruppen mer än harmonin skulle ha gjort?',
        'Kan du skilja mellan grym ärlighet och nödvändig sanning?',
        'Vilka systemiska mönster blev synliga när du slutade samarbeta med tystnad?'
      ]
    },
    timeframe: {
      en: 'One courageous conversation',
      sv: 'Ett modigt samtal'
    }
  },

  // YELLOW → TURQUOISE Challenges
  {
    id: 'yellow-turquoise-gentle-daily',
    transition: 'yellow-turquoise',
    fromStage: 'yellow',
    toStage: 'turquoise',
    difficulty: 'gentle',
    context: 'daily-life',
    title: {
      en: 'Practice presence',
      sv: 'Öva på närvaro'
    },
    description: {
      en: 'Yellow excels at thinking about systems. Turquoise experiences being part of the system. This challenge invites felt experience.',
      sv: 'Gult utmärker sig i att tänka på system. Turkos upplever att vara en del av systemet. Den här utmaningen bjuder in till en kännbar upplevelse.'
    },
    action: {
      en: 'Spend 10 minutes in nature or a quiet space. Instead of analyzing or thinking, simply experience. Notice sounds, sensations, your breath. When thoughts arise, gently return to direct experience.',
      sv: 'Tillbringa 10 minuter i naturen eller på en lugn plats. Istället för att analysera eller tänka, bara upplev. Lägg märke till ljud, förnimmelser, ditt andetag. När tankar dyker upp, återvänd försiktigt till den direkta upplevelsen.'
    },
    reflectionPrompts: {
      en: [
        'How hard was it to stop analyzing and just be?',
        'Did you notice a different quality of awareness?',
        'What happens when you stop being the observer and become part of the field?'
      ],
      sv: [
        'Hur svårt var det att sluta analysera och bara vara?',
        'Lade du märke till en annan kvalitet av medvetenhet?',
        'Vad händer när du slutar vara observatören och blir en del av fältet?'
      ]
    },
    timeframe: {
      en: '10 minutes daily for a week',
      sv: '10 minuter dagligen i en vecka'
    }
  },
  {
    id: 'yellow-turquoise-active-community',
    transition: 'yellow-turquoise',
    fromStage: 'yellow',
    toStage: 'turquoise',
    difficulty: 'active',
    context: 'community',
    title: {
      en: 'Participate in emergence',
      sv: 'Delta i emergens'
    },
    description: {
      en: 'Turquoise trusts emergent processes. This challenge asks you to participate without controlling the outcome.',
      sv: 'Turkos litar på framväxande (emergenta) processer. Den här utmaningen ber dig att delta utan att kontrollera resultatet.'
    },
    action: {
      en: 'Facilitate or join a group conversation where there is no predetermined outcome. Use practices like council circles or open space. Notice what emerges when you trust the collective intelligence.',
      sv: 'Led eller delta i en gruppkonversation där det inte finns något förutbestämt resultat. Använd metoder som cirkelsamtal (council) eller "open space". Lägg märke till vad som växer fram när du litar på den kollektiva intelligensen.'
    },
    reflectionPrompts: {
      en: [
        'How did it feel to not have a strategic goal?',
        'What emerged that no individual could have planned?',
        'Did you notice moments of collective flow?',
        'Can you trust emergence as much as you trust analysis?'
      ],
      sv: [
        'Hur kändes det att inte ha ett strategiskt mål?',
        'Vad växte fram som ingen enskild individ kunde ha planerat?',
        'Lade du märke till stunder av kollektivt flöde?',
        'Kan du lita på emergens lika mycket som du litar på analys?'
      ]
    },
    timeframe: {
      en: 'One emergent session',
      sv: 'En emergent session'
    }
  },
  {
    id: 'yellow-turquoise-active-work',
    transition: 'yellow-turquoise',
    fromStage: 'yellow',
    toStage: 'turquoise',
    difficulty: 'active',
    context: 'work',
    title: {
      en: 'Lead from the field',
      sv: 'Led från fältet'
    },
    description: {
      en: 'Yellow leads through brilliant analysis and strategic vision. Turquoise leads through presence and resonance with the collective field. This challenge asks you to drop your maps and trust emergent intelligence.',
      sv: 'Gult leder genom briljant analys och strategisk vision. Turkos leder genom närvaro och resonans med det kollektiva fältet. Den här utmaningen ber dig att släppa dina kartor och lita på framväxande intelligens.'
    },
    action: {
      en: 'In your next team meeting or collaborative project, don\'t prepare an agenda or analysis. Instead, open with a moment of silence. Let the conversation emerge organically. Speak only when you feel moved by the collective field, not when you have the "right answer."',
      sv: 'I ditt nästa teammöte eller samarbetsprojekt, förbered ingen agenda eller analys. Öppna istället med ett ögonblicks tystnad. Låt konversationen växa fram organiskt. Tala bara när du känner dig driven av det kollektiva fältet, inte när du har "rätt svar."'
    },
    reflectionPrompts: {
      en: [
        'What emerged that no strategic plan could have created?',
        'How did it feel to lead without being the expert?',
        'Did the group intelligence surpass your individual brilliance?',
        'What new possibilities opened when you stopped trying to be right?',
        'Can you trust emergence more than you trust your own analysis?'
      ],
      sv: [
        'Vad växte fram som ingen strategisk plan kunde ha skapat?',
        'Hur kändes det att leda utan att vara experten?',
        'Överträffade gruppens intelligens din individuella briljans?',
        'Vilka nya möjligheter öppnades när du slutade försöka ha rätt?',
        'Kan du lita på emergens mer än du litar på din egen analys?'
      ]
    },
    timeframe: {
      en: 'One collaborative session',
      sv: 'En samarbetssession'
    }
  },
  {
    id: 'yellow-turquoise-deep-beliefs',
    transition: 'yellow-turquoise',
    fromStage: 'yellow',
    toStage: 'turquoise',
    difficulty: 'deep',
    context: 'beliefs',
    title: {
      en: 'Surrender systemic control',
      sv: 'Överge systemisk kontroll'
    },
    description: {
      en: 'Yellow masters complex systems thinking and strategic intervention. Turquoise surrenders to the wisdom of the whole, trusting that life knows better than any model. This challenge invites you to release your need to understand and manage reality.',
      sv: 'Gult bemästrar komplext systemtänkande och strategiska ingrepp. Turkos överlämnar sig till helhetens visdom, i tillit till att livet vet bättre än någon modell. Den här utmaningen bjuder in dig att släppa ditt behov av att förstå och hantera verkligheten.'
    },
    action: {
      en: 'Identify one complex system you\'ve been trying to understand or optimize (your organization, a relationship pattern, a social issue). For one month, stop analyzing it. Instead, practice: "I don\'t need to figure this out. The system knows what it\'s doing." Notice what emerges when you stop intervening.',
      sv: 'Identifiera ett komplext system du har försökt förstå eller optimera (din organisation, ett relationsmönster, en samhällsfråga). Under en månad, sluta analysera det. Öva istället på: "Jag behöver inte lista ut det här. Systemet vet vad det gör." Lägg märke till vad som växer fram när du slutar ingripa.'
    },
    reflectionPrompts: {
      en: [
        'What fears came up when you stopped trying to understand?',
        'Did the system self-organize in ways your models couldn\'t predict?',
        'What part of you resisted trusting the intelligence of life itself?',
        'Can you distinguish between wise action and controlling intervention?',
        'What emerged when you stopped being the smartest person in the room and became a humble participant?'
      ],
      sv: [
        'Vilka rädslor dök upp när du slutade försöka förstå?',
        'Organiserade systemet om sig på sätt som dina modeller inte kunde förutse?',
        'Vilken del av dig motsatte sig att lita på livets egen intelligens?',
        'Kan du skilja mellan klok handling och kontrollerande ingripande?',
        'Vad växte fram när du slutade vara den smartaste personen i rummet och blev en ödmjuk deltagare?'
      ]
    },
    timeframe: {
      en: 'One month of surrendered participation',
      sv: 'En månad av överlämnad deltagande'
    },
    warning: {
      en: 'This is advanced practice. Ensure you have stable Yellow capacity before attempting. The goal is not to abandon responsibility, but to discover a deeper intelligence than your own.',
      sv: 'Detta är avancerad övning. Se till att du har stabil Gul kapacitet innan du försöker. Målet är inte att överge ansvar, utan att upptäcka en djupare intelligens än din egen.'
    }
  },

  // TURQUOISE → CORAL Challenges
  {
    id: 'turquoise-coral-gentle-beliefs',
    transition: 'turquoise-coral',
    fromStage: 'turquoise',
    toStage: 'coral',
    difficulty: 'gentle',
    context: 'beliefs',
    title: {
      en: 'Reclaim your sacred "no"',
      sv: 'Återta ditt heliga "nej"'
    },
    description: {
      en: 'Turquoise emphasizes unity and interconnection, sometimes at the expense of individual boundaries. Coral reclaims sovereign power while maintaining holistic awareness. This challenge invites you to honor your limits as sacred.',
      sv: 'Turkos betonar enhet och sammankoppling, ibland på bekostnad av individuella gränser. Korall återtar suverän kraft samtidigt som den bibehåller holistisk medvetenhet. Den här utmaningen bjuder in dig att hedra dina gränser som heliga.'
    },
    action: {
      en: 'Identify one request or expectation you\'ve been accepting out of spiritual bypass or collective harmony. Say "no" clearly and without guilt. Notice that your boundary can actually serve the whole by modeling integrity.',
      sv: 'Identifiera en begäran eller förväntan du har accepterat på grund av "spiritual bypass" (andligt undvikande) eller kollektiv harmoni. Säg "nej" tydligt och utan skuld. Lägg märke till att din gräns faktiskt kan tjäna helheten genom att föregå med gott exempel på integritet.'
    },
    reflectionPrompts: {
      en: [
        'Did saying "no" feel selfish or liberating?',
        'Can boundaries be an act of love for the system?',
        'What happened when you honored your truth even if it disrupted harmony?',
        'Is authentic wholeness possible without individual sovereignty?'
      ],
      sv: [
        'Kändes det själviskt eller befriande att säga "nej"?',
        'Kan gränser vara en kärlekshandling gentemot systemet?',
        'Vad hände när du hedrade din sanning även om det störde harmonin?',
        'Är autentisk helhet möjlig utan individuell suveränitet?'
      ]
    },
    timeframe: {
      en: 'One clear boundary',
      sv: 'En tydlig gräns'
    }
  },
  {
    id: 'turquoise-coral-gentle-daily',
    transition: 'turquoise-coral',
    fromStage: 'turquoise',
    toStage: 'coral',
    difficulty: 'gentle',
    context: 'daily-life',
    title: {
      en: 'Embody your uniqueness',
      sv: 'Förkroppsliga din unikhet'
    },
    description: {
      en: 'Turquoise experiences cosmic unity. Coral brings that unity back into unique, embodied expression. This challenge invites your particular flavor of consciousness to shine through ordinary moments.',
      sv: 'Turkos upplever kosmisk enhet. Korall för tillbaka den enheten till unikt, förkroppsligat uttryck. Den här utmaningen bjuder in din särskilda smak av medvetande att lysa igenom vanliga ögonblick.'
    },
    action: {
      en: 'Choose one routine activity (walking, eating, working). Do it in a way that only you would do it - with your unique rhythm, style, or presence. Don\'t explain or justify your way. Just let your essence express itself.',
      sv: 'Välj en rutinmässig aktivitet (promenad, äta, arbeta). Gör det på ett sätt som bara du skulle göra det - med din unika rytm, stil eller närvaro. Förklara eller rättfärdiga inte ditt sätt. Låt bara din essens uttrycka sig själv.'
    },
    reflectionPrompts: {
      en: [
        'How did it feel to stop blending into universal flow?',
        'Did your uniqueness enhance or detract from the moment?',
        'Can cosmic consciousness and personal expression coexist?',
        'What wants to be expressed through you that no one else can express?'
      ],
      sv: [
        'Hur kändes det att sluta smälta in i universellt flöde?',
        'Förbättrade eller försämrade din unikhet ögonblicket?',
        'Kan kosmiskt medvetande och personligt uttryck samexistera?',
        'Vad vill uttryckas genom dig som ingen annan kan uttrycka?'
      ]
    },
    timeframe: {
      en: 'One day of embodied expression',
      sv: 'En dag av förkroppsligat uttryck'
    }
  },
  {
    id: 'turquoise-coral-active-community',
    transition: 'turquoise-coral',
    fromStage: 'turquoise',
    toStage: 'coral',
    difficulty: 'active',
    context: 'community',
    title: {
      en: 'Create from your unique essence',
      sv: 'Skapa från din unika essens'
    },
    description: {
      en: 'Coral consciousness brings bold, embodied action back into spirituality. This challenge asks you to create something that expresses your specific calling, not just universal oneness.',
      sv: 'Korall-medvetande för tillbaka djärvt, förkroppsligat handlande in i andligheten. Den här utmaningen ber dig att skapa något som uttrycker ditt specifika kall, inte bara universell enhet.'
    },
    action: {
      en: 'Create and share something that only you could make - art, writing, music, a project, a ritual. Don\'t ask for consensus or blend your voice. Let it be raw, particular, and yours. Offer it to the world without apology.',
      sv: 'Skapa och dela något som bara du kan göra - konst, text, musik, ett projekt, en ritual. Be inte om konsensus eller blanda ut din röst. Låt det vara rått, särpräglat och ditt. Erbjud det till världen utan ursäkt.'
    },
    reflectionPrompts: {
      en: [
        'How did it feel to create from your particular essence rather than universal principles?',
        'Did your uniqueness enhance or detract from your service to the whole?',
        'Can individual expression be an act of sacred participation?',
        'What emerged when you stopped trying to be "spiritual" and just were yourself?'
      ],
      sv: [
        'Hur kändes det att skapa från din särpräglade essens snarare än universella principer?',
        'Förbättrade eller försämrade din unikhet din tjänst till helheten?',
        'Kan individuella uttryck vara en handling av heligt deltagande?',
        'Vad växte fram när du slutade försöka vara "andlig" och bara var dig själv?'
      ]
    },
    timeframe: {
      en: 'Two weeks to create and share',
      sv: 'Två veckor att skapa och dela'
    }
  },
  {
    id: 'turquoise-coral-deep-daily',
    transition: 'turquoise-coral',
    fromStage: 'turquoise',
    toStage: 'coral',
    difficulty: 'deep',
    context: 'daily-life',
    title: {
      en: 'Dance with chaos',
      sv: 'Dansa med kaos'
    },
    description: {
      en: 'Turquoise seeks harmony and flow. Coral embraces disruption as creative force. This challenge invites you to meet chaos not as a problem to transcend, but as sacred energy to channel.',
      sv: 'Turkos söker harmoni och flöde. Korall omfamnar störningar som en kreativ kraft. Den här utmaningen bjuder in dig att möta kaos, inte som ett problem att transcendera, utan som en helig energi att kanalisera.'
    },
    action: {
      en: 'Choose one area of your life that feels stuck in spiritual bypass or excessive harmony. Deliberately introduce creative disruption - have the difficult conversation, break the pattern, shake the structure. Stay present with what emerges.',
      sv: 'Välj ett område i ditt liv som känns fast i andligt undvikande eller överdriven harmoni. Introducera medvetet kreativa störningar - ha det svåra samtalet, bryt mönstret, skaka om strukturen. Var närvarande i det som växer fram.'
    },
    reflectionPrompts: {
      en: [
        'Did the disruption destroy or regenerate?',
        'Could you stay grounded while allowing chaos?',
        'What wanted to be born that harmony was preventing?',
        'Can destruction be sacred when it serves evolution?',
        'Did you discover that you can be both mystic and warrior?'
      ],
      sv: [
        'Förstörde eller återskapade störningen?',
        'Kunde du förbli grundad samtidigt som du tillät kaos?',
        'Vad ville födas som harmonin förhindrade?',
        'Kan förstörelse vara helig när den tjänar evolutionen?',
        'Upptäckte du att du kan vara både mystiker och krigare?'
      ]
    },
    timeframe: {
      en: 'One cycle of disruption and integration',
      sv: 'En cykel av störning och integration'
    },
    warning: {
      en: 'This is advanced work. Only engage if you have stable Turquoise awareness and can hold both transcendence and embodiment.',
      sv: 'Detta är avancerat arbete. Engagera dig bara om du har en stabil Turkos medvetenhet och kan hålla både transcendens och förkroppsligande.'
    }
  },

  // CORAL → ULTRAVIOLET Challenges
  {
    id: 'coral-ultraviolet-gentle-daily',
    transition: 'coral-ultraviolet',
    fromStage: 'coral',
    toStage: 'ultraviolet',
    difficulty: 'gentle',
    context: 'daily-life',
    title: {
      en: 'Witness the witness',
      sv: 'Bevittna vittnet'
    },
    description: {
      en: 'Coral consciousness stands as a sovereign creator. Ultraviolet recognizes that even the creator is a temporary appearance in infinite awareness. This challenge invites you to notice the space in which your sovereignty arises.',
      sv: 'Korall-medvetande står som en suverän skapare. Ultraviolet inser att även skaparen är ett tillfälligt utseende i oändligt medvetande. Den här utmaningen bjuder in dig att lägga märke till rummet där din suveränitet uppstår.'
    },
    action: {
      en: 'For 10 minutes daily, sit quietly and notice: "Who is noticing my thoughts? Who is aware of this awareness?" Don\'t try to answer - just rest in the question. Let the seeker dissolve into the sought.',
      sv: 'Sitt tyst i 10 minuter dagligen och lägg märke till: "Vem är det som lägger märke till mina tankar? Vem är medveten om detta medvetande?" Försök inte svara - vila bara i frågan. Låt sökaren upplösas i det som söks.'
    },
    reflectionPrompts: {
      en: [
        'Can you find the boundary between you and awareness?',
        'What remains when you stop identifying as the creator?',
        'Does awareness have a center, or is it centerless?',
        'Can you be both the dance and the dancer disappears?'
      ],
      sv: [
        'Kan du hitta gränsen mellan dig och medvetandet?',
        'Vad återstår när du slutar identifiera dig som skaparen?',
        'Har medvetandet ett centrum, eller är det centrumlöst?',
        'Kan du vara både dansen och dansaren försvinner?'
      ]
    },
    timeframe: {
      en: '10 minutes daily for one week',
      sv: '10 minuter dagligen i en vecka'
    }
  },

  {
    id: 'coral-ultraviolet-active-creation',
    transition: 'coral-ultraviolet',
    fromStage: 'coral',
    toStage: 'ultraviolet',
    difficulty: 'active',
    context: 'work',
    title: {
      en: 'Create as emptiness',
      sv: 'Skapa som tomhet'
    },
    description: {
      en: 'Coral creates from unique essence. Ultraviolet creates as the emptiness through which creation flows. This challenge asks you to create while knowing yourself as the space, not the content.',
      sv: 'Korall skapar från unik essens. Ultraviolet skapar som tomheten genom vilken skapande flödar. Den här utmaningen ber dig att skapa samtidigt som du känner dig som rummet, inte innehållet.'
    },
    action: {
      en: 'Engage in a creative act (writing, art, problem-solving) while maintaining the awareness: "This is not me creating. Creation is happening through this emptiness." Notice how the quality of creation changes when the creator disappears.',
      sv: 'Delta i en kreativ handling (skrivande, konst, problemlösning) samtidigt som du behåller medvetenheten: "Det här är inte jag som skapar. Skapande händer genom denna tomhet." Lägg märke till hur kvaliteten på skapandet förändras när skaparen försvinner.'
    },
    reflectionPrompts: {
      en: [
        'Does creativity feel more effortless when you\'re not doing it?',
        'What happens to ownership of the creation?',
        'Can beauty arise more purely when no one claims it?',
        'Is the greatest art that which points back to the source?'
      ],
      sv: [
        'Känns kreativitet mer ansträngningslös när du inte gör den?',
        'Vad händer med ägandet av skapandet?',
        'Kan skönhet uppstå renare när ingen gör anspråk på den?',
        'Är den största konsten den som pekar tillbaka till källan?'
      ]
    },
    timeframe: {
      en: 'One creative session',
      sv: 'En kreativ session'
    }
  },

  {
    id: 'coral-ultraviolet-deep-surrender',
    transition: 'coral-ultraviolet',
    fromStage: 'coral',
    toStage: 'ultraviolet',
    difficulty: 'deep',
    context: 'beliefs',
    title: {
      en: 'Die before you die',
      sv: 'Dö innan du dör'
    },
    description: {
      en: 'This ultimate challenge invites the complete surrender of the separate self. Coral\'s sovereign "I" dissolves into ultraviolet\'s infinite "I AM." This is the final death of the seeker into the sought.',
      sv: 'Denna ultimata utmaning bjuder in till fullständig överlämnelse av det separata självet. Koralls suveräna "jag" upplöses i ultraviolets oändliga "JAG ÄR." Detta är sökarens slutliga död i det som söks.'
    },
    action: {
      en: 'Spend a weekend in retreat. Practice: "I am willing to disappear completely. I surrender everything I think I am." Don\'t seek experiences or insights. Simply offer your entire identity back to the source. Let whatever happens happen.',
      sv: 'Tillbringa en helg i retreat. Öva: "Jag är villig att försvinna helt. Jag överlämnar allt jag tror att jag är." Sök inte efter upplevelser eller insikter. Erbjud helt enkelt hela din identitet tillbaka till källan. Låt vad som än händer hända.'
    },
    reflectionPrompts: {
      en: [
        'What fears arose about complete self-surrender?',
        'Can you find any solid ground to stand on?',
        'What remains when the surrenderer surrenders?',
        'Is there any difference between you and the infinite?',
        'Can love exist when lover and beloved become one?'
      ],
      sv: [
        'Vilka rädslor uppstod om fullständig självöverlämnelse?',
        'Kan du hitta någon fast mark att stå på?',
        'Vad återstår när den som överlämnar sig överlämnar sig?',
        'Finns det någon skillnad mellan dig och det oändliga?',
        'Kan kärlek existera när älskaren och den älskade blir ett?'
      ]
    },
    timeframe: {
      en: 'One weekend retreat',
      sv: 'En helgs retreat'
    },
    warning: {
      en: 'This is the most profound challenge. Only attempt when you feel called beyond all seeking. The ego may fight desperately to survive. Have support available if needed.',
      sv: 'Detta är den djupaste utmaningen. Försök bara när du känner dig kallad bortom allt sökande. Egot kan kämpa desperat för att överleva. Ha stöd tillgängligt om det behövs.'
    }
  },

  // ULTRAVIOLET → CLEAR Challenges
  {
    id: 'ultraviolet-clear-gentle-being',
    transition: 'ultraviolet-clear',
    fromStage: 'ultraviolet',
    toStage: 'clear',
    difficulty: 'gentle',
    context: 'daily-life',
    title: {
      en: 'Rest as what is',
      sv: 'Vila som det som är'
    },
    description: {
      en: 'Ultraviolet is infinite consciousness. Clear is the suchness prior to consciousness itself. This challenge invites you to rest prior to the subject-object split.',
      sv: 'Ultraviolet är oändligt medvetande. Klart är sådanheten före medvetandet självt. Den här utmaningen bjuder in dig att vila före subjekt-objekt-splittringen.'
    },
    action: {
      en: 'Simply be. Don\'t meditate, don\'t practice, don\'t seek. When you notice yourself doing any spiritual practice, stop. Just be what you already are, without any movement toward or away.',
      sv: 'Var bara. meditera inte, öva inte, sök inte. När du märker att du gör någon andlig övning, sluta. Var bara det du redan är, utan någon rörelse mot eller bort.'
    },
    reflectionPrompts: {
      en: [
        'Can you stop seeking what you already are?',
        'What happens when all spiritual effort ceases?',
        'Is there anything to attain?',
        'Can you simply be, without being anything?'
      ],
      sv: [
        'Kan du sluta söka det du redan är?',
        'Vad händer när all andlig ansträngning upphör?',
        'Finns det något att uppnå?',
        'Kan du bara vara, utan att vara någonting?'
      ]
    },
    timeframe: {
      en: 'Timeless being',
      sv: 'Tidslöst varande'
    }
  },

  {
    id: 'ultraviolet-clear-active-expression',
    transition: 'ultraviolet-clear',
    fromStage: 'ultraviolet',
    toStage: 'clear',
    difficulty: 'active',
    context: 'work',
    title: {
      en: 'Function as no one',
      sv: 'Fungera som ingen'
    },
    description: {
      en: 'Ultraviolet consciousness functions through the apparent person. Clear is the functioning itself, without any operator. This challenge invites you to let life live itself.',
      sv: 'Ultraviolet medvetande fungerar genom den uppenbara personen. Klart är fungerandet självt, utan någon operatör. Den här utmaningen bjuder in dig att låta livet leva sig självt.'
    },
    action: {
      en: 'Go through your day without the sense of being the doer. When actions happen, notice: "Life is living itself." When thoughts arise, notice: "Thinking is happening." Remain as the space in which all phenomena come and go.',
      sv: 'Gå igenom din dag utan känslan av att vara den som handlar. När handlingar händer, lägg märke till: "Livet lever sig självt." När tankar uppstår, lägg märke till: "Tänkande händer." Förbli som rummet där alla fenomen kommer och går.'
    },
    reflectionPrompts: {
      en: [
        'Who breathes? Who walks? Who speaks?',
        'Can you find any entity that is acting?',
        'What remains when doing happens by itself?',
        'Is there any separation between you and the functioning?'
      ],
      sv: [
        'Vem andas? Vem går? Vem talar?',
        'Kan du hitta någon entitet som agerar?',
        'Vad återstår när görande händer av sig självt?',
        'Finns det någon separation mellan dig och fungerandet?'
      ]
    },
    timeframe: {
      en: 'One day of effortless functioning',
      sv: 'En dag av ansträngningslöst fungerande'
    }
  },

  {
    id: 'ultraviolet-clear-deep-suchness',
    transition: 'ultraviolet-clear',
    fromStage: 'ultraviolet',
    toStage: 'clear',
    difficulty: 'deep',
    context: 'beliefs',
    title: {
      en: 'Recognize the ordinary',
      sv: 'Känn igen det vanliga'
    },
    description: {
      en: 'The final challenge: to see that Clear is not some exalted state, but the ordinary suchness of this very moment. Nothing special, nothing to attain - just this, as it is.',
      sv: 'Den slutliga utmaningen: att se att Klart inte är något upphöjt tillstånd, utan den vanliga sådanheten i detta ögonblick. Inget speciellt, inget att uppnå - bara detta, som det är.'
    },
    action: {
      en: 'For one week, whenever you notice yourself seeking, striving, or trying to be more spiritual, remember: "This is it. There is nowhere to go, nothing to become." Let everything be exactly as it is, without improvement.',
      sv: 'Under en vecka, när du märker att du söker, strävar eller försöker vara mer andlig, kom ihåg: "Detta är det. Det finns ingenstans att gå, inget att bli." Låt allt vara exakt som det är, utan förbättring.'
    },
    reflectionPrompts: {
      en: [
        'Is enlightenment anything other than this ordinary moment?',
        'Can you stop trying to wake up from the dream?',
        'What if there never was any separation?',
        'Could it be that you were always home?',
        'Is the seeker the only thing hiding the sought?'
      ],
      sv: [
        'Är upplysning något annat än detta vanliga ögonblick?',
        'Kan du sluta försöka vakna från drömmen?',
        'Tänk om det aldrig fanns någon separation?',
        'Kan det vara så att du alltid varit hemma?',
        'Är sökaren det enda som döljer det som söks?'
      ]
    },
    timeframe: {
      en: 'One week of ordinary suchness',
      sv: 'En vecka av vanlig sådanhet'
    }
  },

  // CLEAR → BEYOND Challenges
  {
    id: 'clear-beyond-radical-ontology',
    transition: 'clear-beyond',
    fromStage: 'clear',
    toStage: 'beyond',
    difficulty: 'deep',
    context: 'beliefs',
    title: {
      en: 'Shatter your ontology',
      sv: 'Krossa din ontologi'
    },
    description: {
      en: 'All spiritual maps, including this one, are ultimately limitations. This challenge invites you to consciously break your understanding of reality itself and explore what cannot be mapped.',
      sv: 'Alla andliga kartor, inklusive denna, är i slutändan begränsningar. Den här utmaningen bjuder in dig att medvetet bryta din förståelse av verkligheten själv och utforska det som inte kan kartläggas.'
    },
    action: {
      en: 'For one month, deliberately entertain possibilities that violate your deepest metaphysical assumptions. What if consciousness isn\'t fundamental? What if reality is weirder than any model can capture? What if "enlightenment" is just another concept to be transcended?',
      sv: 'Under en månad, underhåll medvetet möjligheter som bryter mot dina djupaste metafysiska antaganden. Tänk om medvetande inte är fundamentalt? Tänk om verkligheten är konstigare än någon modell kan fånga? Tänk om "upplysning" bara är ett annat koncept att transcenderas?'
    },
    reflectionPrompts: {
      en: [
        'What happens when you stop trying to understand reality?',
        'Can you entertain possibilities that terrify your spiritual identity?',
        'What lies beyond the very concept of "beyond"?',
        'Is consciousness itself just another temporary appearance?',
        'What if the ultimate truth cannot be experienced or known?'
      ],
      sv: [
        'Vad händer när du slutar försöka förstå verkligheten?',
        'Kan du underhålla möjligheter som skrämmer din andliga identitet?',
        'Vad ligger bortom själva begreppet "bortom"?',
        'Är medvetandet självt bara ett annat tillfälligt utseende?',
        'Tänk om den ultimata sanningen inte kan upplevas eller kännas?'
      ]
    },
    timeframe: {
      en: 'One month of ontological destruction',
      sv: 'En månad av ontologisk förstörelse'
    },
    warning: {
      en: 'This can be profoundly disorienting. You are deliberately breaking your reality model. Have grounding practices and support available.',
      sv: 'Detta kan vara djupt desorienterande. Du bryter medvetet din verklighetsmodell. Ha grundande praktiker och stöd tillgängligt.'
    }
  },

  // BEYOND → INSANITY Challenges
  {
    id: 'beyond-insanity-gentle',
    transition: 'beyond-insanity',
    fromStage: 'beyond',
    toStage: 'insanity',
    difficulty: 'gentle',
    context: 'daily-life',
    title: {
      en: 'Dance with madness',
      sv: 'Dansa med galenskap'
    },
    description: {
      en: 'What society calls "insanity" might just be consciousness operating outside conventional reality tunnels. This challenge invites you to playfully explore the edges of consensus reality.',
      sv: 'Vad samhället kallar "galenskap" kan bara vara medvetande som fungerar utanför konventionella verklighetstunnlar. Den här utmaningen bjuder in dig att lekfullt utforska gränserna för konsensusverkligheten.'
    },
    action: {
      en: 'For one day, deliberately think thoughts that would be considered "crazy" by conventional standards. What if trees are conscious and we\'re just bad at listening? What if time runs backward when we\'re not looking? What if you\'re actually dreaming right now? Don\'t believe these thoughts - just play with them.',
      sv: 'Under en dag, tänk medvetet tankar som skulle anses "galna" enligt konventionella standarder. Tänk om träd är medvetna och vi bara är dåliga på att lyssna? Tänk om tiden går baklänges när vi inte tittar? Tänk om du faktiskt drömmer just nu? Tro inte på dessa tankar - bara leka med dem.'
    },
    reflectionPrompts: {
      en: [
        'Where is the line between spiritual insight and psychosis?',
        'Can you play with "crazy" ideas without losing grounding?',
        'What assumptions about reality feel most sacred to protect?',
        'Is consensus reality just the most popular delusion?'
      ],
      sv: [
        'Var går gränsen mellan andlig insikt och psykos?',
        'Kan du leka med "galna" idéer utan att förlora förankring?',
        'Vilka antaganden om verkligheten känns mest heliga att skydda?',
        'Är konsensusverkligheten bara den populäraste villan?'
      ]
    },
    timeframe: {
      en: 'One day of playful madness',
      sv: 'En dag av lekfull galenskap'
    }
  },

  // INSANITY → SUCHNESS Challenges
  {
    id: 'insanity-enlightenment-paradox',
    transition: 'insanity-enlightenment',
    fromStage: 'insanity', 
    toStage: 'suchness',
    difficulty: 'deep',
    context: 'beliefs',
    title: {
      en: 'Embrace the cosmic joke',
      sv: 'Omfamna det kosmiska skämtet'
    },
    description: {
      en: 'The final realization: that enlightenment and insanity are two sides of the same coin. The universe is simultaneously profoundly meaningful and completely absurd. Can you hold both?',
      sv: 'Den slutliga insikten: att upplysning och galenskap är två sidor av samma mynt. Universum är samtidigt djupt meningsfullt och helt absurt. Kan du hålla båda?'
    },
    action: {
      en: 'Spend a day oscillating between: (1) Seeing profound spiritual meaning in everything, and (2) Seeing complete absurdity and meaninglessness in everything. Notice they point to the same truth.',
      sv: 'Tillbringa en dag med att oscillera mellan: (1) Se djup andlig mening i allt, och (2) Se fullständig absurditet och meningslöshet i allt. Lägg märke till att de pekar på samma sanning.'
    },
    reflectionPrompts: {
      en: [
        'Is the universe serious or playful?',
        'Can ultimate truth be both profound and ridiculous?',
        'What if God has a sense of humor?',
        'Is enlightenment the ultimate punchline?'
      ],
      sv: [
        'Är universum allvarligt eller lekfullt?',
        'Kan ultimat sanning vara både djup och löjlig?',
        'Tänk om Gud har sinne för humor?',
        'Är upplysning den ultimata poängen?'
      ]
    }
  },

  // BEYOND → ALIEN Challenges
  {
    id: 'beyond-alien-consciousness',
    transition: 'beyond-alien',
    fromStage: 'beyond',
    toStage: 'alien',
    difficulty: 'deep',
    context: 'beliefs',
    title: {
      en: 'Invite the unimaginable',
      sv: 'Bjud in det ofattbara'
    },
    description: {
      en: 'What Leo calls "Alien consciousness" represents mind states that don\'t fit human categories. This challenge is an open invitation for consciousness to reveal aspects of itself that your mind cannot anticipate or understand.',
      sv: 'Det Leo kallar "Alien-medvetande" representerar medvetandetillstånd som inte passar in i mänskliga kategorier. Denna utmaning är en öppen inbjudan för medvetandet att avslöja aspekter av sig själv som ditt sinne inte kan förutse eller förstå.'
    },
    action: {
      en: 'In deep meditation, set the intention: "Show me what my mind cannot conceive. Reveal consciousness beyond my capacity to understand it." Then surrender completely. Don\'t try to make sense of what arises. Let it be alien, strange, incomprehensible.',
      sv: 'I djup meditation, sätt avsikten: "Visa mig vad mitt sinne inte kan föreställa sig. Avslöja medvetande bortom min kapacitet att förstå det." Överlämna dig sedan helt. Försök inte förstå vad som uppstår. Låt det vara främmande, konstigt, obegripligt.'
    },
    reflectionPrompts: {
      en: [
        'Can you allow experiences that make no sense?',
        'What happens when you stop trying to integrate revelations?',
        'Can consciousness be so alien it feels threatening to your humanity?',
        'What if some truths cannot be embodied by human biology?',
        'Is there value in experiences you cannot communicate or even remember clearly?'
      ],
      sv: [
        'Kan du tillåta upplevelser som inte går att förstå?',
        'Vad händer när du slutar försöka integrera uppenbarelser?',
        'Kan medvetande vara så främmande att det känns hotfullt för din mänsklighet?',
        'Tänk om vissa sanningar inte kan förkroppsligas av mänsklig biologi?',
        'Finns det värde i upplevelser du inte kan kommunicera eller ens minnas tydligt?'
      ]
    }
  },

  // ALIEN → VOID Challenges
  {
    id: 'beyond-all-challenges',
    transition: 'beyond-all',
    fromStage: 'alien',
    toStage: 'void',
    difficulty: 'deep',
    context: 'beliefs',
    title: {
      en: 'Transcend the seeker',
      sv: 'Transcendera sökaren'
    },
    description: {
      en: 'The ultimate challenge: to see that all challenges, including this one, are just more content in consciousness. The seeker is the only thing preventing the finding.',
      sv: 'Den ultimata utmaningen: att se att alla utmaningar, inklusive denna, bara är mer innehåll i medvetandet. Sökaren är det enda som förhindrar att man finner.'
    },
    action: {
      en: 'Stop doing spiritual practices. Stop seeking. Stop trying to grow or evolve. Notice that the impulse to transcend is itself what needs to be transcended. Rest as what you are, without any movement toward anything.',
      sv: 'Sluta utföra andliga övningar. Sluta söka. Sluta försöka växa eller utvecklas. Lägg märke till att impulsen att transcenderas i sig är det som behöver transcenderas. Vila som det du är, utan någon rörelse mot någonting.'
    },
    reflectionPrompts: {
      en: [
        'What if there is nothing to achieve?',
        'Can you stop the spiritual search completely?',
        'What remains when you give up all self-improvement?',
        'Is enlightenment just another concept to be dropped?',
        'Could it be that you were never broken to begin with?'
      ],
      sv: [
        'Tänk om det inte finns något att uppnå?',
        'Kan du stoppa den andliga sökandet helt?',
        'Vad återstår när du ger upp all självförbättring?',
        'Är upplysning bara ett annat koncept att släppa?',
        'Kan det vara så att du aldrig var trasig från början?'
      ]
    }
  }
];

// Helper functions for filtering challenges

export function getChallengesForTransition(
  fromStage: string, 
  toStage: string, 
  difficulty?: DifficultyLevel
): Challenge[] {
  return challenges.filter(c => {
    const matchesTransition = c.fromStage === fromStage && c.toStage === toStage;
    const matchesDifficulty = !difficulty || c.difficulty === difficulty;
    return matchesTransition && matchesDifficulty;
  });
}

export function getChallengesByContext(
  context: ChallengeContext,
  fromStage?: string
): Challenge[] {
  return challenges.filter(c => {
    const matchesContext = c.context === context;
    const matchesStage = !fromFtom || c.fromStage === fromStage;
    return matchesContext && matchesStage;
  });
}

export function getNextStageTransition(currentStage: string): string | null {
  const stageOrder = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise', 'coral', 'ultraviolet'];
  const currentIndex = stageOrder.indexOf(currentStage);
  
  if (currentIndex === -1 || currentIndex === stageOrder.length - 1) {
    return null;
  }
  
  return stageOrder[currentIndex + 1];
}

export function getRelevantChallenges(
  dominantStage: string,
  secondaryStage?: string
): Challenge[] {
  const nextStage = getNextStageTransition(dominantStage);
  
  if (!nextStage) {
    return [];
  }
  
  // Get challenges for the main transition
  const mainChallenges = getChallengesForTransition(dominantStage, nextStage);
  
  // If they have a strong secondary stage that's ahead, also include those
  if (secondaryStage && stageOrder.indexOf(secondaryStage) > stageOrder.indexOf(dominantStage)) {
    const secondaryChallenges = getChallengesForTransition(dominantStage, secondaryStage);
    return [...mainChallenges, ...secondaryChallenges];
  }
  
  return mainChallenges;
}

// For helper function
const stageOrder = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise', 'coral', 'ultraviolet'];
