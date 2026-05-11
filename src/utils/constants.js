const BASE = import.meta.env.BASE_URL

export const PRESET_LOGOS = [
  { name: '无 Logo', url: '' },
  { name: '观猹', url: `${BASE}logos/观猹.png` },
  { name: '猹子', url: `${BASE}logos/猹子.png` },
  { name: '吃瓜', url: `${BASE}logos/吃瓜.png` },
  { name: '问号', url: `${BASE}logos/问号.png` },
]

export const DOT_TYPES = [
  { label: '圆角', value: 'rounded' },
  { label: '圆点', value: 'dots' },
  { label: '方形', value: 'square' },
  { label: '优雅圆角', value: 'classy-rounded' },
  { label: '超圆角', value: 'extra-rounded' },
]

export const CORNER_TYPES = [
  { label: '超圆角', value: 'extra-rounded' },
  { label: '圆点', value: 'dot' },
  { label: '方形', value: 'square' },
]
