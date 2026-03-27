// =============================================
// STEP 1: GET A FREE API KEY
// Go to https://openweathermap.org/api
// Sign up (free), then copy your API key below
// =============================================
const API_KEY = "01892872e32781fdab669982b621ff22"; // <-- replace this


// =============================================
// STEP 2: GRAB ALL THE HTML ELEMENTS WE NEED
// This is DOM manipulation — we learned this!
// =============================================
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorMsg = document.getElementById("errorMsg");
const weatherResult = document.getElementById("weatherResult");

// Elements INSIDE the result card
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");


// =============================================
// STEP 3: LISTEN FOR THE BUTTON CLICK
// When the user clicks "Search", run getWeather()
// =============================================
searchBtn.addEventListener("click", function () {
  getWeather();
});

// BONUS: also search when the user presses Enter
cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});


// =============================================
// STEP 4: THE MAIN FUNCTION
// This does all the work
// =============================================
function getWeather() {

  // 4a. Read what the user typed and remove extra spaces
  const city = cityInput.value.trim();

  // 4b. If the input is empty, do nothing
  if (city === "") {
    return;
  }

  // 4c. Hide any old results or errors before we search
  hideElement(errorMsg);
  hideElement(weatherResult);

  // 4d. Build the URL for the API request
  //     We're asking OpenWeatherMap: "give me the weather for this city"
  //     &units=metric  → gives us Celsius (use imperial for Fahrenheit)
  const url =
    "https://api.openweathermap.org/data/2.5/weather" +
    "?q=" + city +
    "&units=metric" +
    "&appid=" + API_KEY;

  // 4e. Make the AJAX request using fetch()
  //     This is what we learned today! fetch() sends a request to the API
  fetch(url)
    .then(function (response) {
      // response.json() reads the response and converts it to a JS object
      return response.json();
    })
    .then(function (data) {
      // 4f. Check if the API found the city (cod 200 = success)
      if (data.cod === 200) {
        displayWeather(data); // show the weather
      } else {
        showElement(errorMsg); // show the error message
      }
    })
    .catch(function (error) {
      // .catch() runs if the internet is down or something breaks
      console.log("Something went wrong:", error);
      showElement(errorMsg);
    });
}


// =============================================
// STEP 5: PUT THE WEATHER DATA ON THE PAGE
// data is the object we got back from the API
// =============================================
function displayWeather(data) {

  // The API returns an object — let's pull out what we need:
  // data.name           → city name  e.g. "Lagos"
  // data.main.temp      → temperature e.g. 29.4
  // data.main.humidity  → humidity    e.g. 78
  // data.wind.speed     → wind speed  e.g. 12.3
  // data.weather[0].description → e.g. "light rain"

  cityName.textContent = data.name + ", " + data.sys.country;
  temperature.textContent = Math.round(data.main.temp) + "°C";
  description.textContent = data.weather[0].description;
  humidity.textContent = "💧 Humidity: " + data.main.humidity + "%";
  wind.textContent = "💨 Wind: " + data.wind.speed + " km/h";

  // Now show the result box (it was hidden before)
  showElement(weatherResult);
}


// =============================================
// STEP 6: HELPER FUNCTIONS
// These just add/remove the "hidden" CSS class
// =============================================
function showElement(element) {
  element.classList.remove("hidden");
}

function hideElement(element) {
  element.classList.add("hidden");
}


