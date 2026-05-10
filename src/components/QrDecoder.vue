<template>
  <div class="space-y-4">
    <h3 class="text-sm font-medium text-text-secondary">二维码内容</h3>

    <div
      class="border border-dashed border-border rounded-lg p-6 text-center transition-colors cursor-pointer hover:border-border-hover"
      :class="{ 'border-text-primary/40 bg-surface-hover': dragging }"
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
      @paste="handlePaste"
      tabindex="0"
    >
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
      <div v-if="loading" class="text-text-secondary">
        <svg class="animate-spin h-6 w-6 mx-auto mb-2" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <p class="text-xs">识别中...</p>
      </div>
      <div v-else>
        <p class="text-sm text-text-secondary">点击上传、拖拽或粘贴图片</p>
        <p class="text-xs text-text-muted mt-1">支持 Ctrl+V 粘贴截图，上传新图片自动重新解码</p>
      </div>
    </div>

    <div v-if="error" class="text-xs text-red-400 bg-red-400/10 px-3 py-2 rounded">
      {{ error }}
    </div>

    <div class="flex gap-2">
      <input
        v-model="manualInput"
        type="text"
        placeholder="粘贴链接，如 wx://live/sg?..."
        class="flex-1 px-3 py-2 bg-surface-card border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:border-border-hover focus:outline-none"
        @keyup.enter="submitManual"
      />
      <button
        @click="submitManual"
        :disabled="!manualInput.trim()"
        class="px-4 py-2 border border-border rounded-lg text-sm hover:bg-surface-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        确认
      </button>
    </div>

    <div v-if="content" class="flex items-center gap-2 bg-surface-card border border-border rounded-lg px-3 py-2">
      <code class="flex-1 text-xs text-text-secondary truncate">{{ content }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useQrDecode } from '../composables/useQrDecode'

const props = defineProps({
  content: { type: String, default: '' },
})
const emit = defineEmits(['decoded'])

const { decoded, error, loading, decodeFromFile, setManualContent } = useQrDecode()
const dragging = ref(false)
const manualInput = ref('')

async function handleFile(file) {
  if (!file || !file.type.startsWith('image/')) return
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
  handleFile(e.target.files[0])
  e.target.value = ''
}

function handlePaste(e) {
  const items = e.clipboardData?.items
  if (!items) return
  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile()
      if (file) handleFile(file)
      return
    }
  }
}

function onGlobalPaste(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
  handlePaste(e)
}

onMounted(() => document.addEventListener('paste', onGlobalPaste))
onUnmounted(() => document.removeEventListener('paste', onGlobalPaste))

function submitManual() {
  const val = manualInput.value.trim()
  if (!val) return
  setManualContent(val)
  emit('decoded', val)
}
</script>
