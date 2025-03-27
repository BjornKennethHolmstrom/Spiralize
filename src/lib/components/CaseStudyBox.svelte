<!-- src/lib/components/CaseStudyBox.svelte -->
<script lang="ts">
  import { slide } from 'svelte/transition';
  import type { Language } from '../types/spiral';

  export let language: Language = 'en';
  export let caseId: string = 'south-africa';
  
  // Track expanded state
  let expanded = false;
  
  // Case study data
  const caseStudies = {
    'south-africa': {
      en: {
        title: "South Africa's Truth and Reconciliation Commission",
        subtitle: "Healing Post-Apartheid Divides",
        summary: "South Africa's transition from apartheid to democracy offers a powerful example of multi-stage peace building.",
        stagesInvolved: ["purple", "blue", "green", "yellow"],
        content: `
          <p>Following the end of apartheid in 1994, South Africa faced the enormous challenge of healing deep societal wounds while avoiding further violence and division. The Truth and Reconciliation Commission (TRC) led by Archbishop Desmond Tutu exemplifies how multiple developmental stages can be integrated in peace processes.</p>
          
          <h4>Stage integration:</h4>
          <ul>
            <li><strong>Purple:</strong> The TRC incorporated the African concept of Ubuntu ("I am because we are") which resonated with tribal values of community healing and ancestral harmony.</li>
            <li><strong>Blue:</strong> The commission established clear procedural rules and moral frameworks that created structure and legitimacy.</li>
            <li><strong>Green:</strong> The process emphasized equality, inclusion, and hearing all voices, especially those of victims previously silenced.</li>
            <li><strong>Yellow:</strong> The TRC demonstrated systemic awareness by recognizing that individual acts of violence were part of a larger system that needed transformation.</li>
          </ul>
          
          <p>This multi-stage approach allowed different segments of South African society to participate in ways that aligned with their values and worldviews. While not perfect, the TRC helped South Africa avoid the widespread violence many feared would follow apartheid's end, and established a model for peace processes worldwide.</p>
        `
      },
      sv: {
        title: "Sydafrikas Sannings- och Försoningskommission",
        subtitle: "Läkning av Post-Apartheid Klyftor",
        summary: "Sydafrikas övergång från apartheid till demokrati erbjuder ett kraftfullt exempel på fredsbyggande genom flera stadier.",
        stagesInvolved: ["purple", "blue", "green", "yellow"],
        content: `
          <p>Efter apartheids slut 1994 stod Sydafrika inför den enorma utmaningen att läka djupa samhälleliga sår samtidigt som man undvek ytterligare våld och splittring. Sannings- och försoningskommissionen (TRC) ledd av ärkebiskop Desmond Tutu exemplifierar hur flera utvecklingsstadier kan integreras i fredsprocesser.</p>
          
          <h4>Stadieintegration:</h4>
          <ul>
            <li><strong>Purple:</strong> TRC inkorporerade det afrikanska konceptet Ubuntu ("Jag är för att vi är") som resonerade med stamvärderingar om gemenskapsläkning och förfäders harmoni.</li>
            <li><strong>Blue:</strong> Kommissionen etablerade tydliga procedurregler och moraliska ramverk som skapade struktur och legitimitet.</li>
            <li><strong>Green:</strong> Processen betonade jämlikhet, inkludering och att höra alla röster, särskilt de offer som tidigare tystats.</li>
            <li><strong>Yellow:</strong> TRC demonstrerade systemisk medvetenhet genom att erkänna att individuella våldshandlingar var del av ett större system som behövde transformation.</li>
          </ul>
          
          <p>Detta flerstadiestillvägagångssätt tillät olika segment av det sydafrikanska samhället att delta på sätt som överensstämde med deras värderingar och världsbilder. Även om det inte var perfekt hjälpte TRC Sydafrika att undvika det utbredda våld som många fruktade skulle följa apartheids slut, och etablerade en modell för fredsprocesser världen över.</p>
        `
      }
    },
    'colombia': {
      en: {
        title: "Colombia's Peace Process",
        subtitle: "Ending Decades of Armed Conflict",
        summary: "Colombia's peace agreement with FARC rebels demonstrates how different developmental stages can be addressed in conflict resolution.",
        stagesInvolved: ["red", "blue", "green", "yellow"],
        content: `
          <p>After more than 50 years of armed conflict, Colombia's 2016 peace agreement with the Revolutionary Armed Forces of Colombia (FARC) illustrates the importance of addressing multiple developmental stages in complex peace processes.</p>
          
          <h4>Stage integration:</h4>
          <ul>
            <li><strong>Red:</strong> The agreement acknowledged power dynamics and the need for fighters to maintain dignity, providing paths for rebels to transition without feeling defeated.</li>
            <li><strong>Blue:</strong> It established clear legal frameworks, transitional justice mechanisms, and constitutional amendments to provide structure and legitimacy.</li>
            <li><strong>Green:</strong> The process emphasized inclusivity through extensive victim participation and addressing historical inequalities that fueled the conflict.</li>
            <li><strong>Yellow:</strong> The agreement recognized the systemic nature of the conflict, addressing land reform, political participation, and drug trafficking as interconnected issues.</li>
          </ul>
          
          <p>By addressing values and concerns across multiple developmental stages, Colombia created a more comprehensive and sustainable peace framework. While implementation has faced challenges, the process demonstrates how developmental awareness can enhance peace efforts in complex, long-running conflicts.</p>
        `
      },
      sv: {
        title: "Colombias Fredsprocess",
        subtitle: "Avslutande av Årtionden av Väpnad Konflikt",
        summary: "Colombias fredsavtal med FARC-rebeller visar hur olika utvecklingsstadier kan adresseras i konfliktlösning.",
        stagesInvolved: ["red", "blue", "green", "yellow"],
        content: `
          <p>Efter mer än 50 år av väpnad konflikt illustrerar Colombias fredsavtal från 2016 med Colombias Revolutionära Väpnade Styrkor (FARC) vikten av att adressera flera utvecklingsstadier i komplexa fredsprocesser.</p>
          
          <h4>Stadieintegration:</h4>
          <ul>
            <li><strong>Red:</strong> Avtalet erkände maktdynamik och behovet för stridande att bibehålla värdighet, med vägar för rebeller att övergå utan att känna sig besegrade.</li>
            <li><strong>Blue:</strong> Det etablerade tydliga juridiska ramverk, övergångsrättvisa mekanismer och konstitutionella ändringar för att ge struktur och legitimitet.</li>
            <li><strong>Green:</strong> Processen betonade inkludering genom omfattande offerdeltagande och adresserade historiska ojämlikheter som drivit konflikten.</li>
            <li><strong>Yellow:</strong> Avtalet erkände konfliktens systemiska natur och adresserade landreform, politiskt deltagande och narkotikahandel som sammankopplade frågor.</li>
          </ul>
          
          <p>Genom att adressera värderingar och oro över flera utvecklingsstadier skapade Colombia ett mer omfattande och hållbart fredsramverk. Även om implementeringen har mött utmaningar demonstrerar processen hur utvecklingsmedvetenhet kan förbättra fredsinsatser i komplexa, långvariga konflikter.</p>
        `
      }
    }
  };
  
  // Get current case study based on language and ID
  $: currentCase = caseStudies[caseId][language];
  
  // Stage colors for the circles
  const stageColors = {
    beige: '#E5D0BA',
    purple: '#9B6B9E',
    red: '#E25A53', 
    blue: '#4A72B2',
    orange: '#FF7F27',
    green: '#7AB55C',
    yellow: '#FFD700',
    turquoise: '#40E0D0',
    coral: '#FF6F61'
  };
  
  // Translations
  const translations = {
    en: {
      readMore: "Read more",
      close: "Close",
      stagesInvolved: "Stages Involved:"
    },
    sv: {
      readMore: "Läs mer",
      close: "Stäng",
      stagesInvolved: "Involverade Stadier:"
    }
  };
  
  $: t = translations[language];
  
  function toggleExpand() {
    expanded = !expanded;
  }
</script>

<div class="case-study-box bg-white rounded-xl shadow-sm overflow-hidden">
  <!-- Summary Section (Always visible) -->
  <div class="p-6 cursor-pointer" on:click={toggleExpand}>
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-xl font-semibold mb-1">{currentCase.title}</h3>
        <p class="text-sm text-gray-500 mb-3">{currentCase.subtitle}</p>
      </div>
      <button class="text-purple-600 hover:text-purple-800">
        {expanded ? t.close : t.readMore}
      </button>
    </div>
    
    <p class="text-gray-600 mb-4">{currentCase.summary}</p>
    
    <!-- Stage Circles -->
    <div>
      <div class="text-sm text-gray-500 mb-2">{t.stagesInvolved}</div>
      <div class="flex space-x-2">
        {#each currentCase.stagesInvolved as stage}
          <div 
            class="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white"
            style="background-color: {stageColors[stage]}"
            title={stage}
          >
            {stage.charAt(0).toUpperCase()}
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Expanded Content -->
  {#if expanded}
    <div 
      class="p-6 pt-0 border-t border-gray-100 bg-gray-50"
      transition:slide={{ duration: 300 }}
    >
      <!-- Use @html to render HTML content from the data -->
      <div class="case-content">
        {@html currentCase.content}
      </div>
    </div>
  {/if}
</div>

<style>
  .case-content :global(h4) {
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .case-content :global(p) {
    margin-bottom: 1rem;
    color: #4B5563;
  }
  
  .case-content :global(ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .case-content :global(li) {
    margin-bottom: 0.5rem;
    color: #4B5563;
  }
</style>
