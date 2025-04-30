<!-- src/routes/gallery/+page.svelte (with expandable cards and fixes) -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';
  import { processMarkdown } from '$lib/utils/markdownProcessor';
  import { getStageColor } from '$lib/utils/stageColors';
  import { stages } from '$lib/data/stages';
  import type { 
    Character, 
    StageExpression,
    CategoryInfo, 
    StageInfo 
  } from '$lib/types/gallery';
  
  const { language } = languageStore;
  $: currentLanguage = $language;
  
  // State for filters and expanded cards
  let selectedStages: string[] = [];
  let selectedCategories: string[] = [];
  let characters: Character[] = [];
  let isLoading = true;
  let loadingError: string | null = null;
  let expandedCharacters: Set<string> = new Set();
  let parsedCharacterContent: Record<string, string> = {};
  
  // Categories for filtering
  const categoryData = [
    { id: 'books', nameEn: 'Books', nameSv: 'Böcker', icon: '📚' },
    { id: 'movies', nameEn: 'Movies', nameSv: 'Filmer', icon: '🎬' },
    { id: 'anime', nameEn: 'Anime', nameSv: 'Anime', icon: '🇯🇵' },
    { id: 'irl', nameEn: 'Real Life', nameSv: 'Verkliga Livet', icon: '👤' },
    { id: 'games', nameEn: 'Games', nameSv: 'Spel', icon: '🎮' },
    { id: 'ai', nameEn: 'A.I. / Robots', nameSv: 'A.I. / Robotar', icon: '🤖' }
  ];
  
  // Intro text based on language
  $: introText = currentLanguage === 'en' 
    ? {
        title: "Characters of the Spiral",
        poem: `The Spiral of life moves through every story —
in warriors, dreamers, rebels, and sages.

Each character you meet here mirrors a stage of human evolution:
from survival to belonging,
from conquest to compassion,
from mastery to mystery,
and beyond.

They are not just fiction.
They are echoes of your own unfolding journey.

Welcome to the living Spiral.`,
        reflectionTitle: "Reflection",
        reflection: `Which characters called to you?
Which ones felt familiar — or strange?

The Spiral is not a ladder to climb,
but a song we sing in many voices.

You carry all these stages within you.
May their stories awaken new steps on your path.`,
        whisper: "Every story you love is a doorway into yourself."
      } 
    : {
        title: "Spiralens Karaktärer",
        poem: `Spiralen av liv rör sig genom varje berättelse —
i krigare, drömmare, rebeller och visa.

Varje karaktär du möter här speglar ett stadium i människans utveckling:
från överlevnad till tillhörighet,
från erövring till medkänsla,
från bemästrande till mysterium,
och bortom.

De är inte bara fiktion.
De är ekon av din egen pågående resa.

Välkommen till den levande Spiralen.`,
        reflectionTitle: "Reflektion",
        reflection: `Vilka karaktärer talade till dig?
Vilka kändes bekanta — eller främmande?

Spiralen är inte en stege att klättra,
utan en sång vi sjunger med många röster.

Du bär alla dessa stadier inom dig.
Må deras berättelser väcka nya steg på din väg.`,
        whisper: "Varje berättelse du älskar är en dörröppning till dig själv."
      };
  
  /**
   * Toggle card expansion
   */
  async function toggleCardExpansion(character: Character) {
    const characterId = character.fileName;
    
    // If already expanded, collapse it
    if (expandedCharacters.has(characterId)) {
      expandedCharacters.delete(characterId);
      expandedCharacters = expandedCharacters; // Trigger reactivity
      return;
    }
    
    // If content already loaded, just expand
    if (parsedCharacterContent[characterId]) {
      expandedCharacters.add(characterId);
      expandedCharacters = expandedCharacters; // Trigger reactivity
      return;
    }
    
    // Otherwise load the content
    try {
      const url = `${base}/content/gallery/${currentLanguage}/${characterId}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`Failed to load detailed content for ${characterId}`);
        return;
      }
      
      const markdown = await response.text();
      const { html } = processMarkdown(markdown);
      
      // Store the HTML content
      parsedCharacterContent[characterId] = html;
      parsedCharacterContent = { ...parsedCharacterContent }; // Trigger reactivity
      
      // Expand the card
      expandedCharacters.add(characterId);
      expandedCharacters = expandedCharacters; // Trigger reactivity
    } catch (error) {
      console.error(`Error loading detailed content for ${characterId}:`, error);
    }
  }
  
  /**
   * Normalize a character's data to ensure consistent structure
   * Handles both single and multiple stages/categories
   */
function normalizeCharacterData(character: any): Character {
    // Base case for invalid character
    if (!character) {
        return {
            name: "Unknown Character",
            source: "",
            categories: ["unknown"],
            stages: [{
                stage: "unknown",
                level: "primary",
                description: "",
                traits: []
            }],
            description: "",
            quote: "",
            fileName: ""
        };
    }

    // Normalize categories to always be an array
    let categories: string[] = [];
    if (Array.isArray(character.categories)) {
        categories = character.categories;
    } else if (character.categories) {
        categories = [character.categories];
    } else if (character.category) {
        categories = [character.category];
    } else {
        categories = ["unknown"];
    }

    // Normalize stages
    let stages: StageExpression[] = [];

    // Case 1: Array of stage objects or strings
    if (Array.isArray(character.stages)) {
        stages = character.stages.map(stage => {
            if (typeof stage === 'string') {
                return {
                    stage: stage,
                    level: 'primary',
                    description: '',
                    traits: []
                };
            } else {
                return {
                    stage: stage.stage || stage.primary || stage.secondary || stage.tertiary || 'unknown',
                    level: stage.level || 
                          (stage.primary ? 'primary' : 
                           stage.secondary ? 'secondary' : 
                           stage.tertiary ? 'tertiary' : 'primary'),
                    description: stage.description || '',
                    traits: stage.traits || []
                };
            }
        });
    }
    // Case 2: Single stage object
    else if (character.stages && typeof character.stages === 'object') {
        // Handle object with primary/secondary/tertiary
        if (character.stages.primary || character.stages.secondary || character.stages.tertiary) {
            if (character.stages.primary) {
                stages.push({
                    stage: character.stages.primary,
                    level: 'primary',
                    description: character.stages.description || '',
                    traits: character.stages.traits || []
                });
            }
            if (character.stages.secondary) {
                stages.push({
                    stage: character.stages.secondary,
                    level: 'secondary',
                    description: '',
                    traits: []
                });
            }
            if (character.stages.tertiary) {
                stages.push({
                    stage: character.stages.tertiary,
                    level: 'tertiary',
                    description: '',
                    traits: []
                });
            }
        }
        // Standard stage object
        else {
            stages.push({
                stage: character.stages.stage || 'unknown',
                level: character.stages.level || 'primary',
                description: character.stages.description || '',
                traits: character.stages.traits || []
            });
        }
    }
    // Case 3: Legacy single stage string
    else if (character.stage) {
        stages.push({
            stage: character.stage,
            level: 'primary',
            description: character.description || '',
            traits: character.traits || []
        });
    }
    // Default case
    else {
        stages.push({
            stage: 'unknown',
            level: 'primary',
            description: character.description || '',
            traits: []
        });
    }

    console.log('Normalized character:', {
      name: character.name,
      categories,
      stages: stages.map(s => `${s.level}:${s.stage}`)
    });

    return {
        name: character.name || 'Unknown Character',
        source: character.source || '',
        categories,
        stages,
        description: character.description || '',
        quote: character.quote || '',
        fileName: character.fileName || ''
    };
}
  
  /**
   * Parse a single character markdown file
   */
  async function parseCharacterFile(file: string, lang: string): Promise<Character | null> {
    try {
      const url = `${base}/content/gallery/${lang}/${file}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        console.warn(`Failed to load character file ${file}: ${response.status}`);
        return null;
      }
      
      const markdown = await response.text();
      const { html, metadata } = processMarkdown(markdown);
      
      if (!metadata || !metadata.name) {
        console.warn(`Invalid metadata in character file ${file}`);
        return null;
      }
      
      // Add filename to metadata
      metadata.fileName = file;
      
      // Special debug for Frodo
      if (metadata.name && metadata.name.includes('Frodo')) {
        console.log('Raw Frodo metadata:', JSON.stringify(metadata, null, 2));
      }
      
      // Normalize the character data
      return normalizeCharacterData(metadata);
    } catch (error) {
      console.error(`Error parsing character file ${file}:`, error);
      return null;
    }
  }
  
  /**
   * Load all character data for the current language
   */
  async function loadCharacters(): Promise<void> {
    isLoading = true;
    loadingError = null;
    characters = [];
    expandedCharacters = new Set();
    parsedCharacterContent = {};
    
    try {
      // Fetch the index file that lists all character markdown files
      const indexUrl = `${base}/content/gallery/${currentLanguage}/index.json`;
      const indexResponse = await fetch(indexUrl);
      
      if (!indexResponse.ok) {
        loadingError = `Failed to load character index: ${indexResponse.status} ${indexResponse.statusText}`;
        isLoading = false;
        return;
      }
      
      const characterFiles = await indexResponse.json();
      
      if (!Array.isArray(characterFiles)) {
        loadingError = "Invalid character index format";
        isLoading = false;
        return;
      }
      
      // Parse each character file
      const characterPromises = characterFiles.map(file => 
        parseCharacterFile(file, currentLanguage)
      );
      
      const results = await Promise.all(characterPromises);
      characters = results.filter(c => c !== null) as Character[];
      
      console.log(`Loaded ${characters.length} characters`);
    } catch (error) {
      console.error('Error loading characters:', error);
      loadingError = `Error loading characters: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      isLoading = false;
    }
  }
  
  // Load characters when language changes
  $: if (currentLanguage) {
    loadCharacters();
  }
  
  onMount(() => {
    loadCharacters();
  });

  // Helper function to determine text color based on background color
  function getTextColorForStage(stageId: string): string {
    // List of stages that need dark text due to light background colors
    const darkTextStages = ['beige', 'yellow', 'turquoise', 'clear'];
    return darkTextStages.includes(stageId) ? '#000000' : '#FFFFFF';
  }
  
  // Toggle stage selection
  function toggleStageFilter(stageId: string): void {
    if (selectedStages.includes(stageId)) {
      selectedStages = selectedStages.filter(id => id !== stageId);
    } else {
      selectedStages = [...selectedStages, stageId];
    }
  }
  
  // Toggle category selection
  function toggleCategoryFilter(categoryId: string): void {
    if (selectedCategories.includes(categoryId)) {
      selectedCategories = selectedCategories.filter(id => id !== categoryId);
    } else {
      selectedCategories = [...selectedCategories, categoryId];
    }
  }
  
  // Get all stages from a character
  function getCharacterStages(character: Character): string[] {
      if (!character || !character.stages) return [];
      return character.stages.map(s => s.stage);
  }
  
  // Get the primary stage from a character
  function getPrimaryStage(character: Character): StageExpression | null {
    if (!character || !character.stages) return null;
    
    if (Array.isArray(character.stages)) {
      if (character.stages.length === 0) return null;
      const primary = character.stages.find(s => s.level === 'primary');
      return primary || character.stages[0];
    }
    return character.stages;
  }
  
  // Filter characters based on selected stages and categories (any level: primary, secondary, tertiary)
  $: filteredCharacters = characters.filter(character => {
    const charCategories = Array.isArray(character.categories)
      ? character.categories
      : character.categories
        ? [character.categories]
        : ['unknown'];

    const charStages = character.stages.map(s => s.stage); // includes all levels

    const categoryMatch = selectedCategories.length === 0 ||
      charCategories.some(cat => selectedCategories.includes(cat));

    const stageMatch = selectedStages.length === 0 ||
      charStages.some(stage => selectedStages.includes(stage));

    return categoryMatch && stageMatch;
  });
    
  // Get category name and icon
  function getCategoryInfo(categoryId: string): CategoryInfo {
    const category = categoryData.find(c => c.id === categoryId);
    return {
      name: currentLanguage === 'en' ? category?.nameEn || categoryId : category?.nameSv || categoryId,
      icon: category?.icon || '📌'
    };
  }
  
  // Get stage color and name
  function getStageInfo(stageId: string | undefined): StageInfo {
    if (!stageId) {
      return { color: '#808080', name: currentLanguage === 'en' ? 'Unknown' : 'Okänd' };
    }
    
    const stage = stages.find(s => s.id === stageId);
    return {
      color: stage ? stage.hex : '#808080',
      name: stage ? stage.name[currentLanguage] : stageId
    };
  }
  
  // Page title and description for SEO
  $: title = currentLanguage === 'en'
    ? 'Character Gallery - Spiralize'
    : 'Karaktärsgalleri - Spiralize';
    
  $: description = currentLanguage === 'en'
    ? 'Explore fictional and real-life characters through the lens of Spiral Dynamics to understand different stages of human consciousness evolution.'
    : 'Utforska fiktiva och verkliga karaktärer genom Spiral Dynamics för att förstå olika stadier av mänsklig medvetandeutveckling.';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description}>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8">
  <div class="mb-8">
    <h1 class="text-3xl font-bold mb-6">
      {introText.title}
    </h1>
    
    <!-- Introduction -->
    <div class="prose max-w-none mb-8">
      <p class="text-lg text-center italic mb-6 whitespace-pre-line">
        {introText.poem}
      </p>
    </div>

    <!-- Suggest a Character -->
    <details class="mb-8 bg-gray-50 rounded-lg border border-gray-200 p-4">
      <summary class="cursor-pointer font-semibold text-purple-700 hover:underline">
        {currentLanguage === 'en'
          ? 'Want to suggest or add a character?'
          : 'Vill du föreslå eller lägga till en karaktär?'}
      </summary>
      <div class="mt-3 text-sm text-gray-700">
        <p class="mb-2">
          {currentLanguage === 'en'
            ? 'You can suggest a fictional or real-life character — or even add yourself — to the Spiral Gallery by using the contact form at'
            : 'Du kan föreslå en fiktiv eller verklig karaktär — eller lägga till dig själv — i Spiral-galleriet via kontaktformuläret på'}
          <a class="text-purple-600 hover:underline ml-1" href="/contact">spiralize.org/contact</a>.
        </p>

        <p class="mb-2">
          {currentLanguage === 'en'
            ? 'Please include the following information in your message using the markdown format below:'
            : 'Inkludera gärna följande information i ditt meddelande enligt markdown-formatet nedan:'}
        </p>

        {#if currentLanguage === 'en'}
          <pre class="bg-white border border-gray-200 rounded p-3 overflow-x-auto text-xs">
    {`---
    name: [Character Name]
    source: [Book / Movie / Real Life / etc.]
    categories:
      - [books / movies / anime / irl / games]
    stages:
      - stage: [spiral stage id, e.g., green]
        level: [primary / secondary / tertiary]
        description: [Short explanation of how this stage appears in the character]
        traits:
          - Trait 1
          - Trait 2
      # Add more stages if relevant
    description: [1–2 sentence summary for the card]
    quote: "[Optional quote from or about the character]"
    ---`}
          </pre>
        {:else}
          <pre class="bg-white border border-gray-200 rounded p-3 overflow-x-auto text-xs">
    {`---
    name: [Karaktärens namn]
    source: [Bok / Film / Verkliga livet / etc.]
    categories:
      - [books / movies / anime / irl / games]  # OBS! använd ENGELSKA kategorier
    stages:
      - stage: [spiral stage id, t.ex. green]   # OBS! använd ENGELSKA stage-id:n
        level: [primary / secondary / tertiary]
        description: [Kort beskrivning av hur detta stadium uttrycks i karaktären]
        traits:
          - Egenskap 1
          - Egenskap 2
      # Lägg till fler stadier om det är relevant
    description: [1–2 meningar sammanfattning till kortet]
    quote: "[Valfritt citat från eller om karaktären]"
    ---`}
          </pre>
        {/if}
      </div>
    </details>


    <!-- Category filters -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2">
        {currentLanguage === 'en' ? 'Filter by Category' : 'Filtrera efter Kategori'}
      </h2>
      <div class="flex flex-wrap gap-2">
        {#each categoryData as category}
          <button
            class="flex items-center px-3 py-1 text-sm rounded-full transition-colors border {
              selectedCategories.includes(category.id)
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }"
            on:click={() => toggleCategoryFilter(category.id)}
          >
            <span class="mr-1">{category.icon}</span>
            {currentLanguage === 'en' ? category.nameEn : category.nameSv}
            {#if selectedCategories.includes(category.id)}
              <svg class="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            {/if}
          </button>
        {/each}
        
        <!-- Clear category filters button -->
        {#if selectedCategories.length > 0}
          <button
            class="flex items-center px-3 py-1 text-sm rounded-full transition-colors border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            on:click={() => selectedCategories = []}
          >
            {currentLanguage === 'en' ? 'Clear Categories' : 'Rensa Kategorier'}
            <svg class="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        {/if}
      </div>
    </div>
    
    <!-- Stage filters -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold mb-2">
        {currentLanguage === 'en' ? 'Filter by Stage' : 'Filtrera efter Stadium'}
      </h2>
      <div class="flex flex-wrap gap-2">
        {#each stages as stage}
          <button
            class="flex items-center px-3 py-1 text-sm rounded-full transition-colors border {
              selectedStages.includes(stage.id) ? '' : 'border-gray-300'
            }"
            style="
              background-color: {selectedStages.includes(stage.id) ? stage.hex : stage.hex + '20'};
              color: {selectedStages.includes(stage.id) ? getTextColorForStage(stage.id) : stage.hex};
              border-color: {stage.hex};
            "
            on:click={() => toggleStageFilter(stage.id)}
          >
            {stage.name[currentLanguage]}
            {#if selectedStages.includes(stage.id)}
              <svg class="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            {/if}
          </button>
        {/each}
        
        <!-- Clear stage filters button -->
        {#if selectedStages.length > 0}
          <button
            class="flex items-center px-3 py-1 text-sm rounded-full transition-colors border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            on:click={() => selectedStages = []}
          >
            {currentLanguage === 'en' ? 'Clear Stages' : 'Rensa Stadier'}
            <svg class="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        {/if}
      </div>
    </div>
  </div>

  <p class="text-sm text-gray-500 italic mb-4">
    {currentLanguage === 'en'
      ? 'Characters are shown if any of their stages match the filters.'
      : 'Karaktärer visas om något av deras stadier matchar filtren.'}
  </p>
  
  <!-- Character cards grid -->
  {#if isLoading}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(6) as _, i}
        <div class="animate-pulse bg-white rounded-lg shadow-sm p-6 h-48">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-4/5"></div>
        </div>
      {/each}
    </div>
  {:else if loadingError}
    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Error:</strong>
      <span class="block sm:inline">{loadingError}</span>
    </div>
  {:else if filteredCharacters.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredCharacters as character}
        <!-- Ensure primaryStage is not null before using it -->
        {@const primaryStage = getPrimaryStage(character)}
        {#if primaryStage}
          {@const stageInfo = getStageInfo(primaryStage.stage)}
          {@const allStages = getCharacterStages(character)}
          {@const isExpanded = expandedCharacters.has(character.fileName)}
          
          <div 
            class="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md {isExpanded ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''}"
            style="border-left: 4px solid {stageInfo.color}"
          >
            <div class="p-6">
              <!-- Card Header -->
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-bold">{character.name}</h3>
                
                <!-- Primary stage badge -->
                <span 
                  class="text-xs px-2 py-1 rounded-full" 
                  style="background-color: {stageInfo.color}30; color: {stageInfo.color}"
                >
                  {stageInfo.name}
                </span>
              </div>
              
              <div class="text-sm text-gray-500 mb-3">
                <!-- Source with icon -->
                <div class="flex items-center mb-2">
                  <span>{character.source}</span>
                </div>
                
                <!-- Categories -->
                <div class="flex flex-wrap gap-1 mb-2">
                  {#if Array.isArray(character.categories) && character.categories.length > 0}
                    {#each character.categories as category}
                      {@const categoryInfo = getCategoryInfo(category)}
                      <span class="inline-flex items-center text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                        <span class="mr-1">{categoryInfo.icon}</span>
                        {categoryInfo.name}
                      </span>
                    {/each}
                  {:else if character.categories && typeof character.categories === 'string'}
                    {@const categoryInfo = getCategoryInfo(character.categories)}
                    <span class="inline-flex items-center text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                      <span class="mr-1">{categoryInfo.icon}</span>
                      {categoryInfo.name}
                    </span>
                  {/if}
                </div>
              </div>
              
              <!-- Character description -->
              <p class="text-gray-700 mb-4">{character.description}</p>
              
              <!-- All stages badges (if multiple) -->
              {#if allStages.length > 1}
                <div class="mb-3">
                  <p class="text-xs text-gray-500 mb-1">
                    {currentLanguage === 'en' ? 'Expresses stages:' : 'Uttrycker stadier:'}
                  </p>
                  <div class="flex flex-wrap gap-1">
                    {#each allStages as stageId}
                      {@const info = getStageInfo(stageId)}
                      <span 
                        class="text-xs px-2 py-0.5 rounded-full" 
                        style="background-color: {info.color}20; color: {info.color}; border: 1px solid {info.color}40;"
                      >
                        {info.name}
                      </span>
                    {/each}
                  </div>
                </div>
              {/if}
              
              <!-- Traits related to primary stage -->
              {#if primaryStage.traits && primaryStage.traits.length > 0}
                <div class="flex flex-wrap gap-1 mb-3">
                  {#each primaryStage.traits as trait}
                    <span class="text-xs bg-gray-100 rounded-full px-2 py-0.5">
                      {trait}
                    </span>
                  {/each}
                </div>
              {/if}
              
              <!-- Quote if available -->
              {#if character.quote}
                <div class="italic text-sm border-l-2 pl-3 py-1 border-gray-300 mb-4">
                  "{character.quote}"
                </div>
              {/if}
              
              <!-- Expand/Collapse Button -->
              <button 
                class="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors flex items-center"
                on:click={() => toggleCardExpansion(character)}
              >
                {#if isExpanded}
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  {currentLanguage === 'en' ? 'Collapse' : 'Minimera'}
                {:else}
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  {currentLanguage === 'en' ? 'Read More' : 'Läs Mer'}
                {/if}
              </button>
              
              <!-- Expanded Content -->
              {#if isExpanded && parsedCharacterContent[character.fileName]}
                <div class="mt-6 pt-4 border-t border-gray-200">
                  <div class="prose max-w-none">
                    {@html parsedCharacterContent[character.fileName]}
                  </div>
                </div>
              {:else if isExpanded}
                <div class="mt-6 pt-4 border-t border-gray-200">
                  <div class="animate-pulse">
                    <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/if}
      {/each}
    </div>
  {:else}
    <div class="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
      <p>
        {currentLanguage === 'en'
          ? 'No characters match your current filters. Try adjusting your selection.'
          : 'Inga karaktärer matchar dina nuvarande filter. Försök justera ditt val.'
        }
      </p>
      <button 
        class="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        on:click={() => {
          selectedStages = [];
          selectedCategories = [];
        }}
      >
        {currentLanguage === 'en' ? 'Clear All Filters' : 'Rensa Alla Filter'}
      </button>
    </div>
  {/if}
  
  <!-- Footer reflection -->
  <div class="mt-12 pt-6 border-t border-gray-200 text-center prose max-w-none">
    <h2 class="text-2xl font-bold mb-4">{introText.reflectionTitle}</h2>
    <p class="text-lg whitespace-pre-line">
      {introText.reflection}
    </p>
    
    <p class="text-sm italic mt-8 text-gray-500">
      "{introText.whisper}"
    </p>
  </div>
</div>

<style>
  /* Animations and transitions */
  .grid > div {
    animation: fadeIn 0.3s ease-out forwards;
    transition: all 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Ensure the prose content formatting works well */
  :global(.prose h1) {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
  
  :global(.prose h2) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
  }
  
  :global(.prose h3) {
    font-size: 1.125rem;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  
  :global(.prose p) {
    margin-bottom: 1rem;
  }
  
  :global(.prose ul), :global(.prose ol) {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  :global(.prose li) {
    margin-bottom: 0.5rem;
  }
</style>
