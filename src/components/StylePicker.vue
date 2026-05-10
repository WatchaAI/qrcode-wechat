<template>
  <div class="space-y-3">
    <h3 class="text-sm font-medium text-text-secondary">样式</h3>

    <div class="space-y-2">
      <span class="text-xs text-text-muted">码点</span>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="dot in DOT_TYPES"
          :key="dot.value"
          @click="$emit('update:dotType', dot.value)"
          class="px-2.5 py-1 text-xs rounded-md border transition-colors"
          :class="dotType === dot.value ? 'border-white text-white' : 'border-border text-text-muted hover:border-border-hover'"
        >
          {{ dot.label }}
        </button>
      </div>
    </div>

    <div class="space-y-2">
      <span class="text-xs text-text-muted">定位角</span>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="corner in CORNER_TYPES"
          :key="corner.value"
          @click="$emit('update:cornerType', corner.value)"
          class="px-2.5 py-1 text-xs rounded-md border transition-colors"
          :class="cornerType === corner.value ? 'border-white text-white' : 'border-border text-text-muted hover:border-border-hover'"
        >
          {{ corner.label }}
        </button>
      </div>
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
