<!-- src/routes/insights/spiral-psychology/+page.svelte -->
<script lang="ts">
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  import languageStore from '$lib/stores/languageStore';
  import MysticCard from '$lib/components/MysticCard.svelte';
  import SpiralStageMatrix from '$lib/components/SpiralStageMatrix.svelte'; // New component suggestion
  import { fade } from 'svelte/transition';

  const { language } = languageStore;
  $: lang = $language;

  const text = {
    en: {
      title: "🧠 Spiral-Aware Psychology",
      subtitle: "Mental Health and the Evolution of Consciousness",
      intro: `What if some mental health crises aren't dysfunctions, but breakthroughs? What if society misinterprets transitions between Spiral stages as pathology, when they are often signs of deep change? This article explores a spiral-aware perspective on psychology, trauma, and transformation.`,
      section1: {
        title: "When the Spiral Breaks Down",
        content: `Imagine someone evolving toward Green or Yellow, but trapped in a Blue or Orange system — a job, a government, a culture. They may start breaking down: not because they are ill, but because they are misaligned. Bureaucracy, rigid expectations, and transactional relationships can destabilize higher-stage development.`
      },
      section2: {
        title: "Spiral Shock and Spiritual Emergency",
        content: `Transpersonal psychology calls it \"spiritual emergency.\" In Spiral Dynamics, it might be called \"Spiral Shock\" — the psychological tremor that arises when jumping across worldviews too quickly or without support. Without proper guidance, transitions from Red to Blue, Orange to Green, or Green to Yellow can feel like ego death.`
      },
      section3: {
        title: "A Stage-Aware View of Mental Health",
        content: `What if schizophrenia, bipolar disorder, and depression are sometimes expressions of developmental dissonance? A Spiral-informed diagnostic lens could help distinguish between pathology and transition, between breakdown and breakthrough.`
      },
      section4: {
        title: "The Matrix of Misalignment",
        content: `Here's a conceptual map of how psychological symptoms might emerge when a person's inner Spiral stage is out of sync with their environment.`
      },
      section5: {
        title: "Toward Spiral-Conscious Support Systems",
        content: `We need therapists, educators, bureaucrats, and even AI systems that understand the inner logic of development. Mental health support should not only aim to restore \"normality,\" but help individuals stabilize new levels of being.`
      },
      cta: `This is just the beginning. If this resonates, consider sharing, reflecting, and helping others through their Spiral journey.`
    },
    sv: {
      title: "🧠 Spiralmedveten Psykologi",
      subtitle: "Mental Hälsa och Medvetandets Utveckling",
      intro: `Tänk om vissa psykiska kriser inte är dysfunktioner, utan genombrott? Tänk om samhället misstolkar övergångar mellan spiralstadier som sjukdomar, när de ofta är tecken på djup förändring? Den här sidan utforskar ett spiralmedvetet perspektiv på psykologi, trauma och transformation.`,
      section1: {
        title: "När Spiralen Går Sönder",
        content: `Tänk dig någon som utvecklas mot Grön eller Gul, men är fast i ett Blått eller Orange system — ett jobb, en myndighet, en kultur. De kanske börjar gå sönder: inte för att de är sjuka, utan för att de är felanpassade. Byråkrati, rigida förväntningar och transaktionella relationer kan destabilisera högre utveckling.`
      },
      section2: {
        title: "Spiralchock och Andlig Kris",
        content: `Transpersonell psykologi kallar det \"andlig kris.\" I Spiral Dynamics kan vi tala om \"spiralchock\" — den psykologiska skälvning som uppstår vid snabba hopp mellan världsbilder utan stöd. Övergångar från Röd till Blå, Orange till Grön, eller Grön till Gul kan kännas som egots död.`
      },
      section3: {
        title: "Ett Stadieinformerat Psykiskt Perspektiv",
        content: `Tänk om schizofreni, bipolär sjukdom och depression ibland är uttryck för utvecklingsdissonans? En spiralmedveten diagnosmodell skulle kunna skilja mellan patologi och transformation.`
      },
      section4: {
        title: "Matrisen av Felanpassning",
        content: `Här är en konceptuell karta över hur psykiska symptom kan uppstå när en persons inre spiralstadium inte stämmer med omgivningen.`
      },
      section5: {
        title: "Mot Spiralmedvetna Stödsystem",
        content: `Vi behöver terapeuter, pedagoger, byråkrater och AI-system som förstår utvecklingens inre logik. Psykisk hälsovård bör inte bara återställa \"normalitet\" utan hjälpa individen att stabilisera nya existensnivåer.`
      },
      cta: `Det här är bara början. Om detta väcker något i dig — dela, reflektera, och hjälp andra i deras spiralresa.`
    }
  };
</script>

<svelte:head>
  <title>{text[lang].title} | Spiralize</title>
</svelte:head>

<section class="prose max-w-4xl mx-auto px-4 py-12">
  <h1 transition:fade>{text[lang].title}</h1>
  <h2 class="text-xl text-gray-500 dark:text-gray-300" transition:fade>{text[lang].subtitle}</h2>
  <p transition:fade>{text[lang].intro}</p>

  <div class="flex flex-col gap-20">
    <MysticCard title={text[lang].section1.title} text={text[lang].section1.content} />
    <MysticCard title={text[lang].section2.title} text={text[lang].section2.content} />
    <MysticCard title={text[lang].section3.title} text={text[lang].section3.content} />
    <MysticCard title={text[lang].section4.title} text={text[lang].section4.content} />
  </div>

  <div class="my-10">
    <SpiralStageMatrix />
  </div>

  <MysticCard title={text[lang].section5.title} text={text[lang].section5.content} />

  <div class="mt-8 text-lg italic text-center">
    {text[lang].cta}
  </div>

  <ShareButtons class="mt-10" />
</section>

