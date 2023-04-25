const API_KEY = '247dc110f6f3469278bb7b67faa750c9'
const BASE_URL = 'http://api.openweathermap.org'

let elLocation = elSelector('.info__location')
let elDate = elSelector('.info__date')
let elDegree = elSelector('.info__degree')
let elWeatherName = elSelector('.info__weather-name')
let elWeatherBetween = elSelector('.info__weather-between')
let elWeatherSpeed = elSelector('.info__weather-speed')

const elInput = elSelector('.form__input')
const citiesList = elSelector('.cities-list')

let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

let getDate = () => {
  let date = new Date()
  let day = date.getDay()
  let month = date.getMonth()
  let dates = date.getDate()
  let year = date.getFullYear()

  return `${days[day]}, ${months[month]} ${dates}, ${year}`
}

let render = (weather) => {
  console.log(weather)
  elLocation.textContent = weather.name
  elDate.textContent = getDate()
  elDegree.textContent = Math.round(weather.main.temp - 273.15) + ' °C'
  elWeatherName.textContent = weather.weather[0].main
  elWeatherBetween.textContent = `${Math.round(
    weather.main.temp_max - 273.15,
  )} °C / ${Math.floor(weather.main.temp_min - 273.15)} °C`
  elWeatherSpeed.textContent = 'Wind: ' + weather.wind.speed + ' km/h'
}

let getWeather = async (lat, lon) => {
  let path = `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  let weather = await request(path)
  render(weather)
}

let onSearch = debounce(async (evt) => {
  if (evt.target.value) {
    let path = `/geo/1.0/direct?q=${evt.target.value}&limit=5&appid=${API_KEY}`
    let cities = await request(path)
    console.log(cities)

    citiesList.innerHTML = null

    cities.forEach((city) => {
      let elLi = createEl('li')
      elLi.textContent = city.name
      elLi.dataset.lat = city.lat
      elLi.dataset.lon = city.lon

      citiesList.append(elLi)
    })
  } else {
    citiesList.innerHTML = null
  }
}, 500)

let onSelectCity = (evt) => {
  let lat = evt.target.dataset.lat
  let lon = evt.target.dataset.lon

  getWeather(lat, lon)
  citiesList.innerHTML = null
  elInput.value = null
}

citiesList.addEventListener('click', onSelectCity)
elInput.addEventListener('input', onSearch)
getWeather('41.3123363', '69.2787079')
