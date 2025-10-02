<script lang="ts">
  import languageStore from '$lib/stores/languageStore';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  import SpiralAlignmentChart from '$lib/components/SpiralAlignmentChart.svelte';
  import CoevolutionScoreMeter from '$lib/components/CoevolutionScoreMeter.svelte';
  
  // Track active tradition
  let activeTradition = 'buddhism';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // Define translations
  const translations = {
    en: {
      title: "Spiritual Traditions on the Spiral",
      subtitle: "Discover how religious and spiritual paths map to different stages of consciousness evolution",
      intro: "Here is an insightful view of how this tradition maps to Spiral Dynamics stages:",
      dateDisclaimer: "This analysis views spiritual traditions through developmental psychology, focusing on consciousness structures rather than spiritual truth claims. It aims to create understanding across traditions, not to rank or judge them.",
      selectorLabel: "Choose a tradition",
      perspectives: "Perspective on the Spiral",
      figuresLabel: "Key Figures",
      teachings: "Core Teachings",
      embodiment: "Highest Evolution Path",
      modernContext: "Modern Context",
      spiralLabel: "🌀 Spiral View",
      moreDetailsLabel: "Toggle Details",
      overviewLabel: "Overview",
      closing: "Understanding how spiritual traditions relate to human development helps us appreciate their evolutionary role in consciousness—and recognize the wisdom across different paths.",
      synergyTitle: "🌀 Spiral Integration",
      synergyParagraphs: [
        "When we view spiritual traditions through the Spiral lens, we discover they aren't competing belief systems—they're complementary maps for human development.",
        "Each major tradition contains wisdom for multiple stages. Buddha's mindful deconstruction guides us from Red impulsivity to Yellow integration. Jesus uses Blue structure to point toward Green compassion and Turquoise unity. Muhammad established a stable Blue foundation with Yellow/Turquoise codes that Sufi mystics later unlocked.",
        "Hinduism contains perhaps the most explicit developmental map—from Purple tribal rituals through Blue social structure, Orange philosophical analysis, Green devotional practice, to non-dual Yellow/Turquoise realization.",
        "No single tradition captures the entire Spiral, but together they form a complete picture—the religious impulse evolving alongside human consciousness.",
        "The journey isn't about finding the 'best' tradition, but recognizing how each serves different developmental needs and contains seeds of higher understanding."
      ],
      traditions: {
        buddhism: "Buddhism",
        christianity: "Christianity",
        islam: "Islam & Sufism",
        hinduism: "Hinduism",
        daoism: "Daoism",
        newage: "New Age & Occultism",
        yoga: "Yoga"
      }
    },
    sv: {
      title: "Andliga traditioner på spiralen",
      subtitle: "Upptäck hur religiösa och andliga vägar motsvarar olika stadier i medvetandets utveckling",
      intro: "Här är en insiktsfull överblick över hur denna tradition motsvarar stadierna i Spiral Dynamics:",
      dateDisclaimer: "Denna analys betraktar andliga traditioner utifrån utvecklingspsykologi, med fokus på medvetandestrukturer snarare än andliga sanningsanspråk. Målet är att skapa förståelse över traditionsgränserna, inte att rangordna eller döma dem.",
      selectorLabel: "Välj en tradition",
      perspectives: "Perspektiv på spiralen",
      figuresLabel: "Nyckelpersoner",
      teachings: "Kärnläror",
      embodiment: "Högsta utvecklingsvägen",
      modernContext: "Modern kontext",
      spiralLabel: "🌀 Spiralvy",
      moreDetailsLabel: "Visa/dölj detaljer",
      overviewLabel: "Översikt",
      closing: "Att förstå hur andliga traditioner förhåller sig till mänsklig utveckling hjälper oss att uppskatta deras evolutionära roll för medvetandet – och att se visdomen i olika vägar.",
      synergyTitle: "🌀 Spiralintegration",
      synergyParagraphs: [
        "När vi betraktar andliga traditioner genom Spiralens lins upptäcker vi att de inte är konkurrerande trossystem – de är kompletterande kartor för mänsklig utveckling.",
        "Varje större tradition innehåller visdom för flera stadier. Buddhas medvetna dekonstruktion vägleder oss från Röd impulsivitet till Gul integration. Jesus använder Blå struktur för att peka mot Grön medkänsla och Turkos enhet. Muhammed etablerade en stabil Blå grund med Gula/Turkosa koder som sufiska mystiker senare låste upp.",
        "Hinduismen innehåller kanske den mest uttalade utvecklingskartan – från Lila stamritualer, via Blå social struktur, Orange filosofisk analys och Grön hängivenhetspraxis, till icke-dualistiskt Gult/Turkost förverkligande.",
        "Ingen enskild tradition fångar hela Spiralen, men tillsammans bildar de en komplett bild – den religiösa impulsen som utvecklas sida vid sida med det mänskliga medvetandet.",
        "Resan handlar inte om att hitta den 'bästa' traditionen, utan om att inse hur var och en tjänar olika utvecklingsbehov och innehåller frön till högre förståelse."
      ],
      traditions: {
        buddhism: "Buddhism",
        christianity: "Kristendom",
        islam: "Islam & sufism",
        hinduism: "Hinduism",
        daoism: "Daoism",
        newage: "New age & ockultism",
        yoga: "Yoga"
      }
    }
  };

  $: t = translations[$language];
  $: traditionLabels = t?.traditions ?? {
    buddhism: "Buddhism",
    christianity: "Christianity",
    islam: "Islam & Sufism",
    hinduism: "Hinduism",
    daoism: "Daoism",
    newage: "New Age & Occultism",
    yoga: "Yoga"
  };

  // Track if showing detailed view
  let showDetails = false;

  // Define links to additional resources
  const traditionLinks = {
    buddhism: 'https://en.wikipedia.org/wiki/Buddhism',
    christianity: 'https://en.wikipedia.org/wiki/Christianity',
    islam: 'https://en.wikipedia.org/wiki/Islam',
    hinduism: 'https://en.wikipedia.org/wiki/Hinduism',
    daoism: 'https://en.wikipedia.org/wiki/Taoism',
    newage: 'https://en.wikipedia.org/wiki/New_Age',
    yoga: 'https://en.wikipedia.org/wiki/Yoga'
  };

  // Detailed content for each tradition
const traditionBlurbs = {
    buddhism: {
      en: {
        quote: "The Buddha provides a precise, psychological path to deconstruct the egoic structures of the First Tier (Purple through Green) and awaken to the integrative, non-dual awareness of the Second Tier.",
        motto: "The end of suffering through the cessation of craving."
      },
      sv: {
        quote: "Buddha erbjuder en precis, psykologisk väg för att dekonstruera ego-strukturerna i den Första Vågen (Lila till och med Grön) och vakna upp till den integrerande, icke-dualistiska medvetenheten i den Andra Vågen.",
        motto: "Slutet på lidandet genom upphörandet av begär."
      }
    },
    christianity: {
      en: {
        quote: "Jesus used a 'Trojan Horse' strategy. He spoke the language of the Blue structure of his time to deliver a message that was fundamentally Green (radical love, inclusion) and ultimately Yellow/Turquoise (non-dual unity with the Divine).",
        motto: "The Kingdom of God is within you."
      },
      sv: {
        quote: "Jesus använde en 'trojansk häst'-strategi. Han talade språket från den Blå strukturen i sin samtid för att leverera ett budskap som i grunden var Grönt (radikal kärlek, inkludering) och slutligen Gult/Turkost (icke-dualistisk enhet med det Gudomliga).",
        motto: "Guds rike är inom er."
      }
    },
    islam: {
      en: {
        quote: "Muhammad established a durable Blue civilizational container with Yellow/Turquoise codes embedded in its core concepts, which were later unlocked by its mystical practitioners.",
        motto: "Unity in diversity, diversity in unity."
      },
      sv: {
        quote: "Muhammed etablerade en hållbar Blå civilisatorisk behållare med Gula/Turkosa koder inbäddade i dess kärnkoncept, vilka senare låstes upp av dess mystiska utövare.",
        motto: "Enhet i mångfald, mångfald i enhet."
      }
    },
    hinduism: {
      en: {
        quote: "Hinduism is unique because it's not a single, codified system but a vast, millennia-old ecosystem of spiritual development that explicitly maps onto the Spiral.",
        motto: "Tat Tvam Asi — Thou Art That."
      },
      sv: {
        quote: "Hinduismen är unik eftersom den inte är ett enskilt, kodifierat system utan ett enormt, årtusendegammalt ekosystem för andlig utveckling som uttryckligen kan mappas mot Spiralen.",
        motto: "Tat Tvam Asi — Du är Det."
      }
    },
    daoism: {
      en: {
        quote: "The Tao Te Ching is arguably one of the most concentrated expressions of YELLOW systemic thinking and TURQUOISE holistic being ever written.",
        motto: "The Tao that can be told is not the eternal Tao."
      },
      sv: {
        quote: "Tao Te Ching är utan tvekan ett av de mest koncentrerade uttrycken för GULT systemiskt tänkande och TURKOS holistisk existens som någonsin skrivits.",
        motto: "Den Tao som kan beskrivas är inte den eviga Tao."
      }
    },
    newage: {
      en: {
        quote: "The New Age/Occult is not a stage itself, but a territory where different stages play out. It's a spectrum from regressive Purple magic to profound Turquoise insights, with the most common resident being a Green seeker playing with Purple tools.",
        motto: "All paths lead to the same mountain."
      },
      sv: {
        quote: "New age/ockultism är inte ett stadium i sig, utan ett territorium där olika stadier utspelar sig. Det är ett spektrum från regressiv Lila magi till djupa Turkosa insikter, där den vanligaste invånaren är en Grön sökare som leker med Lila leksaker.",
        motto: "Alla vägar leder till samma berg."
      }
    },
    yoga: {
      en: {
        quote: "Yoga is not a single-stage practice. A person doing yoga for fitness (Orange/Beige) and a Jnana Yogi (Yellow) are both 'doing yoga,' but operating from different vMemes and accessing different depths of the system.",
        motto: "Union through multiple paths."
      },
      sv: {
        quote: "Yoga är inte en praktik för ett enskilt stadium. En person som utövar yoga för motion (Orange/Beige) och en Jnana Yogi (Gul) 'utövar yoga' båda två, men de verkar från olika vMemes och når olika djup i systemet.",
        motto: "Förening genom flera vägar."
      }
    }
  };

  // Details panels for each tradition
const traditionDetails = {
    buddhism: {
      en: {
        figures: "Buddha (Siddhārtha Gautama), Nagarjuna, Thich Nhat Hanh, Dalai Lama",
        teachings: "The Four Noble Truths, Eightfold Path, Three Marks of Existence, dependent origination, anatta (no-self), impermanence, emptiness, mindfulness, compassion",
        embodiment: "The Buddha's path leads from RED impulsivity and desire, through BLUE moral precepts, beyond ORANGE achievement, past GREEN relativism, to YELLOW systems understanding and TURQUOISE non-dual awareness. The culmination is direct realization of emptiness and interdependence—a Turquoise state of consciousness.",
        modernContext: "Contemporary Buddhism spans multiple stages: from Purple ritualistic practices in some traditional societies, through Blue orthodoxy, Orange rational Buddhism (mindfulness for optimization), Green social engagement, to Yellow/Turquoise integral approaches. Secular mindfulness often strips away Purple/Blue elements to focus on practical Orange benefits."
      },
      sv: {
        figures: "Buddha (Siddhārtha Gautama), Nagarjuna, Thich Nhat Hanh, Dalai Lama",
        teachings: "De Fyra Ädla Sanningarna, Den Åttafaldiga Vägen, Existensens Tre kännetecken, betingat samuppkomst, anatta (icke-själv), förgänglighet, tomhet, medveten närvaro, medkänsla",
        embodiment: "Buddhas väg leder från RÖD impulsivitet och begär, genom BLÅ moraliska föreskrifter, bortom ORANGE prestation, förbi GRÖN relativism, till GUL systemförståelse och TURKOS icke-dualistisk medvetenhet. Kulmen är ett direkt förverkligande av tomhet och ömsesidigt beroende – ett Turkost medvetandetillstånd.",
        modernContext: "Samtida buddhism spänner över flera stadier: från Lila ritualistiska praktiker i vissa traditionella samhällen, via Blå ortodoxi, Orange rationell buddhism (medveten närvaro för optimering), Grönt socialt engagemang, till Gula/Turkosa integrala förhållningssätt. Sekulär medveten närvaro skalar ofta bort Lila/Blå element för att fokusera på praktiska Orange fördelar."
      }
    },
    christianity: {
      en: {
        figures: "Jesus of Nazareth, Apostle Paul, St. Augustine, Martin Luther, Meister Eckhart, St. Teresa of Ávila",
        teachings: "Love of God and neighbor, the Kingdom of God, grace through faith, the Trinity, forgiveness, compassion, non-judgment, service to others, unity with Christ",
        embodiment: "Jesus spoke Blue language of law and morality but transcended it with Green compassion ('love your enemies') and pointed to Turquoise unity ('I and the Father are one'). He used parables to bridge worldviews and meet people where they were developmentally. Christian mystics like Meister Eckhart later articulated the non-dual Yellow/Turquoise core of Jesus's teachings.",
        modernContext: "Contemporary Christianity spans the spectrum: Purple folk Christianity with miracle emphasis, Red Prosperity Gospel, Blue fundamentalism/traditionalism, Orange mainline rationalism and pragmatism, Green progressive/liberation theology, and smaller Yellow/Turquoise contemplative/mystical expressions. The tension between these expressions drives much of current Christian dialogue and conflict."
      },
      sv: {
        figures: "Jesus från Nasaret, Aposteln Paulus, Augustinus, Martin Luther, Mäster Eckhart, Teresa av Ávila",
        teachings: "Kärleken till Gud och nästan, Guds rike, nåd genom tro, Treenigheten, förlåtelse, medkänsla, icke-dömande, tjänst för andra, enhet med Kristus",
        embodiment: "Jesus talade ett Blått språk präglat av lag och moral, men överskred det med Grön medkänsla ('älska era fiender') och pekade mot Turkos enhet ('Jag och Fadern är ett'). Han använde liknelser för att överbrygga världsbilder och möta människor där de befann sig i sin utveckling. Kristna mystiker som Mäster Eckhart formulerade senare den icke-dualistiska Gula/Turkosa kärnan i Jesus undervisning.",
        modernContext: "Samtida kristendom spänner över hela spektrumet: Lila folkkristendom med fokus på mirakel, Rött framgångsevangelium, Blå fundamentalism/traditionalism, Orange rationalism och pragmatism inom de stora samfunden, Grön progressiv/befrielseteologi, och mindre Gula/Turkosa kontemplativa/mystiska uttryck. Spänningen mellan dessa uttryck är en drivkraft i mycket av dagens kristna dialog och konflikt."
      }
    },
    islam: {
      en: {
        figures: "Muhammad, Ali ibn Abi Talib, Al-Ghazali, Ibn Arabi, Rumi, Hafez",
        teachings: "Tawhid (Divine Unity), submission to God, Five Pillars, compassionate community (Ummah), divine revelation, ethical living, remembrance of God, justice and mercy",
        embodiment: "Muhammad's mission elevated a Red/Purple tribal society to a Blue civilizational structure based on universal principles. Embedded within core Islamic concepts like Tawhid (Divine Unity) are Yellow/Turquoise potentials that Sufi mystics like Ibn Arabi and Rumi later developed into full non-dual awareness. The concept of Ihsan (excellence) points beyond Blue law (Sharia) and Green faith (Iman) toward direct experiential knowing.",
        modernContext: "Contemporary Islam spans multiple vMemes: Purple folk practices, Red power expressions, Blue traditionalism (most visible), Orange modernism, Green progressivism, and Yellow/Turquoise Sufi mysticism. The tension between rigid Blue fundamentalism and the recovery of Islam's own Yellow/Turquoise mystical heritage represents a key developmental challenge for the tradition."
      },
      sv: {
        figures: "Muhammed, Ali ibn Abi Talib, Al-Ghazali, Ibn Arabi, Rumi, Hafez",
        teachings: "Tawhid (Guds enhet), underkastelse inför Gud, De fem pelarna, medkännande gemenskap (Ummah), gudomlig uppenbarelse, etiskt liv, åminnelse av Gud, rättvisa och barmhärtighet",
        embodiment: "Muhammeds mission lyfte ett Rött/Lila stamsamhälle till en Blå civilisatorisk struktur baserad på universella principer. Inbäddat i centrala islamiska koncept som Tawhid (Guds enhet) finns Gula/Turkosa potentialer som sufiska mystiker som Ibn Arabi och Rumi senare utvecklade till full icke-dualistisk medvetenhet. Konceptet Ihsan (fullkomlighet) pekar bortom Blå lag (Sharia) och Grön tro (Iman) mot direkt erfarenhetsbaserad kunskap.",
        modernContext: "Samtida islam spänner över flera vMemes: Lila folkliga praktiker, Röda maktuttryck, Blå traditionalism (mest synlig), Orange modernism, Grön progressivism och Gul/Turkos sufisk mystik. Spänningen mellan rigid Blå fundamentalism och återupptäckten av islams eget Gula/Turkosa mystiska arv utgör en central utvecklingsutmaning för traditionen."
      }
    },
    hinduism: {
      en: {
        figures: "Krishna, Vyasa, Patanjali, Adi Shankara, Ramakrishna, Ramana Maharshi",
        teachings: "Vedic traditions, karmic law, dharma (duty/path), four aims of life, four stages of life, yoga systems, Upanishadic philosophy, Advaita Vedanta, devotional practices, meditation",
        embodiment: "Hinduism contains an explicit developmental sequence: Purple village deities and nature spirits, Red Vedic warrior gods, Blue caste system and social duties, Orange philosophical schools like Samkhya, Green devotional Bhakti yoga, and Yellow/Turquoise Advaita Vedanta non-dualism. This makes it perhaps the most complete developmental map within a single tradition, culminating in the Turquoise teaching 'Tat Tvam Asi' (Thou Art That).",
        modernContext: "Contemporary Hinduism spans the full spectrum, with significant Purple folk practices, Red power dynamics, Blue orthodoxy and ritual, Orange pragmatism, Green inclusive movements, and Yellow/Turquoise non-dual teachings. Modern teachers like Ramana Maharshi and Nisargadatta Maharaj have made the Yellow/Turquoise aspects more accessible to global audiences."
      },
      sv: {
        figures: "Krishna, Vyasa, Patanjali, Adi Shankara, Ramakrishna, Ramana Maharshi",
        teachings: "Vediska traditioner, karmas lag, dharma (plikt/väg), livets fyra mål, livets fyra stadier, yogasystem, upanishadisk filosofi, Advaita Vedanta, hängivna praktiker, meditation",
        embodiment: "Hinduismen innehåller en uttalad utvecklingssekvens: Lila by-gudar och naturandar, Röda vediska krigargudar, Blått kastsystem och sociala plikter, Orange filosofiska skolor som Samkhya, Grön hängiven Bhakti-yoga, och Gul/Turkos Advaita Vedanta-icke-dualism. Detta gör den till den kanske mest kompletta utvecklingskartan inom en enskild tradition, som kulminerar i den Turkosa läran 'Tat Tvam Asi' (Du är Det).",
        modernContext: "Samtida hinduism spänner över hela spektrumet, med betydande Lila folkliga praktiker, Röd maktdynamik, Blå ortodoxi och ritual, Orange pragmatism, Gröna inkluderande rörelser, och Gula/Turkosa icke-dualistiska läror. Moderna lärare som Ramana Maharshi och Nisargadatta Maharaj har gjort de Gula/Turkosa aspekterna mer tillgängliga för en global publik."
      }
    },
    daoism: {
      en: {
        figures: "Lao Tzu, Zhuangzi, Wang Bi, Sun Bu'er, Wei Boyang",
        teachings: "Wu-wei (non-action), naturalness, simplicity, spontaneity, balance, yin-yang polarity, immortality practices, alchemical transformation, virtue without artifice",
        embodiment: "Daoism begins by rejecting rigid Blue categorization ('The Tao that can be told is not the eternal Tao'). It embodies Yellow systems thinking with its emphasis on flow, natural patterns, and contextual wisdom. Its integration of polarities (yin-yang) reflects Turquoise holistic awareness. Unlike traditions that had to evolve through early stages, Daoism began at Yellow, making it one of the most naturally second-tier spiritual systems.",
        modernContext: "Contemporary Daoism exists as Purple-Blue folk religion with gods and rituals, Orange philosophical system (especially in Western appropriations), and Yellow-Turquoise wisdom tradition. Modern integrative applications include systems theory, complexity science, permaculture, and non-coercive leadership models that honor emergence and self-organization."
      },
      sv: {
        figures: "Lao Tzu, Zhuangzi, Wang Bi, Sun Bu'er, Wei Boyang",
        teachings: "Wu-wei (icke-handling), naturlighet, enkelhet, spontanitet, balans, yin-yang-polaritet, odödlighetspraktiker, alkemisk transformation, dygd utan konstladhet",
        embodiment: "Daoismen börjar med att avvisa rigid Blå kategorisering ('Den Tao som kan beskrivas är inte den eviga Tao'). Den förkroppsligar Gult systemtänkande med sin betoning på flöde, naturliga mönster och kontextuell visdom. Dess integration av polariteter (yin-yang) återspeglar Turkos holistisk medvetenhet. Till skillnad från traditioner som var tvungna att utvecklas genom tidiga stadier, började daoismen på Gult, vilket gör den till ett av de mest naturliga andliga systemen på den Andra Vågen.",
        modernContext: "Samtida daoism existerar som Lila-Blå folkreligion med gudar och ritualer, Orange filosofiskt system (särskilt i västerländska tolkningar), och Gul-Turkos visdomstradition. Moderna integrerande tillämpningar inkluderar systemteori, komplexitetsvetenskap, permakultur och icke-tvingande ledarskapsmodeller som respekterar emergens och självorganisering."
      }
    },
    newage: {
      en: {
        figures: "Helena Blavatsky, Carl Jung, Alan Watts, Deepak Chopra, Eckhart Tolle, Marianne Williamson",
        teachings: "Eclectic blend of Eastern and Western traditions, energy work, law of attraction, higher consciousness, channeling, holistic healing, psychic phenomena, astrology, human potential",
        embodiment: "New Age/Occult represents a fascinating developmental mix: Green values ('all paths are equal,' inclusivity, relativism) using Purple methods (crystals, rituals, energy work). The movement often bypasses or rejects healthy Orange skepticism and discipline, creating a Green-Purple blend. The highest expressions evolve into Yellow integral spirituality that can hold multiple systems without conflation, and occasionally glimpse Turquoise non-dual awareness.",
        modernContext: "Contemporary New Age spans from regressive Purple magical thinking to profound Turquoise insights. At its best, it serves as a developmental gateway for people leaving rigid Blue or materialistic Orange worldviews. At its worst, it becomes a 'mean green meme' spiritual culture dismissing critical thinking. Its Green-Purple fusion creates both creative possibilities and developmental pitfalls."
      },
      sv: {
        figures: "Helena Blavatsky, Carl Jung, Alan Watts, Deepak Chopra, Eckhart Tolle, Marianne Williamson",
        teachings: "Eklektisk blandning av östliga och västliga traditioner, energiarbete, lagen om attraktion, högre medvetande, kanalisering, holistiskt helande, psykiska fenomen, astrologi, mänsklig potential",
        embodiment: "New age/ockultism representerar en fascinerande utvecklingsmässig blandning: Gröna värderingar ('alla vägar är lika', inkludering, relativism) som använder Lila metoder (kristaller, ritualer, energiarbete). Rörelsen kringgår eller avvisar ofta sund Orange skepticism och disciplin, vilket skapar en Grön-Lila blandning. De högsta uttrycken utvecklas till Gul integral andlighet som kan rymma flera system utan att blanda ihop dem, och som ibland kan skymta Turkos icke-dualistisk medvetenhet.",
        modernContext: "Samtida new age spänner från regressivt Lila magiskt tänkande till djupa Turkosa insikter. I bästa fall fungerar det som en utvecklingsportal för människor som lämnar rigida Blå eller materialistiska Orange världsbilder. I värsta fall blir det en 'mean green meme' andlig kultur som avfärdar kritiskt tänkande. Dess Grön-Lila fusion skapar både kreativa möjligheter och utvecklingsmässiga fallgropar."
      }
    },
    yoga: {
      en: {
        figures: "Patanjali, Svatmarama, B.K.S. Iyengar, Paramahansa Yogananda, Krishnamacharya",
        teachings: "Eight limbs of yoga, asanas (postures), pranayama (breath control), meditation, ethical precepts, subtle body anatomy, kundalini, chakra system, samadhi (absorption)",
        embodiment: "Yoga is a complete developmental technology that meets practitioners at their level: Beige/Purple in body/energy practices, Red/Blue in discipline and ethics, Orange in subtle body mastery, Green in devotion, and Yellow/Turquoise in wisdom practices. Raja Yoga's Eight Limbs are a perfect developmental sequence from Blue ethics to Orange concentration to Green flowing meditation to Turquoise samadhi. Different paths (Bhakti, Jnana, Karma, Raja) offer entryways for different temperaments.",
        modernContext: "Contemporary yoga spans all levels: Purple energy practices, Red power yoga, Blue traditional lineages, Orange fitness and optimization, Green inclusive/accessible yoga, and Yellow/Turquoise integral approaches. Modern Western yoga often emphasizes physical postures (asana) while traditional systems include the full developmental spectrum. This creates tension between depth and accessibility."
      },
      sv: {
        figures: "Patanjali, Svatmarama, B.K.S. Iyengar, Paramahansa Yogananda, Krishnamacharya",
        teachings: "Yogans åtta grenar, asanas (kroppsställningar), pranayama (andningskontroll), meditation, etiska föreskrifter, subtil kroppsanatomi, kundalini, chakrasystemet, samadhi (försjunkenhet)",
        embodiment: "Yoga är en komplett utvecklingsteknologi som möter utövare på deras nivå: Beige/Lila i kropps- och energipraktiker, Röd/Blå i disciplin och etik, Orange i behärskning av den subtila kroppen, Grön i hängivenhet, och Gul/Turkos i visdomspraktiker. Raja Yogas åtta grenar är en perfekt utvecklingssekvens från Blå etik till Orange koncentration, vidare till Grön flödande meditation och till Turkos samadhi. Olika vägar (Bhakti, Jnana, Karma, Raja) erbjuder ingångar för olika temperament.",
        modernContext: "Samtida yoga spänner över alla nivåer: Lila energipraktiker, Röd power yoga, Blå traditionella linjer, Orange fitness och optimering, Grön inkluderande/tillgänglig yoga, och Gula/Turkosa integrala förhållningssätt. Modern västerländsk yoga betonar ofta fysiska ställningar (asana) medan traditionella system inkluderar hela utvecklingsspektrumet. Detta skapar en spänning mellan djup och tillgänglighet."
      }
    }
  };

  // Spiral views for each tradition
  const traditionViews = {
    buddhism: {
      en: {
        beige: "Buddhism acknowledges the basic survival needs of the human body but views attachment to mere survival as a source of suffering. The focus is on transcending Beige fears.",
        purple: "Early Buddhism incorporated some local deities and rituals to make teachings accessible, but the Buddha warned against magical thinking and superstition.",
        red: "The Buddha directly addressed RED impulses, teaching that uncontrolled desire, anger, and ego-assertion lead to suffering. The Five Precepts help contain destructive RED energy.",
        blue: "Buddhism uses BLUE structure (precepts, monastic rules, ethical frameworks) as containers for practice, but warns against attachment to rules as ends in themselves (the Raft Parable).",
        orange: "Buddhism critiques the ORANGE achievement-oriented self as fundamentally empty (anatta). Strategic mindfulness for personal gain is recognized as useful but limited.",
        green: "The Buddha taught compassion and interconnection but avoided GREEN's relativism with his clear claim that suffering exists and has a definite path to its cessation.",
        yellow: "Buddha's teaching of Dependent Origination is pure YELLOW systems thinking—a complex web of causal relationships rather than simple linear rules.",
        turquoise: "Nirvana and the realization of emptiness represent TURQUOISE consciousness—direct experience of the non-separation of all phenomena and the end of subject-object duality.",
        coral: "Some Mahayana concepts like Buddha-nature point toward CORAL potentials, but classical Buddhism generally culminates in TURQUOISE non-dual awareness.",
        ultraviolet: "Concepts like the Dharmakaya (Truth Body) in Mahayana Buddhism hint at ULTRAVIOLET transpersonal consciousness, though these are mostly metaphorical frameworks."
      },
      sv: {
        beige: "Buddhismen erkänner kroppens grundläggande överlevnadsbehov men ser fasthållande vid enbart överlevnad som en källa till lidande. Fokus ligger på att överskrida Beige rädslor.",
        purple: "Tidig buddhism införlivade vissa lokala gudomar och ritualer för att göra läran tillgänglig, men Buddha varnade för magiskt tänkande och vidskepelse.",
        red: "Buddha adresserade direkt RÖDA impulser och lärde ut att okontrollerat begär, ilska och självförhävdelse leder till lidande. De fem föreskrifterna hjälper till att tygla destruktiv RÖD energi.",
        blue: "Buddhismen använder BLÅ struktur (föreskrifter, klosterregler, etiska ramverk) som behållare för praktiken, men varnar för att fästa sig vid regler som mål i sig (liknelsen om flotten).",
        orange: "Buddhismen kritiserar det ORANGE prestationsinriktade självet som fundamentalt tomt (anatta). Strategisk medveten närvaro för personlig vinning erkänns som användbart men begränsat.",
        green: "Buddha lärde ut medkänsla och samhörighet men undvek GRÖN relativism med sitt tydliga påstående att lidande existerar och att det finns en bestämd väg för dess upphörande.",
        yellow: "Buddhas lära om betingat samuppkomst är rent GULT systemtänkande – ett komplext nätverk av orsakssamband snarare än enkla linjära regler.",
        turquoise: "Nirvana och förverkligandet av tomhet representerar TURKOST medvetande – en direkt upplevelse av alla fenomens icke-åtskillnad och slutet på dualiteten mellan subjekt och objekt.",
        coral: "Vissa Mahayana-koncept som Buddha-natur pekar mot KORALL-potentialer, men klassisk buddhism kulminerar generellt i TURKOS icke-dualistisk medvetenhet.",
        ultraviolet: "Koncept som Dharmakaya (Sanningskroppen) inom Mahayanabuddhismen antyder ULTRAVIOLETT transpersonligt medvetande, även om dessa mestadels är metaforiska ramverk."
      }
    },
    christianity: {
      en: {
        beige: "Jesus addressed basic human needs through healing and feeding ministries, demonstrating care for physical survival while pointing toward higher awareness.",
        purple: "Jesus respected but transcended tribal identity, replacing blood ties with spiritual family. He fulfilled Jewish tribal expectations while transforming them.",
        red: "Jesus confronted RED power structures and ego assertion, teaching 'the first shall be last'. His approach to power was not domination but transformative service.",
        blue: "Jesus operated within BLUE Jewish law while revealing its deeper purpose: 'Not to abolish but to fulfill the Law.' He challenged rigid applications when they violated human dignity.",
        orange: "Jesus questioned ORANGE achievement and accumulation: 'What does it profit a man to gain the whole world yet lose his soul?' He valued being over having.",
        green: "Jesus embodied GREEN compassion through radical inclusion, touching the 'unclean', eating with 'sinners', and teaching unconditional love that transcends in-group boundaries.",
        yellow: "Jesus's teaching that 'The Kingdom of God is within/among you' reflects YELLOW awareness—recognizing emergent divine reality rather than a distant future kingdom.",
        turquoise: "Jesus's statement 'I and the Father are One' expresses TURQUOISE non-duality—the ultimate dissolution of separation between individual and divine ground of being.",
        coral: "Concepts of the Body of Christ and Holy Spirit working through believers point toward CORAL consciousness, where individual uniqueness serves collective divine expression.",
        ultraviolet: "The mystical union of divine and human in Christ hints at ULTRAVIOLET potential—where consciousness becomes a vessel for cosmic creative unfolding beyond individual identity."
      },
      sv: {
        beige: "Jesus mötte grundläggande mänskliga behov genom helande och bespisning, och visade därmed omsorg om fysisk överlevnad samtidigt som han pekade mot ett högre medvetande.",
        purple: "Jesus respekterade men överskred stamidentitet och ersatte blodsband med en andlig familj. Han uppfyllde judiska stamförväntningar samtidigt som han omvandlade dem.",
        red: "Jesus konfronterade RÖDA maktstrukturer och självförhävdelse och lärde att 'de första ska bli de sista'. Hans förhållningssätt till makt var inte dominans utan transformerande tjänst.",
        blue: "Jesus verkade inom den BLÅ judiska lagen samtidigt som han avslöjade dess djupare syfte: 'Inte för att upphäva lagen utan för att uppfylla den.' Han utmanade rigida tillämpningar när de kränkte den mänskliga värdigheten.",
        orange: "Jesus ifrågasatte ORANGE prestation och ackumulation: 'Vad hjälper det en människa om hon vinner hela världen men förlorar sin själ?' Han värderade att vara framför att ha.",
        green: "Jesus förkroppsligade GRÖN medkänsla genom radikal inkludering, genom att röra vid de 'orena', äta med 'syndare' och lära ut en villkorslös kärlek som överskrider gruppgränser.",
        yellow: "Jesus undervisning om att 'Guds rike är inom/ibland er' återspeglar GUL medvetenhet – att se en framväxande gudomlig verklighet snarare än ett avlägset framtida rike.",
        turquoise: "Jesus uttalande 'Jag och Fadern är ett' uttrycker TURKOS icke-dualitet – det slutgiltiga upplösandet av separationen mellan individen och varats gudomliga grund.",
        coral: "Koncept som Kristi kropp och den Helige Andes verkan genom de troende pekar mot KORALL-medvetande, där individuell unikhet tjänar ett kollektivt gudomligt uttryck.",
        ultraviolet: "Den mystiska föreningen av det gudomliga och mänskliga i Kristus antyder ULTRAVIOLETT potential – där medvetandet blir ett kärl för kosmisk kreativ utveckling bortom individuell identitet."
      }
    },
    islam: {
      en: {
        beige: "Islam acknowledges basic survival needs through provisions for food, water, and rest. The faith permits normally forbidden actions when survival is threatened.",
        purple: "Muhammad elevated his society from tribal animism and blood feuds, replacing them with a universal community (Ummah) based on shared belief rather than bloodlines.",
        red: "Islam channels RED energy through regulated structures. It replaced tribal vengeance with divine justice, and provides ethical boundaries for power and strength.",
        blue: "The BLUE structure of Islam is its most visible aspect: the Five Pillars, Sharia law, and clear moral boundaries provide a stable civilizational framework.",
        orange: "Islamic civilization historically embraced ORANGE rationality and achievement during its Golden Age of science, medicine, and innovation.",
        green: "Islam's emphasis on compassion, charity, and the equality of all believers before God reflects GREEN values, especially in the concept of the Ummah as a spiritual family.",
        yellow: "The deeper meaning of Tawhid (Divine Unity) as understood by Sufi mystics contains YELLOW systemic understanding of reality as an interconnected whole.",
        turquoise: "Ibn Arabi's concept of Wahdat al-Wujud (Unity of Being) represents TURQUOISE consciousness—the realization that all existence is a manifestation of the One Divine Reality.",
        coral: "The concept of the Perfect Human (Insan al-Kamil) in Sufi philosophy points toward CORAL potential—the fully realized person as a complete mirror of divine attributes.",
        ultraviolet: "Some Sufi practices aim at complete annihilation of the separate self (fana) followed by subsistence in God (baqa), hinting at ULTRAVIOLET consciousness."
      },
      sv: {
        beige: "Islam erkänner grundläggande överlevnadsbehov genom bestämmelser för mat, vatten och vila. Tron tillåter normalt förbjudna handlingar när överlevnaden är hotad.",
        purple: "Muhammed lyfte sitt samhälle från stam-animism och blodshämnd och ersatte dem med en universell gemenskap (Ummah) baserad på gemensam tro istället för blodsband.",
        red: "Islam kanaliserar RÖD energi genom reglerade strukturer. Den ersatte stamhämnd med gudomlig rättvisa och sätter etiska gränser för makt och styrka.",
        blue: "Den BLÅ strukturen i islam är dess mest synliga aspekt: De fem pelarna, Sharia-lagen och tydliga moraliska gränser utgör ett stabilt civilisatoriskt ramverk.",
        orange: "Den islamiska civilisationen omfamnade historiskt ORANGE rationalitet och prestation under sin guldålder inom vetenskap, medicin och innovation.",
        green: "Islams betoning på medkänsla, välgörenhet och alla troendes jämlikhet inför Gud återspeglar GRÖNA värderingar, särskilt i konceptet Ummah som en andlig familj.",
        yellow: "Den djupare innebörden av Tawhid (Guds enhet), såsom den förstås av sufiska mystiker, innehåller GUL systemisk förståelse av verkligheten som en sammanlänkad helhet.",
        turquoise: "Ibn Arabis koncept Wahdat al-Wujud (Varats enhet) representerar TURKOST medvetande – insikten att all existens är en manifestation av den Enda Gudomliga Verkligheten.",
        coral: "Konceptet om den Fullkomliga Människan (Insan al-Kamil) i sufisk filosofi pekar mot KORALL-potential – den fullt förverkligade personen som en komplett spegel av gudomliga attribut.",
        ultraviolet: "Vissa sufiska praktiker syftar till fullständig utplåning av det separata självet (fana), följt av varande i Gud (baqa), vilket antyder ULTRAVIOLETT medvetande."
      }
    },
    hinduism: {
      en: {
        beige: "Hinduism recognizes basic survival needs in practices like proper diet (ahara), while teaching that clinging to mere physical survival creates suffering.",
        purple: "Hinduism embraces PURPLE consciousness through village deities, nature spirits, and tribal rituals that remain a living part of Hindu practice today.",
        red: "RED warrior energy is honored in deities like Indra and epics like the Mahabharata, while being channeled into spiritual discipline (tapas) and heroic service.",
        blue: "The BLUE structure of Hinduism appears in the caste system (varna), life stages (ashramas), and detailed ritual prescriptions that order society and individual life.",
        orange: "ORANGE analytical thinking emerges in philosophical schools like Samkhya and Nyaya that systematically analyze reality, consciousness, and valid means of knowledge.",
        green: "Bhakti Yoga represents GREEN consciousness through heart-centered devotion, emotional connection to the divine, and inclusive community worship.",
        yellow: "Advanced philosophical systems like Vedanta demonstrate YELLOW understanding through integration of multiple perspectives and recognition of contextual truth.",
        turquoise: "Advaita Vedanta culminates in TURQUOISE consciousness with its teaching of 'Tat Tvam Asi'—the non-dual realization that individual self (Atman) and ultimate reality (Brahman) are one.",
        coral: "Tantric traditions hint at CORAL consciousness through integrating individual uniqueness with cosmic creative power, particularly in the Shakti-focused traditions.",
        ultraviolet: "Concepts like turiya-atita (beyond the fourth state) point toward ULTRAVIOLET awareness—consciousness that transcends all categories including being and non-being."
      },
      sv: {
        beige: "Hinduismen erkänner grundläggande överlevnadsbehov i praktiker som korrekt kost (ahara), samtidigt som den lär ut att ett fasthållande vid enbart fysisk överlevnad skapar lidande.",
        purple: "Hinduismen omfamnar LILA medvetande genom by-gudar, naturandar och stamritualer som än idag är en levande del av hinduisk praktik.",
        red: "RÖD krigarenergi hedras i gudomar som Indra och epos som Mahabharata, samtidigt som den kanaliseras till andlig disciplin (tapas) och heroisk tjänst.",
        blue: "Den BLÅ strukturen i hinduismen syns i kastsystemet (varna), livsstadierna (ashramas) och detaljerade rituella föreskrifter som ordnar samhället och individens liv.",
        orange: "ORANGE analytiskt tänkande framträder i filosofiska skolor som Samkhya och Nyaya, vilka systematiskt analyserar verkligheten, medvetandet och giltiga kunskapsmedel.",
        green: "Bhakti Yoga representerar GRÖNT medvetande genom hjärtcentrerad hängivenhet, känslomässig koppling till det gudomliga och inkluderande gemensam tillbedjan.",
        yellow: "Avancerade filosofiska system som Vedanta visar på GUL förståelse genom integration av flera perspektiv och erkännande av kontextuell sanning.",
        turquoise: "Advaita Vedanta kulminerar i TURKOST medvetande med sin lära om 'Tat Tvam Asi' – det icke-dualistiska förverkligandet att det individuella självet (Atman) och den yttersta verkligheten (Brahman) är ett.",
        coral: "Tantriska traditioner antyder KORALL-medvetande genom att integrera individuell unikhet med kosmisk skaparkraft, särskilt i de Shakti-fokuserade traditionerna.",
        ultraviolet: "Koncept som turiya-atita (bortom det fjärde tillståndet) pekar mot ULTRAVIOLETT medvetenhet – ett medvetande som överskrider alla kategorier, inklusive vara och icke-vara."
      }
    },
    daoism: {
      en: {
        beige: "Daoism honors natural survival functions, seeing them not as base instincts to overcome but as expressions of the Dao working through the body.",
        purple: "Folk Daoism incorporates PURPLE elements like local deities and ancestral worship, while philosophical Daoism transcends magical thinking.",
        red: "Daoism neither suppresses nor glorifies RED power but suggests channeling it through non-action (wu-wei), letting strength flow naturally without force.",
        blue: "Daoism critiques rigid BLUE structures: 'The more prohibitions there are, the poorer the people will be.' It favors natural harmony over imposed order.",
        orange: "Daoism challenges ORANGE strategic thinking by valuing spontaneity and natural unfolding over calculated achievement and control.",
        green: "Daoism shares GREEN's emphasis on harmony and interconnection, but anchors it in natural systems rather than human consensus.",
        yellow: "Daoism is inherently YELLOW in its systems thinking, seeing reality as patterns of flow and change rather than fixed structures—'The Dao moves in cycles.'",
        turquoise: "The Daoist concept of uniting with the Dao represents TURQUOISE awareness—becoming one with the natural flow of the cosmos beyond separation.",
        coral: "Daoist alchemy hints at CORAL potential through its transformation of individual uniqueness into immortal essence while maintaining distinct personhood.",
        ultraviolet: "The 'uncarved block' (pu) symbolizes ULTRAVIOLET consciousness—returning to primordial potential prior to any differentiation or manifestation."
      },
      sv: {
        beige: "Daoismen hedrar naturliga överlevnadsfunktioner och ser dem inte som låga instinkter att övervinna, utan som uttryck för Dao som verkar genom kroppen.",
        purple: "Folk-daoismen införlivar LILA element som lokala gudomar och förfädersdyrkan, medan filosofisk daoism överskrider magiskt tänkande.",
        red: "Daoismen varken undertrycker eller glorifierar RÖD makt, utan föreslår att den kanaliseras genom icke-handling (wu-wei), så att styrka kan flöda naturligt utan tvång.",
        blue: "Daoismen kritiserar rigida BLÅ strukturer: 'Ju fler förbud det finns, desto fattigare blir folket.' Den föredrar naturlig harmoni framför påtvingad ordning.",
        orange: "Daoismen utmanar ORANGE strategiskt tänkande genom att värdera spontanitet och naturlig utveckling högre än beräknad prestation och kontroll.",
        green: "Daoismen delar GRÖN betoning på harmoni och samhörighet, men förankrar den i naturliga system snarare än i mänsklig konsensus.",
        yellow: "Daoismen är i sin natur GUL i sitt systemtänkande och ser verkligheten som mönster av flöde och förändring snarare än fasta strukturer – 'Dao rör sig i cykler.'",
        turquoise: "Det daoistiska konceptet att förenas med Dao representerar TURKOS medvetenhet – att bli ett med kosmos naturliga flöde bortom separation.",
        coral: "Daoistisk alkemi antyder KORALL-potential genom sin omvandling av individuell unikhet till odödlig essens, samtidigt som en distinkt personlighet bibehålls.",
        ultraviolet: "Det 'osnidade blocket' (pu) symboliserar ULTRAVIOLETT medvetande – en återgång till ursprunglig potential före all differentiering eller manifestation."
      }
    },
    newage: {
      en: {
        beige: "Some New Age practices like herbalism and natural healing address basic BEIGE survival needs, though often with a focus on energy rather than pure physicality.",
        purple: "New Age heavily incorporates PURPLE tools and technologies: crystals, rituals, ceremonial objects, astrological timing, and magical correspondences.",
        red: "RED energy appears in New Age empowerment teachings about manifesting desires and personal power, though usually with a GREEN relativistic framing.",
        blue: "Most New Age thinking explicitly rejects BLUE structures, preferring relativism over absolutes. However, many communities develop their own implicit dogmas and orthodoxies.",
        orange: "The New Age relationship with ORANGE is complex—rejecting scientific materialism while adopting marketing and self-improvement strategies for spiritual products and experiences.",
        green: "GREEN values form the core New Age worldview: relativism ('your truth'), inclusivity, harmony, emotions over logic, and non-hierarchical community.",
        yellow: "More mature New Age thinkers reach YELLOW awareness by integrating multiple systems without conflation and understanding the functional purpose of different spiritual technologies.",
        turquoise: "Some New Age teachers articulate genuine TURQUOISE insights about non-duality and universal consciousness, though these are often mixed with GREEN relativism.",
        coral: "Concepts of evolutionary spirituality and conscious evolution in the New Age movement hint at CORAL potential, though often without the necessary developmental foundations.",
        ultraviolet: "New Age discussions of 'Source consciousness' and return to primordial awareness point toward ULTRAVIOLET, though usually as concepts rather than direct realization."
      },
      sv: {
        beige: "Vissa new age-praktiker som örtmedicin och naturligt helande adresserar grundläggande BEIGE överlevnadsbehov, dock ofta med fokus på energi snarare än ren fysikalitet.",
        purple: "New age införlivar i hög grad LILA verktyg och teknologier: kristaller, ritualer, ceremoniella föremål, astrologisk timing och magiska korrespondenser.",
        red: "RÖD energi framträder i new age-läror om att manifestera sina begär och personlig kraft, dock vanligtvis inom en GRÖN relativistisk ram.",
        blue: "Det mesta av new age-tänkandet avvisar uttryckligen BLÅ strukturer och föredrar relativism framför absoluta sanningar. Många gemenskaper utvecklar dock sina egna implicita dogmer och ortodoxier.",
        orange: "New age-relationen till ORANGE är komplex – den avvisar vetenskaplig materialism samtidigt som den anammar marknadsförings- och självförbättringsstrategier för andliga produkter och upplevelser.",
        green: "GRÖNA värderingar utgör kärnan i new age-världsbilden: relativism ('din sanning'), inkludering, harmoni, känslor över logik och icke-hierarkiska gemenskaper.",
        yellow: "Mognare new age-tänkare når GUL medvetenhet genom att integrera flera system utan att blanda ihop dem och genom att förstå det funktionella syftet med olika andliga teknologier.",
        turquoise: "Vissa new age-lärare formulerar äkta TURKOSA insikter om icke-dualitet och universellt medvetande, även om dessa ofta blandas med GRÖN relativism.",
        coral: "Koncept om evolutionär andlighet och medveten evolution inom new age-rörelsen antyder KORALL-potential, dock ofta utan de nödvändiga utvecklingsmässiga grunderna.",
        ultraviolet: "New age-diskussioner om 'Källmedvetande' och återgång till ursprunglig medvetenhet pekar mot ULTRAVIOLETT, men vanligtvis som koncept snarare än direkt förverkligande."
      }
    },
    yoga: {
      en: {
        beige: "Yoga begins with the physical body (asana practice), addressing BEIGE needs for health, stability, and survival through embodied awareness.",
        purple: "The energetic aspects of yoga (pranayama, chakras, mantras) engage PURPLE awareness of invisible forces and ritualistic practices.",
        red: "Yoga harnesses RED impulses through tapas (disciplined effort), transforming raw power into directed willpower and spiritual fire.",
        blue: "The yamas and niyamas (ethical precepts) establish a BLUE framework of moral guidelines that create a stable container for practice.",
        orange: "ORANGE achievement orientation appears in strategic approaches to the subtle body, with systematic maps for mastering internal energies and states.",
        green: "Bhakti Yoga (the path of devotion) reflects GREEN relational consciousness through heart-centered practices and emotional connection.",
        yellow: "Jnana Yoga (the path of knowledge) embodies YELLOW systems thinking through discrimination between the real and unreal across multiple frameworks.",
        turquoise: "Advanced meditation culminates in TURQUOISE samadhi—complete absorption and non-dual awareness where the meditator and object of meditation become one.",
        coral: "Some Tantric practices point toward CORAL integration by honoring individual uniqueness while recognizing it as a vehicle for cosmic creative expression.",
        ultraviolet: "The concept of kaivalya (absolute freedom) hints at ULTRAVIOLET potential—consciousness that transcends all structures while containing their seeds."
      },
      sv: {
        beige: "Yoga börjar med den fysiska kroppen (asana-praktik) och adresserar BEIGE behov av hälsa, stabilitet och överlevnad genom förkroppsligad medvetenhet.",
        purple: "De energetiska aspekterna av yoga (pranayama, chakran, mantran) engagerar LILA medvetenhet om osynliga krafter och rituella praktiker.",
        red: "Yoga tämjer RÖDA impulser genom tapas (disciplinerad ansträngning) och omvandlar rå kraft till riktad viljestyrka och andlig eld.",
        blue: "Yamas och niyamas (etiska föreskrifter) etablerar ett BLÅTT ramverk av moraliska riktlinjer som skapar en stabil behållare för praktiken.",
        orange: "ORANGE prestationsinriktning syns i strategiska förhållningssätt till den subtila kroppen, med systematiska kartor för att bemästra inre energier och tillstånd.",
        green: "Bhakti Yoga (hängivenhetens väg) återspeglar GRÖNT relationellt medvetande genom hjärtcentrerade praktiker och känslomässig anslutning.",
        yellow: "Jnana Yoga (kunskapens väg) förkroppsligar GULT systemtänkande genom att skilja mellan det verkliga och det overkliga inom flera ramverk.",
        turquoise: "Avancerad meditation kulminerar i TURKOS samadhi – fullständig försjunkenhet och icke-dualistisk medvetenhet där meditatören och meditationsobjektet blir ett.",
        coral: "Vissa tantriska praktiker pekar mot KORALL-integration genom att hedra individuell unikhet samtidigt som den erkänns som ett redskap för kosmiskt kreativt uttryck.",
        ultraviolet: "Konceptet kaivalya (absolut frihet) antyder ULTRAVIOLETT potential – ett medvetande som överskrider alla strukturer samtidigt som det innehåller deras frön."
      }
    }
  };

  // Style colors per stage (same as your AI page)
  const stageColors = {
    beige: '#E5D0BA',
    purple: '#9B6B9E',
    red: '#E25A53',
    blue: '#4A72B2',
    orange: '#FF7F27',
    green: '#7AB55C',
    yellow: '#FFD700',
    turquoise: '#40E0D0',
    coral: '#FF6F61',
    ultraviolet: '#B388EB'
  };

  // Define which stages represent Spiralize's co-evolution values
  const spiralizeAlignedStages = ["green", "yellow", "turquoise", "coral", "ultraviolet"];

  // Calculate co-evolution score for each tradition
  // (These are approximations based on the tradition's highest development potential)
  const coevolutionScores = {
    buddhism: 8.4,      // Strong in Yellow/Turquoise/Coral
    christianity: 7.8,   // Strong in Green/Yellow/Turquoise
    islam: 7.6,          // Blue foundation with Yellow/Turquoise Sufi potential
    hinduism: 8.6,       // Complete developmental spectrum
    daoism: 9.0,         // Naturally Yellow/Turquoise from inception
    newage: 6.2,         // Green-dominant with Purple tools
    yoga: 8.8            // Complete developmental technology
  };
</script>

<svelte:head>
  <title>{t.title} | Spiralize</title>
  <meta name="description" content={t.subtitle}>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <div class="bg-gradient-to-br from-yellow-400 to-purple-500 rounded-2xl text-white text-center px-6 py-16 mb-8 shadow-md">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        {t.title}
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-yellow-100">
        {t.subtitle}
      </p>
    </div>

    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-blue-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-blue-700">
            {t.dateDisclaimer}
          </p>
        </div>
      </div>
    </div>

    {#if traditionLabels}
      <div class="mb-8 flex flex-wrap gap-2 justify-center">
        {#each Object.keys(traditionLabels) as key}
          <button
            class={`py-2 px-4 rounded-lg text-sm font-medium border transition-colors ${
              activeTradition === key
                ? 'bg-gradient-to-r text-white border-transparent' 
                : 'border-gray-200 text-gray-700 hover:text-black hover:border-gray-300 bg-white'
            }`}
            style={activeTradition === key ? `background-image: linear-gradient(to right, ${stageColors.yellow}, ${stageColors.purple});` : ''}
            on:click={() => activeTradition = key}
          >
            {traditionLabels[key]}
          </button>
        {/each}
      </div>
    {/if}

    <!-- Tradition Bio Card -->
    <div class="mb-8">
      <a 
        href={traditionLinks[activeTradition]} 
        target="_blank" 
        rel="noopener noreferrer"
        class="block rounded-xl border-l-4 p-6 bg-white shadow hover:shadow-md transition-all"
        style="border-color: {stageColors.purple}"
      >
        <div class="text-lg font-semibold mb-2 text-purple-700">
          {traditionLabels[activeTradition]}
        </div>
        <p class="text-gray-700 italic mb-2">"{traditionBlurbs[activeTradition][$language].quote}"</p>
        <p class="text-sm text-gray-500">{traditionBlurbs[activeTradition][$language].motto}</p>
      </a>
    </div>

    <CoevolutionScoreMeter
      score={coevolutionScores[activeTradition]}
      label={traditionLabels[activeTradition]}
    />
    <br>

    <p class="text-sm text-gray-600 text-center mt-4 mb-8 max-w-xl mx-auto">
      {#if $language === 'sv'}
        [SV] This score reflects how strongly this tradition expresses the later Spiral Dynamics stages (green and up)—those aligned with systems awareness, compassion, and co-evolution.
      {:else}
        This score reflects how strongly this tradition expresses the later Spiral Dynamics stages (green and up)—those aligned with systems awareness, compassion, and co-evolution.
      {/if}
    </p>

    <!-- Details Toggle -->
    <div class="flex justify-center mb-6">
      <button
        on:click={() => showDetails = !showDetails}
        class="px-5 py-2 rounded-lg font-medium text-sm shadow-md transition-colors bg-gradient-to-r from-yellow-500 to-purple-500 text-white"
      >
        {showDetails ? t.overviewLabel : t.moreDetailsLabel}
      </button>
    </div>

    <!-- Details Panel -->
    {#if showDetails}
      <div class="bg-white rounded-xl shadow-sm p-6 mb-10">
        <h2 class="text-2xl font-semibold mb-4 text-center">
          {traditionLabels[activeTradition]} - {t.perspectives}
        </h2>
        
        <div class="grid gap-4 md:grid-cols-2">
          {#each Object.entries(traditionViews[activeTradition]?.[$language]) as [stage, response]}
            <div class="p-4 rounded-lg border-l-4" style="border-color: {stageColors[stage]}">
              <div class="font-semibold text-lg capitalize" style="color: {stageColors[stage]}">
                {stage.charAt(0).toUpperCase() + stage.slice(1)}
              </div>
              <div class="text-sm text-gray-700 mt-1">
                {response}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div class="grid gap-6 mb-12">
        <!-- Tradition Details -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold mb-2 text-purple-800">{t.figuresLabel}</h2>
          <p class="text-gray-700 mb-4">{traditionDetails[activeTradition][$language].figures}</p>
          
          <h2 class="text-xl font-semibold mb-2 text-purple-800">{t.teachings}</h2>
          <p class="text-gray-700 mb-4">{traditionDetails[activeTradition][$language].teachings}</p>
          
          <h2 class="text-xl font-semibold mb-2 text-purple-800">{t.embodiment}</h2>
          <p class="text-gray-700 mb-4">{traditionDetails[activeTradition][$language].embodiment}</p>
          
          <h2 class="text-xl font-semibold mb-2 text-purple-800">{t.modernContext}</h2>
          <p class="text-gray-700">{traditionDetails[activeTradition][$language].modernContext}</p>
        </div>
      </div>
    {/if}

    <!-- Visual representation of where this tradition sits on the spiral -->
    <div class="mb-12">
      <h2 class="text-xl font-semibold text-center mb-6 text-purple-800">{traditionLabels[activeTradition]} {t.spiralLabel}</h2>
      
      <div class="bg-white p-6 rounded-xl shadow-sm">
        {#key activeTradition}
          <SpiralAlignmentChart 
            selectedEntities={[activeTradition]} 
            entityType="tradition"
          />
        {/key}
        <p class="text-sm text-gray-500 text-center mt-4">
          This visualization shows how {traditionLabels[activeTradition]} expresses different levels of the Spiral.
        </p>
      </div>
    </div>

    {#if $language === 'sv'}
      <div class="bg-gradient-to-br from-purple-100 via-yellow-50 to-white p-6 rounded-xl shadow-inner mb-12 border-l-4 border-purple-300">
        <h2 class="text-xl font-semibold mb-2 text-purple-800">{t.synergyTitle}</h2>
        {#each t.synergyParagraphs as paragraph}
          <p class="text-gray-700 mb-3">{paragraph}</p>
        {/each}
      </div>
    {:else}
      <div class="bg-gradient-to-br from-purple-100 via-yellow-50 to-white p-6 rounded-xl shadow-inner mb-12 border-l-4 border-purple-300">
        <h2 class="text-xl font-semibold mb-2 text-purple-800">{t.synergyTitle}</h2>
        {#each t.synergyParagraphs as paragraph}
          <p class="text-gray-700 mb-3">{paragraph}</p>
        {/each}
      </div>
    {/if}

    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl mb-12">
      <p class="text-gray-800">
        {t.closing}
      </p>
    </div>

    <ShareButtons />
  </div>
</div>

<style>
  /* Add any custom styles here */
</style>
