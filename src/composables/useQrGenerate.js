import QRCodeStyling from 'qr-code-styling'
import { ref, watch, shallowRef } from 'vue'

export function useQrGenerate() {
  const qrCode = shallowRef(null)
  const containerRef = ref(null)

  const options = ref({
    width: 300,
    height: 300,
    data: '',
    image: '',
    dotsOptions: {
      color: '#000000',
      type: 'rounded',
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    cornersSquareOptions: {
      type: 'extra-rounded',
      color: '#000000',
    },
    cornersDotOptions: {
      type: 'dot',
      color: '#000000',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 0,
      imageSize: 0.35,
    },
    qrOptions: {
      errorCorrectionLevel: 'H',
    },
  })

  function generate(container) {
    if (!options.value.data) return

    if (qrCode.value) {
      qrCode.value.update(options.value)
    } else {
      qrCode.value = new QRCodeStyling(options.value)
      if (container) {
        container.innerHTML = ''
        qrCode.value.append(container)
      }
    }
  }

  function updateOptions(newOpts) {
    options.value = { ...options.value, ...newOpts }
  }

  function setData(data) {
    options.value = { ...options.value, data }
  }

  function setLogo(imageUrl) {
    options.value = { ...options.value, image: imageUrl }
  }

  function setDotsColor(color) {
    options.value = {
      ...options.value,
      dotsOptions: { ...options.value.dotsOptions, color },
      cornersSquareOptions: { ...options.value.cornersSquareOptions, color },
      cornersDotOptions: { ...options.value.cornersDotOptions, color },
    }
  }

  function setBackgroundColor(color) {
    options.value = {
      ...options.value,
      backgroundOptions: { ...options.value.backgroundOptions, color },
    }
  }

  function setDotsType(type) {
    options.value = {
      ...options.value,
      dotsOptions: { ...options.value.dotsOptions, type },
    }
  }

  function setCornersType(type) {
    options.value = {
      ...options.value,
      cornersSquareOptions: { ...options.value.cornersSquareOptions, type },
    }
  }

  function setLogoMargin(margin) {
    options.value = {
      ...options.value,
      imageOptions: { ...options.value.imageOptions, margin },
    }
  }

  async function download(name = 'qrcode', extension = 'png') {
    if (qrCode.value) {
      await qrCode.value.download({ name, extension })
    }
  }

  async function downloadWithBackground(name, extension, bgColor) {
    const tempQr = new QRCodeStyling({
      ...options.value,
      backgroundOptions: { color: bgColor },
    })
    await tempQr.download({ name, extension })
  }

  return {
    qrCode,
    options,
    generate,
    updateOptions,
    setData,
    setLogo,
    setDotsColor,
    setBackgroundColor,
    setDotsType,
    setCornersType,
    setLogoMargin,
    download,
    downloadWithBackground,
  }
}
