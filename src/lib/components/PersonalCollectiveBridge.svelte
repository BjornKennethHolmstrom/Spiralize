<script lang="ts">
  import { stages } from '$lib/data/stages';
  import languageStore from '$lib/stores/languageStore';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // State variables
  let selectedStage: string = '';
  let selectedGovernance: string = '';

  // Helper function to get stage color
  function getStageColor(stage: string): string {
    return stages[stage]?.color || "#808080";
  }

  // Define the personal-to-collective bridge data
  const bridgeData = {
    // Map of personal stage to governance engagement approaches
    stageApproaches: {
      // For each personal stage, how to engage with different governance systems
      beige: {
        en: {
          title: "Survival-Centered Engagement",
          description: "When centered at Beige, governance engagement focuses on meeting immediate survival needs and seeking security.",
          approaches: {
            beige: {
              title: "In Survival Bands",
              content: "Direct participation based on survival utility. Focus on immediate resource distribution and protection."
            },
            purple: {
              title: "In Tribal Systems",
              content: "Seek protection and inclusion in the group. Participate in rituals and follow traditions that provide security."
            },
            red: {
              title: "In Authoritarian Systems",
              content: "Submit to authority for protection. Develop survival alliances with those in power when possible."
            },
            blue: {
              title: "In Rule-Based Systems",
              content: "Follow rules to ensure basic security. Use formal systems for protection and resource access."
            },
            orange: {
              title: "In Achievement Systems",
              content: "Seek basic employment and resources. Focus on immediate economic survival within competitive environments."
            },
            green: {
              title: "In Participatory Systems",
              content: "Accept community support. May struggle with participatory processes unless focused on immediate needs."
            },
            yellow: {
              title: "In Adaptive Systems",
              content: "Navigate complexity for immediate benefits. May find flexible systems confusing without clear survival value."
            },
            turquoise: {
              title: "In Holistic Systems",
              content: "Receive support through holistic safety nets. May find abstract planetary concerns disconnected from immediate reality."
            }
          },
          strengths: [
            "Focus on practical impacts of governance decisions",
            "Clarity about basic human needs",
            "Resilience in crisis situations"
          ],
          contributions: [
            "Ground governance in basic human necessities",
            "Ensure systems address fundamental safety and security",
            "Test whether governance actually delivers essential resources"
          ]
        },
        sv: {
          title: "Överlevnadscentrerat engagemang",
          description: "När centrerad i Beige fokuserar styrningsengagemang på att möta omedelbara överlevnadsbehov och söka säkerhet.",
          approaches: {
            beige: {
              title: "I Överlevnadsgrupper",
              content: "Direkt deltagande baserat på överlevnadsnytta. Fokus på omedelbar resursfördelning och skydd."
            },
            purple: {
              title: "I Stamssystem",
              content: "Sök skydd och inkludering i gruppen. Delta i ritualer och följ traditioner som ger säkerhet."
            },
            red: {
              title: "I Auktoritära System",
              content: "Underkastar sig auktoritet för skydd. Utvecklar överlevnadsallianser med de maktiga när möjligt."
            },
            blue: {
              title: "I Regelbaserade System",
              content: "Följ regler för att säkerställa grundläggande säkerhet. Använd formella system för skydd och resurstillgång."
            },
            orange: {
              title: "I Prestationssystem",
              content: "Sök grundläggande anställning och resurser. Fokusera på omedelbar ekonomisk överlevnad inom konkurrenskraftiga miljöer."
            },
            green: {
              title: "I Deltagande System",
              content: "Acceptera gemenskapsstöd. Kan kämpa med deltagande processer om de inte är fokuserade på omedelbara behov."
            },
            yellow: {
              title: "I Adaptiva System",
              content: "Navigera i komplexitet för omedelbara fördelar. Kan finna flexibla system förvirrande utan tydligt överlevnadsvärde."
            },
            turquoise: {
              title: "I Holistiska System",
              content: "Ta emot stöd genom holistiska skyddsnät. Kan finna abstrakta planetära angelägenheter frånkopplade från omedelbar verklighet."
            }
          },
          strengths: [
            "Fokus på praktiska konsekvenser av styrningsbeslut",
            "Tydlighet om grundläggande mänskliga behov",
            "Motståndskraft i krissituationer"
          ],
          contributions: [
            "Grunda styrning i grundläggande mänskliga nödvändigheter",
            "Säkerställ att system adresserar grundläggande trygghet och säkerhet",
            "Testa om styrning faktiskt levererar nödvändiga resurser"
          ]
        }
      },
      purple: {
        en: {
          title: "Tradition-Centered Engagement",
          description: "When centered at Purple, governance engagement emphasizes community belonging, tradition, and group identity.",
          approaches: {
            beige: {
              title: "In Survival Bands",
              content: "Work to strengthen group bonds even in survival situations. Bring ritual and meaning to difficult circumstances."
            },
            purple: {
              title: "In Tribal Systems",
              content: "Full participation in traditional roles and community rituals. Honor ancestors and maintain cultural continuity."
            },
            red: {
              title: "In Authoritarian Systems",
              content: "Seek to influence leadership through traditional legitimacy. Use cultural practices to maintain group identity."
            },
            blue: {
              title: "In Rule-Based Systems",
              content: "Work within established rules while preserving cultural traditions. Values systems that respect cultural heritage."
            },
            orange: {
              title: "In Achievement Systems",
              content: "Navigate competitive environments as a group. May struggle with individualistic aspects of meritocracy."
            },
            green: {
              title: "In Participatory Systems",
              content: "Appreciate inclusive approaches that honor different traditions. Bring cultural wisdom to community dialogues."
            },
            yellow: {
              title: "In Adaptive Systems",
              content: "Contribute traditional knowledge while adapting to new approaches. Bridge between ancient wisdom and modern methods."
            },
            turquoise: {
              title: "In Holistic Systems",
              content: "Bring ancestral wisdom into planetary consciousness. Help ground global systems in human cultural heritage."
            }
          },
          strengths: [
            "Deep understanding of cultural cohesion and belonging",
            "Ability to maintain continuity through change",
            "Knowledge of time-tested practices and rituals"
          ],
          contributions: [
            "Ensuring governance honors cultural heritage",
            "Building strong community bonds within systems",
            "Keeping wisdom traditions alive in modern governance"
          ]
        },
        sv: {
          title: "Traditionscentrerat engagemang",
          description: "När centrerad i Purple betonar styrningsengagemang gemenskap, tradition och gruppidentitet.",
          approaches: {
            beige: {
              title: "I Överlevnadsgrupper",
              content: "Arbeta för att stärka gruppband även i överlevnadssituationer. För in ritual och mening i svåra omständigheter."
            },
            purple: {
              title: "I Stamssystem",
              content: "Fullt deltagande i traditionella roller och gemenskapsritualer. Hedra förfäder och upprätthåll kulturell kontinuitet."
            },
            red: {
              title: "I Auktoritära System",
              content: "Sök att påverka ledarskap genom traditionell legitimitet. Använd kulturella praktiker för att upprätthålla gruppidentitet."
            },
            blue: {
              title: "I Regelbaserade System",
              content: "Arbeta inom etablerade regler medan kulturella traditioner bevaras. Värdesätter system som respekterar kulturarv."
            },
            orange: {
              title: "I Prestationssystem",
              content: "Navigera i konkurrenskraftiga miljöer som en grupp. Kan kämpa med individualistiska aspekter av meritokrati."
            },
            green: {
              title: "I Deltagande System",
              content: "Uppskatta inkluderande tillvägagångssätt som hedrar olika traditioner. För kulturell visdom till gemenskapsdialoger."
            },
            yellow: {
              title: "I Adaptiva System",
              content: "Bidra med traditionell kunskap samtidigt som nya tillvägagångssätt anpassas. Bygg broar mellan uråldrig visdom och moderna metoder."
            },
            turquoise: {
              title: "I Holistiska System",
              content: "För in förfäders visdom i planetärt medvetande. Hjälp att grunda globala system i mänskligt kulturarv."
            }
          },
          strengths: [
            "Djup förståelse för kulturell sammanhållning och tillhörighet",
            "Förmåga att upprätthålla kontinuitet genom förändring",
            "Kunskap om beprövade praktiker och ritualer"
          ],
          contributions: [
            "Säkerställa att styrning hedrar kulturarv",
            "Bygga starka gemenskapsband inom system",
            "Hålla visdomstraditioner levande i modern styrning"
          ]
        }
      },
      red: {
        en: {
          title: "Power-Centered Engagement",
          description: "When centered at Red, governance engagement focuses on asserting influence, protecting interests, and gaining advantages.",
          approaches: {
            beige: {
              title: "In Survival Bands",
              content: "Seek leadership role through strength demonstration. Take charge in crisis situations when others hesitate."
            },
            purple: {
              title: "In Tribal Systems",
              content: "Challenge or adapt traditions to gain influence. May become a warrior leader or shamanic figure."
            },
            red: {
              title: "In Authoritarian Systems",
              content: "Either challenge authority or align with power. Navigate power hierarchies strategically for personal advantage."
            },
            blue: {
              title: "In Rule-Based Systems",
              content: "Use rules strategically while looking for exceptions. Test boundaries and exploit loopholes when advantageous."
            },
            orange: {
              title: "In Achievement Systems",
              content: "Compete aggressively for recognition and rewards. Use boldness and risk-taking as competitive advantages."
            },
            green: {
              title: "In Participatory Systems",
              content: "May struggle with consensus processes but can provide decisive energy. Can be a powerful advocate for causes."
            },
            yellow: {
              title: "In Adaptive Systems",
              content: "Contribute decisive action within flexible frameworks. May help adaptive systems move from planning to action."
            },
            turquoise: {
              title: "In Holistic Systems",
              content: "Channel power impulses toward evolutionary purposes. Bring vital energy to holistic initiatives that need activation."
            }
          },
          strengths: [
            "Decisive action when others hesitate",
            "Willingness to challenge ineffective systems",
            "Ability to protect interests against opposition"
          ],
          contributions: [
            "Bringing necessary disruptive energy to stagnant systems",
            "Testing whether governance has real-world effectiveness",
            "Providing courage and initiative during transitions"
          ]
        },
        sv: {
          title: "Maktcentrerat engagemang",
          description: "När centrerad i Red fokuserar styrningsengagemang på att hävda inflytande, skydda intressen och få fördelar.",
          approaches: {
            beige: {
              title: "I Överlevnadsgrupper",
              content: "Sök ledarskapsroll genom styrkademonstration. Ta kommandot i krissituationer när andra tvekar."
            },
            purple: {
              title: "I Stamssystem",
              content: "Utmana eller anpassa traditioner för att få inflytande. Kan bli en krigsledare eller shamanisk figur."
            },
            red: {
              title: "I Auktoritära System",
              content: "Antingen utmana auktoritet eller anpassa sig till makten. Navigera i makthierarkier strategiskt för personlig fördel."
            },
            blue: {
              title: "I Regelbaserade System",
              content: "Använd regler strategiskt medan du letar efter undantag. Testa gränser och utnyttja kryphål när det är fördelaktigt."
            },
            orange: {
              title: "I Prestationssystem",
              content: "Konkurrera aggressivt för erkännande och belöningar. Använd djärvhet och risktagande som konkurrensfördelar."
            },
            green: {
              title: "I Deltagande System",
              content: "Kan kämpa med konsensusprocesser men kan tillhandahålla beslutsam energi. Kan vara en kraftfull förespråkare för orsaker."
            },
            yellow: {
              title: "I Adaptiva System",
              content: "Bidra med beslutsamma åtgärder inom flexibla ramverk. Kan hjälpa adaptiva system att gå från planering till handling."
            },
            turquoise: {
              title: "I Holistiska System",
              content: "Kanalisera kraftimpulser mot evolutionära syften. För vital energi till holistiska initiativ som behöver aktivering."
            }
          },
          strengths: [
            "Beslutsam handling när andra tvekar",
            "Villighet att utmana ineffektiva system",
            "Förmåga att skydda intressen mot opposition"
          ],
          contributions: [
            "Föra nödvändig disruptiv energi till stagnerande system",
            "Testa om styrning har verklig effektivitet",
            "Tillhandahålla mod och initiativ under övergångar"
          ]
        }
      },
      blue: {
        en: {
          title: "Order-Centered Engagement",
          description: "When centered at Blue, governance engagement emphasizes proper procedures, moral principles, and dutiful participation.",
          approaches: {
            beige: {
              title: "In Survival Bands",
              content: "Bring order and structure to survival situations. Establish basic rules and duties even in crisis contexts."
            },
            purple: {
              title: "In Tribal Systems",
              content: "Formalize traditions into clear codes of conduct. Help systematize cultural practices for greater consistency."
            },
            red: {
              title: "In Authoritarian Systems",
              content: "Seek to establish proper procedures within power structures. Advocate for predictable applications of authority."
            },
            blue: {
              title: "In Rule-Based Systems",
              content: "Fully engage with established procedures and hierarchies. Uphold principles and fulfill duties with dedication."
            },
            orange: {
              title: "In Achievement Systems",
              content: "Follow rules while working toward goals. May struggle with corners being cut for competitive advantage."
            },
            green: {
              title: "In Participatory Systems",
              content: "Work to establish clear processes for participation. Brings structure to inclusive approaches."
            },
            yellow: {
              title: "In Adaptive Systems",
              content: "Help formalize flexible systems where appropriate. Ensure proper documentation and consistent application."
            },
            turquoise: {
              title: "In Holistic Systems",
              content: "Develop principled frameworks for holistic governance. Bring ethical clarity to complex global systems."
            }
          },
          strengths: [
            "Strong commitment to proper procedure",
            "Reliability and consistency in participation",
            "Respect for legitimate authority and structure"
          ],
          contributions: [
            "Building sustainable institutional frameworks",
            "Ensuring fairness through consistent application of rules",
            "Maintaining ethical foundations in governance systems"
          ]
        },
        sv: {
          title: "Ordningscentrerat engagemang",
          description: "När centrerad i Blue betonar styrningsengagemang korrekta procedurer, moraliska principer och plikttroget deltagande.",
          approaches: {
            beige: {
              title: "I Överlevnadsgrupper",
              content: "För in ordning och struktur i överlevnadssituationer. Etablera grundläggande regler och plikter även i krissammanhang."
            },
            purple: {
              title: "I Stamssystem",
              content: "Formalisera traditioner till tydliga uppförandekoder. Hjälp till att systematisera kulturella praktiker för större konsekvens."
            },
            red: {
              title: "I Auktoritära System",
              content: "Sträva efter att etablera korrekta procedurer inom maktstrukturer. Förespråka förutsägbara tillämpningar av auktoritet."
            },
            blue: {
              title: "I Regelbaserade System",
              content: "Engagera fullt ut i etablerade procedurer och hierarkier. Upprätthåll principer och uppfyll plikter med hängivenhet."
            },
            orange: {
              title: "I Prestationssystem",
              content: "Följ regler medan du arbetar mot mål. Kan kämpa med genvägar som tas för konkurrensfördel."
            },
            green: {
              title: "I Deltagande System",
              content: "Arbeta för att etablera tydliga processer för deltagande. För struktur till inkluderande tillvägagångssätt."
            },
            yellow: {
              title: "I Adaptiva System",
              content: "Hjälp till att formalisera flexibla system där det är lämpligt. Säkerställ korrekt dokumentation och konsekvent tillämpning."
            },
            turquoise: {
              title: "I Holistiska System",
              content: "Utveckla principiella ramverk för holistisk styrning. För etisk klarhet till komplexa globala system."
            }
          },
          strengths: [
            "Starkt engagemang för korrekt procedur",
            "Pålitlighet och konsekvens i deltagande",
            "Respekt för legitim auktoritet och struktur"
          ],
          contributions: [
            "Bygga hållbara institutionella ramverk",
            "Säkerställa rättvisa genom konsekvent tillämpning av regler",
            "Upprätthålla etiska grunder i styrningssystem"
          ]
        }
      },
      orange: {
        en: {
          title: "Achievement-Centered Engagement",
          description: "When centered at Orange, governance engagement focuses on strategic participation, practical results, and measurable progress.",
          approaches: {
            beige: {
              title: "In Survival Bands",
              content: "Introduce efficient resource management. Bring strategic thinking to survival situations."
            },
            purple: {
              title: "In Tribal Systems",
              content: "Seek to modernize traditional approaches for greater effectiveness. Introduce practical improvements while respecting culture."
            },
            red: {
              title: "In Authoritarian Systems",
              content: "Navigate power dynamics strategically. Look for opportunities to introduce merit-based elements."
            },
            blue: {
              title: "In Rule-Based Systems",
              content: "Work within rules while seeking optimization. Find ways to make ordered systems more efficient."
            },
            orange: {
              title: "In Achievement Systems",
              content: "Full engagement in competitive processes. Thrive in environments that reward performance and innovation."
            },
            green: {
              title: "In Participatory Systems",
              content: "Bring practical focus to inclusive approaches. Help ensure participatory processes produce tangible results."
            },
            yellow: {
              title: "In Adaptive Systems",
              content: "Contribute strategic thinking to adaptive frameworks. Apply practical metrics to evaluate flexible approaches."
            },
            turquoise: {
              title: "In Holistic Systems",
              content: "Bring pragmatic implementation to holistic vision. Help translate planetary consciousness into effective action."
            }
          },
          strengths: [
            "Strategic thinking and practical problem-solving",
            "Focus on measurable outcomes and effectiveness",
            "Drive for innovation and continuous improvement"
          ],
          contributions: [
            "Ensuring governance systems deliver practical results",
            "Bringing efficiency and innovation to processes",
            "Driving progress through strategic planning"
          ]
        },
        sv: {
          title: "Prestationscentrerat engagemang",
          description: "När centrerad i Orange fokuserar styrningsengagemang på strategiskt deltagande, praktiska resultat och mätbara framsteg.",
          approaches: {
            beige: {
              title: "I Överlevnadsgrupper",
              content: "Introducera effektiv resurshantering. För strategiskt tänkande till överlevnadssituationer."
            },
            purple: {
              title: "I Stamssystem",
              content: "Sträva efter att modernisera traditionella tillvägagångssätt för större effektivitet. Introducera praktiska förbättringar medan kultur respekteras."
            },
            red: {
              title: "I Auktoritära System",
              content: "Navigera maktdynamik strategiskt. Leta efter möjligheter att introducera meritbaserade element."
            },
            blue: {
              title: "I Regelbaserade System",
              content: "Arbeta inom regler medan optimering eftersträvas. Hitta sätt att göra ordnade system mer effektiva."
            },
            orange: {
              title: "I Prestationssystem",
              content: "Fullt engagemang i konkurrenskraftiga processer. Frodas i miljöer som belönar prestation och innovation."
            },
            green: {
              title: "I Deltagande System",
              content: "För praktiskt fokus till inkluderande tillvägagångssätt. Hjälp till att säkerställa att deltagande processer producerar påtagliga resultat."
            },
            yellow: {
              title: "I Adaptiva System",
              content: "Bidra med strategiskt tänkande till adaptiva ramverk. Tillämpa praktiska mätvärden för att utvärdera flexibla tillvägagångssätt."
            },
            turquoise: {
              title: "I Holistiska System",
              content: "För pragmatisk implementering till holistisk vision. Hjälp till att översätta planetärt medvetande till effektiv handling."
            }
          },
          strengths: [
            "Strategiskt tänkande och praktisk problemlösning",
            "Fokus på mätbara resultat och effektivitet",
            "Driv för innovation och kontinuerlig förbättring"
          ],
          contributions: [
            "Säkerställa att styrningssystem levererar praktiska resultat",
            "Föra in effektivitet och innovation i processer",
            "Driva framsteg genom strategisk planering"
          ]
        }
      },
      green: {
        en: {
          title: "Community-Centered Engagement",
          description: "When centered at Green, governance engagement emphasizes inclusivity, consensus building, and consideration of all stakeholders.",
          approaches: {
            beige: {
              title: "In Survival Bands",
              content: "Ensure everyone's basic needs are met equitably. Bring compassionate awareness to survival situations."
            },
            purple: {
              title: "In Tribal Systems",
              content: "Honor diverse traditions while promoting inclusion. Work to ensure all voices in the community are heard."
            },
            red: {
              title: "In Authoritarian Systems",
              content: "Advocate for more inclusive approaches to power. Work to mitigate harmful impacts of power imbalances."
            },
            blue: {
              title: "In Rule-Based Systems",
              content: "Encourage rules that protect marginalized groups. Promote equal application of principles across all members."
            },
            orange: {
              title: "In Achievement Systems",
              content: "Advocate for social responsibility in competitive contexts. Work toward more equitable distribution of opportunities."
            },
            green: {
              title: "In Participatory Systems",
              content: "Full engagement in consensus-building and inclusive processes. Thrive in environments that value all perspectives."
            },
            yellow: {
              title: "In Adaptive Systems",
              content: "Ensure adaptive frameworks maintain human connection. Bring stakeholder awareness to systems approaches."
            },
            turquoise: {
              title: "In Holistic Systems",
              content: "Integrate social justice with holistic vision. Ensure planetary consciousness includes all human perspectives."
            }
          },
          strengths: [
            "Deep sensitivity to social impact and inclusion",
            "Ability to facilitate consensus and shared understanding",
            "Commitment to fairness and consideration of all stakeholders"
          ],
          contributions: [
            "Making governance more inclusive and representative",
            "Ensuring systems consider impacts on all stakeholders",
            "Bringing emotional intelligence and empathy to decision processes"
          ]
        },
        sv: {
          title: "Gemenskapscentrerat engagemang",
          description: "När centrerad i Green betonar styrningsengagemang inkludering, konsensusbyggande och hänsyn till alla intressenter.",
          approaches: {
            beige: {
              title: "I Överlevnadsgrupper",
              content: "Säkerställ att allas grundläggande behov möts rättvist. För medkännande medvetenhet till överlevnadssituationer."
            },
            purple: {
              title: "I Stamssystem",
              content: "Hedra olika traditioner samtidigt som inkludering främjas. Arbeta för att säkerställa att alla röster i gemenskapen hörs."
            },
            red: {
              title: "I Auktoritära System",
              content: "Förespråka mer inkluderande tillvägagångssätt till makt. Arbeta för att mildra skadliga effekter av maktobalanser."
            },
            blue: {
              title: "I Regelbaserade System",
              content: "Uppmuntra regler som skyddar marginaliserade grupper. Främja likvärdig tillämpning av principer för alla medlemmar."
            },
            orange: {
              title: "I Prestationssystem",
              content: "Förespråka socialt ansvar i konkurrenssammanhang. Arbeta mot mer rättvis fördelning av möjligheter."
            },
            green: {
              title: "I Deltagande System",
              content: "Fullt engagemang i konsensusbyggande och inkluderande processer. Frodas i miljöer som värdesätter alla perspektiv."
            },
            yellow: {
              title: "I Adaptiva System",
              content: "Säkerställ att adaptiva ramverk upprätthåller mänsklig anknytning. För intressentmedvetenhet till systemansatser."
            },
            turquoise: {
              title: "I Holistiska System",
              content: "Integrera social rättvisa med holistisk vision. Säkerställ att planetärt medvetande inkluderar alla mänskliga perspektiv."
            }
          },
          strengths: [
            "Djup känslighet för social påverkan och inkludering",
            "Förmåga att underlätta konsensus och delad förståelse",
            "Engagemang för rättvisa och hänsyn till alla intressenter"
          ],
          contributions: [
            "Göra styrning mer inkluderande och representativ",
            "Säkerställa att system beaktar påverkan på alla intressenter",
            "Föra emotionell intelligens och empati till beslutsprocesser"
          ]
        }
      },
      yellow: {
        en: {
          title: "Systems-Centered Engagement",
          description: "When centered at Yellow, governance engagement focuses on adaptive solutions, systems thinking, and functional integration of multiple approaches.",
          approaches: {
            beige: {
              title: "In Survival Bands",
              content: "Bring systems thinking to survival challenges. Design adaptive responses to crisis situations."
            },
            purple: {
              title: "In Tribal Systems",
              content: "Integrate traditional wisdom with systems understanding. Find flexible approaches that honor cultural continuity."
            },
            red: {
              title: "In Authoritarian Systems",
              content: "Navigate power dynamics with systemic awareness. Find leverage points for evolutionary change within existing structures."
            },
            blue: {
              title: "In Rule-Based Systems",
              content: "Work with rules while understanding their functional purpose. Help evolve systems to be more adaptive when appropriate."
            },
            orange: {
              title: "In Achievement Systems",
              content: "Bring broader systemic awareness to strategic action. Consider second and third-order effects of competitive dynamics."
            },
            green: {
              title: "In Participatory Systems",
              content: "Connect participatory approaches with systems effectiveness. Integrate diverse perspectives into functional frameworks."
            },
            yellow: {
              title: "In Adaptive Systems",
              content: "Full engagement with complex adaptive approaches. Thrive in environments that flex between multiple modes as needed."
            },
            turquoise: {
              title: "In Holistic Systems",
              content: "Bridge systems thinking with holistic awareness. Help translate between functional approaches and unitive consciousness."
            }
          },
          strengths: [
            "Ability to see and address root causes of issues",
            "Integration of multiple perspectives and approaches",
            "Flexible adaptation to changing conditions and contexts"
          ],
          contributions: [
            "Designing governance systems that adapt to complexity",
            "Finding leverage points for effective systemic change",
            "Integrating diverse approaches to fit specific contexts"
          ]
        },
        sv: {
          title: "Systemcentrerat engagemang",
          description: "När centrerad i Yellow fokuserar styrningsengagemang på adaptiva lösningar, systemtänkande och funktionell integration av flera tillvägagångssätt.",
          approaches: {
            beige: {
              title: "I Överlevnadsgrupper",
              content: "För systemtänkande till överlevnadsutmaningar. Designa adaptiva svar på krissituationer."
            },
            purple: {
              title: "I Stamssystem",
              content: "Integrera traditionell visdom med systemförståelse. Hitta flexibla tillvägagångssätt som hedrar kulturell kontinuitet."
            },
            red: {
              title: "I Auktoritära System",
              content: "Navigera maktdynamik med systemisk medvetenhet. Hitta hävstångspunkter för evolutionär förändring inom befintliga strukturer."
            },
            blue: {
              title: "I Regelbaserade System",
              content: "Arbeta med regler medan deras funktionella syfte förstås. Hjälp till att utveckla system för att bli mer adaptiva när det är lämpligt."
            },
            orange: {
              title: "I Prestationssystem",
              content: "För bredare systemisk medvetenhet till strategisk handling. Överväg andra och tredje ordningens effekter av konkurrensdynamik."
            },
            green: {
              title: "I Deltagande System",
              content: "Koppla deltagande tillvägagångssätt med systemeffektivitet. Integrera olika perspektiv i funktionella ramverk."
            },
            yellow: {
              title: "I Adaptiva System",
              content: "Fullt engagemang med komplexa adaptiva tillvägagångssätt. Frodas i miljöer som flexar mellan flera lägen efter behov."
            },
            turquoise: {
              title: "I Holistiska System",
              content: "Brygga systemtänkande med holistisk medvetenhet. Hjälp till att översätta mellan funktionella tillvägagångssätt och enhetsmedvetande."
            }
          },
          strengths: [
            "Förmåga att se och adressera grundorsaker till problem",
            "Integration av flera perspektiv och tillvägagångssätt",
            "Flexibel anpassning till föränderliga förhållanden och sammanhang"
          ],
          contributions: [
            "Designa styrningssystem som anpassar sig till komplexitet",
            "Hitta hävstångspunkter för effektiv systemisk förändring",
            "Integrera olika tillvägagångssätt för att passa specifika sammanhang"
          ]
        }
      },
      turquoise: {
        en: {
          title: "Holistic-Centered Engagement",
          description: "When centered at Turquoise, governance engagement emphasizes evolutionary purpose, living systems awareness, and planetary consciousness.",
          approaches: {
            beige: {
              title: "In Survival Bands",
              content: "Bring holistic awareness to survival situations. Connect immediate needs with broader life conditions."
            },
            purple: {
              title: "In Tribal Systems",
              content: "Honor the spiritual wisdom in traditional approaches. Connect ancestral knowledge to planetary consciousness."
            },
            red: {
              title: "In Authoritarian Systems",
              content: "Work to transform power dynamics toward evolutionary purpose. Find ways to channel vital energy toward holistic ends."
            },
            blue: {
              title: "In Rule-Based Systems",
              content: "Help evolve principles to reflect living systems understanding. Connect order-based approaches to evolutionary context."
            },
            orange: {
              title: "In Achievement Systems",
              content: "Bring deeper purpose to strategic action. Connect success metrics to planetary wellbeing and consciousness evolution."
            },
            green: {
              title: "In Participatory Systems",
              content: "Integrate social consciousness with global awareness. Connect human inclusivity to broader planetary systems."
            },
            yellow: {
              title: "In Adaptive Systems",
              content: "Bring evolutionary purpose to systems approaches. Connect functional adaptivity with holistic consciousness."
            },
            turquoise: {
              title: "In Holistic Systems",
              content: "Full engagement with governance as a living system. Participate as both an individual and as the whole simultaneously."
            }
          },
          strengths: [
            "Global and evolutionary perspective",
            "Integration of multiple ways of knowing (rational, intuitive, embodied)",
            "Sensing emergent patterns across systems and scales"
          ],
          contributions: [
            "Aligning governance with evolutionary purpose",
            "Bringing consciousness of the whole to decision processes",
            "Designing systems that honor all life and future generations"
          ]
        },
        sv: {
          title: "Holistiskt-centrerat engagemang",
          description: "När centrerad i Turquoise betonar styrningsengagemang evolutionärt syfte, medvetenhet om levande system och planetärt medvetande.",
          approaches: {
            beige: {
              title: "I Överlevnadsgrupper",
              content: "För holistisk medvetenhet till överlevnadssituationer. Koppla omedelbara behov med bredare livsvillkor."
            },
            purple: {
              title: "I Stamssystem",
              content: "Hedra den andliga visdomen i traditionella tillvägagångssätt. Koppla förfäders kunskap till planetärt medvetande."
            },
            red: {
              title: "I Auktoritära System",
              content: "Arbeta för att transformera maktdynamik mot evolutionärt syfte. Hitta sätt att kanalisera vital energi mot holistiska mål."
            },
            blue: {
              title: "I Regelbaserade System",
              content: "Hjälp till att utveckla principer för att reflektera förståelse av levande system. Koppla ordningsbaserade tillvägagångssätt till evolutionärt sammanhang."
            },
            orange: {
              title: "I Prestationssystem",
              content: "För djupare syfte till strategisk handling. Koppla framgångsmått till planetärt välbefinnande och medvetandeutveckling."
            },
            green: {
              title: "I Deltagande System",
              content: "Integrera socialt medvetande med global medvetenhet. Koppla mänsklig inkludering till bredare planetära system."
            },
            yellow: {
              title: "I Adaptiva System",
              content: "För evolutionärt syfte till systemansatser. Koppla funktionell adaptivitet med holistiskt medvetande."
            },
            turquoise: {
              title: "I Holistiska System",
              content: "Fullt engagemang med styrning som ett levande system. Delta både som en individ och som helheten samtidigt."
            }
          },
          strengths: [
            "Globalt och evolutionärt perspektiv",
            "Integration av flera kunskapsvägar (rationell, intuitiv, förkroppsligad)",
            "Känsla för framväxande mönster över system och skalor"
          ],
          contributions: [
            "Anpassa styrning med evolutionärt syfte",
            "Föra medvetenhet om helheten till beslutsprocesser",
            "Designa system som hedrar allt liv och framtida generationer"
          ]
        }
      },
      coral: {
        en: {
          title: "Sovereign Unity Engagement",
          description: "When centered at Coral, governance engagement balances radical autonomy with universal consciousness, creating new paradigms of coordination.",
          approaches: {
            beige: {
              title: "In Survival Bands",
              content: "Transform survival challenges through evolutionary creativity. Manifest new possibilities in life-threatening situations."
            },
            purple: {
              title: "In Tribal Systems",
              content: "Innovate new cultural forms that honor the essence of tradition. Pioneer consciousness practices within community contexts."
            },
            red: {
              title: "In Authoritarian Systems",
              content: "Transcend power dynamics through sovereign presence. Create new paradigms that transform domination into co-creation."
            },
            blue: {
              title: "In Rule-Based Systems",
              content: "Bring evolutionary creativity to principles and structures. Develop new governance forms that transcend rule-based limitations."
            },
            orange: {
              title: "In Achievement Systems",
              content: "Pioneer creative possibilities beyond strategic boundaries. Transform competitive dynamics through sovereign unity consciousness."
            },
            green: {
              title: "In Participatory Systems",
              content: "Evolve inclusive approaches to embody both individuality and unity. Create new paradigms of consciousness-based collaboration."
            },
            yellow: {
              title: "In Adaptive Systems",
              content: "Bring evolutionary consciousness to systems design. Transform adaptive frameworks through creative innovation."
            },
            turquoise: {
              title: "In Holistic Systems",
              content: "Integrate holistic consciousness with sovereign creativity. Collaborate in the emergence of new evolutionary governance forms."
            }
          },
          strengths: [
            "Transcendent creativity that breaks through existing paradigms",
            "Integration of sovereign individuality with universal unity",
            "Pioneering of new possibilities for consciousness-based coordination"
          ],
          contributions: [
            "Creating emergent governance forms beyond current paradigms",
            "Pioneering consciousness practices for collective coordination",
            "Manifesting creative breakthroughs in governance evolution"
          ]
        },
        sv: {
          title: "Suveränt Enhetsengagemang",
          description: "När centrerad i Coral balanserar styrningsengagemang radikal autonomi med universellt medvetande, och skapar nya paradigm för koordination.",
          approaches: {
            beige: {
              title: "I Överlevnadsgrupper",
              content: "Transformera överlevnadsutmaningar genom evolutionär kreativitet. Manifestera nya möjligheter i livshotande situationer."
            },
            purple: {
              title: "I Stamssystem",
              content: "Innovera nya kulturella former som hedrar traditionens essens. Pionjär medvetandepraktiker inom gemenskapssammanhang."
            },
            red: {
              title: "I Auktoritära System",
              content: "Transcendera maktdynamik genom suverän närvaro. Skapa nya paradigm som transformerar dominans till sammanseende."
            },
            blue: {
              title: "I Regelbaserade System",
              content: "För evolutionär kreativitet till principer och strukturer. Utveckla nya styrningsformer som transcenderar regelbaserade begränsningar."
            },
            orange: {
              title: "I Prestationssystem",
              content: "Pionjär kreativa möjligheter bortom strategiska gränser. Transformera konkurrensdynamik genom suveränt enhetsmedvetande."
            },
            green: {
              title: "I Deltagande System",
              content: "Utveckla inkluderande tillvägagångssätt för att förkroppsliga både individualitet och enhet. Skapa nya paradigm för medvetandebaserat samarbete."
            },
            yellow: {
              title: "I Adaptiva System",
              content: "För evolutionärt medvetande till systemdesign. Transformera adaptiva ramverk genom kreativ innovation."
            },
            turquoise: {
              title: "I Holistiska System",
              content: "Integrera holistiskt medvetande med suverän kreativitet. Samarbeta i framväxten av nya evolutionära styrningsformer."
            }
          },
          strengths: [
            "Transcendent kreativitet som bryter igenom existerande paradigm",
            "Integration av suverän individualitet med universell enhet",
            "Banbrytande av nya möjligheter för medvetandebaserad koordination"
          ],
          contributions: [
            "Skapa framväxande styrningsformer bortom nuvarande paradigm",
            "Pionjär medvetandepraktiker för kollektiv koordination",
            "Manifestera kreativa genombrott i styrningsevolution"
          ]
        }
      }
    }
  };

  // Translations for UI texts
  const translations = {
    en: {
      title: "Personal-to-Collective Bridge",
      description: "Understand how your developmental stage influences how you engage with different governance systems.",
      personal_stage: "Your Developmental Stage",
      governance_system: "Governance System",
      select_personal: "Select your primary developmental stage",
      select_governance: "Select a governance system to understand how to engage with it",
      your_strengths: "Your Strengths",
      your_contributions: "Potential Contributions",
      select_prompt: "Select from the options above",
      how_to_engage: "How to Engage",
      learning_from_all: "We can learn from all stages of development",
      developmental_note: "Remember that we all have access to multiple stages, though we tend to center at particular stages in different life contexts."
    },
    sv: {
      title: "Personlig-till-Kollektiv Brygga",
      description: "Förstå hur ditt utvecklingsstadium påverkar hur du engagerar dig med olika styrningssystem.",
      personal_stage: "Ditt Utvecklingsstadium",
      governance_system: "Styrningssystem",
      select_personal: "Välj ditt primära utvecklingsstadium",
      select_governance: "Välj ett styrningssystem för att förstå hur du kan engagera dig med det",
      your_strengths: "Dina Styrkor",
      your_contributions: "Potentiella Bidrag",
      select_prompt: "Välj från alternativen ovan",
      how_to_engage: "Hur du kan Engagera dig",
      learning_from_all: "Vi kan lära från alla utvecklingsstadier",
      developmental_note: "Kom ihåg att vi alla har tillgång till flera stadier, även om vi tenderar att centrera oss vid särskilda stadier i olika livssammanhang."
    }
  };

  $: t = translations[currentLanguage];
</script>

<div class="personal-collective-bridge bg-white rounded-xl shadow-sm p-6">
  <div class="mb-8">
    <h2 class="text-xl font-semibold mb-2">{t.title}</h2>
    <p class="text-gray-600">{t.description}</p>
  </div>
  
  <div class="grid gap-6 md:grid-cols-2">
    <!-- Stage Selection -->
    <div>
      <h3 class="font-medium mb-3">{t.personal_stage}</h3>
      <div class="space-y-2">
        {#each Object.keys(bridgeData.stageApproaches) as stage}
          <button
            class={`w-full px-4 py-3 rounded-lg text-left ${selectedStage === stage ? 'text-white' : 'text-gray-700 hover:bg-gray-50'}`}
            style={selectedStage === stage ? `background-color: ${getStageColor(stage)}` : ''}
            on:click={() => selectedStage = stage}
          >
            <span class="capitalize">{stage}</span>
            {#if bridgeData.stageApproaches[stage]}
               - {bridgeData.stageApproaches[stage][currentLanguage].title}
            {/if}
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Governance System Selection -->
    <div>
      <h3 class="font-medium mb-3">{t.governance_system}</h3>
      <div class="space-y-2">
        {#each Object.keys(bridgeData.stageApproaches.beige[currentLanguage].approaches) as govSystem}
          <button
            class={`w-full px-4 py-3 rounded-lg text-left ${selectedGovernance === govSystem ? 'text-white' : 'text-gray-700 hover:bg-gray-50'}`}
            style={selectedGovernance === govSystem ? `background-color: ${getStageColor(govSystem)}` : ''}
            on:click={() => selectedGovernance = govSystem}
          >
            <span class="capitalize">{govSystem}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Results Display -->
  <div class="mt-8">
    {#if !selectedStage}
      <div class="text-center p-6 bg-gray-50 rounded-lg">
        <p class="text-gray-500">{t.select_personal}</p>
      </div>
    {:else if !selectedGovernance}
      <div class="text-center p-6 bg-gray-50 rounded-lg">
        <p class="text-gray-500">{t.select_governance}</p>
      </div>
    {:else}
      <!-- Display engagement approach -->
      <div 
        class="p-6 rounded-lg mb-6" 
        style={`background-color: ${getStageColor(selectedStage)}15; border-left: 4px solid ${getStageColor(selectedStage)}`}
      >
        <h3 class="text-xl font-semibold mb-2">{t.how_to_engage}</h3>
        <div class="mb-4">
          <h4 class="font-medium">
            {bridgeData.stageApproaches[selectedStage][currentLanguage].approaches[selectedGovernance].title}
          </h4>
          <p class="text-gray-700 mt-1">
            {bridgeData.stageApproaches[selectedStage][currentLanguage].approaches[selectedGovernance].content}
          </p>
        </div>
        
        <!-- Strengths and Contributions -->
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h4 class="font-medium">{t.your_strengths}</h4>
            <ul class="mt-2 list-disc list-inside space-y-1 text-gray-600">
              {#each bridgeData.stageApproaches[selectedStage][currentLanguage].strengths as strength}
                <li>{strength}</li>
              {/each}
            </ul>
          </div>
          <div>
            <h4 class="font-medium">{t.your_contributions}</h4>
            <ul class="mt-2 list-disc list-inside space-y-1 text-gray-600">
              {#each bridgeData.stageApproaches[selectedStage][currentLanguage].contributions as contribution}
                <li>{contribution}</li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
      
      <p class="text-sm text-gray-500 italic text-center">{t.developmental_note}</p>
    {/if}
  </div>
</div>
