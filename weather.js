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
const icons = {
    2: "008-storm.svg",
    3: "016-drizzle.svg",
    5: "012-rain.svg",
    6: "011-snowy.svg",
    7: "015-fog.svg",
    781: "014-twister.svg",
    clearD : "010-sun.svg",
    clearN : "005-night.svg",
    cloudsD: "006-sunny.svg",
    cloudsN: "007-night-1.svg"
}

const humanTime = (unix) => {
    const date = new Date(unix*1000);
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hour}:${minutes}`;
}

const degreeToCardinal = (degree) => {
    if(degree>348.75||degree<11.25) return `N`;
    if(degree>=11.25&&degree<33.75) return `NNE`;
    if(degree>=33.75&&degree<56.25) return `NE`;
    if(degree>=56.25&&degree<78.75) return `ENE`;
    if(degree>=78.75&&degree<101.25) return `E`;
    if(degree>=101.25&&degree<123.75) return `ESE`;
    if(degree>=123.75&&degree<146.25) return `SE`;
    if(degree>=146.25&&degree<168.75) return `SSE`;
    if(degree>=168.75&&degree<191.25) return `S`;
    if(degree>=191.25&&degree<213.75) return `SSW`;
    if(degree>=213.75&&degree<236.25) return `SW`;
    if(degree>=236.25&&degree<258.75) return `WSW`;
    if(degree>=258.75&&degree<281.25) return `W`;
    if(degree>=281.25&&degree<303.75) return `WNW`;
    if(degree>=303.75&&degree<326.25) return `NW`;
    if(degree>=326.25&&degree<348.75) return `NNW`;
}

const weatherIcon = (cod, icon) => {
    if(cod===800&&icon==='d')
        return icons.clearD;
    if(cod===800&&icon==='n')
        return icons.clearN;
    if(cod>800&&icon==='d')
        return icons.cloudsD;
    if(cod>800&&icon==='n')
        return icons.cloudsN;
    if(cod===781)
        return icons[781];
    return icons[Math.floor(cod/100)];
}

fetch(url).then(result => result.json()).then(json => {
    city.textContent = `${json.name}, ${json.sys.country}`;
    image.src = `icons/svg/${weatherIcon(json.weather[0].id, json.weather[0].icon[2])}`;
    description.textContent = json.weather[0].description;
    temperature.innerHTML = `${json.main.temp} &deg;C`;
    humidity.textContent = `${json.main.humidity}%`;
    sunrise.textContent = humanTime(json.sys.sunrise);
    sunset.textContent = humanTime(json.sys.sunset);
    wind.textContent = `${json.wind.speed} m/s`;
    direction.textContent = degreeToCardinal(json.wind.deg);
    visibility.textContent =`${json.visibility} m`;
    cloudiness.textContent = `${json.clouds.all}%`;
    pressure.textContent = `${json.main.pressure} hPa`;
})