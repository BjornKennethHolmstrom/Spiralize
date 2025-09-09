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
          subtitle: "Unconstrained Maximization - Pure Power and Immediate Gratification",
          description: "The world is a zero-sum jungle where 'might makes right.' Red represents the simplest, most brutal optimization: maximizing personal power and pleasure with minimal constraints. This is predatory behavior that destroys trust, relationships, and ultimately leads to self-destruction.",
          approach: "Unconstrained Maximization (No Ethical or Strategic Limits)",
          keyQuestion: "What can I grab right now to win, dominate, and feel good?",
          optimizationFunction: "Maximize f(My Power, My Pleasure) subject to only fear of immediate consequences",
          strategies: [
            "Predatory opportunism - exploiting any weakness or advantage for immediate gain",
            "Pump and dump schemes - manipulating markets through deception and hype",
            "YOLO trading - concentrating everything on high-risk bets for thrill and status",
            "Hostile exploitation - treating all market participants as prey to be conquered"
          ],
          strengths: [
            "Decisive action - no hesitation or analysis paralysis when opportunities arise",
            "Breaking through barriers - willingness to challenge established power structures",
            "Raw energy - provides the ego-strength that later stages can channel productively",
            "Immediate results - can achieve rapid gains in the short term"
          ],
          limitations: [
            "Inevitable self-destruction - unsustainable behavior leads to catastrophic losses",
            "Complete lack of strategy - purely reactive with no long-term planning capacity",
            "Destroys all relationships - burns bridges through exploitation and betrayal",
            "Legal and ethical violations - frequently crosses into fraud and market manipulation"
          ],
          developmentalEvolution: [
            "Red's boldness + Blue's rules = disciplined entrepreneurship",
            "Red's risk-appetite + Orange's strategy = breakthrough innovation", 
            "Red's power-drive + Green's values = social entrepreneurship",
            "Red's energy properly channeled becomes the fuel for higher-stage achievements"
          ],
          keyInsight: "Red is the essential ego-emergence that breaks free from tribal constraints, but it must evolve quickly. The raw power-drive becomes the foundation for Blue's discipline and Orange's strategic achievement when properly developed.",
          developmentalRole: "Represents the crucial emergence of individual will and self-assertion, but this energy must be channeled through rules (Blue) and strategy (Orange) to become constructive rather than destructive.",
          realWorldConnection: "Pump-and-dump schemes, insider trading, predatory lending, hostile takeovers driven by conquest rather than strategy, casino-style day trading",
          criticalWarning: "This behavior pattern is inherently destructive and often illegal. It represents a developmental stage to be transcended, not emulated. Understanding Red helps recognize and avoid these patterns in oneself and others."
        },
        blue: {
          title: "Rule-Based Investor",
          subtitle: "Constrained Maximization - Righteousness Within Sacred Rules",
          description: "The world is governed by absolute Truth and hierarchical order. There is one 'Right Way' to invest, handed down by authority. Blue seeks to maximize righteousness and moral purity within non-negotiable sacred constraints, believing that righteous conduct will lead to deserved prosperity.",
          approach: "Constrained Maximization (Optimization within Sacred Framework)",
          keyQuestion: "What does the rulebook (scripture, tradition, authority) say is the right way to handle money?",
          optimizationFunction: "Maximize f(Righteousness, Order) subject to Sacred Rules = ABSOLUTE",
          strategies: [
            "The primacy of 'The Plan' - strict adherence to pre-ordained investment plans without deviation",
            "Deference to authority - trusting established banks, advisors, or religious financial guidance",
            "Sacred constraint compliance - avoiding investments that violate religious/moral law (sin stocks, interest)",
            "Focus on long-term stability - building wealth slowly through disciplined, rule-following behavior"
          ],
          strengths: [
            "Unwavering discipline - protects from emotional decisions and market panic",
            "Clear moral framework - provides certainty and peace of mind in volatile markets",
            "Community alignment - shared values create trust and collective financial wisdom",
            "Proven stability - time-tested approaches that have preserved wealth across generations"
          ],
          limitations: [
            "Rigidity - inability to adapt when rules become outdated or counterproductive",
            "Missed opportunities - excluding potentially profitable investments due to rigid doctrine",
            "Unquestioning authority - vulnerability if trusted authority provides poor guidance",
            "False dichotomy - seeing complex financial decisions as simply 'right' or 'wrong'"
          ],
          keyInsight: "Blue doesn't search for novel solutions but applies pre-determined 'right answers' from doctrine. The objective function is fixed and sacred - you cannot question the rules to achieve better outcomes because breaking rules IS the failure.",
          realWorldConnection: "Faith-based investing (Christian, Islamic, Jewish values funds), traditional bank wealth management, target-date retirement funds with preset allocations, government bond investing"
        },
        orange: {
          title: "Strategic Achiever",
          subtitle: "Single-Objective Optimization - Maximize Returns",
          description: "The market is a complex but understandable machine. Business and investing involve finding the most efficient levers to maximize profit. This is elegant single-objective optimization: shareholders are primary, other stakeholders are constraints or inputs to the profit-maximization function.",
          approach: "Single-Objective Optimization",
          keyQuestion: "What is the optimal strategy to maximize my risk-adjusted returns?",
          optimizationFunction: "Maximize f(Profit) subject to legal and minimal ethical constraints",
          strategies: [
            "Strategic analysis - fundamental and technical analysis to find undervalued assets",
            "Modern Portfolio Theory - mathematical optimization of returns for given risk levels",
            "Primacy of ROI - profit and shareholder value as supreme metrics",
            "Pragmatic opportunism - will invest anywhere if the numbers work"
          ],
          strengths: [
            "Clarity & focus - single, measurable goal eliminates confusion",
            "Effectiveness & innovation - drives unprecedented wealth creation",
            "Sophistication - advanced tools for risk management and analysis",
            "Efficiency - streamlined decision-making around clear objective"
          ],
          limitations: [
            "Externalities blindness - brilliant at private costs/benefits, blind to social/environmental costs",
            "Reductionism - treating complex systems as simple profit machines",
            "Short-termism - quarterly pressure sacrifices long-term sustainability",
            "Stakeholder instrumentalization - people and environment seen as inputs, not inherently valuable"
          ],
          realWorldConnection: "Mainstream finance, index funds based on performance, hedge funds using algorithms for absolute returns"
        },
        green: {
          title: "Ethically Conscious Investor", 
          subtitle: "Value-Driven Constraints - Profit Within Ethical Boundaries",
          description: "The world is a community that needs healing from Orange's exploitative 'win-lose' mindset. Green doesn't optimize multiple objectives like Yellow, but instead imposes strict ethical filters on traditional profit-seeking, creating 'good' and 'bad' categories for investment decisions.",
          approach: "Value-Driven Constraint on Profit Maximization",
          keyQuestion: "Is this company good or bad according to our values? Only then: will it make money?",
          optimizationFunction: "Maximize f(Profit) subject to Values Constraint = TRUE",
          strategies: [
            "Negative screening (exclusion) - 'Do not invest in companies that harm our community (the world)'",
            "Positive screening (inclusion) - 'Do invest in companies that help our community'", 
            "ESG score reliance - using ethical ratings as primary filter before financial analysis",
            "Values-first methodology - companies must pass values test before profit evaluation"
          ],
          strengths: [
            "Moral clarity - clear ethical boundaries provide decision-making framework",
            "Community alignment - creates sense of shared values and identity",
            "Market influence - drives corporate transparency and sustainability reporting",
            "Accessibility - easy to understand and implement screening criteria"
          ],
          limitations: [
            "Black-and-white thinking - creates rigid 'good vs bad' categories that miss nuance",
            "Unintended consequences - divestment may not create actual systemic change, just portfolio 'purity'",
            "Suboptimization - focuses on minimizing harm rather than maximizing holistic good",
            "Surface-level indicators - may rely on PR and sentiment rather than deep systemic impact"
          ],
          keyInsight: "Green introduces crucial values into investing but operates through exclusion/inclusion filters rather than true multi-objective optimization. It constrains the Orange profit function rather than fundamentally reimagining it.",
          realWorldConnection: "ESG funds, SRI (Socially Responsible Investing), fossil fuel divestment, faith-based investment screens, B-Corp focused portfolios"
        },
        yellow: {
          title: "Systemic Investor",
          subtitle: "Multi-Objective Optimization - Systemic Health & Returns",
          description: "The world is a complex, interconnected, evolving system. A business or investment is a node within multiple nested systems. Success requires optimizing for the health of the entire system, recognizing that long-term financial viability depends on environmental, social, and systemic health.",
          approach: "Multi-Objective Optimization",
          keyQuestion: "How do we optimize for profit THROUGH systemic health and long-term viability?",
          optimizationFunction: "Optimize f(Profit, Planetary Health, Social Equity, Systemic Resilience, Learning & Adaptation)",
          strategies: [
            "Systems-positive investing - seeking companies that solve systemic problems profitably",
            "Embracing paradox - comfortable holding contradictory positions for systemic function",
            "Stakeholder integration - all stakeholders seen as part of holistic system to optimize",
            "Emergent opportunities - finding investments where multiple objectives align synergistically"
          ],
          strengths: [
            "Resilience - optimizes for long-term viability across multiple dimensions",
            "Innovation catalyst - seeks breakthrough solutions that serve multiple objectives",
            "Adaptive capacity - can navigate complexity and changing conditions",
            "Systemic impact - targets leverage points for maximum positive change"
          ],
          limitations: [
            "Cognitive complexity - requires significant analytical and systems thinking capacity",
            "Slower decisions - multi-objective optimization is inherently more complex",
            "Measurement challenges - harder to quantify success across multiple dimensions",
            "Stakeholder management - balancing competing objectives creates ongoing tension"
          ],
          keyInsight: "Profit shifts from being the goal to being the lifeblood that enables pursuit of other objectives. The question becomes: 'How do we design systems that generate profit through purpose?'",
          realWorldConnection: "Impact investing, B-Corp investments, ESG integration (when done systemically), regenerative finance, stakeholder capitalism initiatives"
        },
        turquoise: {
          title: "Planetary Steward & System Transformer",
          subtitle: "Holistic Optimization - Changing the Game Itself",
          description: "Extends Yellow's multi-objective optimization but makes planetary health the central organizing principle. Turquoise doesn't just optimize within the current system—it actively works to transform the entire financial system toward holistic flourishing. The business/investment becomes a conscious expression of planetary healing.",
          approach: "Holistic System Transformation",
          keyQuestion: "How do we transform the entire economic system to make holistic flourishing the fundamental operating principle?",
          optimizationFunction: "Optimize f(Holistic Flourishing) where planetary health, human wellbeing, economic vitality, and wisdom are inseparable facets of one reality",
          systemTransformation: [
            "Building new infrastructure - for-benefit corporations, planetary health exchanges, regenerative financial instruments",
            "Creating coalitions of the willing - sovereign wealth funds, foundations operating under new principles",
            "Developing integral metrics - True Cost Accounting, Planetary Boundaries Dashboards, Net Positivity measures",
            "Legal system advocacy - making planetary stewardship a legal duty, not just nice-to-have"
          ],
          keyInsight: "Moves from 'playing the game better' (Yellow) to 'changing the game itself.' Views current financial system as fundamentally broken and works to design new rules, metrics, and goals aligned with planetary health.",
          differentiators: [
            "Planetary health as foundation, not variable - the ultimate substrate for all value creation",
            "Expanded self-interest - 'Self' becomes the whole planet, not individual entity",
            "Flow and emergence - aligning with natural systems rather than forcing designed solutions",
            "Transcending paradox through wholeness - reframing contradictions at higher-order perspective"
          ],
          whyCurrentlyTheoretical: [
            "No existing infrastructure within current Orange/Blue financial systems",
            "Requires unprecedented global cooperation and consciousness shift",
            "New metrics and mechanisms still being pioneered by early adopters"
          ],
          emergingBridges: [
            "Regenerative finance movements and Indigenous economic models",
            "B-Corp and steward-ownership legal structures gaining adoption",
            "Impact measurement evolving beyond ESG toward true integral metrics",
            "Climate finance and biodiversity credits creating new planetary-health markets"
          ],
          purpose: "Not just a theoretical vision but a practical blueprint for financial system transformation. Represents the conscious intent to forge a new economic container based on regeneration and wholeness.",
          practicalExample: "Beyond investing in a solar company (Yellow), Turquoise creates new legal frameworks requiring energy companies to internalize full environmental costs, while building regenerative investment funds that treat planetary healing as essential R&D for future economy.",
          warning: "Currently aspirational for most investors, but represents the frontier where pioneering capital allocators are actively building new financial infrastructure."
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
        optimizationFunction: "Optimization Function",
        keyInsight: "Key Insight",
        developmentalEvolution: "How Red Energy Can Evolve",
        developmentalRole: "Developmental Role",
        criticalWarning: "Critical Warning",
        systemTransformation: "System Transformation",
        differentiators: "Key Differentiators",
        whyCurrentlyTheoretical: "Why Currently Theoretical",
        emergingBridges: "Emerging Bridges",
        practicalExample: "Practical Example",
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
      },
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
            "subtitle": "Obegränsad maximering - ren makt och omedelbar tillfredsställelse",
            "description": "Världen är en nollsummedjungel där 'makt ger rätt'. Röd representerar den enklaste, mest brutala optimeringen: att maximera personlig makt och njutning med minimala begränsningar. Detta är ett rovdjursbeteende som förstör förtroende, relationer och slutligen leder till självförstörelse.",
            "approach": "Obegränsad maximering (inga etiska eller strategiska gränser)",
            "keyQuestion": "Vad kan jag roffa åt mig just nu för att vinna, dominera och må bra?",
            "optimizationFunction": "Maximera f(Min Makt, Min Njutning) endast begränsat av rädsla för omedelbara konsekvenser",
            "strategies": [
                "Rovdjurslik opportunism - att utnyttja varje svaghet eller fördel för omedelbar vinning",
                "Pump-and-dump-upplägg - att manipulera marknader genom bedrägeri och hajper",
                "YOLO-handel - att satsa allt på högriskinvesteringar för spänning och status",
                "Fientligt utnyttjande - att behandla alla marknadsaktörer som byten att erövra"
            ],
            "strengths": [
                "Beslutsamt agerande - ingen tvekan eller analysförlamning när möjligheter uppstår",
                "Genombrott av barriärer - vilja att utmana etablerade maktstrukturer",
                "Rå energi - ger den egostyrka som senare stadier kan kanalisera produktivt",
                "Omedelbara resultat - kan uppnå snabba vinster på kort sikt"
            ],
            "limitations": [
                "Oundviklig självförstörelse - ohållbart beteende leder till katastrofala förluster",
                "Fullständig brist på strategi - rent reaktiv utan långsiktig planeringsförmåga",
                "Förstör alla relationer - bränner broar genom utnyttjande och svek",
                "Legala och etiska överträdelser - övergår ofta i bedrägeri och marknadsmanipulation"
            ],
            "developmentalEvolution": [
                "Röds djärvhet + Blås regler = disciplinerat entreprenörskap",
                "Röds riskaptit + Oranges strategi = banbrytande innovation",
                "Röds maktdrivkraft + Gröns värderingar = socialt entreprenörskap",
                "Röds energi, korrekt kanaliserad, blir bränslet för prestationer på högre stadier"
            ],
            "keyInsight": "Röd är den essentiella framväxten av egot som bryter sig loss från stambegränsningar, men den måste utvecklas snabbt. Den råa maktdrivkraften blir grunden för Blås disciplin och Oranges strategiska prestationer när den utvecklas korrekt.",
            "developmentalRole": "Representerar den avgörande framväxten av individuell vilja och självförverkligande, men denna energi måste kanaliseras genom regler (Blå) och strategi (Orange) för att bli konstruktiv snarare än destruktiv.",
            "realWorldConnection": "Pump-and-dump-upplägg, insiderhandel, ockerutlåning, fientliga uppköp drivna av erövringslust snarare än strategi, dagshandel i kasinostil",
            "criticalWarning": "Detta beteendemönster är i sig destruktivt och ofta olagligt. Det representerar ett utvecklingsstadium att överskrida, inte att efterlikna. Att förstå Röd hjälper till att känna igen och undvika dessa mönster hos sig själv och andra."
        },
        "blue": {
            "title": "Regelbaserad investerare",
            "subtitle": "Begränsad maximering - rättfärdighet inom heliga regler",
            "description": "Världen styrs av absolut Sanning och hierarkisk ordning. Det finns ett 'Rätt Sätt' att investera, nedärvt från en auktoritet. Blå strävar efter att maximera rättfärdighet och moralisk renhet inom icke-förhandlingsbara heliga ramar, i tron att rättfärdigt agerande kommer att leda till förtjänt välstånd.",
            "approach": "Begränsad maximering (optimering inom ett heligt ramverk)",
            "keyQuestion": "Vad säger regelboken (helig skrift, tradition, auktoritet) är det rätta sättet att hantera pengar?",
            "optimizationFunction": "Maximera f(Rättfärdighet, Ordning) under förutsättning att Heliga Regler = ABSOLUT",
            "strategies": [
                "'Planens' företräde - strikt efterlevnad av förutbestämda investeringsplaner utan avvikelse",
                "Hänvisning till auktoritet - att lita på etablerade banker, rådgivare eller religiös finansiell vägledning",
                "Efterlevnad av heliga begränsningar - att undvika investeringar som bryter mot religiös/moralisk lag (syndaktier, ränta)",
                "Fokus på långsiktig stabilitet - att bygga förmögenhet långsamt genom disciplinerat, regelstyrt beteende"
            ],
            "strengths": [
                "Orubblig disciplin - skyddar mot känslomässiga beslut och marknadspanik",
                "Tydligt moraliskt ramverk - ger säkerhet och sinnesfrid på volatila marknader",
                "Gemensam anpassning - delade värderingar skapar förtroende och kollektiv finansiell visdom",
                "Beprövad stabilitet - tidstestade metoder som har bevarat förmögenhet över generationer"
            ],
            "limitations": [
                "Stelhet - oförmåga att anpassa sig när regler blir föråldrade eller kontraproduktiva",
                "Missade möjligheter - att utesluta potentiellt lönsamma investeringar på grund av stel doktrin",
                "Ofrågvisande auktoritet - sårbarhet om den betrodda auktoriteten ger dålig vägledning",
                "Falsk dikotomi - att se komplexa finansiella beslut som antingen 'rätta' eller 'felaktiga'"
            ],
            "keyInsight": "Blå söker inte efter nya lösningar utan tillämpar förutbestämda 'rätta svar' från doktrinen. Målfunktionen är fast och helig - man kan inte ifrågasätta reglerna för att uppnå bättre resultat eftersom att bryta mot reglerna ÄR misslyckandet.",
            "realWorldConnection": "Trosbaserade investeringar (kristna, islamiska, judiska värdefonder), traditionell bankförmögenhetsförvaltning, måldatumsfonder för pension med förinställda allokeringar, investeringar i statsobligationer"
        },
        "orange": {
            "title": "Strategisk måluppnåsare",
            "subtitle": "Enkriterieoptimering - maximera avkastning",
            "description": "Marknaden är en komplex men förståelig maskin. Affärsverksamhet och investeringar handlar om att hitta de mest effektiva hävstängerna för att maximera vinst. Detta är elegant enkriterieoptimering: aktieägarna är primära, andra intressenter är begränsningar eller indata till den vinstmaximerande funktionen.",
            "approach": "Enkriterieoptimering",
            "keyQuestion": "Vilken är den optimala strategin för att maximera min riskjusterade avkastning?",
            "optimizationFunction": "Maximera f(Vinst) med förbehåll för legala och minimala etiska begränsningar",
            "strategies": [
                "Strategisk analys - fundamental och teknisk analys för att hitta undervärderade tillgångar",
                "Modern portföljteori - matematisk optimering av avkastning för givna risknivåer",
                "ROI:s företräde - vinst och aktieägarvärde som de högsta måtten",
                "Pragmatisk opportunism - investerar var som helst om siffrorna stämmer"
            ],
            "strengths": [
                "Tydlighet & fokus - ett enda, mätbart mål eliminerar förvirring",
                "Effektivitet & innovation - driver ett aldrig tidigare skådat välståndsskapande",
                "Sofistikering - avancerade verktyg för riskhantering och analys",
                "Effektivitet - strömlinjeformat beslutsfattande kring ett tydligt mål"
            ],
            "limitations": [
                "Blindhet för externaliteter - briljant på privata kostnader/nyttor, blind för sociala/miljömässiga kostnader",
                "Reduktionism - behandlar komplexa system som enkla vinstmaskiner",
                "Kortsiktighet - kvartalsvis press offrar långsiktig hållbarhet",
                "Instrumentalisering av intressenter - människor och miljö ses som indata, inte som inneboende värdefulla"
            ],
            "realWorldConnection": "Traditionell finans, indexfonder baserade på prestation, hedgefonder som använder algoritmer för absolut avkastning"
        },
        "green": {
            "title": "Etiskt medveten investerare",
            "subtitle": "Värderingsdrivna begränsningar - vinst inom etiska ramar",
            "description": "Världen är en gemenskap som behöver läkas från Oranges exploaterande 'vinna-förlora'-mentalitet. Grön optimerar inte flera mål som Gul, utan inför istället strikta etiska filter på traditionell vinstjakt, och skapar 'bra' och 'dåliga' kategorier för investeringsbeslut.",
            "approach": "Värderingsdriven begränsning av vinstmaximering",
            "keyQuestion": "Är detta företag bra eller dåligt enligt våra värderingar? Först därefter: kommer det att tjäna pengar?",
            "optimizationFunction": "Maximera f(Vinst) under förutsättning att Värderingsbegränsning = SANN",
            "strategies": [
                "Negativ screening (exkludering) - 'Investera inte i företag som skadar vår gemenskap (världen)'",
                "Positiv screening (inkludering) - 'Investera i företag som hjälper vår gemenskap'",
                "Förlitan på ESG-betyg - att använda etiska betyg som primärt filter före finansiell analys",
                "Värderingar-först-metodik - företag måste klara värderingstestet före vinstutvärdering"
            ],
            "strengths": [
                "Moralisk tydlighet - tydliga etiska gränser ger ett ramverk för beslutsfattande",
                "Gemensam anpassning - skapar en känsla av delade värderingar och identitet",
                "Marknadsinflytande - driver företagens transparens och hållbarhetsrapportering",
                "Tillgänglighet - lättförståeliga och implementerbara screeningkriterier"
            ],
            "limitations": [
                "Svartvitt tänkande - skapar rigida 'bra vs dåligt'-kategorier som missar nyanser",
                "Oavsiktliga konsekvenser - avyttring kanske inte skapar verklig systemförändring, bara 'renhet' i portföljen",
                "Suboptimering - fokuserar på att minimera skada snarare än att maximera holistiskt gott",
                "Ytliga indikatorer - kan förlita sig på PR och sentiment snarare än djup systemisk påverkan"
            ],
            "keyInsight": "Grön introducerar avgörande värderingar i investeringar men verkar genom exkluderings-/inkluderingsfilter snarare än sann multikriterieoptimering. Den begränsar Oranges vinstfunktion istället för att i grunden omforma den.",
            "realWorldConnection": "ESG-fonder, SRI (socialt ansvarsfulla investeringar), avyttring av fossila bränslen, trosbaserade investeringsfilter, portföljer fokuserade på B-Corp"
        },
        "yellow": {
            "title": "Systemisk investerare",
            "subtitle": "Multikriterieoptimering - systemisk hälsa & avkastning",
            "description": "Världen är ett komplext, sammankopplat och föränderligt system. Ett företag eller en investering är en nod inom flera nästlade system. Framgång kräver optimering för hela systemets hälsa, med insikten att långsiktig finansiell bärkraft beror på miljömässig, social och systemisk hälsa.",
            "approach": "Multikriterieoptimering",
            "keyQuestion": "Hur optimerar vi för vinst GENOM systemisk hälsa och långsiktig bärkraft?",
            "optimizationFunction": "Optimera f(Vinst, Planetär hälsa, Social rättvisa, Systemisk motståndskraft, Lärande & Anpassning)",
            "strategies": [
                "Systempositiva investeringar - att söka företag som löser systemproblem på ett lönsamt sätt",
                "Omfamna paradoxer - bekväm med att hålla motsägelsefulla positioner för systemets funktion",
                "Intressentintegration - alla intressenter ses som en del av ett holistiskt system att optimera",
                "Framväxande möjligheter - att hitta investeringar där flera mål sammanfaller synergistiskt"
            ],
            "strengths": [
                "Motståndskraft - optimerar för långsiktig bärkraft över flera dimensioner",
                "Innovationskatalysator - söker banbrytande lösningar som tjänar flera syften",
                "Anpassningsförmåga - kan navigera i komplexitet och förändrade förhållanden",
                "Systemisk påverkan - riktar in sig på hävstångspunkter för maximal positiv förändring"
            ],
            "limitations": [
                "Kognitiv komplexitet - kräver betydande analytisk och systemtänkande kapacitet",
                "Långsammare beslut - multikriterieoptimering är i sig mer komplex",
                "Mätutmaningar - svårare att kvantifiera framgång över flera dimensioner",
                "Intressenthantering - att balansera konkurrerande mål skapar ständiga spänningar"
            ],
            "keyInsight": "Vinst övergår från att vara målet till att vara livsnerven som möjliggör strävan efter andra mål. Frågan blir: 'Hur designar vi system som genererar vinst genom syfte?'",
            "realWorldConnection": "Påverkansinvesteringar, B-Corp-investeringar, ESG-integration (när den görs systemiskt), regenerativ finans, initiativ för intressentkapitalism"
        },
        "turquoise": {
            "title": "Planetär förvaltare & systemförändrare",
            "subtitle": "Holistisk optimering - att förändra själva spelet",
            "description": "Utökar Guls multikriterieoptimering men gör planetär hälsa till den centrala organiserande principen. Turkos optimerar inte bara inom det nuvarande systemet – den arbetar aktivt för att omvandla hela det finansiella systemet mot holistiskt välmående. Företaget/investeringen blir ett medvetet uttryck för planetärt helande.",
            "approach": "Holistisk systemomvandling",
            "keyQuestion": "Hur omvandlar vi hela det ekonomiska systemet för att göra holistiskt välmående till den grundläggande driftsprincipen?",
            "optimizationFunction": "Optimera f(Holistiskt välmående) där planetär hälsa, mänskligt välbefinnande, ekonomisk vitalitet och visdom är oskiljaktiga aspekter av en enda verklighet",
            "systemTransformation": [
                "Bygga ny infrastruktur - 'for-benefit'-bolag, börser för planetär hälsa, regenerativa finansiella instrument",
                "Skapa koalitioner av de villiga - statliga förmögenhetsfonder, stiftelser som verkar enligt nya principer",
                "Utveckla integrerade mätetal - True Cost Accounting, instrumentpaneler för planetära gränser, mått på nettopositivitet",
                "Opinionsbildning inom rättssystemet - att göra planetärt förvaltarskap till en juridisk plikt, inte bara något som är 'trevligt att ha'"
            ],
            "keyInsight": "Går från att 'spela spelet bättre' (Gul) till att 'förändra själva spelet'. Ser det nuvarande finansiella systemet som fundamentalt trasigt och arbetar för att utforma nya regler, mätetal och mål i linje med planetär hälsa.",
            "differentiators": [
                "Planetär hälsa som grund, inte variabel - det ultimata substratet för allt värdeskapande",
                "Utvidgat egenintresse - 'Jaget' blir hela planeten, inte en enskild enhet",
                "Flöde och emergens - att anpassa sig till naturliga system snarare än att tvinga fram konstruerade lösningar",
                "Överskrida paradoxer genom helhet - att omformulera motsägelser ur ett högre ordningens perspektiv"
            ],
            "whyCurrentlyTheoretical": [
                "Ingen existerande infrastruktur inom nuvarande Orange/Blå finansiella system",
                "Kräver ett aldrig tidigare skådat globalt samarbete och medvetandeskifte",
                "Nya mätetal och mekanismer utvecklas fortfarande av tidiga föregångare"
            ],
            "emergingBridges": [
                "Regenerativa finansrörelser och inhemska ekonomiska modeller",
                "Juridiska strukturer som B-Corp och förvaltarägande vinner mark",
                "Effektmätning utvecklas bortom ESG mot sanna integrerade mätetal",
                "Klimatfinansiering och krediter för biologisk mångfald skapar nya marknader för planetär hälsa"
            ],
            "purpose": "Inte bara en teoretisk vision utan en praktisk plan för omvandling av det finansiella systemet. Representerar den medvetna avsikten att skapa en ny ekonomisk behållare baserad på regeneration och helhet.",
            "practicalExample": "Utöver att investera i ett solenergiföretag (Gul), skapar Turkos nya rättsliga ramverk som kräver att energibolag internaliserar fulla miljökostnader, samtidigt som man bygger regenerativa investeringsfonder som behandlar planetärt helande som väsentlig FoU för framtidens ekonomi.",
            "warning": "För närvarande en strävan för de flesta investerare, men representerar frontlinjen där banbrytande kapitalförvaltare aktivt bygger ny finansiell infrastruktur."
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
        optimizationFunction: "Optimeringsfunktion",
        keyInsight: "Nyckelinsikt",
        developmentalEvolution: "Hur röd energi kan utvecklas",
        developmentalRole: "Utvecklingsroll",
        criticalWarning: "Kritisk varning",
        systemTransformation: "Systemtransformation",
        differentiators: "Nyckeldifferentialer",
        whyCurrentlyTheoretical: "Varför teoretiskt just nu",
        emergingBridges: "Framväxande bryggor",
        practicalExample: "Praktiskt exempel",
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
      },
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

          <!-- Optimization Function (Orange/Yellow/Green) -->
          {#if stageData.optimizationFunction}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-3">{t.sectionHeaders.optimizationFunction}</h4>
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-l-4" style="border-color: {getStageColor(currentStage)}">
                <code class="text-sm font-mono text-gray-800">{stageData.optimizationFunction}</code>
              </div>
            </div>
          {/if}

          <!-- Key Insight (Yellow) -->
          {#if stageData.keyInsight}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-indigo-800 mb-3">{t.sectionHeaders.keyInsight}</h4>
              <div class="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-400">
                <p class="text-gray-700 italic">{stageData.keyInsight}</p>
              </div>
            </div>
          {/if}
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

          <!-- System Transformation (for Turquoise) -->
          {#if stageData.systemTransformation}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.systemTransformation}</h4>
              <ul class="space-y-3">
                {#each stageData.systemTransformation as transformation}
                  <li class="flex items-start">
                    <span class="text-2xl mr-3" style="color: {getStageColor(currentStage)}">🔄</span>
                    <span class="text-gray-700">{transformation}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Differentiators (for Turquoise) -->
          {#if stageData.differentiators}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.differentiators}</h4>
              <ul class="space-y-3">
                {#each stageData.differentiators as differentiator}
                  <li class="flex items-start">
                    <span class="text-2xl mr-3" style="color: {getStageColor(currentStage)}">✨</span>
                    <span class="text-gray-700">{differentiator}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Why Currently Theoretical (updated for Turquoise) -->
          {#if stageData.whyCurrentlyTheoretical}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.whyCurrentlyTheoretical}</h4>
              <ul class="space-y-2">
                {#each stageData.whyCurrentlyTheoretical as reason}
                  <li class="flex items-start">
                    <span class="text-amber-500 text-lg mr-2">⚠</span>
                    <span class="text-gray-700 text-sm">{reason}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Emerging Bridges (for Turquoise) -->
          {#if stageData.emergingBridges}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.emergingBridges}</h4>
              <ul class="space-y-2">
                {#each stageData.emergingBridges as bridge}
                  <li class="flex items-start">
                    <span class="text-green-500 text-lg mr-2">🌱</span>
                    <span class="text-gray-700 text-sm">{bridge}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Practical Example (for Turquoise) -->
          {#if stageData.practicalExample}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.practicalExample}</h4>
              <div class="bg-teal-50 rounded-lg p-4 border-l-4 border-teal-400">
                <p class="text-gray-700 text-sm">{stageData.practicalExample}</p>
              </div>
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

          <!-- Developmental Evolution (for Red) -->
          {#if stageData.developmentalEvolution}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">{t.sectionHeaders.developmentalEvolution}</h4>
              <ul class="space-y-3">
                {#each stageData.developmentalEvolution as evolution}
                  <li class="flex items-start">
                    <span class="text-green-600 text-lg mr-2">→</span>
                    <span class="text-gray-700">{evolution}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Developmental Role (for Red) -->
          {#if stageData.developmentalRole}
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-indigo-800 mb-3">{t.sectionHeaders.developmentalRole}</h4>
              <div class="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-400">
                <p class="text-gray-700 text-sm">{stageData.developmentalRole}</p>
              </div>
            </div>
          {/if}

          <!-- Critical Warning (for Red) -->
          {#if stageData.criticalWarning}
            <div class="mb-8">
              <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h4 class="text-sm font-medium text-red-800">{t.sectionHeaders.criticalWarning}</h4>
                    <p class="mt-2 text-sm text-red-700">{stageData.criticalWarning}</p>
                  </div>
                </div>
              </div>
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
