import { defineComponent } from 'vue'

export const WeatherDetailsItem = defineComponent({
  name: 'WeatherDetailsItem',
  props: {
    label: String,
    value: String,
  },

  template: `
     <div class="weather-details__item">
        <div class="weather-details__item-label">{{ label }}</div>
        <div class="weather-details__item-value">{{ value }}</div>
      </div>
    `,
})
