import { defineComponent, onUnmounted, ref } from 'vue'

const getCurrentDate = () => new Date(Date.now())
const getFormattedTime = date => date.toLocaleString(navigator.language, { timeStyle: 'medium' })

export default defineComponent({
  name: 'UiClock',

  setup() {
    const currentTime = ref(getFormattedTime(getCurrentDate()))

    const intervalId = setInterval(() => {
      currentTime.value = getFormattedTime(getCurrentDate())
    }, 1000)

    onUnmounted(() => {
      clearInterval(intervalId)
    })

    return {
      currentTime,
    }
  },

  template: `<div class="clock">{{ currentTime }}</div>`,
})
