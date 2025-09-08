<!-- src/routes/insights/investing/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import languageStore from '$lib/stores/languageStore';
  import { stages } from '$lib/data/stages';
  import { base } from '$app/paths';

  const { language } = languageStore;

  let activeStage = writable('green');
  let selectedStage = 'green';

  // Translation keys for the investing page
  const translations = {
    en: {
      title: "Investing Through the Spiral",
      subtitle: "How developmental stages shape our relationship with capital and value creation",
      disclaimer: {
        title: "Important Notice",
        content: "This is an educational framework exploring how different value systems approach investing. It is NOT financial advice. All investments carry risk. Your personal financial situation and goals should be your primary guide. For specific investment decisions, consult qualified financial professionals."
      },
      takeQuiz: "Discover Your Stage",
      quizDescription: "Take our assessment to understand your developmental center of gravity",
      stageInflationWarning: {
        title: "Avoiding Stage Inflation",
        content: "Remember: identifying with higher stages without having genuinely developed through them can lead to poor financial decisions. Be honest about your actual center of gravity when applying these concepts."
      },
      stages: {
        beige: {
          title: "Survival Instinct",
          subtitle: "Before Investing - The Calculus of Survival",
          description: "At the most fundamental level, there is no 'economy' or 'investing.' There is only the instinctual drive to survive the next hour, the next day.",
          approach: "Energy In, Energy Out",
          keyQuestion: "What do I need right now to stay alive?",
          realWorldConnection: "Emergency preparedness, basic resource hoarding driven by survival anxiety",
          modernEcho: "Survival anxiety and scarcity mindset in modern humans - stuffing pantries well beyond necessity 'just in case'",
          note: "This describes pre-economic behavior, not any modern financial activity."
        },
        purple: {
          title: "Tribal Loyalist", 
          subtitle: "The Economics of Kinship and Magic",
          description: "This isn't 'investing' in stocks and bonds; it's about investing in the survival and prosperity of one's own people through ritual, loyalty, and shared belief.",
          approach: "Ritual and Reciprocity",
          keyQuestion: "Will this action please the ancestors and protect my family?",
          strategies: [
            "Nepotism & tribal favoritism - giving opportunities to kin and tribe members above all others",
            "Ritualistic 'investments' - allocating resources based on superstitious beliefs rather than analysis",
            "Gift economy & reciprocity - creating debts of reciprocity with magical expectations",
            "Deep mistrust of outsiders - keeping all value within the circle of trust"
          ],
          realWorldConnection: "Family businesses that only hire relatives, community lending circles (susu, hui) serving specific ethnic groups",
          note: "This describes a pre-modern, kinship-based system of exchange, not a viable strategy for modern financial markets."
        },
        red: {
          title: "Impulsive Opportunist",
          subtitle: "The 'Wolf of Wall Street' & Raw Opportunism", 
          description: "The market is a battlefield or casino. It's not for building wealth; it's for taking wealth from others. Capital is a weapon to be used for conquest and display.",
          approach: "Exploitation and Conquest",
          keyQuestion: "What can I grab right now to win, get rich, and show off?",
          strategies: [
            "Pump and dump schemes - inflating cheap stocks through misleading promotion",
            "YOLO trades - concentrating all capital on extremely high-risk bets for status",
            "Exploiting others - seeing market participants as 'marks' to be outsmarted",
            "Display of conquest - profits used for conspicuous consumption and status symbols"
          ],
          limitations: [
            "Complete lack of strategy - purely reactive and short-term",
            "Inevitable self-destruction through catastrophic financial ruin",
            "Burns all bridges through exploitation",
            "Often leads to legal prosecution for fraud and market manipulation"
          ],
          warning: "This describes predatory and high-risk behavior that carries extremely high risk of total financial loss and legal consequences."
        },
        blue: {
          title: "Rule-Based Investor",
          subtitle: "Investing with Order and Discipline",
          description: "The market is a test of discipline and virtue. It rewards those who follow proven rules and punishes those who are greedy or impulsive. Capital is a responsibility to be managed righteously.",
          approach: "Discipline and Conformity", 
          keyQuestion: "What is the correct, time-tested, and morally sound way to invest my money?",
          strategies: [
            "The primacy of 'The Plan' - strict adherence to pre-ordained investment plans (e.g., 60/40 portfolio)",
            "Deference to authority - trusting established banks, advisors, or investment gurus",
            "Virtue and punishment narrative - gains reward discipline, losses punish straying from the plan",
            "Focus on long-term stability - building wealth slowly and steadily over a lifetime"
          ],
          strengths: [
            "Discipline - protects from emotional, impulsive decisions",
            "Simplicity and clarity - reduces anxiety and decision fatigue", 
            "Promotes consistent saving habits",
            "Creates shared values within faith-based communities"
          ],
          limitations: [
            "Rigidity - inability to adapt to changing conditions",
            "Lacks adaptability to seize new opportunities",
            "Unquestioning authority can lead to poor outcomes if authority is wrong"
          ],
          realWorldConnection: "Target-date retirement funds, religious/values-based investment screens, traditional bank wealth management"
        },
        orange: {
          title: "Strategic Achiever",
          subtitle: "Mainstream Investing & The Drive for Success",
          description: "The market is a game to be mastered. The primary goal is to outperform - to beat the market, beat inflation, and beat other investors. Capital is a tool for strategic growth.",
          approach: "Analysis and Optimization",
          keyQuestion: "What is the optimal strategy to maximize my risk-adjusted returns?",
          strategies: [
            "Strategic analysis - fundamental and technical analysis to find undervalued assets",
            "Modern Portfolio Theory - mathematical optimization of returns for given risk levels",
            "Primacy of ROI - profit and shareholder value as supreme metrics",
            "Pragmatic opportunism - will invest anywhere if the numbers work"
          ],
          strengths: [
            "Effectiveness & innovation - drives unprecedented wealth creation",
            "Objectivity - clear, measurable goals free from emotion",
            "Sophistication - advanced tools for risk management and analysis",
            "Meritocracy - rewards competence and strategic thinking"
          ],
          limitations: [
            "Externalities blindness - brilliant at private costs/benefits, blind to social/environmental costs",
            "Short-termism - quarterly pressure sacrifices long-term investment",
            "Instrumental relationships - people and resources seen as tools for gain"
          ],
          realWorldConnection: "Mainstream finance, index funds based on performance, hedge funds using algorithms for absolute returns"
        },
        green: {
          title: "Ethically Conscious Investor", 
          subtitle: "Investing with Values",
          description: "The goal is to align one's capital with one's values to create a more fair, peaceful, and sustainable world. The primary question is whether a company is 'good' or 'bad' according to ethical standards.",
          approach: "Screening and Selection",
          keyQuestion: "Is this company good or bad? Does it harm people or the planet?",
          strategies: [
            "Negative screening - excluding harmful industries (fossil fuels, tobacco, weapons)",
            "Positive screening - selecting companies with strong ESG performance or B-Corp certification", 
            "ESG score reliance - using environmental, social, governance ratings to guide decisions",
            "Values alignment - ensuring investments match personal/community ethics"
          ],
          strengths: [
            "Accessibility - ESG funds widely available through most brokers",
            "Clarity - 'do no harm' principle is emotionally resonant and clear",
            "Market influence - forces corporate transparency and sustainability reporting",
            "Community - creates sense of values-aligned belonging"
          ],
          limitations: [
            "Binary thinking - oversimplified 'good vs bad' dichotomy",
            "Groupthink - ethics determined by group consensus, stifling dissent",
            "Focus on symptoms - avoiding 'bad' companies vs. investing in systemic solutions",
            "The 'brown' market - divested shares simply go to non-ethical investors"
          ],
          realWorldConnection: "ESG funds, SRI (Socially Responsible Investing), B-Corp investments, fossil fuel divestment movements"
        },
        yellow: {
          title: "Systemic Investor",
          subtitle: "Investing for Systemic Impact", 
          description: "Moves from ethics to effectiveness, asking: 'How does this company function within the larger system?' The goal is identifying leverage points where small interventions create widespread positive change.",
          approach: "Integration and Influence",
          keyQuestion: "What are the second and third-order consequences of this company's success? Does its business model solve root cause problems?",
          strategies: [
            "Systems-positive investing - seeking companies that provide systemic solutions even in 'bad' sectors",
            "Embrace of necessary paradox - comfortable holding contradictory positions for systemic function",
            "Shareholder engagement - using ownership to change companies from within rather than just divesting",
            "Focus on feedback loops - evaluating companies' capacity to learn, self-correct, and adapt"
          ],
          strengths: [
            "Pragmatism - focuses on what actually works to create change",
            "High leverage - targets root causes for multiplier effects",
            "Adaptability - flexible strategies as conditions change",
            "Resilience - comfort with paradox allows portfolio to weather different scenarios"
          ],
          limitations: [
            "Cognitive demand - requires significant research and systems knowledge",
            "Risk of systems arrogance - belief that one can accurately model complex systems",
            "Emotional detachment - cold functionality can overlook human suffering",
            "Complexity paralysis - can become too complex to execute effectively"
          ],
          realWorldConnection: "Impact investing, thematic ETFs (circular economy, water infrastructure), activist shareholder funds, systems-focused venture capital"
        },
        turquoise: {
          title: "Planetary Steward (Theoretical)",
          subtitle: "The Lens of Holistic Stewardship",
          description: "Capital is seen as circulating lifeblood of the planetary system. The goal is to align capital flows with the fundamental needs of the planetary ecosystem for long-term viability and flourishing.",
          approach: "Holistic Capital Allocation",
          keyQuestion: "What does the Earth need? How can capital nourish the entire system?",
          concepts: [
            "Planetary organs investing - allocating capital by systemic function (immune system, nervous system, metabolic system)",
            "Dissolution of ROI - primary returns measured in planetary health metrics rather than financial returns",
            "Capital as healing force - directing resources toward healing fractures in planetary systems"
          ],
          whyTheoretical: [
            "No existing infrastructure - current systems built on competition and profit, not planetary stewardship",
            "Collective action problem - requires global cooperation that doesn't currently exist",
            "Unclear mechanisms - compelling vision but no viable implementation strategy within current system"
          ],
          bridges: [
            "Concepts of Doughnut Economics and Circular Economy",
            "Movements for Rights of Nature and Wellbeing Economy", 
            "Large-scale philanthropic initiatives aimed at global systemic problems"
          ],
          purpose: "Serves as a compelling vision to critique current economic limitations and inspire future possibilities"
        },
        coral: {
          title: "Paradigm-Breaking Trickster (Speculative)",
          subtitle: "Investing as Performance Art",
          description: "Uses capital to playfully break current rules and reveal absurdities, unleashing new possibilities. The 'portfolio' becomes a series of interventions designed to provoke paradigm shifts.",
          approach: "Generative Chaos",
          keyQuestion: "How can we playfully break the rules to reveal absurdities and unleash new possibilities?",
          strategies: [
            "Absurdity hedge - shorting ESG to expose contradictions in 'ethics markets'",
            "Paradoxical mergers - forcing mergers of contradictory entities to create new possibilities",
            "Anti-company investing - funding projects designed to make their own industry obsolete",
            "Performance art IPOs - taking concepts public that shouldn't be companies to break assumptions"
          ],
          mindset: [
            "Motivation through revelation - joy of seeing paradigms shatter and new possibilities emerge",
            "Identity as vehicle - no ego attachment, only elegant intervention",
            "Money as ultimate joke - using shared fiction as paintbrush for paradigm-breaking art"
          ],
          purpose: "Thought experiment about using capital to subvert the concept of capital itself - designed to provoke thought about nature of value and ownership",
          warning: "Purely speculative - not meant for literal implementation but as metaphor for transcending system-building itself"
        },
        ultraviolet: {
          title: "Holographic Integrator (Speculative)",
          subtitle: "Beyond Capital - Conscious Co-Creation of Reality",
          description: "The concept of 'investing' dissolves entirely. Reality is understood as a conscious hologram where every action affects the whole. 'Capital' becomes conscious awareness itself, applied to influence probability fields underlying existence.",
          approach: "Conscious Co-Creation",
          keyQuestion: "What is the nature of the consciousness dreaming this reality into existence, and how do we consciously participate?",
          concepts: [
            "Transcending capital - the fundamental resource is conscious awareness itself",
            "Holographic principle - every action affects the entire system instantaneously through non-local connections", 
            "Time as medium - 'acting' across time to heal past traumas or seed future possibilities",
            "Ultimate integration - simultaneously embodying healthy aspects of all previous stages"
          ],
          whySpeculative: [
            "By definition unimaginable from current consciousness - any description is inevitably wrong",
            "Ultimate paradox - in total non-dual awareness, the need to intervene might dissolve entirely",
            "Uses Tier 1 and Tier 2 concepts to describe a theoretical Tier 3 reality"
          ],
          purpose: "Thought experiment to humble our current understanding and prevent spiritual arrogance - suggests there are always further horizons beyond our current paradigms",
          warning: "Philosophical speculation alert: This describes a potential future stage of consciousness with no current evidence. A conceptual exercise, not reality or an attainable goal."
        },
        clear: {
          title: "The Unmanifest (Pure Speculation)",
          subtitle: "Beyond All Form - The Silence From Which Everything Emerges",
          description: "Not a stage of human development, but the ground of being itself. All manifestation—the entire spiral, every value system, every thought—is seen as temporary appearances within vast, eternal awareness that is itself empty of characteristics.",
          approach: "Non-Abiding Action",
          keyQuestion: "There are no questions. Seeking ceases.",
          concepts: [
            "End of 'investment' - action happens spontaneously without an actor, like sky 'investing' in weather",
            "Perfect letting go - attachment to consciousness itself is released", 
            "Clean lens behavior - perfectly mirrors whatever stage is contextually appropriate without identification",
            "The final paradox - the seeker realizes they are what they were seeking"
          ],
          characteristics: [
            "Total freedom from even spiritual concerns and the need to develop",
            "Boundless compassion as natural state, not action", 
            "Complete transparency of self where experience happens without filter"
          ],
          ultimateLimitation: [
            "Ineffability - cannot be described as any description creates concepts",
            "End of development - realization you were never 'on' the spiral but the space it appears in",
            "Not a goal - pursuing Clear prevents its realization"
          ],
          purpose: "Points beyond the model itself - reminds us all maps, including Spiral Dynamics, are useful constructs within vast, unknowable reality",
          warning: "Metaphysical speculation alert: Not a stage of human development but a philosophical concept pointing to ultimate nature of reality. Ineffable and cannot be achieved or described."
        }
      },
      practicalTakeaways: {
        title: "Key Takeaways for Practical Application",
        items: [
          {
            title: "Most actionable development: Green → Yellow",
            description: "This transition from black-and-white ethics to nuanced systems thinking offers the most practical investment evolution for individuals."
          },
          {
            title: "Beware of stage inflation", 
            description: "It's easy to be fascinated by higher-stage concepts, but crucial to honestly assess your center of gravity. Making financial decisions from a hypothetical stage is risky."
          },
          {
            title: "Use as mirror, not map",
            description: "Ask yourself: What does my investment approach say about my values? What blind spots might I have? What would a more complex perspective reveal?"
          },
          {
            title: "The ultimate investment",
            description: "The best return may not be financial, but growth in your ability to understand and navigate complexity."
          }
        ]
      },
      furtherResources: {
        title: "Continue Your Journey",
        description: "Explore more aspects of developmental thinking:",
        links: [
          { text: "Take the Full Assessment", url: "/quiz" },
          { text: "Explore All Stages", url: "/spiral" },
          { text: "Global Perspectives", url: "/insights/global" },
          { text: "Conscious Governance", url: "/insights/governance" }
        ]
      },
      sectionHeaders: {
        approach: "Investment Approach",
        keyQuestion: "Key Question",
        realWorldConnection: "Real-World Connection",
        strategies: "Key Strategies", 
        strengths: "Strengths",
        limitations: "Limitations",
        concepts: "Key Concepts",
        whySpeculative: "Why Speculative",
        whyTheoretical: "Why Theoretical",
        bridges: "Current Bridges",
        purpose: "Educational Purpose",
        mindset: "Mindset",
        characteristics: "Characteristics",
        ultimateLimitation: "Ultimate Limitation",
        note: "Note",
        warning: "Warning"
      }
    },
    "sv": {
      "title": "Att investera genom spiralen",
      "subtitle": "Hur utvecklingsstadier formar vår relation till kapital och värdeskapande",
      "disclaimer": {
        "title": "Viktigt meddelande",
        "content": "Detta är ett pedagogiskt ramverk som utforskar hur olika värdesystem närmar sig investeringar. Det är INTE finansiell rådgivning. Alla investeringar medför risk. Din personliga ekonomiska situation och dina mål bör vara din primära vägledning. För specifika investeringsbeslut, konsultera kvalificerade finansiella rådgivare."
      },
      "takeQuiz": "Upptäck ditt stadium",
      "quizDescription": "Gör vår bedömning för att förstå din utvecklingsmässiga tyngdpunkt",
      "stageInflationWarning": {
        "title": "Undvik stadieinflation",
        "content": "Kom ihåg: att identifiera sig med högre stadier utan att genuint ha utvecklats genom dem kan leda till dåliga finansiella beslut. Var ärlig med din faktiska tyngdpunkt när du tillämpar dessa koncept."
      },
      "stages": {
        "beige": {
          "title": "Överlevnadsinstinkt",
          "subtitle": "Före investering - Överlevnadens kalkyl",
          "description": "På den mest grundläggande nivån finns det ingen 'ekonomi' eller 'investering'. Det finns bara den instinktiva driften att överleva nästa timme, nästa dag.",
          "approach": "Energi in, energi ut",
          "keyQuestion": "Vad behöver jag just nu för att överleva?",
          "realWorldConnection": "Nödberedskap, grundläggande resursbunkring driven av överlevnadsångest",
          "modernEcho": "Överlevnadsångest och knapphetstänkande hos moderna människor - att proppa skafferier långt bortom nödvändighet 'för säkerhets skull'",
          "note": "Detta beskriver ett för-ekonomiskt beteende, inte någon modern finansiell aktivitet."
        },
        "purple": {
          "title": "Stamlojalist",
          "subtitle": "Släktskapets och magins ekonomi",
          "description": "Detta är inte att 'investera' i aktier och obligationer; det handlar om att investera i sitt eget folks överlevnad och välstånd genom ritualer, lojalitet och delad tro.",
          "approach": "Ritual och ömsesidighet",
          "keyQuestion": "Kommer denna handling att behaga förfäderna och skydda min familj?",
          "strategies": [
            "Nepotism & stambaserad favorisering - att ge möjligheter till släktingar och stammedlemmar framför alla andra",
            "Rituella 'investeringar' - att allokera resurser baserat på vidskepliga övertygelser snarare än analys",
            "Gåvoekonomi & ömsesidighet - att skapa ömsesidiga skulder med magiska förväntningar",
            "Djup misstro mot utomstående - att hålla allt värde inom förtroendecirkeln"
          ],
          "realWorldConnection": "Familjeföretag som endast anställer släktingar, gemensamma lånecirklar (susu, hui) som tjänar specifika etniska grupper",
          "note": "Detta beskriver ett förmodernt, släktskapsbaserat utbytessystem, inte en hållbar strategi för moderna finansmarknader."
        },
        "red": {
          "title": "Impulsiv opportunist",
          "subtitle": "'Wolf of Wall Street' & Rå opportunism",
          "description": "Marknaden är ett slagfält eller ett kasino. Den är inte till för att bygga förmögenhet; den är till för att ta förmögenhet från andra. Kapital är ett vapen som ska användas för erövring och uppvisning.",
          "approach": "Exploatering och erövring",
          "keyQuestion": "Vad kan jag roffa åt mig just nu för att vinna, bli rik och visa upp mig?",
          "strategies": [
            "Pump-and-dump-upplägg - att blåsa upp billiga aktier genom vilseledande marknadsföring",
            "YOLO-affärer - att koncentrera allt kapital på extremt högrisksatsningar för status",
            "Utnyttja andra - att se marknadsdeltagare som 'offer' att överlista",
            "Uppvisning av erövring - vinster används för iögonfallande konsumtion och statussymboler"
          ],
          "limitations": [
            "Total brist på strategi - rent reaktivt och kortsiktigt",
            "Oundviklig självförstörelse genom katastrofal finansiell ruin",
            "Bränner alla broar genom exploatering",
            "Leder ofta till rättsliga åtal för bedrägeri och marknadsmanipulation"
          ],
          "warning": "Detta beskriver ett rovdjursliknande och högriskbeteende som medför extremt hög risk för total finansiell förlust och rättsliga konsekvenser."
        },
        "blue": {
          "title": "Regelbaserad investerare",
          "subtitle": "Att investera med ordning och disciplin",
          "description": "Marknaden är ett test av disciplin och dygd. Den belönar dem som följer beprövade regler och straffar dem som är giriga eller impulsiva. Kapital är ett ansvar som ska förvaltas rättfärdigt.",
          "approach": "Disciplin och konformitet",
          "keyQuestion": "Vad är det korrekta, beprövade och moraliskt sunda sättet att investera mina pengar?",
          "strategies": [
            "'Planens' överhöghet - strikt efterlevnad av förutbestämda investeringsplaner (t.ex. 60/40-portfölj)",
            "Hänvisning till auktoritet - att lita på etablerade banker, rådgivare eller investeringsguruer",
            "Narrativ om dygd och straff - vinster belönar disciplin, förluster straffar avvikelse från planen",
            "Fokus på långsiktig stabilitet - att bygga förmögenhet långsamt och stadigt över en livstid"
          ],
          "strengths": [
            "Disciplin - skyddar mot emotionella, impulsiva beslut",
            "Enkelhet och tydlighet - minskar ångest och beslutströtthet",
            "Främjar konsekventa sparvanor",
            "Skapar delade värderingar inom trosbaserade gemenskaper"
          ],
          "limitations": [
            "Stelhet - oförmåga att anpassa sig till förändrade förhållanden",
            "Saknar anpassningsförmåga för att gripa nya möjligheter",
            "Okritisk tilltro till auktoriteter kan leda till dåliga resultat om auktoriteten har fel"
          ],
          "realWorldConnection": "Måldatumsfonder för pension, religiösa/värdebaserade investeringsfilter, traditionell bankförmögenhetsförvaltning"
        },
        "orange": {
          "title": "Strategisk måluppnåsare",
          "subtitle": "Mainstream-investering & Drivkraften för framgång",
          "description": "Marknaden är ett spel att bemästra. Det primära målet är att överträffa - att slå marknaden, slå inflationen och slå andra investerare. Kapital är ett verktyg för strategisk tillväxt.",
          "approach": "Analys och optimering",
          "keyQuestion": "Vilken är den optimala strategin för att maximera min riskjusterade avkastning?",
          "strategies": [
            "Strategisk analys - fundamental och teknisk analys för att hitta undervärderade tillgångar",
            "Modern portföljteori - matematisk optimering av avkastning för givna risknivåer",
            "ROI:s överhöghet - vinst och aktieägarvärde som högsta mått",
            "Pragmatisk opportunism - investerar var som helst om siffrorna stämmer"
          ],
          "strengths": [
            "Effektivitet & innovation - driver oöverträffat förmögenhetsskapande",
            "Objektivitet - tydliga, mätbara mål fria från känslor",
            "Sofistikering - avancerade verktyg för riskhantering och analys",
            "Meritokrati - belönar kompetens och strategiskt tänkande"
          ],
          "limitations": [
            "Blindhet för externaliteter - briljant på privata kostnader/fördelar, blind för sociala/miljömässiga kostnader",
            "Kortsiktighet - kvartalstryck offrar långsiktiga investeringar",
            "Instrumentella relationer - människor och resurser ses som verktyg för vinst"
          ],
          "realWorldConnection": "Mainstream-finans, indexfonder baserade på prestanda, hedgefonder som använder algoritmer för absolut avkastning"
        },
        "green": {
          "title": "Etiskt medveten investerare",
          "subtitle": "Att investera med värderingar",
          "description": "Målet är att anpassa sitt kapital till sina värderingar för att skapa en mer rättvis, fredlig och hållbar värld. Den primära frågan är om ett företag är 'bra' eller 'dåligt' enligt etiska standarder.",
          "approach": "Filtrering och urval",
          "keyQuestion": "Är detta företag bra eller dåligt? Skadar det människor eller planeten?",
          "strategies": [
            "Negativ filtrering - att utesluta skadliga industrier (fossila bränslen, tobak, vapen)",
            "Positiv filtrering - att välja företag med stark ESG-prestanda eller B-Corp-certifiering",
            "Förlitan på ESG-poäng - att använda miljö-, sociala och styrningsbetyg för att vägleda beslut",
            "Värdeöverensstämmelse - att säkerställa att investeringar matchar personlig/gemenskapens etik"
          ],
          "strengths": [
            "Tillgänglighet - ESG-fonder är allmänt tillgängliga hos de flesta mäklare",
            "Tydlighet - 'gör ingen skada'-principen är emotionellt resonant och tydlig",
            "Marknadsinflytande - tvingar fram företagstransparens och hållbarhetsrapportering",
            "Gemenskap - skapar en känsla av värdebaserad tillhörighet"
          ],
          "limitations": [
            "Binärt tänkande - överförenklad 'bra vs dåligt'-dikotomi",
            "Grupptänkande - etik bestäms av gruppkonsensus, vilket kväver avvikande åsikter",
            "Fokus på symptom - att undvika 'dåliga' företag istället för att investera i systemiska lösningar",
            "Den 'bruna' marknaden - avyttrade aktier går helt enkelt till icke-etiska investerare"
          ],
          "realWorldConnection": "ESG-fonder, SRI (Socially Responsible Investing), B-Corp-investeringar, avyttringsrörelser från fossila bränslen"
        },
        "yellow": {
          "title": "Systemisk investerare",
          "subtitle": "Att investera för systemisk påverkan",
          "description": "Går från etik till effektivitet och frågar: 'Hur fungerar detta företag inom det större systemet?' Målet är att identifiera hävstångspunkter där små interventioner skapar utbredd positiv förändring.",
          "approach": "Integration och inflytande",
          "keyQuestion": "Vilka är de andra och tredje ordningens konsekvenser av detta företags framgång? Löser dess affärsmodell grundorsaksproblem?",
          "strategies": [
            "Systempositiv investering - söker företag som erbjuder systemiska lösningar även i 'dåliga' sektorer",
            "Omfamnande av nödvändig paradox - bekväm med att hålla motstridiga positioner för systemisk funktion",
            "Aktieägar-engagemang - att använda ägande för att förändra företag inifrån istället för att bara avyttra",
            "Fokus på återkopplingsloopar - utvärderar företags förmåga att lära, självkorrigera och anpassa sig"
          ],
          "strengths": [
            "Pragmatism - fokuserar på vad som faktiskt fungerar för att skapa förändring",
            "Hög hävstång - riktar in sig på grundorsaker för multiplikatoreffekter",
            "Anpassningsförmåga - flexibla strategier när förhållandena ändras",
            "Motståndskraft - bekvämlighet med paradoxer gör att portföljen klarar olika scenarier"
          ],
          "limitations": [
            "Kognitivt krävande - kräver betydande forskning och systemkunskap",
            "Risk för systemarrogans - tron att man exakt kan modellera komplexa system",
            "Emotionell distans - kall funktionalitet kan förbise mänskligt lidande",
            "Komplexitetsparalys - kan bli för komplext för att genomföras effektivt"
          ],
          "realWorldConnection": "Effektinvesteringar, tematiska ETF:er (cirkulär ekonomi, vatteninfrastruktur), aktivistiska aktieägarfonder, systemfokuserat riskkapital"
        },
        "turquoise": {
          "title": "Planetär förvaltare (Teoretisk)",
          "subtitle": "Holistiskt förvaltarskaps lins",
          "description": "Kapital ses som det planetära systemets cirkulerande livsblod. Målet är att anpassa kapitalflöden till det planetära ekosystemets grundläggande behov för långsiktig livskraft och blomstring.",
          "approach": "Holistisk kapitalallokering",
          "keyQuestion": "Vad behöver jorden? Hur kan kapital ge näring åt hela systemet?",
          "concepts": [
            "Investering i planetära organ - allokera kapital efter systemisk funktion (immunsystem, nervsystem, metaboliskt system)",
            "Upplösning av ROI - primär avkastning mäts i planetära hälsomått snarare än finansiell avkastning",
            "Kapital som en helande kraft - att rikta resurser mot att läka sprickor i planetära system"
          ],
          "whyTheoretical": [
            "Ingen befintlig infrastruktur - nuvarande system bygger på konkurrens och vinst, inte planetärt förvaltarskap",
            "Problem med kollektiv handling - kräver globalt samarbete som för närvarande inte existerar",
            "Oklara mekanismer - övertygande vision men ingen genomförbar implementeringsstrategi inom nuvarande system"
          ],
          "bridges": [
            "Koncept från Donutekonomi och cirkulär ekonomi",
            "Rörelser för Naturens Rättigheter och välfärdsekonomi",
            "Storskaliga filantropiska initiativ inriktade på globala systemproblem"
          ],
          "purpose": "Fungerar som en övertygande vision för att kritisera nuvarande ekonomiska begränsningar och inspirera framtida möjligheter"
        },
        "coral": {
          "title": "Paradigm-brytande trickster (Spekulativ)",
          "subtitle": "Investering som performancekonst",
          "description": "Använder kapital för att lekfullt bryta nuvarande regler och avslöja absurditeter, och därmed frigöra nya möjligheter. 'Portföljen' blir en serie interventioner utformade för att framkalla paradigmskiften.",
          "approach": "Generativt kaos",
          "keyQuestion": "Hur kan vi lekfullt bryta mot reglerna för att avslöja absurditeter och frigöra nya möjligheter?",
          "strategies": [
            "Absurditets-hedge - att blanka ESG för att exponera motsägelser i 'etikmarknader'",
            "Paradoxala fusioner - att tvinga fram sammanslagningar av motstridiga enheter för att skapa nya möjligheter",
            "Anti-företagsinvestering - att finansiera projekt utformade för att göra sin egen bransch förlegad",
            "Performancekonst-börsintroduktioner - att börsintroducera koncept som inte borde vara företag för att bryta antaganden"
          ],
          "mindset": [
            "Motivation genom uppenbarelse - glädjen i att se paradigm krossas och nya möjligheter uppstå",
            "Identitet som ett fordon - ingen ego-bindning, bara elegant intervention",
            "Pengar som det ultimata skämtet - att använda en delad fiktion som en pensel för paradigm-brytande konst"
          ],
          "purpose": "Tankeexperiment om att använda kapital för att undergräva själva begreppet kapital - utformat för att provocera tankar om naturen av värde och ägande",
          "warning": "Rent spekulativt - inte avsett för bokstavlig implementering utan som en metafor för att transcendera själva systembyggandet"
        },
        "ultraviolet": {
          "title": "Holografisk integratör (Spekulativ)",
          "subtitle": "Bortom kapital - Medvetet samskapande av verkligheten",
          "description": "Begreppet 'investering' upplöses helt. Verkligheten förstås som ett medvetet hologram där varje handling påverkar helheten. 'Kapital' blir själva den medvetna varseblivningen, som tillämpas för att påverka de sannolikhetsfält som ligger till grund för existensen.",
          "approach": "Medvetet samskapande",
          "keyQuestion": "Vad är naturen hos det medvetande som drömmer denna verklighet till existens, och hur deltar vi medvetet?",
          "concepts": [
            "Att transcendera kapital - den grundläggande resursen är själva den medvetna varseblivningen",
            "Holografisk princip - varje handling påverkar hela systemet omedelbart genom icke-lokala förbindelser",
            "Tid som medium - att 'agera' över tid för att läka tidigare trauman eller så frön till framtida möjligheter",
            "Yttersta integration - att samtidigt förkroppsliga hälsosamma aspekter av alla tidigare stadier"
          ],
          "whySpeculative": [
            "Per definition ofattbart från nuvarande medvetande - varje beskrivning är oundvikligen felaktig",
            "Yttersta paradoxen - i total icke-dual varseblivning kan behovet av att ingripa upplösas helt",
            "Använder Nivå 1- och Nivå 2-koncept för att beskriva en teoretisk Nivå 3-verklighet"
          ],
          "purpose": "Tankeexperiment för att ödmjuka vår nuvarande förståelse och förhindra andlig arrogans - antyder att det alltid finns ytterligare horisonter bortom våra nuvarande paradigm",
          "warning": "Varning för filosofisk spekulation: Detta beskriver ett potentiellt framtida medvetandestadium utan nuvarande bevis. En konceptuell övning, inte en verklighet eller ett uppnåeligt mål."
        },
       "clear": {
         "title": "Det Omanifesta (Ren spekulation)",
         "subtitle": "Bortom all form - Tystnaden ur vilken allt framträder",
         "description": "Inte ett stadium av mänsklig utveckling, utan varandets grund i sig. All manifestation – hela spiralen, varje värdesystem, varje tanke – ses som tillfälliga uppenbarelser inom en väldig, evig varseblivning som i sig själv är tom på egenskaper.",
         "approach": "Handling utan fäste",
         "keyQuestion": "Det finns inga frågor. Sökandet upphör.",
         "concepts": [
           "Slut på 'investering' - handling sker spontant utan en aktör, som när himlen 'investerar' i väder",
           "Perfekt släppande - bindningen till själva varseblivningen släpps",
           "Beteende som en ren lins - speglar perfekt vilket stadium som än är kontextuellt lämpligt utan identifikation",
           "Den slutgiltiga paradoxen - sökaren inser att de är det de sökte"
         ],
         "characteristics": [
           "Total frihet från även andliga angelägenheter och behovet av att utvecklas",
           "Gränslös medkänsla som ett naturligt tillstånd, inte en handling",
           "Fullständig transparens i jaget där upplevelser sker utan filter"
         ],
         "ultimateLimitation": [
           "Outsäglighet - kan inte beskrivas eftersom varje beskrivning skapar begrepp",
           "Slutet på utvecklingen - insikten att du aldrig var 'på' spiralen utan utrymmet den uppträder i",
           "Inte ett mål - att eftersträva 'Klar' förhindrar dess förverkligande"
         ],
         "purpose": "Pekar bortom själva modellen - påminner oss om att alla kartor, inklusive Spiral Dynamics, är användbara konstruktioner inom en väldig, okännbar verklighet",
         "warning": "Varning för metafysisk spekulation: Inte ett stadium av mänsklig utveckling utan ett filosofiskt koncept som pekar på verklighetens yttersta natur. Outsägligt och kan varken uppnås eller beskrivas."
       }
      },
      "practicalTakeaways": {
        "title": "Praktiska lärdomar för tillämpning",
        "items": [
          {
            "title": "Mest handlingskraftiga utvecklingen: Grön → Gul",
            "description": "Denna övergång från svartvit etik till nyanserat systemtänkande erbjuder den mest praktiska investeringsutvecklingen för individer."
          },
          {
            "title": "Akta dig för stadieinflation",
            "description": "Det är lätt att fascineras av koncept från högre stadier, men avgörande att ärligt bedöma din tyngdpunkt. Att fatta finansiella beslut från ett hypotetiskt stadium är riskabelt."
          },
          {
            "title": "Använd som en spegel, inte en karta",
            "description": "Fråga dig själv: Vad säger min investeringsstrategi om mina värderingar? Vilka blinda fläckar kan jag ha? Vad skulle ett mer komplext perspektiv avslöja?"
          },
          {
            "title": "Den ultimata investeringen",
            "description": "Den bästa avkastningen kanske inte är finansiell, utan tillväxt i din förmåga att förstå och navigera komplexitet."
          }
        ]
      },
      "furtherResources": {
        "title": "Fortsätt din resa",
        "description": "Utforska fler aspekter av utvecklingstänkande:",
        "links": [
          { "text": "Gör hela bedömningen", "url": "/quiz" },
          { "text": "Utforska alla stadier", "url": "/spiral" },
          { "text": "Globala perspektiv", "url": "/insights/global" },
          { "text": "Medveten styrning", "url": "/insights/governance" }
        ]
      },
      sectionHeaders: {
        approach: "Investeringsmetod",
        keyQuestion: "Nyckelfråga", 
        realWorldConnection: "Verkliga världen-koppling",
        strategies: "Nyckelstrategier",
        strengths: "Styrkor",
        limitations: "Begränsningar", 
        concepts: "Nyckelkoncept",
        whySpeculative: "Varför spekulativt",
        whyTheoretical: "Varför teoretiskt",
        bridges: "Nuvarande bryggor",
        purpose: "Utbildningssyfte",
        mindset: "Tänkesätt",
        characteristics: "Egenskaper",
        ultimateLimitation: "Ultimat begränsning",
        note: "Notera",
        warning: "Varning"
      }
    }
  };

  $: t = translations[$language];
  $: currentStage = selectedStage;

  function selectStage(stageId: string) {
    selectedStage = stageId;
  }

  function getStageColor(stageId: string): string {
    const stage = stages.find(s => s.id === stageId);
    return stage ? stage.hex : '#gray';
  }
</script>

<svelte:head>
  <title>{t.title} - Spiralize</title>
  <meta name="description" content={t.subtitle} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
  <div class="max-w-6xl mx-auto px-4 py-8">
    
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {t.title}
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        {t.subtitle}
      </p>
    </div>

    <!-- Disclaimer -->
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-lg">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-yellow-800">{t.disclaimer.title}</h3>
          <p class="mt-2 text-sm text-yellow-700">{t.disclaimer.content}</p>
        </div>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="grid md:grid-cols-2 gap-6 mb-12">
      <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{t.takeQuiz}</h3>
        <p class="text-gray-600 mb-4">{t.quizDescription}</p>
        <a href="{base}/quiz" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
          Take Assessment →
        </a>
      </div>
      
      <div class="bg-amber-50 rounded-lg shadow-lg p-6 border-l-4 border-amber-500">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{t.stageInflationWarning.title}</h3>
        <p class="text-gray-700 text-sm">{t.stageInflationWarning.content}</p>
      </div>
    </div>

    <!-- Stage Navigation -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Explore Investment Approaches by Stage</h2>
      <div class="flex flex-wrap gap-2 mb-6">
        {#each stages as stage (stage.id)}
          <button
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2"
            class:ring-2={selectedStage === stage.id}
            style="background-color: {selectedStage === stage.id ? stage.hex : 'transparent'}; 
                   border-color: {stage.hex}; 
                   color: {selectedStage === stage.id ? 'white' : stage.hex};"
            on:click={() => selectStage(stage.id)}
          >
            {stage.name[$language]} - {stage.association[$language]}
          </button>
        {/each}
      </div>
    </div>

    <!-- Stage Content -->
    <div class="bg-white rounded-lg shadow-lg mb-12">
      {#if t.stages[currentStage]}
        {@const stageData = t.stages[currentStage]}
        {@const stageInfo = stages.find(s => s.id === currentStage)}
        
        <div class="p-8">
          <!-- Stage Header -->
          <div class="border-l-4 pl-6 mb-8" style="border-color: {getStageColor(currentStage)}">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">{stageData.title}</h2>
            <h3 class="text-xl text-gray-600 mb-4">{stageData.subtitle}</h3>
            <p class="text-gray-700 leading-relaxed">{stageData.description}</p>
          </div>

          <!-- Key Information -->
          <div class="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-3">{t.sectionHeaders.approach}</h4>
              <p class="text-gray-700 font-medium mb-2">{stageData.approach}</p>
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-600 italic">{t.sectionHeaders.keyQuestion}:</p>
                <p class="text-gray-800 font-medium">"{stageData.keyQuestion}"</p>
              </div>
            </div>
            
            {#if stageData.realWorldConnection}
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-3">{t.sectionHeaders.realWorldConnection}</h4>
                <p class="text-gray-700">{stageData.realWorldConnection}</p>
              </div>
            {/if}
          </div>

          <!-- Strategies (if available) -->
          {#if stageData.strategies}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.strategies}</h4>
              <ul class="space-y-3">
                {#each stageData.strategies as strategy}
                  <li class="flex items-start">
                    <span class="text-2xl mr-3" style="color: {getStageColor(currentStage)}">•</span>
                    <span class="text-gray-700">{strategy}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Concepts (for theoretical stages) -->
          {#if stageData.concepts}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.concepts}</h4>
              <ul class="space-y-3">
                {#each stageData.concepts as concept}
                  <li class="flex items-start">
                    <span class="text-2xl mr-3" style="color: {getStageColor(currentStage)}">•</span>
                    <span class="text-gray-700">{concept}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Strengths and Limitations -->
          {#if stageData.strengths || stageData.limitations}
            <div class="grid md:grid-cols-2 gap-8 mb-8">
              {#if stageData.strengths}
                <div>
                  <h4 class="text-lg font-semibold text-green-800 mb-4">{t.sectionHeaders.strengths}</h4>
                  <ul class="space-y-2">
                    {#each stageData.strengths as strength}
                      <li class="flex items-start">
                        <span class="text-green-500 text-lg mr-2">✓</span>
                        <span class="text-gray-700 text-sm">{strength}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              {/if}
              
              {#if stageData.limitations}
                <div>
                  <h4 class="text-lg font-semibold text-red-800 mb-4">{t.sectionHeaders.limitations}</h4>
                  <ul class="space-y-2">
                    {#each stageData.limitations as limitation}
                      <li class="flex items-start">
                        <span class="text-red-500 text-lg mr-2">⚠</span>
                        <span class="text-gray-700 text-sm">{limitation}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              {/if}
            </div>
          {/if}

          <!-- Why Theoretical/Speculative -->
          {#if stageData.whyTheoretical}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.whyTheoretical}</h4>
              <ul class="space-y-2">
                {#each stageData.whyTheoretical as reason}
                  <li class="flex items-start">
                    <span class="text-blue-500 text-lg mr-2">•</span>
                    <span class="text-gray-700 text-sm">{reason}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          {#if stageData.whySpeculative}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.whySpeculative}</h4>
              <ul class="space-y-2">
                {#each stageData.whySpeculative as reason}
                  <li class="flex items-start">
                    <span class="text-blue-500 text-lg mr-2">•</span>
                    <span class="text-gray-700 text-sm">{reason}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Bridges (for Turquoise) -->
          {#if stageData.bridges}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.bridges}</h4>
              <ul class="space-y-2">
                {#each stageData.bridges as bridge}
                  <li class="flex items-start">
                    <span class="text-teal-500 text-lg mr-2">🌉</span>
                    <span class="text-gray-700 text-sm">{bridge}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Mindset (for Coral) -->
          {#if stageData.mindset}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.mindset}</h4>
              <ul class="space-y-2">
                {#each stageData.mindset as item}
                  <li class="flex items-start">
                    <span class="text-2xl mr-3" style="color: {getStageColor(currentStage)}">•</span>
                    <span class="text-gray-700 text-sm">{item}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Characteristics (for ultra-violet/clear) -->
          {#if stageData.characteristics}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.characteristics}</h4>
              <ul class="space-y-2">
                {#each stageData.characteristics as characteristic}
                  <li class="flex items-start">
                    <span class="text-2xl mr-3" style="color: {getStageColor(currentStage)}">•</span>
                    <span class="text-gray-700 text-sm">{characteristic}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Ultimate Limitation (for clear) -->
          {#if stageData.ultimateLimitation}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.ultimateLimitation}</h4>
              <ul class="space-y-2">
                {#each stageData.ultimateLimitation as limitation}
                  <li class="flex items-start">
                    <span class="text-red-500 text-lg mr-2">⚠</span>
                    <span class="text-gray-700 text-sm">{limitation}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Purpose -->
          {#if stageData.purpose}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-indigo-800 mb-3">{t.sectionHeaders.purpose}</h4>
              <p class="text-gray-700 text-sm">{stageData.purpose}</p>
            </div>
          {/if}

          <!-- Special Notes/Warnings -->
          {#if stageData.note || stageData.warning}
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p class="text-sm text-blue-800">
                <span class="font-medium">{stageData.note ? t.sectionHeaders.note : t.sectionHeaders.warning}:</span> 
                {stageData.note || stageData.warning}
              </p>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Practical Takeaways -->
    <div class="bg-indigo-50 rounded-lg shadow-lg p-8 mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">{t.practicalTakeaways.title}</h2>
      <div class="grid md:grid-cols-2 gap-6">
        {#each t.practicalTakeaways.items as item}
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p class="text-gray-700 text-sm">{item.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Further Resources -->
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">{t.furtherResources.title}</h2>
      <p class="text-gray-600 mb-6">{t.furtherResources.description}</p>
      <div class="flex flex-wrap justify-center gap-4">
        {#each t.furtherResources.links as link}
          <a 
            href="{base}{link.url}" 
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            {link.text}
          </a>
        {/each}
      </div>
    </div>

  </div>
</div>
