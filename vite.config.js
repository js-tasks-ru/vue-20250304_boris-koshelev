import { defineConfig } from 'vite'
import { createTaskbookViteConfig } from '@shgk/vue-course-taskbook/configs/vite.config.js'

const customConfig = defineConfig({
  test: {
    include: ['./00-intro/**/__tests__/*'],
  },
  // Здесь вы можете переопределять конфигурацию Vite
})

export default createTaskbookViteConfig({
  taskbookDir: __dirname,
  customConfig,
})
