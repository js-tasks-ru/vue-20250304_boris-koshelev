import { defineComponent, ref } from 'vue'
import { getWeatherData } from './weather.service.ts'
import './WeatherApp.css'
import { WeatherCard } from './WeetherCard.js'

export default defineComponent({
  name: 'WeatherApp',
  components: { WeatherCard },
  setup() {
    const weatherData = ref(getWeatherData())
    return {
      weatherData,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
            <WeatherCard v-for="weatherCardData in weatherData" :data="weatherCardData"></WeatherCard>
      </ul>
    </div>
  `,
})
