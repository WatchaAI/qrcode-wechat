<template>
  <div class="flex items-center justify-center mb-8">
    <div v-for="(step, i) in steps" :key="i" class="flex items-center">
      <div
        class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors"
        :class="i <= current ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'"
      >
        {{ i + 1 }}
      </div>
      <span
        class="ml-2 text-sm hidden sm:inline"
        :class="i <= current ? 'text-blue-600 font-medium' : 'text-gray-400'"
      >
        {{ step }}
      </span>
      <div v-if="i < steps.length - 1" class="w-8 sm:w-12 h-px bg-gray-300 mx-3"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: { type: Array, required: true },
  current: { type: Number, default: 0 },
})
</script>
