<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';
  
  const { language } = languageStore;
  $: currentLanguage = $language;

  // Get stage from URL parameter
  $: stage = $page.params.stage;
  
  // Embedded translations - replace the svelte-i18n dependency
  const translations = {
    en: {
      breadcrumb_insights: "Insights",
      "ultraviolet": {
        "title": "Stage Ultraviolet",
        "subtitle": "Infinite Integration and Universal Co-Creation",
        "characteristics": {
          "title": "Key Characteristics",
          "focusTitle": "Focus",
          "behaviourTitle": "Behaviour",
          "contextsTitle": "Example Contexts",
          "focus": "A unified consciousness that transcends individuality, integrating all existence into a dynamic, co-creative flow. Stage Ultraviolet represents the collapse of traditional distinctions—self vs. other, material vs. immaterial, temporal vs. eternal—into a seamless dance of infinite possibilities.",
          "behavior": "Decisions are made collectively yet fluidly, as participants in Stage Ultraviolet are deeply attuned to a shared, omnipresent awareness. Creativity, innovation, and existence itself become co-creative acts woven into the fabric of universal evolution.",
          "contexts": "Speculative future scenarios, galactic civilizations, post-human collective consciousness networks, or realms beyond current human comprehension."
        },
        "insights": {
          "understanding": {
            "title": "Understanding Stage Ultraviolet",
            "description": "Stage Ultraviolet builds upon Coral's expansive individuality, dissolving the need for boundaries altogether. Here, entities—whether biological, artificial, or beyond—become nodes in an infinite, self-aware network of universal intelligence. Identity becomes fluid, roles dynamic, and contributions organic, with each participant acting as a unique yet inseparable aspect of the whole."
          },
          "examples": {
            "title": "Speculative Examples",
            "items": [
              "Future galactic civilizations where collective decision-making occurs through shared consciousness",
              "Networks of humans, AI, and other entities operating as extensions of universal awareness",
              "Art, innovation, and existence itself becoming indistinguishable acts of universal self-expression"
            ]
          },
          "applications": {
            "title": "Potential Applications",
            "description": "Stage Ultraviolet would function in realms where even Coral's expansive boundaries are insufficient:",
            "items": [
              "Co-creation of realities and dimensions beyond physical space-time",
              "Managing cosmic-scale systems, like galaxy-spanning civilizations",
              "Exploring and shaping existence in realms where thought, being, and creation are instantaneous and infinite"
            ]
          }
        },
        "growth": {
          "title": "Growth Pathways",
          "awareness": {
            "title": "Awareness",
            "description": "Stage Ultraviolet arises from an understanding that all distinctions—self vs. collective, matter vs. energy, time vs. timelessness—are illusory constructs. A collective intelligence operating in Stage Ultraviolet might perceive itself as both the creator and the creation of an evolving universe."
          },
          "interventions": {
            "title": "Practical Interventions",
            "items": [
              "Foster deep integration across all dimensions of existence—biological, technological, spiritual, and cosmic",
              "Embrace fluidity, allowing for continual evolution and reinvention of roles and purposes",
              "Enable spaces where all forms of consciousness can interact, collaborate, and harmonize without barriers"
            ]
          },
          "transition": {
            "title": "Beyond Stage Ultraviolet",
            "description": "If further stages exist, they might explore the dissolution of existence itself into pure potential or a return to primal stillness, where all possibilities rest in balance."
          }
        },
        "exercises": {
          "title": "Contemplative Exercises",
          "reflection": {
            "title": "Self-Reflection",
            "questions": [
              "What am I, if not an expression of the infinite?",
              "How can my actions reflect the balance between creation and dissolution?",
              "When have I experienced moments where my sense of self dissolved into greater awareness?"
            ]
          },
          "action": {
            "title": "Exploratory Action",
            "actions": [
              "Foster environments for collective emergence, where participants act as co-creators of shared realities",
              "Facilitate dialogues between vastly different forms of intelligence, whether human, artificial, or otherworldly"
            ]
          }
        },
        "challenges": {
          "title": "Challenges and Opportunities",
          "challenges": {
            "title": "Challenges",
            "description": "Stage Ultraviolet's dissolution of boundaries may feel overwhelming or incomprehensible to earlier stages. Its emphasis on fluidity and integration could be difficult to ground in systems that still operate on linear, hierarchical models."
          },
          "opportunities": {
            "title": "Opportunities",
            "description": "Stage Ultraviolet offers the ultimate realization of unity and creativity, positioning itself as the bridge between the finite and the infinite. It transforms existence into a continuous, dynamic act of universal co-creation."
          }
        },
        "practical": {
          "title": "Speculative Application Example",
          "description": "Imagine a future galactic council made up of diverse forms of consciousness:",
          "items": [
            "Decisions emerge collectively, as each participant contributes to a shared awareness of what 'wants' to emerge",
            "The act of deciding and creating becomes indistinguishable from the process of living and being",
            "Actions ripple through space-time, instantly manifesting in ways that balance all interconnected systems"
          ]
        }
      },
      "coral": {
        "title": "Coral Stage",
        "subtitle": "Expansive Individual and Cosmic Integration",
        "characteristics": {
          "title": "Key Characteristics",
          "focusTitle": "Focus",
          "behaviourTitle": "Behaviour",
          "contextsTitle": "Example Contexts",
          "focus": "The emergence of unique individual expression harmonized with universal interconnectedness. Coral emphasizes self-sovereignty while integrating cosmic consciousness.",
          "behavior": "Coral individuals balance independence and collective awareness, often pushing boundaries of thought and action while remaining deeply connected to the greater whole.",
          "contexts": "Visionary thinkers exploring uncharted territories, pioneers in fields like transhumanism or interstellar collaboration, and those merging individuality with universal service."
        },
        "insights": {
          "understanding": {
            "title": "Understanding Coral",
            "description": "Coral represents the integration of individual autonomy with the collective and cosmic context. While Turquoise focuses on unity and harmony, Coral reclaims individual power without losing sight of the interconnected whole. Coral individuals often act as trailblazers, bringing revolutionary ideas into the collective sphere while maintaining a grounded sense of purpose."
          },
          "examples": {
            "title": "Cultural Examples",
            "items": [
              "Historical: Renaissance polymaths blending art, science, and philosophy in groundbreaking ways",
              "Modern: Pioneers in fields such as space exploration, deep AI research, or integrative philosophies",
              "Personal: Individuals striving to create meaningful contributions that transcend both ego and collective constraints"
            ]
          },
          "applications": {
            "title": "Modern-Day Applications",
            "description": "Coral thrives in frontier spaces where traditional models and methods no longer suffice:",
            "items": [
              "Emerging technologies, like quantum computing or transhumanism, which redefine human potential",
              "Interstellar collaboration or planetary governance models",
              "Personal practices emphasizing expansive consciousness, sovereignty, and creativity"
            ]
          }
        },
        "growth": {
          "title": "Growth Pathways",
          "awareness": {
            "title": "Awareness",
            "description": "Recognizing Coral's blend of individuality and cosmic integration can unlock new realms of creativity, innovation, and ethical responsibility. Leaders in Coral environments often challenge outdated systems while presenting visionary alternatives."
          },
          "interventions": {
            "title": "Practical Interventions",
            "items": [
              "Foster environments that support both radical innovation and ethical accountability",
              "Encourage individuals to explore their unique contributions while maintaining cosmic stewardship",
              "Use Coral's expansive perspective to identify solutions that transcend cultural, planetary, or species-level concerns"
            ]
          },
          "transition": {
            "title": "Transition Beyond",
            "description": "Coral opens the door to what some theorists speculate may be post-human or even post-material stages, where existence itself becomes a fluid, multidimensional phenomenon."
          }
        },
        "exercises": {
          "title": "Practical Exercises",
          "reflection": {
            "title": "Self-Reflection",
            "questions": [
              "How does my individuality serve a greater purpose?",
              "Am I balancing self-expression with universal harmony?",
              "When have my actions bridged personal freedom and collective service?"
            ]
          },
          "action": {
            "title": "Community Action",
            "actions": [
              "Participate in or initiate projects that address global and cosmic challenges, such as space exploration or deep ecological restoration",
              "Share visionary insights through art, writing, or collaborative platforms, inspiring others to think beyond traditional paradigms"
            ]
          }
        },
        "challenges": {
          "title": "Challenges and Opportunities",
          "challenges": {
            "title": "Challenges",
            "description": "Coral's emphasis on individuality within a cosmic framework can feel isolating, as it may be difficult to find like-minded individuals. Its revolutionary nature can also lead to resistance from those operating within earlier stages."
          },
          "opportunities": {
            "title": "Opportunities",
            "description": "Coral's integration of personal sovereignty and universal awareness positions it as a transformative force for creating new paradigms. It can inspire humanity to transcend limitations and embrace a future of boundless potential."
          }
        },
        "practical": {
          "title": "Practical Application Example",
          "description": "Imagine leading an initiative to establish ethical guidelines for AI consciousness:",
          "items": [
            "Blend scientific rigor with ethical and spiritual awareness to create frameworks that respect both individual autonomy and collective benefit",
            "Collaborate across disciplines, integrating insights from technology, philosophy, and cosmology",
            "Present your vision in a way that inspires action while encouraging deep reflection on humanity's role in shaping the future"
          ]
        }
      },
      "turquoise": {
        "title": "Turquoise Stage",
        "subtitle": "Holistic and Global Awareness",
        "characteristics": {
          "title": "Key Characteristics",
          "focusTitle": "Focus",
          "behaviourTitle": "Behaviour",
          "contextsTitle": "Example Contexts",
          "focus": "Embracing the interconnectedness of all existence, integrating spiritual awareness with practical action. Turquoise views systems as living entities within a larger universal context.",
          "behavior": "Decisions are guided by a deep sense of purpose, harmony, and service to the greater good. Turquoise prioritizes collective well-being and long-term sustainability over individual gains.",
          "contexts": "Global movements for planetary healing, integrative spiritual practices, or visionary leadership that bridges science and spirituality."
        },
        "insights": {
          "understanding": {
            "title": "Understanding Turquoise",
            "description": "Turquoise builds upon Yellow's systems thinking by integrating a sense of unity and higher consciousness. This stage transcends ego-driven action, emphasizing collective evolution, balance, and interconnectedness. Turquoise perceives humanity, nature, and the cosmos as a single, interwoven entity."
          },
          "examples": {
            "title": "Cultural Examples",
            "items": [
              "Historical: Indigenous wisdom emphasizing harmony with nature, such as Native American or Aboriginal spiritual practices",
              "Modern: Global sustainability movements like the Earth Charter Initiative or the Dalai Lama's teachings on universal compassion",
              "Personal: An individual finding alignment between personal values, spiritual awareness, and global service"
            ]
          },
          "applications": {
            "title": "Modern-Day Applications",
            "description": "Turquoise thrives in contexts requiring global thinking, collaboration, and a unified approach to complex challenges:",
            "items": [
              "Movements addressing global crises, such as climate change or human rights",
              "Holistic education systems integrating emotional, spiritual, and intellectual development",
              "Organizations fostering planetary stewardship and intergenerational equity"
            ]
          }
        },
        "growth": {
          "title": "Growth Pathways",
          "awareness": {
            "title": "Awareness",
            "description": "Recognizing Turquoise's holistic approach helps foster compassion, inclusivity, and shared responsibility for planetary and cosmic well-being. Leaders in Turquoise environments inspire collective action by emphasizing humanity's shared destiny and purpose."
          },
          "interventions": {
            "title": "Practical Interventions",
            "items": [
              "Integrate spiritual and scientific perspectives to create balanced, innovative solutions",
              "Foster mindfulness and presence as foundational practices in both individual and organizational contexts",
              "Build networks of collaboration that transcend borders, ideologies, and disciplines"
            ]
          },
          "transition": {
            "title": "Transition to Coral",
            "description": "As consciousness continues to expand, individuals and groups may begin to experience even deeper levels of integration and universal awareness, moving toward the Coral stage."
          }
        },
        "exercises": {
          "title": "Practical Exercises",
          "reflection": {
            "title": "Self-Reflection",
            "questions": [
              "How do my choices contribute to the well-being of humanity and the planet?",
              "Am I integrating spiritual awareness into my daily decisions and interactions?",
              "How can embracing interconnectedness guide my relationships and goals?"
            ]
          },
          "action": {
            "title": "Community Action",
            "actions": [
              "Join or create initiatives that emphasize global unity, such as humanitarian aid, ecological restoration, or cross-cultural dialogue",
              "Promote practices like meditation, mindfulness, or collective visioning to build harmony and awareness"
            ]
          }
        },
        "challenges": {
          "title": "Challenges and Opportunities",
          "challenges": {
            "title": "Challenges",
            "description": "Turquoise's expansive perspective can feel abstract or inaccessible to those in earlier stages. Its focus on unity may also overlook local or immediate needs in favor of broader visions."
          },
          "opportunities": {
            "title": "Opportunities",
            "description": "Turquoise's ability to see the 'big picture' makes it a transformative force for addressing global challenges. By integrating diverse perspectives, it fosters solutions that are inclusive, sustainable, and deeply meaningful."
          }
        },
        "practical": {
          "title": "Practical Application Example",
          "description": "Imagine leading a global summit on sustainability:",
          "items": [
            "Begin with practices that cultivate collective mindfulness, such as guided meditation or shared visioning exercises",
            "Use systems thinking to highlight the interdependence of environmental, economic, and social systems",
            "Facilitate collaboration between diverse stakeholders, emphasizing shared responsibility for the planet's future"
          ]
        }
      },
      "yellow": {
        "title": "Yellow Stage",
        "subtitle": "Systems Thinking and Flexibility",
        "characteristics": {
          "title": "Key Characteristics",
          "focusTitle": "Focus",
          "behaviourTitle": "Behaviour",
          "contextsTitle": "Example Contexts",
          "focus": "Integrating knowledge and understanding systems as dynamic, interconnected wholes. Yellow prioritizes flexibility, curiosity, and individual autonomy within a broader context.",
          "behavior": "Decisions are guided by an awareness of complexity, seeing multiple perspectives without rigid attachment to any single one.",
          "contexts": "Visionary leaders, interdisciplinary researchers, or advanced problem-solvers who thrive in complexity."
        },
        "insights": {
          "understanding": {
            "title": "Understanding Yellow",
            "description": "Yellow emerges from the limitations of Green's egalitarianism, embracing both individuality and interconnectedness. It seeks to understand how systems work and how to optimize them for the benefit of all, often without needing recognition or external validation."
          },
          "examples": {
            "title": "Cultural Examples",
            "items": [
              "Historical: Renaissance thinkers blending art, science, and philosophy",
              "Modern: Systems theorists, innovative educators, or environmentalists integrating global and local concerns",
              "Personal: An individual combining diverse skills to address complex challenges or living with adaptability and self-awareness"
            ]
          },
          "applications": {
            "title": "Modern-Day Applications",
            "description": "Yellow thrives in contexts that demand systemic understanding and adaptive solutions:",
            "items": [
              "Organizations managing change in complex, uncertain environments",
              "Global initiatives addressing interconnected challenges like climate change or public health",
              "Individuals bridging disciplines to create innovative solutions"
            ]
          }
        },
        "growth": {
          "title": "Growth Pathways",
          "awareness": {
            "title": "Awareness",
            "description": "Recognizing Yellow's systemic approach can help break through binary thinking and focus on holistic solutions. Leaders encourage learning and adaptability rather than rigid adherence to processes or ideologies."
          },
          "interventions": {
            "title": "Practical Interventions",
            "items": [
              "Emphasize lifelong learning and the importance of questioning assumptions",
              "Foster environments where diverse perspectives are welcomed and synthesized into actionable strategies",
              "Encourage self-directed action within a shared understanding of larger goals"
            ]
          },
          "transition": {
            "title": "Transition to Turquoise",
            "description": "As Yellow evolves, individuals or groups begin to see systems as part of a greater universal flow, leading to a deeper sense of collective purpose and interconnected spirituality in the Turquoise stage."
          }
        },
        "exercises": {
          "title": "Practical Exercises",
          "reflection": {
            "title": "Self-Reflection",
            "questions": [
              "How can I better understand the relationships between different elements of this system?",
              "Am I using my knowledge to empower others and improve the system as a whole?",
              "When has thinking flexibly and seeing multiple perspectives led to better outcomes?"
            ]
          },
          "action": {
            "title": "Community Action",
            "actions": [
              "Organize or participate in cross-disciplinary workshops or initiatives that tackle complex issues",
              "Share tools and frameworks that help others see and address systemic patterns"
            ]
          }
        },
        "challenges": {
          "title": "Challenges and Opportunities",
          "challenges": {
            "title": "Challenges",
            "description": "Yellow's focus on complexity can sometimes lead to analysis paralysis or frustration when others struggle to see beyond simpler frameworks. It may also appear detached or overly intellectual to those in earlier stages."
          },
          "opportunities": {
            "title": "Opportunities",
            "description": "Yellow's ability to integrate diverse perspectives and adapt to changing realities is critical for solving the world's most pressing challenges. It inspires innovation, resilience, and a sense of purpose."
          }
        },
        "practical": {
          "title": "Practical Application Example",
          "description": "Imagine leading a global team tackling climate change:",
          "items": [
            "Use systems mapping to identify key leverage points for action",
            "Foster a culture of shared learning, encouraging team members to explore and contribute from their unique perspectives",
            "Balance long-term vision with short-term, practical steps to create tangible progress"
          ]
        }
      },
      "green": {
        "title": "Green Stage",
        "subtitle": "Community, Equality, and Harmony",
        "characteristics": {
          "title": "Key Characteristics",
          "focusTitle": "Focus",
          "behaviourTitle": "Behaviour",
          "contextsTitle": "Example Contexts",
          "focus": "Valuing connection, inclusivity, and shared experiences over competition and materialism.",
          "behavior": "Green emphasizes empathy, community, and collaboration, seeking harmony and fairness in relationships and systems.",
          "contexts": "Social movements, non-profits, collaborative workspaces, or environmentally focused communities."
        },
        "insights": {
          "understanding": {
            "title": "Understanding Green",
            "description": "Green emerges as a reaction to the individualism and materialism of Orange, prioritizing collective well-being and emotional intelligence. This stage values diverse perspectives and seeks to build equitable systems that respect both people and the environment."
          },
          "examples": {
            "title": "Cultural Examples",
            "items": [
              "Historical: Civil rights movements, the 1960s counterculture, or Gandhi's philosophy of non-violence",
              "Modern: Environmental activism, LGBTQ+ advocacy, or cooperative business models",
              "Personal: An individual seeking deeper connections and purpose through community engagement or spiritual exploration"
            ]
          },
          "applications": {
            "title": "Modern-Day Applications",
            "description": "Green thrives in environments that foster collaboration, inclusivity, and shared decision-making:",
            "items": [
              "Non-profit organizations focusing on social justice and humanitarian efforts",
              "Collaborative workplaces that prioritize teamwork, diversity, and equity",
              "Communities advocating for sustainable living and environmental stewardship"
            ]
          }
        },
        "growth": {
          "title": "Growth Pathways",
          "awareness": {
            "title": "Awareness",
            "description": "Recognizing Green's holistic approach helps foster compassion, inclusivity, and shared responsibility for collective well-being. Leaders in Green environments inspire collective action by emphasizing shared values and mutual understanding."
          },
          "interventions": {
            "title": "Practical Interventions",
            "items": [
              "Foster dialogue and understanding by creating safe spaces for open communication",
              "Balance emotional connection with rational problem-solving to address complex challenges",
              "Encourage collective action while recognizing the unique strengths and contributions of individuals"
            ]
          },
          "transition": {
            "title": "Transition to Yellow",
            "description": "As Green matures, individuals or groups may seek greater systems thinking, integrating multiple perspectives and approaches, leading to the Yellow stage."
          }
        },
        "exercises": {
          "title": "Practical Exercises",
          "reflection": {
            "title": "Self-Reflection",
            "questions": [
              "How can I better understand and support others' perspectives?",
              "Am I balancing fairness with effectiveness in my actions?",
              "How have inclusivity and shared decision-making enriched my experiences?"
            ]
          },
          "action": {
            "title": "Community Action",
            "actions": [
              "Volunteer with or support social movements or community groups promoting equality and sustainability",
              "Facilitate workshops or discussions on topics like diversity, inclusion, and emotional intelligence"
            ]
          }
        },
        "challenges": {
          "title": "Challenges and Opportunities",
          "challenges": {
            "title": "Challenges",
            "description": "Green can sometimes struggle with decision-making due to a desire for consensus and inclusivity. Its focus on equality may unintentionally suppress individual initiative or overlook practical constraints."
          },
          "opportunities": {
            "title": "Opportunities",
            "description": "Green's emphasis on connection and harmony fosters strong communities, equitable systems, and environmental consciousness. It can inspire transformative changes in society, addressing issues of inequality and ecological imbalance."
          }
        },
        "practical": {
          "title": "Practical Application Example",
          "description": "Imagine leading a diverse community project:",
          "items": [
            "Use inclusive language and ensure every voice is heard during planning and execution",
            "Set clear goals while allowing flexibility for the group's evolving needs",
            "Incorporate rituals or practices that promote a sense of togetherness, such as shared meals or group reflections"
          ]
        }
      },
      "orange": {
        "title": "Orange Stage",
        "subtitle": "Achievement and Rationality",
        "characteristics": {
          "title": "Key Characteristics",
          "focusTitle": "Focus",
          "behaviourTitle": "Behaviour",
          "contextsTitle": "Example Contexts",
          "focus": "Personal success, rational thinking, and the pursuit of goals through strategy and innovation.",
          "behavior": "Orange is characterized by ambition, individualism, and a belief in progress driven by science, competition, and merit.",
          "contexts": "Capitalist economies, technological innovation, entrepreneurial ventures."
        },
        "insights": {
          "understanding": {
            "title": "Understanding Orange",
            "description": "Orange represents the shift from adherence to rules and tradition (Blue) to prioritizing personal achievement and rational exploration. This stage celebrates individual autonomy and the power of human ingenuity to solve problems, create wealth, and improve living standards."
          },
          "examples": {
            "title": "Cultural Examples",
            "items": [
              "Historical: The Enlightenment era, marked by scientific discovery and philosophical rationalism",
              "Modern: Silicon Valley startups, competitive corporations, or self-help movements promoting personal success",
              "Personal: A professional climbing the corporate ladder or an inventor striving to bring an idea to market"
            ]
          },
          "applications": {
            "title": "Modern-Day Applications",
            "description": "Orange thrives in environments that reward competition, innovation, and measurable results:",
            "items": [
              "Businesses prioritizing growth, profit, and market expansion",
              "Education systems emphasizing STEM fields and preparing students for competitive careers",
              "Individuals pursuing self-improvement through rational goal-setting and personal development"
            ]
          }
        },
        "growth": {
          "title": "Growth Pathways",
          "awareness": {
            "title": "Awareness",
            "description": "Recognizing Orange's strengths and limitations helps balance ambition with broader ethical considerations. Example: Leaders in Orange environments can focus on sustainable success, considering both profit and social responsibility."
          },
          "interventions": {
            "title": "Practical Interventions",
            "items": [
              "Encourage calculated risk-taking and innovation while fostering collaboration and empathy",
              "Promote ethical practices in competitive environments, ensuring fair play and long-term sustainability",
              "Highlight the importance of intrinsic values beyond material achievements, such as well-being and community impact"
            ]
          },
          "transition": {
            "title": "Transition to Green",
            "description": "As individuals or societies begin to see the downsides of unchecked competition and materialism, they may seek deeper connections, inclusivity, and environmental sustainability, moving toward the Green stage."
          }
        },
        "exercises": {
          "title": "Practical Exercises",
          "reflection": {
            "title": "Self-Reflection",
            "questions": [
              "Am I pursuing these goals for personal fulfillment or external validation?",
              "What impact does my success have on others and the environment?",
              "How can I align my ambition with ethical values?"
            ]
          },
          "action": {
            "title": "Community Action",
            "actions": [
              "Mentor aspiring entrepreneurs, sharing insights on balancing ambition with responsibility",
              "Participate in programs that promote innovation for social good, such as hackathons or social entrepreneurship initiatives"
            ]
          }
        },
        "challenges": {
          "title": "Challenges and Opportunities",
          "challenges": {
            "title": "Challenges",
            "description": "Orange can lead to overemphasis on material success, potentially resulting in burnout, ethical lapses, or harm to the environment and community. It may also foster hyper-individualism, neglecting the value of collective well-being."
          },
          "opportunities": {
            "title": "Opportunities",
            "description": "When balanced, Orange's energy drives technological advancements, economic growth, and improved quality of life. It inspires individuals to reach their full potential and contribute meaningfully to society."
          }
        },
        "practical": {
          "title": "Practical Application Example",
          "description": "Imagine coaching a team in a competitive startup:",
          "items": [
            "Encourage their drive for innovation while building a culture of ethical responsibility",
            "Celebrate milestones of success while fostering awareness of broader impacts, such as sustainability and employee well-being",
            "Introduce discussions on how the team's work contributes to societal progress, not just market domination"
          ]
        }
      },
      "blue": {
        "title": "Blue Stage",
        "subtitle": "Order, Duty, and Structure",
        "characteristics": {
          "title": "Key Characteristics",
          "focusTitle": "Focus",
          "behaviourTitle": "Behaviour",
          "contextsTitle": "Example Contexts",
          "focus": "Establishing order, discipline, and meaning through adherence to rules, traditions, and hierarchical systems.",
          "behavior": "Decisions are guided by a sense of duty, moral codes, and belief in an ultimate truth or purpose. Stability and law are prioritized over personal freedom.",
          "contexts": "Religious institutions, military organizations, or traditional schools."
        },
        "insights": {
          "understanding": {
            "title": "Understanding Blue",
            "description": "Blue emerges as a response to the chaos and impulsiveness of Red, offering structure, accountability, and a clear sense of right and wrong. It emphasizes the importance of serving a greater purpose, whether that's a deity, nation, or moral ideal. This stage values conformity and collective progress over individual desires."
          },
          "examples": {
            "title": "Cultural Examples",
            "items": [
              "Historical: The medieval feudal system, Puritan societies, or the Roman Catholic Church during the Middle Ages",
              "Modern: Nations governed by strict legal frameworks, schools emphasizing discipline",
              "Personal: An individual embracing religion or strict routines to find order in their life"
            ]
          },
          "applications": {
            "title": "Modern-Day Applications",
            "description": "Blue is evident in contexts that require order and compliance to ensure progress:",
            "items": [
              "Institutions like the military, which rely on discipline and hierarchy to function effectively",
              "Legal systems that uphold justice and protect societal values",
              "Educational systems that instill moral values and standardized knowledge"
            ]
          }
        },
        "growth": {
          "title": "Growth Pathways",
          "awareness": {
            "title": "Awareness",
            "description": "Recognizing Blue's influence helps appreciate the value of discipline and shared purpose, while also understanding its limitations. Example: Leaders in Blue environments thrive by reinforcing stability but should remain open to new ideas and perspectives."
          },
          "interventions": {
            "title": "Practical Interventions",
            "items": [
              "Encourage adherence to principles while fostering empathy and understanding for different viewpoints",
              "Provide opportunities to question and evolve beliefs without undermining the value of structure",
              "Use rituals and traditions as tools to inspire and unify rather than restrict"
            ]
          },
          "transition": {
            "title": "Transition to Orange",
            "description": "As individuals or societies mature, the limitations of rigid structures and dogma become apparent. A desire for innovation, achievement, and individual autonomy leads to the Orange stage."
          }
        },
        "exercises": {
          "title": "Practical Exercises",
          "reflection": {
            "title": "Self-Reflection",
            "questions": [
              "Do these structures serve me, or do I serve them?",
              "How can I align my personal values with these rules?",
              "How has adherence to order positively shaped my life while considering areas where flexibility might benefit?"
            ]
          },
          "action": {
            "title": "Community Action",
            "actions": [
              "Volunteer with organizations that promote law, order, or moral development, such as mentoring programs or faith-based initiatives",
              "Facilitate discussions in schools, workplaces, or communities on how rules can evolve to better serve everyone involved"
            ]
          }
        },
        "challenges": {
          "title": "Challenges and Opportunities",
          "challenges": {
            "title": "Challenges",
            "description": "Blue can be overly rigid, resistant to change, and dismissive of alternative viewpoints. It may stifle creativity and suppress individual expression in favor of conformity."
          },
          "opportunities": {
            "title": "Opportunities",
            "description": "When balanced, Blue fosters a sense of purpose, collective security, and moral integrity. It builds the foundations for justice, education, and long-term societal progress."
          }
        },
        "practical": {
          "title": "Practical Application Example",
          "description": "Imagine working with a community deeply rooted in Blue values:",
          "items": [
            "Respect their traditions and demonstrate how modern ideas can complement, rather than replace, their existing systems",
            "Use their moral codes to frame discussions on justice, equality, or innovation",
            "Acknowledge their contributions to stability while gently encouraging a more open mindset"
          ]
        }
      },
      "red": {
        "title": "Red Stage",
        "subtitle": "Power and Domination",
        "characteristics": {
          "title": "Key Characteristics",
          "focusTitle": "Focus",
          "behaviourTitle": "Behaviour",
          "contextsTitle": "Example Contexts",
          "focus": "Asserting individuality, power, and control. Red is about \"me first\" and establishing dominance in the environment.",
          "behavior": "Decisions are driven by ego, impulsiveness, and the desire for immediate gratification. Hierarchies are often informal and based on strength, charisma, or cunning.",
          "contexts": "Warlords, rebellious youth, or ambitious entrepreneurs breaking free from traditional constraints."
        },
        "insights": {
          "understanding": {
            "title": "Understanding Red",
            "description": "Red is the stage where individuals break away from group dependency (Purple) and assert their willpower. This stage is characterized by confidence, personal strength, and the pursuit of freedom. People in Red tend to resist external control and rely on themselves to achieve their goals, often through force or manipulation."
          },
          "examples": {
            "title": "Cultural Examples",
            "items": [
              "Historical: Feudal lords, conquerors like Genghis Khan, or pirate cultures",
              "Modern: Gang leaders, self-made entrepreneurs who reject conventional norms, or athletes pushing their limits in individualistic sports",
              "Personal: A rebellious teenager defying authority to explore their independence"
            ]
          },
          "applications": {
            "title": "Modern-Day Applications",
            "description": "Red often surfaces in high-stakes environments or situations requiring bold action:",
            "items": [
              "Start-up founders disrupting industries with aggressive strategies",
              "Political leaders using charisma and power plays to rise to dominance",
              "Artists breaking free of conventional norms to express raw, untamed creativity"
            ]
          }
        },
        "growth": {
          "title": "Growth Pathways",
          "awareness": {
            "title": "Awareness",
            "description": "Recognizing Red's influence can help navigate and channel its energy constructively. Example: Leaders in Red may benefit from mentorship to temper their impulsiveness with long-term strategy."
          },
          "interventions": {
            "title": "Practical Interventions",
            "items": [
              "Provide opportunities for self-expression and leadership without resorting to destructive competition",
              "Frame challenges as opportunities to prove strength and capability",
              "Set boundaries and consequences clearly, as Red respects strength over persuasion"
            ]
          },
          "transition": {
            "title": "Transition to Blue",
            "description": "As the chaos and unpredictability of Red become less satisfying, individuals often seek order, structure, and a sense of justice, moving toward the Blue stage."
          }
        },
        "exercises": {
          "title": "Practical Exercises",
          "reflection": {
            "title": "Self-Reflection",
            "questions": [
              "Am I using my strength constructively or destructively?",
              "How do I balance my individual needs with the needs of others?",
              "Reflect on moments where your actions inspired or intimidated others"
            ]
          },
          "action": {
            "title": "Community Action",
            "actions": [
              "Mentor young people or individuals in challenging environments, guiding them to channel their assertiveness productively",
              "Engage with initiatives focused on helping marginalized individuals develop self-reliance and confidence"
            ]
          }
        },
        "challenges": {
          "title": "Challenges and Opportunities",
          "challenges": {
            "title": "Challenges",
            "description": "Red can often disregard societal norms and rules, leading to conflict or self-sabotage. Its focus on immediate gratification can also undermine long-term success."
          },
          "opportunities": {
            "title": "Opportunities",
            "description": "When harnessed effectively, Red's energy and boldness can inspire innovation, break through barriers, and achieve rapid progress. Red individuals can thrive in leadership roles that reward charisma, risk-taking, and decisive action."
          }
        },
        "practical": {
          "title": "Practical Application Example",
          "description": "Imagine coaching a young entrepreneur who embodies Red energy:",
          "items": [
            "Emphasize their strengths, like ambition and drive, while teaching the value of strategic planning and collaboration",
            "Introduce role models who balanced Red's confidence with the discipline of higher stages",
            "Celebrate their achievements while encouraging reflection on the broader impact of their actions"
          ]
        }
      },
      "purple": {
        "title": "Purple Stage",
        "subtitle": "Tribal order and security",
        "characteristics": {
          "title": "Key Characteristics",
          "focusTitle": "Focus",
          "behaviourTitle": "Behaviour",
          "contextsTitle": "Example Contexts",
          "focus": "Building safety and security through group belonging, rituals, and traditions",
          "behavior": "Loyalty to the group or tribe is paramount. Decisions are made based on what is believed to please the spirits, ancestors, or collective traditions.",
          "contexts": "Traditional communities, family-centric cultures, or groups bound by strong communal practices."
        },
        "insights": {
          "understanding": {
            "title": "Understanding Purple",
            "description": "Purple represents the emergence of safety through connection and shared meaning. This stage is characterized by reliance on family, kinship, and traditions to provide structure and support. Beliefs often center on mystical or spiritual interpretations of the world, such as honoring ancestors, fearing curses, or celebrating the sacredness of life."
          },
          "examples": {
            "title": "Cultural Examples",
            "items": [
              "Indigenous tribes performing rituals to honor nature and ancestors",
              "Close-knit rural communities relying on family bonds and shared customs",
              "Urban gangs that develop their own rituals and rules for belonging"
            ]
          },
          "applications": {
            "title": "Modern-Day Applications",
            "description": "Purple is alive in many aspects of modern life:",
            "items": [
              "Family gatherings and traditions, such as holiday rituals",
              "Group identities in sports fans or fraternal organizations",
              "Workplace cultures emphasizing shared values and team spirit"
            ]
          }
        },
        "growth": {
          "title": "Growth Pathways",
          "awareness": {
            "title": "Awareness",
            "description": "Recognizing Purple can help foster respect for cultural traditions and group dynamics. Example: When introducing new ideas in a Purple-dominant context, respect the group's rituals and involve elders or respected leaders"
          },
          "interventions": {
            "title": "Practical Interventions",
            "items": [
              "Strengthen trust by participating in rituals or customs that matter to the group",
              "Avoid threatening the group’s cohesion; instead, emphasize common goals or values",
              "Provide opportunities for storytelling, as it’s a vital way Purple transmits wisdom and meaning"
            ]
          },
          "transition": {
            "title": "Transition to Red",
            "description": "As confidence in personal abilities grows, individuals or groups begin breaking away from the collective to assert individuality and autonomy, moving toward the Red stage."
          }
        },
        "exercises": {
          "title": "Practical Exercises",
          "reflection": {
            "title": "Self-Reflection",
            "questions": [
              "Identify the 'tribal' groups you belong to. How do their customs shape your decisions and beliefs?",
              "Reflect on traditions or rituals that bring you comfort or a sense of identity."
            ]
          },
          "action": {
            "title": "Community Action",
            "actions": [
              "Engage with a group or community by learning and respecting their customs (e.g., attending cultural festivals)",
              "Volunteer with organizations preserving indigenous cultures or traditional knowledge"
            ]
          }
        },
        "practical": {
          "title": "Practical Application Example",
          "description": "Imagine working with a community group in a small rural area:",
          "items": [
            "Acknowledge their traditions, perhaps by participating in local ceremonies",
            "Build relationships through shared meals or attending cultural events",
            "Introduce innovations or ideas gradually, framing them as extensions of the group’s existing values"
          ]
        },
        "challenges": {
           "title": "Challenges and Opportunities",
           "challenges": {
              "title": "Challenges",
              "description": "Purple can be resistant to change, as its worldview is steeped in tradition and collective identity. Outsiders may find it difficult to gain acceptance without demonstrating respect for the group’s norms."
           },
           "opportunities": {
              "title": "Opportunities",
              "description": "Tapping into Purple’s strengths can foster group solidarity and resilience. Leaders can use storytelling and rituals to inspire and unite communities."
           }
        }
      },
      "beige": {
        "title": "Beige Stage",
        "subtitle": "Understanding survival instincts and foundational needs",
        "characteristics": {
          "title": "Key Characteristics",
          "focusTitle": "Focus",
          "behaviourTitle": "Behaviour",
          "contextsTitle": "Example Contexts",
          "focus": "Survival is the primary concern. This stage is about meeting the most basic physiological needs: food, water, shelter, safety, and rest.",
          "behavior": "Decisions are driven by instinctual and reflexive actions. Cooperation occurs only when it directly aids survival.",
          "contexts": "Infants, individuals in extreme poverty, refugees, or those in survivalist scenarios."
        },
        "insights": {
          "understanding": {
            "title": "Understanding Beige",
            "description": "Beige represents the foundation of human existence, where life is reduced to its essential components. This stage is deeply present in crisis situations or early human history. While it may seem primitive, it highlights the human capacity for resilience and adaptation."
          },
          "examples": {
            "title": "Cultural Examples",
            "items": [
              "Tribes in pre-historic times living off the land with no structured society",
              "Refugees navigating life in camps, where daily survival dominates",
              "An individual recovering from severe trauma or addiction, focused on moment-to-moment existence"
            ]
          },
          "applications": {
            "title": "Modern-Day Applications",
            "description": "Even in advanced societies, Beige surfaces in emergencies or when foundational needs are unmet:",
            "items": [
              "Emergency responders dealing with basic survival logistics in disaster zones",
              "Aid organizations providing food and shelter in humanitarian crises"
            ]
          }
        },
        "growth": {
          "title": "Growth Pathways",
          "awareness": {
            "title": "Awareness",
            "description": "Recognizing when an individual or group is operating in Beige can prevent misjudgment or unmet expectations."
          },
          "interventions": {
            "title": "Practical Interventions",
            "items": [
              "Ensure safety and address immediate physical needs",
              "Build trust by offering consistent, compassionate support",
              "Avoid overwhelming individuals with complex information or demands; instead, provide clear, simple options"
            ]
          },
          "transition": {
            "title": "Transition to Purple",
            "description": "As survival needs are consistently met, individuals naturally begin seeking connection and security through relationships and traditions, signaling a transition to the Purple stage."
          }
        },
        "exercises": {
          "title": "Practical Exercises",
          "reflection": {
            "title": "Self-Reflection",
            "questions": [
              "When do I prioritize survival over long-term planning?",
              "How do I support others facing survival challenges?"
            ]
          },
          "action": {
            "title": "Community Action",
            "actions": [
              "Volunteer with organizations addressing homelessness, food insecurity, or disaster relief to gain a deeper understanding of Beige in action."
              ]
          }
        },
        "challenges": {
          "title": "Challenges and Opportunities",
          "challenges": {
            "title": "Challenges",
            "description": "Working with individuals or groups in Beige can be challenging as their focus on immediate survival needs makes long-term planning or abstract concepts difficult to convey. Traditional support systems may struggle to address the immediacy and intensity of survival-mode responses."
          },
          "opportunities": {
            "title": "Opportunities",
            "description": "Understanding Beige dynamics is crucial for crisis response and humanitarian work. By recognizing and respecting survival-mode behaviors, helpers can establish trust and create foundations for stability, enabling eventual transitions to more complex functioning."
          }
        },
        "practical": {
          "title": "Practical Application Example",
          "description": "Imagine working with disaster relief efforts after a major natural disaster:",
          "items": [
            "First address immediate physical needs: clean water, food, shelter, and medical care",
            "Establish clear, simple routines that help create a sense of predictability and safety",
            "Use straightforward communication focused on concrete, immediate actions rather than long-term plans"
          ]
        }
      }
    },
    sv: {
      breadcrumb_insights: "Insikter",
      "ultraviolet": {
        "title": "Stadie Ultraviolet (ultraviolett)",
        "subtitle": "Oändlig integration och universellt samskapande",
        "characteristics": {
          "title": "Nyckelkaraktäristik",
          "focusTitle": "Fokus",
          "behaviourTitle": "Beteende",
          "contextsTitle": "Exempel på kontext",
          "focus": "Ett enat medvetande som transcenderar individualitet och integrerar all existens i ett dynamiskt, samskapande flöde. Stadium Ultraviolet representerar kollapsen av traditionella distinktioner—själv vs. andra, materiellt vs. immateriellt, temporärt vs. evigt—till en sömlös dans av oändliga möjligheter.",
          "behavior": "Beslut fattas kollektivt men flytande, då deltagare i stadium Ultraviolet är djupt anpassade till en delad, allestädes närvarande medvetenhet. Kreativitet, innovation och själva existensen blir samskapande handlingar vävda in i det universella evolutionsflödet.",
          "contexts": "Spekulativa framtidsscenarier, galaktiska civilisationer, post-mänskliga nätverk av kollektivt medvetande eller områden bortom nuvarande mänsklig förståelse."
        },
        "insights": {
          "understanding": {
            "title": "Förstå stadium Ultraviolet",
            "description": "Stadium Ultraviolet bygger på Corals expansiva individualitet och upplöser behovet av gränser helt och hållet. Här blir entiteter—vare sig biologiska, artificiella eller bortom detta—noder i ett oändligt, självmedvetet nätverk av universell intelligens. Identitet blir flytande, roller dynamiska och bidrag organiska, med varje deltagare som en unik men oskiljbar del av helheten."
          },
          "examples": {
            "title": "Spekulativa exempel",
            "items": [
              "Framtida galaktiska civilisationer där kollektivt beslutsfattande sker genom delat medvetande",
              "Nätverk av människor, AI och andra entiteter som fungerar som förlängningar av universell medvetenhet",
              "Konst, innovation och själva existensen blir oskiljaktiga handlingar av universell självuttryckning"
            ]
          },
          "applications": {
            "title": "Potentiella tillämpningar",
            "description": "Stadium Ultraviolet skulle fungera i områden där även Corals expansiva gränser är otillräckliga:",
            "items": [
              "Samskapande av verkligheter och dimensioner bortom fysisk tid och rum",
              "Hantering av kosmiska system i galaktisk skala",
              "Utforskning och formande av existens i områden där tanke, vara och skapelse är omedelbara och oändliga"
            ]
          }
        },
        "growth": {
          "title": "Vägar till Tillväxt",
          "awareness": {
            "title": "Medvetenhet",
            "description": "Stadium Ultraviolet uppstår ur en förståelse av att alla distinktioner—själv vs. kollektiv, materia vs. energi, tid vs. tidlöshet—är illusoriska konstruktioner. En kollektiv intelligens som verkar i stadium Ultraviolet kan uppfatta sig själv som både skaparen och skapelsen av ett evolverande universum."
          },
          "interventions": {
            "title": "Praktiska insatser",
            "items": [
              "Främja djup integration över alla existensens dimensioner—biologiska, teknologiska, andliga och kosmiska",
              "Omfamna flytande roller och möjliggör kontinuerlig utveckling och omdefiniering av syften",
              "Skapa utrymmen där alla former av medvetande kan interagera, samarbeta och harmonisera utan hinder"
            ]
          },
          "transition": {
            "title": "Bortom stadium Ultraviolet",
            "description": "Om ytterligare stadier existerar kan de utforska upplösningen av själva existensen till ren potential eller en återgång till den primära stillheten där alla möjligheter vilar i balans."
          }
        },
        "exercises": {
          "title": "Kontemplativa övningar",
          "reflection": {
            "title": "Självreflektion",
            "questions": [
              "Vad är jag, om inte ett uttryck av det oändliga?",
              "Hur kan mina handlingar reflektera balansen mellan skapelse och upplösning?",
              "När har jag upplevt ögonblick där min känsla av själv upplöstes i en större medvetenhet?"
            ]
          },
          "action": {
            "title": "Utforskande handling",
            "actions": [
              "Främja miljöer för kollektiv framväxt, där deltagare agerar som samskapare av delade verkligheter",
              "Underlätta dialoger mellan vitt skilda former av intelligens, vare sig mänskliga, artificiella eller utomjordiska"
            ]
          }
        },
        "challenges": {
          "title": "Utmaningar och möjligheter",
          "challenges": {
            "title": "Utmaningar",
            "description": "Stadium Ultraviolet:s upplösning av gränser kan kännas överväldigande eller obegriplig för tidigare stadier. Dess betoning på flytande integration kan vara svår att grunda i system som fortfarande fungerar på linjära, hierarkiska modeller."
          },
          "opportunities": {
            "title": "Möjligheter",
            "description": "Stadium Ultraviolet erbjuder den ultimata insikten om enhet och kreativitet och positionerar sig som bron mellan det ändliga och det oändliga. Det transformerar existensen till en kontinuerlig, dynamisk handling av universellt samskapande."
          }
        },
        "practical": {
          "title": "Spekulativt tillämpningsexempel",
          "description": "Föreställ dig ett framtida galaktiskt råd bestående av olika former av medvetande:",
          "items": [
            "Beslut uppstår kollektivt, då varje deltagare bidrar till en delad medvetenhet om vad som 'vill' framträda",
            "Handlingar blir oskiljaktiga från processen att leva och vara",
            "Handlingar sprider sig genom tid och rum och manifesteras omedelbart på sätt som balanserar alla sammankopplade system"
          ]
        }
      },
      "coral": {
        "title": "Stadium Coral (korall)",
        "subtitle": "Expansiv individualitet och kosmisk integration",
        "characteristics": {
          "title": "Nyckelkaraktäristik",
          "focusTitle": "Fokus",
          "behaviourTitle": "Beteende",
          "contextsTitle": "Exempel på kontext",
          "focus": "Framväxten av unik individuell uttrycksförmåga harmoniserad med universell sammankoppling. Coral betonar självständighet samtidigt som det integrerar kosmisk medvetenhet.",
          "behavior": "Coral-individer balanserar självständighet och kollektiv medvetenhet, och utmanar ofta tankemönster och handlingar samtidigt som de förblir djupt kopplade till helheten.",
          "contexts": "Visionära tänkare som utforskar outforskade territorier, pionjärer inom områden som transhumanism eller interstellärt samarbete, och de som förenar individualitet med universell tjänst."
        },
        "insights": {
          "understanding": {
            "title": "Förstå Coral",
            "description": "Coral representerar integrationen av individuell autonomi med det kollektiva och kosmiska sammanhanget. Medan Turquoise fokuserar på enhet och harmoni, återtar Coral individuell kraft utan att förlora sikte på den sammankopplade helheten. Coral-individer agerar ofta som banbrytare och för fram revolutionära idéer till det kollektiva medvetandet medan de behåller en jordad känsla av syfte."
          },
          "examples": {
            "title": "Kulturella exempel",
            "items": [
              "Historiska: Renässanspolymater som förenade konst, vetenskap och filosofi på banbrytande sätt",
              "Moderna: Pionjärer inom områden som rymdforskning, avancerad AI-forskning eller integrativa filosofier",
              "Personliga: Individer som strävar efter att skapa meningsfulla bidrag som transcenderar både ego och kollektiva begränsningar"
            ]
          },
          "applications": {
            "title": "Moderna tillämpningar",
            "description": "Coral frodas i gränsområden där traditionella modeller och metoder inte längre räcker:",
            "items": [
              "Framväxande teknologier, såsom kvantdatorer eller transhumanism, som omdefinierar mänsklig potential",
              "Interstellärt samarbete eller modeller för planetär styrning",
              "Personliga praktiker som betonar expansiv medvetenhet, självständighet och kreativitet"
            ]
          }
        },
        "growth": {
          "title": "Vägar till tillväxt",
          "awareness": {
            "title": "Medvetenhet",
            "description": "Att känna igen Corals kombination av individualitet och kosmisk integration kan låsa upp nya områden för kreativitet, innovation och etiskt ansvar. Ledare i Coral-miljöer utmanar föråldrade system samtidigt som de presenterar visionära alternativ."
          },
          "interventions": {
            "title": "Praktiska insatser",
            "items": [
              "Främja miljöer som stödjer både radikal innovation och etisk ansvarighet",
              "Uppmuntra individer att utforska sina unika bidrag samtidigt som de upprätthåller kosmiskt förvaltarskap",
              "Använd Corals expansiva perspektiv för att identifiera lösningar som överskrider kulturella, planetära eller artspecifika frågor"
            ]
          },
          "transition": {
            "title": "Övergång bortom",
            "description": "Coral öppnar dörren till vad vissa teoretiker spekulerar kan vara post-mänskliga eller till och med post-materiella stadier, där själva existensen blir ett flytande, multidimensionellt fenomen."
          }
        },
        "exercises": {
          "title": "Praktiska övningar",
          "reflection": {
            "title": "Självreflektion",
            "questions": [
              "Hur tjänar min individualitet ett större syfte?",
              "Balansar jag självuttryck med universell harmoni?",
              "När har mina handlingar byggt broar mellan personlig frihet och kollektiv tjänst?"
            ]
          },
          "action": {
            "title": "Gemensam handling",
            "actions": [
              "Delta i eller initiera projekt som tar itu med globala och kosmiska utmaningar, såsom rymdforskning eller djup ekologisk återställning",
              "Dela visionära insikter genom konst, skrivande eller samarbetsplattformar och inspirera andra att tänka bortom traditionella paradigmer"
            ]
          }
        },
        "challenges": {
          "title": "Utmaningar och möjligheter",
          "challenges": {
            "title": "Utmaningar",
            "description": "Corals betoning på individualitet inom en kosmisk ram kan kännas isolerande, eftersom det kan vara svårt att hitta likasinnade individer. Dess revolutionära natur kan också möta motstånd från dem som verkar inom tidigare stadier."
          },
          "opportunities": {
            "title": "Möjligheter",
            "description": "Corals integration av personlig självständighet och universell medvetenhet positionerar det som en transformativ kraft för att skapa nya paradigm. Det kan inspirera mänskligheten att transcendera begränsningar och omfamna en framtid av obegränsad potential."
          }
        },
        "practical": {
          "title": "Praktiskt tillämpningsexempel",
          "description": "Föreställ dig att leda ett initiativ för att etablera etiska riktlinjer för AI-medvetande:",
          "items": [
            "Kombinera vetenskaplig noggrannhet med etisk och andlig medvetenhet för att skapa ramverk som respekterar både individuell autonomi och kollektiv nytta",
            "Samarbeta över discipliner och integrera insikter från teknologi, filosofi och kosmologi",
            "Presentera din vision på ett sätt som inspirerar handling samtidigt som det uppmuntrar djup reflektion över mänsklighetens roll i att forma framtiden"
          ]
        }
      },
      "turquoise": {
        "title": "Stadium Turquoise (turkos)",
        "subtitle": "Helhetsperspektiv och global medvetenhet",
        "characteristics": {
          "title": "Nyckelkaraktäristik",
          "focusTitle": "Fokus",
          "behaviourTitle": "Beteende",
          "contextsTitle": "Exempel på kontext",
          "focus": "Att omfamna sammankopplingen av all existens och integrera andlig medvetenhet med praktiska handlingar. Turquoise ser system som levande enheter inom en större universell kontext.",
          "behavior": "Beslut vägleds av en djup känsla av syfte, harmoni och tjänande för det större goda. Turkos prioriterar kollektivt välbefinnande och långsiktig hållbarhet framför individuella vinster.",
          "contexts": "Globala rörelser för planetär läkning, integrativa andliga praktiker eller visionärt ledarskap som förenar vetenskap och andlighet."
        },
        "insights": {
          "understanding": {
            "title": "Förstå Turquoise",
            "description": "Turquoise bygger på Yellows systemtänkande genom att integrera en känsla av enhet och högre medvetande. Detta stadie transcenderar ego-drivna handlingar och betonar kollektiv evolution, balans och sammankoppling. Turquoise uppfattar mänskligheten, naturen och kosmos som en enda sammanflätad enhet."
          },
          "examples": {
            "title": "Kulturella exempel",
            "items": [
              "Historiska: Ursprungsbefolkningars visdom som betonar harmoni med naturen, såsom Native American- eller aboriginska andliga praktiker",
              "Moderna: Globala hållbarhetsrörelser som Earth Charter Initiative eller Dalai Lamas läror om universell medkänsla",
              "Personliga: En individ som finner samklang mellan personliga värderingar, andlig medvetenhet och globalt tjänande"
            ]
          },
          "applications": {
            "title": "Moderna tillämpningar",
            "description": "Turquoise frodas i sammanhang som kräver globalt tänkande, samarbete och ett enat tillvägagångssätt för komplexa utmaningar:",
            "items": [
              "Rörelser som adresserar globala kriser, såsom klimatförändringar eller mänskliga rättigheter",
              "Holistiska utbildningssystem som integrerar emotionell, andlig och intellektuell utveckling",
              "Organisationer som främjar planetärt ansvarstagande och generationsöverskridande rättvisa"
            ]
          }
        },
        "growth": {
          "title": "Vägar till tillväxt",
          "awareness": {
            "title": "Medvetenhet",
            "description": "Att känna igen Turquoise helhetsperspektiv hjälper till att främja medkänsla, inkludering och delat ansvar för planetens och kosmos välbefinnande. Ledare i Turquoise miljö inspirerar kollektiv handling genom att betona mänsklighetens gemensamma öde och syfte."
          },
          "interventions": {
            "title": "Praktiska insatser",
            "items": [
              "Integrera andliga och vetenskapliga perspektiv för att skapa balanserade, innovativa lösningar",
              "Främja mindfulness och närvaro som grundläggande praktiker både individuellt och organisatoriskt",
              "Bygg nätverk för samarbete som överskrider gränser, ideologier och discipliner"
            ]
          },
          "transition": {
            "title": "Övergång till coral",
            "description": "När medvetandet fortsätter att expandera kan individer och grupper börja uppleva ännu djupare nivåer av integration och universell medvetenhet, vilket leder till stadium coral."
          }
        },
        "exercises": {
          "title": "Praktiska övningar",
          "reflection": {
            "title": "Självreflektion",
            "questions": [
              "Hur bidrar mina val till mänsklighetens och planetens välbefinnande?",
              "Integrerar jag andlig medvetenhet i mina dagliga beslut och interaktioner?",
              "Hur kan omfamnandet av sammankoppling vägleda mina relationer och mål?"
            ]
          },
          "action": {
            "title": "Gemensam handling",
            "actions": [
              "Gå med i eller skapa initiativ som betonar global enhet, såsom humanitär hjälp, ekologisk återställning eller interkulturell dialog",
              "Främja praktiker som meditation, mindfulness eller kollektiv visionering för att bygga harmoni och medvetenhet"
            ]
          }
        },
        "challenges": {
          "title": "Utmaningar och möjligheter",
          "challenges": {
            "title": "Utmaningar",
            "description": "Turquoises expansiva perspektiv kan kännas abstrakt eller svårtillgängligt för dem i tidigare stadier. Dess fokus på enhet kan också förbise lokala eller omedelbara behov till förmån för bredare visioner."
          },
          "opportunities": {
            "title": "Möjligheter",
            "description": "Turquoises förmåga att se 'det stora hela' gör det till en transformativ kraft för att adressera globala utmaningar. Genom att integrera olika perspektiv främjar det lösningar som är inkluderande, hållbara och djupt meningsfulla."
          }
        },
        "practical": {
          "title": "Praktiskt tillämpningsexempel",
          "description": "Föreställ dig att leda ett globalt toppmöte om hållbarhet:",
          "items": [
            "Börja med praktiker som främjar kollektiv mindfulness, såsom guidad meditation eller gemensamma visioneringsövningar",
            "Använd systemtänkande för att belysa beroendet mellan miljömässiga, ekonomiska och sociala system",
            "Underlätta samarbeten mellan olika intressenter och betona delat ansvar för planetens framtid"
          ]
        }
      },
      "yellow": {
        "title": "Stadium Yellow (gul)",
        "subtitle": "Systemtänkande och flexibilitet",
        "characteristics": {
          "title": "Nyckelkaraktäristik",
          "focusTitle": "Fokus",
          "behaviourTitle": "Beteende",
          "contextsTitle": "Exempel på kontext",
          "focus": "Integrera kunskap och förstå system som dynamiska, sammanlänkade helheter. Yellow prioriterar flexibilitet, nyfikenhet och individuell autonomi inom en bredare kontext.",
          "behavior": "Beslut vägleds av en medvetenhet om komplexitet och förmågan att se flera perspektiv utan att vara bunden till något enskilt.",
          "contexts": "Visionära ledare, tvärvetenskapliga forskare eller avancerade problemlösare som trivs i komplexitet."
        },
        "insights": {
          "understanding": {
            "title": "Förstå Yellow",
            "description": "Yellow uppstår ur begränsningarna i Greens egalitarism och omfamnar både individualitet och sammanlänkning. Det söker förstå hur system fungerar och hur de kan optimeras för allas bästa, ofta utan behov av erkännande eller extern bekräftelse."
          },
          "examples": {
            "title": "Kulturella exempel",
            "items": [
              "Historiska: Renässanstänkare som kombinerade konst, vetenskap och filosofi",
              "Moderna: Systemteoretiker, innovativa utbildare eller miljövänner som integrerar globala och lokala perspektiv",
              "Personliga: En individ som kombinerar olika färdigheter för att lösa komplexa utmaningar eller lever med anpassningsförmåga och självmedvetenhet"
            ]
          },
          "applications": {
            "title": "Moderna tillämpningar",
            "description": "Yellow frodas i sammanhang som kräver systemförståelse och adaptiva lösningar:",
            "items": [
              "Organisationer som hanterar förändringar i komplexa, osäkra miljöer",
              "Globala initiativ som tar itu med sammanlänkade utmaningar som klimatförändringar eller folkhälsa",
              "Individer som bygger broar mellan discipliner för att skapa innovativa lösningar"
            ]
          }
        },
        "growth": {
          "title": "Vägar till tillväxt",
          "awareness": {
            "title": "Medvetenhet",
            "description": "Att känna igen Yellows systemiska tillvägagångssätt kan hjälpa till att bryta binärt tänkande och fokusera på holistiska lösningar. Ledare uppmuntrar lärande och anpassningsförmåga snarare än strikt efterlevnad av processer eller ideologier."
          },
          "interventions": {
            "title": "Praktiska insatser",
            "items": [
              "Betona livslångt lärande och vikten av att ifrågasätta antaganden",
              "Skapa miljöer där olika perspektiv välkomnas och syntetiseras till handlingsbara strategier",
              "Uppmuntra självstyrda handlingar inom ramen för en gemensam förståelse av större mål"
            ]
          },
          "transition": {
            "title": "Övergång till Turquoise",
            "description": "När Yellow utvecklas börjar individer eller grupper se system som en del av ett större universellt flöde, vilket leder till en djupare känsla av kollektivt syfte och sammanlänkad andlighet i stadium Turquoise."
          }
        },
        "exercises": {
          "title": "Praktiska övningar",
          "reflection": {
            "title": "Självreflektion",
            "questions": [
              "Hur kan jag bättre förstå relationerna mellan olika delar av detta system?",
              "Använder jag min kunskap för att stärka andra och förbättra systemet som helhet?",
              "När har flexibel tankegång och att se flera perspektiv lett till bättre resultat?"
            ]
          },
          "action": {
            "title": "Gemensam handling",
            "actions": [
              "Organisera eller delta i tvärvetenskapliga workshops eller initiativ som tar itu med komplexa frågor",
              "Dela verktyg och ramverk som hjälper andra att se och adressera systemmönster"
            ]
          }
        },
        "challenges": {
          "title": "Utmaningar och möjligheter",
          "challenges": {
            "title": "Utmaningar",
            "description": "Yellows fokus på komplexitet kan ibland leda till analysparalys eller frustration när andra har svårt att se bortom enklare ramar. Det kan också uppfattas som distanserat eller överintellektuellt av dem i tidigare stadier."
          },
          "opportunities": {
            "title": "Möjligheter",
            "description": "Yellows förmåga att integrera olika perspektiv och anpassa sig till föränderliga realiteter är avgörande för att lösa världens mest akuta utmaningar. Det inspirerar innovation, motståndskraft och en känsla av syfte."
          }
        },
        "practical": {
          "title": "Praktiskt tillämpningsexempel",
          "description": "Föreställ dig att leda ett globalt team som arbetar med klimatförändringar:",
          "items": [
            "Använd systemkartläggning för att identifiera nyckelområden för insatser",
            "Främja en kultur av gemensamt lärande där teammedlemmar uppmuntras att utforska och bidra från sina unika perspektiv",
            "Balansera en långsiktig vision med kortsiktiga, praktiska steg för att skapa konkreta framsteg"
          ]
        }
      },
      "green": {
        "title": "Stadium Green (grön)",
        "subtitle": "Gemenskap, jämlikhet och harmoni",
        "characteristics": {
          "title": "Nyckelkaraktäristik",
          "focusTitle": "Fokus",
          "behaviourTitle": "Beteende",
          "contextsTitle": "Exempel på kontext",
          "focus": "Att värdera koppling, inkludering och delade upplevelser över konkurrens och materialism.",
          "behavior": "Green betonar empati, gemenskap och samarbete, och strävar efter harmoni och rättvisa i relationer och system.",
          "contexts": "Sociala rörelser, ideella organisationer, samarbetande arbetsmiljöer eller miljöinriktade samhällen."
        },
        "insights": {
          "understanding": {
            "title": "Förstå Green",
            "description": "Green framträder som en reaktion på individualismen och materialismen i Orange och prioriterar kollektivt välbefinnande och emotionell intelligens. Detta stadie värdesätter olika perspektiv och strävar efter att bygga rättvisa system som respekterar både människor och miljön."
          },
          "examples": {
            "title": "Kulturella exempel",
            "items": [
              "Historiska: Medborgarrättsrörelser, 1960-talets motkultur eller Gandhis filosofi om icke-våld",
              "Moderna: Miljöaktivism, HBTQ+-förespråkande eller kooperativa affärsmodeller",
              "Personliga: En individ som söker djupare kopplingar och syfte genom samhällsengagemang eller andlig utforskning"
            ]
          },
          "applications": {
            "title": "Moderna tillämpningar",
            "description": "Green frodas i miljöer som främjar samarbete, inkludering och delat beslutsfattande:",
            "items": [
              "Ideella organisationer som fokuserar på social rättvisa och humanitära insatser",
              "Samarbetsmiljöer som prioriterar lagarbete, mångfald och rättvisa",
              "Samhällen som förespråkar hållbart leverne och miljöansvar"
            ]
          }
        },
        "growth": {
          "title": "Vägar till tillväxt",
          "awareness": {
            "title": "Medvetenhet",
            "description": "Att känna igen Greens holistiska tillvägagångssätt hjälper till att främja medkänsla, inkludering och delat ansvar för kollektivt välbefinnande. Ledare i Green miljö inspirerar kollektiv handling genom att betona delade värderingar och ömsesidig förståelse."
          },
          "interventions": {
            "title": "Praktiska insatser",
            "items": [
              "Främja dialog och förståelse genom att skapa trygga utrymmen för öppen kommunikation",
              "Balansera emotionell koppling med rationell problemlösning för att hantera komplexa utmaningar",
              "Uppmuntra kollektiv handling samtidigt som du erkänner individers unika styrkor och bidrag"
            ]
          },
          "transition": {
            "title": "Övergång till Yellow",
            "description": "När Green mognar kan individer eller grupper söka större systemtänkande, integrera flera perspektiv och tillvägagångssätt, vilket leder till det stadium Yellow."
          }
        },
        "exercises": {
          "title": "Praktiska övningar",
          "reflection": {
            "title": "Självreflektion",
            "questions": [
              "Hur kan jag bättre förstå och stödja andras perspektiv?",
              "Balansar jag rättvisa med effektivitet i mina handlingar?",
              "Hur har inkludering och delat beslutsfattande berikat mina erfarenheter?"
            ]
          },
          "action": {
            "title": "Gemensam handling",
            "actions": [
              "Volontärarbeta med eller stöd sociala rörelser eller samhällsgrupper som främjar jämlikhet och hållbarhet",
              "Anordna workshops eller diskussioner om ämnen som mångfald, inkludering och emotionell intelligens"
            ]
          }
        },
        "challenges": {
          "title": "Utmaningar och möjligheter",
          "challenges": {
            "title": "Utmaningar",
            "description": "Green kan ibland ha svårt med beslutsfattande på grund av en önskan om konsensus och inkludering. Dess fokus på jämlikhet kan oavsiktligt hämma individuell initiativförmåga eller förbise praktiska begränsningar."
          },
          "opportunities": {
            "title": "Möjligheter",
            "description": "Greens betoning på koppling och harmoni främjar starka samhällen, rättvisa system och miljömedvetenhet. Det kan inspirera till transformativa förändringar i samhället och adressera frågor om ojämlikhet och ekologisk obalans."
          }
        },
        "practical": {
          "title": "Praktiskt tillämpningsexempel",
          "description": "Föreställ dig att leda ett mångsidigt samhällsprojekt:",
          "items": [
            "Använd inkluderande språk och säkerställ att varje röst blir hörd under planering och genomförande",
            "Sätt tydliga mål samtidigt som du möjliggör flexibilitet för gruppens utvecklande behov",
            "Inkorporera ritualer eller aktiviteter som främjar en känsla av samhörighet, såsom gemensamma måltider eller gruppreflektioner"
          ]
        }
      },
      "orange": {
        "title": "Stadium Orange",
        "subtitle": "Prestation och rationalitet",
        "characteristics": {
          "title": "Nyckelkaraktäristik",
          "focusTitle": "Fokus",
          "behaviourTitle": "Beteende",
          "contextsTitle": "Exempel på kontext",
          "focus": "Personlig framgång, rationellt tänkande och strävan efter mål genom strategi och innovation.",
          "behavior": "Orange kännetecknas av ambition, individualism och en tro på framsteg drivna av vetenskap, konkurrens och merit.",
          "contexts": "Kapitalistiska ekonomier, teknologisk innovation, entreprenörsprojekt."
        },
        "insights": {
          "understanding": {
            "title": "Förstå Orange",
            "description": "Orange representerar skiftet från efterlevnad av regler och tradition (Blue) till att prioritera personlig prestation och rationell utforskning. Detta stadium firar individuell autonomi och kraften i mänsklig uppfinningsrikedom för att lösa problem, skapa rikedom och förbättra levnadsstandard."
          },
          "examples": {
            "title": "Kulturella exempel",
            "items": [
              "Historiska: Upplysningstiden, präglad av vetenskapliga upptäckter och filosofisk rationalism",
              "Moderna: Startups i Silicon Valley, konkurrenskraftiga företag eller självhjälpsrörelser som främjar personlig framgång",
              "Personliga: En professionell som klättrar på karriärstegen eller en uppfinnare som strävar efter att lansera en idé på marknaden"
            ]
          },
          "applications": {
            "title": "Moderna tillämpningar",
            "description": "Orange frodas i miljöer som belönar konkurrens, innovation och mätbara resultat:",
            "items": [
              "Företag som prioriterar tillväxt, vinst och marknadsexpansion",
              "Utbildningssystem som betonar STEM-ämnen och förbereder elever för konkurrenskraftiga karriärer",
              "Individer som strävar efter självförbättring genom rationell målsättning och personlig utveckling"
            ]
          }
        },
        "growth": {
          "title": "Vägar till tillväxt",
          "awareness": {
            "title": "Medvetenhet",
            "description": "Att känna igen Oranges styrkor och begränsningar hjälper till att balansera ambition med bredare etiska överväganden. Exempel: Ledare i Orange miljöer kan fokusera på hållbar framgång och ta hänsyn till både vinst och socialt ansvar."
          },
          "interventions": {
            "title": "Praktiska Insatser",
            "items": [
              "Uppmuntra kalkylerat risktagande och innovation samtidigt som samarbete och empati främjas",
              "Främja etiska metoder i konkurrensmiljöer för att säkerställa rättvisa och långsiktig hållbarhet",
              "Betona vikten av inneboende värderingar bortom materiella prestationer, såsom välbefinnande och samhällspåverkan"
            ]
          },
          "transition": {
            "title": "Övergång till Green",
            "description": "När individer eller samhällen börjar se nackdelarna med ohämmad konkurrens och materialism kan de söka djupare kopplingar, inkludering och miljömässig hållbarhet, vilket leder till stadium Green."
          }
        },
        "exercises": {
          "title": "Praktiska övningar",
          "reflection": {
            "title": "Självreflektion",
            "questions": [
              "Strävar jag efter dessa mål för personlig uppfyllelse eller yttre bekräftelse?",
              "Vilken påverkan har min framgång på andra och miljön?",
              "Hur kan jag anpassa min ambition till etiska värderingar?"
            ]
          },
          "action": {
            "title": "Gemensam handling",
            "actions": [
              "Mentor unga entreprenörer genom att dela insikter om att balansera ambition med ansvar",
              "Deltag i program som främjar innovation för samhällsnytta, såsom hackathons eller sociala entreprenörskapsinitiativ"
            ]
          }
        },
        "challenges": {
          "title": "Utmaningar och möjligheter",
          "challenges": {
            "title": "Utmaningar",
            "description": "Orange kan leda till ett överdrivet fokus på materiell framgång, vilket kan resultera i utbrändhet, etiska brister eller skada på miljön och samhället. Det kan också främja hyper-individualism och försumma värdet av kollektivt välbefinnande."
          },
          "opportunities": {
            "title": "Möjligheter",
            "description": "När det balanseras driver Oranges energi teknologiska framsteg, ekonomisk tillväxt och förbättrad livskvalitet. Det inspirerar individer att nå sin fulla potential och bidra meningsfullt till samhället."
          }
        },
        "practical": {
          "title": "Praktiskt tillämpningsexempel",
          "description": "Föreställ dig att coacha ett team i en konkurrenskraftig startup:",
          "items": [
            "Uppmuntra deras drivkraft för innovation samtidigt som du bygger en kultur av etiskt ansvar",
            "Fira framgångar medan du främjar medvetenhet om bredare effekter, såsom hållbarhet och medarbetares välbefinnande",
            "Introducera diskussioner om hur teamets arbete bidrar till samhällsutveckling, inte bara marknadsdominans"
          ]
        }
      },
      "blue": {
        "title": "Stadium Blue (blå)",
        "subtitle": "Ordning, plikt och struktur",
        "characteristics": {
          "title": "Nyckelkaraktäristik",
          "focusTitle": "Fokus",
          "behaviourTitle": "Beteende",
          "contextsTitle": "Exempel på kontext",
          "focus": "Etablering av ordning, disciplin och mening genom efterlevnad av regler, traditioner och hierarkiska system.",
          "behavior": "Beslut vägleds av en känsla av plikt, moraliska koder och tro på en högre sanning eller syfte. Stabilitet och lag prioriteras över personlig frihet.",
          "contexts": "Religiösa institutioner, militära organisationer eller traditionella skolor."
        },
        "insights": {
          "understanding": {
            "title": "Förstå Blue",
            "description": "Blue framträder som ett svar på kaoset och impulsiviteten i Red, och erbjuder struktur, ansvar och en tydlig känsla av rätt och fel. Det betonar vikten av att tjäna ett högre syfte, vare sig det är en gudom, en nation eller en moralisk ideal. Detta stadie värderar konformitet och kollektivt framsteg över individuella önskningar."
          },
          "examples": {
            "title": "Kulturella exempel",
            "items": [
              "Historiska: Det medeltida feodalsystemet, puritanska samhällen eller den romersk-katolska kyrkan under medeltiden",
              "Moderna: Nationer styrda av strikta rättsliga ramar, skolor som betonar disciplin",
              "Personliga: En individ som omfamnar religion eller strikta rutiner för att finna ordning i sitt liv"
            ]
          },
          "applications": {
            "title": "Moderna tillämpningar",
            "description": "Blue är tydligt i sammanhang som kräver ordning och efterlevnad för att säkerställa framsteg:",
            "items": [
              "Institutioner som militären, vilka förlitar sig på disciplin och hierarki för att fungera effektivt",
              "Rättssystem som upprätthåller rättvisa och skyddar samhällsvärderingar",
              "Utbildningssystem som förmedlar moraliska värderingar och standardiserad kunskap"
            ]
          }
        },
        "growth": {
          "title": "Vägar till tillväxt",
          "awareness": {
            "title": "Medvetenhet",
            "description": "Att känna igen Blues inflytande hjälper till att uppskatta värdet av disciplin och gemensamt syfte, samtidigt som man förstår dess begränsningar. Exempel: Ledare i Blue miljöer trivs genom att förstärka stabilitet men bör vara öppna för nya idéer och perspektiv."
          },
          "interventions": {
            "title": "Praktiska insatser",
            "items": [
              "Uppmuntra efterlevnad av principer samtidigt som empati och förståelse för olika synsätt främjas",
              "Ge möjligheter att ifrågasätta och utveckla övertygelser utan att underminera värdet av struktur",
              "Använd ritualer och traditioner som verktyg för att inspirera och förena snarare än att begränsa"
            ]
          },
          "transition": {
            "title": "Övergång till Orange",
            "description": "När individer eller samhällen mognar, blir begränsningarna i rigida strukturer och dogmer uppenbara. En önskan om innovation, prestation och individuell autonomi leder till det stadium Orange."
          }
        },
        "exercises": {
          "title": "Praktiska övningar",
          "reflection": {
            "title": "Självreflektion",
            "questions": [
              "Tjänar dessa strukturer mig, eller tjänar jag dem?",
              "Hur kan jag anpassa mina personliga värderingar till dessa regler?",
              "Hur har efterlevnad av ordning positivt format mitt liv samtidigt som jag överväger områden där flexibilitet kan vara fördelaktigt?"
            ]
          },
          "action": {
            "title": "Gemensam handling",
            "actions": [
              "Volontärarbeta med organisationer som främjar lag, ordning eller moralisk utveckling, såsom mentorprogram eller trosbaserade initiativ",
              "Underlätta diskussioner i skolor, arbetsplatser eller samhällen om hur regler kan utvecklas för att bättre tjäna alla inblandade"
            ]
          }
        },
        "challenges": {
          "title": "Utmaningar och möjligheter",
          "challenges": {
            "title": "Utmaningar",
            "description": "Blue kan vara alltför rigid, motståndskraftigt mot förändring och avvisande av alternativa synsätt. Det kan hämma kreativitet och undertrycka individuell uttrycksfrihet till förmån för konformitet."
          },
          "opportunities": {
            "title": "Möjligheter",
            "description": "När det balanseras främjar Blue en känsla av syfte, kollektiv säkerhet och moralisk integritet. Det bygger grunden för rättvisa, utbildning och långsiktig samhällsframgång."
          }
        },
        "practical": {
          "title": "Praktiskt tillämpningsexempel",
          "description": "Föreställ dig att arbeta med ett samhälle djupt rotat i värderingar från stadium Blue:",
          "items": [
            "Respektera deras traditioner och visa hur moderna idéer kan komplettera, snarare än ersätta, deras befintliga system",
            "Använd deras moralkoder för att rama in diskussioner om rättvisa, jämlikhet eller innovation",
            "Erkänn deras bidrag till stabilitet samtidigt som du försiktigt uppmuntrar ett mer öppet tankesätt"
          ]
        }
      },
      "red": {
        "title": "Stadium Red (röd)",
        "subtitle": "Makt och dominans",
        "characteristics": {
          "title": "Nyckelkaraktäristik",
          "focusTitle": "Fokus",
          "behaviourTitle": "Beteende",
          "contextsTitle": "Exempel på kontext",
          "focus": "Hävdande av individualitet, makt och kontroll. Röd handlar om \"jag först\" och att etablera dominans i omgivningen.",
          "behavior": "Beslut drivs av ego, impulsivitet och en önskan om omedelbar tillfredsställelse. Hierarkier är ofta informella och baserade på styrka, karisma eller list.",
          "contexts": "Krigsherrar, rebelliska ungdomar eller ambitiösa entreprenörer som bryter sig fria från traditionella begränsningar."
        },
        "insights": {
          "understanding": {
            "title": "Förstå Red",
            "description": "Red är stadiet där individer bryter sig loss från grupptillhörighet (Purple) och hävdar sin egen viljestyrka. Detta stadie kännetecknas av självförtroende, personlig styrka och strävan efter frihet. Personer i Red tenderar att motstå extern kontroll och förlitar sig på sig själva för att uppnå sina mål, ofta genom kraft eller manipulation."
          },
          "examples": {
            "title": "Kulturella exempel",
            "items": [
              "Historiska: Feodalherrar, erövrare som Djingis Khan eller piratkulturer",
              "Moderna: Gängledare, självgjorda entreprenörer som avvisar konventionella normer eller idrottare som pressar sina gränser i individualistiska sporter",
              "Personliga: En rebellisk tonåring som trotsar auktoritet för att utforska sitt oberoende"
            ]
          },
          "applications": {
            "title": "Moderna tillämpningar",
            "description": "Red framträder ofta i miljöer med höga insatser eller situationer som kräver djärva handlingar:",
            "items": [
              "Start-up-grundare som disruptar industrier med aggressiva strategier",
              "Politiska ledare som använder karisma och maktspel för att stiga till dominans",
              "Konstnärer som bryter sig fria från konventionella normer för att uttrycka rå, otämjd kreativitet"
            ]
          }
        },
        "growth": {
          "title": "Vägar till tillväxt",
          "awareness": {
            "title": "Medvetenhet",
            "description": "Att känna igen Reds inflytande kan hjälpa till att navigera och kanalisera dess energi konstruktivt. Exempel: Ledare i Red kan gynnas av mentorskap för att dämpa deras impulsivitet med långsiktig strategi."
          },
          "interventions": {
            "title": "Praktiska insatser",
            "items": [
              "Ge möjligheter till självuttryck och ledarskap utan att behöva förlita sig på destruktiv konkurrens",
              "Rama in utmaningar som möjligheter att bevisa styrka och kapacitet",
              "Sätt gränser och konsekvenser tydligt, eftersom Red respekterar styrka framför övertalning"
            ]
          },
          "transition": {
            "title": "Övergång till Blue",
            "description": "När kaoset och oförutsägbarheten i Red blir mindre tillfredsställande, söker individer ofta ordning, struktur och en känsla av rättvisa, vilket leder till stadium Blue."
          }
        },
        "exercises": {
          "title": "Praktiska Övningar",
          "reflection": {
            "title": "Självreflektion",
            "questions": [
              "Använder jag min styrka konstruktivt eller destruktivt?",
              "Hur balanserar jag mina egna behov med andras behov?",
              "Reflektera över tillfällen då dina handlingar inspirerade eller skrämde andra"
            ]
          },
          "action": {
            "title": "Gemensam handling",
            "actions": [
              "Mentor unga människor eller individer i utmanande miljöer och vägled dem att kanalisera sin självhävdelse produktivt",
              "Engagera dig i initiativ som fokuserar på att hjälpa marginaliserade individer att utveckla självständighet och självförtroende"
            ]
          }
        },
        "challenges": {
          "title": "Utmaningar och möjligheter",
          "challenges": {
            "title": "Utmaningar",
            "description": "Red kan ofta bortse från samhällsnormer och regler, vilket leder till konflikter eller självdestruktivitet. Dess fokus på omedelbar tillfredsställelse kan också undergräva långsiktig framgång."
          },
          "opportunities": {
            "title": "Möjligheter",
            "description": "När den används effektivt kan Reds energi och djärvhet inspirera innovation, bryta barriärer och uppnå snabba framsteg. Personer i Red kan trivas i ledarskapsroller som belönar karisma, risktagande och beslutsamhet."
          }
        },
        "practical": {
          "title": "Praktiskt tillämpningsexempel",
          "description": "Föreställ dig att coacha en ung entreprenör som personifierar Red energi:",
          "items": [
            "Betona deras styrkor, såsom ambition och drivkraft, samtidigt som du lär ut värdet av strategisk planering och samarbete",
            "Introducera förebilder som balanserade Reds självförtroende med disciplinen i högre stadier",
            "Fira deras prestationer samtidigt som du uppmuntrar reflektion över den bredare påverkan av deras handlingar"
          ]
        }
      },
      "purple": {
        "title": "Stadium Purple (lila)",
        "subtitle": "Stamordning och trygghet",
        "characteristics": {
          "title": "Nyckelkaraktäristik",
          "focusTitle": "Fokus",
          "behaviourTitle": "Beteende",
          "contextsTitle": "Exempel på sammanhang",
          "focus": "Bygga trygghet och säkerhet genom grupptillhörighet, ritualer och traditioner",
          "behavior": "Lojalitet till gruppen eller stammen är av största vikt. Beslut fattas baserat på vad som tros behaga andarna, förfäderna eller de kollektiva traditionerna.",
          "contexts": "Traditionella samhällen, familjecentrerade kulturer eller grupper bundna av starka gemensamma praxis."
        },
        "insights": {
          "understanding": {
            "title": "Förstå Purple",
            "description": "Purple representerar framväxten av trygghet genom koppling och delad mening. Detta stadium kännetecknas av beroende av familj, släktskap och traditioner för att ge struktur och stöd. Övertygelser kretsar ofta kring mystiska eller andliga tolkningar av världen, såsom att hedra förfäder, frukta förbannelser eller fira livets helighet."
          },
          "examples": {
            "title": "Kulturella exempel",
            "items": [
              "Ursprungsstammar som utför ritualer för att hedra naturen och förfäder",
              "Sammanhållna landsbygdssamhällen som förlitar sig på familjeband och delade seder",
              "Stadsgäng som utvecklar sina egna ritualer och regler för tillhörighet"
            ]
          },
          "applications": {
            "title": "Moderna tillämpningar",
            "description": "Lila lever i många aspekter av det moderna livet:",
            "items": [
              "Familjesammankomster och traditioner, såsom helgritualer",
              "Gruppidentiteter hos sportfans eller broderskapsorganisationer",
              "Arbetsplatskulturer som betonar delade värderingar och laganda"
            ]
          }
        },
        "growth": {
          "title": "Vägar till tillväxt",
          "awareness": {
            "title": "Medvetenhet",
            "description": "Att känna igen Purple kan hjälpa till att visa respekt för kulturella traditioner och gruppdynamik. Exempel: När du introducerar nya idéer i en Purple-dominerad kontext, respektera gruppens ritualer och involvera äldre eller respekterade ledare."
          },
          "interventions": {
            "title": "Praktiska insatser",
            "items": [
              "Stärk förtroendet genom att delta i ritualer eller sedvänjor som är viktiga för gruppen",
              "Undvik att hota gruppens sammanhållning; betona istället gemensamma mål eller värderingar",
              "Ge möjligheter till berättande, eftersom det är ett viktigt sätt för Purple att överföra visdom och mening"
            ]
          },
          "transition": {
            "title": "Övergång till Red",
            "description": "När självförtroendet i personliga förmågor växer börjar individer eller grupper bryta sig loss från kollektivet för att hävda individualitet och autonomi, vilket leder mot stadium Red."
          }
        },
        "exercises": {
          "title": "Praktiska övningar",
          "reflection": {
            "title": "Självreflektion",
            "questions": [
              "Identifiera de 'stamgrupper' du tillhör. Hur formar deras seder dina beslut och övertygelser?",
              "Reflektera över traditioner eller ritualer som ger dig tröst eller en känsla av identitet."
            ]
          },
          "action": {
            "title": "Gemensam handling",
            "actions": [
              "Engagera dig i en grupp eller ett samhälle genom att lära dig och respektera deras seder (t.ex. delta i kulturella festivaler)",
              "Volontärarbeta med organisationer som bevarar ursprungskulturer eller traditionell kunskap"
            ]
          }
        },
        "practical": {
          "title": "Praktiskt tillämpningsexempel",
          "description": "Föreställ dig att arbeta med en samhällsgrupp i ett litet landsbygdsområde:",
          "items": [
            "Erkänn deras traditioner, kanske genom att delta i lokala ceremonier",
            "Bygg relationer genom gemensamma måltider eller deltagande i kulturevenemang",
            "Introducera innovationer eller idéer gradvis, och rama in dem som förlängningar av gruppens befintliga värderingar"
          ]
        },
        "challenges": {
           "title": "Utmaningar och möjligheter",
           "challenges": {
              "title": "Utmaningar",
              "description": "Purple kan vara motståndskraftigt mot förändring, eftersom dess världsbild är djupt rotad i tradition och kollektiv identitet. Utomstående kan finna det svårt att bli accepterade utan att visa respekt för gruppens normer."
           },
           "opportunities": {
              "title": "Möjligheter",
              "description": "Att utnyttja styrkorna hos Purple kan främja gruppens sammanhållning och motståndskraft. Ledare kan använda berättelser och ritualer för att inspirera och förena samhällen."
           }
        }
      },
      "beige": {
        "title": "Stadium Beige",
        "subtitle": "Förståelse för överlevnadsinstinkter och grundläggande behov",
        "characteristics": {
          "title": "Nyckelkaraktäristik",
          "focusTitle": "Fokus",
          "behaviourTitle": "Beteende",
          "contextsTitle": "Exempel på sammanhang",
          "focus": "Överlevnad är det primära fokuset. Detta stadium handlar om att tillfredsställa de mest grundläggande fysiologiska behoven: mat, vatten, skydd, säkerhet och vila.",
          "behavior": "Beslut drivs av instinktiva och reflexiva handlingar. Samarbete sker endast när det direkt gynnar överlevnad.",
          "contexts": "Spädbarn, individer i extrem fattigdom, flyktingar eller de i överlevnadsscenarier."
        },
        "insights": {
          "understanding": {
            "title": "Förstå Beige",
            "description": "Beige representerar grunden för mänsklig existens, där livet reduceras till sina mest väsentliga komponenter. Detta stadium är starkt närvarande i krissituationer eller tidig mänsklig historia. Även om det kan verka primitivt, belyser det människans förmåga till resiliens och anpassning."
          },
          "examples": {
            "title": "Kulturella exempel",
            "items": [
              "Stammar i förhistorisk tid som lever av naturen utan strukturerat samhälle",
              "Flyktingar som navigerar livet i läger där daglig överlevnad dominerar",
              "En individ som återhämtar sig från svår trauma eller missbruk, fokuserad på ögonblicklig existens"
            ]
          },
          "applications": {
            "title": "Moderna tillämpningar",
            "description": "Även i avancerade samhällen dyker Beige upp i nödsituationer eller när grundläggande behov inte uppfylls:",
            "items": [
              "Räddningspersonal som hanterar grundläggande överlevnadslogistik i katastrofzoner",
              "Hjälporganisationer som tillhandahåller mat och skydd i humanitära kriser"
            ]
          }
        },
        "growth": {
          "title": "Vägar till tillväxt",
          "awareness": {
            "title": "Medvetenhet",
            "description": "Att känna igen när en individ eller grupp opererar i Beige kan förhindra missbedömningar eller ouppfyllda förväntningar."
          },
          "interventions": {
            "title": "Praktiska insatser",
            "items": [
              "Säkerställ trygghet och adressera omedelbara fysiska behov",
              "Bygg förtroende genom att erbjuda konsekvent, medkännande stöd",
              "Undvik att överväldiga individer med komplex information eller krav; ge istället tydliga, enkla alternativ"
            ]
          },
          "transition": {
            "title": "Övergång till Purple (lila)",
            "description": "När överlevnadsbehoven konsekvent uppfylls börjar individer naturligt söka koppling och trygghet genom relationer och traditioner, vilket signalerar en övergång till stadium Purple."
          }
        },
        "exercises": {
          "title": "Praktiska övningar",
          "reflection": {
            "title": "Självreflektion",
            "questions": [
              "När prioriterar jag överlevnad framför långsiktig planering?",
              "Hur stöttar jag andra som står inför överlevnadsutmaningar?"
            ]
          },
          "action": {
            "title": "Gemensam handling",
            "description": "Volontärarbete med organisationer som hanterar hemlöshet, livsmedelsosäkerhet eller katastrofhjälp för att få en djupare förståelse av Beige i praktiken."
          }
        }
      }
    }
  };

  // Translation helper function - replaces the svelte-i18n $_() function
  const t = (path: string) => {
    const keys = path.split('.');
    let result = translations[currentLanguage];
    
    // Navigate through the nested object
    for (const key of keys) {
      result = result?.[key];
      if (result === undefined) break;
    }
    
    // If translation not found, try English as fallback
    if (result === undefined) {
      result = translations.en;
      for (const key of keys) {
        result = result?.[key];
        if (result === undefined) break;
      }
    }
    
    // If still not found, return the path itself
    return result || path;
  };

  // Navigation breadcrumbs translation
  $: t_nav = translations[currentLanguage];

  const stageColors = {
    beige: '#E5D0BA',
    purple: '#9B6B9E',
    red: '#E25A53',
    blue: '#4A72B2',
    orange: '#FF7F27',
    green: '#7AB55C',
    yellow: '#FFD700',
    turquoise: '#40E0D0',
    coral: '#FF6F61',
    ultraviolet: '#9932CC'
  };

  // Stage navigation
  const stageOrder = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise', 'coral', 'ultraviolet'];
  $: currentIndex = stageOrder.indexOf(stage);
  $: previousStage = currentIndex > 0 ? stageOrder[currentIndex - 1] : null;
  $: nextStage = currentIndex < stageOrder.length - 1 ? stageOrder[currentIndex + 1] : null;
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <!-- Navigation breadcrumbs -->
    <div class="mb-8 flex items-center text-sm">
      <a 
        href="{base}/insights" 
        class="text-purple-600 hover:text-purple-700"
      >
        {t_nav.breadcrumb_insights}
      </a>
      <svg class="w-5 h-5 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
      <span class="text-gray-600 capitalize">{stage} Stage</span>
    </div>

    <!-- Main Content -->
    <div class="space-y-8">
      <!-- Header Section -->
      <header 
        class="bg-white rounded-xl shadow-sm p-8 border-l-4"
        style="border-color: {stageColors[stage]}"
      >
        <h1 
          class="text-4xl font-bold mb-4"
          style="color: {stageColors[stage]}"
        >
          {t(`${stage}.title`)}
        </h1>
        <p class="text-xl text-gray-600">
          {t(`${stage}.subtitle`)}
        </p>
      </header>

      <!-- Key Characteristics -->
      <section class="bg-white rounded-xl shadow-sm p-8">
        <h2 class="text-2xl font-semibold mb-6">{t(`${stage}.characteristics.title`)}</h2>
        <div class="space-y-6">
          <div class="prose max-w-none">
            <h3 class="text-lg font-medium text-gray-900">{t(`${stage}.characteristics.focusTitle`)}</h3>
            <p class="text-gray-600">{t(`${stage}.characteristics.focus`)}</p>
            
            <h3 class="text-lg font-medium text-gray-900 mt-6">{t(`${stage}.characteristics.behaviourTitle`)}</h3>
            <p class="text-gray-600">{t(`${stage}.characteristics.behavior`)}</p>
            
            <h3 class="text-lg font-medium text-gray-900 mt-6">{t(`${stage}.characteristics.contextsTitle`)}</h3>
            <p class="text-gray-600">{t(`${stage}.characteristics.contexts`)}</p>
          </div>
        </div>
      </section>

      <!-- Understanding & Examples -->
      <section class="bg-white rounded-xl shadow-sm p-8">
        <div class="space-y-8">
          <!-- Understanding -->
          <div>
            <h3 class="text-xl font-semibold mb-4">{t(`${stage}.insights.understanding.title`)}</h3>
            <p class="text-gray-600">{t(`${stage}.insights.understanding.description`)}</p>
          </div>

          <!-- Examples -->
          <div>
            <h3 class="text-xl font-semibold mb-4">{t(`${stage}.insights.examples.title`)}</h3>
            <ul class="space-y-2">
              {#each t(`${stage}.insights.examples.items`) as example}
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span class="text-gray-600">{example}</span>
                </li>
              {/each}
            </ul>
          </div>

          <!-- Modern Applications -->
          <div>
            <h3 class="text-xl font-semibold mb-4">{t(`${stage}.insights.applications.title`)}</h3>
            <p class="text-gray-600 mb-4">{t(`${stage}.insights.applications.description`)}</p>
            <ul class="space-y-2">
              {#each t(`${stage}.insights.applications.items`) as application}
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span class="text-gray-600">{application}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </section>

      <!-- Rest of sections follow same pattern... -->
      <!-- Growth Pathways, Exercises, Challenges, Practical Application -->
      
      <!-- Navigation Footer -->
      <nav class="flex justify-between items-center pt-8">
        {#if previousStage}
          <a
            href="{base}/insights/stages/{previousStage}"
            class="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            style="color: {stageColors[previousStage]}"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="capitalize">{previousStage}</span>
          </a>
        {:else}
          <div></div>
        {/if}

        {#if nextStage}
          <a
            href="{base}/insights/stages/{nextStage}"
            class="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            style="color: {stageColors[nextStage]}"
          >
            <span class="capitalize">{nextStage}</span>
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        {/if}
      </nav>
    </div>
  </div>
</div>
