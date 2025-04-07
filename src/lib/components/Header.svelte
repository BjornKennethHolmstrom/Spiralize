<script lang="ts">
  import { base } from '$app/paths';
  import { writable } from 'svelte/store';
  import { slide } from 'svelte/transition';
  
  // Language store
  export let language = writable("en");

  // Mobile menu state
  let isMobileMenuOpen = false;
  
  // Dropdown state for insights menu
  let insightsDropdownOpen = false;
  
  // Helper function to toggle dropdown
  function toggleInsightsDropdown() {
    insightsDropdownOpen = !insightsDropdownOpen;
  }
  
  // Close dropdown when pressing Escape
  function closeDropdown() {
    insightsDropdownOpen = false;
  }
  
  // Click outside to close dropdown
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    const dropdownEl = document.getElementById('insights-dropdown');
    const dropdownButton = document.getElementById('insights-dropdown-button');
    
    if (dropdownEl && dropdownButton && 
        !dropdownEl.contains(target) && 
        !dropdownButton.contains(target)) {
      insightsDropdownOpen = false;
    }
  }

  // Links for navigation
  const navLinks = [
    { href: `${base}/`, label: { en: "Home", sv: "Hem" } },
    { href: `${base}/spiral`, label: { en: "Explore", sv: "Utforska" } },
    { href: `${base}/origins`, label: { en: "Origins", sv: "Historia" } },
    { href: `${base}/quiz`, label: { en: "Quiz", sv: "Test" } },
    // Insights becomes a dropdown parent with no direct href
    { 
      label: { en: "Insights", sv: "Insikter" },
      isDropdown: true,
      children: [
        { href: `${base}/insights/personal`, label: { en: "Personal Insights", sv: "Personliga Insikter" } },
        { href: `${base}/insights/global`, label: { en: "Global Perspectives", sv: "Globala Perspektiv" } },
        { href: `${base}/insights/governance`, label: { en: "Conscious Governance", sv: "Medveten Styrning" } },
        { href: `${base}/insights/peace`, label: { en: "Peace Trough Evolution", sv: "Fred Genom Evolution" } },
        { href: `${base}/insights/ai-assistants`, label: { en: "AI-assistants on the Spiral", sv: "AI-assistenter på spiralen" } }
      ]
    },
    { href: `${base}/contact`, label: { en: "Contact", sv: "Kontakt" } },
    { href: `${base}/about`, label: { en: "About", sv: "Om" } }
  ];

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
    insightsDropdownOpen = false;
  }

  // Handle escape key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      isMobileMenuOpen = false;
      insightsDropdownOpen = false;
    }
  }
  
  // Toggle mobile submenu
  function toggleMobileSubmenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    insightsDropdownOpen = !insightsDropdownOpen;
  }
</script>

<svelte:window on:keydown={handleKeydown} on:click={handleClickOutside} />

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
              <button 
                id="insights-dropdown-button"
                class="text-lg hover:text-purple-300 transition-colors flex items-center gap-1"
                aria-expanded={insightsDropdownOpen}
                aria-haspopup="true"
                on:click|stopPropagation={(e) => {
                  e.preventDefault();
                  toggleInsightsDropdown();
                }}
              >
                {link.label[$language]}
                <svg 
                  class="w-4 h-4 ml-1 transition-transform duration-200" 
                  class:rotate-180={insightsDropdownOpen}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <!-- Dropdown menu -->
              {#if insightsDropdownOpen}
                <div 
                  id="insights-dropdown"
                  class="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10"
                  transition:slide={{ duration: 150 }}
                >
                  {#each link.children as child}
                    <a 
                      href={child.href}
                      class="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                      on:click={() => {
                        closeDropdown();
                      }}
                    >
                      {child.label[$language]}
                      {#if child.href.includes('/peace') || child.href.includes('/ai-assistants')}
                        <span class="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                          {$language === 'en' ? 'New' : 'Ny'}
                        </span>
                      {/if}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          {:else}
            <!-- Regular nav link -->
            <a 
              href={link.href} 
              class="text-lg hover:text-purple-300 transition-colors"
            >
              {link.label[$language]}
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
                <button 
                  class="flex items-center justify-between w-full py-2 text-lg hover:text-purple-300 transition-colors"
                  on:click={toggleMobileSubmenu}
                  aria-expanded={insightsDropdownOpen}
                >
                  <span>{link.label[$language]}</span>
                  <svg 
                    class="w-4 h-4 transform transition-transform duration-200" 
                    class:rotate-180={insightsDropdownOpen}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <!-- Mobile dropdown submenu -->
                {#if insightsDropdownOpen}
                  <div class="pl-4 pt-1 pb-1 space-y-1" transition:slide={{ duration: 150 }}>
                    {#each link.children as child}
                      <a 
                        href={child.href}
                        class="block py-2 text-lg hover:text-purple-300 transition-colors pl-2 border-l border-purple-700"
                        on:click={closeMobileMenu}
                      >
                        {child.label[$language]}
                        {#if child.href.includes('/peace') || child.href.includes('/ai-assistants')}
                          <span class="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                            {$language === 'en' ? 'New' : 'Ny'}
                          </span>
                        {/if}
                      </a>
                    {/each}
                  </div>
                {/if}
              </div>
            {:else}
              <!-- Regular mobile link -->
              <a 
                href={link.href} 
                class="block py-2 text-lg hover:text-purple-300 transition-colors"
                on:click={closeMobileMenu}
              >
                {link.label[$language]}
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
