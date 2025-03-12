<!-- IssueExplorer.svelte -->
<script lang="ts">
  import languageStore from '$lib/stores/languageStore';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // State for the selected issue
  let selectedIssue = 'climate';

  // Color mapping for each perspective/stage
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

  // Translations for UI elements
  const translations = {
    en: {
      title: "Explore Different Perspectives on Key Issues",
      viewsAs: "Views as:",
      approach: "Approach:",
      challenges: "Challenges:"
    },
    sv: {
      title: "Utforska olika perspektiv på viktiga frågor",
      viewsAs: "Ser som:",
      approach: "Tillvägagångssätt:",
      challenges: "Utmaningar:"
    }
  };

  // Issue data with translations
  const issues = {
    climate: {
      name: {
        en: 'Climate Change',
        sv: 'Klimatförändring'
      },
      perspectives: {
        blue: {
          title: {
            en: 'Traditional View',
            sv: 'Traditionell syn'
          },
          view: {
            en: 'Stewardship of creation',
            sv: 'Förvaltarskap av skapelsen'
          },
          approach: {
            en: 'Individual responsibility and conservation',
            sv: 'Individuellt ansvar och bevarande'
          },
          challenges: {
            en: 'Skepticism of global governance',
            sv: 'Skepsis mot global styrning'
          }
        },
        orange: {
          title: {
            en: 'Modern View',
            sv: 'Modern syn'
          },
          view: {
            en: 'Technical challenge',
            sv: 'Teknisk utmaning'
          },
          approach: {
            en: 'Market solutions and innovation',
            sv: 'Marknadslösningar och innovation'
          },
          challenges: {
            en: 'Resistance to regulation',
            sv: 'Motstånd mot reglering'
          }
        },
        green: {
          title: {
            en: 'Postmodern View',
            sv: 'Postmodern syn'
          },
          view: {
            en: 'Social justice issue',
            sv: 'Social rättvisefråga'
          },
          approach: {
            en: 'Systemic change and collective action',
            sv: 'Systemisk förändring och kollektiv handling'
          },
          challenges: {
            en: 'Implementation complexity',
            sv: 'Implementeringskomplexitet'
          }
        },
        yellow: {
          title: {
            en: 'Systemic View',
            sv: 'Systemisk syn'
          },
          view: {
            en: 'Complex adaptive challenge',
            sv: 'Komplex adaptiv utmaning'
          },
          approach: {
            en: 'Integrated solutions at multiple levels',
            sv: 'Integrerade lösningar på flera nivåer'
          },
          challenges: {
            en: 'Coordination across perspectives',
            sv: 'Samordning över olika perspektiv'
          }
        }
      }
    },
    economy: {
      name: {
        en: 'Economic Inequality',
        sv: 'Ekonomisk ojämlikhet'
      },
      perspectives: {
        blue: {
          title: {
            en: 'Traditional View',
            sv: 'Traditionell syn'
          },
          view: {
            en: 'Moral responsibility',
            sv: 'Moraliskt ansvar'
          },
          approach: {
            en: 'Charity and personal virtue',
            sv: 'Välgörenhet och personlig dygd'
          },
          challenges: {
            en: 'Limited systemic impact',
            sv: 'Begränsad systemisk påverkan'
          }
        },
        orange: {
          title: {
            en: 'Modern View',
            sv: 'Modern syn'
          },
          view: {
            en: 'Market inefficiency',
            sv: 'Marknadsineffektivitet'
          },
          approach: {
            en: 'Growth and opportunity creation',
            sv: 'Tillväxt och skapande av möjligheter'
          },
          challenges: {
            en: 'May increase inequality',
            sv: 'Kan öka ojämlikhet'
          }
        },
        green: {
          title: {
            en: 'Postmodern View',
            sv: 'Postmodern syn'
          },
          view: {
            en: 'Structural injustice',
            sv: 'Strukturell orättvisa'
          },
          approach: {
            en: 'Redistribution and reform',
            sv: 'Omfördelning och reform'
          },
          challenges: {
            en: 'Economic impacts',
            sv: 'Ekonomiska konsekvenser'
          }
        },
        yellow: {
          title: {
            en: 'Systemic View',
            sv: 'Systemisk syn'
          },
          view: {
            en: 'Complex system dynamic',
            sv: 'Komplex systemdynamik'
          },
          approach: {
            en: 'Multi-level interventions',
            sv: 'Flernivåinterventioner'
          },
          challenges: {
            en: 'Implementation complexity',
            sv: 'Implementeringskomplexitet'
          }
        }
      }
    },
    tech: {
      name: {
        en: 'AI & Technology',
        sv: 'AI & Teknologi'
      },
      perspectives: {
        blue: {
          title: {
            en: 'Traditional View',
            sv: 'Traditionell syn'
          },
          view: {
            en: 'Moral hazard',
            sv: 'Moralisk risk'
          },
          approach: {
            en: 'Strict regulation',
            sv: 'Strikt reglering'
          },
          challenges: {
            en: 'May limit innovation',
            sv: 'Kan begränsa innovation'
          }
        },
        orange: {
          title: {
            en: 'Modern View',
            sv: 'Modern syn'
          },
          view: {
            en: 'Progress driver',
            sv: 'Framstegsdrivare'
          },
          approach: {
            en: 'Rapid development',
            sv: 'Snabb utveckling'
          },
          challenges: {
            en: 'Unintended consequences',
            sv: 'Oavsiktliga konsekvenser'
          }
        },
        green: {
          title: {
            en: 'Postmodern View',
            sv: 'Postmodern syn'
          },
          view: {
            en: 'Social impact concern',
            sv: 'Oro för social påverkan'
          },
          approach: {
            en: 'Inclusive development',
            sv: 'Inkluderande utveckling'
          },
          challenges: {
            en: 'Development speed',
            sv: 'Utvecklingshastighet'
          }
        },
        yellow: {
          title: {
            en: 'Systemic View',
            sv: 'Systemisk syn'
          },
          view: {
            en: 'Transformative force',
            sv: 'Transformativ kraft'
          },
          approach: {
            en: 'Adaptive governance',
            sv: 'Adaptiv styrning'
          },
          challenges: {
            en: 'Coordination complexity',
            sv: 'Samordningskomplexitet'
          }
        }
      }
    }
  };

  $: t = translations[currentLanguage];
  $: issueKeys = Object.keys(issues);
</script>

<div class="p-6 bg-white rounded-lg shadow-lg">
  <h3 class="text-xl font-bold mb-4">{t.title}</h3>
  
  <div class="flex flex-wrap gap-2 mb-6">
    {#each issueKeys as issueKey}
      <button
        on:click={() => selectedIssue = issueKey}
        class="px-4 py-2 rounded-lg transition-colors {
          selectedIssue === issueKey
            ? 'bg-purple-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }"
      >
        {issues[issueKey].name[currentLanguage]}
      </button>
    {/each}
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each Object.entries(issues[selectedIssue].perspectives) as [viewKey, perspective]}
      {@const bgColor = viewKey in stageColors ? stageColors[viewKey] : '#F3F4F6'}
      <div
        class="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
        style="background-color: {bgColor}20; border-left: 4px solid {bgColor}"
      >
        <h4 class="font-medium mb-2">{perspective.title[currentLanguage]}</h4>
        
        <div class="space-y-3">
          <div>
            <div class="text-sm font-medium text-gray-700">{t.viewsAs}</div>
            <div class="text-sm">{perspective.view[currentLanguage]}</div>
          </div>
          
          <div>
            <div class="text-sm font-medium text-gray-700">{t.approach}</div>
            <div class="text-sm">{perspective.approach[currentLanguage]}</div>
          </div>
          
          <div>
            <div class="text-sm font-medium text-gray-700">{t.challenges}</div>
            <div class="text-sm">{perspective.challenges[currentLanguage]}</div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  /* Add any additional styles here if needed */
  button:focus {
    outline: 2px solid #6366F1;
    outline-offset: 2px;
  }
</style>
