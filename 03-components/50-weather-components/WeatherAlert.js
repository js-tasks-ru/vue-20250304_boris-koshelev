import { computed, defineComponent } from 'vue'

export const WeatherAlert = defineComponent({
  name: 'WeatherAlert',
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    sender_name: String,
    description: String,
  },

  setup(props) {
    const alertDescription = computed(() => `${props.sender_name} : ${props.description}`)
    return {
      alertDescription,
    }
  },

  template: `
       <div class="weather-alert">
          <span class="weather-alert__icon">⚠️</span>
          <span class="weather-alert__description">{{ alertDescription }}</span>
        </div>
    `,
})
