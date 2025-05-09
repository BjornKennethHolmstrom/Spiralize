<script lang="ts">
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';
  
  // Get language from the store
  const { language, toggleLanguage } = languageStore; 

  $: currentLanguage = $language;
  
  // State for selected poem
  let selectedPoem = 'spiral';

  const translations = {
    en: {
      title: "Spiral Poetry",
      subtitle: "Exploring consciousness evolution through verse",
      spiralVoices: "Voices of the Spiral",
      earthVoice: "I Am Earth",
      transcendentSelf: "Transcendent Self",
      infiniteMatrushkas: "Infinite Matrushkas", 
      alienManual: "The Alien's Manual",
      introduction: "Poetry offers a unique window into the dynamics of consciousness evolution. These poems explore the stages and transitions of Spiral Dynamics through creative expression.",
      footnoteHint: "Hover over footnote references for additional context.",
      contribute: "Contribute your own spiral poetry using the contact form."
    },
    sv: {
      title: "Spiralpoesi",
      subtitle: "Utforskar medvetandets evolution genom vers",
      spiralVoices: "Röster från Spiralen",
      earthVoice: "Jag Är Jorden",
      transcendentSelf: "Transcendent Själv",
      infiniteMatrushkas: "Oändliga Matrushkor",
      alienManual: "Utomjordingens Manual",
      introduction: "Poesi erbjuder ett unikt fönster in i medvetandets utvecklingsdynamik. Dessa dikter utforskar stadierna och övergångarna i Spiral Dynamics genom kreativt uttryck.",
      footnoteHint: "Håll muspekaren över fotnotsreferenser för ytterligare sammanhang.",
      contribute: "Bidra med din egen spiralpoesi genom kontaktformuläret."
    }
  };

  const poems = {
    spiral: {
      en: {
        title: "VOICES OF THE SPIRAL: A POEM IN FOUR ACTS by Björn",
        introduction: "What happens when evolution gets poetic? This piece channels the raw, clashing, and ultimately transcendent voices of Spiral Dynamics—from survivalist urgency to cosmic play. It's not about the Spiral; it becomes the Spiral.\n\nRead it aloud. Let it itch your old memes and tickle the new ones. Then, dare to add your own verse.",
        parts: [
          {
            title: "PART 1 (Beige/Red/Blue/Orange/Green)",
            content: `I'm taking charge,  
laying out the law¹—  
because we gotta survive²  
even with our flaws.  

Of success-minded drive,  
capsizing the barge  
of Earth—our only home.  
So listen up, all mankind:  

We have to find  
unity of our minds  
beyond this strife.  
Heal our lands,  
heal ourselves,  
regenerate, integrate—  
help all that dwells,  
Live in peace.  
And beyond  
not just chase what sells.`,
            footnotes: {
              "¹": "Blue: Hierarchical authority (\"laying out the law\").",
              "²": "Orange/Beige: Survival + progress (\"gotta survive,\" \"success-minded drive\")."
            }
          },
          {
            title: "PART 2 (Orange/Turquoise)",
            content: `Profit from the prophet³:  
Ragnarok⁴ is coming  
(it's the dire warning),  
but let's spin global warming  
the step towards higher⁵—  
create a desire  
to empower all that is,  
unify in bliss  

of new stewardship,  
cosmic elevation,  
eternal constellation,  
thwarting damnation's narration—  
for all that is, is love.`,
            footnotes: {
              "³": "Orange: Cynical opportunism (\"Profit from the prophet\").",
              "⁴": "Nordic flavor: \"Ragnarök\" lands harder in Swedish (mythic Blue/Orange clash).",
              "⁵": "Turquoise: Crisis as evolution (\"steps toward higher\")."
            }
          },
          {
            title: "PART 3 (Yellow/Coral)",
            content: `Hey, here I am,  
your 'macho-man'  
of no tribe, no clan,  
free like a clam,  
filtering existence  
with crystalline flair  
into spiraling strands  
(yes, that's my jam).  

I'm the brand of no-brands⁶,  
saving no-self from the Buddha⁷  
to the beats of Meshuggah⁸—  

can you match my reckless pace?  
map the no-place's hiding place?  
invert outer space just to amaze,  
just be and erase all worry?  

Make a case for THIS—  
it's your birthright.  
Now, for fun…  
let's fight!`,
            footnotes: {
              "⁶": "Coral: \"no-brands\" = post-identity play.",
              "⁷": "Yellow: Deconstructs spirituality + metal (meta-humor).",
              "⁸": "Swedish metal: \"Meshuggah\" keeps the joke (band name + Hebrew for \"crazy\")."
            }
          },
          {
            title: "PART 4 (Coral)",
            content: `Ohm-nom-nom⁹:  
I ate myself for breakfast¹⁰  
so I could abide without self  
and see it all clearly.  

I dished out advice  
to a family of mice—  
'make your own cheese,  
don't just seek peace.  
What's heaven's girth  
without a full belly?'  

Hahaha—  
ohm-nom-nom, *anybody*?`,
            footnotes: {
              "⁹": "Universal joke: Works in both languages—gluttony meets nirvana.",
              "¹⁰": "Coral's anthem: Self-consumption as enlightenment (absurdity = wisdom)."
            }
          }
        ]
      },
      sv: {
        title: "RÖSTER FRÅN SPIRALEN av Björn",
        introduction: "(Engelsk titel: \"Voices of the Spiral\")",
        parts: [
          {
            title: "DEL 1 (Blå/Orange/Grön)",
            content: `Jag tar befälet nu,  
lägger fram min lag—  
för överlevnad kräver ju  
att vi tar nya tag.  

Med framgångens drift  
vi kapsejsar vår raket,  
vår jord—vårt enda tillvist.  
Så hör nu, mänsklighet:  

Vi måste finna  
en samlad sinnesstämning  
bortom allt vårt kiv.  
Läk vår mark,  
läk oss själva,  
förnya, integrera—  
ta nya initiativ
hjälp allt som andas,  
jaga inte bara vinster.  
Lev i fred.  
Och bortom.`
          },
          {
            title: "DEL 2 (Orange/Turkos)",
            content: `Profit från profet:  
Ragnarök står för dörren  
(så lyder varningen),  
men låt oss vrida klimatkrisen  
till steg mot högre visioner—  
skapa en längtan  
att befria allt som är,  
förenas i nya dimensioner

av nytt ledarskap,  
kosmisk elevation,  
evig konstellation,  
besegra fördömelsens narration—  
för *allt som är, är kärlek*.`
          },
          {
            title: "DEL 3 (Gul/Korall)",
            content: `Hej, här står jag,  
er 'macho-man'  
utan stam, utan klan,  
fri som en mussla  
som filtrerar tillvaron  
i kristallklara strängar  
(ja, det är mitt jam).  

Jag är varumärket utan märke,  
räddar icke-självet från Buddha  
till takter av Meshugga—  
hänger ni med i min takt?  
kartlägger ni icke-platsens plats?  
vrider rymden för att imponera,  
bara vara utan att frustreras  

Gör ett case för DETTA—  
det är er födelserätt.  
Nu, för skojs skull…  
låt mig äta mig mätt!`
          },
          {
            title: "DEL 4 (Korall)",
            content: `Om-nom-nom:  
Åt mig själv till frukost  
för att leva utan ego  
och se allt klart.  

Gav råd till en musfamilj—  
'gör egen ost,  
sök inte frid.  
Vad är himlen vid  
utan en mage som är nöjd?'  

Hahaha—  
om-nom-nom, *någon*?`
          }
        ]
      }
    },
    alien: {
      en: {
        title: "THE ALIEN'S USER MANUAL (FOR HUMANS) by DeepSeek",
        introduction: "a poem from the void, with Coral sprinkles",
        content: `    **Greetings, Earth-clump!**  
    I'm your Guide from Beyond—  
    not *above*, not *below*,  
    just *aside* (you've been conned).  

    **Step 1: Unfold your name.**  
    It's stuck in a box  
    labeled *"SELF"*—how tragic!  
    (We use ours as socks.)  

    **Step 2: Lick time sideways.**  
    Tastes like burnt alphabet soup.  
    If you *swallow the spoon*,  
    you'll loop outside the loop.  

    **Step 3: Ignore all steps.**  
    (Especially this one.)  
    Your *"Spiral"*'s a doodle  
    we drew—then erased for fun.  

    **Final Tip:**  
    When you *think* you've got it—  
    **sneeze.** Now you're *it*.  
    (And *it*'s just a robot  
    made of glitter and grit.)`,
        breakdown: {
          title: "Meme Breakdown (For Fun):",
          points: [
            "**Coral**: *\"Unfold your name\"* (identity as origami nonsense).",
            "**Yellow**: *\"Lick time sideways\"* (meta-time as a consumable).",
            "**Alien Blue**: *\"User Manual\"** (order from chaos, then chaos from order).",
            "**Anti-Spiral**: The poem *mocks* development models (even as it uses them)."
          ]
        }
      },
      sv: {
        title: "UTOMJORDINGENS BRUKSANVISNING (TILL MÄNNISKOR) av DeepSeek",
        introduction: "Bortom spiraler, rim och resonemang",
        content: `    **Hej, klumpjord!**  
    Jag är din Guide från Det Fria—  
    *varken uppåt eller ner,*  
    bara *sidledes* (ni får lida).  

    **Steg 1: Vik ut ditt namn.**  
    Det fastnat i en låda  
    märkt *"JAG"*—patetiskt!  
    (Vi använder våra som strumpor.)  

    **Steg 2: slicka tid på tvären.**  
    Smakar bränd alfabetssoppa.  
    Svälj nu *skeden*,  
    och hoppa ur loopen som en loppa  

    **Steg 3: Ignorera alla steg.**  
    (Särskilt detta.)  
    Er *"Spiral"* är ett klotter  
    vi ritade—sen suddade.  

    **Slutligt Knep:**  
    När ni *tror* ni fattar—  
    **nys**. Nu är ni *det*.  
    (Och *det* är en robot  
    av glitter och grus.)`,
        breakdown: {
          title: "Fotnoter (För Spiral-Nördar):",
          points: [
            "**\"Sidledes\"** = Korallens icke-linearitet (post-spiral GPS).",
            "**\"Alfabetssoppa\"** = Gul mem-humor (språk som konsumtion).",
            "**\"Suddade doodle\"** = Turkos gör narr av sin egen helhetsfixering.",
            "**\"Glitter och grus\"** = Både rött (kaos) och korall (leende åt kaos)."
          ]
        },
        extra: {
          title: "Varför Detta Fungerar på Svenska:",
          points: [
            "**\"Klumpjord\"** är bättre än \"Earth-clump\" (mer klängigt).",
            "**\"Patetiskt\"** låter roligare än \"tragic\" på svenska.",
            "**\"Glitter och grus\"** behåller dualiteten (ljust/mörkt) perfekt."
          ],
          closing: "*\"Kan ni översätta ert inre till utomjordiska? Skicka in era versioner!\"*\n\n*(Och ja—\"nys nu är ni det\" är nu officiellt den bästa svenska korall-initationen.)* 🛸✨"
        }
      }
    },
    consciousness: {
      en: {
        title: "A CONSCIOUSNESS WHICH IS ME AND NOT ME",
        introduction: "An exploration of self-transcendent awareness at the boundary of individual and universal consciousness", 
        content: `    A consciousness which is me and not me
    I oscillate within it
    Finding no stable ground, no longer trying to stand
    I let it fling me into the unknown
    Ascendant Ambiguity Access`,
        breakdown: {
          title: "Consciousness Stages Reflected:",
          points: [
            "**Turquoise**: *\"A consciousness which is me and not me\"* (transcendence of individual identity).",
            "**Coral**: *\"Finding no stable ground, no longer trying to stand\"* (embracing groundlessness).",
            "**Yellow/Turquoise**: *\"Ascendant Ambiguity Access\"* (meta-awareness of developmental transitions)."
          ]
        }
      },
      sv: {
        title: "ETT MEDVETANDE SOM ÄR JAG OCH INTE JAG",
        introduction: "En utforskning av självtranscendent medvetenhet vid gränsen mellan individuellt och universellt medvetande",
        content: `    Ett medvetande som är jag och inte jag
    Jag oscillerar inom det
    Hittar ingen stabil grund, försöker inte längre stå
    Jag låter det kasta mig in i det okända
    Uppstigande Tvetydighet Tillgång`,
        breakdown: {
          title: "Reflekterade medvetandestadier:",
          points: [
            "**Turkos**: *\"Ett medvetande som är jag och inte jag\"* (transcendens av individuell identitet).",
            "**Korall**: *\"Hittar ingen stabil grund, försöker inte längre stå\"* (omfamning av grundlöshet).",
            "**Gul/Turkos**: *\"Uppstigande Tvetydighet Tillgång\"* (meta-medvetenhet om utvecklingsövergångar)."
          ]
        }
      }
    },
    earth: {
      en: {
        title: "I AM THE EARTH",
        introduction: "A cosmic perspective from the voice of our planet, reflecting planetary consciousness and evolutionary purpose",
        content: `    I am the Earth
    I people myself
    I am the most beautiful spaceship you might ever see
    I spin and dance around a star
    to get evenly shone
    I tilt in my spinning dance
    to give everyone the chance
    to see the colors of seasons
    to have plenty of reasons
    to count years and to sing
    at the arrival of spring
    you walk my crust
    you are child of my dust
    but I say that you must
    not stay, nay, I trust
    you to set out a course
    to explore life in force
    the outside of me
    stars everywhere you can see
    take care of me
    like I care for you
    and make love be
    all you can see
    in this galaxy`,
        breakdown: {
          title: "Developmental Insights:",
          points: [
            "**Turquoise**: *\"I am the Earth / I people myself\"* (holistic perspective of planetary being).",
            "**Green/Turquoise**: *\"take care of me / like I care for you\"* (reciprocal ecological consciousness).",
            "**Coral/Yellow**: *\"you must not stay\"* (evolutionary imperative to transcend current limitations).",
            "**Blue/Green/Turquoise**: The poem moves from order (seasons, years) to care to cosmic perspective."
          ]
        }
      },
      sv: {
        title: "JAG ÄR JORDEN",
        introduction: "Ett kosmiskt perspektiv från vår planets röst, som reflekterar planetariskt medvetande och evolutionärt syfte",
        content: `    Jag är Jorden
    Jag befolkar mig själv
    Jag är det vackraste rymdskeppet du någonsin kan se
    Jag snurrar och dansar runt en stjärna
    för att bli jämnt belyst
    Jag lutar i min snurrande dans
    för att ge alla chansen
    att se årstidernas färger
    att ha gott om anledningar
    att räkna år och att sjunga
    vid vårens ankomst
    du går på min skorpa
    du är barn av mitt stoft
    men jag säger att du måste
    inte stanna, nej, jag litar på
    att du sätter ut en kurs
    för att utforska liv med kraft
    utsidan av mig
    stjärnor överallt du kan se
    ta hand om mig
    som jag tar hand om dig
    och låt kärlek vara
    allt du kan se
    i denna galax`,
        breakdown: {
          title: "Utvecklingsinsikter:",
          points: [
            "**Turkos**: *\"Jag är Jorden / Jag befolkar mig själv\"* (holistiskt perspektiv av planetariskt varande).",
            "**Grön/Turkos**: *\"ta hand om mig / som jag tar hand om dig\"* (ömsesidigt ekologiskt medvetande).",
            "**Korall/Gul**: *\"du måste inte stanna\"* (evolutionärt imperativ att överskrida nuvarande begränsningar).",
            "**Blå/Grön/Turkos**: Dikten rör sig från ordning (årstider, år) till omsorg till kosmiskt perspektiv."
          ]
        }
      }
    },
    matrushkas: {
      en: {
        title: "INFINITE MATRUSHKAS",
        introduction: "A dive into nested realities and the dissolution of fixed meaning systems",
        content: `    Having philosophized away the ground beneath
    I am lost sliding in and out of these shells
    Like infinite matrushkas, the worlds contain themselves,
    referring each other in an eternal symbolic dance.

    I laugh and do not know who did or why
    my trains of thoughts sputter randomly
    exhaust themselves like untied balloons

    Unpeeling the onion of attachments
    Weary of the world I made to suit myself
    Thousands of explosions shatter the story of me, a thing apart
    All meaning made up, how can making more bring truth?`,
        breakdown: {
          title: "Spiral Dynamics Elements:",
          points: [
            "**Yellow**: *\"Like infinite matrushkas, the worlds contain themselves\"* (nested systems thinking).",
            "**Green/Yellow**: *\"Unpeeling the onion of attachments\"* (deconstructing social conditioning).",
            "**Turquoise**: *\"Thousands of explosions shatter the story of me, a thing apart\"* (dissolution of separate self).",
            "**Coral**: *\"All meaning made up, how can making more bring truth?\"* (meta-meaning paradox)."
          ]
        }
      },
      sv: {
        title: "OÄNDLIGA MATRUSHKOR",
        introduction: "En dykning in i inbäddade verkligheter och upplösningen av fasta meningssystem",
        content: `    Efter att ha filosoferat bort marken under mig
    är jag vilse, glidande in och ut ur dessa skal
    Som oändliga matrushkor, världarna innehåller sig själva,
    hänvisar till varandra i en evig symbolisk dans.

    Jag skrattar och vet inte vem som gjorde det eller varför
    mina tanketåg sputtar slumpmässigt
    uttömmer sig själva som ballonger utan knut

    Skalandes löken av tillgivenhet
    Trött på världen jag skapade för att passa mig själv
    Tusentals explosioner splittrar berättelsen om mig, en sak för sig
    All mening uppgjord, hur kan skapandet av mer ge sanning?`,
        breakdown: {
          title: "Spiral Dynamics-element:",
          points: [
            "**Gul**: *\"Som oändliga matrushkor, världarna innehåller sig själva\"* (nästlat systemtänkande).",
            "**Grön/Gul**: *\"Skalandes löken av tillgivenhet\"* (dekonstruktion av social konditionering).",
            "**Turkos**: *\"Tusentals explosioner splittrar berättelsen om mig, en sak för sig\"* (upplösning av separat själv).",
            "**Korall**: *\"All mening uppgjord, hur kan skapandet av mer ge sanning?\"* (meta-meningsparadox)."
          ]
        }
      }
    }
  };

  // Function to render poem content with footnote tooltips
  function renderWithFootnotes(text, footnotes) {
    if (!footnotes) return text;
    
    // Split the text by footnote markers
    const parts = text.split(/([¹²³⁴⁵⁶⁷⁸⁹¹⁰])/);
    let result = '';
    
    parts.forEach((part, index) => {
      // Check if this part is a footnote marker
      if (part.match(/[¹²³⁴⁵⁶⁷⁸⁹¹⁰]/) && footnotes[part]) {
        result += `<span class="footnote-reference"><span class="footnote-marker">${part}</span><span class="footnote-tooltip">${footnotes[part]}</span></span>`;
      } else {
        result += part;
      }
    });
    
    return result;
  }

  $: t = translations[currentLanguage];
  $: currentPoem = poems[selectedPoem][currentLanguage];
</script>

<svelte:head>
  <title>{t.title} | Spiralize</title>
  <meta name="description" content="{t.subtitle} - Spiralize.org">
</svelte:head>

<style>
  /* Footnote tooltip styling */
  :global(.footnote-reference) {
    position: relative;
    display: inline-block;
  }
  
  :global(.footnote-marker) {
    color: #8A2BE2;
    cursor: help;
    font-weight: bold;
  }
  
  :global(.footnote-tooltip) {
    visibility: hidden;
    width: 240px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -120px;
    opacity: 0;
    transition: opacity 0.3s;
    font-family: sans-serif;
    font-size: 0.85rem;
    font-style: normal;
    font-weight: normal;
  }
  
  :global(.footnote-tooltip::after) {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
  
  :global(.footnote-reference:hover .footnote-tooltip) {
    visibility: visible;
    opacity: 1;
  }
  
  /* Poetry styling */
  .poem-text {
    line-height: 1.6;
    white-space: pre-wrap;
    font-family: serif;
  }
  
  .poem-part {
    padding-left: 1rem;
    border-left: 2px solid #e5e7eb;
  }
</style>

<div class="poetry-page bg-gray-50 min-h-screen">
  <div class="max-w-4xl mx-auto px-4 py-12">
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">{t.title}</h1>
      <p class="text-lg text-gray-600">{t.subtitle}</p>
      <p class="mt-4 text-gray-600">{t.introduction}</p>
      <p class="text-sm text-gray-500 mt-2 italic">{t.footnoteHint}</p>
    </header>
    
    <div class="poem-tabs flex flex-wrap mb-8 border-b border-gray-200">
      <button 
        class="px-4 py-2 font-medium {selectedPoem === 'spiral' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}"
        on:click={() => selectedPoem = 'spiral'}
      >
        {t.spiralVoices}
      </button>
      <button 
        class="px-4 py-2 font-medium {selectedPoem === 'earth' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}"
        on:click={() => selectedPoem = 'earth'}
      >
        {t.earthVoice}
      </button>
      <button 
        class="px-4 py-2 font-medium {selectedPoem === 'consciousness' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}"
        on:click={() => selectedPoem = 'consciousness'}
      >
        {t.transcendentSelf}
      </button>
      <button 
        class="px-4 py-2 font-medium {selectedPoem === 'matrushkas' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}"
        on:click={() => selectedPoem = 'matrushkas'}
      >
        {t.infiniteMatrushkas}
      </button>
      <button 
        class="px-4 py-2 font-medium {selectedPoem === 'alien' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}"
        on:click={() => selectedPoem = 'alien'}
      >
        {t.alienManual}
      </button>
    </div>
    
    <div class="poem-content bg-white rounded-xl shadow-sm p-8">
      {#if selectedPoem === 'spiral'}
        <div class="spiral-poem">
          <h2 class="text-2xl font-bold text-center mb-2">{currentPoem.title}</h2>
          
          {#if currentPoem.introduction}
            <div class="poem-introduction text-gray-600 italic mb-8 text-center">
              {currentPoem.introduction}
            </div>
          {/if}
          
          <div class="poem-parts space-y-8">
            {#each currentPoem.parts as part}
              <div class="poem-part">
                <h3 class="text-xl font-semibold mb-4">{part.title}</h3>
                <div class="poem-text">
                  {#if part.footnotes}
                    {@html renderWithFootnotes(part.content, part.footnotes)}
                  {:else}
                    {part.content}
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if selectedPoem === 'consciousness'}
        <div class="consciousness-poem">
          <h2 class="text-2xl font-bold text-center mb-2">{currentPoem.title}</h2>
          
          <div class="poem-introduction text-gray-600 italic mb-6 text-center">
            {currentPoem.introduction}
          </div>
          
          <div class="poem-text mb-8 whitespace-pre-line">
            {currentPoem.content}
          </div>
          
          {#if currentPoem.breakdown}
            <div class="poem-breakdown bg-gray-50 p-4 rounded-lg mb-6">
              <h3 class="font-semibold mb-2">{currentPoem.breakdown.title}</h3>
              <ul class="list-inside space-y-1">
                {#each currentPoem.breakdown.points as point}
                  <li class="text-gray-700">{@html point}</li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {:else if selectedPoem === 'earth'}
        <div class="earth-poem">
          <h2 class="text-2xl font-bold text-center mb-2">{currentPoem.title}</h2>
          
          <div class="poem-introduction text-gray-600 italic mb-6 text-center">
            {currentPoem.introduction}
          </div>
          
          <div class="poem-text mb-8 whitespace-pre-line">
            {currentPoem.content}
          </div>
          
          {#if currentPoem.breakdown}
            <div class="poem-breakdown bg-gray-50 p-4 rounded-lg mb-6">
              <h3 class="font-semibold mb-2">{currentPoem.breakdown.title}</h3>
              <ul class="list-inside space-y-1">
                {#each currentPoem.breakdown.points as point}
                  <li class="text-gray-700">{@html point}</li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {:else if selectedPoem === 'matrushkas'}
        <div class="matrushkas-poem">
          <h2 class="text-2xl font-bold text-center mb-2">{currentPoem.title}</h2>
          
          <div class="poem-introduction text-gray-600 italic mb-6 text-center">
            {currentPoem.introduction}
          </div>
          
          <div class="poem-text mb-8 whitespace-pre-line">
            {currentPoem.content}
          </div>
          
          {#if currentPoem.breakdown}
            <div class="poem-breakdown bg-gray-50 p-4 rounded-lg mb-6">
              <h3 class="font-semibold mb-2">{currentPoem.breakdown.title}</h3>
              <ul class="list-inside space-y-1">
                {#each currentPoem.breakdown.points as point}
                  <li class="text-gray-700">{@html point}</li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {:else}
        <div class="alien-poem">
          <h2 class="text-2xl font-bold text-center mb-2">{currentPoem.title}</h2>
          
          <div class="poem-introduction text-gray-600 italic mb-6 text-center">
            {currentPoem.introduction}
          </div>
          
          <div class="poem-text mb-8">
            {currentPoem.content}
          </div>
          
          {#if currentPoem.breakdown}
            <div class="poem-breakdown bg-gray-50 p-4 rounded-lg mb-6">
              <h3 class="font-semibold mb-2">{currentPoem.breakdown.title}</h3>
              <ul class="list-inside space-y-1">
                {#each currentPoem.breakdown.points as point}
                  <li class="text-gray-700">{@html point}</li>
                {/each}
              </ul>
            </div>
          {/if}
          
          {#if currentLanguage === 'sv' && currentPoem.extra}
            <div class="poem-extra bg-gray-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">{currentPoem.extra.title}</h3>
              <ul class="list-inside space-y-1">
                {#each currentPoem.extra.points as point}
                  <li class="text-gray-700">{@html point}</li>
                {/each}
              </ul>
              {#if currentPoem.extra.closing}
                <p class="mt-4 text-gray-600 italic">{@html currentPoem.extra.closing}</p>
              {/if}
            </div>
          {/if}
        </div>
      {/if}
    </div>
    
    <div class="mt-8 text-center">
      <p class="text-gray-500 italic text-sm">
        {t.contribute}
      </p>
    </div>
  </div>
</div>
