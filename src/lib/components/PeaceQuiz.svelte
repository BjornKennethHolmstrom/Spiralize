<!-- src/lib/components/PeaceQuiz.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import type { Language } from '../types/spiral';

  export let language: Language = 'en';
  const dispatch = createEventDispatcher();
  
  // State variables
  let currentQuestionIndex = 0;
  let answers: number[] = [];
  let showResults = false;
  
  // Quiz structure
  const translations = {
    en: {
      title: "Where Are You on the Peace Spiral?",
      description: "Answer these questions to discover your dominant perspective on peace and conflict.",
      nextButton: "Next",
      prevButton: "Previous",
      submitButton: "See Results",
      restartButton: "Take Quiz Again",
      resultTitle: "Your Peace Perspective",
      resultIntro: "Based on your answers, you tend to view peace from a",
      perspective: "perspective",
      learnMore: "Learn more about this stage and how to expand your peace-building toolkit.",
      questions: [
        {
          text: "When conflict arises, what's most important to you?",
          options: [
            { text: "Ensuring my basic safety and security", stageValue: "beige" },
            { text: "Preserving community traditions and harmony", stageValue: "purple" },
            { text: "Standing my ground and maintaining strength", stageValue: "red" },
            { text: "Following proper procedures and rules", stageValue: "blue" },
            { text: "Finding strategic solutions that benefit all parties", stageValue: "orange" },
            { text: "Ensuring everyone's voice is heard equally", stageValue: "green" },
            { text: "Understanding the underlying system that created the conflict", stageValue: "yellow" },
            { text: "Seeing the conflict as part of a larger evolutionary process", stageValue: "turquoise" },
            { text: "Pioneering new paradigms that transcend previous limitations", stageValue: "coral" }
          ]
        },
        {
          text: "In your view, which of these would contribute most to world peace?",
          options: [
            { text: "Meeting everyone's basic survival needs", stageValue: "beige" },
            { text: "Respecting ancestral wisdom and traditional practices", stageValue: "purple" },
            { text: "Strong leadership and clear boundaries", stageValue: "red" },
            { text: "Universal moral principles and rule of law", stageValue: "blue" },
            { text: "Economic prosperity and technological solutions", stageValue: "orange" },
            { text: "Social justice and equality for all people", stageValue: "green" },
            { text: "Adaptive systems that integrate multiple perspectives", stageValue: "yellow" },
            { text: "Recognition of our fundamental interconnectedness", stageValue: "turquoise" },
            { text: "Conscious evolution of new forms of relationship", stageValue: "coral" }
          ]
        },
        {
          text: "What do you see as the main cause of conflict?",
          options: [
            { text: "Scarcity of resources and basic necessities", stageValue: "beige" },
            { text: "Disrespect for traditions and community values", stageValue: "purple" },
            { text: "Power imbalances and challenges to authority", stageValue: "red" },
            { text: "Lack of clear rules and moral guidance", stageValue: "blue" },
            { text: "Inefficiency and missed opportunities", stageValue: "orange" },
            { text: "Inequality and marginalization of groups", stageValue: "green" },
            { text: "Systemic failures and misaligned incentives", stageValue: "yellow" },
            { text: "Fragmentation and separation consciousness", stageValue: "turquoise" },
            { text: "Limiting paradigms that prevent creative solutions", stageValue: "coral" }
          ]
        },
        {
          text: "How do you prefer to resolve interpersonal conflicts?",
          options: [
            { text: "Focus on immediate safety first", stageValue: "beige" },
            { text: "Seek guidance from elders or trusted community members", stageValue: "purple" },
            { text: "Address issues directly and assertively", stageValue: "red" },
            { text: "Follow established procedures for conflict resolution", stageValue: "blue" },
            { text: "Negotiate for mutually beneficial outcomes", stageValue: "orange" },
            { text: "Ensure everyone's feelings and perspectives are heard", stageValue: "green" },
            { text: "Examine the patterns creating the conflict", stageValue: "yellow" },
            { text: "Approach it with compassion as part of our shared journey", stageValue: "turquoise" },
            { text: "Create entirely new frameworks that transcend the conflict", stageValue: "coral" }
          ]
        },
        {
          text: "What would be your ideal approach to international peacebuilding?",
          options: [
            { text: "Ensure basic security and humanitarian aid", stageValue: "beige" },
            { text: "Honor cultural traditions and local wisdom", stageValue: "purple" },
            { text: "Establish clear leadership and security forces", stageValue: "red" },
            { text: "Implement robust legal frameworks and institutions", stageValue: "blue" },
            { text: "Develop economic partnerships and technological solutions", stageValue: "orange" },
            { text: "Create inclusive processes that address historical injustices", stageValue: "green" },
            { text: "Design adaptive systems that respond to complexity", stageValue: "yellow" },
            { text: "Foster recognition of our global interconnection", stageValue: "turquoise" },
            { text: "Pioneer entirely new paradigms of relationship", stageValue: "coral" }
          ]
        }
      ]
    },
    sv: {
      title: "Var är du på Fredsspiralen?",
      description: "Besvara dessa frågor för att upptäcka ditt dominerande perspektiv på fred och konflikt.",
      nextButton: "Nästa",
      prevButton: "Föregående",
      submitButton: "Se resultat",
      restartButton: "Ta testet igen",
      resultTitle: "Ditt Fredsperspektiv",
      resultIntro: "Baserat på dina svar tenderar du att se fred från ett",
      perspective: "perspektiv",
      learnMore: "Lär dig mer om detta stadium och hur du kan utöka din fredsbyggande verktygslåda.",
      questions: [
        {
          text: "När konflikt uppstår, vad är viktigast för dig?",
          options: [
            { text: "Säkerställa min grundläggande trygghet och säkerhet", stageValue: "beige" },
            { text: "Bevara gemenskapens traditioner och harmoni", stageValue: "purple" },
            { text: "Stå på mig och upprätthålla styrka", stageValue: "red" },
            { text: "Följa korrekta procedurer och regler", stageValue: "blue" },
            { text: "Hitta strategiska lösningar som gynnar alla parter", stageValue: "orange" },
            { text: "Säkerställa att allas röst hörs lika", stageValue: "green" },
            { text: "Förstå det underliggande system som skapade konflikten", stageValue: "yellow" },
            { text: "Se konflikten som en del av en större evolutionär process", stageValue: "turquoise" },
            { text: "Bana väg för nya paradigm som överskrider tidigare begränsningar", stageValue: "coral" }
          ]
        },
        {
          text: "Enligt din åsikt, vilken av dessa skulle bidra mest till världsfred?",
          options: [
            { text: "Möta allas grundläggande överlevnadsbehov", stageValue: "beige" },
            { text: "Respektera förfäders visdom och traditionella praktiker", stageValue: "purple" },
            { text: "Starkt ledarskap och tydliga gränser", stageValue: "red" },
            { text: "Universella moraliska principer och rättsstatsprincipen", stageValue: "blue" },
            { text: "Ekonomiskt välstånd och teknologiska lösningar", stageValue: "orange" },
            { text: "Social rättvisa och jämlikhet för alla människor", stageValue: "green" },
            { text: "Adaptiva system som integrerar flera perspektiv", stageValue: "yellow" },
            { text: "Erkännande av vår grundläggande sammankoppling", stageValue: "turquoise" },
            { text: "Medveten evolution av nya former av relation", stageValue: "coral" }
          ]
        },
        {
          text: "Vad ser du som huvudorsaken till konflikt?",
          options: [
            { text: "Brist på resurser och grundläggande förnödenheter", stageValue: "beige" },
            { text: "Brist på respekt för traditioner och gemenskapsvärden", stageValue: "purple" },
            { text: "Maktobalanser och utmaningar mot auktoritet", stageValue: "red" },
            { text: "Brist på tydliga regler och moralisk vägledning", stageValue: "blue" },
            { text: "Ineffektivitet och missade möjligheter", stageValue: "orange" },
            { text: "Ojämlikhet och marginalisering av grupper", stageValue: "green" },
            { text: "Systemfel och felriktade incitament", stageValue: "yellow" },
            { text: "Fragmentering och separationsmedvetande", stageValue: "turquoise" },
            { text: "Begränsande paradigm som hindrar kreativa lösningar", stageValue: "coral" }
          ]
        },
        {
          text: "Hur föredrar du att lösa mellanmänskliga konflikter?",
          options: [
            { text: "Fokusera på omedelbar säkerhet först", stageValue: "beige" },
            { text: "Söka vägledning från äldre eller betrodda gemenskapsmedlemmar", stageValue: "purple" },
            { text: "Ta itu med problem direkt och bestämt", stageValue: "red" },
            { text: "Följa etablerade procedurer för konfliktlösning", stageValue: "blue" },
            { text: "Förhandla för ömsesidigt fördelaktiga resultat", stageValue: "orange" },
            { text: "Säkerställa att allas känslor och perspektiv hörs", stageValue: "green" },
            { text: "Undersöka mönstren som skapar konflikten", stageValue: "yellow" },
            { text: "Närma sig det med medkänsla som en del av vår gemensamma resa", stageValue: "turquoise" },
            { text: "Skapa helt nya ramverk som överskrider konflikten", stageValue: "coral" }
          ]
        },
        {
          text: "Vad skulle vara ditt ideala tillvägagångssätt för internationellt fredsbyggande?",
          options: [
            { text: "Säkerställa grundläggande säkerhet och humanitärt bistånd", stageValue: "beige" },
            { text: "Hedra kulturella traditioner och lokal visdom", stageValue: "purple" },
            { text: "Etablera tydligt ledarskap och säkerhetsstyrkor", stageValue: "red" },
            { text: "Implementera robusta rättsliga ramverk och institutioner", stageValue: "blue" },
            { text: "Utveckla ekonomiska partnerskap och teknologiska lösningar", stageValue: "orange" },
            { text: "Skapa inkluderande processer som adresserar historiska orättvisor", stageValue: "green" },
            { text: "Designa adaptiva system som svarar på komplexitet", stageValue: "yellow" },
            { text: "Främja erkännande av vår globala sammankoppling", stageValue: "turquoise" },
            { text: "Bana väg för helt nya relationsparadigm", stageValue: "coral" }
          ]
        }
      ]
    }
  };

  $: t = translations[language];
  $: currentQuestion = t.questions[currentQuestionIndex];
  $: progress = ((currentQuestionIndex + 1) / t.questions.length) * 100;
  $: isLastQuestion = currentQuestionIndex === t.questions.length - 1;
  $: isFirstQuestion = currentQuestionIndex === 0;

  // Stage names in both languages
  const stageNames = {
    beige: { en: 'Survival', sv: 'Överlevnad' },
    purple: { en: 'Tribal', sv: 'Stamtillhörighet' },
    red: { en: 'Power', sv: 'Makt' },
    blue: { en: 'Order', sv: 'Ordning' },
    orange: { en: 'Achievement', sv: 'Prestation' },
    green: { en: 'Community', sv: 'Gemenskap' },
    yellow: { en: 'Systemic', sv: 'Systemisk' },
    turquoise: { en: 'Holistic', sv: 'Holistisk' },
    coral: { en: 'Sovereign Unity', sv: 'Suverän Enhet' }
  };
  
  // Stage colors for styling
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

  // Brief descriptions of peace perspective for each stage
  const stagePeaceDescription = {
    beige: {
      en: "Your focus on basic safety and security forms the foundation of all peace work. You understand that without addressing fundamental human needs, more complex peace initiatives cannot succeed.",
      sv: "Ditt fokus på grundläggande säkerhet utgör grunden för allt fredsarbete. Du förstår att utan att adressera grundläggande mänskliga behov kan inte mer komplexa fredsinitiativ lyckas."
    },
    purple: {
      en: "You recognize the importance of tradition, belonging, and community harmony in peace processes. Your approach honors ancestral wisdom and cultural continuity as essential for lasting peace.",
      sv: "Du erkänner vikten av tradition, tillhörighet och gemenskapsharmoni i fredsprocesser. Ditt förhållningssätt hedrar förfäders visdom och kulturell kontinuitet som nödvändiga för varaktig fred."
    },
    red: {
      en: "You understand that peace sometimes requires strength and decisive action. Your approach values clear boundaries and the courage to stand firm when necessary to protect what matters.",
      sv: "Du förstår att fred ibland kräver styrka och beslutsamt handlande. Ditt förhållningssätt värdesätter tydliga gränser och modet att stå fast när det behövs för att skydda det som är viktigt."
    },
    blue: {
      en: "You see peace through the lens of order, principles, and proper procedures. Your approach values creating stable frameworks and clear rules that everyone can follow and respect.",
      sv: "Du ser fred genom linsen av ordning, principer och korrekta procedurer. Ditt förhållningssätt värdesätter att skapa stabila ramverk och tydliga regler som alla kan följa och respektera."
    },
    orange: {
      en: "You approach peace strategically, focusing on practical solutions and mutual benefit. Your perspective values innovation, negotiation, and finding win-win arrangements that advance everyone's interests.",
      sv: "Du närmar dig fred strategiskt, med fokus på praktiska lösningar och ömsesidig nytta. Ditt perspektiv värdesätter innovation, förhandling och att hitta vinn-vinn-arrangemang som främjar allas intressen."
    },
    green: {
      en: "Your perspective centers on inclusivity, equality, and healing relationships. You value ensuring all voices are heard, addressing historical injustices, and creating processes that honor diversity.",
      sv: "Ditt perspektiv centrerar kring inkludering, jämlikhet och helande relationer. Du värdesätter att säkerställa att alla röster hörs, adressera historiska orättvisor och skapa processer som hedrar mångfald."
    },
    yellow: {
      en: "You see peace through a systems lens, understanding how different elements interact in complex ways. Your approach integrates multiple perspectives and adapts solutions to specific contexts.",
      sv: "Du ser fred genom en systemlins, och förstår hur olika element interagerar på komplexa sätt. Ditt förhållningssätt integrerar flera perspektiv och anpassar lösningar till specifika sammanhang."
    },
    turquoise: {
      en: "Your holistic perspective recognizes our fundamental interconnectedness. You see peace as flowing from the recognition of our shared humanity and place within the larger living system of Earth.",
      sv: "Ditt holistiska perspektiv erkänner vår grundläggande sammankoppling. Du ser fred som flödande från erkännandet av vår gemensamma mänsklighet och plats inom det större levande systemet Jorden."
    },
    coral: {
      en: "You approach peace as a creative evolutionary process. Your perspective combines individual sovereignty with universal harmony, pioneering new paradigms that transcend previous limitations.",
      sv: "Du närmar dig fred som en kreativ evolutionär process. Ditt perspektiv kombinerar individuell suveränitet med universell harmoni, och banar väg för nya paradigm som överskrider tidigare begränsningar."
    }
  };
  
  // Handle selecting an answer
  function selectAnswer(stageValue: string) {
    // Add the answer to our array
    answers[currentQuestionIndex] = stageValue;
    
    if (isLastQuestion) {
      // If this is the last question, show results
      calculateResults();
    } else {
      // Otherwise, go to next question
      currentQuestionIndex++;
    }
  }
  
  // Go to previous question
  function goToPrevious() {
    if (!isFirstQuestion) {
      currentQuestionIndex--;
    }
  }
  
  // Calculate final results
  function calculateResults() {
    showResults = true;
    
    // Count occurrences of each stage in answers
    const stageCounts = {};
    answers.forEach(answer => {
      stageCounts[answer] = (stageCounts[answer] || 0) + 1;
    });
    
    // Find the dominant stage (most frequent)
    let maxCount = 0;
    let dominantStage = '';
    
    Object.entries(stageCounts).forEach(([stage, count]) => {
      if (count > maxCount) {
        maxCount = count as number;
        dominantStage = stage;
      }
    });
    
    // Dispatch results to parent component
    dispatch('results', { 
      dominantStage,
      stageCounts
    });
    
    return dominantStage;
  }
  
  // Restart the quiz
  function restartQuiz() {
    currentQuestionIndex = 0;
    answers = [];
    showResults = false;
  }
  
  // Calculate dominant stage for results display
  $: dominantStage = showResults ? calculateDominantStage() : null;
  
  function calculateDominantStage() {
    // Count occurrences of each stage in answers
    const stageCounts = {};
    answers.forEach(answer => {
      stageCounts[answer] = (stageCounts[answer] || 0) + 1;
    });
    
    // Find the dominant stage (most frequent)
    let maxCount = 0;
    let dominant = '';
    
    Object.entries(stageCounts).forEach(([stage, count]) => {
      if (count > maxCount) {
        maxCount = count as number;
        dominant = stage;
      }
    });
    
    return dominant;
  }
</script>

<div class="peace-quiz bg-white rounded-xl shadow-sm p-6">
  <h3 class="text-xl font-semibold mb-4 text-gray-800">{t.title}</h3>
  <p class="text-gray-600 mb-6">{t.description}</p>
  
  <!-- Progress bar -->
  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-6">
    <div 
      class="bg-purple-600 h-2.5 rounded-full transition-all duration-300" 
      style="width: {progress}%"
    ></div>
  </div>
  
  {#if !showResults}
    <!-- Questions -->
    <div class="mb-8 bg-white">
      <h4 class="text-lg font-medium mb-4 text-gray-800">
        {currentQuestionIndex + 1}. {currentQuestion.text}
      </h4>
      
      <div class="space-y-3">
        {#each currentQuestion.options as option}
          <button
            class="w-full text-left p-4 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            on:click={() => selectAnswer(option.stageValue)}
          >
            {option.text}
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Navigation buttons -->
    <div class="flex justify-between">
      <button
        class="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        on:click={goToPrevious}
        disabled={isFirstQuestion}
      >
        &larr; {t.prevButton}
      </button>
      
      <div class="text-sm text-gray-500">
        {currentQuestionIndex + 1} / {t.questions.length}
      </div>
      
      <div class="w-20">
        <!-- Placeholder for layout balance -->
      </div>
    </div>
  {:else}
    <!-- Results -->
    <div in:fade={{ duration: 300 }}>
      <h4 class="text-xl font-medium mb-2">{t.resultTitle}</h4>
      
      {#if dominantStage}
        <div 
          class="p-6 rounded-lg border-l-4 mb-6" 
          style="border-color: {stageColors[dominantStage]}; background-color: {stageColors[dominantStage]}10;"
        >
          <p class="mb-2">
            {t.resultIntro} <strong>{stageNames[dominantStage][language]}</strong> {t.perspective}.
          </p>
          <p class="text-gray-600">
            {stagePeaceDescription[dominantStage][language]}
          </p>
        </div>
        
        <button
          class="block w-full text-center py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          on:click={restartQuiz}
        >
          {t.restartButton}
        </button>
        
        <p class="text-center text-sm text-purple-600 mt-4">
          <a href="#learn-more-section" class="hover:underline">
            {t.learnMore}
          </a>
        </p>
      {/if}
    </div>
  {/if}
</div>

<style>
  button:focus {
    outline: 2px solid #6366F1;
    outline-offset: 2px;
  }
</style>
