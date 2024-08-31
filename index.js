function displayWeather(response) {
  let time = document.querySelector("#time");
  let image = document.querySelector("#temperature-icon");
  let detail = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let temperature = document.querySelector("#temperature");
  let date = new Date(response.data.time * 1000);
  let city = document.querySelector("#city-name");

  city.innerHTML = response.data.city;
  time.innerHTML = formatDate(date);
  image.innerHTML = `<img src="${response.data.condition.icon_url}">`;
  temperature.innerHTML = Math.round(response.data.temperature.current);
  detail.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
}

function formatDate(date) {
  let hours = date.getHours();
  console.log(hours);
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let day = days[date.getDay()];
  return `${day} ${hours}: ${minutes}`;
}

function getData(city) {
  let apiKey = "0427ta248d3357oc689fb60cb0b7d838";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(url).then(displayWeather);
}

let form = document.querySelector("#form");

function onSubmit(event) {
  event.preventDefault();
  let search = document.querySelector("#search-input");
  getData(search.value);
}

form.addEventListener("submit", onSubmit);

getData("Lisbon");

function displayForecast() {
  let forecast = document.querySelector("#forecast-wrapper");
  let dates = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  for (let date of dates) {
    forecast.innerHTML += `
        <div class="day-forecast">
            <div class="day-forecast-date">${date}</div>
            <div class="day-forecast-icon">🌤</div>
            <div class="day-forecast-temp">
                <div class="day-forecast-temp-left">15°</div>
                <div class="day-forecast-temp-right">9°</div>
            </div>
        </div>
        `;
  }
}

displayForecast();
