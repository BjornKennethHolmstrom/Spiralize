<script lang="ts">
  import languageStore from '$lib/stores/languageStore';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // State variables
  let selectedScale: 'individual' | 'organization' | 'municipal' | 'global' = 'individual';
  let expandedGuide: string | null = null;

  // Translations
  const translations = {
    en: {
      title: "Implementation Guides",
      description: "Practical approaches for implementing more conscious governance at different scales",
      scales: {
        individual: "Individual",
        organization: "Organization",
        municipal: "Municipal/Regional",
        global: "National/Global"
      },
      coming_soon: "Detailed guides coming soon!",
      select_scale: "Select a scale to view implementation guides",
      scales_description: {
        individual: "Practices for individuals to develop governance consciousness",
        organization: "Approaches for evolving governance in teams and organizations",
        municipal: "Frameworks for more conscious local and regional governance",
        global: "Strategies for national and global governance evolution"
      },
      guide_types: {
        individual: [
          {
            title: "Personal Awareness Practices",
            description: "Techniques to develop your capacity to engage with governance systems.",
            practices: [
              {
                title: "Multi-Perspective Taking",
                description: "Practice seeing issues from multiple worldviews and developmental stages. Intentionally consider how individuals at different stages might approach a governance challenge.",
                steps: [
                  "Select a current political or governance issue",
                  "Write a paragraph describing how people at each stage might view the issue",
                  "Identify the perspectives that are most difficult for you to authentically understand",
                  "Practice 'inhabiting' those perspectives in meditation or journaling exercises"
                ]
              },
              {
                title: "Shadow Integration",
                description: "Work with aspects of governance systems that trigger strong reactions in you. These reactions often indicate shadow elements that, when integrated, can expand your capacity.",
                steps: [
                  "Identify governance forms or leaders that trigger strong negative reactions",
                  "Explore what these triggers say about your own values and unconscious biases",
                  "Find the partial truth or value in approaches you instinctively reject",
                  "Practice engaging constructively with people who hold these perspectives"
                ]
              },
              {
                title: "Developmental Self-Assessment",
                description: "Regularly reflect on how your own center of gravity influences your governance participation.",
                steps: [
                  "Take the Spiral Dynamics assessment to understand your general center of gravity",
                  "Reflect on how your development affects your governance participation",
                  "Identify your growing edges and blind spots",
                  "Create a personal development plan focused on expanding your governance capacity"
                ]
              }
            ]
          },
          {
            title: "Communication Skills",
            description: "Develop your ability to communicate effectively across developmental divides.",
            practices: [
              {
                title: "Trans-Stage Communication",
                description: "Practice communicating important issues in ways that resonate with different stages of development.",
                steps: [
                  "Select an important governance concept or proposal",
                  "Translate this concept into language that resonates with each stage",
                  "Test your translations with people centered at different stages",
                  "Refine your ability to 'speak the language' of multiple stages"
                ]
              },
              {
                title: "Developmental Listening",
                description: "Cultivate the ability to hear the developmental structure behind someone's communication.",
                steps: [
                  "Practice identifying the likely center of gravity in others' political statements",
                  "Listen for the values and concerns that motivate different positions",
                  "Practice reflecting back others' perspectives in their own developmental terms",
                  "Validate the authentic concerns at each stage before suggesting alternative views"
                ]
              }
            ]
          },
          {
            title: "Participatory Skills",
            description: "Develop practical capabilities for effective governance participation.",
            practices: [
              {
                title: "Constructive Disagreement",
                description: "Practice the art of disagreeing in ways that advance collective understanding rather than creating polarization.",
                steps: [
                  "When disagreeing, first acknowledge valid aspects of the other perspective",
                  "Express disagreement in terms of adding perspective rather than negating",
                  "Focus criticism on ideas rather than people or groups",
                  "Suggest alternatives that integrate multiple concerns"
                ]
              },
              {
                title: "Systems Literacy",
                description: "Develop your ability to understand complex governance systems.",
                steps: [
                  "Study systems thinking principles and frameworks",
                  "Practice mapping causal loops and feedback cycles in governance issues",
                  "Identify leverage points in systems where small changes might have large effects",
                  "Develop awareness of unintended consequences and emergence"
                ]
              }
            ]
          }
        ],
        organization: [
          {
            title: "Assessment Tools",
            description: "Frameworks for evaluating your organization's governance developmental level.",
            practices: [
              {
                title: "Governance Audit",
                description: "A structured process to assess your current governance system's center of gravity.",
                steps: [
                  "Survey leadership and stakeholders about governance practices",
                  "Map decision processes against developmental stages",
                  "Identify strengths, limitations, and growing edges",
                  "Create a developmental roadmap for governance evolution"
                ]
              },
              {
                title: "Decision Matrix Mapping",
                description: "Map different types of decisions to appropriate developmental approaches.",
                steps: [
                  "Categorize decisions by type (e.g., strategic, operational, crisis)",
                  "Identify which developmental approaches best serve each decision type",
                  "Create a decision rights framework that matches approach to context",
                  "Train team members in flexing between approaches"
                ]
              }
            ]
          },
          {
            title: "Design Processes",
            description: "Methods for evolving organizational governance systems.",
            practices: [
              {
                title: "Developmental Design",
                description: "Create governance structures that can evolve with organizational consciousness.",
                steps: [
                  "Assess the developmental readiness of key stakeholders",
                  "Design governance that meets people where they are while inviting growth",
                  "Create on-ramps for participation at multiple developmental levels",
                  "Build in feedback mechanisms that foster ongoing evolution"
                ]
              },
              {
                title: "Purpose-Centered Governance",
                description: "Evolve governance around evolutionary purpose rather than control.",
                steps: [
                  "Facilitate deep purpose discovery processes",
                  "Design governance structures that serve the organization's purpose",
                  "Implement sensing mechanisms to track purpose alignment",
                  "Create feedback cycles that allow governance to evolve with purpose"
                ]
              }
            ]
          },
          {
            title: "Implementation Strategies",
            description: "Approaches for successfully implementing more conscious governance.",
            practices: [
              {
                title: "Developmental Transition Management",
                description: "Manage the human dynamics of governance evolution.",
                steps: [
                  "Create psychological safety for governance experimentation",
                  "Communicate changes in ways that resonate with multiple stages",
                  "Provide supportive structures during transition periods",
                  "Balance challenge and support during developmental stretches"
                ]
              },
              {
                title: "Prototype-to-Practice Methodology",
                description: "Evolve governance through experimentation and iterative learning.",
                steps: [
                  "Identify clear governance challenges or opportunities",
                  "Design small-scale experiments with new approaches",
                  "Gather feedback and measure impact",
                  "Scale successful prototypes and integrate learnings"
                ]
              }
            ]
          }
        ],
        municipal: [
          {
            title: "Local Governance Evolution",
            description: "Approaches for evolving municipal and regional governance.",
            practices: [
              {
                title: "Developmental Community Assessment",
                description: "Map the developmental landscape in your community.",
                steps: [
                  "Survey community members to understand values distribution",
                  "Identify dominant governance cultures in different sectors",
                  "Map governance challenges to developmental dynamics",
                  "Create a developmental strategy for community evolution"
                ]
              },
              {
                title: "Multi-Stage Participation Design",
                description: "Create participation processes that engage citizens at multiple developmental levels.",
                steps: [
                  "Design participation formats that resonate with different stages",
                  "Create clear value propositions for participation at each stage",
                  "Train facilitators in developmental dynamics",
                  "Implement feedback processes that inform ongoing design"
                ]
              }
            ]
          },
          {
            title: "Municipal Governance Innovation",
            description: "Frameworks for evolving formal governance structures.",
            practices: [
              {
                title: "Integral Policy Development",
                description: "Craft policies that integrate multiple developmental perspectives.",
                steps: [
                  "Map stakeholder concerns from multiple developmental perspectives",
                  "Design policies that address authentic concerns at each stage",
                  "Create mechanisms for policy evolution over time",
                  "Communicate policies in ways that resonate across stages"
                ]
              },
              {
                title: "Place-Based Governance",
                description: "Develop governance approaches attuned to bioregional and local contexts.",
                steps: [
                  "Map the natural and cultural uniqueness of place",
                  "Identify governance forms that honor local context",
                  "Create appropriate connections between bioregional and political structures",
                  "Develop nested governance forms for appropriate scale"
                ]
              }
            ]
          }
        ],
        global: [
          {
            title: "Transnational Approaches",
            description: "Frameworks for evolving governance beyond national boundaries.",
            practices: [
              {
                title: "Global Commons Governance",
                description: "Approaches for governing shared global resources and systems.",
                steps: [
                  "Identify key global commons requiring governance",
                  "Map stakeholder interests across developmental stages",
                  "Design governance structures with appropriate representation",
                  "Create mechanisms for evolutionary adaptation"
                ]
              },
              {
                title: "Nested Sovereignty Frameworks",
                description: "Develop approaches that honor sovereignty at multiple scales.",
                steps: [
                  "Map decision domains appropriate to different scales",
                  "Design governance interfaces between scales",
                  "Create mechanisms for resolving cross-scale tensions",
                  "Implement feedback loops across governance layers"
                ]
              }
            ]
          },
          {
            title: "Global Citizenship Development",
            description: "Approaches for fostering global governance identity and participation.",
            practices: [
              {
                title: "Global Consciousness Education",
                description: "Foster awareness and identity that transcends national boundaries.",
                steps: [
                  "Develop educational approaches that foster global awareness",
                  "Create opportunities for transnational collaboration and exchange",
                  "Build cultural bridges that highlight universal human values",
                  "Support media initiatives that foster planetary consciousness"
                ]
              },
              {
                title: "Global Participation Structures",
                description: "Create mechanisms for meaningful citizen participation in global governance.",
                steps: [
                  "Design multi-stage participation approaches",
                  "Create clear connection between participation and governance outcomes",
                  "Leverage technology for global-scale deliberation",
                  "Build developmental support for diverse participation"
                ]
              }
            ]
          }
        ]
      }
    },
    sv: {
      title: "Implementeringsguider",
      description: "Praktiska metoder för att implementera mer medveten styrning på olika skalor",
      scales: {
        individual: "Individuell",
        organization: "Organisation",
        municipal: "Kommunal/Regional",
        global: "Nationell/Global"
      },
      coming_soon: "Detaljerade guider kommer snart!",
      select_scale: "Välj en skala för att visa implementeringsguider",
      scales_description: {
        individual: "Praktiker för individer att utveckla styrningsmedvetenhet",
        organization: "Tillvägagångssätt för att utveckla styrning i team och organisationer",
        municipal: "Ramverk för mer medveten lokal och regional styrning",
        global: "Strategier för nationell och global styrningsevolution"
      },
      guide_types: {
        individual: [
          {
            title: "Personliga Medvetenhetspraktiker",
            description: "Tekniker för att utveckla din förmåga att engagera dig i styrningssystem.",
            practices: [
              {
                title: "Multiperspektivtagande",
                description: "Öva på att se frågor från flera världsbilder och utvecklingsstadier. Överväg avsiktligt hur individer på olika stadier kan närma sig en styrningsutmaning.",
                steps: [
                  "Välj en aktuell politisk eller styrningsfråga",
                  "Skriv ett stycke som beskriver hur människor på varje stadium kan se på frågan",
                  "Identifiera de perspektiv som är svårast för dig att autentiskt förstå",
                  "Öva på att 'bebo' dessa perspektiv i meditation eller dagboksövningar"
                ]
              },
              {
                title: "Skuggintegration",
                description: "Arbeta med aspekter av styrningssystem som utlöser starka reaktioner hos dig. Dessa reaktioner indikerar ofta skuggelement som, när de integreras, kan utvidga din kapacitet.",
                steps: [
                  "Identifiera styrningsformer eller ledare som utlöser starka negativa reaktioner",
                  "Utforska vad dessa triggers säger om dina egna värderingar och omedvetna fördomar",
                  "Hitta den partiella sanningen eller värdet i metoder du instinktivt avvisar",
                  "Öva på att engagera dig konstruktivt med människor som har dessa perspektiv"
                ]
              },
              {
                title: "Utvecklingsmässig Självbedömning",
                description: "Reflektera regelbundet över hur ditt eget gravitationscentrum påverkar ditt styrningsdeltagande.",
                steps: [
                  "Ta Spiral Dynamics-bedömningen för att förstå ditt allmänna gravitationscentrum",
                  "Reflektera över hur din utveckling påverkar ditt styrningsdeltagande",
                  "Identifiera dina växande kanter och blinda fläckar",
                  "Skapa en personlig utvecklingsplan fokuserad på att utvidga din styrningskapacitet"
                ]
              }
            ]
          },
          {
            title: "Kommunikationsfärdigheter",
            description: "Utveckla din förmåga att kommunicera effektivt över utvecklingsklyftor.",
            practices: [
              {
                title: "Trans-stadium Kommunikation",
                description: "Öva på att kommunicera viktiga frågor på sätt som resonerar med olika utvecklingsstadier.",
                steps: [
                  "Välj ett viktigt styrningskoncept eller förslag",
                  "Översätt detta koncept till språk som resonerar med varje stadium",
                  "Testa dina översättningar med människor centrerade på olika stadier",
                  "Förfina din förmåga att 'tala språket' för flera stadier"
                ]
              },
              {
                title: "Utvecklingsmässigt Lyssnande",
                description: "Odla förmågan att höra den utvecklingsmässiga strukturen bakom någons kommunikation.",
                steps: [
                  "Öva på att identifiera det troliga gravitationscentrumet i andras politiska uttalanden",
                  "Lyssna efter värderingar och bekymmer som motiverar olika positioner",
                  "Öva på att återspegla andras perspektiv i deras egna utvecklingsmässiga termer",
                  "Validera de autentiska bekymren på varje stadium innan du föreslår alternativa synvinklar"
                ]
              }
            ]
          },
          {
            title: "Deltagandefärdigheter",
            description: "Utveckla praktiska förmågor för effektivt styrningsdeltagande.",
            practices: [
              {
                title: "Konstruktiv Oenighet",
                description: "Öva konsten att vara oenig på sätt som främjar kollektiv förståelse snarare än att skapa polarisering.",
                steps: [
                  "När du är oenig, erkänn först giltiga aspekter av det andra perspektivet",
                  "Uttryck oenighet i termer av att lägga till perspektiv snarare än att förneka",
                  "Fokusera kritik på idéer snarare än människor eller grupper",
                  "Föreslå alternativ som integrerar flera bekymmer"
                ]
              },
              {
                title: "Systemkunnighet",
                description: "Utveckla din förmåga att förstå komplexa styrningssystem.",
                steps: [
                  "Studera systemtänkandets principer och ramverk",
                  "Öva på att kartlägga orsakssamband och återkopplingscykler i styrningsfrågor",
                  "Identifiera hävstångspunkter i system där små förändringar kan ha stora effekter",
                  "Utveckla medvetenhet om oavsiktliga konsekvenser och framväxt"
                ]
              }
            ]
          }
        ],
        organization: [
          {
            title: "Bedömningsverktyg",
            description: "Ramverk för att utvärdera din organisations styrningsutvecklingsnivå.",
            practices: [
              {
                title: "Styrningsrevision",
                description: "En strukturerad process för att bedöma ditt nuvarande styrningssystems gravitationscentrum.",
                steps: [
                  "Undersök ledarskap och intressenter om styrningspraxis",
                  "Kartlägg beslutsprocesser mot utvecklingsstadier",
                  "Identifiera styrkor, begränsningar och växande kanter",
                  "Skapa en utvecklingsfärdplan för styrningsevolution"
                ]
              },
              {
                title: "Beslutsmatriskartering",
                description: "Kartlägg olika typer av beslut till lämpliga utvecklingsapproacher.",
                steps: [
                  "Kategorisera beslut efter typ (t.ex. strategiska, operativa, kris)",
                  "Identifiera vilka utvecklingsapproacher som bäst tjänar varje beslutstyp",
                  "Skapa ett beslutsrättsramverk som matchar approach med kontext",
                  "Träna teammedlemmar i att flexa mellan approacher"
                ]
              }
            ]
          },
          {
            title: "Designprocesser",
            description: "Metoder för att utveckla organisatoriska styrningssystem.",
            practices: [
              {
                title: "Utvecklingsmässig Design",
                description: "Skapa styrningsstrukturer som kan utvecklas med organisatoriskt medvetande.",
                steps: [
                  "Bedöm utvecklingsberedskapen hos nyckelintressenter",
                  "Designa styrning som möter människor där de är medan tillväxt inbjuds",
                  "Skapa uppfarter för deltagande på flera utvecklingsnivåer",
                  "Bygg in återkopplingsmekanismer som främjar kontinuerlig evolution"
                ]
              },
              {
                title: "Syftescentrerad Styrning",
                description: "Utveckla styrning kring evolutionärt syfte snarare än kontroll.",
                steps: [
                  "Underlätta djupa syftesupptäcktsprocesser",
                  "Designa styrningsstrukturer som tjänar organisationens syfte",
                  "Implementera känslighetsmekanismer för att spåra syftesanpassning",
                  "Skapa återkopplingscykler som tillåter styrning att utvecklas med syfte"
                ]
              }
            ]
          },
          {
            title: "Implementeringsstrategier",
            description: "Tillvägagångssätt för att framgångsrikt implementera mer medveten styrning.",
            practices: [
              {
                title: "Utvecklingsmässig Övergångshantering",
                description: "Hantera mänskliga dynamik av styrningsevolution.",
                steps: [
                  "Skapa psykologisk säkerhet för styrningsexperimentering",
                  "Kommunicera ändringar på sätt som resonerar med flera stadier",
                  "Tillhandahåll stödjande strukturer under övergångsperioder",
                  "Balansera utmaning och stöd under utvecklingssträckningar"
                ]
              },
              {
                title: "Prototyp-till-praktik Metodik",
                description: "Utveckla styrning genom experimentering och iterativt lärande.",
                steps: [
                  "Identifiera tydliga styrningsutmaningar eller möjligheter",
                  "Designa småskaliga experiment med nya tillvägagångssätt",
                  "Samla feedback och mät påverkan",
                  "Skala framgångsrika prototyper och integrera lärdomar"
                ]
              }
            ]
          }
        ],
        municipal: [
          {
            title: "Lokal Styrningsevolution",
            description: "Tillvägagångssätt för att utveckla kommunal och regional styrning.",
            practices: [
              {
                title: "Utvecklingsmässig Gemenskapsbedömning",
                description: "Kartlägg det utvecklingsmässiga landskapet i din gemenskap.",
                steps: [
                  "Undersök gemenskapsmedlemmar för att förstå värderingsfördelning",
                  "Identifiera dominerande styrningskulturer i olika sektorer",
                  "Kartlägg styrningsutmaningar till utvecklingsdynamik",
                  "Skapa en utvecklingsstrategi för gemenskapsutveckling"
                ]
              },
              {
                title: "Multi-stadium Deltagandedesign",
                description: "Skapa deltagandeprocesser som engagerar medborgare på flera utvecklingsnivåer.",
                steps: [
                  "Designa deltagandeformat som resonerar med olika stadier",
                  "Skapa tydliga värdeerbjudanden för deltagande på varje stadium",
                  "Träna facilitatorer i utvecklingsdynamik",
                  "Implementera återkopplingsprocesser som informerar pågående design"
                ]
              }
            ]
          },
          {
            title: "Kommunal Styrningsinnovation",
            description: "Ramverk för att utveckla formella styrningsstrukturer.",
            practices: [
              {
                title: "Integrerad Policyutveckling",
                description: "Utforma policyer som integrerar flera utvecklingsperspektiv.",
                steps: [
                  "Kartlägg intressentbekymmer från flera utvecklingsperspektiv",
                  "Utforma policyer som adresserar autentiska bekymmer på varje stadium",
                  "Skapa mekanismer för policyutveckling över tid",
                  "Kommunicera policyer på sätt som resonerar över stadier"
                ]
              },
              {
                title: "Platsbaserad Styrning",
                description: "Utveckla styrningsmetoder anpassade till bioregionala och lokala sammanhang.",
                steps: [
                  "Kartlägg platsens naturliga och kulturella unicitet",
                  "Identifiera styrningsformer som hedrar lokalt sammanhang",
                  "Skapa lämpliga kopplingar mellan bioregionala och politiska strukturer",
                  "Utveckla inbäddade styrningsformer för lämplig skala"
                ]
              }
            ]
          }
        ],
        global: [
          {
            title: "Transnationella Tillvägagångssätt",
            description: "Ramverk för att utveckla styrning bortom nationella gränser.",
            practices: [
              {
                title: "Global Allmänningsstyrning",
                description: "Metoder för att styra delade globala resurser och system.",
                steps: [
                  "Identifiera viktiga globala allmänningar som kräver styrning",
                  "Kartlägg intressentintressen över utvecklingsstadier",
                  "Designa styrningsstrukturer med lämplig representation",
                  "Skapa mekanismer för evolutionär anpassning"
                ]
              },
              {
                title: "Inbäddade Suveränitetsramverk",
                description: "Utveckla metoder som hedrar suveränitet på flera skalor.",
                steps: [
                  "Kartlägg beslutsdomäner lämpliga för olika skalor",
                  "Designa styrningsgränssnitt mellan skalor",
                  "Skapa mekanismer för att lösa spänningar mellan skalor",
                  "Implementera återkopplingsloopar över styrningslager"
                ]
              }
            ]
          },
          {
            title: "Global Medborgarskapsutveckling",
            description: "Metoder för att främja global styrningsidentitet och deltagande.",
            practices: [
              {
                title: "Global Medvetenhetsutbildning",
                description: "Främja medvetenhet och identitet som transcenderar nationella gränser.",
                steps: [
                  "Utveckla utbildningsmetoder som främjar global medvetenhet",
                  "Skapa möjligheter för transnationellt samarbete och utbyte",
                  "Bygg kulturella broar som framhäver universella mänskliga värderingar",
                  "Stöd mediainitiativ som främjar planetärt medvetande"
                ]
              },
              {
                title: "Globala Deltagandestrukturer",
                description: "Skapa mekanismer för meningsfullt medborgardeltagande i global styrning.",
                steps: [
                  "Designa multi-stadium deltagandeapproacher",
                  "Skapa tydlig koppling mellan deltagande och styrningsresultat",
                  "Utnyttja teknologi för överläggning i global skala",
                  "Bygg utvecklingsstöd för mångfaldigt deltagande"
                ]
              }
            ]
          }
        ]
      }
    }
  };

  $: t = translations[currentLanguage];
  $: selectedGuides = t.guide_types[selectedScale];

  // Toggle expanded guide
  function toggleGuide(guideId: string) {
    if (expandedGuide === guideId) {
      expandedGuide = null;
    } else {
      expandedGuide = guideId;
    }
  }
</script>

<div class="implementation-guides">
  <div class="mb-8">
    <h2 class="text-xl font-semibold mb-2">{t.title}</h2>
    <p class="text-gray-600">{t.description}</p>
  </div>
  
  <!-- Scale Selection Tabs -->
  <div class="mb-6">
    <div class="border-b border-gray-200">
      <nav class="flex space-x-4 overflow-x-auto" aria-label="Tabs">
        {#each Object.entries(t.scales) as [scale, label]}
          <button
            class={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${selectedScale === scale ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            on:click={() => selectedScale = scale as any}
          >
            {label}
          </button>
        {/each}
      </nav>
    </div>
  </div>
  
  <!-- Scale Description -->
  <div class="mb-6 bg-gray-50 p-4 rounded-lg">
    <p class="text-gray-600">{t.scales_description[selectedScale]}</p>
  </div>
  
  <!-- Guide Content -->
  <div class="space-y-6">
    {#if selectedGuides && selectedGuides.length > 0}
      {#each selectedGuides as guideType, i}
        <div class="bg-white border rounded-lg overflow-hidden">
          <div 
            class="p-4 cursor-pointer hover:bg-gray-50"
            on:click={() => toggleGuide(`${selectedScale}-${i}`)}
          >
            <div class="flex justify-between items-center">
              <h3 class="font-medium">{guideType.title}</h3>
              <svg
                class={`w-5 h-5 transition-transform duration-200 ${expandedGuide === `${selectedScale}-${i}` ? 'transform rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <p class="text-sm text-gray-600 mt-1">{guideType.description}</p>
          </div>
          
          {#if expandedGuide === `${selectedScale}-${i}`}
            <div class="border-t border-gray-200 p-4 bg-gray-50">
              {#each guideType.practices as practice, j}
                <div class="mb-4 last:mb-0">
                  <h4 class="font-medium text-purple-700">{practice.title}</h4>
                  <p class="text-sm text-gray-600 mt-1 mb-2">{practice.description}</p>
                  
                  {#if practice.steps && practice.steps.length > 0}
                    <div class="ml-4 mt-3">
                      <h5 class="text-xs font-medium uppercase text-gray-500 mb-2">Implementation Steps</h5>
                      <ol class="list-decimal list-inside space-y-1 text-sm">
                        {#each practice.steps as step}
                          <li class="text-gray-700">{step}</li>
                        {/each}
                      </ol>
                    </div>
                  {/if}
                </div>
                {#if j < guideType.practices.length - 1}
                  <div class="border-b border-gray-200 my-4"></div>
                {/if}
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    {:else}
      <div class="text-center p-8 bg-gray-50 rounded-lg">
        <p class="text-gray-500">{t.coming_soon}</p>
      </div>
    {/if}
  </div>
</div>
