<template>
  <div class="space-y-4">
    <h3 class="text-sm font-medium text-gray-700">选择 Logo</h3>
    <div class="grid grid-cols-4 sm:grid-cols-5 gap-3">
      <button
        v-for="logo in PRESET_LOGOS"
        :key="logo.name"
        @click="selectLogo(logo.url)"
        class="aspect-square rounded-lg border-2 p-2 flex items-center justify-center transition-colors"
        :class="selected === logo.url ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'"
      >
        <img v-if="logo.url" :src="logo.url" :alt="logo.name" class="w-full h-full object-contain" />
        <span v-else class="text-xs text-gray-400">无</span>
      </button>
      <button
        @click="$refs.logoInput.click()"
        class="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
      >
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
      </button>
    </div>
    <input ref="logoInput" type="file" accept="image/*" class="hidden" @change="handleCustomLogo" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PRESET_LOGOS } from '../utils/constants'

const emit = defineEmits(['change'])
const selected = ref('')

function selectLogo(url) {
  selected.value = url
  emit('change', url)
}

function handleCustomLogo(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    selected.value = reader.result
    emit('change', reader.result)
  }
  reader.readAsDataURL(file)
}
</script>
