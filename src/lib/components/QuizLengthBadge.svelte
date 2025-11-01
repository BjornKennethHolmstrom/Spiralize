<!-- src/lib/components/QuizLengthBadge.svelte -->
<script lang="ts">
  import { getQuizLengthInfo, type QuizLength } from '$lib/stores/quizStore';
  
  export let quizLength: QuizLength;
  export let currentLanguage: 'en' | 'sv' = 'en';
  
  $: info = getQuizLengthInfo(quizLength, currentLanguage);
  
  $: colorClass = quizLength === 25 ? 'bg-green-100 text-green-700 border-green-300' 
    : quizLength === 15 ? 'bg-blue-100 text-blue-700 border-blue-300'
    : 'bg-gray-100 text-gray-700 border-gray-300';
</script>

<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 {colorClass}">
  <span class="text-lg">{info.icon}</span>
  <div class="text-left">
    <div class="text-sm font-semibold leading-tight">
      {info.name[currentLanguage]}
    </div>
    <div class="text-xs opacity-75">
      {quizLength} {currentLanguage === 'en' ? 'questions' : 'frågor'}
    </div>
  </div>
</div>
