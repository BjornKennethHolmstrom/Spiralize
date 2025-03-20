<script lang="ts">
  import { stages } from '$lib/data/stages';
  import languageStore from '$lib/stores/languageStore';

  export let selectedStages: string[] = [];
  export let compareMode: boolean = false;
  
  const { language } = languageStore;
  $: currentLanguage = $language;

  // Governance models mapped to Spiral Dynamics stages
  const governanceModels = {
    beige: {
      en: {
        name: "Survival Bands",
        description: "Small groups focused entirely on immediate survival needs with minimal formal governance.",
        characteristics: [
          "Leadership based on immediate survival utility",
          "Decision-making focused on immediate threats and opportunities",
          "Minimal long-term planning or formal structure"
        ],
        examples: [
          "Early hunter-gatherer groups",
          "Extreme survival situations",
          "Disaster aftermath temporary communities"
        ],
        strengths: [
          "Extreme adaptability to changing conditions",
          "Efficient resource allocation for survival",
          "Clear purpose and direction"
        ],
        limitations: [
          "Limited capacity for long-term planning",
          "Difficulty managing larger-scale coordination",
          "Vulnerability to environmental changes"
        ]
      },
      sv: {
        name: "Överlevnadsgrupper",
        description: "Små grupper helt fokuserade på omedelbara överlevnadsbehov med minimal formell styrning.",
        characteristics: [
          "Ledarskap baserat på omedelbar överlevnadsnytta",
          "Beslutsfattande fokuserat på omedelbara hot och möjligheter",
          "Minimal långsiktig planering eller formell struktur"
        ],
        examples: [
          "Tidiga jägar-samlargrupper",
          "Extrema överlevnadssituationer",
          "Tillfälliga samhällen efter katastrofer"
        ],
        strengths: [
          "Extrem anpassningsförmåga till föränderliga förhållanden",
          "Effektiv resursfördelning för överlevnad",
          "Tydligt syfte och riktning"
        ],
        limitations: [
          "Begränsad kapacitet för långsiktig planering",
          "Svårighet att hantera koordination i större skala",
          "Sårbarhet för miljöförändringar"
        ]
      }
    },
    purple: {
      en: {
        name: "Tribal Rule",
        description: "Governance based on ancestral traditions, kinship, and spiritual beliefs.",
        characteristics: [
          "Elder councils and chiefs as authority figures",
          "Decision-making guided by tradition and spiritual signs",
          "Strong emphasis on group cohesion and shared identity"
        ],
        examples: [
          "Indigenous tribal governance",
          "Extended family clan structures",
          "Religious communities with strong traditional elements"
        ],
        strengths: [
          "Strong social cohesion and group identity",
          "Preservation of traditional knowledge and practices",
          "Resilience through community support systems"
        ],
        limitations: [
          "Resistance to change and innovation",
          "Potential for superstition to override practical considerations",
          "Exclusion of outsiders and different perspectives"
        ]
      },
      sv: {
        name: "Stamstyre",
        description: "Styrning baserad på förfäders traditioner, släktskap och andliga övertygelser.",
        characteristics: [
          "Äldsteråd och hövdingar som auktoritetsfigurer",
          "Beslutsfattande väglett av tradition och andliga tecken",
          "Stark betoning på gruppsammanhållning och delad identitet"
        ],
        examples: [
          "Ursprungsbefolkningars stamstyrning",
          "Utvidgade familjeklansstrukturer",
          "Religiösa gemenskaper med starka traditionella element"
        ],
        strengths: [
          "Stark social sammanhållning och gruppidentitet",
          "Bevarande av traditionell kunskap och praktiker",
          "Motståndskraft genom gemenskapens stödsystem"
        ],
        limitations: [
          "Motstånd mot förändring och innovation",
          "Risk för att vidskeplighet åsidosätter praktiska överväganden",
          "Uteslutning av utomstående och olika perspektiv"
        ]
      }
    },
    red: {
      en: {
        name: "Authoritarian Rule",
        description: "Power-based governance where strength, dominance, and control determine leadership.",
        characteristics: [
          "Strong individual leaders or warlords",
          "Decisions made through command and control",
          "Loyalty and fear as primary social organizing principles"
        ],
        examples: [
          "Military dictatorships",
          "Feudal kingdoms",
          "Warlord territories"
        ],
        strengths: [
          "Rapid decision-making and implementation",
          "Clear chain of command and accountability",
          "Effective in crisis situations requiring immediate action"
        ],
        limitations: [
          "Vulnerable to leadership succession problems",
          "Suppression of innovation and diverse perspectives",
          "Exploitation and abuse of power"
        ]
      },
      sv: {
        name: "Auktoritärt Styre",
        description: "Maktbaserad styrning där styrka, dominans och kontroll avgör ledarskap.",
        characteristics: [
          "Starka individuella ledare eller krigsherrar",
          "Beslut fattas genom kommando och kontroll",
          "Lojalitet och rädsla som primära sociala organiseringsprinciper"
        ],
        examples: [
          "Militärdiktaturer",
          "Feodala kungariken",
          "Krigsherrsområden"
        ],
        strengths: [
          "Snabbt beslutsfattande och genomförande",
          "Tydlig befälsordning och ansvarsskyldighet",
          "Effektiv i krissituationer som kräver omedelbar handling"
        ],
        limitations: [
          "Sårbar för problem med ledarsuccession",
          "Undertryckande av innovation och olika perspektiv",
          "Exploatering och maktmissbruk"
        ]
      }
    },
    blue: {
      en: {
        name: "Rule of Law",
        description: "Order-based governance with clear hierarchies, rules, and established processes.",
        characteristics: [
          "Bureaucratic structures with defined roles",
          "Decision-making through established procedures",
          "Constitutional frameworks and legal codes"
        ],
        examples: [
          "Early democratic systems",
          "Theocracies",
          "Traditional monarchies with constitutional elements"
        ],
        strengths: [
          "Stability and predictability in governance",
          "Clear processes for dispute resolution",
          "Consistent application of principles across society"
        ],
        limitations: [
          "Rigidity and slow adaptation to changing conditions",
          "Bureaucratic inefficiency and red tape",
          "Can become disconnected from human needs"
        ]
      },
      sv: {
        name: "Lagstyre",
        description: "Ordningsbaserad styrning med tydliga hierarkier, regler och etablerade processer.",
        characteristics: [
          "Byråkratiska strukturer med definierade roller",
          "Beslutsfattande genom etablerade procedurer",
          "Konstitutionella ramverk och lagkoder"
        ],
        examples: [
          "Tidiga demokratiska system",
          "Teokratier",
          "Traditionella monarkier med konstitutionella element"
        ],
        strengths: [
          "Stabilitet och förutsägbarhet i styrning",
          "Tydliga processer för tvistlösning",
          "Konsekvent tillämpning av principer över hela samhället"
        ],
        limitations: [
          "Rigiditet och långsam anpassning till förändrade förhållanden",
          "Byråkratisk ineffektivitet och krångel",
          "Kan bli frånkopplad från mänskliga behov"
        ]
      }
    },
    orange: {
      en: {
        name: "Representative Democracy/Meritocracy",
        description: "Performance-based governance focused on achievement, innovation, and strategic competition.",
        characteristics: [
          "Elected representatives and expert advisors",
          "Decision-making based on strategic advantage and measurable outcomes",
          "Market mechanisms and competitive voting systems"
        ],
        examples: [
          "Modern liberal democracies",
          "Corporate governance models",
          "Technocratic systems"
        ],
        strengths: [
          "Innovation and adaptability to market forces",
          "Merit-based advancement and expertise utilization",
          "Effective resource allocation through competition"
        ],
        limitations: [
          "Inequality and winner-takes-all dynamics",
          "Short-term thinking focused on election cycles or quarterly results",
          "Environmental and social externalities"
        ]
      },
      sv: {
        name: "Representativ Demokrati/Meritokrati",
        description: "Prestationsbaserad styrning fokuserad på prestation, innovation och strategisk konkurrens.",
        characteristics: [
          "Valda representanter och expertrådsgivare",
          "Beslutsfattande baserat på strategiska fördelar och mätbara resultat",
          "Marknadsmekanismer och konkurrensutsatta röstningssystem"
        ],
        examples: [
          "Moderna liberala demokratier",
          "Företagsstyrningsmodeller",
          "Teknokratiska system"
        ],
        strengths: [
          "Innovation och anpassningsförmåga till marknadskrafter",
          "Meritbaserad avancemang och expertisanvändning",
          "Effektiv resursallokering genom konkurrens"
        ],
        limitations: [
          "Ojämlikhet och vinnaren-tar-allt-dynamik",
          "Kortsiktigt tänkande fokuserat på valcykler eller kvartalsresultat",
          "Miljömässiga och sociala externaliteter"
        ]
      }
    },
    green: {
      en: {
        name: "Participatory Democracy",
        description: "Egalitarian governance focused on inclusion, consensus, and shared wellbeing.",
        characteristics: [
          "Facilitated group processes for decision-making",
          "Focus on stakeholder inclusion and hearing all voices",
          "Emphasis on social justice and environmental responsibility"
        ],
        examples: [
          "Social democracies",
          "Cooperative governance models",
          "Consensus-based community systems"
        ],
        strengths: [
          "Inclusive processes that consider diverse perspectives",
          "Strong emphasis on equity and fairness",
          "Integration of social and environmental considerations"
        ],
        limitations: [
          "Decision processes can be slow and time-consuming",
          "Difficulty making tough decisions that impact some stakeholders negatively",
          "Can prioritize consensus over effectiveness"
        ]
      },
      sv: {
        name: "Deltagardemokrati",
        description: "Egalitär styrning fokuserad på inkludering, konsensus och delat välbefinnande.",
        characteristics: [
          "Faciliterade gruppprocesser för beslutsfattande",
          "Fokus på intressentinkludering och att höra alla röster",
          "Betoning på social rättvisa och miljöansvar"
        ],
        examples: [
          "Socialdemokratier",
          "Kooperativa styrningsmodeller",
          "Konsensusbaserade samhällssystem"
        ],
        strengths: [
          "Inkluderande processer som beaktar olika perspektiv",
          "Stark betoning på rättvisa och billighet",
          "Integration av sociala och miljömässiga överväganden"
        ],
        limitations: [
          "Beslutsprocesser kan vara långsamma och tidskrävande",
          "Svårigheter att fatta tuffa beslut som påverkar vissa intressenter negativt",
          "Kan prioritera konsensus över effektivitet"
        ]
      }
    },
    yellow: {
      en: {
        name: "Adaptive Governance",
        description: "Systems-based governance that flexibly integrates previous approaches based on context.",
        characteristics: [
          "Distributed leadership based on competence for specific challenges",
          "Decision-making through adaptive processes fitted to context",
          "Integration of efficiency and inclusivity principles"
        ],
        examples: [
          "Holacracy and other self-organization models",
          "Liquid democracy approaches",
          "Networked governance with flexible structures"
        ],
        strengths: [
          "Adaptability to changing conditions and contexts",
          "Integration of multiple governance approaches as needed",
          "Balance of effectiveness with inclusivity"
        ],
        limitations: [
          "Complexity can make systems difficult to understand",
          "Requires high cognitive capacity from participants",
          "May not work well in groups with diverse developmental levels"
        ]
      },
      sv: {
        name: "Adaptiv Styrning",
        description: "Systembaserad styrning som flexibelt integrerar tidigare tillvägagångssätt baserat på kontext.",
        characteristics: [
          "Distribuerat ledarskap baserat på kompetens för specifika utmaningar",
          "Beslutsfattande genom adaptiva processer anpassade till kontext",
          "Integration av effektivitets- och inkluderingsprinciper"
        ],
        examples: [
          "Holokrati och andra självorganiseringsmodeller",
          "Flytande demokratiansatser",
          "Nätverksstyrning med flexibla strukturer"
        ],
        strengths: [
          "Anpassningsförmåga till föränderliga förhållanden och kontexter",
          "Integration av flera styrningsmetoder efter behov",
          "Balans mellan effektivitet och inkludering"
        ],
        limitations: [
          "Komplexitet kan göra system svåra att förstå",
          "Kräver hög kognitiv kapacitet från deltagare",
          "Fungerar kanske inte bra i grupper med olika utvecklingsnivåer"
        ]
      }
    },
    turquoise: {
      en: {
        name: "Holistic Governance",
        description: "Global systems governance that balances unity and diversity on multiple scales.",
        characteristics: [
          "Leadership through embodiment of evolutionary purpose",
          "Decision-making that considers multi-generational and planetary impacts",
          "Balance of global consciousness with local autonomy"
        ],
        examples: [
          "Emerging global commons stewardship models",
          "Bioregional governance experiments",
          "Consciousness-oriented organizational ecosystems"
        ],
        strengths: [
          "Integration of long-term and global considerations",
          "Strong alignment with ecological and living systems",
          "Balance of individual expression with collective wellbeing"
        ],
        limitations: [
          "May appear abstract or impractical from earlier perspectives",
          "Challenging to implement in current institutional frameworks",
          "Requires significant consciousness development"
        ]
      },
      sv: {
        name: "Holistisk Styrning",
        description: "Global systemstyrning som balanserar enhet och mångfald på flera skalor.",
        characteristics: [
          "Ledarskap genom förkroppsligande av evolutionärt syfte",
          "Beslutsfattande som beaktar flergenerationella och planetära effekter",
          "Balans av globalt medvetande med lokal autonomi"
        ],
        examples: [
          "Framväxande modeller för global allmänningsförvaltning",
          "Bioregionala styrningsexperiment",
          "Medvetandeorienterade organisatoriska ekosystem"
        ],
        strengths: [
          "Integration av långsiktiga och globala överväganden",
          "Stark anpassning till ekologiska och levande system",
          "Balans av individuellt uttryck med kollektivt välbefinnande"
        ],
        limitations: [
          "Kan framstå som abstrakt eller opraktisk från tidigare perspektiv",
          "Utmanande att implementera i nuvarande institutionella ramverk",
          "Kräver betydande medvetandeutveckling"
        ]
      }
    },
    coral: {
      en: {
        name: "Sovereign Unity Governance",
        description: "Emergent coordination through individual sovereignty aligned with universal principles.",
        characteristics: [
          "Leadership as temporal facilitation of evolutionary potential",
          "Decision-making through resonance with evolutionary impulse",
          "Dynamic balance of radical autonomy with universal consciousness"
        ],
        examples: [
          "Prototype communities exploring consciousness-based coordination",
          "Global wisdom networks with distributed intelligence",
          "Emergent response systems for complex challenges"
        ],
        strengths: [
          "High adaptability to emergence and novelty",
          "Profound integration of individual creativity with collective wisdom",
          "Capacity to navigate unprecedented complexity"
        ],
        limitations: [
          "Requires highly developed individual consciousness",
          "Difficult to implement in conventional organizational contexts",
          "May be inaccessible to those at earlier developmental stages"
        ]
      },
      sv: {
        name: "Suverän Enhetsstyrning",
        description: "Framväxande koordination genom individuell suveränitet anpassad till universella principer.",
        characteristics: [
          "Ledarskap som temporär facilitering av evolutionär potential",
          "Beslutsfattande genom resonans med evolutionär impuls",
          "Dynamisk balans av radikal autonomi med universellt medvetande"
        ],
        examples: [
          "Prototypgemenskaper som utforskar medvetandebaserad koordination",
          "Globala visdomsnätverk med distribuerad intelligens",
          "Framväxande responssystem för komplexa utmaningar"
        ],
        strengths: [
          "Hög anpassningsförmåga till framväxt och nyhet",
          "Djup integration av individuell kreativitet med kollektiv visdom",
          "Förmåga att navigera tidigare exempellös komplexitet"
        ],
        limitations: [
          "Kräver högt utvecklat individuellt medvetande",
          "Svår att implementera i konventionella organisatoriska sammanhang",
          "Kan vara otillgänglig för de på tidigare utvecklingsstadier"
        ]
      }
    },
    ultraviolet: {
      en: {
        name: "Non-dual Governance",
        description: "Transcendence of governance through unified field of consciousness.",
        characteristics: [
          "Dissolution of formal leadership into dynamic collective intelligence",
          "Decision-making as spontaneous rightness in unified awareness",
          "Seamless flow between individual expression and collective wisdom"
        ],
        examples: [
          "Speculative models beyond current experience",
          "Moments of collective flow consciousness in high-functioning groups",
          "Non-dual spiritual communities with minimal formal structure"
        ],
        strengths: [
          "Transcendence of paradoxes and polarities",
          "Effortless coordination without formal structures",
          "Integration of infinite creativity with universal harmony"
        ],
        limitations: [
          "Beyond conceptual understanding from earlier stages",
          "Few, if any, existing models to reference",
          "Requires consciousness development rare in current humanity"
        ]
      },
      sv: {
        name: "Icke-dualistisk Styrning",
        description: "Transcendens av styrning genom ett enhetligt medvetandefält.",
        characteristics: [
          "Upplösning av formellt ledarskap till dynamisk kollektiv intelligens",
          "Beslutsfattande som spontan riktighet i förenad medvetenhet",
          "Sömlöst flöde mellan individuellt uttryck och kollektiv visdom"
        ],
        examples: [
          "Spekulativa modeller bortom nuvarande erfarenhet",
          "Ögonblick av kollektivt flödesmedvetande i högfungerande grupper",
          "Icke-dualistiska andliga gemenskaper med minimal formell struktur"
        ],
        strengths: [
          "Transcendens av paradoxer och polariteter",
          "Mödolös koordination utan formella strukturer",
          "Integration av oändlig kreativitet med universell harmoni"
        ],
        limitations: [
          "Bortom konceptuell förståelse från tidigare stadier",
          "Få, om några, existerande modeller att referera till",
          "Kräver medvetandeutveckling som är sällsynt i nuvarande mänsklighet"
        ]
      }
    }
  };

  // Available filter options for governance models
  const filterOptions = {
    en: [
      { id: "decision_speed", label: "Quick Decision Making" },
      { id: "inclusivity", label: "Inclusive Processes" },
      { id: "adaptability", label: "Adaptability to Change" },
      { id: "simplicity", label: "Simplicity/Accessibility" },
      { id: "long_term", label: "Long-Term Perspective" }
    ],
    sv: [
      { id: "decision_speed", label: "Snabbt Beslutsfattande" },
      { id: "inclusivity", label: "Inkluderande Processer" },
      { id: "adaptability", label: "Anpassningsförmåga" },
      { id: "simplicity", label: "Enkelhet/Tillgänglighet" },
      { id: "long_term", label: "Långsiktigt Perspektiv" }
    ]
  };

  // Helper function to get stage color
  function getStageColor(stage: string): string {
    return stages[stage]?.color || "#808080";
  }

  // Toggle selection of a stage
  function toggleStage(stage: string) {
    if (selectedStages.includes(stage)) {
      selectedStages = selectedStages.filter(s => s !== stage);
    } else {
      if (compareMode && selectedStages.length >= 2) {
        // In compare mode, limit to 2 selections
        selectedStages = [selectedStages[1], stage];
      } else {
        selectedStages = [...selectedStages, stage];
      }
    }
  }

  // Texts for interface
  const translations = {
    en: {
      select_stage: "Select a stage to view its governance model",
      compare_stages: "Compare governance models",
      filter_models: "Filter models by characteristics",
      characteristics: "Characteristics",
      examples: "Examples",
      strengths: "Strengths",
      limitations: "Limitations"
    },
    sv: {
      select_stage: "Välj ett stadium för att visa dess styrningsmodell",
      compare_stages: "Jämför styrningsmodeller",
      filter_models: "Filtrera modeller efter egenskaper",
      characteristics: "Egenskaper",
      examples: "Exempel",
      strengths: "Styrkor",
      limitations: "Begränsningar"
    }
  };

  $: t = translations[currentLanguage];
</script>

<div class="governance-explorer">
  <!-- Selection Interface -->
  <div class="mb-6">
    <h3 class="text-lg font-medium mb-4">{t.select_stage}</h3>
    
    <div class="flex flex-wrap gap-2">
      {#each Object.keys(governanceModels) as stage}
        <button
          class={`px-3 py-2 rounded text-sm font-medium ${selectedStages.includes(stage) ? 'text-white' : 'text-gray-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
          style={`background-color: ${selectedStages.includes(stage) ? getStageColor(stage) : getStageColor(stage) + '30'}`}
          on:click={() => toggleStage(stage)}
        >
          {stage.charAt(0).toUpperCase() + stage.slice(1)}
        </button>
      {/each}
    </div>
  </div>

  <!-- Display Selected Models -->
  <div class="space-y-6">
    {#if selectedStages.length === 0}
      <div class="text-center p-8 bg-gray-50 rounded-lg">
        <p class="text-gray-500">{t.select_stage}</p>
      </div>
    {:else if selectedStages.length === 1}
      <!-- Single Model View -->
      {#if governanceModels[selectedStages[0]]}
        {@const model = governanceModels[selectedStages[0]][currentLanguage]}
        {@const stage = selectedStages[0]}
        
        <div 
          class="p-6 rounded-lg" 
          style={`background-color: ${getStageColor(stage)}15; border-left: 4px solid ${getStageColor(stage)}`}
        >
          <h3 class="text-xl font-semibold mb-2">{stage.charAt(0).toUpperCase() + stage.slice(1)}: {model.name}</h3>
          <p class="text-gray-700 mb-4">{model.description}</p>
          
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 class="font-medium mb-2">{t.characteristics}</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-600">
                {#each model.characteristics as characteristic}
                  <li>{characteristic}</li>
                {/each}
              </ul>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">{t.examples}</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-600">
                {#each model.examples as example}
                  <li>{example}</li>
                {/each}
              </ul>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">{t.strengths}</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-600">
                {#each model.strengths as strength}
                  <li>{strength}</li>
                {/each}
              </ul>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">{t.limitations}</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-600">
                {#each model.limitations as limitation}
                  <li>{limitation}</li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      {/if}
    {:else}
      <!-- Comparison View -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              {#each selectedStages as stage}
                <th 
                  class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={`color: ${getStageColor(stage)}`}
                >
                  {stage.charAt(0).toUpperCase() + stage.slice(1)}: {governanceModels[stage][currentLanguage].name}
                </th>
              {/each}
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Description -->
            <tr>
              <td class="px-4 py-2 text-sm font-medium text-gray-700">Description</td>
              {#each selectedStages as stage}
                <td class="px-4 py-2 text-sm text-gray-600">
                  {governanceModels[stage][currentLanguage].description}
                </td>
              {/each}
            </tr>
            
            <!-- Characteristics -->
            <tr>
              <td class="px-4 py-2 text-sm font-medium text-gray-700">{t.characteristics}</td>
              {#each selectedStages as stage}
                <td class="px-4 py-2 text-sm text-gray-600">
                  <ul class="list-disc list-inside space-y-1">
                    {#each governanceModels[stage][currentLanguage].characteristics as characteristic}
                      <li>{characteristic}</li>
                    {/each}
                  </ul>
                </td>
              {/each}
            </tr>

            <!-- Examples -->
            <tr>
              <td class="px-4 py-2 text-sm font-medium text-gray-700">{t.examples}</td>
              {#each selectedStages as stage}
                <td class="px-4 py-2 text-sm text-gray-600">
                  <ul class="list-disc list-inside space-y-1">
                    {#each governanceModels[stage][currentLanguage].examples as example}
                      <li>{example}</li>
                    {/each}
                  </ul>
                </td>
              {/each}
            </tr>
            
            <!-- Strengths -->
            <tr>
              <td class="px-4 py-2 text-sm font-medium text-gray-700">{t.strengths}</td>
              {#each selectedStages as stage}
                <td class="px-4 py-2 text-sm text-gray-600">
                  <ul class="list-disc list-inside space-y-1">
                    {#each governanceModels[stage][currentLanguage].strengths as strength}
                      <li>{strength}</li>
                    {/each}
                  </ul>
                </td>
              {/each}
            </tr>
            
            <!-- Limitations -->
            <tr>
              <td class="px-4 py-2 text-sm font-medium text-gray-700">{t.limitations}</td>
              {#each selectedStages as stage}
                <td class="px-4 py-2 text-sm text-gray-600">
                  <ul class="list-disc list-inside space-y-1">
                    {#each governanceModels[stage][currentLanguage].limitations as limitation}
                      <li>{limitation}</li>
                    {/each}
                  </ul>
                </td>
              {/each}
            </tr>
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>
