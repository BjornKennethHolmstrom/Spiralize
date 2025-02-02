<script lang="ts">
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // Translations
  const translations = {
    en: {
      title: "Beyond the Spiral",
      subtitle: "Exploring what lies beyond the known stages of Spiral Dynamics.",
      heading: "What Lies Beyond the Spiral?",
      intro: "Spiral Dynamics outlines the evolution of human consciousness, but does it ever truly end? This page explores potential directions beyond Ultraviolet.",
      final_stage_title: "The Final Stage (Clear/White/Transparent Consciousness)",
      final_stage_text: "A state where all distinctions dissolve, and consciousness perceives itself without mediation. Some call this a non-dual realization beyond all frameworks.",
      fractal_title: "Fractal Return / Meta-Spiral",
      fractal_text: "Instead of a linear progression, consciousness may revisit earlier stages with greater depth, forming a dynamic, self-sustaining spiral.",
      infinity_title: "No More Stages—Just Infinite Exploration",
      infinity_text: "Instead of moving ‘up’, awareness might expand in all directions, evolving in ways beyond structured progression.",
      non_dual_title: "The End of the Game? (Non-Dual Awareness)",
      non_dual_text: "Some traditions suggest that all paths, levels, and structures are ultimately illusory—leading to the realization that there was never anywhere to go.",
      reflections_title: "Reflections & Open Questions",
      reflections_text: "What does this mean for our personal and collective development? Does Spiral Dynamics remain useful, or does it eventually dissolve?",
      discussion_title: "Community Discussion & Contributions",
      discussion_text: "We invite you to share your thoughts. What do you think lies beyond the spiral?",
      breadcrumb_insights: "Insights",
      breadcrumb_beyond: "Beyond the Spiral"
    },
    sv: {
      title: "Bortom spiralen",
      subtitle: "Utforska vad som ligger bortom de kända stadierna i Spiral Dynamics.",
      heading: "Vad finns bortom spiralen?",
      intro: "Spiral Dynamics beskriver utvecklingen av mänskligt medvetande, men tar den någonsin slut? Den här sidan utforskar möjliga riktningar bortom Ultraviolet.",
      final_stage_title: "Det slutliga stadiet (Klar/Vit/Transparent Medvetenhet)",
      final_stage_text: "Ett tillstånd där alla åtskillnader upplöses och medvetandet uppfattar sig självt utan mellanled. Vissa kallar detta en icke-dualistisk insikt bortom alla ramar.",
      fractal_title: "Fraktal återkomst / Meta-Spiral",
      fractal_text: "Istället för en linjär progression kan medvetandet återbesöka tidigare stadier med större djup och bilda en dynamisk, självuppehållande spiral.",
      infinity_title: "Inga fler stadier – bara oändlig utforskning",
      infinity_text: "Istället för att röra sig 'uppåt' kan medvetandet expandera i alla riktningar och utvecklas på sätt som går bortom strukturerad progression.",
      non_dual_title: "Spelets slut? (icke-dualistisk medvetenhet)",
      non_dual_text: "Vissa traditioner menar att alla vägar, nivåer och strukturer i slutändan är illusoriska – vilket leder till insikten att det aldrig fanns någonstans att gå.",
      reflections_title: "Reflektioner & öppna frågor",
      reflections_text: "Vad innebär detta för vår personliga och kollektiva utveckling? Förblir Spiral Dynamics användbart, eller upplöses det till slut?",
      discussion_title: "Gemensam diskussion & bidrag",
      discussion_text: "Vi bjuder in dig att dela dina tankar. Vad tror du finns bortom spiralen?",
      breadcrumb_insights: "Insikter",
      breadcrumb_beyond: "Bortom spiralen"
    }
  };

  $: t = translations[currentLanguage];
  const stage = "beyond_spiral";
  const stageColors = { beyond_spiral: "#FAFFB6" };
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <!-- Navigation breadcrumbs -->
    <div class="mb-8 flex items-center text-sm">
      <a 
        href="{base}/insights" 
        class="text-purple-600 hover:text-purple-700"
      >
        {t.breadcrumb_insights}
      </a>
      <svg class="w-5 h-5 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
      <span class="text-gray-600 capitalize">{t.breadcrumb_beyond}</span>
    </div>

    <!-- Header Section -->
    <header 
      class="bg-white rounded-xl shadow-sm p-8 border-l-4"
      style="border-color: {stageColors[stage]}"
    >
      <h1 
        class="text-4xl font-bold mb-4"
        style="color: {stageColors[stage]}"
      >
        {t.title}
      </h1>
      <p class="text-xl text-gray-600">
        {t.subtitle}
      </p>
    </header>

    <div class="space-y-8 mt-8">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-semibold mb-3">{t.final_stage_title}</h2>
        <p class="text-gray-600">{t.final_stage_text}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-semibold mb-3">{t.fractal_title}</h2>
        <p class="text-gray-600">{t.fractal_text}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-semibold mb-3">{t.infinity_title}</h2>
        <p class="text-gray-600">{t.infinity_text}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-semibold mb-3">{t.non_dual_title}</h2>
        <p class="text-gray-600">{t.non_dual_text}</p>
      </div>
    </div>

    <div class="max-w-4xl mx-auto mt-16 bg-white rounded-xl shadow-sm p-8">
      <h2 class="text-2xl font-semibold mb-4">{t.reflections_title}</h2>
      <p class="text-gray-600">{t.reflections_text}</p>
    </div>
    
    <div class="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-sm p-8">
      <h2 class="text-2xl font-semibold mb-4">{t.discussion_title}</h2>
      <p class="text-gray-600">{t.discussion_text}</p>
    </div>
  </div>
</div>

