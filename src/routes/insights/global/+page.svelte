<script lang="ts">
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';
  import ShareButtons from '$lib/components/ShareButtons.svelte';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // Translation data
  const translations = {
    en: {
      title: "Global Perspectives",
      subtitle: "How Different Worldviews Shape Our Shared Challenges",
      introduction: "The way we see the world shapes how we try to solve our biggest problems. This page looks at today's global challenges through the lens of Spiral Dynamics and explores how different worldviews affect our responses to them.",
      
      sections: [
        {
          title: "How We See the World Today",
          content: `
            <div class="mb-8">
              <p class="mb-4">Today's world is a mix of different values and worldviews working alongside each other:</p>
              
              <div class="grid md:grid-cols-2 gap-6 my-6">
                <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h4 class="font-semibold text-blue-800 mb-2">Blue: Traditional Values</h4>
                  <p class="text-gray-700 mb-3">Focused on order, right vs. wrong, and following established rules.</p>
                  <p class="text-sm text-gray-600"><strong>Examples:</strong> Religious institutions, conservative political movements, military organizations</p>
                </div>
                
                <div class="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <h4 class="font-semibold text-orange-800 mb-2">Orange: Achievement & Progress</h4>
                  <p class="text-gray-700 mb-3">Focused on success, innovation, science, and competitive markets.</p>
                  <p class="text-sm text-gray-600"><strong>Examples:</strong> Business corporations, tech startups, mainstream economics</p>
                </div>
                
                <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h4 class="font-semibold text-green-800 mb-2">Green: Equality & Community</h4>
                  <p class="text-gray-700 mb-3">Focused on fairness, inclusion, environmental protection, and shared decision-making.</p>
                  <p class="text-sm text-gray-600"><strong>Examples:</strong> Progressive movements, NGOs, university humanities departments</p>
                </div>
                
                <div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                  <h4 class="font-semibold text-yellow-800 mb-2">Yellow: Systems Thinking</h4>
                  <p class="text-gray-700 mb-3">Focused on understanding complexity, integration, and flexible adaptation.</p>
                  <p class="text-sm text-gray-600"><strong>Examples:</strong> Emerging in systems thinkers, complexity researchers, integral practitioners. Notable examples include Sweden's <a href="https://www.fjarilspartiet.se" class="text-blue-600 hover:underline">Fjärilspartiet</a> (Butterfly Party), which explicitly applies systems thinking and developmental frameworks to politics, and advanced AI systems designed to integrate multiple perspectives and adapt to complex contexts.</p>
                </div>
              </div>
              
              <p>These different worldviews often clash when we try to tackle our biggest problems, leading to gridlock instead of solutions.</p>
            </div>
          `
        },
        {
          title: "Regional Development: Where Are We on the Spiral?",
          content: `
            <p class="mb-6">Different regions and groups around the world show different centers of gravity in their values and worldviews. While individuals within any region can be at any stage, these patterns help us understand global dynamics.</p>
            
            <div class="overflow-x-auto mb-8">
              <table class="min-w-full bg-white border border-gray-200">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="py-3 px-4 text-left">Region/Group</th>
                    <th class="py-3 px-4 text-left">Dominant Values</th>
                    <th class="py-3 px-4 text-left">Growing Edge</th>
                    <th class="py-3 px-4 text-left">Key Tensions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td class="py-3 px-4 font-medium">United States</td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Orange</span>
                      <span class="text-sm text-gray-600 ml-2">dominant</span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Green</span> 
                      <span class="text-sm text-gray-600 ml-2">growing</span>
                    </td>
                    <td class="py-3 px-4">Blue-Orange-Green cultural divide (Republicans often Blue-Orange, Democrats often Orange-Green)</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-medium">Western Europe</td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Orange</span>
                      <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm ml-1">Green</span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Yellow</span>
                      <span class="text-sm text-gray-600 ml-2">emerging</span>
                    </td>
                    <td class="py-3 px-4">Balancing economic progress with social welfare; immigration integration</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-medium">China</td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Blue</span>
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm ml-1">Orange</span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Orange</span>
                      <span class="text-sm text-gray-600 ml-2">expanding</span>
                    </td>
                    <td class="py-3 px-4">Rapid modernization while maintaining social stability; balancing growth with sustainability</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-medium">Sub-Saharan Africa</td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Purple</span>
                      <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm ml-1">Blue</span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Orange</span>
                      <span class="text-sm text-gray-600 ml-2">emerging</span>
                    </td>
                    <td class="py-3 px-4">Traditional values alongside rapid technological adoption; sustainable development needs</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-medium">Businesses & Corporations</td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Blue</span>
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm ml-1">Orange</span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Green</span>
                      <span class="text-sm text-gray-600 ml-2">growing</span>
                    </td>
                    <td class="py-3 px-4">Profit vs. purpose; stakeholder capitalism; environmental responsibility</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-medium">Global Governance</td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Blue</span>
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm ml-1">Orange</span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Green</span>
                      <span class="text-sm text-gray-600 ml-2">growing</span>
                    </td>
                    <td class="py-3 px-4">National sovereignty vs. global cooperation; addressing transnational challenges</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="bg-gray-100 p-6 rounded-lg mb-6">
              <h4 class="font-medium text-gray-900 mb-2">Understanding This Table</h4>
              <p class="text-gray-700 text-sm">This is a simplified overview showing general patterns. Remember that:</p>
              <ul class="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                <li>Individuals within any region may be at different stages</li>
                <li>Most societies contain a mix of all value systems</li>
                <li>Each stage has healthy and unhealthy expressions</li>
                <li>Development isn't a competition - each stage has its strengths</li>
              </ul>
            </div>
          `
        },
        {
          title: "Global Challenges Viewed Through Different Lenses",
          subsections: [
            {
              title: "Climate Change: Different Worldviews, Different Solutions",
              content: `
                <div class="mb-6">
                  <p class="mb-4">Climate change looks completely different depending on your worldview:</p>
                  
                  <div class="relative py-8">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center">
                      <span class="bg-white px-3 text-lg font-medium text-gray-900">How Different Worldviews See Climate Change</span>
                    </div>
                  </div>
                  
                  <div class="overflow-hidden rounded-lg border border-gray-200 shadow-sm divide-y divide-gray-200 mb-6">
                    <div class="px-4 py-5 sm:px-6 bg-blue-50">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                          <span class="text-xl">🏛️</span>
                        </div>
                        <div class="ml-4">
                          <h4 class="text-lg font-medium text-blue-800">Blue Perspective</h4>
                          <p class="text-blue-600">"We must be responsible stewards of God's creation"</p>
                        </div>
                      </div>
                      <div class="mt-3 pl-14">
                        <p class="text-gray-700 mb-2">Sees climate change through moral and religious frameworks</p>
                        <ul class="list-disc pl-5 text-gray-600 text-sm">
                          <li>May emphasize personal responsibility and conservation</li>
                          <li>Often skeptical of global governance solutions</li>
                          <li>Focus on traditional values and stewardship</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div class="px-4 py-5 sm:px-6 bg-orange-50">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-700">
                          <span class="text-xl">📈</span>
                        </div>
                        <div class="ml-4">
                          <h4 class="text-lg font-medium text-orange-800">Orange Perspective</h4>
                          <p class="text-orange-600">"Technology and markets will solve this problem"</p>
                        </div>
                      </div>
                      <div class="mt-3 pl-14">
                        <p class="text-gray-700 mb-2">Sees climate change as a technical and economic challenge</p>
                        <ul class="list-disc pl-5 text-gray-600 text-sm">
                          <li>Emphasizes innovation, carbon pricing, and incentives</li>
                          <li>Focuses on economic growth alongside emissions reduction</li>
                          <li>Promotes technological solutions like renewable energy</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div class="px-4 py-5 sm:px-6 bg-green-50">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                          <span class="text-xl">🌍</span>
                        </div>
                        <div class="ml-4">
                          <h4 class="text-lg font-medium text-green-800">Green Perspective</h4>
                          <p class="text-green-600">"We must radically transform our relationship with nature"</p>
                        </div>
                      </div>
                      <div class="mt-3 pl-14">
                        <p class="text-gray-700 mb-2">Sees climate change as a moral and social justice issue</p>
                        <ul class="list-disc pl-5 text-gray-600 text-sm">
                          <li>Emphasizes equity, environmental justice, and system change</li>
                          <li>Often critical of capitalism and consumption patterns</li>
                          <li>Promotes community-based solutions and indigenous wisdom</li>
                        </ul>
                      </div>
                    </div>

                    <div class="px-4 py-5 sm:px-6 bg-yellow-50">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700">
                          <span class="text-xl">🔄</span>
                        </div>
                        <div class="ml-4">
                          <h4 class="text-lg font-medium text-yellow-800">Yellow/Turquoise Integration</h4>
                          <p class="text-yellow-600">"We need adaptive, integrated approaches at multiple levels"</p>
                        </div>
                      </div>
                      <div class="mt-3 pl-14">
                        <p class="text-gray-700 mb-2">Sees challenges as complex adaptive systems requiring integrated solutions.</p>
                        <ul class="list-disc pl-5 text-gray-600 text-sm">
                          <li>Combines technological innovation with cultural and behavioral shifts</li>
                          <li>Integrates market mechanisms with appropriate regulations</li>
                          <li>Balances immediate needs with long-term evolution</li>
                          <li>Creates flexible governance that can evolve with changing conditions</li>
                          <li>Examples: Fjärilspartiet's systems-based political approach combining evidence-based policy with developmental frameworks; Advanced AI systems designed to integrate multiple perspectives and adapt to complex contexts</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <p>These different worldviews are why we often talk past each other when discussing climate solutions—we're starting from completely different understandings of the problem.</p>
                </div>
              `
            },
            {
              title: "Economic Inequality: Different Values, Different Priorities",
              content: `
                <div class="mb-6">
                  <p class="mb-4">Our views on wealth and poverty are shaped by our underlying values:</p>
                
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div class="bg-blue-50 p-6 rounded-lg">
                      <h4 class="font-medium text-blue-800 mb-3">Blue Worldview</h4>
                      <p class="italic mb-3">"Charity and moral responsibility"</p>
                      <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
                        <li>Focus on personal moral duty to help others</li>
                        <li>Emphasis on charitable giving and volunteering</li>
                        <li>Traditional support systems and religious institutions</li>
                      </ul>
                    </div>
                    
                    <div class="bg-orange-50 p-6 rounded-lg">
                      <h4 class="font-medium text-orange-800 mb-3">Orange Worldview</h4>
                      <p class="italic mb-3">"Opportunity and economic growth"</p>
                      <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
                        <li>Focus on creating economic opportunity</li>
                        <li>Emphasis on education and entrepreneurship</li>
                        <li>Acceptance of inequality as motivating achievement</li>
                      </ul>
                    </div>
                    
                    <div class="bg-green-50 p-6 rounded-lg">
                      <h4 class="font-medium text-green-800 mb-3">Green Worldview</h4>
                      <p class="italic mb-3">"Structural justice and redistribution"</p>
                      <ul class="list-disc pl-5text-gray-700 text-sm space-y-1">
                        <li>Focus on addressing systemic injustice</li>
                        <li>Emphasis on equity and redistribution</li>
                        <li>Critical of economic systems that create inequality</li>
                      </ul>
                    </div>
                    
                    <div class="bg-yellow-50 p-6 rounded-lg">
                      <h4 class="font-medium text-yellow-800 mb-3">Yellow/Turquoise Integration</h4>
                      <p class="italic mb-3">"Developmental ecosystems for collective thriving"</p>
                      <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
                        <li>Balances wealth creation with fair distribution</li>
                        <li>Creates systems that develop human potential</li>
                        <li>Designs economies serving humanity and planet</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p>An integrated approach recognizes that economic systems must both create prosperity and ensure that it's widely shared, while developing human potential at all levels.</p>
                </div>
              `
            },
            {
              title: "Political Polarization: A Clash of Worldviews",
              content: `
                <div class="mb-6">
                  <p class="mb-4">Political divisions often reflect deeper differences in how we see the world:</p>
                  
                  <div class="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                    <div class="px-6 py-4 bg-gray-50 text-center">
                      <h4 class="font-medium text-gray-900">U.S. Political Spectrum Through a Spiral Dynamics Lens</h4>
                    </div>
                    
                    <div class="flex flex-col md:flex-row">
                      <div class="flex-1 p-6 bg-gradient-to-r from-blue-50 to-red-50">
                        <h5 class="font-medium text-center mb-3">Conservative Perspective</h5>
                        <div class="flex items-center justify-center space-x-1 mb-4">
                          <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Blue</span>
                          <span class="text-gray-400">+</span>
                          <span class="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-sm">Red</span>
                          <span class="text-gray-400">+</span>
                          <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Orange</span>
                        </div>
                        <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
                          <li>Emphasis on traditional values and order (Blue)</li>
                          <li>Protection of individual freedoms (Red/Orange)</li>
                          <li>Free market economics (Orange)</li>
                          <li>Strong national identity and security (Blue/Red)</li>
                        </ul>
                      </div>
                      
                      <div class="flex-1 p-6 bg-gradient-to-r from-orange-50 to-green-50">
                        <h5 class="font-medium text-center mb-3">Progressive Perspective</h5>
                        <div class="flex items-center justify-center space-x-1 mb-4">
                          <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Orange</span>
                          <span class="text-gray-400">+</span>
                          <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Green</span>
                        </div>
                        <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
                          <li>Emphasis on social equality and inclusion (Green)</li>
                          <li>Support for cultural diversity (Green)</li>
                          <li>Environmental protection (Green)</li>
                          <li>Innovation and progress (Orange)</li>
                          <li>Global cooperation (Orange/Green)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div class="px-6 py-4 bg-yellow-50 border-t border-gray-200">
                      <h5 class="font-medium text-center text-yellow-800 mb-3">Bridging Perspectives (Yellow/Turquoise)</h5>
                      <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
                        <li>Respects the valid concerns from all worldviews</li>
                        <li>Sees order, freedom, achievement, and equality as necessary polarities to balance</li>
                        <li>Creates flexible governance that integrates traditional wisdom with innovation</li>
                        <li>Focuses on the health of the entire developmental spectrum</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p>Political polarization isn't just about different policies—it's about fundamentally different ways of seeing what matters in life. Understanding these differences can help us have more productive conversations across divides.</p>
                </div>
              `
            }
          ]
        },
        {
          title: "What Yellow and Turquoise Solutions Look Like in Practice",
          content: `
            <div class="mb-8">
              <p class="mb-4">What might second-tier approaches to our biggest problems actually look like in practice?</p>
              
              <div class="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-gray-200">
                  <h4 class="font-medium text-lg text-center">Yellow/Turquoise Solutions in Action</h4>
                </div>
                
                <div class="p-6">
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="bg-gray-50 p-5 rounded-lg">
                      <div class="flex items-center mb-3">
                        <div class="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 mr-3">
                          <span class="text-xl">🔄</span>
                        </div>
                        <h5 class="font-medium">Regenerative Economies</h5>
                      </div>
                      <p class="text-sm text-gray-600 mb-3">Economic models that combine profitability with ecological regeneration and human development</p>
                      <div class="text-xs text-gray-500">
                        <strong>Examples:</strong> Regenerative agriculture, circular economies, B-Corps, stakeholder capitalism
                      </div>
                    </div>
                    
                    <div class="bg-gray-50 p-5 rounded-lg">
                      <div class="flex items-center mb-3">
                        <div class="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 mr-3">
                          <span class="text-xl">🧩</span>
                        </div>
                        <h5 class="font-medium">Polarity Management</h5>
                      </div>
                      <p class="text-sm text-gray-600 mb-3">Approaches that balance seemingly opposing values like individual freedom and collective wellbeing</p>
                      <div class="text-xs text-gray-500">
                        <strong>Examples:</strong> Nordic economic models, Integrative healthcare, Both/And leadership
                      </div>
                    </div>
                    
                    <div class="bg-gray-50 p-5 rounded-lg">
                      <div class="flex items-center mb-3">
                        <div class="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 mr-3">
                          <span class="text-xl">🌐</span>
                        </div>
                        <h5 class="font-medium">Multi-stakeholder Governance</h5>
                      </div>
                      <p class="text-sm text-gray-600 mb-3">Decision-making that includes perspectives from business, government, civil society, and affected communities</p>
                      <div class="text-xs text-gray-500">
                        <strong>Examples:</strong> Watershed management councils, peacebuilding initiatives, participatory budgeting
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 class="text-lg font-medium mt-8 mb-3">Why This Matters</h4>
              <p class="mb-3">Yellow and Turquoise approaches can help us overcome the limitations of first-tier thinking by:</p>
              
              <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-700">
                      <strong>Breaking through deadlocks</strong> - Instead of endless debates between different worldviews, integrate the healthy aspects of each approach
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-700">
                      <strong>Creating sustainable solutions</strong> - Address root causes rather than symptoms, and design for long-term viability
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-700">
                      <strong>Supporting development</strong> - Create conditions for individuals and societies to develop healthier, more complex ways of thinking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          title: "What You Can Do: Moving Toward Yellow and Turquoise",
          content: `
            <div class="mb-8">
              <p class="mb-4">So what can you personally do to help our world move toward more integrated, second-tier approaches to global challenges?</p>
              
              <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div class="bg-gradient-to-r from-yellow-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                  <h4 class="text-lg font-medium text-center text-gray-800">5 Practical Steps Anyone Can Take</h4>
                </div>
                
                <div class="divide-y divide-gray-200">
                  <div class="p-6">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">1</div>
                      </div>
                      <div class="ml-4">
                        <h5 class="text-lg font-medium text-gray-900">Develop Your Own Perspective-Taking</h5>
                        <p class="mt-1 text-gray-600">Practice deliberately looking at issues from different Spiral stages. When you encounter a perspective that differs from yours, ask: "What legitimate concerns might this worldview be addressing?"</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-6">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">2</div>
                      </div>
                      <div class="ml-4">
                        <h5 class="text-lg font-medium text-gray-900">Bridge Conversations Across Worldviews</h5>
                        <p class="mt-1 text-gray-600">Learn to "translate" between different value systems. For example, frame environmental protection in terms of stewardship (Blue), economic opportunities (Orange), and social justice (Green) when speaking to different audiences.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-6">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">3</div>
                      </div>
                      <div class="ml-4">
                        <h5 class="text-lg font-medium text-gray-900">Support Integrative Organizations</h5>
                        <p class="mt-1 text-gray-600">Seek out and support businesses, nonprofits, and political initiatives that balance multiple perspectives and work toward systemic solutions rather than ideological purity.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-6">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-semibold">4</div>
                      </div>
                      <div class="ml-4">
                        <h5 class="text-lg font-medium text-gray-900">Practice Systems Thinking</h5>
                        <p class="mt-1 text-gray-600">When facing a challenge, map out how different elements interact. Look for root causes, feedback loops, and unintended consequences. Ask "What's the larger system at play here?" rather than seeking quick fixes.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-6">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">5</div>
                      </div>
                      <div class="ml-4">
                        <h5 class="text-lg font-medium text-gray-900">Foster Your Own Development</h5>
                        <p class="mt-1 text-gray-600">Engage with practices that support your growth: meditation, deep reading, exposure to diverse perspectives, and reflection on your own thinking patterns. The more we develop ourselves, the more we can contribute to collective evolution.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="text-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
                <h4 class="text-lg font-medium text-gray-900 mb-3">The Promise of Second-Tier Thinking</h4>
                <p class="text-gray-700 mb-4">By cultivating Yellow and Turquoise consciousness, individually and collectively, we develop the capacity to address the unprecedented challenges of our time with wisdom, compassion, and effectiveness.</p>
                <p class="text-gray-700 font-medium">Every step toward more integrated thinking helps create a world that works for all of humanity and the broader living systems we depend on.</p>
              </div>
            </div>
          `
        }
      ]
    },
    sv: {
      title: "Globala Perspektiv",
      subtitle: "Hur Olika Världsbilder Formar Våra Gemensamma Utmaningar",
      introduction: "Hur vi ser på världen formar hur vi försöker lösa våra största problem. Denna sida utför dagens globala utmaningar genom linsen av Spiral Dynamics och utforskar hur olika världsbilder påverkar våra svar på dem.",

      sections: [
        {
          title: "Hur Vi Ser på Världen Idag",
          content: `
            <div class="mb-8">
              <p class="mb-4">Dagens värld är en blandning av olika värderingar och världsbilder som samverkar:</p>
              
              <div class="grid md:grid-cols-2 gap-6 my-6">
                <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h4 class="font-semibold text-blue-800 mb-2">Blått: Traditionella Värderingar</h4>
                  <p class="text-gray-700 mb-3">Fokuserar på ordning, rätt mot fel och att följa etablerade regler.</p>
                  <p class="text-sm text-gray-600"><strong>Exempel:</strong> Religiösa institutioner, konservativa politiska rörelser, militära organisationer</p>
                </div>
                
                <div class="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <h4 class="font-semibold text-orange-800 mb-2">Orange: Prestation & Framsteg</h4>
                  <p class="text-gray-700 mb-3">Fokuserar på framgång, innovation, vetenskap och konkurrensutsatta marknader.</p>
                  <p class="text-sm text-gray-600"><strong>Exempel:</strong> Företag, tech-startups, mainstream-ekonomi</p>
                </div>
                
                <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h4 class="font-semibold text-green-800 mb-2">Grönt: Jämlikhet & Gemenskap</h4>
                  <p class="text-gray-700 mb-3">Fokuserar på rättvisa, inkludering, miljöskydd och gemensamt beslutsfattande.</p>
                  <p class="text-sm text-gray-600"><strong>Exempel:</strong> Progressiva rörelser, NGO:er, humanistiska institutioner vid universitet</p>
                </div>
                
                <div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                  <h4 class="font-semibold text-yellow-800 mb-2">Gult: Systemtänkande</h4>
                  <p class="text-gray-700 mb-3">Fokuserar på att förstå komplexitet, integration och flexibel anpassning.</p>
                  <p class="text-sm text-gray-600"><strong>Exempel:</strong> Framväxande hos systemtänkare, komplexitetsforskare och integrala praktiker. Noterbara exempel inkluderar Sveriges <a href="https://www.fjarilspartiet.se" class="text-blue-600 hover:underline">Fjärilspartiet</a>, som explicit tillämpar systemtänkande och utvecklingspsykologiska ramverk inom politiken, och avancerade AI-system designade för att integrera flera perspektiv och anpassa sig till komplexa sammanhang.</p>
                </div>
              </div>
              
              <p>Dessa olika världsbilder kolliderar ofta när vi försöker tackla våra största problem, vilket leder till dödläge istället för lösningar.</p>
            </div>
          `
        },
        {
          title: "Regional Utveckling: Var Befinner Vi Oss på Spiraltrappan?",
          content: `
            <p class="mb-6">Olika regioner och grupper runt om i världen visar olika tyngdpunkter i sina värderingar och världsbilder. Även om individer inom en region kan befinna sig på olika stadier, hjälper dessa mönster oss att förstå globala dynamiker.</p>
            
            <div class="overflow-x-auto mb-8">
              <table class="min-w-full bg-white border border-gray-200">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="py-3 px-4 text-left">Region/Grupp</th>
                    <th class="py-3 px-4 text-left">Dominanta Värderingar</th>
                    <th class="py-3 px-4 text-left">Växande Kant</th>
                    <th class="py-3 px-4 text-left">Nyckelspänningar</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td class="py-3 px-4 font-medium">USA</td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Orange</span>
                      <span class="text-sm text-gray-600 ml-2">dominant</span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Grönt</span> 
                      <span class="text-sm text-gray-600 ml-2">växande</span>
                    </td>
                    <td class="py-3 px-4">Blått-Orange-Grönt kulturell klyfta (Republikaner ofta Blått-Orange, Demokrater ofta Orange-Grönt)</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-medium">Västeuropa</td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Orange</span>
                      <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm ml-1">Grönt</span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Gult</span>
                      <span class="text-sm text-gray-600 ml-2">framväxande</span>
                    </td>
                    <td class="py-3 px-4">Balansera ekonomiskt framsteg med social välfärd; integration av invandring</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-medium">Kina</td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Blått</span>
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm ml-1">Orange</span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Orange</span>
                      <span class="text-sm text-gray-600 ml-2">expanderande</span>
                    </td>
                    <td class="py-3 px-4">Snabb modernisering samtidigt som social stabilitet upprätthålls; balansera tillväxt med hållbarhet</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-medium">Subsahariska Afrika</td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Lila</span>
                      <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm ml-1">Blått</span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Orange</span>
                      <span class="text-sm text-gray-600 ml-2">framväxande</span>
                    </td>
                    <td class="py-3 px-4">Traditionella värderingar samtidigt som snabb teknisk anpassning; behov av hållbar utveckling</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-medium">Företag & Corporationer</td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Blått</span>
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm ml-1">Orange</span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Grönt</span>
                      <span class="text-sm text-gray-600 ml-2">växande</span>
                    </td>
                    <td class="py-3 px-4">Vinst mot syfte; intressentkapitalism; miljöansvar</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-medium">Global Styrning</td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Blått</span>
                      <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm ml-1">Orange</span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Grönt</span>
                      <span class="text-sm text-gray-600 ml-2">växande</span>
                    </td>
                    <td class="py-3 px-4">Nationell suveränitet mot globalt samarbete; hantera transnationella utmaningar</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="bg-gray-100 p-6 rounded-lg mb-6">
              <h4 class="font-medium text-gray-900 mb-2">Förståelse av denna Tabell</h4>
              <p class="text-gray-700 text-sm">Detta är en förenklad översikt som visar generella mönster. Kom ihåg att:</p>
              <ul class="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                <li>Individer inom en region kan befinna sig på olika stadier</li>
                <li>De flesta samhällen innehåller en blandning av alla värdesystem</li>
                <li>Varje stadium har hälsosamma och ohälsosamma uttryck</li>
                <li>Utveckling är inte en tävling - varje stadium har sina styrkor</li>
              </ul>
            </div>
          `
        },
        {
          title: "Globala Utmaningar Sett Genom Olika Linser",
          subsections: [
            {
              title: "Klimatförändringar: Olika Världsbilder, Olika Lösningar",
              content: `
                <div class="mb-6">
                  <p class="mb-4">Klimatförändringar ser helt olika ut beroende på din världsbild:</p>
                  
                  <div class="relative py-8">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center">
                      <span class="bg-white px-3 text-lg font-medium text-gray-900">Hur Olika Världsbilder Ser på Klimatförändringar</span>
                    </div>
                  </div>
                  
                  <div class="overflow-hidden rounded-lg border border-gray-200 shadow-sm divide-y divide-gray-200 mb-6">
                    <div class="px-4 py-5 sm:px-6 bg-blue-50">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                          <span class="text-xl">🏛️</span>
                        </div>
                        <div class="ml-4">
                          <h4 class="text-lg font-medium text-blue-800">Blått Perspektiv</h4>
                          <p class="text-blue-600">"Vi måste vara ansvariga förvaltare av Guds skapelse"</p>
                        </div>
                      </div>
                      <div class="mt-3 pl-14">
                        <p class="text-gray-700 mb-2">Ser klimatförändringar genom moraliska och religiösa ramverk</p>
                        <ul class="list-disc pl-5 text-gray-600 text-sm">
                          <li>Kan betona personligt ansvar och bevarande</li>
                          <li>Ofta skeptiska till globala styrningslösningar</li>
                          <li>Fokus på traditionella värderingar och förvaltarskap</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div class="px-4 py-5 sm:px-6 bg-orange-50">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-700">
                          <span class="text-xl">📈</span>
                        </div>
                        <div class="ml-4">
                          <h4 class="text-lg font-medium text-orange-800">Orange Perspektiv</h4>
                          <p class="text-orange-600">"Teknik och marknader kommer att lösa detta problem"</p>
                        </div>
                      </div>
                      <div class="mt-3 pl-14">
                        <p class="text-gray-700 mb-2">Ser klimatförändringar som en teknisk och ekonomisk utmaning</p>
                        <ul class="list-disc pl-5 text-gray-600 text-sm">
                          <li>Betonar innovation, koldioxidprissättning och incitament</li>
                          <li>Fokuserar på ekonomisk tillväxt samtidigt som utsläpp minskas</li>
                          <li>Främjar tekniska lösningar som förnybar energi</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div class="px-4 py-5 sm:px-6 bg-green-50">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                          <span class="text-xl">🌍</span>
                        </div>
                        <div class="ml-4">
                          <h4 class="text-lg font-medium text-green-800">Grönt Perspektiv</h4>
                          <p class="text-green-600">"Vi måste radikalt förändra vårt förhållande till naturen"</p>
                        </div>
                      </div>
                      <div class="mt-3 pl-14">
                        <p class="text-gray-700 mb-2">Ser klimatförändringar som en moralisk och social rättvisefråga</p>
                        <ul class="list-disc pl-5 text-gray-600 text-sm">
                          <li>Betonar rättvisa, miljörättvisa och systemförändring</li>
                          <li>Ofta kritisk mot kapitalism och konsumtionsmönster</li>
                          <li>Främjar community-baserade lösningar och indigen kunskap</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div class="px-4 py-5 sm:px-6 bg-yellow-50">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700">
                          <span class="text-xl">🔄</span>
                        </div>
                        <div class="ml-4">
                          <h4 class="text-lg font-medium text-yellow-800">Gul/Turkos Integration</h4>
                          <p class="text-yellow-600">"Vi behöver adaptiva, integrerade tillvägagångssätt på flera nivåer"</p>
                        </div>
                      </div>
                      <div class="mt-3 pl-14">
                        <p class="text-gray-700 mb-2">Ser utmaningar som komplexa adaptiva system som kräver integrerade lösningar</p>
                        <ul class="list-disc pl-5 text-gray-600 text-sm">
                          <li>Kombinerar teknisk innovation med kulturella och beteendemässiga förändringar</li>
                          <li>Integrerar marknadsmekanismer med lämpliga regleringar</li>
                          <li>Balanserar omedelbara behov med långsiktig evolution</li>
                          <li>Skapar flexibel styrning som kan utvecklas med förändrade förhållanden</li>
                          <li>Exempel: Fjärilspartiets systembaserade politiska approach som kombinerar evidensbaserad politik med utvecklingspsykologiska ramverk; Avancerade AI-system designade för att integrera flera perspektiv och anpassa sig till komplexa sammanhang</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <p>Dessa olika världsbilder är anledningen till att vi ofta pratar förbi varandra när vi diskuterar klimatlösningar—vi utgår från helt olika förståelser av problemet.</p>
                </div>
              `
            },
            {
              title: "Ekonomisk Ojämlikhet: Olika Värderingar, Olika Prioriteringar",
              content: `
                <div class="mb-6">
                  <p class="mb-4">Våra syner på rikedom och fattigdom formas av våra underliggande värderingar:</p>
                
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div class="bg-blue-50 p-6 rounded-lg">
                      <h4 class="font-medium text-blue-800 mb-3">Blått Världsperspektiv</h4>
                      <p class="italic mb-3">"Barmhärtighet och moraliskt ansvar"</p>
                      <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
                        <li>Fokus på personligt moraliskt ansvar att hjälpa andra</li>
                        <li>Betoning på välgörenhet och volontärarbete</li>
                        <li>Traditionella stödsystem och religiösa institutioner</li>
                      </ul>
                    </div>
                    
                    <div class="bg-orange-50 p-6 rounded-lg">
                      <h4 class="font-medium text-orange-800 mb-3">Orange Världsperspektiv</h4>
                      <p class="italic mb-3">"Möjligheter och ekonomisk tillväxt"</p>
                      <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
                        <li>Fokus på att skapa ekonomiska möjligheter</li>
                        <li>Betoning på utbildning och entreprenörskap</li>
                        <li>Accepterar ojämlikhet som en drivkraft för prestation</li>
                      </ul>
                    </div>
                    
                    <div class="bg-green-50 p-6 rounded-lg">
                      <h4 class="font-medium text-green-800 mb-3">Grönt Världsperspektiv</h4>
                      <p class="italic mb-3">"Strukturell rättvisa och omfördelning"</p>
                      <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
                        <li>Fokus på att hantera systemisk orättvisa</li>
                        <li>Betoning på rättvisa och omfördelning</li>
                        <li>Kritisk mot ekonomiska system som skapar ojämlikhet</li>
                      </ul>
                    </div>
                    
                    <div class="bg-yellow-50 p-6 rounded-lg">
                      <h4 class="font-medium text-yellow-800 mb-3">Gult/Turkos Integration</h4>
                      <p class="italic mb-3">"Utvecklande ekosystem för kollektivt välbefinnande"</p>
                      <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
                        <li>Balanserar skapande av rikedom med rättvis fördelning</li>
                        <li>Skapar system som utvecklar mänsklig potential</li>
                        <li>Designar ekonomier som tjänar mänskligheten och planeten</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p>Ett integrerat tillvägagångssätt erkänner att ekonomiska system måste både skapa välstånd och säkerställa att det delas brett, samtidigt som de utvecklar mänsklig potential på alla nivåer.</p>
                </div>
              `
            },
            {
              title: "Politisk Polarisation: En Kollision av Världsbilder",
              content: `
                <div class="mb-6">
                  <p class="mb-4">Politiska divisioner reflekterar ofta djupare skillnader i hur vi ser på världen:</p>
                  
                  <div class="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                    <div class="px-6 py-4 bg-gray-50 text-center">
                      <h4 class="font-medium text-gray-900">USA:s Politiska Spektrum Genom en Spiral Dynamics-lins</h4>
                    </div>
                    
                    <div class="flex flex-col md:flex-row">
                      <div class="flex-1 p-6 bg-gradient-to-r from-blue-50 to-red-50">
                        <h5 class="font-medium text-center mb-3">Konservativt Perspektiv</h5>
                        <div class="flex items-center justify-center space-x-1 mb-4">
                          <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Blått</span>
                          <span class="text-gray-400">+</span>
                          <span class="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-sm">Rött</span>
                          <span class="text-gray-400">+</span>
                          <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Orange</span>
                        </div>
                        <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
                          <li>Betoning på traditionella värderingar och ordning (Blått)</li>
                          <li>Skydd av individuella friheter (Rött/Orange)</li>
                          <li>Fri marknadsekonomi (Orange)</li>
                          <li>Stark nationell identitet och säkerhet (Blått/Rött)</li>
                        </ul>
                      </div>
                      
                      <div class="flex-1 p-6 bg-gradient-to-r from-orange-50 to-green-50">
                        <h5 class="font-medium text-center mb-3">Progressivt Perspektiv</h5>
                        <div class="flex items-center justify-center space-x-1 mb-4">
                          <span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Orange</span>
                          <span class="text-gray-400">+</span>
                          <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Grönt</span>
                        </div>
                        <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
                          <li>Betoning på social jämlikhet och inkludering (Grönt)</li>
                          <li>Stöd för kulturell mångfald (Grönt)</li>
                          <li>Miljöskydd (Grönt)</li>
                          <li>Innovation och framsteg (Orange)</li>
                          <li>Globalt samarbete (Orange/Grönt)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div class="px-6 py-4 bg-yellow-50 border-t border-gray-200">
                      <h5 class="font-medium text-center text-yellow-800 mb-3">Överbryggande Perspektiv (Gult/Turkos)</h5>
                      <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
                        <li>Respekterar de giltiga oro som alla världsbilder har</li>
                        <li>Ser ordning, frihet, prestation och jämlikhet som nödvändiga polariteter att balansera</li>
                        <li>Skapar flexibel styrning som integrerar traditionell visdom med innovation</li>
                        <li>Fokuserar på hela utvecklingsspektrumets hälsa</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p>Politisk polarisering handlar inte bara om olika policys—det handlar om fundamentalt olika sätt att se vad som är viktigt i livet. Att förstå dessa skillnader kan hjälpa oss att ha mer produktiva samtal över gränserna.</p>
                </div>
              `
            }
          ]
        },
        {
          title: "Hur Gula och Turkosa Lösningar Ser ut i Praktiken",
          content: `
            <div class="mb-8">
              <p class="mb-4">Hur kan andra-nivå-tillvägagångssätt till våra största problem faktiskt se ut i praktiken?</p>
              
              <div class="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-gray-200">
                  <h4 class="font-medium text-lg text-center">Gula/Turkosa Lösningar i Aktion</h4>
                </div>
                
                <div class="p-6">
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="bg-gray-50 p-5 rounded-lg">
                      <div class="flex items-center mb-3">
                        <div class="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 mr-3">
                          <span class="text-xl">🔄</span>
                        </div>
                        <h5 class="font-medium">Regenerativa Ekonomier</h5>
                      </div>
                      <p class="text-sm text-gray-600 mb-3">Ekonomiska modeller som kombinerar lönsamhet med ekologisk regenerering och mänsklig utveckling</p>
                      <div class="text-xs text-gray-500">
                        <strong>Exempel:</strong> Regenerativt jordbruk, cirkulära ekonomier, B-Corps, intressentkapitalism
                      </div>
                    </div>
                    
                    <div class="bg-gray-50 p-5 rounded-lg">
                      <div class="flex items-center mb-3">
                        <div class="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 mr-3">
                          <span class="text-xl">🧩</span>
                        </div>
                        <h5 class="font-medium">Polaritetshantering</h5>
                      </div>
                      <p class="text-sm text-gray-600 mb-3">Tillvägagångssätt som balanserar till synes motsatta värden som individuell frihet och kollektivt välbefinnande</p>
                      <div class="text-xs text-gray-500">
                        <strong>Exempel:</strong> Nordiska ekonomiska modeller, Integrativ hälsovård, Både/Och-ledarskap
                      </div>
                    </div>
                    
                    <div class="bg-gray-50 p-5 rounded-lg">
                      <div class="flex items-center mb-3">
                        <div class="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 mr-3">
                          <span class="text-xl">🌐</span>
                        </div>
                        <h5 class="font-medium">Multi-stakeholder-styrning</h5>
                      </div>
                      <p class="text-sm text-gray-600 mb-3">Beslutsfattande som inkluderar perspektiv från företag, regeringar, civilsamhället och berörda samhällen</p>
                      <div class="text-xs text-gray-500">
                        <strong>Exempel:</strong> Vattenförvaltningsråd, fredsbyggande initiativ, deltagande budgetering
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 class="text-lg font-medium mt-8 mb-3">Varför Detta är Viktigt</h4>
              <p class="mb-3">Gula och Turkosa tillvägagångssätt kan hjälpa oss att övervinna begränsningarna i första-nivå-tänkande genom att:</p>
              
              <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-700">
                      <strong>Bryta igenom dödlägen</strong> - Istället för oändliga debatter mellan olika världsbilder, integrera de hälsosamma aspekterna av varje tillvägagångssätt
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-700">
                      <strong>Skapa hållbara lösningar</strong> - Adressera rotorsaker istället för symptom och designa för långsiktig hållbarhet
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-700">
                      <strong>Stödja utveckling</strong> - Skapa förutsättningar för individer och samhällen att utveckla hälsosammare, mer komplexa sätt att tänka
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          title: "Vad Du Kan Göra: Röra oss Mot Gult och Turkos",
          content: `
            <div class="mb-8">
              <p class="mb-4">Så vad kan du personligen göra för att hjälpa vår värld att röra sig mot mer integrerade, andra-nivå-tillvägagångssätt till globala utmaningar?</p>
              
              <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div class="bg-gradient-to-r from-yellow-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                  <h4 class="text-lg font-medium text-center text-gray-800">5 Praktiska Steg Som Alla Kan Ta</h4>
                </div>
                
                <div class="divide-y divide-gray-200">
                  <div class="p-6">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">1</div>
                      </div>
                      <div class="ml-4">
                        <h5 class="text-lg font-medium text-gray-900">Utveckla Ditt Eget Perspektivtagande</h5>
                        <p class="mt-1 text-gray-600">Öva på att medvetet se på frågor från olika Spiral-stadier. När du stöter på ett perspektiv som skiljer sig från ditt, fråga: "Vilka legitima oro kan denna världsbild adressera?"</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-6">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">2</div>
                      </div>
                      <div class="ml-4">
                        <h5 class="text-lg font-medium text-gray-900">Överbrygga Samtal Mellan Världsbilder</h5>
                        <p class="mt-1 text-gray-600">Lär dig att "översätta" mellan olika värdesystem. Till exempel, formulera miljöskydd i termer av förvaltarskap (Blått), ekonomiska möjligheter (Orange) och social rättvisa (Grönt) när du talar till olika målgrupper.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-6">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">3</div>
                      </div>
                      <div class="ml-4">
                        <h5 class="text-lg font-medium text-gray-900">Stödja Integrerande Organisationer</h5>
                        <p class="mt-1 text-gray-600">Sök upp och stöd företag, ideella organisationer och politiska initiativ som balanserar flera perspektiv och arbetar mot systemlösningar istället för ideologisk renhet.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-6">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-semibold">4</div>
                      </div>
                      <div class="ml-4">
                        <h5 class="text-lg font-medium text-gray-900">Öva på Systemtänkande</h5>
                        <p class="mt-1 text-gray-600">När du står inför en utmaning, kartlägg hur olika element interagerar. Leta efter rotorsaker, feedback-loopar och oavsiktliga konsekvenser. Fråga "Vilket större system är i spel här?" istället för att söka snabba lösningar.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-6">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">5</div>
                      </div>
                      <div class="ml-4">
                        <h5 class="text-lg font-medium text-gray-900">Främja Din Egen Utveckling</h5>
                        <p class="mt-1 text-gray-600">Engagera dig i praktiker som stödjer din utveckling: meditation, djup läsning, exponering för olika perspektiv och reflektion över dina egna tankemönster. Ju mer vi utvecklar oss själva, desto mer kan vi bidra till kollektiv evolution.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="text-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
                <h4 class="text-lg font-medium text-gray-900 mb-3">Löftet om Andra-Nivå-Tänkande</h4>
                <p class="text-gray-700 mb-4">Genom att odla Gult och Turkos medvetande, individuellt och kollektivt, utvecklar vi förmågan att adressera vår tids utan motstycke utmaningar med visdom, medkänsla och effektivitet.</p>
                <p class="text-gray-700 font-medium">Varje steg mot mer integrerat tänkande hjälper till att skapa en värld som fungerar för hela mänskligheten och de bredare levande system vi är beroende av.</p>
              </div>
            </div>
          `
        }
      ]
    }
  };

  $: t = translations[currentLanguage];
  
  $: title = currentLanguage === 'en'
    ? 'Global Perspectives | Spiralize'
    : 'Globala Perspektiv | Spiralize';
    
  $: description = currentLanguage === 'en'
    ? 'Explore how Spiral Dynamics can help us understand and address major global challenges like climate change, inequality, and social polarization.'
    : 'Utforska hur Spiral Dynamics kan hjälpa oss att förstå och hantera stora globala utmaningar som klimatförändringar, ojämlikhet och social polarisering.';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description}>
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="twitter:title" content={title}>
  <meta property="twitter:description" content={description}>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-5xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {t.title}
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        {t.subtitle}
      </p>
    </div>

    <!-- Introduction -->
    <div class="bg-white rounded-xl shadow-sm p-8 mb-12">
      <p class="text-lg text-gray-700">
        {t.introduction}
      </p>
    </div>

    <!-- Main Content -->
    <div class="space-y-12">
      {#each t.sections as section, i}
        <section class="bg-white rounded-xl shadow-sm overflow-hidden">
          <div class="p-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">
              {section.title}
            </h2>
            
            {#if section.content}
              <div class="prose max-w-none text-gray-700">
                {@html section.content}
              </div>
            {/if}
            
            {#if section.subsections}
              <div class="space-y-8 mt-8">
                {#each section.subsections as subsection}
                  <div class="bg-gray-50 rounded-lg p-6">
                    <h3 class="text-xl font-medium text-gray-900 mb-4">
                      {subsection.title}
                    </h3>
                    <div class="prose max-w-none text-gray-700">
                      {@html subsection.content}
                    </div>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </section>
      {/each}
    </div>
  </div>
  
  <br>
  <ShareButtons />
  <br>
</div>
