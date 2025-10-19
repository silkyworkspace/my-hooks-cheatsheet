// Vite の設定を定義する関数をインポート
import { defineConfig } from 'vite'

// React を使うためのプラグインをインポート
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// defineConfig() に関数を渡すことで、Vite が現在のモード（development / production）を教えてくれる
export default defineConfig(({ mode }) => ({
  // 使用するプラグインを指定（React を使う）
  plugins: [react()],

  // base はビルド後の公開パス（GitHub Pages で必須）
  // mode が production（npm run build）なら GitHub Pages 用のパスに設定
  // それ以外（npm run dev の時）はルート（/）に設定
  base: mode === 'production' ? '/my-hooks-cheatsheet/' : '/',
}))