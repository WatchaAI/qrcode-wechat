<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">微信视频号二维码生成器</h1>
        <p class="text-gray-500 mt-1 text-sm">解码微信二维码，生成自定义样式</p>
      </header>

      <StepIndicator :steps="['解码/输入', '自定义样式', '预览下载']" :current="step" />

      <div class="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <QrDecoder v-if="step === 0" @decoded="handleDecoded" />

        <div v-else-if="step === 1">
          <div class="mb-4 flex items-center justify-between">
            <div class="text-sm text-gray-500">
              内容: <code class="bg-gray-100 px-2 py-0.5 rounded text-xs">{{ qrContent }}</code>
            </div>
            <button @click="step = 0" class="text-sm text-blue-500 hover:text-blue-600">重新输入</button>
          </div>
          <QrCustomizer :content="qrContent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StepIndicator from './components/StepIndicator.vue'
import QrDecoder from './components/QrDecoder.vue'
import QrCustomizer from './components/QrCustomizer.vue'

const step = ref(0)
const qrContent = ref('')

function handleDecoded(content) {
  qrContent.value = content
  step.value = 1
}
</script>
