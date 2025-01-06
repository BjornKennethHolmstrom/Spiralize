<script>
  import languageStore from '$lib/stores/languageStore';

  const { language, toggleLanguage } = languageStore; 

  $: currentLanguage = $language;

  const tips = [
    {
      stage: "Beige",
      tips: {
        en: [
          "Focus on survival basics: food, shelter, safety.",
          "Provide support for vulnerable individuals with compassion.",
          "Understand that survival needs dominate decision-making in this stage."
        ],
        sv: [
          "Fokusera på överlevnadsbehov: mat, skydd, säkerhet.",
          "Ge stöd till sårbara individer med medkänsla.",
          "Förstå att överlevnadsbehov dominerar beslutsfattandet i detta stadium."
        ]
      }
    },
    {
      stage: "Purple",
      tips: {
        en: [
          "Honor traditions and rituals that strengthen group identity.",
          "Create a sense of belonging through community activities.",
          "Be mindful of superstitions that may limit progress."
        ],
        sv: [
          "Hedra traditioner och ritualer som stärker gruppidentiteten.",
          "Skapa en känsla av tillhörighet genom gemenskapsaktiviteter.",
          "Var medveten om vidskepelser som kan hämma framsteg."
        ]
      }
    },
    {
      stage: "Red",
      tips: {
        en: [
          "Channel strong willpower into constructive leadership.",
          "Set boundaries to prevent dominance or exploitation.",
          "Recognize the importance of self-expression and personal power."
        ],
        sv: [
          "Kanaliser stark vilja till konstruktivt ledarskap.",
          "Sätt gränser för att förhindra dominans eller utnyttjande.",
          "Uppskatta vikten av självuttryck och personlig makt."
        ]
      }
    },
    {
      stage: "Blue",
      tips: {
        en: [
          "Follow rules and traditions to create stability.",
          "Focus on long-term goals over immediate gratification.",
          "Avoid rigid thinking that stifles innovation."
        ],
        sv: [
          "Följ regler och traditioner för att skapa stabilitet.",
          "Fokusera på långsiktiga mål framför omedelbar tillfredsställelse.",
          "Undvik stelbent tänkande som hämmar innovation."
        ]
      }
    },
    {
      stage: "Orange",
      tips: {
        en: [
          "Set ambitious goals and strive for measurable success.",
          "Embrace competition to drive innovation and progress.",
          "Be mindful of the impact of overemphasizing material gain."
        ],
        sv: [
          "Sätt ambitiösa mål och sträva efter mätbara framgångar.",
          "Omfamna konkurrens för att driva innovation och framsteg.",
          "Var medveten om påverkan av att överbetona materiell vinning."
        ]
      }
    },
    {
      stage: "Green",
      tips: {
        en: [
          "Foster empathy and inclusivity in personal and social contexts.",
          "Collaborate and build consensus to solve problems.",
          "Avoid becoming overly focused on group harmony at the expense of progress."
        ],
        sv: [
          "Främja empati och inkludering i personliga och sociala sammanhang.",
          "Samarbeta och bygg konsensus för att lösa problem.",
          "Undvik att bli för fokuserad på gruppharmoni på bekostnad av framsteg."
        ]
      }
    },
    {
      stage: "Yellow",
      tips: {
        en: [
          "Develop systems thinking to understand complex interconnections.",
          "Seek knowledge and adapt to changing environments.",
          "Balance intellectual exploration with actionable solutions."
        ],
        sv: [
          "Utveckla systemtänkande för att förstå komplexa samband.",
          "Sök kunskap och anpassa dig till föränderliga miljöer.",
          "Balansera intellektuell utforskning med praktiska lösningar."
        ]
      }
    },
    {
      stage: "Turquoise",
      tips: {
        en: [
          "Promote global unity and holistic understanding.",
          "Encourage collaborative efforts for planetary well-being.",
          "Focus on integration and transcendence of earlier stages."
        ],
        sv: [
          "Främja global enhet och holistisk förståelse.",
          "Uppmuntra samarbete för planetens välbefinnande.",
          "Fokusera på integration och transcendens av tidigare stadier."
        ]
      }
    }
  ];
</script>

<div class="insights-container max-w-4xl mx-auto p-6">
  <h1 class="text-3xl font-bold text-gray-800 mb-4">
    {currentLanguage === "en" ? "Practical Insights" : "Praktiska Insikter"}
  </h1>
  <p class="text-gray-600 mb-6">
    {currentLanguage === "en"
      ? "Find actionable tips for integrating Spiral Dynamics into your life."
      : "Hitta handfasta tips för att integrera Spiral Dynamics i ditt liv."}
  </p>

  <div class="tips-list space-y-6">
    {#each tips as { stage, tips }}
      <div class="tip-card bg-white shadow-sm rounded-lg p-4 border-l-4"
           style="border-color: var(--stage-color-{stage.toLowerCase()})">
        <h2 class="text-xl font-semibold text-gray-700 capitalize">{stage}</h2>
        <ul class="mt-2 space-y-2 text-gray-600">
          {#each tips[currentLanguage] as tip}
            <li class="list-disc pl-4">{tip}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>

<style>
  .insights-container {
    background-color: #f9fafb;
  }

  .tip-card:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  :global(:root) {
    --stage-color-beige: #e5d0ba;
    --stage-color-purple: #9b6b9e;
    --stage-color-red: #e25a53;
    --stage-color-blue: #4a72b2;
    --stage-color-orange: #ff7f27;
    --stage-color-green: #7ab55c;
    --stage-color-yellow: #ffd700;
    --stage-color-turquoise: #40e0d0;
  }
</style>
