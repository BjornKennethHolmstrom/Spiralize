<!-- WorldviewMatrix.svelte -->
<script lang="ts">
  import languageStore from '$lib/stores/languageStore';
  
  const { language } = languageStore;
  $: currentLanguage = $language;

  let selectedView1: string | null = null;
  let selectedView2: string | null = null;

  const worldviews = {
    red: {
      name: { en: 'Power', sv: 'Makt' },
      color: '#E25A53',
      key_values: {
        en: ['Dominance', 'Action', 'Power'],
        sv: ['Dominans', 'Handling', 'Makt']
      },
      approach: {
        en: 'Takes immediate, decisive action based on strength',
        sv: 'Tar omedelbara, beslutsamma åtgärder baserade på styrka'
      }
    },
    blue: {
      name: { en: 'Traditional', sv: 'Traditionell' },
      color: '#4A72B2',
      key_values: {
        en: ['Order', 'Duty', 'Righteousness'],
        sv: ['Ordning', 'Plikt', 'Rättrådighet']
      },
      approach: {
        en: 'Follows established rules and moral codes',
        sv: 'Följer etablerade regler och moralkoder'
      }
    },
    orange: {
      name: { en: 'Modern', sv: 'Modern' },
      color: '#FF7F27',
      key_values: {
        en: ['Success', 'Innovation', 'Competition'],
        sv: ['Framgång', 'Innovation', 'Konkurrens']
      },
      approach: {
        en: 'Uses science and market solutions',
        sv: 'Använder vetenskap och marknadslösningar'
      }
    },
    green: {
      name: { en: 'Postmodern', sv: 'Postmodern' },
      color: '#7AB55C',
      key_values: {
        en: ['Equality', 'Community', 'Harmony'],
        sv: ['Jämlikhet', 'Gemenskap', 'Harmoni']
      },
      approach: {
        en: 'Seeks consensus and inclusion',
        sv: 'Söker konsensus och inkludering'
      }
    },
    yellow: {
      name: { en: 'Systemic', sv: 'Systemisk' },
      color: '#FFD700',
      key_values: {
        en: ['Integration', 'Complexity', 'Adaptivity'],
        sv: ['Integration', 'Komplexitet', 'Anpassning']
      },
      approach: {
        en: 'Integrates multiple perspectives and adapts to context',
        sv: 'Integrerar flera perspektiv och anpassar sig till sammanhanget'
      }
    },
    turquoise: {
      name: { en: 'Holistic', sv: 'Holistisk' },
      color: '#40E0D0',
      key_values: {
        en: ['Unity', 'Consciousness', 'Flow'],
        sv: ['Enhet', 'Medvetande', 'Flöde']
      },
      approach: {
        en: 'Aligns with universal patterns and collective evolution',
        sv: 'Anpassar sig till universella mönster och kollektiv evolution'
      }
    }
  };

  // This could be expanded into a more comprehensive matrix of interactions
  const getInteractionText = (view1: string, view2: string) => {
    if (!view1 || !view2) return '';
    
    const interactions = {
      'red-blue': {
        en: 'Tension between power and order. Potential integration through structured leadership roles.',
        sv: 'Spänning mellan makt och ordning. Möjlig integration genom strukturerade ledarskapsroller.'
      },
      'red-orange': {
        en: 'Synergy in competitive drive. Can channel power into entrepreneurial success.',
        sv: 'Synergi i konkurrensdrift. Kan kanalisera makt till entreprenöriell framgång.'
      },
      'red-green': {
        en: 'Strong conflict between individual power and group harmony. Challenge to find balance.',
        sv: 'Stark konflikt mellan individuell makt och gruppharmoni. Utmanande att hitta balans.'
      },
      'red-yellow': {
        en: 'Yellow can channel Red energy into adaptive leadership.',
        sv: 'Gult kan kanalisera Röd energi till adaptivt ledarskap.'
      },
      'red-turquoise': {
        en: 'Transformation of raw power into conscious evolutionary force.',
        sv: 'Transformation av rå kraft till medveten evolutionär kraft.'
      },
      'blue-red': {
        en: 'Tension between power and order. Potential integration through structured leadership roles.',
        sv: 'Spänning mellan makt och ordning. Möjlig integration genom strukturerade ledarskapsroller.'
      },
      'blue-orange': {
        en: 'Tension between tradition and progress. Integration through regulated markets and ethical innovation.',
        sv: 'Spänning mellan tradition och framsteg. Integration genom reglerade marknader och etisk innovation.'
      },
      'blue-green': {
        en: 'Conflict between hierarchy and equality. Common ground in community values.',
        sv: 'Konflikt mellan hierarki och jämlikhet. Gemensam grund i gemenskapsvärderingar.'
      },
      'blue-yellow': {
        en: 'Bridge between established structures and systemic innovation.',
        sv: 'Bro mellan etablerade strukturer och systemisk innovation.'
      },
      'blue-turquoise': {
        en: 'Evolution of order into universal patterns and principles.',
        sv: 'Evolution av ordning till universella mönster och principer.'
      },
      'orange-red': {
        en: 'Synergy in competitive drive. Can channel power into entrepreneurial success.',
        sv: 'Synergi i konkurrensdrift. Kan kanalisera makt till entreprenöriell framgång.'
      },
      'orange-green': {
        en: 'Balance between individual success and collective wellbeing.',
        sv: 'Balans mellan individuell framgång och kollektivt välbefinnande.'
      },
      'orange-yellow': {
        en: 'Synergy in innovation and adaptivity. Yellow adds systemic awareness.',
        sv: 'Synergi i innovation och anpassningsförmåga. Gult adderar systemmedvetenhet.'
      },
      'orange-turquoise': {
        en: 'Integration of achievement with universal consciousness.',
        sv: 'Integration av prestation med universellt medvetande.'
      },
      'green-red': {
        en: 'Strong conflict between individual power and group harmony. Challenge to find balance.',
        sv: 'Stark konflikt mellan individuell makt och gruppharmoni. Utmanande att hitta balans.'
      },
      'green-orange': {
        en: 'Balance between individual success and collective wellbeing.',
        sv: 'Balans mellan individuell framgång och kollektivt välbefinnande.'
      },
      'green-yellow': {
        en: 'Strong alignment in valuing multiple perspectives. Yellow adds structure.',
        sv: 'Stark överensstämmelse i värdering av olika perspektiv. Gult adderar struktur.'
      },
      'green-turquoise': {
        en: 'Evolution of social consciousness to universal awareness.',
        sv: 'Evolution av socialt medvetande till universell medvetenhet.'
      },
      'yellow-turquoise': {
        en: 'Integration of systemic understanding with holistic consciousness.',
        sv: 'Integration av systemförståelse med holistiskt medvetande.'
      },
      'turquoise-yellow': {
        en: 'Integration of systemic understanding with holistic consciousness.',
        sv: 'Integration av systemförståelse med holistiskt medvetande.'
      }

    };

    const key = [view1, view2].sort().join('-');
    return interactions[key] || interactions[view2 + '-' + view1];
  };

  $: interaction = selectedView1 && selectedView2 ? 
    getInteractionText(selectedView1, selectedView2) : null;
</script>

<div class="p-6 bg-white rounded-lg shadow-lg">
  <h3 class="text-xl font-bold mb-4">
    {currentLanguage === 'en' ? 'Explore Worldview Interactions' : 'Utforska Samspel mellan Världsbilder'}
  </h3>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div>
      <h4 class="font-medium mb-2">
        {currentLanguage === 'en' ? 'Select First Worldview' : 'Välj Första Världsbild'}
      </h4>
      <div class="space-y-2">
        {#each Object.entries(worldviews) as [key, view]}
          <button
            on:click={() => selectedView1 = key}
            class="w-full p-3 rounded-lg text-left transition-colors {
              selectedView1 === key 
                ? 'bg-opacity-100 text-white'
                : 'bg-opacity-20 hover:bg-opacity-30'
            }"
            style="background-color: {selectedView1 === key ? view.color : `${view.color}33`}"
          >
            <div class="font-medium">{view.name[currentLanguage]}</div>
            <div class="text-sm opacity-80">
              {view.key_values[currentLanguage].join(' • ')}
            </div>
          </button>
        {/each}
      </div>
    </div>

    <div>
      <h4 class="font-medium mb-2">
        {currentLanguage === 'en' ? 'Select Second Worldview' : 'Välj Andra Världsbild'}
      </h4>
      <div class="space-y-2">
        {#each Object.entries(worldviews) as [key, view]}
          <button
            on:click={() => selectedView2 = key}
            class="w-full p-3 rounded-lg text-left transition-colors {
              selectedView2 === key 
                ? 'bg-opacity-100 text-white'
                : 'bg-opacity-20 hover:bg-opacity-30'
            }"
            style="background-color: {selectedView2 === key ? view.color : `${view.color}33`}"
          >
            <div class="font-medium">{view.name[currentLanguage]}</div>
            <div class="text-sm opacity-80">
              {view.key_values[currentLanguage].join(' • ')}
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>

  {#if selectedView1 && selectedView2 && interaction}
    <div class="bg-gray-50 p-4 rounded-lg">
      <h4 class="font-medium mb-2">
        {currentLanguage === 'en' ? 'Interaction Analysis' : 'Interaktionsanalys'}
      </h4>
      <p class="text-gray-700">{interaction[currentLanguage]}</p>
      
      <div class="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h5 class="font-medium text-sm mb-1">
            {currentLanguage === 'en' ? 'Approach to Problems' : 'Tillvägagångssätt'}
          </h5>
          <p class="text-sm text-gray-600">
            {worldviews[selectedView1].approach[currentLanguage]}
          </p>
        </div>
        <div>
          <h5 class="font-medium text-sm mb-1">
            {currentLanguage === 'en' ? 'Approach to Problems' : 'Tillvägagångssätt'}
          </h5>
          <p class="text-sm text-gray-600">
            {worldviews[selectedView2].approach[currentLanguage]}
          </p>
        </div>
      </div>
    </div>
  {/if}
</div>
