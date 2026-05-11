<template>
  <div class="min-h-screen flex flex-col bg-surface">
    <!-- Header -->
    <header class="border-b border-border px-6 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="/watcha-logo.svg" alt="Watcha" class="h-6" />
        <span class="text-xs text-text-muted">/ QR Studio</span>
      </div>
      <a
        href="https://github.com/WatchaAI/qrcode-wechat"
        target="_blank"
        rel="noopener"
        class="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        <span class="hidden sm:inline">GitHub</span>
      </a>
    </header>

    <main class="flex-1 flex flex-col lg:flex-row overflow-hidden">
      <!-- 左侧：配置面板 -->
      <div class="lg:w-[400px] xl:w-[440px] lg:border-r lg:border-border overflow-y-auto p-5 space-y-5 order-2 lg:order-1">
        <QrDecoder @decoded="handleDecoded" :content="qrContent" />
        <div class="h-px bg-border"></div>
        <LogoPicker @change="handleLogoChange" />
        <div v-if="logo" class="flex items-center gap-3">
          <label class="text-xs text-text-muted whitespace-nowrap">Logo 留白</label>
          <input
            type="range"
            min="0"
            max="20"
            v-model.number="logoMargin"
            class="flex-1 h-1 accent-text-primary"
          />
          <span class="text-xs text-text-muted w-6 text-right">{{ logoMargin }}</span>
        </div>
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
      </div>

      <!-- 右侧：预览区 -->
      <div class="flex-1 flex items-center justify-center p-6 order-1 lg:order-2 lg:sticky lg:top-0 lg:h-screen">
        <QrPreview
          :content="qrContent || demoContent"
          :logo="logo"
          :foreground="foreground"
          :background="background"
          :dotType="dotType"
          :cornerType="cornerType"
          :logoMargin="logoMargin"
          :isDemo="!qrContent"
        />
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-border px-6 py-3 text-center text-[11px] text-text-muted">
      Built by <a href="https://github.com/WatchaAI" target="_blank" class="hover:text-text-primary transition-colors">WatchaAI</a>
      &middot; 纯前端，数据不上传
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QrDecoder from './components/QrDecoder.vue'
import QrPreview from './components/QrPreview.vue'
import LogoPicker from './components/LogoPicker.vue'
import ColorPicker from './components/ColorPicker.vue'
import StylePicker from './components/StylePicker.vue'

const demoContent = 'https://github.com/WatchaAI/qrcode-wechat'
const qrContent = ref('')
const logo = ref('')
const foreground = ref('#000000')
const background = ref('#ffffff')
const logoMargin = ref(0)
const dotType = ref('rounded')
const cornerType = ref('extra-rounded')

function handleDecoded(content) {
  qrContent.value = content
}

function handleLogoChange(url) {
  logo.value = url
}
</script>
