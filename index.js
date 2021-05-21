let now = new Date();

let time = document.querySelector(".time");
let currentDate = document.querySelector(".date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let day = days[now.getDay()];
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();

time.innerHTML = `${day} ${hour}:${minute}`;
currentDate.innerHTML = `${date} ${month} ${year}`;
//////////////////////////////////////////

function displayCity(event) {
  event.preventDefault();

  let enterCityInput = document.querySelector("#enter-city-input");
  cityInput.innerHTML = `${enterCityInput.value}`;
  let apiKey = `e5acee71cf900fe7535600e9cd0efeca`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enterCityInput.value}&appid=${apiKey}&&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let enterCityForm = document.querySelector("#enter-city");
enterCityForm.addEventListener("submit", displayCity);
let cityInput = document.querySelector("li.city");

function showWeather(response) {
  console.log(response);
  let temperature = document.querySelector(".temperature");
  let cityTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = `${cityTemperature}`;

  let weather = document.querySelector("#weather");
  weather.innerHTML = `${response.data.weather[0].description}`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  let cityWind = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${cityWind} km/h`;
}
//current button//
function geolocate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey2 = `90d97642321171723050e9abe037b905`;
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey2}&&units=metric`;
  axios.get(apiUrlLocation).then(showCurrentWeather);
}

function showCurrentWeather(response) {
  let place = document.querySelector(".city");
  place.innerHTML = `${response.data.name}`;
  let localTemp = document.querySelector(".temperature");
  let localCityTemp = Math.round(response.data.main.temp);
  localTemp.innerHTML = `${localCityTemp}`;
  let localWeather = document.querySelector("#weather");
  localWeather.innerHTML = `${response.data.weather[0].description}`;
  let localWind = document.querySelector("#wind");
  let localCityWind = Math.round(response.data.wind.speed);
  localWind.innerHTML = `Wind: ${localCityWind} km/h`;
  let localHumidity = document.querySelector("#humidity");
  localHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}

let currentbtn = document.querySelector("#currentbtn");
currentbtn.addEventListener("click", geolocate);
