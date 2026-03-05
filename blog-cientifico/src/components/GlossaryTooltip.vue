<template>
  <span class="relative group inline-block">
    <span 
      class="border-b border-dotted border-blue-400 text-blue-300 cursor-help hover:text-blue-200 transition-colors"
    >
      <slot></slot>
    </span>
    
    <!-- Tooltip -->
    <div 
      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none"
    >
      <p class="text-xs leading-relaxed text-slate-200 font-sans relative z-10 m-0 text-left">
        {{ definition }}
      </p>
      <!-- Arrow -->
      <div class="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1.5 z-0"></div>
    </div>
  </span>
</template>

<script setup>
defineProps({
  definition: {
    type: String,
    required: true
  }
})
</script>
