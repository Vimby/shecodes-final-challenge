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
  image.innerHTML =
 `<img src="${response.data.condition.icon_url}">`
  temperature.innerHTML = Math.round(response.data.temperature.current);
  detail.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;

  getForecast(response.data.city); // Fetch and display the forecast for the city
}

function formatDate(date) {
  let hours = date.getHours();
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
  return `${day} ${hours}:${minutes}`;
}

function getData(city) {
  let apiKey = "0427ta248d3357oc689fb60cb0b7d838";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(url).then(displayWeather);
}

function getForecast(city) {
  let apiKey = "0427ta248d3357oc689fb60cb0b7d838";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(url);
  axios.get(url).then(displayForecast);
}

function formatDay(timestamp) {
    let date = new Date (timestamp*1000)
    let days = [

        "Mon",
        "Tue",
        "Wed",
        "Thur",
        "Fri",
        
    
    
    ]

    return days[date.getDay()];
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast-wrapper");
  forecast.innerHTML = ""; // Clear previous forecast data

  let dataObjects = response.data.daily;
  console.log(dataObjects);

  dataObjects.forEach((object, index) => {
    console.log(index); // This will log the index of each object

    if (index < 5) {
      // Limit to the first 5 days
      forecast.innerHTML += `
        <div class="day-forecast">
            <div class="day-forecast-date">${
              formatDay(object.time)
            }</div> 
            <div class="day-forecast-icon">
                <img src="${object.condition.icon_url}">
            </div>
            <div class="day-forecast-temp">
                <div class="day-forecast-temp-left">${Math.round(
                  object.temperature.maximum
                )}°</div>
                <div class="day-forecast-temp-right">${Math.round(
                  object.temperature.minimum
                )}°</div>
            </div>
        </div>
      `;
    }
  });
}


function onSubmit(event) {
  event.preventDefault();
  let search = document.querySelector("#search-input");
  getData(search.value);
}

let form = document.querySelector("#form");
form.addEventListener("submit", onSubmit);

// Display weather and forecast for a default city on page load
document.addEventListener("DOMContentLoaded", function () {
  let defaultCity = "Lisbon";
  getData(defaultCity);
});
