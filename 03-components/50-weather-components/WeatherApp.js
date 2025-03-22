/* eslint-disable vue/one-component-per-file */
import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'
import './WeatherApp.css'

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
      name: geographic_name,
      time: dt,
      alert,
      isNight: checkIsNight(dt, sunrise, sunset),
      conditions: {
        description: weather.description,
        temp: toCelsiusTemp(temp).toFixed(1),
        icon: WeatherConditionIcons[weather.id],
      },
      details: [
        { label: 'Давление, мм рт. ст.', value: toHpaPressure(pressure).toFixed(0) },
        { label: 'Влажность, %', value: String(humidity) },
        { label: 'Облачность, %', value: String(clouds) },
        { label: 'Ветер, м/с', value: String(wind_speed) },
      ],
    }
  })
}

const WeatherAlert = defineComponent({
  name: 'WeatherAlert',
  props: {
    data: Object,
  },

  setup(props) {
    return {
      description: `${props.data.sender_name} : ${props.data.description}`,
    }
  },

  template: `
     <div class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ description }}</span>
          </div>
  `,
})

const WeatherDetailsItem = defineComponent({
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

const WeatherDetails = defineComponent({
  name: 'WeatherDetails',
  components: { WeatherDetailsItem },
  props: {
    details: Array,
  },

  template: `
    <div class="weather-details">
      <WeatherDetailsItem v-for="detail in details" :label="detail.label" :value="detail.value"></WeatherDetailsItem>
    </div>
  `,
})

const WeatherCard = defineComponent({
  name: 'WeatherCard',
  components: { WeatherDetails, WeatherAlert },
  props: {
    data: Object,
  },

  setup(props) {
    return {
      classes: {
        'weather-card--night': props.data.isNight,
      },
    }
  },

  template: `
     <li class="weather-card" :class="classes">
          <WeatherAlert v-if="data.alert" :data="data.alert"></WeatherAlert>
          <div>
            <h2 class="weather-card__name">
              {{ data.name }}
            </h2>
            <div class="weather-card__time">
             {{ data.time }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="data.conditions.description" >{{ data.conditions.icon }}</div>
            <div class="weather-conditions__temp">{{ data.conditions.temp }} °C</div>
          </div>
         <WeatherDetails :details="data.details"></WeatherDetails>
        </li>
  `,
})

export default defineComponent({
  name: 'WeatherApp',
  components: { WeatherCard },
  setup() {
    return {
      weatherData: toUIWeatherData(getWeatherData()),
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
