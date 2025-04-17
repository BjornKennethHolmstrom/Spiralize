<script lang="ts">
  import languageStore from '$lib/stores/languageStore';
  import { stages } from '$lib/data/stages';
  import { createEventDispatcher } from 'svelte';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // State variables
  let selectedPrimary: string | null = null;
  let selectedSecondary: string | null = null;

  const dispatch = createEventDispatcher();

  // Helper function to get stage color
  function getStageColor(stageId: string): string {
    const stageObj = stages.find(s => s.id === stageId);
    return stageObj?.hex || "#808080";
  }

  // Governance models mapped to Spiral Dynamics stages
  const governanceModels = {
    beige: {
      en: {
        name: "Survival Bands",
        focus: "Immediate survival needs",
        approach: "Minimal leadership based on survival utility"
      },
      sv: {
        name: "Överlevnadsgrupper",
        focus: "Omedelbara överlevnadsbehov",
        approach: "Minimalt ledarskap baserat på överlevnadsnytta"
      }
    },
    purple: {
      en: {
        name: "Tribal Rule",
        focus: "Group cohesion and traditions",
        approach: "Elders and chiefs guided by tradition and spiritual beliefs"
      },
      sv: {
        name: "Stamstyre",
        focus: "Gruppsammanhållning och traditioner",
        approach: "Äldste och hövdingar vägledda av tradition och andliga övertygelser"
      }
    },
    red: {
      en: {
        name: "Authoritarian Rule",
        focus: "Power and dominance",
        approach: "Strong individual leaders using command and control"
      },
      sv: {
        name: "Auktoritärt Styre",
        focus: "Makt och dominans",
        approach: "Starka individuella ledare med kommando och kontroll"
      }
    },
    blue: {
      en: {
        name: "Rule of Law",
        focus: "Order and moral purpose",
        approach: "Hierarchical bureaucracy with established procedures"
      },
      sv: {
        name: "Lagstyre",
        focus: "Ordning och moraliskt syfte",
        approach: "Hierarkisk byråkrati med etablerade procedurer"
      }
    },
    orange: {
      en: {
        name: "Representative Democracy",
        focus: "Achievement and innovation",
        approach: "Elected representatives with strategic decision-making"
      },
      sv: {
        name: "Representativ Demokrati",
        focus: "Prestation och innovation",
        approach: "Valda representanter med strategiskt beslutsfattande"
      }
    },
    green: {
      en: {
        name: "Participatory Democracy",
        focus: "Equality and inclusion",
        approach: "Facilitated group processes for consensus"
      },
      sv: {
        name: "Deltagardemokrati",
        focus: "Jämlikhet och inkludering",
        approach: "Faciliterade gruppprocesser för konsensus"
      }
    },
    yellow: {
      en: {
        name: "Adaptive Governance",
        focus: "Systemic functionality",
        approach: "Distributed leadership based on competence and context"
      },
      sv: {
        name: "Adaptiv Styrning",
        focus: "Systemisk funktionalitet",
        approach: "Distribuerat ledarskap baserat på kompetens och kontext"
      }
    },
    turquoise: {
      en: {
        name: "Holistic Governance",
        focus: "Evolutionary purpose",
        approach: "Decision-making for planetary wellbeing across generations"
      },
      sv: {
        name: "Holistisk Styrning",
        focus: "Evolutionärt syfte",
        approach: "Beslutsfattande för planetärt välbefinnande över generationer"
      }
    },
    coral: {
      en: {
        name: "Sovereign Unity",
        focus: "Individual sovereignty within universal harmony",
        approach: "Emergent coordination through evolutionary resonance"
      },
      sv: {
        name: "Suverän Enhet",
        focus: "Individuell suveränitet inom universell harmoni",
        approach: "Framväxande koordination genom evolutionär resonans"
      }
    },
    ultraviolet: {
      en: {
        name: "Non-dual Governance",
        focus: "Unified field of consciousness",
        approach: "Dissolution of formal structures into spontaneous rightness"
      },
      sv: {
        name: "Icke-dualistisk Styrning",
        focus: "Enhetligt medvetandefält",
        approach: "Upplösning av formella strukturer till spontan riktighet"
      }
    }
  };

  // Matrix of interaction patterns between governance types
  const interactionMatrix = {
    "beige-purple": {
      en: "Tribal structures provide security for survival needs while maintaining traditional ways.",
      sv: "Stamstrukturer ger säkerhet för överlevnadsbehov medan traditionella sätt bevaras."
    },
    "beige-red": {
      en: "Authoritarian leadership provides protection in exchange for loyalty and resources.",
      sv: "Auktoritärt ledarskap ger skydd i utbyte mot lojalitet och resurser."
    },
    "beige-blue": {
      en: "Rule-based systems create predictable environments for meeting basic needs.",
      sv: "Regelbaserade system skapar förutsägbara miljöer för att möta grundläggande behov."
    },
    "beige-orange": {
      en: "Market systems efficiently distribute resources but may neglect those unable to compete.",
      sv: "Marknadssystem fördelar resurser effektivt men kan försumma de som inte kan konkurrera."
    },
    "beige-green": {
      en: "Participatory systems ensure inclusion of all members' basic needs.",
      sv: "Deltagande system säkerställer inkludering av alla medlemmars grundläggande behov."
    },
    "beige-yellow": {
      en: "Adaptive systems can flex to address survival challenges at appropriate scales.",
      sv: "Adaptiva system kan anpassa sig för att hantera överlevnadsutmaningar på lämpliga skalor."
    },
    "beige-turquoise": {
      en: "Holistic governance connects immediate survival to planetary wellbeing.",
      sv: "Holistisk styrning kopplar omedelbar överlevnad till planetärt välbefinnande."
    },
    "purple-red": {
      en: "Strong leaders emerge from tribal context, sometimes challenging and sometimes reinforcing traditions.",
      sv: "Starka ledare växer fram från stamkontext, ibland utmanande och ibland förstärkande traditioner."
    },
    "purple-blue": {
      en: "Traditional values become codified into formal laws and structures.",
      sv: "Traditionella värderingar blir kodifierade i formella lagar och strukturer."
    },
    "purple-orange": {
      en: "Market forces often disrupt traditional practices, creating cultural tension.",
      sv: "Marknadskrafter stör ofta traditionella praktiker, vilket skapar kulturell spänning."
    },
    "purple-green": {
      en: "Inclusive approaches honor diverse traditions while seeking common ground.",
      sv: "Inkluderande metoder hedrar olika traditioner samtidigt som man söker gemensam grund."
    },
    "purple-yellow": {
      en: "Adaptive systems can integrate traditional wisdom within flexible frameworks.",
      sv: "Adaptiva system kan integrera traditionell visdom inom flexibla ramverk."
    },
    "purple-turquoise": {
      en: "Ancient wisdom becomes integrated with planetary consciousness.",
      sv: "Uråldrig visdom integreras med planetärt medvetande."
    },
    "red-blue": {
      en: "Power dynamics become structured within legal frameworks and hierarchies.",
      sv: "Maktdynamik struktureras inom juridiska ramar och hierarkier."
    },
    "red-orange": {
      en: "Raw power transforms into strategic competition within market systems.",
      sv: "Rå kraft omvandlas till strategisk konkurrens inom marknadssystem."
    },
    "red-green": {
      en: "Facilitated processes try to balance strong voices with equal participation.",
      sv: "Faciliterade processer försöker balansera starka röster med lika deltagande."
    },
    "red-yellow": {
      en: "Power dynamics are understood systemically and channeled toward appropriate contexts.",
      sv: "Maktdynamik förstås systemiskt och kanaliseras mot lämpliga sammanhang."
    },
    "red-turquoise": {
      en: "Vital energy becomes directed toward evolutionary purposes.",
      sv: "Vital energi riktas mot evolutionära syften."
    },
    "blue-orange": {
      en: "Rule-based structures provide frameworks for strategic innovation and competition.",
      sv: "Regelbaserade strukturer tillhandahåller ramar för strategisk innovation och konkurrens."
    },
    "blue-green": {
      en: "Inclusive processes seek to reform rigid structures toward greater equity.",
      sv: "Inkluderande processer strävar efter att reformera stela strukturer mot större rättvisa."
    },
    "blue-yellow": {
      en: "Principled frameworks become more adaptive while maintaining core values.",
      sv: "Principiella ramverk blir mer adaptiva samtidigt som kärnvärden upprätthålls."
    },
    "blue-turquoise": {
      en: "Moral principles expand to include global systems and future generations.",
      sv: "Moraliska principer expanderar för att inkludera globala system och framtida generationer."
    },
    "orange-green": {
      en: "Strategic innovation becomes balanced with stakeholder inclusion and social responsibility.",
      sv: "Strategisk innovation balanseras med intressentinkludering och socialt ansvar."
    },
    "orange-yellow": {
      en: "Competitive approaches integrate with systemic understanding for greater effectiveness.",
      sv: "Konkurrenskraftiga metoder integreras med systemförståelse för större effektivitet."
    },
    "orange-turquoise": {
      en: "Achievement orientation becomes aligned with evolutionary purpose and planetary wellbeing.",
      sv: "Prestationsinriktning blir anpassad till evolutionärt syfte och planetärt välbefinnande."
    },
    "green-yellow": {
      en: "Inclusive processes become more effective through systemic design and adaptive approaches.",
      sv: "Inkluderande processer blir mer effektiva genom systemdesign och adaptiva metoder."
    },
    "green-turquoise": {
      en: "Community wellbeing expands to include planetary consciousness and evolutionary awareness.",
      sv: "Gemenskapens välbefinnande expanderar för att inkludera planetärt medvetande och evolutionär medvetenhet."
    },
    "yellow-turquoise": {
      en: "Systemic effectiveness becomes guided by holistic awareness and evolutionary purpose.",
      sv: "Systemisk effektivitet vägleds av holistisk medvetenhet och evolutionärt syfte."
    }
  };
  
  // Fill in the other half of the matrix for simplicity
  for (const [key, value] of Object.entries(interactionMatrix)) {
    const [first, second] = key.split('-');
    const reverseKey = `${second}-${first}`;
    if (!interactionMatrix[reverseKey]) {
      interactionMatrix[reverseKey] = value;
    }
  }

  // Get interaction text for two stages
  function getInteractionText(stage1: string, stage2: string): string {
    if (!stage1 || !stage2) return '';
    
    const key = `${stage1}-${stage2}`;
    const reverseKey = `${stage2}-${stage1}`;
    
    if (interactionMatrix[key]) {
      return interactionMatrix[key][currentLanguage];
    } else if (interactionMatrix[reverseKey]) {
      return interactionMatrix[reverseKey][currentLanguage];
    } else if (stage1 === stage2) {
      return currentLanguage === 'en'
        ? `Pure ${stage1} governance in its natural form.`
        : `Ren ${stage1}-styrning i sin naturliga form.`;
    }
    
    return currentLanguage === 'en'
      ? 'Interaction pattern not yet defined.'
      : 'Interaktionsmönster ännu inte definierat.';
  }

  // Translations for UI
  const translations = {
    en: {
      title: "Governance Matrix",
      description: "Explore how different governance models interact and complement each other. Select two models to see their interaction patterns.",
      selectPrimary: "Select primary governance model",
      selectSecondary: "Select secondary governance model",
      interaction: "Interaction Pattern",
      characteristics: "Characteristics",
      noSelection: "Select two governance models to see their interaction",
      focus: "Focus",
      approach: "Approach"
    },
    sv: {
      title: "Styrningsmatris",
      description: "Utforska hur olika styrningsmodeller interagerar och kompletterar varandra. Välj två modeller för att se deras interaktionsmönster.",
      selectPrimary: "Välj primär styrningsmodell",
      selectSecondary: "Välj sekundär styrningsmodell",
      interaction: "Interaktionsmönster",
      characteristics: "Egenskaper",
      noSelection: "Välj två styrningsmodeller för att se deras interaktion",
      focus: "Fokus",
      approach: "Tillvägagångssätt"
    }
  };
  
  $: t = translations[currentLanguage];
  $: interactionText = getInteractionText(selectedPrimary, selectedSecondary);
  
  // Select governance model
  function selectPrimary(stage: string) {
    selectedPrimary = stage;
    dispatch('select', { stage, type: 'primary' });
  }
  
  function selectSecondary(stage: string) {
    selectedSecondary = stage;
    dispatch('select', { stage, type: 'secondary' });
  }
</script>

<div class="governance-matrix bg-white rounded-lg shadow p-6">
  <h3 class="text-xl font-semibold mb-3">{t.title}</h3>
  <p class="text-gray-600 mb-6">{t.description}</p>
  
  <div class="grid gap-6 md:grid-cols-2">
    <!-- Primary Selection -->
    <div>
      <h4 class="font-medium mb-3">{t.selectPrimary}</h4>
      <div class="space-y-2">
        {#each Object.keys(governanceModels) as stage}
          <button
            class="w-full px-4 py-3 rounded-lg text-left transition-colors hover:bg-gray-50"
            class:border-2={selectedPrimary === stage}
            style={selectedPrimary === stage 
              ? `border-color: ${getStageColor(stage)}; background-color: ${getStageColor(stage)}15;` 
              : ''}
            on:click={() => selectPrimary(stage)}
          >
            <div class="font-medium capitalize">{stage}</div>
            <div class="text-sm text-gray-600">{governanceModels[stage][currentLanguage].name}</div>
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Secondary Selection -->
    <div>
      <h4 class="font-medium mb-3">{t.selectSecondary}</h4>
      <div class="space-y-2">
        {#each Object.keys(governanceModels) as stage}
          <button
            class="w-full px-4 py-3 rounded-lg text-left transition-colors hover:bg-gray-50"
            class:border-2={selectedSecondary === stage}
            style={selectedSecondary === stage 
              ? `border-color: ${getStageColor(stage)}; background-color: ${getStageColor(stage)}15;` 
              : ''}
            on:click={() => selectSecondary(stage)}
          >
            <div class="font-medium capitalize">{stage}</div>
            <div class="text-sm text-gray-600">{governanceModels[stage][currentLanguage].name}</div>
          </button>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Interaction Analysis -->
  <div class="mt-8">
    <h4 class="font-medium text-lg mb-3">{t.interaction}</h4>
    
    {#if selectedPrimary && selectedSecondary}
      <div class="bg-gray-50 p-6 rounded-lg">
        <p class="text-gray-700">{interactionText}</p>
        
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <!-- Primary Characteristics -->
          {#if selectedPrimary}
            <div class="p-4 rounded-lg" style="background-color: {getStageColor(selectedPrimary)}15; border-left: 4px solid {getStageColor(selectedPrimary)}">
              <h5 class="font-medium capitalize">{selectedPrimary}</h5>
              <div class="mt-2 space-y-2">
                <div>
                  <span class="text-sm font-medium">{t.focus}:</span> 
                  <span class="text-sm text-gray-600">{governanceModels[selectedPrimary][currentLanguage].focus}</span>
                </div>
                <div>
                  <span class="text-sm font-medium">{t.approach}:</span>
                  <span class="text-sm text-gray-600">{governanceModels[selectedPrimary][currentLanguage].approach}</span>
                </div>
              </div>
            </div>
          {/if}
          
          <!-- Secondary Characteristics -->
          {#if selectedSecondary}
            <div class="p-4 rounded-lg" style="background-color: {getStageColor(selectedSecondary)}15; border-left: 4px solid {getStageColor(selectedSecondary)}">
              <h5 class="font-medium capitalize">{selectedSecondary}</h5>
              <div class="mt-2 space-y-2">
                <div>
                  <span class="text-sm font-medium">{t.focus}:</span> 
                  <span class="text-sm text-gray-600">{governanceModels[selectedSecondary][currentLanguage].focus}</span>
                </div>
                <div>
                  <span class="text-sm font-medium">{t.approach}:</span>
                  <span class="text-sm text-gray-600">{governanceModels[selectedSecondary][currentLanguage].approach}</span>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <div class="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
        {t.noSelection}
      </div>
    {/if}
  </div>
</div>
