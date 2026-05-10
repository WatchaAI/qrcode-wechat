import { scan, ready } from 'qr-scanner-wechat'
import { readBarcodes } from 'zxing-wasm/reader'
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
      const img = await loadImage(file)
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      let text = await tryWechatScanner(canvas)
      if (!text) text = await tryZxing(imageData)

      // 2x upscale
      if (!text) {
        const canvas2 = document.createElement('canvas')
        canvas2.width = img.width * 2
        canvas2.height = img.height * 2
        const ctx2 = canvas2.getContext('2d')
        ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height)
        const imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height)
        text = await tryWechatScanner(canvas2)
        if (!text) text = await tryZxing(imageData2)
      }

      // Preprocessing: blur + binarize (helps with hand-drawn / artistic QR codes)
      if (!text) {
        for (const radius of [2, 3, 4]) {
          for (const threshold of [100, 128, 160]) {
            const processed = preprocessImage(img, radius, threshold)
            text = await tryWechatScanner(processed)
            if (!text) {
              const pData = processed.getContext('2d').getImageData(0, 0, processed.width, processed.height)
              text = await tryZxing(pData)
            }
            if (text) break
          }
          if (text) break
        }
      }

      if (text) {
        decoded.value = text
      } else {
        error.value = '未能识别二维码。可能是小程序码等非标准格式，请手动输入链接内容'
      }
    } catch (e) {
      error.value = '识别失败: ' + e.message
    } finally {
      loading.value = false
    }
  }

  function preprocessImage(img, blurRadius, threshold) {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')

    // Apply CSS blur via filter
    ctx.filter = `blur(${blurRadius}px)`
    ctx.drawImage(img, 0, 0)
    ctx.filter = 'none'

    // Binarize
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
      const val = gray > threshold ? 255 : 0
      data[i] = val
      data[i + 1] = val
      data[i + 2] = val
      data[i + 3] = 255
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
  }

  async function tryWechatScanner(canvas) {
    try {
      await ready()
      const result = await scan(canvas)
      return result?.text || null
    } catch {
      return null
    }
  }

  async function tryZxing(imageData) {
    try {
      const results = await readBarcodes(imageData, { formats: ['QRCode'] })
      return results.length > 0 ? results[0].text : null
    } catch {
      return null
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
