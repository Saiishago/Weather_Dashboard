var apiKey = '2f2015ffdd079862a9c1e8ebc7c19859';

var cities=[];
var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");
var cityNameEl = document.getElementById("cityname");
var cityHistoryEl = document.getElementById("city-history");
var weatherDisplayEl = document.getElementById("displayweather");
var weatherIconEl = document.getElementById("weather-icon");

var indexs = [0,7,15,23,31,39];
var city_history=[];
var temperatures=[6];
var humids=[6];
var winds=[6];
var dates=[6];

var weatherIconEl = [
    document.getElementById("weather-icon"),
    document.getElementById("weather-iconI"),
    document.getElementById("weather-iconII"),
    document.getElementById("weather-iconIII"),
    document.getElementById("weather-iconIV"),
    document.getElementById("weather-iconV")
];

var cityDayEl = [
    document.getElementById("cityday"),
    document.getElementById("citydayOne"),
    document.getElementById("citydayTwo"),
    document.getElementById("citydayThree"),
    document.getElementById("citydayFour"),
    document.getElementById("citydayFive"),
];

var tempEl = [
    document.getElementById("temp"), 
    document.getElementById("tempone"),
    document.getElementById("temptwo"),
    document.getElementById("tempthree"),
    document.getElementById("tempfour"),
    document.getElementById("tempfive"),
];

var windEl = [
    document.getElementById("wind"), 
    document.getElementById("windone"),
    document.getElementById("windtwo"),
    document.getElementById("windthree"),
    document.getElementById("windfour"),
    document.getElementById("windfive")
];

var humidityEl = [
    document.getElementById("humidity"), 
    document.getElementById("humidityone"),
    document.getElementById("humiditytwo"),
    document.getElementById("humiditythree"),
    document.getElementById("humidityfour"),
    document.getElementById("humidityfive")
];

////
// async function fetchWeather(city) {
// 	try {
// 		var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
// 		var response = await fetch(apiUrl);
// 		var data = await response.json();
// 		var forecast = data.list;

// 		var weatherForecastDiv = document.getElementById('weather-forecast');
                
//                 var cityHeader = document.createElement('h3');
//                 cityHeader.textContent = `Forecast for ${city}`;
//                 weatherForecastDiv.appendChild(cityHeader);

//                 for (let i = 0; i < forecast.length; i += 8) { 
//                     var date = new Date(forecast[i].dt * 1000);
//                     var temperature = forecast[i].main.temp;
//                     var description = forecast[i].weather[0].description;

//                     var forecastItem = document.createElement('div');
//                     forecastItem.innerHTML = `
//                         <p>Date: ${date.toDateString()}</p>
//                         <p>Temperature: ${temperature}°C</p>
//                         <p>Description: ${description}</p>
//                     `;

//                     weatherForecastDiv.appendChild(forecastItem);
//                 }
//             } catch (error) {
//                 console.error(`No current weather data for ${city}:`, error);
//             }
// }
// async function fetchWeatherForRandomCities() {
// 	for (var city of cities) {
// 		await fetchWeather(city);
// 	}
// }


// fetchWeatherForRandomCities();
////

// Get reference to HTML element where weather information will be displayed

function getLocation(city) {
  console.log("weather!");
  var locationUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    apiKey;
  
  fetch(locationUrl)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0]);
      console.log(data[0].name);
    var lat = data [0].lat;
    var lon =data [0].lon;
    getWeather(lat, lon)
    });
}

function getWeather(lat, lon){
    var weatherUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric"+"&lang=english"+"&appid="+apiKey;
  fetch(weatherUrl)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);
      displayWeather(data);
    });
}  

function displayWeather(data) {
  console.log(data);
  var city = data.city.name;
  cityHistoryEl.textcontext= "";
  
  for (let i=0;i<6;i++){
    temperatures[i] = data.list[indexs[i]].main.temp;
    winds[i] = data.list[indexs[i]].wind.speed;
    humids[i] = data.list[indexs[i]].main.humidity;
    dates[i] = new Date(data.list[indexs[i]].dt * 1000);
  }
  
  for (let i=0;i<5;i++){
    cities.push(data.list[i]);
  }

  for (let j=0; j<6; j++){
    cityDayEl[j].textContent = "City Day: " + city + " " + dates[j].toLocaleDateString()
    weatherIconEl[j].setAttribute("src", `https://openweathermap.org/img/w/${data.list[j].weather[0].icon}.png`);
    tempEl[j].textContent = "Temperature: " + temperatures[j] + "°C";
    windEl[j].textContent = "Wind Speed: " + winds[j] + "KM/H";
    humidityEl[j].textContent = "Humidity: " + humids[j] + "%";
  }
}


searchButtonEl.addEventListener("click", function () {
  var searchInput = searchInputEl.value; 
  getLocation(searchInput);
  
  if (city_history.length<3){
  console.log(city_history);
  city_history.unshift(searchInput);
  console.log(city_history);
  } else{
    city_history.length= city_history.length-1;
    city_history.unshift(searchInput);
  }
  printCityHistory();
  updateCityHistory(city_history);
});


var city_history = JSON.parse(localStorage.getItem("city_history")) || [];

function printCityHistory() {
  cityHistoryEl.innerHTML = "";
  console.log(cityHistoryEl);
  for (let i = 0; i < city_history.length; i++) {
    const list = document.createElement("li");
    list.setAttribute("id",city_history[i]);
    cityHistoryEl.appendChild(list);
    const container = document.getElementById(city_history[i]);
    const button = document.createElement("btn");
    button.setAttribute("value",city_history[i]);
    button.textContent = city_history[i];
    container.appendChild(button);
    button.addEventListener("click", function(event){
    const city = event.target.value;
    console.log(city);
    getLocation(city);
    })
  }
}

function updateCityHistory(searchInput) {
  localStorage.setItem("city_history", JSON.stringify(searchInput));
  printCityHistory();
}

printCityHistory();