import { createApp } from 'vue'
import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import '@/styles/index.scss'
import App from './App.vue'
import { installRouter } from '@/router'
import { installPinia } from '@/stores'

async function setupApp() {
  // 创建vue实例
  const app = createApp(App)
  // 注册模块 Pinia
  installPinia(app)
  // 注册模块 Vue-router
  await installRouter(app)

  app.mount('#app')
}

setupApp().then()
