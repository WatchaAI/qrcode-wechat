<template>
  <div class="flex flex-col items-center gap-5 w-full max-w-sm">
    <!-- Demo badge -->
    <div v-if="isDemo" class="w-full text-center">
      <span class="inline-block px-3 py-1 text-[11px] font-medium text-text-muted bg-surface-hover border border-border rounded-full">
        预览效果 &middot; 上传二维码后可下载
      </span>
    </div>

    <!-- QR Preview -->
    <div class="checkerboard rounded-xl p-8 w-full flex items-center justify-center shadow-sm">
      <div ref="qrContainer"></div>
    </div>

    <!-- Download buttons -->
    <div v-if="!isDemo" class="flex gap-3 w-full">
      <button
        @click="downloadWhite"
        class="flex-1 px-4 py-2.5 bg-text-primary text-surface rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
      >
        下载 PNG
      </button>
      <button
        @click="downloadTransparent"
        class="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:border-border-hover hover:bg-surface-hover transition-colors"
      >
        下载透明 PNG
      </button>
    </div>

    <!-- Feature hints when in demo mode -->
    <div v-if="isDemo" class="w-full grid grid-cols-2 gap-2 text-[11px] text-text-muted">
      <div class="flex items-center gap-1.5 px-3 py-2 bg-surface-card border border-border rounded-lg">
        <span class="w-1 h-1 rounded-full bg-text-muted"></span>
        自定义 Logo
      </div>
      <div class="flex items-center gap-1.5 px-3 py-2 bg-surface-card border border-border rounded-lg">
        <span class="w-1 h-1 rounded-full bg-text-muted"></span>
        自定义颜色
      </div>
      <div class="flex items-center gap-1.5 px-3 py-2 bg-surface-card border border-border rounded-lg">
        <span class="w-1 h-1 rounded-full bg-text-muted"></span>
        多种码点样式
      </div>
      <div class="flex items-center gap-1.5 px-3 py-2 bg-surface-card border border-border rounded-lg">
        <span class="w-1 h-1 rounded-full bg-text-muted"></span>
        透明背景导出
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useQrGenerate } from '../composables/useQrGenerate'

const props = defineProps({
  content: { type: String, required: true },
  logo: { type: String, default: '' },
  foreground: { type: String, default: '#000000' },
  background: { type: String, default: '#ffffff' },
  dotType: { type: String, default: 'rounded' },
  cornerType: { type: String, default: 'extra-rounded' },
  isDemo: { type: Boolean, default: false },
})

const qrContainer = ref(null)
const { generate, setData, setLogo, setDotsColor, setBackgroundColor, setDotsType, setCornersType, downloadWithBackground, options } = useQrGenerate()

onMounted(() => {
  options.value = {
    ...options.value,
    data: props.content,
    image: props.logo,
    dotsOptions: { ...options.value.dotsOptions, color: props.foreground, type: props.dotType },
    backgroundOptions: { color: props.background },
    cornersSquareOptions: { ...options.value.cornersSquareOptions, color: props.foreground, type: props.cornerType },
    cornersDotOptions: { ...options.value.cornersDotOptions, color: props.foreground },
  }
  nextTick(() => generate(qrContainer.value))
})

watch(() => props.content, (val) => { setData(val); generate(qrContainer.value) })
watch(() => props.logo, (val) => { setLogo(val); generate(qrContainer.value) })
watch(() => props.foreground, (val) => { setDotsColor(val); generate(qrContainer.value) })
watch(() => props.background, (val) => { setBackgroundColor(val); generate(qrContainer.value) })
watch(() => props.dotType, (val) => { setDotsType(val); generate(qrContainer.value) })
watch(() => props.cornerType, (val) => { setCornersType(val); generate(qrContainer.value) })

function downloadWhite() {
  downloadWithBackground('qrcode', 'png', '#ffffff')
}

function downloadTransparent() {
  downloadWithBackground('qrcode-transparent', 'png', 'transparent')
}
</script>
