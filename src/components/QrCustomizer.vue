<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div class="space-y-6">
      <LogoPicker @change="handleLogoChange" />
      <ColorPicker
        v-model:foreground="foreground"
        v-model:background="background"
      />
      <StylePicker
        v-model:dotType="dotType"
        v-model:cornerType="cornerType"
      />
    </div>
    <div class="flex flex-col items-center gap-4">
      <div class="bg-gray-50 rounded-xl p-6 flex items-center justify-center min-h-[340px]">
        <div ref="qrContainer"></div>
      </div>
      <button
        @click="handleDownload"
        class="w-full max-w-xs px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        下载二维码
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import LogoPicker from './LogoPicker.vue'
import ColorPicker from './ColorPicker.vue'
import StylePicker from './StylePicker.vue'
import { useQrGenerate } from '../composables/useQrGenerate'

const props = defineProps({
  content: { type: String, required: true },
})

const { generate, setData, setLogo, setDotsColor, setBackgroundColor, setDotsType, setCornersType, download, options } = useQrGenerate()

const qrContainer = ref(null)
const foreground = ref('#000000')
const background = ref('#ffffff')
const dotType = ref('rounded')
const cornerType = ref('extra-rounded')

onMounted(() => {
  setData(props.content)
  nextTick(() => generate(qrContainer.value))
})

function handleLogoChange(url) {
  setLogo(url)
  generate(qrContainer.value)
}

watch(foreground, (val) => {
  setDotsColor(val)
  generate(qrContainer.value)
})

watch(background, (val) => {
  setBackgroundColor(val)
  generate(qrContainer.value)
})

watch(dotType, (val) => {
  setDotsType(val)
  generate(qrContainer.value)
})

watch(cornerType, (val) => {
  setCornersType(val)
  generate(qrContainer.value)
})

function handleDownload() {
  download('wechat-qrcode', 'png')
}
</script>
