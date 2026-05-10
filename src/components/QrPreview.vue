<template>
  <div class="flex flex-col items-center gap-6 w-full max-w-sm">
    <div class="checkerboard rounded-lg p-8 w-full flex items-center justify-center">
      <div ref="qrContainer"></div>
    </div>

    <div class="flex gap-3 w-full">
      <button
        @click="downloadWhite"
        class="flex-1 px-4 py-2.5 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
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
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useQrGenerate } from '../composables/useQrGenerate'

const props = defineProps({
  content: { type: String, required: true },
  logo: { type: String, default: '' },
  foreground: { type: String, default: '#ffffff' },
  background: { type: String, default: 'transparent' },
  dotType: { type: String, default: 'rounded' },
  cornerType: { type: String, default: 'extra-rounded' },
})

const qrContainer = ref(null)
const { generate, setData, setLogo, setDotsColor, setBackgroundColor, setDotsType, setCornersType, download, options } = useQrGenerate()

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
  setBackgroundColor('#ffffff')
  generate(qrContainer.value)
  setTimeout(() => {
    download('qrcode', 'png')
    setBackgroundColor(props.background)
    generate(qrContainer.value)
  }, 100)
}

function downloadTransparent() {
  setBackgroundColor('transparent')
  generate(qrContainer.value)
  setTimeout(() => {
    download('qrcode-transparent', 'png')
    setBackgroundColor(props.background)
    generate(qrContainer.value)
  }, 100)
}
</script>
