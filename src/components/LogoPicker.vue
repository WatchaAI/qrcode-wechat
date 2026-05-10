<template>
  <div class="space-y-3">
    <h3 class="text-sm font-medium text-text-secondary">Logo</h3>

    <div class="grid grid-cols-5 gap-2">
      <button
        v-for="logo in PRESET_LOGOS"
        :key="logo.name"
        @click="selectLogo(logo.url)"
        class="aspect-square rounded-lg border p-1.5 flex items-center justify-center transition-colors"
        :class="selected === logo.url ? 'border-text-primary bg-surface-hover' : 'border-border hover:border-border-hover'"
      >
        <img v-if="logo.url" :src="logo.url" :alt="logo.name" class="w-full h-full object-contain" />
        <span v-else class="text-[10px] text-text-muted">无</span>
      </button>
    </div>

    <div v-if="customLogos.length > 0" class="space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-xs text-text-muted">已保存 ({{ customLogos.length }}/{{ MAX_LOGOS }})</span>
        <button @click="confirmClearAll" class="text-[10px] text-text-muted hover:text-red-400 transition-colors">清空</button>
      </div>
      <div class="grid grid-cols-5 gap-2">
        <div
          v-for="logo in customLogos"
          :key="logo.id"
          class="relative group aspect-square rounded-lg border p-1.5 flex items-center justify-center cursor-pointer transition-colors"
          :class="selected === logo.dataUrl ? 'border-text-primary bg-surface-hover' : 'border-border hover:border-border-hover'"
          @click="selectLogo(logo.dataUrl)"
        >
          <img :src="logo.dataUrl" :alt="logo.name" class="w-full h-full object-contain" />
          <button
            @click.stop="removeLogo(logo.id)"
            class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >&times;</button>
        </div>
      </div>
    </div>

    <button
      @click="$refs.logoInput.click()"
      :disabled="customLogos.length >= MAX_LOGOS"
      class="w-full py-2 border border-dashed border-border rounded-lg text-xs text-text-muted hover:border-border-hover hover:text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      + 上传自定义 Logo
    </button>
    <input ref="logoInput" type="file" accept="image/*" class="hidden" @change="handleCustomLogo" />
    <p v-if="errorMsg" class="text-xs text-red-400">{{ errorMsg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PRESET_LOGOS } from '../utils/constants'
import { useLogoStorage } from '../composables/useLogoStorage'
import { compressImage } from '../utils/compressImage'

const emit = defineEmits(['change'])
const { customLogos, addLogo, removeLogo: removeFromStorage, clearAll, MAX_LOGOS } = useLogoStorage()

const selected = ref('')
const errorMsg = ref('')

function selectLogo(url) {
  selected.value = url
  emit('change', url)
}

function handleCustomLogo(e) {
  const file = e.target.files[0]
  if (!file) return
  errorMsg.value = ''

  compressImage(file)
    .then((dataUrl) => {
      const result = addLogo(file.name, dataUrl)
      if (result.success) {
        selected.value = dataUrl
        emit('change', dataUrl)
      } else {
        errorMsg.value = result.error
      }
    })
    .catch((err) => {
      errorMsg.value = err.message
    })
    .finally(() => {
      e.target.value = ''
    })
}

function removeLogo(id) {
  const logo = customLogos.value.find((l) => l.id === id)
  if (logo && selected.value === logo.dataUrl) {
    selected.value = ''
    emit('change', '')
  }
  removeFromStorage(id)
}

function confirmClearAll() {
  if (confirm('确定清空所有自定义 Logo？')) {
    selected.value = ''
    emit('change', '')
    clearAll()
  }
}
</script>
