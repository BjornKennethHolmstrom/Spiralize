<script lang="ts">
  import { base } from '$app/paths';
  import { writable } from 'svelte/store';
  import { slide } from 'svelte/transition';
  
  // Language store
  export let language = writable("en");

  // Mobile menu state
  let isMobileMenuOpen = false;

  // Links for navigation
  const navLinks = [
    { href: `${base}/`, label: { en: "Home", sv: "Hem" } },
    { href: `${base}/spiral`, label: { en: "Explore", sv: "Utforska" } },
    { href: `${base}/origins`, label: { en: "Origins", sv: "Historia" } },
    { href: `${base}/quiz`, label: { en: "Quiz", sv: "Test" } },
    { href: `${base}/insights`, label: { en: "Insights", sv: "Insikter" } },
    { href: `${base}/contact`, label: { en: "Contact", sv: "Kontakt" } },
    { href: `${base}/about`, label: { en: "About", sv: "Om" } }
  ];

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }

  // Handle escape key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      isMobileMenuOpen = false;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

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
          <a 
            href={link.href} 
            class="text-lg hover:text-purple-300 transition-colors"
          >
            {link.label[$language]}
          </a>
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
        class="absolute top-full left-0 right-0 bg-purple-800 shadow-lg"
        transition:slide={{ duration: 200 }}
      >
        <nav class="px-4 pt-2 pb-4 space-y-2">
          {#each navLinks as link}
            <a 
              href={link.href} 
              class="block py-2 text-lg hover:text-purple-300 transition-colors"
              on:click={closeMobileMenu}
            >
              {link.label[$language]}
            </a>
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
