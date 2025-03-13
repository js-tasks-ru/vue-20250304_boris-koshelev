import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const counter = ref(0)

    const disableDecrementButton = computed(() => counter.value <= 0)
    const disableIncrementButton = computed(() => counter.value >= 5)

    return {
      counter,
      disableDecrementButton,
      disableIncrementButton,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="disableDecrementButton"
        @click="counter--"
      >➖</button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click="counter++"
        :disabled="disableIncrementButton"
      >➕</button>
    </div>
  `,
})
