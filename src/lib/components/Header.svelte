<script lang="ts">
  import { base } from '$app/paths';
  import { slide } from 'svelte/transition';
  import languageStore from '$lib/stores/languageStore';
  
  // Use language store directly
  const { language, toggleLanguage } = languageStore;
  $: currentLanguage = $language;

  // Mobile menu state
  let isMobileMenuOpen = false;
  
  // Dropdown states for different menus
  let homeDropdownOpen = false;
  let insightsDropdownOpen = false;
  let guidesDropdownOpen = false; // New dropdown state
  
  // Reference to dropdown elements
  let homeDropdownEl: HTMLElement;
  let homeButtonEl: HTMLElement;
  let insightsDropdownEl: HTMLElement;
  let insightsButtonEl: HTMLElement;
  let guidesDropdownEl: HTMLElement; // New dropdown element
  let guidesButtonEl: HTMLElement; // New button element
  
  // Helper functions to toggle dropdowns
  function toggleHomeDropdown(event?: MouseEvent | TouchEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    homeDropdownOpen = !homeDropdownOpen;
    // Close other dropdowns when opening this one
    if (homeDropdownOpen) {
      insightsDropdownOpen = false;
      guidesDropdownOpen = false;
    }
  }
  
  function toggleInsightsDropdown(event?: MouseEvent | TouchEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    insightsDropdownOpen = !insightsDropdownOpen;
    // Close other dropdowns when opening this one
    if (insightsDropdownOpen) {
      homeDropdownOpen = false;
      guidesDropdownOpen = false;
    }
  }
  
  // New function to toggle guides dropdown
  function toggleGuidesDropdown(event?: MouseEvent | TouchEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    guidesDropdownOpen = !guidesDropdownOpen;
    // Close other dropdowns when opening this one
    if (guidesDropdownOpen) {
      homeDropdownOpen = false;
      insightsDropdownOpen = false;
    }
  }
  
  // Close dropdowns when pressing Escape
  function closeDropdowns() {
    homeDropdownOpen = false;
    insightsDropdownOpen = false;
    guidesDropdownOpen = false;
  }
  
  // Click outside to close dropdowns
  function handleClickOutside(event: MouseEvent | TouchEvent) {
    const target = event.target as Node;
    
    // Handle insights dropdown
    if (insightsDropdownEl && insightsButtonEl && 
        insightsDropdownOpen &&
        !insightsDropdownEl.contains(target) && 
        !insightsButtonEl.contains(target)) {
      insightsDropdownOpen = false;
    }
    
    // Handle home dropdown
    if (homeDropdownEl && homeButtonEl && 
        homeDropdownOpen &&
        !homeDropdownEl.contains(target) && 
        !homeButtonEl.contains(target)) {
      homeDropdownOpen = false;
    }
    
    // Handle guides dropdown
    if (guidesDropdownEl && guidesButtonEl && 
        guidesDropdownOpen &&
        !guidesDropdownEl.contains(target) && 
        !guidesButtonEl.contains(target)) {
      guidesDropdownOpen = false;
    }
  }

  // Links for navigation
  const navLinks = [
    { 
      label: { en: "Home", sv: "Hem" },
      isDropdown: true,
      id: 'home',
      children: [
        { href: `${base}/`, label: { en: "🏠 Home", sv: "🏠 Hem" } },
        { href: `${base}/start`, label: { en: "🌀 Start Here", sv: "🌀 Börja här" } },
      ]
    },
    { href: `${base}/spiral`, label: { en: "Explore", sv: "Utforska" } },
    { href: `${base}/origins`, label: { en: "Origins", sv: "Historia" } },
    { href: `${base}/quiz`, label: { en: "Quiz", sv: "Test" } },
    // Insights dropdown
    { 
      label: { en: "Insights", sv: "Insikter" },
      isDropdown: true,
      id: 'insights',
      children: [
        { href: `${base}/insights/personal`, label: { en: "🪞 Personal Insights", sv: "🪞 Personliga Insikter" } },
        { href: `${base}/insights/spiral-psychology`, label: { en: "🧠 Spiral-Aware Psychology", sv: "🧠 Spiralmedveten Psykologi" } },
        { href: `${base}/insights/global`, label: { en: "🌍 Global Perspectives", sv: "🌍 Globala Perspektiv" } },
        { href: `${base}/insights/governance`, label: { en: "🧭 Conscious Governance", sv: "🧭 Medveten Styrning" } },
        { href: `${base}/insights/peace`, label: { en: "🕊️ Peace Trough Evolution", sv: "🕊️ Fred Genom Evolution" } },
        { href: `${base}/insights/ai-assistants`, label: { en: "🤖 AI-assistants on the Spiral", sv: "🤖 AI-assistenter på spiralen" } },
        { href: `${base}/insights/poetry`, label: { en: "🎙️ Spiral Poetry", sv: "🎙️ Spiralpoesi" } 
}
      ]
    },
    // New guides dropdown
    { 
      label: { en: "Guides", sv: "Guider" },
      isDropdown: true,
      id: 'guides',
      children: [
        { 
          href: `${base}/guide-personal`, 
          label: { 
            en: "🌱 Personal Spiral Growth Guide", 
            sv: "🌱 Personlig Spiral-Utvecklingsguide" 
          }
        },
        { 
          href: `${base}/guide-parenting`, 
          label: { 
            en: "👶 Parenting & Education Guide", 
            sv: "👶 Föräldraskap & Utbildning" 
          }
        },
        { 
          href: `${base}/guide-leadership`, 
            label: { 
              en: "🧭 Coaching & Leadership Toolkit", 
              sv: "🧭 Coaching- och Ledarskapsverktyg" 
            }
        },
        { 
          href: `${base}/guide-organizations`, 
          label: { 
            en: "🏢 Spiralizing Organizations & Communities", 
            sv: "🏢 Spiralisera Organisationer & Gemenskaper" 
          }
        },
        { 
          href: `${base}/guide-psychological`, 
          label: { 
            en: "🧠 Spiral-Aware Mental Health Guide", 
            sv: "🧠 Spiralmedveten Mental Hälsa Guide" 
          }
        }
      ]
    },
    { href: `${base}/contact`, label: { en: "Contact", sv: "Kontakt" } },
    { href: `${base}/about`, label: { en: "About", sv: "Om" } }
  ];

  function toggleMobileMenu(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    event.stopPropagation();
    isMobileMenuOpen = !isMobileMenuOpen;
    if (!isMobileMenuOpen) {
      closeDropdowns();
    }
  }

  function closeMobileMenu(event?: Event) {
    // Only prevent default if we're not dealing with a link click
    if (event && !(event.target as HTMLElement).closest('a[href]')) {
      event.preventDefault();
    }
    isMobileMenuOpen = false;
    closeDropdowns();
  }

  // Handle escape key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      isMobileMenuOpen = false;
      closeDropdowns();
    }
  }
  
  // Toggle mobile submenu
  function toggleMobileSubmenu(event: Event, id: string) {
    event.preventDefault();
    event.stopPropagation();
    
    // Small delay to ensure the click event is fully processed
    setTimeout(() => {
      if (id === 'home') {
        homeDropdownOpen = !homeDropdownOpen;
        if (homeDropdownOpen) {
          insightsDropdownOpen = false;
          guidesDropdownOpen = false;
        }
      } else if (id === 'insights') {
        insightsDropdownOpen = !insightsDropdownOpen;
        if (insightsDropdownOpen) {
          homeDropdownOpen = false;
          guidesDropdownOpen = false;
        }
      } else if (id === 'guides') {
        guidesDropdownOpen = !guidesDropdownOpen;
        if (guidesDropdownOpen) {
          homeDropdownOpen = false;
          insightsDropdownOpen = false;
        }
      }
    }, 50);
  }

  function handleMobileLinkClick(event: Event) {
    // Don't close immediately - let the navigation happen
    setTimeout(() => {
      closeMobileMenu();
    }, 300); // Short delay to ensure navigation occurs
  }

</script>

<svelte:window on:keydown={handleKeydown} on:click|stopPropagation={handleClickOutside} on:touchstart|stopPropagation={handleClickOutside} />

<header class="bg-gradient-to-br from-purple-600 to-purple-800 text-white relative">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div class="flex justify-between items-center">
      <!-- Logo and site name -->
      <a href={`${base}/`} class="flex items-center gap-2 hover:text-purple-300 transition-colors">
        <img 
          src={`${base}/logo192.png`}
          alt="Spiralize" 
          class="w-8 h-8"
        />
        <span class="text-2xl font-bold">Spiralize</span>
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-6">
        {#each navLinks as link}
          {#if link.isDropdown}
            <!-- Dropdown parent -->
            <div class="relative group">
              {#if link.id === 'home'}
                <button 
                  bind:this={homeButtonEl}
                  class="text-lg hover:text-purple-300 transition-colors flex items-center gap-1"
                  aria-expanded={homeDropdownOpen}
                  aria-haspopup="true"
                  on:click|stopPropagation={toggleHomeDropdown}
                  on:touchstart|stopPropagation={toggleHomeDropdown}
                >
                  {link.label[currentLanguage]}
                  <svg 
                    class="w-4 h-4 ml-1 transition-transform duration-200" 
                    class:rotate-180={homeDropdownOpen}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <!-- Home Dropdown menu -->
                {#if homeDropdownOpen}
                  <div 
                    bind:this={homeDropdownEl}
                    class="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10"
                    transition:slide={{ duration: 150 }}
                  >
                    {#each link.children as child}
                      <a 
                        href={child.href}
                        class="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                        on:click|stopPropagation={closeDropdowns}
                      >
                        {child.label[currentLanguage]}
                      </a>
                    {/each}
                  </div>
                {/if}
              {:else if link.id === 'insights'}
                <button 
                  bind:this={insightsButtonEl}
                  class="text-lg hover:text-purple-300 transition-colors flex items-center gap-1"
                  aria-expanded={insightsDropdownOpen}
                  aria-haspopup="true"
                  on:click|stopPropagation={toggleInsightsDropdown}
                  on:touchstart|stopPropagation={toggleInsightsDropdown}
                >
                  {link.label[currentLanguage]}
                  <svg 
                    class="w-4 h-4 ml-1 transition-transform duration-200" 
                    class:rotate-180={insightsDropdownOpen}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <!-- Insights Dropdown menu -->
                {#if insightsDropdownOpen}
                  <div 
                    bind:this={insightsDropdownEl}
                    class="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10"
                    transition:slide={{ duration: 150 }}
                  >
                    {#each link.children as child}
                      <a 
                        href={child.href}
                        class="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                        on:click|stopPropagation={closeDropdowns}
                      >
                        {child.label[currentLanguage]}
                        {#if child.href.includes('/poetry')}
                          <span class="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                            {currentLanguage === 'en' ? 'New' : 'Ny'}
                          </span>
                        {/if}
                      </a>
                    {/each}
                  </div>
                {/if}
              {:else if link.id === 'guides'}
                <!-- Guides dropdown button -->
                <button 
                  bind:this={guidesButtonEl}
                  class="text-lg hover:text-purple-300 transition-colors flex items-center gap-1"
                  aria-expanded={guidesDropdownOpen}
                  aria-haspopup="true"
                  on:click|stopPropagation={toggleGuidesDropdown}
                  on:touchstart|stopPropagation={toggleGuidesDropdown}
                >
                  {link.label[currentLanguage]}
                  <svg 
                    class="w-4 h-4 ml-1 transition-transform duration-200" 
                    class:rotate-180={guidesDropdownOpen}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <!-- Guides Dropdown menu -->
                {#if guidesDropdownOpen}
                  <div 
                    bind:this={guidesDropdownEl}
                    class="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10"
                    transition:slide={{ duration: 150 }}
                  >
                    {#each link.children as child}
                      <a 
                        href={child.href}
                        class="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                        on:click|stopPropagation={closeDropdowns}
                      >
                        {child.label[currentLanguage]}
                      </a>
                    {/each}
                  </div>
                {/if}
              {/if}
            </div>
          {:else}
            <!-- Regular nav link -->
            <a 
              href={link.href} 
              class="text-lg hover:text-purple-300 transition-colors"
            >
              {link.label[currentLanguage]}
            </a>
          {/if}
        {/each}
      </nav>

      <!-- Language Switcher -->
      <div class="hidden md:flex items-center space-x-4">
        <button
          class="text-purple-300 hover:text-white transition-colors"
          on:click={() => language.set("en")}
        >
          EN
        </button>
        <button
          class="text-purple-300 hover:text-white transition-colors"
          on:click={() => language.set("sv")}
        >
          SV
        </button>
      </div>

      <!-- Mobile menu button -->
      <button
        class="md:hidden p-2 rounded-lg hover:bg-purple-700 transition-colors"
        on:click={toggleMobileMenu}
        on:touchstart={toggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        {#if isMobileMenuOpen}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        {/if}
      </button>
    </div>

    <!-- Mobile menu -->
    {#if isMobileMenuOpen}
      <div
        id="mobile-menu"
        class="absolute top-full left-0 right-0 bg-purple-800 shadow-lg z-20"
        transition:slide={{ duration: 200 }}
      >
        <nav class="px-4 pt-2 pb-4 space-y-2">
          {#each navLinks as link}
            {#if link.isDropdown}
              <!-- Mobile dropdown parent -->
              <div>
                {#if link.id === 'home'}
                  <button 
                    class="flex items-center justify-between w-full py-2 text-lg hover:text-purple-300 transition-colors"
                    on:click={(e) => toggleMobileSubmenu(e, 'home')}
                    on:touchstart={(e) => toggleMobileSubmenu(e, 'home')}
                    aria-expanded={homeDropdownOpen}
                  >
                    <span>{link.label[currentLanguage]}</span>
                    <svg 
                      class="w-4 h-4 transform transition-transform duration-200" 
                      class:rotate-180={homeDropdownOpen}
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  
                  <!-- Mobile home dropdown submenu -->
                  {#if homeDropdownOpen}
                    <div class="pl-4 pt-1 pb-1 space-y-1" transition:slide={{ duration: 150 }}>
                      {#each link.children as child}
                        <a 
                          href={child.href}
                          class="block py-2 text-lg hover:text-purple-300 transition-colors pl-2 border-l border-purple-700"
                          on:click|stopPropagation={handleMobileLinkClick}
                          on:touchstart|stopPropagation={handleMobileLinkClick}
                        >
                          {child.label[currentLanguage]}
                        </a>
                      {/each}
                    </div>
                  {/if}
                {:else if link.id === 'insights'}
                  <button 
                    class="flex items-center justify-between w-full py-2 text-lg hover:text-purple-300 transition-colors"
                    on:click|stopPropagation={(e) => toggleMobileSubmenu(e, 'insights')}
                    on:touchstart|stopPropagation={(e) => toggleMobileSubmenu(e, 'insights')}
                    aria-expanded={insightsDropdownOpen}
                  >
                    <span>{link.label[currentLanguage]}</span>
                    <svg 
                      class="w-4 h-4 transform transition-transform duration-200" 
                      class:rotate-180={insightsDropdownOpen}
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  
                  <!-- Mobile insights dropdown submenu -->
                  {#if insightsDropdownOpen}
                    <div class="pl-4 pt-1 pb-1 space-y-1" transition:slide={{ duration: 150 }}>
                      {#each link.children as child}
                        <a 
                          href={child.href}
                          class="block py-2 text-lg hover:text-purple-300 transition-colors pl-2 border-l border-purple-700"
                          on:click|stopPropagation={handleMobileLinkClick}
                          on:touchstart|stopPropagation={handleMobileLinkClick}
                        >
                          {child.label[currentLanguage]}
                          {#if child.href.includes('/poetry')}
                            <span class="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                              {currentLanguage === 'en' ? 'New' : 'Ny'}
                            </span>
                          {/if}
                        </a>
                      {/each}
                    </div>
                  {/if}
                {:else if link.id === 'guides'}
                  <!-- Mobile guides dropdown -->
                  <button 
                    class="flex items-center justify-between w-full py-2 text-lg hover:text-purple-300 transition-colors"
                    on:click|stopPropagation={(e) => toggleMobileSubmenu(e, 'guides')}
                    on:touchstart|stopPropagation={(e) => toggleMobileSubmenu(e, 'guides')}
                    aria-expanded={guidesDropdownOpen}
                  >
                    <span>{link.label[currentLanguage]}</span>
                    <svg 
                      class="w-4 h-4 transform transition-transform duration-200" 
                      class:rotate-180={guidesDropdownOpen}
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  
                  <!-- Mobile guides dropdown submenu -->
                  {#if guidesDropdownOpen}
                    <div class="pl-4 pt-1 pb-1 space-y-1" transition:slide={{ duration: 150 }}>
                      {#each link.children as child}
                        <a 
                          href={child.href}
                          class="block py-2 text-lg hover:text-purple-300 transition-colors pl-2 border-l border-purple-700"
                          on:click|stopPropagation={handleMobileLinkClick}
                          on:touchstart|stopPropagation={handleMobileLinkClick}
                        >
                          {child.label[currentLanguage]}
                        </a>
                      {/each}
                    </div>
                  {/if}
                {/if}
              </div>
            {:else}
              <!-- Regular mobile link -->
              <a 
                href={link.href} 
                class="block py-2 text-lg hover:text-purple-300 transition-colors"
                on:click|stopPropagation={handleMobileLinkClick}
                on:touchstart|stopPropagation={handleMobileLinkClick}
              >
                {link.label[currentLanguage]}
              </a>
            {/if}
          {/each}

          <!-- Mobile Language Switcher -->
          <div class="pt-2 flex space-x-4 border-t border-purple-700">
            <button
              class="text-purple-300 hover:text-white transition-colors"
              on:click={() => {
                language.set("en");
                closeMobileMenu();
              }}
            >
              English
            </button>
            <button
              class="text-purple-300 hover:text-white transition-colors"
              on:click={() => {
                language.set("sv");
                closeMobileMenu();
              }}
            >
              Svenska
            </button>
          </div>
        </nav>
      </div>
    {/if}
  </div>
</header>
