<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-border px-6 py-4">
      <h1 class="text-lg font-medium tracking-tight">微信视频号二维码生成器</h1>
    </header>

    <main class="flex-1 flex flex-col lg:flex-row overflow-hidden">
      <!-- 左侧：配置面板 -->
      <div class="lg:w-[420px] lg:border-r lg:border-border overflow-y-auto p-6 space-y-6 order-2 lg:order-1">
        <QrDecoder @decoded="handleDecoded" :content="qrContent" />
        <template v-if="qrContent">
          <div class="h-px bg-border"></div>
          <LogoPicker @change="handleLogoChange" />
          <div class="h-px bg-border"></div>
          <ColorPicker
            v-model:foreground="foreground"
            v-model:background="background"
          />
          <div class="h-px bg-border"></div>
          <StylePicker
            v-model:dotType="dotType"
            v-model:cornerType="cornerType"
          />
        </template>
      </div>

      <!-- 右侧：预览区 -->
      <div class="flex-1 flex items-center justify-center p-6 order-1 lg:order-2 lg:sticky lg:top-0 lg:h-screen">
        <QrPreview
          v-if="qrContent"
          ref="previewRef"
          :content="qrContent"
          :logo="logo"
          :foreground="foreground"
          :background="background"
          :dotType="dotType"
          :cornerType="cornerType"
        />
        <div v-else class="text-center text-text-muted">
          <svg class="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
          </svg>
          <p class="text-sm">上传或粘贴二维码内容开始</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QrDecoder from './components/QrDecoder.vue'
import QrPreview from './components/QrPreview.vue'
import LogoPicker from './components/LogoPicker.vue'
import ColorPicker from './components/ColorPicker.vue'
import StylePicker from './components/StylePicker.vue'

const qrContent = ref('')
const logo = ref('')
const foreground = ref('#ffffff')
const background = ref('transparent')
const dotType = ref('rounded')
const cornerType = ref('extra-rounded')

function handleDecoded(content) {
  qrContent.value = content
}

function handleLogoChange(url) {
  logo.value = url
}
</script>
