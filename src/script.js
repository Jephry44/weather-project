function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

let timeNow = document.querySelector(".current-date");
let currentTime = new Date();
timeNow.innerHTML = formatDate(currentTime);

function searchCity(city) {
  let apiKey = "d8b57ad5e1e4b8f40edf31a99d8d190c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let wind = Math.round(response.data.wind.speed * 3.6);
  let humidity = response.data.main.humidity;
  let conditions = response.data.weather[0].description;
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = `${city}`;
  let currentTemperature = document.querySelector(".today-temp");
  currentTemperature.innerHTML = `${temperature}`;
  let currentWindSpeed = document.querySelector(".wind");
  currentWindSpeed.innerHTML = `Wind | ${wind}km/hr`;
  let currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = `Humidity | ${humidity}%`;
  let currentConditions = document.querySelector(".today-conditions");
  currentConditions.innerHTML = `${conditions}`;
}
function fetchCurrent(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d8b57ad5e1e4b8f40edf31a99d8d190c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(fetchCurrent);
}
let fetchCurrentData = document.querySelector("#fetch-current-data");
fetchCurrentData.addEventListener("click", retrievePosition);

let searchForm = document.querySelector("#enter-city");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Sydney");
