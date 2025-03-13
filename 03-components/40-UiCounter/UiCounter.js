import { computed, defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: Number,
    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },
  },

  emits: ['update:count'],

  setup(props, ctx) {
    function decrement() {
      ctx.emit('update:count', props.count - 1)
    }
    function increment() {
      ctx.emit('update:count', props.count + 1)
    }

    const decrementButtonDisabled = computed(() => props.count <= props.min)
    const incrementButtonDisabled = computed(() => props.count >= props.max)

    return {
      decrement,
      increment,
      decrementButtonDisabled,
      incrementButtonDisabled,
    }
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" @click="decrement" :disabled="decrementButtonDisabled">➖</UiButton>
      <span class="count" data-testid="count" >{{ count }}</span>
      <UiButton aria-label="Increment" @click="increment" :disabled="incrementButtonDisabled">➕</UiButton>
    </div>
  `,
})
