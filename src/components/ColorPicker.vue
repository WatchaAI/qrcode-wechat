<template>
  <div class="space-y-3">
    <h3 class="text-sm font-medium text-text-secondary">颜色</h3>
    <div class="grid grid-cols-2 gap-3">
      <label class="space-y-1.5">
        <span class="text-xs text-text-muted">前景色</span>
        <div class="flex items-center gap-2 bg-surface-card border border-border rounded-lg px-2 py-1.5">
          <input
            type="color"
            :value="foreground"
            @input="$emit('update:foreground', $event.target.value)"
            class="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
          />
          <input
            type="text"
            :value="foreground"
            @change="$emit('update:foreground', $event.target.value)"
            class="flex-1 bg-transparent text-xs text-text-primary outline-none"
          />
        </div>
      </label>
      <label class="space-y-1.5">
        <span class="text-xs text-text-muted">背景色</span>
        <div class="flex items-center gap-2 bg-surface-card border border-border rounded-lg px-2 py-1.5">
          <input
            type="color"
            :value="background === 'transparent' ? '#000000' : background"
            @input="$emit('update:background', $event.target.value)"
            class="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
          />
          <input
            type="text"
            :value="background"
            @change="$emit('update:background', $event.target.value)"
            class="flex-1 bg-transparent text-xs text-text-primary outline-none"
            placeholder="transparent"
          />
        </div>
      </label>
    </div>
    <button
      @click="$emit('update:background', background === 'transparent' ? '#000000' : 'transparent')"
      class="text-xs px-3 py-1.5 border border-border rounded-lg hover:border-border-hover transition-colors"
      :class="background === 'transparent' ? 'border-text-primary text-text-primary' : 'text-text-muted'"
    >
      {{ background === 'transparent' ? '已启用透明背景' : '设为透明背景' }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  foreground: { type: String, default: '#ffffff' },
  background: { type: String, default: 'transparent' },
})
defineEmits(['update:foreground', 'update:background'])
</script>
