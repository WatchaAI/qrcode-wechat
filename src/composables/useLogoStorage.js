import { ref } from 'vue'

const STORAGE_KEY = 'qr_custom_logos'
const MAX_LOGOS = 20
const MAX_TOTAL_SIZE = 5 * 1024 * 1024 // 5MB

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(logos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logos))
}

function estimateSize(logos) {
  return new Blob([JSON.stringify(logos)]).size
}

const customLogos = ref(loadFromStorage())

export function useLogoStorage() {
  function addLogo(name, dataUrl) {
    const existing = customLogos.value.find((l) => l.dataUrl === dataUrl)
    if (existing) return { success: true }

    if (customLogos.value.length >= MAX_LOGOS) {
      return { success: false, error: `最多保存 ${MAX_LOGOS} 个自定义 Logo，请先删除不需要的` }
    }

    const next = [...customLogos.value, { id: Date.now().toString(), name, dataUrl }]
    if (estimateSize(next) > MAX_TOTAL_SIZE) {
      return { success: false, error: '本地存储空间不足（上限 5MB），请先删除不需要的 Logo' }
    }

    customLogos.value = next
    saveToStorage(next)
    return { success: true }
  }

  function removeLogo(id) {
    customLogos.value = customLogos.value.filter((l) => l.id !== id)
    saveToStorage(customLogos.value)
  }

  function clearAll() {
    customLogos.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  return { customLogos, addLogo, removeLogo, clearAll, MAX_LOGOS }
}
