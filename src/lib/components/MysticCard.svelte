<!-- MysticCard.svelte -->
<script lang="ts">
  export let title: string;
  export let text: string;
</script>

<div class="p-6 rounded-2xl shadow-lg border border-indigo-300 dark:border-indigo-700 bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100 dark:from-indigo-800 dark:via-gray-900 dark:to-purple-800 transition-all duration-500 mb-8">
  <h3 class="text-xl font-bold mb-3 text-indigo-900 dark:text-indigo-200 drop-shadow-sm">
    {title}
  </h3>
  <p class="text-gray-900 dark:text-gray-100 leading-relaxed">
    {text}
  </p>
</div>
