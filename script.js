document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    const apiKey = '2f7a7f5832a00c62097d5cdb1fd9e371'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetchWeatherData(url);
});

document.getElementById('getCurrentLocationBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetchWeatherData(url);
        }, () => {
            document.getElementById('weatherResult').innerHTML = `<p>Unable to retrieve your location.</p>`;
        });
    } else {
        document.getElementById('weatherResult').innerHTML = `<p>Geolocation is not supported by your browser.</p>`;
    }
});

function fetchWeatherData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            const { main, weather, name } = data;
            const weatherDescription = weather[0].description;
            const temperature = main.temp;

            document.getElementById('weatherResult').innerHTML = `
                <h2>Weather in ${name}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Condition: ${weatherDescription}</p>
            `;
        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
        });
}
