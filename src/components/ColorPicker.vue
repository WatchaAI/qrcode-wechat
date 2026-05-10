<template>
  <div class="space-y-4">
    <h3 class="text-sm font-medium text-gray-700">颜色设置</h3>
    <div class="grid grid-cols-2 gap-4">
      <label class="space-y-1">
        <span class="text-xs text-gray-500">前景色（码点）</span>
        <div class="flex items-center gap-2">
          <input
            type="color"
            :value="foreground"
            @input="$emit('update:foreground', $event.target.value)"
            class="w-8 h-8 rounded cursor-pointer border border-gray-200"
          />
          <input
            type="text"
            :value="foreground"
            @change="$emit('update:foreground', $event.target.value)"
            class="flex-1 px-2 py-1 text-sm border border-gray-200 rounded"
          />
        </div>
      </label>
      <label class="space-y-1">
        <span class="text-xs text-gray-500">背景色</span>
        <div class="flex items-center gap-2">
          <input
            type="color"
            :value="background"
            @input="$emit('update:background', $event.target.value)"
            class="w-8 h-8 rounded cursor-pointer border border-gray-200"
          />
          <input
            type="text"
            :value="background"
            @change="$emit('update:background', $event.target.value)"
            class="flex-1 px-2 py-1 text-sm border border-gray-200 rounded"
          />
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  foreground: { type: String, default: '#000000' },
  background: { type: String, default: '#ffffff' },
})
defineEmits(['update:foreground', 'update:background'])
</script>
