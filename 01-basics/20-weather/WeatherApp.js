import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

const checkIsNight = (dt, sunrise, sunset) => {
  return dt > sunset || dt < sunrise
}

const toCelsiusTemp = calvineTemp => calvineTemp - 273.15

const toHpaPressure = mmHgPressure => mmHgPressure * 0.75

const toUIWeatherData = data => {
  return data.map(weatherData => {
    const {
      current: { dt, sunrise, sunset, weather, temp, pressure, humidity, clouds, wind_speed },
      geographic_name,
      alert,
    } = weatherData
    return {
      isNight: checkIsNight(dt, sunrise, sunset),
      alert,
      geographic_name,
      description: weather.description,
      dt,
      temp: toCelsiusTemp(temp).toFixed(1),
      icon: WeatherConditionIcons[weather.id],
      pressure: toHpaPressure(pressure).toFixed(0),
      humidity,
      clouds,
      wind_speed,
    }
  })
}

export default defineComponent({
  name: 'WeatherApp',
  setup() {
    return {
      weatherData: toUIWeatherData(getWeatherData()),
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <ul class="weather-list unstyled-list">
        <li v-for="weather in weatherData" class="weather-card" :class="{ 'weather-card--night': weather.isNight} ">
          <div v-if="weather.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weather.alert.sender_name }}: {{ weather.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weather.geographic_name }}
            </h2>
            <div class="weather-card__time">
            {{ weather.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weather.description">{{ weather.icon }}</div>
            <div class="weather-conditions__temp">{{ weather.temp }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ weather.pressure }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weather.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weather.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weather.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
