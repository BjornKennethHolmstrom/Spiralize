<script lang="ts">
  import { onMount, createEventDispatcher, tick } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  import { stages } from '$lib/data/stages';
  import type { SpiralStage } from '$lib/types/spiral';
  import languageStore from '$lib/stores/languageStore';
  import html2canvas from 'html2canvas';
  import { dominantStageExplanations, getCombinationExplanation } from '$lib/data/stageExplanations';
 
  // Accept quiz results as props or use default empty values
  export let stageScores: Record<SpiralStage, number> = null;
  export let dominantStage: SpiralStage = null;
  export let secondaryStage: SpiralStage = null;
  
  const dispatch = createEventDispatcher();
  const { language } = languageStore;
  $: currentLanguage = $language;

  // Local state for the builder
  let customScores: Record<SpiralStage, number> = {};
  let profileName = "";
  let noteText = "";
  let isCustomizing = false;
  let spiralCanvas: HTMLDivElement;
  let isDownloading = false;
  let showInsights = false;
  let showTips = false;
  let showPresetLibrary = false;
  let previewedPreset = null;
  let savedProfiles: Array<{
    name: string;
    scores: Record<SpiralStage, number>;
    dominant: SpiralStage;
    secondary: SpiralStage;
    note: string;
    timestamp: number;
  }> = [];

  // Initialize stages array for rendering
  const stageKeys: SpiralStage[] = [
    'beige', 'purple', 'red', 'blue', 'orange', 
    'green', 'yellow', 'turquoise', 'coral', 'ultraviolet'
  ];

  const translations = {
    en: {
      title: "Personal Spiral Builder",
      description: "Visualize your Spiral Dynamics profile based on your quiz results or customize it to explore different configurations.",
      yourProfile: "Your Profile",
      customize: "Customize",
      saveProfile: "Save Profile",
      profileName: "Profile Name",
      notes: "Notes",
      resetToQuiz: "Reset to Quiz Results",
      downloadImage: "Download Image",
      savedProfiles: "Saved Profiles",
      noSavedProfiles: "No saved profiles yet. Customize and save your profile to see it here.",
      dominantStage: "Dominant Stage",
      secondaryStage: "Secondary Stage",
      enterName: "Enter a name for this profile",
      addNotes: "Add notes about this profile (optional)",
      generating: "Generating...",
      stageDistribution: "Stage Distribution",
      profileNameRequired: "Please enter a profile name",
      load: "Load",
      delete: "Delete",
      unsavedChanges: "You have unsaved changes. Save your profile?",
      confirmDelete: "Are you sure you want to delete this profile?",
      yes: "Yes",
      no: "No",
      cancel: "Cancel",
      usageTips: {
        title: "How to Use the Spiral Builder",
        description: "The Personal Spiral Builder can be a powerful tool for self-discovery and analysis:",
        tips: [
          {
            title: "Track Personal Growth",
            description: "Save profiles at different points in your life to visualize your developmental journey over time."
          },
          {
            title: "Analyze Organizations & Groups",
            description: "Create profiles that represent companies, teams, or communities to better understand their values and approaches."
          },
          {
            title: "Explore Hypothetical Scenarios",
            description: "Build profiles for different contexts in your life (work, family, hobbies) to see how your values may shift."
          },
          {
            title: "Compare Cultural Differences",
            description: "Create profiles for different societies or cultural groups to understand diverse worldviews."
          },
          {
            title: "Facilitate Communication",
            description: "Share and discuss profiles with friends or colleagues to bridge understanding across different value systems."
          }
        ]
      },
      presetLibrary: {
        title: "Famous Profiles Library",
        description: "Explore spiral profiles of notable historical and contemporary figures.",
        loadPreset: "Load Profile",
        previewPreset: "Preview"
      }
    },
    sv: {
      title: "Personlig Spiralbyggare",
      description: "Visualisera din Spiral Dynamics-profil baserad på dina quizresultat eller anpassa den för att utforska olika konfigurationer.",
      yourProfile: "Din Profil",
      customize: "Anpassa",
      saveProfile: "Spara Profil",
      profileName: "Profilnamn",
      notes: "Anteckningar",
      resetToQuiz: "Återställ till Quizresultat",
      downloadImage: "Ladda Ner Bild",
      savedProfiles: "Sparade Profiler",
      noSavedProfiles: "Inga sparade profiler ännu. Anpassa och spara din profil för att se den här.",
      dominantStage: "Dominant Stadium",
      secondaryStage: "Sekundärt Stadium",
      enterName: "Ange ett namn för denna profil",
      addNotes: "Lägg till anteckningar om denna profil (valfritt)",
      generating: "Genererar...",
      stageDistribution: "Stadiefördelning",
      profileNameRequired: "Vänligen ange ett profilnamn",
      load: "Ladda",
      delete: "Ta bort",
      unsavedChanges: "Du har osparade ändringar. Spara din profil?",
      confirmDelete: "Är du säker på att du vill ta bort denna profil?",
      yes: "Ja",
      no: "Nej",
      cancel: "Avbryt",
      usageTips: {
        title: "Hur man använder Spiralbyggaren",
        description: "Den personliga Spiralbyggaren kan vara ett kraftfullt verktyg för självupptäckt och analys:",
        tips: [
          {
            title: "Spåra Personlig Utveckling",
            description: "Spara profiler vid olika tidpunkter i ditt liv för att visualisera din utvecklingsresa över tid."
          },
          {
            title: "Analysera Organisationer & Grupper",
            description: "Skapa profiler som representerar företag, team eller samhällen för att bättre förstå deras värderingar och tillvägagångssätt."
          },
          {
            title: "Utforska Hypotetiska Scenarier",
            description: "Bygg profiler för olika sammanhang i ditt liv (arbete, familj, hobbyer) för att se hur dina värderingar kan förändras."
          },
          {
            title: "Jämför Kulturella Skillnader",
            description: "Skapa profiler för olika samhällen eller kulturella grupper för att förstå olika världssyner."
          },
          {
            title: "Underlätta Kommunikation",
            description: "Dela och diskutera profiler med vänner eller kollegor för att överbrygga förståelse mellan olika värdesystem."
          }
        ]
      },
      presetLibrary: {
        title: "Berömda Profilers Bibliotek",
        description: "Utforska spiralprofiler av anmärkningsvärda historiska och samtida personer.",
        loadPreset: "Ladda Profil",
        previewPreset: "Förhandsgranska"
      }
    }
  };

  // Famous figures profile presets for the Spiral Builder
  const famousProfilePresets = {
    en: [
      {
        id: "preset-gandhi",
        name: "Mahatma Gandhi",
        scores: {
          beige: 5,
          purple: 10,
          red: 5,
          blue: 15,
          orange: 10,
          green: 25,
          yellow: 20,
          turquoise: 10,
          coral: 0,
          ultraviolet: 0
        },
        dominant: "green",
        secondary: "yellow",
        note: "Known for his nonviolent resistance and community-focused approach to social change, with an integrated systems understanding of how to achieve justice."
      },
      {
        id: "preset-einstein",
        name: "Albert Einstein",
        scores: {
          beige: 5,
          purple: 5,
          red: 5,
          blue: 10,
          orange: 15,
          green: 10,
          yellow: 25,
          turquoise: 15,
          coral: 10,
          ultraviolet: 0
        },
        dominant: "yellow",
        secondary: "turquoise",
        note: "Combined breakthrough scientific thinking with systemic understanding of complex patterns, occasionally pioneering entirely new paradigms (Coral) that transcended conventional frameworks. His later work reflected increasingly holistic (Turquoise) perspectives."
      },
      {
        id: "preset-mandela",
        name: "Nelson Mandela",
        scores: {
          beige: 5,
          purple: 10,
          red: 5,
          blue: 15,
          orange: 10,
          green: 20,
          yellow: 25,
          turquoise: 10,
          coral: 0,
          ultraviolet: 0
        },
        dominant: "yellow",
        secondary: "green",
        note: "Demonstrated remarkable ability to integrate multiple perspectives and adapt to changing conditions while maintaining focus on reconciliation and community."
      },
      {
        id: "preset-buddha",
        name: "Gautama Buddha",
        scores: {
          beige: 5,
          purple: 10,
          red: 0,
          blue: 5,
          orange: 5,
          green: 15,
          yellow: 20,
          turquoise: 25,
          coral: 15,
          ultraviolet: 0
        },
        dominant: "turquoise",
        secondary: "yellow",
        note: "His teachings emphasized holistic awareness, interconnectedness of all life, and systemic understanding of mind and reality."
      },
      {
        id: "preset-mlk",
        name: "Martin Luther King Jr.",
        scores: {
          beige: 5,
          purple: 5,
          red: 5,
          blue: 20,
          orange: 10,
          green: 25,
          yellow: 20,
          turquoise: 10,
          coral: 0,
          ultraviolet: 0
        },
        dominant: "green",
        secondary: "yellow",
        note: "Combined strong moral principles (Blue) with inclusive community values (Green) and systemic understanding of social change (Yellow)."
      },
      {
        id: "preset-musk",
        name: "Elon Musk",
        scores: {
          beige: 5,
          purple: 5,
          red: 15,
          blue: 10,
          orange: 25,
          green: 10,
          yellow: 25,
          turquoise: 15,
          coral: 10,
          ultraviolet: 0
        },
        dominant: "orange",
        secondary: "yellow",
        note: "Exemplifies achievement-oriented thinking combined with systems understanding, focusing on technological solutions to planetary challenges."
      },
      {
        id: "preset-aoc",
        name: "Alexandria Ocasio-Cortez",
        scores: {
          beige: 5,
          purple: 5,
          red: 10,
          blue: 10,
          orange: 15,
          green: 35,
          yellow: 15,
          turquoise: 5,
          coral: 0,
          ultraviolet: 0
        },
        dominant: "green",
        secondary: "orange",
        note: "Strongly community-focused with emphasis on social justice and equality, while utilizing strategic thinking to achieve progressive goals."
      },
      {
        id: "preset-jpii",
        name: "Pope John Paul II",
        scores: {
          beige: 5,
          purple: 15,
          red: 0,
          blue: 30,
          orange: 10,
          green: 15,
          yellow: 15,
          turquoise: 10,
          coral: 0,
          ultraviolet: 0
        },
        dominant: "blue",
        secondary: "green",
        note: "Centered in traditional moral structure while expressing openness to inclusive dialogue and modern adaptations within a consistent ethical framework."
      },
      {
            id: "preset-cleopatra",
            name: "Cleopatra",
            scores: {
              beige: 10,
              purple: 20,
              red: 25,
              blue: 15,
              orange: 15,
              green: 5,
              yellow: 5,
              turquoise: 0,
              coral: 0,
              ultraviolet: 0
            },
            dominant: "red",
            secondary: "purple",
            note: "A dynamic ruler who wielded power (Red) with flair and leveraged tribal loyalty and mystique (Purple) to maintain her throne, while showing strategic savvy (Orange) in alliances with Rome."
          },
          {
            id: "preset-mother-teresa",
            name: "Mother Teresa",
            scores: {
              beige: 10,
              purple: 15,
              red: 5,
              blue: 30,
              orange: 5,
              green: 20,
              yellow: 10,
              turquoise: 5,
              coral: 0,
              ultraviolet: 0
            },
            dominant: "blue",
            secondary: "green",
            note: "Anchored in unwavering religious devotion (Blue) with a heartfelt mission to serve the downtrodden (Green), driven by a simple, duty-bound approach to alleviating suffering."
          },
          {
            id: "preset-genghis-khan",
            name: "Genghis Khan",
            scores: {
              beige: 15,
              purple: 20,
              red: 35,
              blue: 10,
              orange: 15,
              green: 5,
              yellow: 5,
              turquoise: 0,
              coral: 0,
              ultraviolet: 0
            },
            dominant: "red",
            secondary: "purple",
            note: "A fierce conqueror (Red) who unified tribes under a shared identity (Purple) and used ruthless strategy (Orange) to build one of history’s largest empires."
          }
    ],
    sv: [
      {
        id: "preset-gandhi",
        name: "Mahatma Gandhi",
        scores: {
          beige: 5,
          purple: 10,
          red: 5,
          blue: 15,
          orange: 10,
          green: 25,
          yellow: 20,
          turquoise: 10,
          coral: 0,
          ultraviolet: 0
        },
        dominant: "green",
        secondary: "yellow",
        note: "Känd för sitt ickevåldsmotstånd och gemenskapsfokuserade tillvägagångssätt för social förändring, med en integrerad systemförståelse av hur rättvisa kan uppnås."
      },
      {
        id: "preset-einstein",
        name: "Albert Einstein",
        scores: {
          beige: 5,
          purple: 5,
          red: 5,
          blue: 10,
          orange: 15,
          green: 10,
          yellow: 25,
          turquoise: 15,
          coral: 10,
          ultraviolet: 0
        },
        dominant: "yellow",
        secondary: "turquoise",
        note: "Kombinerade banbrytande vetenskapligt tänkande med systemisk förståelse av komplexa mönster, emellanåt banbrytande helt nya paradigm (Coral) som transcenderade konventionella ramar. Hans senare arbete återspeglade alltmer holistiska (Turquoise) perspektiv."
      },
      {
        id: "preset-mandela",
        name: "Nelson Mandela",
        scores: {
          beige: 5,
          purple: 10,
          red: 5,
          blue: 15,
          orange: 10,
          green: 20,
          yellow: 25,
          turquoise: 10,
          coral: 0,
          ultraviolet: 0
        },
        dominant: "yellow",
        secondary: "green",
        note: "Visade anmärkningsvärd förmåga att integrera flera perspektiv och anpassa sig till förändrade förhållanden samtidigt som fokus på försoning och gemenskap upprätthölls."
      },
      {
        id: "preset-buddha",
        name: "Gautama Buddha",
        scores: {
          beige: 5,
          purple: 10,
          red: 0,
          blue: 5,
          orange: 5,
          green: 15,
          yellow: 20,
          turquoise: 25,
          coral: 15,
          ultraviolet: 0
        },
        dominant: "turquoise",
        secondary: "yellow",
        note: "Hans läror betonade holistisk medvetenhet, sammankoppling av allt liv, och systemisk förståelse av sinne och verklighet."
      },
      {
        id: "preset-mlk",
        name: "Martin Luther King Jr.",
        scores: {
          beige: 5,
          purple: 5,
          red: 5,
          blue: 20,
          orange: 10,
          green: 25,
          yellow: 20,
          turquoise: 10,
          coral: 0,
          ultraviolet: 0
        },
        dominant: "green",
        secondary: "yellow",
        note: "Kombinerade starka moraliska principer (Blå) med inkluderande gemenskapsvärderingar (Grön) och systemisk förståelse av social förändring (Gul)."
      },
      {
        id: "preset-musk",
        name: "Elon Musk",
        scores: {
          beige: 5,
          purple: 0,
          red: 10,
          blue: 5,
          orange: 35,
          green: 5,
          yellow: 30,
          turquoise: 10,
          coral: 0,
          ultraviolet: 0
        },
        dominant: "orange",
        secondary: "yellow",
        note: "Exemplifierar prestationsorienterat tänkande kombinerat med systemförståelse, med fokus på teknologiska lösningar för planetära utmaningar."
      },
      {
        id: "preset-aoc",
        name: "Alexandria Ocasio-Cortez",
        scores: {
          beige: 5,
          purple: 5,
          red: 10,
          blue: 10,
          orange: 15,
          green: 35,
          yellow: 15,
          turquoise: 5,
          coral: 0,
          ultraviolet: 0
        },
        dominant: "green",
        secondary: "orange",
        note: "Starkt gemenskapsfokuserad med betoning på social rättvisa och jämlikhet, samtidigt som strategiskt tänkande används för att uppnå progressiva mål."
      },
      {
        id: "preset-jpii",
        name: "Påve Johannes Paulus II",
        scores: {
          beige: 5,
          purple: 15,
          red: 0,
          blue: 30,
          orange: 10,
          green: 15,
          yellow: 15,
          turquoise: 10,
          coral: 0,
          ultraviolet: 0
        },
        dominant: "blue",
        secondary: "green",
        note: "Centrerad i traditionell moralisk struktur samtidigt som öppenhet för inkluderande dialog och moderna anpassningar inom ett konsekvent etiskt ramverk uttrycks."
      },
      {
            id: "preset-cleopatra",
            name: "Kleopatra",
            scores: {
              beige: 10,
              purple: 20,
              red: 25,
              blue: 15,
              orange: 15,
              green: 5,
              yellow: 5,
              turquoise: 0,
              coral: 0,
              ultraviolet: 0
            },
            dominant: "red",
            secondary: "purple",
            note: "En dynamisk härskare som utövade makt (Röd) med stil och utnyttjade stamlojalitet och mystik (Lila) för att behålla sin tron, samtidigt som hon visade strategisk skicklighet (Orange) i allianser med Rom."
          },
          {
            id: "preset-mother-teresa",
            name: "Moder Teresa",
            scores: {
              beige: 10,
              purple: 15,
              red: 5,
              blue: 30,
              orange: 5,
              green: 20,
              yellow: 10,
              turquoise: 5,
              coral: 0,
              ultraviolet: 0
            },
            dominant: "blue",
            secondary: "green",
            note: "Förankrad i orubblig religiös hängivenhet (Blå) med ett hjärtligt uppdrag att tjäna de förtryckta (Grön), driven av en enkel, pliktbunden inställning till att lindra lidande."
          },
          {
            id: "preset-genghis-khan",
            name: "Djengis Khan",
            scores: {
              beige: 15,
              purple: 20,
              red: 35,
              blue: 10,
              orange: 15,
              green: 5,
              yellow: 5,
              turquoise: 0,
              coral: 0,
              ultraviolet: 0
            },
            dominant: "red",
            secondary: "purple",
            note: "En hänsynslös erövrare (Röd) som enade stammar under en gemensam identitet (Lila) och använde skoningslös strategi (Orange) för att bygga ett av historiens största imperier."
          }
    ]
  };

  // Find dominant and secondary stages based on scores
  function findDominantStages(scores: Record<SpiralStage, number>): { dominant: SpiralStage, secondary: SpiralStage } {
    const sortedStages = Object.entries(scores)
      .sort(([,a], [,b]) => b - a) as [SpiralStage, number][];
    
    return {
      dominant: sortedStages[0][0],
      secondary: sortedStages[1][0]
    };
  }

  let displayedProfileId = "quiz"; // Default to showing quiz results
  let displayedProfile = null;

  // Update the function to initialize a special "quiz" profile
  onMount(() => {
    // Load saved profiles from localStorage
    try {
      const savedProfilesJson = localStorage.getItem('spiralProfiles');
      if (savedProfilesJson) {
        savedProfiles = JSON.parse(savedProfilesJson);
      }
    } catch (error) {
      console.error('Error loading saved profiles:', error);
    }

    // Initialize displayed profile based on quiz results if available
    if (stageScores) {
      // Create a special "quiz" profile for the results
      displayedProfile = {
        id: "quiz",
        name: currentLanguage === 'en' ? "Quiz Results" : "Quizresultat",
        scores: { ...stageScores },
        dominant: dominantStage,
        secondary: secondaryStage,
        note: "",
        timestamp: Date.now(),
        isQuizResult: true
      };
      customScores = { ...stageScores };
    } else {
      // Default equal distribution if no quiz results
      stageKeys.forEach(stage => {
        customScores[stage] = 10;
      });
      
      // Set displayed profile to first saved profile or null
      if (savedProfiles.length > 0) {
        displayedProfile = savedProfiles[0];
        displayedProfileId = savedProfiles[0].id || "0";
        customScores = { ...displayedProfile.scores };
      }
    }
  });

  function saveProfile() {
    if (!profileName.trim()) {
      alert(translations[currentLanguage].profileNameRequired);
      return;
    }

    const { dominant, secondary } = findDominantStages(customScores);
    
    const newProfile = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: profileName,
      scores: { ...customScores },
      dominant,
      secondary,
      note: noteText,
      timestamp: Date.now()
    };

    // Check if profile with same name exists and replace it
    const existingIndex = savedProfiles.findIndex(p => p.name === profileName);
    if (existingIndex >= 0) {
      // Preserve the original ID if updating an existing profile
      newProfile.id = savedProfiles[existingIndex].id || newProfile.id;
      savedProfiles[existingIndex] = newProfile;
    } else {
      savedProfiles = [...savedProfiles, newProfile];
    }

    // Save to localStorage
    localStorage.setItem('spiralProfiles', JSON.stringify(savedProfiles));
    
    // Update displayed profile
    displayedProfile = newProfile;
    displayedProfileId = newProfile.id;
    
    // Reset customizing state
    isCustomizing = false;
  }

  // Function to select a profile for display
  function selectProfile(profile) {
    displayedProfile = profile;
    displayedProfileId = profile.id;
    customScores = { ...profile.scores };
    profileName = profile.name;
    noteText = profile.note || "";
    isCustomizing = false;
  }

  // Function to load a profile for editing
  function editProfile(profile) {
    profileName = profile.name;
    customScores = { ...profile.scores };
    noteText = profile.note || "";
    isCustomizing = true;
  }

  function loadProfile(profile) {
    profileName = profile.name;
    customScores = { ...profile.scores };
    noteText = profile.note;
    isCustomizing = true;
  }

  function deleteProfile(index) {
    if (confirm(translations[currentLanguage].confirmDelete)) {
      savedProfiles = savedProfiles.filter((_, i) => i !== index);
      localStorage.setItem('spiralProfiles', JSON.stringify(savedProfiles));
    }
  }

  function resetToQuizResults() {
    if (stageScores) {
      customScores = { ...stageScores };
      isCustomizing = true;
    }
  }

  async function downloadSpiralImage() {
    if (spiralCanvas && !isDownloading) {
      isDownloading = true;
      try {
        // Apply optimized capture class
        spiralCanvas.classList.add('capture-mode');
        
        // Force style recalculation
        await tick();
        
        const canvas = await html2canvas(spiralCanvas, {
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false,
          ignoreElements: (el) => el.classList.contains('ignore-in-capture'),
          onclone: (clonedDoc) => {
            // Find all stage badges in the cloned document
            const badges = clonedDoc.querySelectorAll('.stage-badge');
            
            // Directly modify each badge for the capture
            badges.forEach(badge => {
              // Get the text content
              const text = badge.textContent.trim();
              const bgColor = badge.style.backgroundColor;
              
              // Replace the badge's innerHTML with a more controlled structure
              badge.innerHTML = '';
              badge.style.position = 'relative';
              badge.style.display = 'inline-block';
              badge.style.padding = '0 0.75rem';
              badge.style.height = '28px';
              badge.style.lineHeight = '28px'; // Match height for vertical centering
              badge.style.textAlign = 'center';
              badge.style.verticalAlign = 'middle';
              
              // Create a text span with explicit vertical alignment
              const textSpan = clonedDoc.createElement('span');
              textSpan.textContent = text;
              textSpan.style.display = 'inline-block';
              textSpan.style.verticalAlign = 'middle';
              textSpan.style.lineHeight = '1';
              textSpan.style.position = 'relative';
              textSpan.style.top = '0px'; // Adjust this value as needed, try -1px to -4px
              
              badge.appendChild(textSpan);
            });
            
            // Add global styles that might help
            const style = clonedDoc.createElement('style');
            style.textContent = `
              .stage-badge {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 0 0.75rem !important;
                height: 28px !important;
                font-size: 0.875rem !important;
                font-weight: 500 !important;
                color: white !important;
                border-radius: 9999px !important;
                box-sizing: border-box !important;
                transform: none !important;
                line-height: 28px !important;
                vertical-align: middle !important;
              }
              
              .stage-badge > span {
                display: inline-block !important;
                vertical-align: middle !important;
                line-height: 1 !important;
                position: relative !important;
                top: -2px !important; /* This negative value helps move text up */
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        });
        
        const blob = await new Promise<Blob>(resolve => {
          canvas.toBlob(blob => resolve(blob), 'image/png', 1.0);
        });
        
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `spiral-profile-${profileName || 'custom'}-${new Date().toISOString().split('T')[0]}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error('Error generating image:', error);
      } finally {
        spiralCanvas.classList.remove('capture-mode');
        isDownloading = false;
      }
    }
  }

  // Computed values
  $: calculatedDominantStage = isCustomizing 
    ? findDominantStages(customScores).dominant 
    : dominantStage;
    
  $: calculatedSecondaryStage = isCustomizing 
    ? findDominantStages(customScores).secondary 
    : secondaryStage;

  $: t = translations[currentLanguage];

  function getStageColor(stage: string): string {
    return stages[stage]?.color || "#808080";
  }

  function handleSliderChange(stage: SpiralStage, value: number) {
    // Ensure value is non-negative
    value = Math.max(0, value);
    
    const previousValue = customScores[stage];
    const delta = value - previousValue;
    
    // If increasing and would go over 100%, adjust other values proportionally
    if (delta > 0) {
      const total = Object.values(customScores).reduce((sum, val) => sum + val, 0);
      if (total >= 100) {
        // No free percentage left, need to decrease others
        const otherStages = stageKeys.filter(s => s !== stage);
        const otherStagesWithValues = otherStages.filter(s => customScores[s] > 0);
        const otherTotal = otherStagesWithValues.reduce((sum, s) => sum + customScores[s], 0);
        
        if (otherTotal <= 0) return; // Can't decrease others anymore
        
        // Decrease other sliders proportionally
        otherStagesWithValues.forEach(s => {
          const proportion = customScores[s] / otherTotal;
          customScores[s] = Math.max(0, customScores[s] - (delta * proportion));
        });
      }
    }
    
    // Set the new value
    customScores[stage] = value;
    
    // Ensure total doesn't exceed 100%
    let total = Object.values(customScores).reduce((sum, val) => sum + val, 0);
    if (total > 100) {
      customScores[stage] = Math.max(0, value - (total - 100));
    }
    
    // Force reactivity
    customScores = { ...customScores };
  }

  $: totalPercentage = Object.values(customScores).reduce((sum, val) => sum + val, 0);
  $: remainingPercentage = 100 - totalPercentage;

  // Normalize to whole percentages summing to exactly 100%
  function normalizeToWholePercentages() {
    // Calculate the total
    const total = Object.values(customScores).reduce((sum, val) => sum + val, 0);
    if (total === 0) return; // Avoid division by zero
    
    // First pass: convert to whole numbers, but might not sum to 100 due to rounding
    const tempScores = {};
    let roundedTotal = 0;
    
    Object.keys(customScores).forEach(stage => {
      // Ensure we're working with non-negative values
      const stageValue = Math.max(0, customScores[stage]);
      const normalized = Math.round((stageValue / total) * 100);
      tempScores[stage] = normalized;
      roundedTotal += normalized;
    });
    
    // Second pass: adjust for rounding errors to ensure sum is exactly 100
    const diff = 100 - roundedTotal;
    
    if (diff !== 0) {
      // Find stages to adjust based on which would have the least proportional impact
      // Only consider stages with positive values for potential decrease
      const stagesWithPositiveValues = Object.keys(tempScores)
        .filter(stage => tempScores[stage] > 0)
        .map(stage => {
          const exactValue = (customScores[stage] / total) * 100;
          const roundedValue = tempScores[stage];
          const fractionalPart = Math.abs(exactValue - roundedValue);
          return { stage, fractionalPart, value: roundedValue };
        });
      
      // Sort by fractional part to find which stages to adjust
      stagesWithPositiveValues.sort((a, b) => 
        diff > 0 
          ? a.fractionalPart - b.fractionalPart // For adding, start with those having larger fractional parts
          : b.fractionalPart - a.fractionalPart // For subtracting, start with those having smaller fractional parts
      );
      
      // Distribute the difference
      let remaining = Math.abs(diff);
      const adjustmentDirection = diff > 0 ? 1 : -1;
      
      for (let i = 0; i < stagesWithPositiveValues.length && remaining > 0; i++) {
        const { stage } = stagesWithPositiveValues[i];
        
        // Critical check: never allow a value to go below 0
        if (adjustmentDirection === -1 && tempScores[stage] <= 1) continue;
        
        tempScores[stage] += adjustmentDirection;
        remaining--;
      }
      
      // If we couldn't distribute all negative difference, find values to increase instead
      if (remaining > 0 && adjustmentDirection === -1) {
        // Sort stages by current value to distribute remaining positive adjustments
        const stagesForPositiveAdjustment = Object.keys(tempScores)
          .map(stage => ({ stage, value: tempScores[stage] }))
          .sort((a, b) => a.value - b.value); // Start with lowest values
        
        for (let i = 0; i < stagesForPositiveAdjustment.length && remaining > 0; i++) {
          const { stage } = stagesForPositiveAdjustment[i];
          tempScores[stage] += 1; // Add the remaining difference to various stages
          remaining--;
        }
      }
    }
    
    // Final check: ensure no values are negative
    Object.keys(tempScores).forEach(stage => {
      tempScores[stage] = Math.max(0, tempScores[stage]);
    });
    
    // Update the actual scores
    customScores = { ...tempScores };
  }
</script>

<div class="personal-spiral-builder bg-white rounded-xl shadow-sm p-6">
  <h2 class="text-2xl font-semibold mb-4">{t.title}</h2>
  <p class="text-gray-600 mb-6">{t.description}</p>

  <div class="mb-8 bg-purple-50 rounded-lg p-4">
    <div class="flex justify-between items-center cursor-pointer" on:click={() => showTips = !showTips}>
      <h3 class="font-medium text-purple-900">{t.usageTips.title}</h3>
      <svg 
        class="w-5 h-5 text-purple-500 transform transition-transform duration-200"
        class:rotate-180={showTips}
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </div>
    
    {#if showTips}
      <div class="mt-3 text-sm text-purple-800" transition:slide={{ duration: 300 }}>
        <p class="mb-3">{t.usageTips.description}</p>
        
        <div class="grid gap-3 md:grid-cols-2">
          {#each t.usageTips.tips as tip}
            <div class="bg-white p-3 rounded-md shadow-sm">
              <h4 class="font-medium text-purple-900 mb-1">{tip.title}</h4>
              <p class="text-gray-600">{tip.description}</p>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <!-- Visualization and Controls -->
  <div class="grid md:grid-cols-2 gap-8">
    <!-- Left side: Spiral Visualization -->
    <div class="bg-white p-4 rounded-lg border border-gray-200">
      {#if displayedProfile}
        <div bind:this={spiralCanvas} class="p-4">
          <h3 class="text-xl font-medium mb-2">{displayedProfile.name}</h3>
          
          <!-- Stage information -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <span class="font-medium">{t.dominantStage}:</span>
                <span class="stage-badge" style="background-color: {getStageColor(displayedProfile.dominant)}">
                  <span>{displayedProfile.dominant.charAt(0).toUpperCase() + displayedProfile.dominant.slice(1)}</span>
                </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">{t.secondaryStage}:</span>
                <span class="stage-badge" style="background-color: {getStageColor(displayedProfile.secondary)}">
                  <span>{displayedProfile.secondary.charAt(0).toUpperCase() + displayedProfile.secondary.slice(1)}</span>
                </span>
            </div>
          </div>

          <!-- Stage Distribution Visualization -->
          <div class="mt-6">
            <h4 class="font-medium mb-3">{t.stageDistribution}</h4>
            {#each stageKeys as stage}
              <div class="mb-3">
                <div class="flex justify-between mb-1">
                  <span class="font-medium capitalize">{stage}</span>
                  <span>{displayedProfile.scores[stage]}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="h-2.5 rounded-full transition-all duration-300"
                    style="width: {displayedProfile.scores[stage]}%; 
                           background-color: {getStageColor(stage)}"
                  ></div>
                </div>
              </div>
            {/each}
          </div>

          <div class="mt-6 pt-4 border-t border-gray-200">
            <button 
              on:click={() => showInsights = !showInsights}
              class="w-full flex justify-between items-center text-left"
            >
              <h4 class="font-medium">
                {currentLanguage === 'en' ? 'Profile Insights' : 'Profilinsikter'}
              </h4>
              <svg 
                class="w-5 h-5 text-gray-500 transform transition-transform duration-200"
                class:rotate-180={showInsights}
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            
            {#if showInsights}
              <div class="mt-3 space-y-4 text-gray-600 text-sm" transition:slide={{ duration: 300 }}>
                <!-- Dominant stage description -->
                {#if dominantStageExplanations[displayedProfile.dominant]}
                  <div>
                    <h5 class="text-sm font-medium mb-1 flex items-center">
                      <span class="w-3 h-3 rounded-full mr-2" style="background-color: {getStageColor(displayedProfile.dominant)}"></span>
                      <span class="capitalize">{displayedProfile.dominant}</span>
                      <span class="ml-1">{currentLanguage === 'en' ? 'Stage' : 'Stadium'}</span>
                    </h5>
                    <p class="text-gray-600 ml-5">
                      {dominantStageExplanations[displayedProfile.dominant]?.dominant[currentLanguage]}
                    </p>
                  </div>
                {/if}
                
                <!-- Secondary stage description -->
                {#if dominantStageExplanations[displayedProfile.secondary]}
                  <div>
                    <h5 class="text-sm font-medium mb-1 flex items-center">
                      <span class="w-3 h-3 rounded-full mr-2" style="background-color: {getStageColor(displayedProfile.secondary)}"></span>
                      <span class="capitalize">{displayedProfile.secondary}</span>
                      <span class="ml-1">{currentLanguage === 'en' ? 'Influence' : 'Inflytande'}</span>
                    </h5>
                    <p class="text-gray-600 ml-5">
                      {dominantStageExplanations[displayedProfile.secondary]?.secondary[currentLanguage]}
                    </p>
                  </div>
                {/if}
                
                <!-- Stage combination description -->
                <div>
                  <h5 class="text-sm font-medium mb-1 flex items-center">
                    <span class="w-3 h-3 rounded-full mr-2 bg-gradient-to-r" 
                          style="background-image: linear-gradient(to right, {getStageColor(displayedProfile.dominant)} 50%, {getStageColor(displayedProfile.secondary)} 50%);"></span>
                    <span>{currentLanguage === 'en' ? 'Combination Dynamic' : 'Kombinationsdynamik'}</span>
                  </h5>
                  <p class="text-gray-600 ml-5">
                    {getCombinationExplanation(displayedProfile.dominant, displayedProfile.secondary, currentLanguage)}
                  </p>
                </div>
              </div>
            {/if}
          </div>

          <!-- Profile notes if available -->
          {#if displayedProfile.note}
            <div class="mt-4 p-3 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-600 italic">{displayedProfile.note}</p>
            </div>
          {/if}
        </div>
      {:else}
        <div class="flex items-center justify-center h-full">
          <p class="text-gray-500">
            {currentLanguage === 'en' ? 'No profile selected.' : 'Ingen profil vald.'}
          </p>
        </div>
      {/if}
      
      <!-- Non-customizing controls -->
      {#if !isCustomizing}
        <div class="flex flex-wrap gap-3 mt-6">
          <button
            on:click={() => {
              profileName = displayedProfile?.name || "";
              noteText = displayedProfile?.note || "";
              isCustomizing = true;
            }}
            class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {t.customize}
          </button>
          
          <button
            on:click={downloadSpiralImage}
            disabled={isDownloading || !displayedProfile}
            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if isDownloading}
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.generating}
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              {t.downloadImage}
            {/if}
          </button>
        </div>
      {/if}
    </div>

    <!-- Right side: Controls -->
    <div>
      {#if isCustomizing}
        <!-- Customization Controls -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-medium mb-4">{t.customize}</h3>
          
          <div class="mb-4">
            <label for="profileName" class="block text-sm font-medium text-gray-700 mb-1">
              {t.profileName}*
            </label>
            <input
              type="text"
              id="profileName"
              bind:value={profileName}
              placeholder={t.enterName}
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div class="mb-6">
            <label for="noteText" class="block text-sm font-medium text-gray-700 mb-1">
              {t.notes}
            </label>
            <textarea
              id="noteText"
              bind:value={noteText}
              placeholder={t.addNotes}
              class="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
            ></textarea>
          </div>
          
          <!-- Sliders for each stage -->
          <div class="space-y-4 mb-6">
            {#each stageKeys as stage}
              <div>
                <div class="flex justify-between mb-1">
                  <label for="slider-{stage}" class="font-medium capitalize">{stage}</label>
                  <span>{customScores[stage]}%</span>
                </div>
                <input
                  id="slider-{stage}"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  bind:value={customScores[stage]}
                  on:input={() => handleSliderChange(stage, customScores[stage])}
                  class="w-full"
                  style="accent-color: {getStageColor(stage)}"
                />
              </div>
            {/each}
          </div>

          <div class="mt-4 mb-6">
            <div class="flex justify-between items-center">
              <span class="font-medium">{currentLanguage === 'en' ? 'Total' : 'Totalt'}: {totalPercentage.toFixed(1)}%</span>
              <span class="{remainingPercentage < 0 ? 'text-red-600' : 'text-green-600'}">
                {remainingPercentage > 0 
                  ? (currentLanguage === 'en' ? 'Remaining: ' : 'Återstående: ') + remainingPercentage.toFixed(1) + '%'
                  : (currentLanguage === 'en' ? 'Over by: ' : 'Över med: ') + Math.abs(remainingPercentage).toFixed(1) + '%'
                }
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                class="h-2.5 rounded-full transition-all duration-300"
                style="width: {Math.min(100, totalPercentage)}%; background-color: {
                  remainingPercentage < 0 ? '#EF4444' : 
                  remainingPercentage > 20 ? '#10B981' :
                  '#FBBF24'
                }"
              ></div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-2 mt-4">
            <button
              on:click={saveProfile}
              class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {t.saveProfile}
            </button>
            
            <button
              on:click={normalizeToWholePercentages}
              class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              {currentLanguage === 'en' ? 'Normalize to 100%' : 'Normalisera till 100%'}
            </button>
            
            <button
              on:click={() => {
                isCustomizing = false;
                if (displayedProfile) {
                  // Reset to the displayed profile's values
                  customScores = { ...displayedProfile.scores };
                  profileName = displayedProfile.name;
                  noteText = displayedProfile.note || "";
                }
              }}
              class="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      {:else}
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <div class="flex justify-between items-center cursor-pointer mb-2" on:click={() => showPresetLibrary = !showPresetLibrary}>
            <h3 class="font-medium">{t.presetLibrary.title}</h3>
            <svg 
              class="w-5 h-5 text-gray-500 transform transition-transform duration-200"
              class:rotate-180={showPresetLibrary}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          
          <p class="text-sm text-gray-600 mb-3">{t.presetLibrary.description}</p>
          
          {#if showPresetLibrary}
            <div transition:slide={{ duration: 300 }} class="grid grid-cols-1 gap-3 mt-4">
              {#each famousProfilePresets[currentLanguage] as preset}
                <div class="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-all relative">
                  <div class="flex flex-col">
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="font-medium text-lg">{preset.name}</h4>
                      <div class="flex gap-2">
                        <!-- Preview button -->
                        <button
                          on:click={() => previewedPreset = preset}
                          class="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 border border-blue-200 rounded hover:bg-blue-50"
                        >
                          {t.presetLibrary.previewPreset}
                        </button>
                        
                        <!-- Load button -->
                        <button
                          on:click={() => {
                            // Load the preset into the customizer
                            customScores = { ...preset.scores };
                            profileName = `${preset.name} (${currentLanguage === 'en' ? 'Custom' : 'Anpassad'})`;
                            noteText = preset.note;
                            isCustomizing = true;
                          }}
                          class="bg-purple-600 text-white text-sm px-3 py-1 rounded hover:bg-purple-700"
                        >
                          {t.presetLibrary.loadPreset}
                        </button>
                      </div>
                    </div>
                    
                    <div class="mb-3">
                      <div class="flex items-center gap-2 mt-1">
                        <span class="bg-gray-100 px-2 py-1 rounded capitalize" style="color: {getStageColor(preset.dominant)}; border: 1px solid {getStageColor(preset.dominant)}">
                          {preset.dominant}
                        </span>
                        <span>+</span>
                        <span class="bg-gray-100 px-2 py-1 rounded capitalize" style="color: {getStageColor(preset.secondary)}; border: 1px solid {getStageColor(preset.secondary)}">
                          {preset.secondary}
                        </span>
                      </div>
                    </div>
                    
                    <p class="text-sm text-gray-600">{preset.note}</p>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>

        {#if previewedPreset}
          <div 
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            on:click|self={() => previewedPreset = null}
            on:keydown={(e) => e.key === 'Escape' && (previewedPreset = null)}
          >
            <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto" transition:fade={{ duration: 200 }}>
              <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-lg font-medium">{previewedPreset.name}</h3>
                <button 
                  on:click={() => previewedPreset = null}
                  class="text-gray-500 hover:text-gray-700"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div class="p-6">
                <!-- Stage information -->
                <div class="mb-4">
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-medium">{t.dominantStage}:</span>
                    <span class="stage-badge" style="background-color: {getStageColor(previewedPreset.dominant)}">
                      {previewedPreset.dominant.charAt(0).toUpperCase() + previewedPreset.dominant.slice(1)}
                    </span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="font-medium">{t.secondaryStage}:</span>
                    <span class="stage-badge" style="background-color: {getStageColor(previewedPreset.secondary)}">
                      {previewedPreset.secondary.charAt(0).toUpperCase() + previewedPreset.secondary.slice(1)}
                    </span>
                  </div>
                </div>

                <!-- Stage Distribution Visualization -->
                <div class="mt-6">
                  <h4 class="font-medium mb-3">{t.stageDistribution}</h4>
                  {#each stageKeys as stage}
                    <div class="mb-3">
                      <div class="flex justify-between mb-1">
                        <span class="font-medium capitalize">{stage}</span>
                        <span>{previewedPreset.scores[stage]}%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          class="h-2.5 rounded-full transition-all duration-300"
                          style="width: {previewedPreset.scores[stage]}%; 
                                 background-color: {getStageColor(stage)}"
                        ></div>
                      </div>
                    </div>
                  {/each}
                </div>

                <!-- Profile description -->
                <div class="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p class="text-gray-600">{previewedPreset.note}</p>
                </div>
                
                <!-- Load and close buttons -->
                <div class="mt-6 flex justify-end gap-3">
                  <button
                    on:click={() => previewedPreset = null}
                    class="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    {currentLanguage === 'en' ? 'Close' : 'Stäng'}
                  </button>
                  
                  <button
                    on:click={() => {
                      // Load the preset into the customizer
                      customScores = { ...previewedPreset.scores };
                      profileName = `${previewedPreset.name} (${currentLanguage === 'en' ? 'Custom' : 'Anpassad'})`;
                      noteText = previewedPreset.note;
                      isCustomizing = true;
                      previewedPreset = null; // Close the modal
                    }}
                    class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >
                    {t.presetLibrary.loadPreset}
                  </button>
                </div>
              </div>
            </div>
          </div>
        {/if}

        <!-- Saved Profiles Section with Selectable Cards -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-medium mb-4">{t.savedProfiles}</h3>
          
          <div class="space-y-3">
            <!-- Quiz Results Profile Card (if available) -->
            {#if stageScores}
              <div 
                class="border border-gray-200 rounded-lg p-3 bg-white cursor-pointer transition-all hover:shadow-md {displayedProfileId === 'quiz' ? 'ring-2 ring-purple-500' : ''}"
                on:click={() => selectProfile({
                  id: "quiz",
                  name: currentLanguage === 'en' ? "Quiz Results" : "Quizresultat",
                  scores: { ...stageScores },
                  dominant: dominantStage,
                  secondary: secondaryStage,
                  note: "",
                  isQuizResult: true
                })}
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-medium">
                      {currentLanguage === 'en' ? "Quiz Results" : "Quizresultat"}
                      {#if displayedProfileId === 'quiz'}
                        <span class="ml-2 text-sm text-purple-600">
                          {currentLanguage === 'en' ? '(Selected)' : '(Vald)'}
                        </span>
                      {/if}
                    </h4>
                    <div class="text-sm text-gray-500 flex gap-2">
                      <span class="capitalize">{dominantStage}</span>
                      <span>+</span>
                      <span class="capitalize">{secondaryStage}</span>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button
                      on:click={(e) => {
                        e.stopPropagation();
                        editProfile({
                          name: currentLanguage === 'en' ? "Custom Profile" : "Anpassad Profil",
                          scores: { ...stageScores },
                          note: ""
                        });
                      }}
                      class="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {t.customize}
                    </button>
                  </div>
                </div>
              </div>
            {/if}
          
            <!-- Saved Profiles -->
            {#if savedProfiles.length === 0}
              <p class="text-gray-500 text-sm">{t.noSavedProfiles}</p>
            {:else}
              {#each savedProfiles as profile, index}
                <div 
                  class="border border-gray-200 rounded-lg p-3 bg-white cursor-pointer transition-all hover:shadow-md {displayedProfileId === profile.id ? 'ring-2 ring-purple-500' : ''}"
                  on:click={() => selectProfile(profile)}
                >
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-medium">
                        {profile.name}
                        {#if displayedProfileId === profile.id}
                          <span class="ml-2 text-sm text-purple-600">
                            {currentLanguage === 'en' ? '(Selected)' : '(Vald)'}
                          </span>
                        {/if}
                      </h4>
                      <div class="text-sm text-gray-500 flex gap-2">
                        <span class="capitalize">{profile.dominant}</span>
                        <span>+</span>
                        <span class="capitalize">{profile.secondary}</span>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <button
                        on:click={(e) => {
                          e.stopPropagation();
                          editProfile(profile);
                        }}
                        class="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        {currentLanguage === 'en' ? 'Edit' : 'Redigera'}
                      </button>
                      <button
                        on:click={(e) => {
                          e.stopPropagation();
                          deleteProfile(index);
                          // If this was the displayed profile, show the quiz results instead
                          if (displayedProfileId === profile.id) {
                            if (stageScores) {
                              selectProfile({
                                id: "quiz",
                                name: currentLanguage === 'en' ? "Quiz Results" : "Quizresultat",
                                scores: { ...stageScores },
                                dominant: dominantStage,
                                secondary: secondaryStage,
                                note: "",
                                isQuizResult: true
                              });
                            } else if (savedProfiles.length > 1) {
                              // Select a different profile
                              const newIndex = index === 0 ? 1 : 0;
                              selectProfile(savedProfiles[newIndex]);
                            } else {
                              displayedProfile = null;
                              displayedProfileId = null;
                            }
                          }
                        }}
                        class="text-red-600 hover:text-red-800 text-sm"
                      >
                        {t.delete}
                      </button>
                    </div>
                  </div>
                  {#if profile.note}
                    <p class="text-sm text-gray-600 mt-2 italic">{profile.note}</p>
                  {/if}
                </div>
              {/each}
            {/if}
            
            <!-- Create new profile button -->
            <button
              on:click={() => {
                profileName = "";
                noteText = "";
                // Initialize with equal distribution
                stageKeys.forEach(stage => {
                  customScores[stage] = 10;
                });
                customScores = { ...customScores };
                isCustomizing = true;
              }}
              class="mt-3 w-full py-2 px-3 border border-dashed border-gray-300 rounded-lg text-center text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {currentLanguage === 'en' ? '+ Create New Profile' : '+ Skapa Ny Profil'}
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Custom styling for range inputs */
  input[type=range] {
    height: 25px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
  }
  
  input[type=range]:focus {
    outline: none;
  }
  
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #E5E7EB;
    border-radius: 4px;
  }
  
  input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 1px #000000;
    border: 0px solid #000000;
    height: 18px;
    width: 18px;
    border-radius: 9px;
    background: currentColor;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px;
  }

  /* Perfectly centered badges for both UI and downloads */
  .stage-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.75rem;
    border-radius: 9999px;
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    height: 28px;
    line-height: 1;
    position: relative;
    box-sizing: border-box;
    vertical-align: middle;
  }

  /* Specific styles for capture mode */
  .capture-mode .stage-badge {
    transform: none;
  }

</style>
