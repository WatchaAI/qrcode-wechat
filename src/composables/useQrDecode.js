import { scan, ready } from 'qr-scanner-wechat'
import { ref } from 'vue'

export function useQrDecode() {
  const decoded = ref('')
  const error = ref('')
  const loading = ref(false)

  async function decodeFromFile(file) {
    loading.value = true
    error.value = ''
    decoded.value = ''

    try {
      await ready()
      const img = await loadImage(file)
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const result = await scan(canvas)
      if (result && result.text) {
        decoded.value = result.text
      } else {
        error.value = '未能识别图片中的二维码，请尝试裁剪二维码区域或手动输入'
      }
    } catch (e) {
      error.value = '识别失败: ' + e.message
    } finally {
      loading.value = false
    }
  }

  function loadImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error('无法加载图片'))
        img.src = reader.result
      }
      reader.onerror = () => reject(new Error('无法读取文件'))
      reader.readAsDataURL(file)
    })
  }

  function setManualContent(content) {
    decoded.value = content
    error.value = ''
  }

  function reset() {
    decoded.value = ''
    error.value = ''
  }

  return { decoded, error, loading, decodeFromFile, setManualContent, reset }
}
