<script>
  import { base } from '$app/paths';
  import { writable } from 'svelte/store';

  // Language store
  export let language = writable("en");

  // Links for navigation
  const navLinks = [
    { href: `${base}/`, label: { en: "Home", sv: "Hem" } },
    { href: `${base}/about`, label: { en: "About", sv: "Om" } },
    { href: `${base}/quiz`, label: { en: "Quiz", sv: "Test" } },
    { href: `${base}/spiral`, label: { en: "Explore", sv: "Utforska" } },
    { href: `${base}/insights`, label: { en: "Insights", sv: "Insikter" } },
    { href: `${base}/contact`, label: { en: "Contact", sv: "Kontakt" } }
  ];
</script>

<header class="bg-gradient-to-br from-purple-600 to-purple-800 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
    <!-- Logo -->
    <a href={`${base}/`} class="text-2xl font-bold hover:text-purple-300 transition-colors">
      Spiralize
    </a>

    <!-- Navigation Links -->
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
    <div class="flex items-center space-x-4">
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

    <!-- Mobile Menu Toggle -->
    <button class="md:hidden text-purple-300 hover:text-white transition-colors">
      ☰
    </button>
  </div>
</header>

<style>
  header {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  nav a {
    transition: color 0.2s ease;
  }

  nav a:hover {
    color: #d1d5db; /* Light gray for hover */
  }
</style>

