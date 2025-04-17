<!-- SpiralStageMatrix.svelte -->
<script lang="ts">
  import languageStore from '$lib/stores/languageStore';
  import { stages } from '$lib/data/stages';
  const { language } = languageStore;
  $: lang = $language;

  // Build a map of stage colors
  const stageColorMap: Record<string, string> = {};
  for (const stage of stages) {
    stageColorMap[stage.name.en] = stage.hex;
  }

  const text = {
    en: {
      title: "Spiral Misalignment Matrix",
      headers: ["Lives in → / Is internally ↓", "Beige", "Purple", "Red", "Blue", "Orange", "Green", "Yellow", "Turquoise", "Coral"],
      matrix: [
        ["Beige", "Primitive survival", "Superstition clash", "Overwhelmed by chaos", "Socially erased", "Feels exploited", "Invisible", "System-overridden", "Seen as archaic", "Neglected source"],
        ["Purple", "Tribal fear", "Mythic resonance", "Controlled by stronger", "Overruled by norms", "Dismissed as naive", "Suffocated by consensus", "Feels fragmented", "Ignored mystic", "Mythical constraint"],
        ["Red", "Power games / tribal safety", "Suppressed impulse / punishment", "Feels outsmarted / angry", "Seen as dangerous", "Viewed as unstable", "Alienated / rejected", "Manipulated system", "Lost warrior", "Overtaken by chaos"],
        ["Blue", "Moral panic / chaos fear", "Conformist comfort", "Feels judged by merit", "Tensions with relativism", "Dogmatic friction", "Feels irrelevant", "Over-complex", "Out of sync", "Incomprehensible idealism"],
        ["Orange", "Hustle without ethics", "Constrained by rules", "Competitive harmony", "Burnout in ambiguity", "Feels isolated", "Thinks others are naïve", "Too strategic", "Hollow ambition", "Post-strategic burnout"],
        ["Green", "Shunned by group", "Feels rigid / closed", "Consumer guilt", "Value resonance", "Feels overly rational", "Disoriented by mysticism", "Feels ungrounded", "Too diffuse", "Lacks integrative clarity"],
        ["Yellow", "Exploits chaos", "Manipulates order", "Feels pressured to perform", "Too detached", "Systems integration", "Disrupts unity", "Meta-friction", "Hyper-coherent", "Ego still present"],
        ["Turquoise", "Completely othered", "Misdiagnosed / mystical psychosis", "Hyper-intellectualized", "Overwhelmed by emotion", "Fractal balance", "Embodied presence", "Wisdom tension", "Disturbs deep field", "Nondual rupture"],
        ["Coral", "Post-survival root", "Visionary paradox", "Strategic shadow", "Collapsed myth order", "Quantum tension", "Shifting presence", "Boundary collapse", "Emergent turbulence", "Coral integrity"]
      ]
    },
    sv: {
      title: "Matris för Spiral-Felanpassning",
      headers: ["Lever i → / Är inuti ↓", "Beige", "Lila", "Röd", "Blå", "Orange", "Grön", "Gul", "Turkos", "Korall"],
      matrix: [
        ["Beige", "Överlevnadsdrift", "Krock med vidskepelse", "Överväldigad av kaos", "Socialt osynlig", "Känner sig utnyttjad", "Osynliggjord", "Systemöverskriden", "Ses som förlegad", "Förbisedd källa"],
        ["Lila", "Stamrädsla", "Myttrogenhet", "Kontrollerad av starkare", "Överröstad av normer", "Naiv i andras ögon", "Kvävd av konsensus", "Känner sig splittrad", "Ignorerad mystik", "Myternas fängsel"],
        ["Röd", "Maktspel / stamtrygghet", "Hämmas / bestraffas", "Känner sig lurad / arg", "Ses som farlig", "Uppfattas som ostabil", "Alienerad / avvisad", "Manipulerat system", "Vilsen krigare", "Övertagen av kaos"],
        ["Blå", "Moralpanik / kaosrädsla", "Bekväm konformitet", "Döms efter prestation", "Krockar med relativism", "Dogmatisk friktion", "Känns irrelevant", "Överkomplex", "Ur synk", "Oförståelig idealism"],
        ["Orange", "Driv utan etik", "Begränsad av regler", "Konkurrens i harmoni", "Utbränd i tvetydighet", "Känner sig isolerad", "Tror andra är naiva", "För strategisk", "Ihålig ambition", "Poststrategisk utmattning"],
        ["Grön", "Utesluten ur gruppen", "Känns stel / stängd", "Konsumentskuld", "Värderingsresonans", "För rationell", "Desorienterad av mystik", "Känns ogrundad", "För diffus", "Saknar integrerande klarhet"],
        ["Gul", "Utnyttjar kaos", "Manipulerar ordning", "Känner prestationspress", "För distanserad", "Systemintegration", "Stör enheten", "Metafriktion", "Hyperkoherens", "Egots närvaro kvar"],
        ["Turkos", "Helt främmandegjord", "Feldiagnostiserad / andlig psykos", "Hyperintellektuell", "Översköljd av känslor", "Fraktal balans", "Förkroppsligad närvaro", "Visdomsspänning", "Stör det djupa fältet", "Icke-dual splittring"],
        ["Korall", "Rotsystem efter överlevnad", "Visionär paradox", "Strategisk skugga", "Mytsk kollaps", "Kvanttension", "Skiftande närvaro", "Gränsupplösning", "Framväxande turbulens", "Korallens integritet"]
      ]
    }
  };
</script>

<div class="w-full overflow-x-auto my-8">
  <h3 class="text-2xl font-semibold mb-4">{text[lang].title}</h3>
  
  <!-- Responsive table container with improved width handling -->
  <div class="w-full">
    <table class="border-collapse w-full text-xs sm:text-sm break-words">
      <thead>
        <tr>
          {#each text[lang].headers as header, i}
            <th class="border px-2 py-2 text-left text-xs sm:text-sm md:text-base" style={i > 0 ? `background-color: ${stageColorMap[header] || '#ccc'}; color: white;` : ''}>
              {header}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each text[lang].matrix as row}
          <tr>
            {#each row as cell, i}
              <td
                class="border px-2 py-2 {i === 0 ? 'font-semibold text-white' : ''} text-xs sm:text-sm md:text-base"
                style={i === 0 ? `background-color: ${stageColorMap[cell] || '#444'}` : ''}
              >
                {cell}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
