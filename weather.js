const api = `a6825f71c27c7eeae7da4b299f840fc4`;
let units = `metric`;
const url = `https://api.openweathermap.org/data/2.5/weather?id=6697993&units=${units}&appid=${api}`;
const city = document.getElementById(`location`);
const image = document.getElementById(`icon`);
const description = document.getElementById(`description`);
const temperature = document.querySelector(`#temperature > p`);
const humidity = document.querySelector(`#humidity > p`);
const sunrise = document.querySelector(`#sunrise > p`);
const sunset = document.querySelector(`#sunset > p`);
const wind = document.querySelector(`#wind > p`);
const direction = document.querySelector(`#direction > p`);
const visibility = document.querySelector(`#visibility > p`);
const cloudiness = document.querySelector(`#cloudiness > p`);
const pressure = document.querySelector(`#pressure > p`);

const humanTime = (unix) => {
    const date = new Date(unix*1000);
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hour}:${minutes}`;
}

fetch(url).then(result => result.json()).then(json => {
    city.textContent = `${json.name}, ${json.sys.country}`;
    description.textContent = json.weather[0].description;
    temperature.innerHTML = `${json.main.temp} &deg;C`;
    humidity.textContent = `${json.main.humidity}%`;
    wind.textContent = `${json.wind.speed} m/s`;
    visibility.textContent =`${json.visibility} m`;
    cloudiness.textContent = `${json.clouds.all}%`;
    pressure.textContent = `${json.main.pressure} hPa`;
    sunrise.textContent = humanTime(json.sys.sunrise);
    sunset.textContent = humanTime(json.sys.sunset);
})