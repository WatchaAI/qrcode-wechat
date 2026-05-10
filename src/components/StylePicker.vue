<template>
  <div class="space-y-4">
    <h3 class="text-sm font-medium text-gray-700">码点样式</h3>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="dot in DOT_TYPES"
        :key="dot.value"
        @click="$emit('update:dotType', dot.value)"
        class="px-3 py-1.5 text-sm rounded-full border transition-colors"
        :class="dotType === dot.value ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'"
      >
        {{ dot.label }}
      </button>
    </div>

    <h3 class="text-sm font-medium text-gray-700">定位角样式</h3>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="corner in CORNER_TYPES"
        :key="corner.value"
        @click="$emit('update:cornerType', corner.value)"
        class="px-3 py-1.5 text-sm rounded-full border transition-colors"
        :class="cornerType === corner.value ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'"
      >
        {{ corner.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { DOT_TYPES, CORNER_TYPES } from '../utils/constants'

defineProps({
  dotType: { type: String, default: 'rounded' },
  cornerType: { type: String, default: 'extra-rounded' },
})
defineEmits(['update:dotType', 'update:cornerType'])
</script>
