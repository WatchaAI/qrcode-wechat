# 微信视频号二维码生成器

一个纯前端工具，用于解码微信视频号预约直播二维码，并重新生成带自定义 Logo、颜色和样式的美观二维码。

## 功能特性

- **智能解码** — 上传微信截图，自动识别并解码二维码内容（基于微信 QR 检测引擎 WASM 版本）
- **手动输入** — 支持直接粘贴二维码链接内容（如 `wx://live/sg?...`）
- **自定义 Logo** — 预置多款 Logo，也支持上传自定义图片
- **颜色定制** — 自由设置前景色和背景色
- **样式选择** — 圆角、圆点、方形等多种码点和定位角样式
- **一键下载** — 生成的二维码可直接下载为 PNG 图片
- **纯前端** — 无需后端服务，所有处理在浏览器本地完成

## 为什么需要这个工具

微信视频号生成的预约直播二维码样式固定，无法自定义。本工具可以：

1. 将微信原生二维码解码提取链接
2. 用提取的链接重新生成样式丰富的二维码
3. 嵌入品牌 Logo 或 IP 形象，提升传播效果

## 技术栈

- [Vue 3](https://vuejs.org/) — Composition API + `<script setup>`
- [Vite](https://vite.dev/) — 构建工具
- [Tailwind CSS](https://tailwindcss.com/) v3 — 样式
- [qr-scanner-wechat](https://github.com/niceDev0908/qr-scanner-wechat) — 微信 QR 检测引擎（OpenCV WASM）
- [qr-code-styling](https://github.com/niceDev0908/qr-code-styling) — 带样式的二维码生成

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 使用方法

1. **上传图片** — 将包含微信视频号二维码的截图拖拽或点击上传
2. **确认内容** — 工具自动解码并显示二维码内容（也可手动粘贴链接）
3. **自定义样式** — 选择 Logo、调整颜色、切换码点样式
4. **下载使用** — 预览满意后点击下载按钮保存 PNG 图片

## 关于解码能力

本工具使用基于 OpenCV + 微信 QR 检测算法的 WASM 引擎，相比普通 JS 解码库（如 jsQR），对微信特有的圆点样式、Logo 遮挡等非标准二维码有更强的识别能力。

## License

MIT
