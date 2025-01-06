// src/lib/stores/quizStore.ts
import { writable } from 'svelte/store';
import type { Question } from '../types/spiral';
import { shuffleArray } from '../utils/questionUtils'; // Reuse your shuffleArray function
import languageStore from '$lib/stores/languageStore';

const { language, toggleLanguage } = languageStore; 

const questionsData: Question[] = [
  {
    id: "values-1",
    text: {
      en: "What do you consider most important when making life decisions?",
      sv: "Vad anser du vara viktigast när du fattar livsbeslut?"
    },
    type: "multiple-choice",
    category: "values",
    options: [
      {
        text: {
          en: "Ensuring basic security and survival",
          sv: "Säkerställa grundläggande trygghet och överlevnad"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Maintaining harmony with tradition and community",
          sv: "Upprätthålla harmoni med tradition och gemenskap"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Asserting power and independence",
          sv: "Hävda makt och självständighet"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Following established rules and principles",
          sv: "Följa etablerade regler och principer"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Achieving success and innovation",
          sv: "Uppnå framgång och innovation"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Creating harmony and fostering relationships",
          sv: "Skapa harmoni och främja relationer"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Understanding complex systems and patterns",
          sv: "Förstå komplexa system och mönster"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Aligning with natural evolutionary flow",
          sv: "Anpassning till naturligt evolutionärt flöde"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Experiencing unity with all existence",
          sv: "Uppleva enhet med all existens"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  {
    id: "worldview-1",
    text: {
      en: "How do you primarily view the nature of reality?",
      sv: "Hur ser du huvudsakligen på verklighetens natur?"
    },
    type: "multiple-choice",
    category: "worldview",
    options: [
      {
        text: {
          en: "A physical world of immediate needs and threats",
          sv: "En fysisk värld av omedelbara behov och hot"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "A mysterious realm guided by spirits and traditions",
          sv: "Ett mystiskt rike styrt av andar och traditioner"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "An arena for power and self-expression",
          sv: "En arena för makt och självuttryck"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "An ordered system with clear rules and purpose",
          sv: "Ett ordnat system med tydliga regler och syfte"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "A marketplace of opportunities and achievements",
          sv: "En marknad av möjligheter och prestationer"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "A network of relationships and shared experiences",
          sv: "Ett nätverk av relationer och delade upplevelser"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "An interconnected system of evolving patterns",
          sv: "Ett sammankopplat system av utvecklande mönster"
        },
        value: 1,
        relatedStages: ['yellow', 'turquoise']
      },
      {
        text: {
          en: "A unified field of consciousness and being",
          sv: "Ett enat fält av medvetande och varande"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },
  {
    id: "relationships-1",
    text: {
      en: "How do you approach relationships and connection with others?",
      sv: "Hur närmar du dig relationer och kontakt med andra?"
    },
    type: "multiple-choice",
    category: "relationships",
    options: [
      {
        text: {
          en: "Focus on basic trust and safety",
          sv: "Fokus på grundläggande tillit och säkerhet"
        },
        value: 1,
        relatedStages: ['beige', 'purple']
      },
      {
        text: {
          en: "Assert dominance and protect interests",
          sv: "Hävda dominans och skydda intressen"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Follow proper social conventions and roles",
          sv: "Följa korrekta sociala konventioner och roller"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Build strategic networks and partnerships",
          sv: "Bygga strategiska nätverk och partnerskap"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Foster deep emotional connections and understanding",
          sv: "Främja djupa emotionella band och förståelse"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Integrate multiple perspectives and levels of interaction",
          sv: "Integrera flera perspektiv och interaktionsnivåer"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Merge individual and collective consciousness",
          sv: "Förena individuellt och kollektivt medvetande"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Experience direct unity and non-separation",
          sv: "Uppleva direkt enhet och icke-separation"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },
  {
    id: "society-1",
    text: {
      en: "What do you believe is most important for societal progress?",
      sv: "Vad anser du vara viktigast för samhällelig utveckling?"
    },
    type: "multiple-choice",
    category: "society",
    options: [
      {
        text: {
          en: "Meeting basic needs and ensuring survival",
          sv: "Möta grundläggande behov och säkerställa överlevnad"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Preserving traditions and cultural identity",
          sv: "Bevara traditioner och kulturell identitet"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Strong leadership and clear hierarchy",
          sv: "Starkt ledarskap och tydlig hierarki"
        },
        value: 1,
        relatedStages: ['red', 'blue']
      },
      {
        text: {
          en: "Scientific advancement and economic growth",
          sv: "Vetenskapliga framsteg och ekonomisk tillväxt"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Social justice and environmental harmony",
          sv: "Social rättvisa och miljömässig harmoni"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Systemic solutions and adaptive governance",
          sv: "Systemiska lösningar och adaptiv styrning"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Holistic evolution of human consciousness",
          sv: "Holistisk evolution av mänskligt medvetande"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Collective awakening and conscious evolution",
          sv: "Kollektivt uppvaknande och medveten evolution"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  {
    id: "purpose-1",
    text: {
      en: "What do you consider to be the primary purpose of life?",
      sv: "Vad anser du vara livets huvudsakliga syfte?"
    },
    type: "multiple-choice",
    category: "purpose",
    options: [
      {
        text: {
          en: "Survival and basic wellbeing",
          sv: "Överlevnad och grundläggande välbefinnande"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Maintaining harmony with the spiritual world",
          sv: "Upprätthålla harmoni med den andliga världen"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Achieving power and recognition",
          sv: "Uppnå makt och erkännande"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Fulfilling one's duty and purpose",
          sv: "Uppfylla sin plikt och syfte"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Personal success and achievement",
          sv: "Personlig framgång och prestation"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Connection and harmony with others",
          sv: "Kontakt och harmoni med andra"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Understanding and improving complex systems",
          sv: "Förstå och förbättra komplexa system"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Contributing to the wellbeing of all life",
          sv: "Bidra till allt livs välbefinnande"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Realizing and expressing universal consciousness",
          sv: "Förverkliga och uttrycka universellt medvetande"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  {
    id: "scenario-1",
    text: {
      en: "In a workplace conflict, what approach would you most likely take?",
      sv: "I en arbetsplatskonflikt, vilket tillvägagångssätt skulle du mest sannolikt välja?"
    },
    type: "multiple-choice",
    category: "scenarios",
    options: [
      {
        text: {
          en: "Protect my position and assert my rights",
          sv: "Skydda min position och hävda mina rättigheter"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Follow official procedures and policies",
          sv: "Följa officiella procedurer och policyer"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Find a solution that maximizes efficiency and results",
          sv: "Hitta en lösning som maximerar effektivitet och resultat"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Ensure everyone's voice is heard and feelings considered",
          sv: "Säkerställa att allas röst hörs och känslor beaktas"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Analyze the systemic patterns causing the conflict",
          sv: "Analysera de systemiska mönstren som orsakar konflikten"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "See the conflict as an opportunity for collective growth",
          sv: "Se konflikten som en möjlighet till kollektiv utveckling"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Respond spontaneously from a place of unity consciousness",
          sv: "Svara spontant från en plats av enhetsmedvetande"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Environmental perspective
  {
    id: "environment-1",
    text: {
      en: "How do you primarily view environmental issues?",
      sv: "Hur ser du främst på miljöfrågor?"
    },
    type: "multiple-choice",
    category: "worldview",
    options: [
      {
        text: {
          en: "Focus on immediate survival needs first",
          sv: "Fokusera på omedelbara överlevnadsbehov först"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Respect nature's spirits and traditional wisdom",
          sv: "Respektera naturens andar och traditionell visdom"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Control and exploit natural resources",
          sv: "Kontrollera och utnyttja naturresurser"
        },
        value: 1,
        relatedStages: ['red', 'blue']
      },
      {
        text: {
          en: "Find technological solutions and market incentives",
          sv: "Hitta teknologiska lösningar och marknadsincitament"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Protect and live in harmony with nature",
          sv: "Skydda och lev i harmoni med naturen"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Understand and work with natural systems",
          sv: "Förstå och arbeta med naturliga system"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "See Earth as a living, conscious system",
          sv: "Se Jorden som ett levande, medvetet system"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Experience direct unity with all of nature",
          sv: "Upplev direkt enhet med hela naturen"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Personal development
  {
    id: "development-1",
    text: {
      en: "How do you approach personal growth?",
      sv: "Hur närmar du dig personlig utveckling?"
    },
    type: "multiple-choice",
    category: "growth",
    options: [
      {
        text: {
          en: "Focus on practical skills and survival capabilities",
          sv: "Fokusera på praktiska färdigheter och överlevnadsförmågor"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Learn from elders and traditional wisdom",
          sv: "Lär från äldre och traditionell visdom"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Become stronger and more influential",
          sv: "Bli starkare och mer inflytelserik"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Follow established paths and expert guidance",
          sv: "Följ etablerade vägar och expertråd"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Set goals and measure progress systematically",
          sv: "Sätt mål och mät framsteg systematiskt"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Explore feelings and relationships deeply",
          sv: "Utforska känslor och relationer djupt"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Integrate multiple perspectives and approaches",
          sv: "Integrera flera perspektiv och tillvägagångssätt"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Participate in collective evolutionary development",
          sv: "Delta i kollektiv evolutionär utveckling"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Allow natural unfolding of consciousness",
          sv: "Tillåt naturligt utvecklande av medvetandet"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Leadership and Authority
  {
    id: "leadership-1",
    text: {
      en: "What makes a good leader in your view?",
      sv: "Vad kännetecknar en bra ledare enligt din uppfattning?"
    },
    type: "multiple-choice",
    category: "leadership",
    options: [
      {
        text: {
          en: "Someone who ensures everyone's survival and safety",
          sv: "Någon som säkerställer allas överlevnad och säkerhet"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "A wise elder who preserves traditions",
          sv: "En vis äldre som bevarar traditioner"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "A strong figure who takes decisive action",
          sv: "En stark person som fattar avgörande beslut"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Someone who upholds rules and moral standards",
          sv: "Någon som upprätthåller regler och moraliska standarder"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "An achiever who drives results and innovation",
          sv: "En person som driver resultat och innovation"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "A facilitator who empowers and includes everyone",
          sv: "En facilitator som bemyndigar och inkluderar alla"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Someone who understands and navigates complexity",
          sv: "Någon som förstår och navigerar komplexitet"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Someone who nurtures the flourishing of all life",
          sv: "Någon som främjar allt livs blomstring"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "A presence that elevates collective consciousness",
          sv: "En närvaro som höjer det kollektiva medvetandet"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Change and Innovation
  {
    id: "change-1",
    text: {
      en: "How do you typically respond to major changes?",
      sv: "Hur reagerar du vanligtvis på stora förändringar?"
    },
    type: "multiple-choice",
    category: "adaptability",
    options: [
      {
        text: {
          en: "Focus on maintaining basic stability",
          sv: "Fokusera på att upprätthålla grundläggande stabilitet"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Seek guidance from trusted authorities",
          sv: "Söka vägledning från betrodda auktoriteter"
        },
        value: 1,
        relatedStages: ['purple', 'blue']
      },
      {
        text: {
          en: "Take control and assert my position",
          sv: "Ta kontroll och hävda min position"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Look for opportunities and advantages",
          sv: "Leta efter möjligheter och fördelar"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Consider the impact on all stakeholders",
          sv: "Överväga påverkan på alla intressenter"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Analyze patterns and adapt systemically",
          sv: "Analysera mönster och anpassa systematiskt"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Trust in life's evolutionary intelligence",
          sv: "Lita på livets evolutionära intelligens"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Flow with the natural evolution of things",
          sv: "Flöda med tingens naturliga utveckling"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Success Definition
  {
    id: "success-1",
    text: {
      en: "How do you define success?",
      sv: "Hur definierar du framgång?"
    },
    type: "multiple-choice",
    category: "values",
    options: [
      {
        text: {
          en: "Having enough to survive and be safe",
          sv: "Ha tillräckligt för att överleva och vara trygg"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Being accepted by my community and traditions",
          sv: "Bli accepterad av min gemenskap och traditioner"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Gaining power and respect from others",
          sv: "Få makt och respekt från andra"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Living according to proper principles",
          sv: "Leva enligt rätta principer"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Achieving measurable goals and recognition",
          sv: "Uppnå mätbara mål och erkännande"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Contributing to others' wellbeing",
          sv: "Bidra till andras välbefinnande"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Understanding and improving complex systems",
          sv: "Förstå och förbättra komplexa system"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Participating in the conscious evolution of life",
          sv: "Delta i livets medvetna evolution"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Being in harmony with existence itself",
          sv: "Vara i harmoni med existensen själv"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Problem Solving
  {
    id: "problem-1",
    text: {
      en: "When facing a complex problem, how do you typically approach it?",
      sv: "När du möter ett komplext problem, hur närmar du dig det vanligtvis?"
    },
    type: "multiple-choice",
    category: "problem-solving",
    options: [
      {
        text: {
          en: "Focus on immediate practical solutions",
          sv: "Fokusera på omedelbara praktiska lösningar"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Seek wisdom from traditional sources",
          sv: "Söka visdom från traditionella källor"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Take immediate action based on instinct",
          sv: "Agera omedelbart baserat på instinkt"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Follow established procedures and guidelines",
          sv: "Följa etablerade procedurer och riktlinjer"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Analyze data and optimize solutions",
          sv: "Analysera data och optimera lösningar"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Collaborate and consider all perspectives",
          sv: "Samarbeta och överväga alla perspektiv"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Map the system and find leverage points",
          sv: "Kartlägga systemet och hitta hävstångspunkter"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Trust the collective intelligence to guide solutions",
          sv: "Lita på den kollektiva intelligensen att vägleda lösningar"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Allow solutions to emerge naturally",
          sv: "Låta lösningar växa fram naturligt"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Technology and Progress
  {
    id: "technology-1",
    text: {
      en: "What's your view on technological progress?",
      sv: "Vad är din syn på teknologisk utveckling?"
    },
    type: "multiple-choice",
    category: "worldview",
    options: [
      {
        text: {
          en: "Useful only if it helps basic survival",
          sv: "Användbar endast om den hjälper grundläggande överlevnad"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Should respect traditional ways of life",
          sv: "Bör respektera traditionella levnadssätt"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "A tool for power and control",
          sv: "Ett verktyg för makt och kontroll"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Must be regulated for proper use",
          sv: "Måste regleras för korrekt användning"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Key driver of progress and success",
          sv: "Viktig drivkraft för framsteg och framgång"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Should serve human and environmental wellbeing",
          sv: "Bör tjäna mänskligt och miljömässigt välbefinnande"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Part of larger evolving systems",
          sv: "Del av större utvecklande system"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Living expression of planetary evolution",
          sv: "Levande uttryck för planetär evolution"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Expression of universal creative intelligence",
          sv: "Uttryck för universell kreativ intelligens"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Ethics and Morality
  {
    id: "ethics-1",
    text: {
      en: "How do you determine what's right and wrong?",
      sv: "Hur avgör du vad som är rätt och fel?"
    },
    type: "multiple-choice",
    category: "values",
    options: [
      {
        text: {
          en: "Based on what ensures survival",
          sv: "Baserat på vad som säkerställer överlevnad"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Through cultural and spiritual traditions",
          sv: "Genom kulturella och andliga traditioner"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "By what works to achieve my goals",
          sv: "Genom vad som fungerar för att nå mina mål"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Following established moral codes",
          sv: "Följer etablerade moralkoder"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Through rational analysis of consequences",
          sv: "Genom rationell analys av konsekvenser"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Considering impact on all beings",
          sv: "Överväger påverkan på alla varelser"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Understanding systemic implications",
          sv: "Förstår systemiska implikationer"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Through resonance with life's deeper wisdom",
          sv: "Genom resonans med livets djupare visdom"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Through direct knowing of unity",
          sv: "Genom direkt vetande om enhet"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Education and Learning
  {
    id: "learning-1",
    text: {
      en: "What's the most valuable type of knowledge?",
      sv: "Vilken typ av kunskap är mest värdefull?"
    },
    type: "multiple-choice",
    category: "learning",
    options: [
      {
        text: {
          en: "Practical survival skills",
          sv: "Praktiska överlevnadskunskaper"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Traditional wisdom and sacred knowledge",
          sv: "Traditionell visdom och helig kunskap"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Knowledge that gives power and advantage",
          sv: "Kunskap som ger makt och fördelar"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Established principles and proven methods",
          sv: "Etablerade principer och beprövade metoder"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Scientific and evidence-based knowledge",
          sv: "Vetenskaplig och evidensbaserad kunskap"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Understanding different perspectives and experiences",
          sv: "Förståelse för olika perspektiv och erfarenheter"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Systems thinking and complexity understanding",
          sv: "Systemtänkande och komplexitetsförståelse"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Holistic wisdom of living systems",
          sv: "Holistisk visdom från levande system"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Direct experiential wisdom of unity",
          sv: "Direkt erfarenhetsmässig visdom om enhet"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Social Change
  {
    id: "social-change-1",
    text: {
      en: "How should society address major challenges?",
      sv: "Hur bör samhället hantera stora utmaningar?"
    },
    type: "multiple-choice",
    category: "society",
    options: [
      {
        text: {
          en: "Focus on basic survival needs first",
          sv: "Fokusera på grundläggande överlevnadsbehov först"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Return to traditional values and wisdom",
          sv: "Återgå till traditionella värderingar och visdom"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Take decisive action under strong leadership",
          sv: "Vidta avgörande åtgärder under starkt ledarskap"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Follow established laws and procedures",
          sv: "Följa etablerade lagar och procedurer"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Innovate and find market-based solutions",
          sv: "Innovera och hitta marknadsbaserade lösningar"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Build consensus and ensure equality",
          sv: "Bygga konsensus och säkerställa jämlikhet"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Address root causes through systems thinking",
          sv: "Hantera grundorsaker genom systemtänkande"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Nurture natural evolution of consciousness",
          sv: "Främja naturlig medvetandeutveckling"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Transform consciousness collectively",
          sv: "Transformera medvetandet kollektivt"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Communication Style
  {
    id: "communication-1",
    text: {
      en: "What's your preferred way of communicating important ideas?",
      sv: "Hur föredrar du att kommunicera viktiga idéer?"
    },
    type: "multiple-choice",
    category: "communication",
    options: [
      {
        text: {
          en: "Direct and survival-focused",
          sv: "Direkt och överlevnadsfokuserad"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Through stories and symbols",
          sv: "Genom berättelser och symboler"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Assertively and with authority",
          sv: "Bestämt och med auktoritet"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Following proper channels and protocols",
          sv: "Följer korrekta kanaler och protokoll"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Using data and logical arguments",
          sv: "Använder data och logiska argument"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Through dialogue and sharing feelings",
          sv: "Genom dialog och dela känslor"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "By mapping complexities and patterns",
          sv: "Genom att kartlägga komplexitet och mönster"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Through resonance with living wisdom",
          sv: "Genom resonans med levande visdom"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Through presence and direct transmission",
          sv: "Genom närvaro och direkt överföring"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Decision Making Process
  {
    id: "decisions-2",
    text: {
      en: "When making difficult decisions, what matters most to you?",
      sv: "När du fattar svåra beslut, vad är viktigast för dig?"
    },
    type: "multiple-choice",
    category: "decision-making",
    options: [
      {
        text: {
          en: "Immediate impact on survival",
          sv: "Omedelbar påverkan på överlevnad"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Alignment with ancestral wisdom",
          sv: "Överensstämmelse med förfäders visdom"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Getting what I want",
          sv: "Att få det jag vill ha"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Following the right rules",
          sv: "Följa rätt regler"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Maximizing effectiveness",
          sv: "Maximera effektivitet"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Everyone's feelings and needs",
          sv: "Allas känslor och behov"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Long-term systemic effects",
          sv: "Långsiktiga systemiska effekter"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "What serves the whole of life",
          sv: "Det som tjänar livet som helhet"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "What emerges from deep presence",
          sv: "Vad som framträder ur djup närvaro"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Life Purpose
  {
    id: "purpose-2",
    text: {
      en: "What gives you the deepest sense of meaning?",
      sv: "Vad ger dig den djupaste känslan av mening?"
    },
    type: "multiple-choice",
    category: "purpose",
    options: [
      {
        text: {
          en: "Being alive and healthy",
          sv: "Att vara vid liv och ha hälsan"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Belonging to my community",
          sv: "Att tillhöra min gemenskap"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Achieving personal victories",
          sv: "Uppnå personliga segrar"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Serving a higher purpose",
          sv: "Tjäna ett högre syfte"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Creating valuable impacts",
          sv: "Skapa värdefull påverkan"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Growing together with others",
          sv: "Växa tillsammans med andra"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Understanding life's complexity",
          sv: "Förstå livets komplexitet"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Participating in Earth's conscious evolution",
          sv: "Delta i Jordens medvetna evolution"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Being one with existence",
          sv: "Vara ett med existensen"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Conflict Resolution
  {
    id: "conflict-2",
    text: {
      en: "How do you prefer to resolve interpersonal conflicts?",
      sv: "Hur föredrar du att lösa mellanmänskliga konflikter?"
    },
    type: "multiple-choice",
    category: "relationships",
    options: [
      {
        text: {
          en: "Ensure personal safety first",
          sv: "Säkerställa personlig säkerhet först"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Seek guidance from elders",
          sv: "Söka vägledning från äldre"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Stand up for myself forcefully",
          sv: "Stå upp för mig själv med kraft"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Follow proper dispute procedures",
          sv: "Följa korrekta tvistlösningsprocedurer"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Negotiate win-win solutions",
          sv: "Förhandla fram vinn-vinn-lösningar"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Share feelings and find harmony",
          sv: "Dela känslor och hitta harmoni"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Address underlying patterns",
          sv: "Hantera underliggande mönster"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Allow collective wisdom to guide resolution",
          sv: "Låta kollektiv visdom vägleda lösningen"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "See conflict as growth opportunity",
          sv: "Se konflikt som tillväxtmöjlighet"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Community and Belonging
  {
    id: "community-1",
    text: {
      en: "What defines a healthy community for you?",
      sv: "Vad kännetecknar ett hälsosamt samhälle för dig?"
    },
    type: "multiple-choice",
    category: "community",
    options: [
      {
        text: {
          en: "Everyone's basic needs are met",
          sv: "Allas grundläggande behov tillgodoses"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Strong cultural bonds and traditions",
          sv: "Starka kulturella band och traditioner"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Clear leadership and protection",
          sv: "Tydligt ledarskap och beskydd"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Order and moral standards",
          sv: "Ordning och moraliska standarder"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Opportunities for individual success",
          sv: "Möjligheter till individuell framgång"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Equality and inclusive dialogue",
          sv: "Jämlikhet och inkluderande dialog"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Functional integration of all systems",
          sv: "Funktionell integration av alla system"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Collective consciousness evolution",
          sv: "Kollektiv medvetandeutveckling"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Spontaneous expression of unity",
          sv: "Spontant uttryck för enhet"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Spirituality and Ultimate Meaning
  {
    id: "spirituality-1",
    text: {
      en: "What's your view on spirituality and ultimate reality?",
      sv: "Vad är din syn på andlighet och yttersta verklighet?"
    },
    type: "multiple-choice",
    category: "spirituality",
    options: [
      {
        text: {
          en: "Focus on physical reality and survival",
          sv: "Fokus på fysisk verklighet och överlevnad"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Connection with spirits and ancestors",
          sv: "Koppling till andar och förfäder"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Personal power and destiny",
          sv: "Personlig kraft och öde"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Divine order and eternal truth",
          sv: "Gudomlig ordning och evig sanning"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Scientific understanding of reality",
          sv: "Vetenskaplig förståelse av verkligheten"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Inner growth and shared experiences",
          sv: "Inre tillväxt och delade upplevelser"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Integration of multiple perspectives",
          sv: "Integration av flera perspektiv"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Universal interconnectedness",
          sv: "Universell sammankoppling"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Direct realization of non-dual reality",
          sv: "Direkt insikt i icke-dualistisk verklighet"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Power and Influence
  {
    id: "power-1",
    text: {
      en: "How do you view power and influence?",
      sv: "Hur ser du på makt och inflytande?"
    },
    type: "multiple-choice",
    category: "power",
    options: [
      {
        text: {
          en: "Necessary for basic survival",
          sv: "Nödvändigt för grundläggande överlevnad"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Flows from spiritual and traditional authority",
          sv: "Flödar från andlig och traditionell auktoritet"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Personal strength and dominance",
          sv: "Personlig styrka och dominans"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Derived from position and rules",
          sv: "Härledd från position och regler"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Based on competence and achievement",
          sv: "Baserad på kompetens och prestation"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Should be shared equally",
          sv: "Bör delas lika"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Natural result of understanding systems",
          sv: "Naturligt resultat av systemförståelse"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Emerges from wholeness and harmony",
          sv: "Uppstår ur helhet och harmoni"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Manifestation of universal flow",
          sv: "Manifestation av universellt flöde"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Human Nature
  {
    id: "human-nature-1",
    text: {
      en: "What's your view of human nature?",
      sv: "Vad är din syn på den mänskliga naturen?"
    },
    type: "multiple-choice",
    category: "worldview",
    options: [
      {
        text: {
          en: "Focused on survival instincts",
          sv: "Fokuserad på överlevnadsinstinkter"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Connected to spirits and mysteries",
          sv: "Kopplad till andar och mysterier"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Naturally competitive and powerful",
          sv: "Naturligt konkurrerande och kraftfull"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "In need of guidance and order",
          sv: "I behov av vägledning och ordning"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Rational and success-driven",
          sv: "Rationell och framgångsdriven"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Naturally cooperative and caring",
          sv: "Naturligt samarbetsvillig och omtänksam"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Complex and adaptively intelligent",
          sv: "Komplex och adaptivt intelligent"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Part of a living planetary system",
          sv: "Del av ett levande planetärt system"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Expression of universal consciousness",
          sv: "Uttryck för universellt medvetande"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  },

  // Uncertainty and Change
  {
    id: "uncertainty-1",
    text: {
      en: "How do you deal with uncertainty and major changes?",
      sv: "Hur hanterar du osäkerhet och stora förändringar?"
    },
    type: "multiple-choice",
    category: "adaptability",
    options: [
      {
        text: {
          en: "Focus on immediate safety",
          sv: "Fokusera på omedelbar säkerhet"
        },
        value: 1,
        relatedStages: ['beige']
      },
      {
        text: {
          en: "Rely on traditional wisdom",
          sv: "Förlita dig på traditionell visdom"
        },
        value: 1,
        relatedStages: ['purple']
      },
      {
        text: {
          en: "Take control and act decisively",
          sv: "Ta kontroll och agera beslutsamt"
        },
        value: 1,
        relatedStages: ['red']
      },
      {
        text: {
          en: "Follow established procedures",
          sv: "Följa etablerade procedurer"
        },
        value: 1,
        relatedStages: ['blue']
      },
      {
        text: {
          en: "Analyze and optimize solutions",
          sv: "Analysera och optimera lösningar"
        },
        value: 1,
        relatedStages: ['orange']
      },
      {
        text: {
          en: "Share and process with others",
          sv: "Dela och bearbeta med andra"
        },
        value: 1,
        relatedStages: ['green']
      },
      {
        text: {
          en: "Adapt based on systemic understanding",
          sv: "Anpassa baserat på systemisk förståelse"
        },
        value: 1,
        relatedStages: ['yellow']
      },
      {
        text: {
          en: "Flow with natural evolution",
          sv: "Flöda med naturlig evolution"
        },
        value: 1,
        relatedStages: ['turquoise']
      },
      {
        text: {
          en: "Rest in fundamental uncertainty",
          sv: "Vila i fundamental osäkerhet"
        },
        value: 1,
        relatedStages: ['coral']
      }
    ]
  }
];

// Create a proper Svelte store for managing quiz state
export const quizStore = writable({
  questions: [],
  currentIndex: 0,
  answers: {} as Record<string, any>,
  isLoading: false,
  hasStarted: false,
  language: 'en'
});

// Synchronize the quiz store with the language store
language.subscribe(lang => {
  quizStore.update(state => ({
    ...state,
    language: lang
  }));
});

// Helper functions that work with the store
export const quizActions = {
  startQuiz: () => {
    quizStore.update(state => ({
      ...state,
      hasStarted: true,
      isLoading: true
    }));
    
    // Simulate loading and randomize questions and their options
    setTimeout(() => {
      quizStore.update(state => ({
        ...state,
        questions: shuffleArray(questionsData).map(question => ({
          ...question,
          shuffledOptions: shuffleArray(question.options) // Shuffle options for each question
        })),
        isLoading: false
      }));
    }, 500);
  },

  setAnswer: (questionId: string, answer: any) => {
    quizStore.update(state => ({
      ...state,
      answers: {
        ...state.answers,
        [questionId]: answer
      }
    }));
  },

  nextQuestion: () => {
    quizStore.update(state => ({
      ...state,
      currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1)
    }));
  },

  previousQuestion: () => {
    quizStore.update(state => ({
      ...state,
      currentIndex: Math.max(state.currentIndex - 1, 0)
    }));
  },

  setLanguage: (language: 'en' | 'sv') => {
    quizStore.update(state => ({
      ...state,
      language
    }));
  },

  resetQuiz: () => {
    quizStore.set({
      questions: shuffleArray(questionsData),
      currentIndex: 0,
      answers: {},
      isLoading: false,
      hasStarted: false,
      language: 'en'
    });
  },

  // Helper function to get questions by category
  getQuestionsByCategory: (category: string) => {
    let state;
    quizStore.subscribe(s => state = s)();
    return state.questions.filter(q => q.category === category);
  },

  // Helper function to get a random question
  getRandomQuestion: () => {
    let state;
    quizStore.subscribe(s => state = s)();
    return state.questions[Math.floor(Math.random() * state.questions.length)];
  }
};
