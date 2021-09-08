function formatDate() {
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

  let day = days[today.getDay()]; //day of the week
  let time = today.getHours();
  let minutes = today.getMinutes();
  let month = months[today.getMonth()];
  let number = today.getDate(); //day number
  if (time < 10) {
    time = "0" + time;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let currentDate = `${day} ${month} ${number}, ${time}:${minutes}`;
  return currentDate;
}
function searchCity(city) {
  let apiKey = "9c292bb799d0e08eb6951e986e805425";
  let unit = "metric";
  let apiUrlmain = "https://api.openweathermap.org/data/2.5/weather?";
  // let currentCity = document.querySelector("#city-input");
  // let searchCity = currentCity.value;
  let apiUrl = `${apiUrlmain}q=${city}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
// Function used to show the data: temperature, city, weather details, humididy, wind
function showTemperature(response) {
  console.log(response);
  document.querySelector("#selected-city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#temperature-details").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#city-humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#city-wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed * 3.6
  )}km/h`;
  let iconelement = document.querySelector("#icon-city");
  iconelement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconelement.setAttribute("alt", response.data.weather[0].description);
}
// Function used for Current button
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
// Function used for Current button
function retrievePosition(position) {
  //let latitude = position.coords.latitude;
  //let longitude = position.coords.longitude;
  let apiKey = "9c292bb799d0e08eb6951e986e805425";
  let unit = "metric";
  let apiUrlmain = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiUrlmain}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function convertFahrenheit(event) {
  event.preventDefault();
  //remove active class
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}
function convertCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
                  <div class="col-4">
                    <div class="weather-forecast-day">${day}</div>
                    <img
                      src="https://ssl.gstatic.com/onebox/weather/64/cloudy.png"
                      alt="image-weather-forecast1"
                      width="40"
                    />
                    <div class="weather-forecast-temperature">
                      <spa class="weather-forecast-temperature-max">18°</span>
                           <spa class="weather-forecast-temperature-min">12°</span>
                    </div>
                  </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
  /*
                  <div class="col-4 forecast-data">Fri</div>
                  <div class="col-4 forecast-data">Sat</div>
                </div>
                <div class="row">
                  <div class="col-6 forecast-data">Sun</div>
                  <div class="col-6 forecast-data">Mon</div>
                </div>`;*/
}
//Form search
let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);
//Day information
let today = new Date();
let weekDay = document.querySelector("#day-of-the-week");
weekDay.innerHTML = formatDate(today);
//Current button
let buttonCurrent = document.querySelector("#btn-current");
buttonCurrent.addEventListener("click", getPosition);
//Global Temperature
celsiusTemperature = null;
//Fahrenheit link
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertFahrenheit);
//Celsius link
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertCelsius);

searchCity("Chicago");
displayForecast();
