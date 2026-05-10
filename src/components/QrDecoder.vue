<template>
  <div class="space-y-6">
    <div
      class="border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer"
      :class="dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'"
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
      />
      <div v-if="loading" class="text-blue-500">
        <svg class="animate-spin h-8 w-8 mx-auto mb-2" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <p>正在识别二维码...</p>
      </div>
      <div v-else-if="preview" class="space-y-2">
        <img :src="preview" class="max-h-48 mx-auto rounded" alt="上传的图片" />
        <p class="text-sm text-gray-500">点击或拖拽更换图片</p>
      </div>
      <div v-else>
        <svg class="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <p class="text-gray-600 font-medium">点击上传或拖拽图片到此处</p>
        <p class="text-sm text-gray-400 mt-1">支持包含微信二维码的截图</p>
      </div>
    </div>

    <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
      {{ error }}
    </div>

    <div class="relative">
      <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
      <div class="relative flex justify-center text-sm"><span class="px-3 bg-white text-gray-500">或手动输入</span></div>
    </div>

    <div class="flex gap-3">
      <input
        v-model="manualInput"
        type="text"
        placeholder="粘贴二维码内容，如 wx://live/sg?CAUguLCY55fPi4PPAQ"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        @keyup.enter="submitManual"
      />
      <button
        @click="submitManual"
        :disabled="!manualInput.trim()"
        class="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        确认
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQrDecode } from '../composables/useQrDecode'

const emit = defineEmits(['decoded'])

const { decoded, error, loading, decodeFromFile, setManualContent } = useQrDecode()
const dragging = ref(false)
const preview = ref('')
const manualInput = ref('')

async function handleFile(file) {
  if (!file || !file.type.startsWith('image/')) return
  preview.value = URL.createObjectURL(file)
  await decodeFromFile(file)
  if (decoded.value) {
    emit('decoded', decoded.value)
  }
}

function handleDrop(e) {
  dragging.value = false
  const file = e.dataTransfer.files[0]
  handleFile(file)
}

function handleFileChange(e) {
  const file = e.target.files[0]
  handleFile(file)
}

function submitManual() {
  const val = manualInput.value.trim()
  if (!val) return
  setManualContent(val)
  emit('decoded', val)
}
</script>
