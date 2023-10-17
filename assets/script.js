var apiKey = '2f2015ffdd079862a9c1e8ebc7c19859';
var cities = []
// Function to fetch and display weather forecast
async function fetchWeather(city) {
	try {
		var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
		var response = await fetch(apiUrl);
		var data = await response.json();
		var forecast = data.list;

		var weatherForecastDiv = document.getElementById('weather-forecast');
                
                var cityHeader = document.createElement('h3');
                cityHeader.textContent = `Forecast for ${city}`;
                weatherForecastDiv.appendChild(cityHeader);

                for (let i = 0; i < forecast.length; i += 8) { 
                    var date = new Date(forecast[i].dt * 1000);
                    var temperature = forecast[i].main.temp;
                    var description = forecast[i].weather[0].description;

                    var forecastItem = document.createElement('div');
                    forecastItem.innerHTML = `
                        <p>Date: ${date.toDateString()}</p>
                        <p>Temperature: ${temperature}°C</p>
                        <p>Description: ${description}</p>
                    `;

                    weatherForecastDiv.appendChild(forecastItem);
                }
            } catch (error) {
                console.error(`No current weather data for ${city}:`, error);
            }
}
async function fetchWeatherForRandomCities() {
	for (var city of cities) {
		await fetchWeather(city);
	}
}

// Call the function to fetch and display the weather forecast for all cities
fetchWeatherForRandomCities();