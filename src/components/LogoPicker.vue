<template>
  <div class="space-y-4">
    <h3 class="text-sm font-medium text-gray-700">选择 Logo</h3>

    <!-- 预置 Logo -->
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
    </div>

    <!-- 自定义 Logo -->
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-medium text-gray-700">
        我的 Logo
        <span class="text-gray-400 font-normal">({{ customLogos.length }}/{{ MAX_LOGOS }})</span>
      </h3>
      <button
        v-if="customLogos.length > 0"
        @click="confirmClearAll"
        class="text-xs text-red-400 hover:text-red-500"
      >
        清空全部
      </button>
    </div>

    <div class="grid grid-cols-4 sm:grid-cols-5 gap-3">
      <div
        v-for="logo in customLogos"
        :key="logo.id"
        class="relative group aspect-square rounded-lg border-2 p-2 flex items-center justify-center transition-colors cursor-pointer"
        :class="selected === logo.dataUrl ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'"
        @click="selectLogo(logo.dataUrl)"
      >
        <img :src="logo.dataUrl" :alt="logo.name" class="w-full h-full object-contain" />
        <button
          @click.stop="removeLogo(logo.id)"
          class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          &times;
        </button>
      </div>

      <button
        @click="$refs.logoInput.click()"
        class="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
        :title="customLogos.length >= MAX_LOGOS ? '已达上限' : '上传自定义 Logo'"
        :disabled="customLogos.length >= MAX_LOGOS"
        :class="{ 'opacity-50 cursor-not-allowed': customLogos.length >= MAX_LOGOS }"
      >
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
      </button>
    </div>

    <p v-if="errorMsg" class="text-xs text-red-500">{{ errorMsg }}</p>

    <input ref="logoInput" type="file" accept="image/*" class="hidden" @change="handleCustomLogo" />
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
