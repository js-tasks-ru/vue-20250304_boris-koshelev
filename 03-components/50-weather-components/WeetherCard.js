import { computed, defineComponent, toRefs } from 'vue'
import { WeatherAlert } from './WeatherAlert'
import { WeatherConditionIcons } from './weather.service'
import { WeatherDetailsItem } from './WeatherDetailsItem'

const checkIsNight = (dt, sunrise, sunset) => {
  return dt > sunset || dt < sunrise
}

const toCelsiusTemp = calvineTemp => calvineTemp - 273.15

const toHpaPressure = mmHgPressure => mmHgPressure * 0.75

export const WeatherCard = defineComponent({
  name: 'WeatherCard',
  components: { WeatherAlert, WeatherDetailsItem },
  props: {
    data: Object,
  },

  setup(props) {
    const { data } = toRefs(props)
    const { geographic_name, current, alert } = toRefs(data.value)
    const { dt, weather, temp, pressure, humidity, clouds, wind_speed, sunrise, sunset } = toRefs(current.value)
    const { description, id } = toRefs(weather.value)

    const isNight = computed(() => checkIsNight(dt.value, sunrise.value, sunset.value))
    const temperature = computed(() => toCelsiusTemp(temp.value).toFixed(1))
    const icon = computed(() => WeatherConditionIcons[id.value])
    const details = computed(() => [
      { label: 'Давление, мм рт. ст.', value: toHpaPressure(pressure.value).toFixed(0) },
      { label: 'Влажность, %', value: String(humidity.value) },
      { label: 'Облачность, %', value: String(clouds.value) },
      { label: 'Ветер, м/с', value: String(wind_speed.value) },
    ])

    return {
      isNight,
      name: geographic_name,
      time: dt,
      description,
      temperature,
      icon,
      details,
      alert,
    }
  },

  template: `
       <li class="weather-card" :class="{ 'weather-card--night': isNight }">
            <WeatherAlert v-if="alert" v-bind="alert"></WeatherAlert>
            <div>
              <h2 class="weather-card__name">
                {{ name }}
              </h2>
              <div class="weather-card__time">
               {{ time }}
              </div>
            </div>
            <div class="weather-conditions">
              <div class="weather-conditions__icon" :title="description" >{{ icon }}</div>
              <div class="weather-conditions__temp">{{ temperature }} °C</div>
            </div>
            <div class="weather-details">
              <WeatherDetailsItem v-for="detail in details" v-bind="detail"></WeatherDetailsItem>
            </div>
          </li>
    `,
})
